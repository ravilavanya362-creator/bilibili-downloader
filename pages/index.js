import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { LightningIcon, LinkStepIcon, PasteStepIcon, DownloadStepIcon, ChevronIcon } from "../components/Icons";
import { getAllPosts } from "../lib/posts";

const FAQS = [
  {
    q: "Is Bili Save completely free to use?",
    a: "Yes. There's no account, no subscription, and no hidden paywall — paste a link and download.",
  },
  {
    q: "Do I need the bilibili app or a login?",
    a: "No. Bili Save works entirely in your browser using bilibili's public video info, so you don't need to install anything or sign in.",
  },
  {
    q: "Which links are supported?",
    a: "Full bilibili.com video links (bilibili.com/video/BV...) and short b23.tv links both work.",
  },
  {
    q: "Does this work on mobile?",
    a: "Yes — Bili Save is built to work smoothly in any mobile browser, no app install required.",
  },
];

export default function Home({ posts }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

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
      {/* Hero + downloader */}
      <div className="page">
        <span className="hero-pill">⚡ 100% Free &amp; Ultra Fast</span>
        <div className="hero-logo">
          <LightningIcon size={30} />
        </div>
        <h1>Bili Save</h1>
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

      {/* How it works */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Guide</span>
          <h2>How to Download</h2>
        </div>
        <div className="steps">
          <div className="step-card">
            <LinkStepIcon />
            <div>
              <span className="step-number">Step 1</span>
              <h3>Copy the video link</h3>
              <p>Open the video on bilibili.com or the app, then copy its link from the address bar or Share menu.</p>
            </div>
          </div>
          <div className="step-card">
            <PasteStepIcon />
            <div>
              <span className="step-number">Step 2</span>
              <h3>Paste it above</h3>
              <p>Paste the link into the box at the top of this page and tap Fetch.</p>
            </div>
          </div>
          <div className="step-card">
            <DownloadStepIcon />
            <div>
              <span className="step-number">Step 3</span>
              <h3>Download your mp4</h3>
              <p>Review the title and cover, then tap Download mp4 to save the file to your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Blog</span>
          <h2>Latest Articles</h2>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div className="post-thumb" style={{ background: post.gradient }}>
                {post.emoji}
              </div>
              <div className="post-card-body">
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="view-all-link">
          View all articles →
        </Link>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Help &amp; FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className="faq-item" key={i}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <ChevronIcon open={openFaq === i} />
              </button>
              {openFaq === i && <div className="faq-answer">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
            }
                  
