// pages/api/download.js
// Bilibili's CDN rejects requests that don't carry a bilibili.com
// Referer header, so the browser can't hit the stream URL directly.
// This route fetches the stream server-side (with the right headers)
// and pipes the bytes back to the browser as a file download.
//
// IMPORTANT (Vercel free/Hobby tier): serverless functions have a
// response size/time ceiling, so this works well for typical short
// clips but may time out on very long videos. See the README for
// notes on upgrading or self-hosting the API if you hit that limit.

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  const { url, filename } = req.query;

  if (!url || typeof url !== "string" || !url.includes(".hdslb.com")) {
    return res.status(400).json({ error: "Invalid or missing stream url" });
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        Referer: "https://www.bilibili.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return res
        .status(502)
        .json({ error: `Upstream fetch failed (${upstream.status})` });
    }

    const safeName = (filename || "video").replace(/[^\w\-. ]/g, "_");
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "video/mp4"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeName}.mp4"`
    );
    const len = upstream.headers.get("content-length");
    if (len) res.setHeader("Content-Length", len);

    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Proxy download failed." });
    } else {
      res.end();
    }
  }
}

