import { useState } from "react";
import Layout from "../components/Layout";

const SAMPLE_COMMENTS = [
  "把链接粘进来就行",
  "支持 BV 号和完整链接",
  "b23.tv 短链也可以",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Something went wrong.");
      } else {
        setResult(json);
      }
    } catch (err) {
      setError("Network error — couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  const downloadHref = result
    ? `/api/download?url=${encodeURIComponent(result.streamUrl)}&filename=${encodeURIComponent(
        result.title || "video"
      )}`
    : null;

  return (
    <Layout>
      <div className="page">
        <div className="danmaku-strip">
          {SAMPLE_COMMENTS.map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * 6}s` }}>
              {c}
            </span>
          ))}
        </div>

        <div className="eyebrow">bilibili → mp4</div>
        <h1>Video Downloader</h1>
        <p className="subtitle">
          Paste a bilibili.com (or b23.tv) video link below to pull down its
          title, cover, and a direct mp4 download.
        </p>

        <div className="card">
          <form className="input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="https://www.bilibili.com/video/BV1xx411c7mD"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Fetching…" : "Fetch"}
            </button>
          </form>

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="result">
              {result.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result.cover} alt={result.title} referrerPolicy="no-referrer" />
              )}
              <div className="result-meta">
                <p className="result-title">{result.title}</p>
                <p className="result-sub">
                  {result.owner ? `${result.owner} · ` : ""}
                  {result.qualityLabel}
                  {result.sizeBytes
                    ? ` · ${(result.sizeBytes / 1024 / 1024).toFixed(1)} MB`
                    : ""}
                </p>
                <a className="download-btn" href={downloadHref}>
                  Download mp4
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="footnote">
          For personal, non-commercial use only. Only download videos you
          own or have permission to save — respect bilibili's terms of
          service and the original creator's rights.
        </p>
      </div>
    </Layout>
  );
                  }
