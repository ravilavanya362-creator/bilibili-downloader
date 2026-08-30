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

async function resolveShortLink(url) {
  // b23.tv short links redirect to the full bilibili.com URL.
  if (!/b23\.tv/.test(url)) return url;
  const res = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: BILI_HEADERS,
  });
  return res.url || url;
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

    const viewQuery = bvid ? `bvid=${bvid}` : `aid=${aid}`;
    const viewRes = await fetch(
      `https://api.bilibili.com/x/web-interface/view?${viewQuery}`,
      { headers: BILI_HEADERS }
    );
    const viewJson = await viewRes.json();

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

    const playRes = await fetch(
      `https://api.bilibili.com/x/player/playurl?${playQuery.toString()}`,
      { headers: BILI_HEADERS }
    );
    const playJson = await playRes.json();

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
      owner: data.owner?.name,
      durationSeconds: data.duration,
      qualityLabel:
        playJson.data.accept_description?.[0] || `qn ${playJson.data.quality}`,
      streamUrl: durl.url,
      sizeBytes: durl.size,
      bvid: data.bvid,
      cid,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}

