// pages/api/parse.js
// Resolves a bilibili.com video URL into a title, cover image, and a
// direct (progressive mp4) stream URL that can be downloaded.
//
// Notes:
// - Uses bilibili's public web API (no login). Without login, the
//   highest quality bilibili will grant is usually 720p (qn=64).
//   Higher qualities (1080p+) generally require a logged-in session
//   cookie (SESSDATA), which this demo does not collect.
// - We request platform=html5 so bilibili returns a single progressive
//   "durl" file instead of separate DASH video/audio streams that
//   would need ffmpeg to mux together (not practical on serverless).

const BILI_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Referer: "https://www.bilibili.com/",
};

// Optional proxy support: routes the (small, JSON-only) Bilibili API calls
// through a proxy so requests don't come from this server's own
// (often-blocked) IP. Video file bytes are NOT routed through this — only
// the tiny metadata calls in this file. Configure via env vars:
//   PROXY_HOST, PROXY_PORT, PROXY_USERNAME, PROXY_PASSWORD
// If PROXY_HOST is unset, requests go out normally (no proxy).
let cachedDispatcher = null;
async function getProxyDispatcher() {
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  if (!host || !port) return null;
  if (cachedDispatcher) return cachedDispatcher;

  const { ProxyAgent } = await import("undici");
  const user = process.env.PROXY_USERNAME;
  const pass = process.env.PROXY_PASSWORD;
  const auth =
    user && pass
      ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`
      : "";
  const proxyUrl = `http://${auth}${host}:${port}`;
  cachedDispatcher = new ProxyAgent(proxyUrl);
  return cachedDispatcher;
}

// Wraps fetch to go through the proxy dispatcher when one is configured.
async function proxiedFetch(url, options = {}) {
  const dispatcher = await getProxyDispatcher();
  if (!dispatcher) return fetch(url, options);
  // Residential proxies can be flaky — retry once on a hard network failure.
  try {
    return await fetch(url, { ...options, dispatcher });
  } catch (e) {
    console.error("[parse] proxiedFetch failed, retrying once:", e.message);
    return fetch(url, { ...options, dispatcher });
  }
}

function extractIds(rawUrl) {
  const bvMatch = rawUrl.match(/BV[0-9A-Za-z]{10}/);
  const avMatch = rawUrl.match(/av(\d+)/i);
  const pMatch = rawUrl.match(/[?&]p=(\d+)/);
  return {
    bvid: bvMatch ? bvMatch[0] : null,
    aid: avMatch ? avMatch[1] : null,
    page: pMatch ? parseInt(pMatch[1], 10) : 1,
  };
}

async function safeJson(res, label) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(
      `[parse] ${label} returned non-JSON (status ${res.status}):`,
      text.slice(0, 300)
    );
    throw new Error(
      `Bilibili blocked this request (${label} returned ${res.status} non-JSON). This usually happens when Bilibili's anti-bot system flags the server's IP address — common on serverless hosts. Try again later, or run this from a residential IP / with a proxy.`
    );
  }
}

async function resolveShortLink(url) {
  // b23.tv short links redirect to the full bilibili.com URL. This is a
  // plain redirect service, not blocked by anti-bot — skip the proxy here
  // to reduce failure surface, and fall back to returning the original
  // url if the redirect fetch itself fails for any reason.
  if (!/b23\.tv/.test(url)) return url;
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: BILI_HEADERS,
    });
    return res.url || url;
  } catch (e) {
    console.error("[parse] resolveShortLink failed:", e.message);
    return url;
  }
}

// Bilibili's anti-bot check is far more likely to 412 a request that shows
// up with zero cookies. Visiting the homepage first picks up a buvid3 /
// b_nut cookie that we then send along with the real API calls, which
// mimics what a real browser does before it ever calls the API.
async function getWarmupCookie() {
  try {
    const res = await proxiedFetch("https://www.bilibili.com/", {
      headers: BILI_HEADERS,
    });
    const setCookies =
      typeof res.headers.getSetCookie === "function"
        ? res.headers.getSetCookie()
        : res.headers.get("set-cookie")
        ? [res.headers.get("set-cookie")]
        : [];
    return setCookies
      .map((c) => c.split(";")[0])
      .filter(Boolean)
      .join("; ");
  } catch (e) {
    console.error("[parse] warm-up cookie fetch failed:", e.message);
    return "";
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body || {};
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing 'url' in request body" });
    }

    const finalUrl = await resolveShortLink(url.trim());
    const { bvid, aid, page } = extractIds(finalUrl);

    if (!bvid && !aid) {
      return res.status(400).json({
        error:
          "Couldn't find a BV or av video ID in that link. Paste a full bilibili.com video URL.",
      });
    }

    const cookie = await getWarmupCookie();
    const headersWithCookie = cookie
      ? { ...BILI_HEADERS, Cookie: cookie }
      : BILI_HEADERS;

    const viewQuery = bvid ? `bvid=${bvid}` : `aid=${aid}`;
    const viewRes = await proxiedFetch(
      `https://api.bilibili.com/x/web-interface/view?${viewQuery}`,
      { headers: headersWithCookie }
    );
    const viewJson = await safeJson(viewRes, "view API");

    if (viewJson.code !== 0) {
      return res.status(502).json({
        error: `Bilibili API error: ${viewJson.message || viewJson.code}`,
      });
    }

    const data = viewJson.data;
    const pages = data.pages || [];
    const target = pages.find((p) => p.page === page) || pages[0] || {};
    const cid = target.cid || data.cid;

    const playQuery = new URLSearchParams({
      bvid: data.bvid,
      cid: String(cid),
      qn: "64",
      platform: "html5",
      high_quality: "1",
    });

    const playRes = await proxiedFetch(
      `https://api.bilibili.com/x/player/playurl?${playQuery.toString()}`,
      { headers: headersWithCookie }
    );
    const playJson = await safeJson(playRes, "playurl API");

    if (playJson.code !== 0 || !playJson.data?.durl?.length) {
      return res.status(502).json({
        error:
          "Bilibili didn't return a downloadable stream for this video (it may be VIP-only, region-locked, or require login).",
      });
    }

    const durl = playJson.data.durl[0];

    return res.status(200).json({
      title: data.title,
      cover: data.pic,
      thumbnail: data.pic,
      owner: data.owner?.name,
      durationSeconds: data.duration,
      qualityLabel:
        playJson.data.accept_description?.[0] || `qn ${playJson.data.quality}`,
      streamUrl: durl.url,
      downloadUrl: `/api/download?url=${encodeURIComponent(
        durl.url
      )}&filename=${encodeURIComponent(data.title || "video")}`,
      sizeBytes: durl.size,
      bvid: data.bvid,
      cid,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Unexpected server error." });
  }
}
