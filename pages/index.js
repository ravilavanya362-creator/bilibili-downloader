import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { LightningIcon } from '../components/Icons';
import posts from '../lib/posts';

const FAQ_ITEMS = [
  {
    q: "Is Bili Save completely free?",
    a: "Yes, Bili Save is 100% free with unlimited downloads and no hidden subscription fees."
  },
  {
    q: "Do I need to install any software or extensions?",
    a: "No installations needed. Everything operates directly within your desktop or mobile browser."
  },
  {
    q: "Which Bilibili links are supported?",
    a: "All standard bilibili.com URLs and b23.tv short links are fully supported."
  },
  {
    q: "Can I download videos on Android or iPhone?",
    a: "Yes! Bili Save is completely responsive and works smoothly on iOS Safari, Android Chrome, and any browser."
  }
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      alert("Please allow clipboard permissions or paste manually.");
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to fetch video details.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Network error. Unable to process download request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        
        {/* Hero Section */}
<section className="hero-section">
  <div className="badge-tag">
    <LightningIcon size={13} />
    <span>100% Free &amp; Ultra Fast</span>
  </div>
  
<h1 className="hero-title">
  Bilibili Video <span className="title-accent">Downloader</span>
</h1>


  
  <p className="hero-desc">
    Paste your video link below to save high quality MP4 files with no watermark instantly.
  </p>

  <form className="input-card" onSubmit={handleDownload}>
    <div className="input-group">
      <input
        type="text"
        placeholder="Paste Bilibili link here (e.g. bilibili.com/video/...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="button" className="paste-btn" onClick={handlePaste}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Paste
      </button>
    </div>

    <button type="submit" className="btn-main" disabled={loading}>
      {loading ? 'Processing Video...' : 'Download Video (MP4)'}
    </button>
  </form>

  {error && <p style={{ color: '#ef4444', marginTop: '14px', fontWeight: 600, fontSize: '0.9rem' }}>{error}</p>}
</section>


        {/* Video Download Result */}
        {result && (
          <div className="result-card">
            <img src={result.cover} alt={result.title} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{result.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Quality: <strong>{result.qualityLabel || 'HD'}</strong> • Duration: {Math.round(result.durationSeconds / 60)} mins
            </p>
            <a
              href={`/api/download?url=${encodeURIComponent(result.streamUrl)}&filename=${encodeURIComponent(result.title)}`}
              className="btn-download"
            >
              💾 Save MP4 File
            </a>
          </div>
        )}

      {/* How To Download Section */}
        <section className="section howto-section">
  <div className="section-header">
          <div className="section-header">
        <h2 className="howto-main-title">
          How to Download Bilibili <span className="highlight-text">Videos?</span>
        </h2>
        <p className="howto-subtitle">Download any Bilibili video in 3 simple steps</p>
      </div>



          <div className="howto-container">
            {/* Step 1 */}
            <div className="howto-card">
              <div className="howto-badge">1</div>
              <h3 className="howto-step-title">Copy the video link</h3>
              <p className="howto-step-desc">
                On Bilibili app or web, open the video, tap Share, then choose <span className="highlight-text">Copy link</span>.
              </p>
              <div className="howto-img-wrapper">
                <img src="/step-1.png" alt="Copy Bilibili Link" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="howto-card">
              <div className="howto-badge">2</div>
              <h3 className="howto-step-title">Paste into Bili Save</h3>
              <p className="howto-step-desc">
                Return to Bili Save, paste your link in the input box above, and tap <span className="highlight-text">Download</span>.
              </p>
                      <div className="howto-img-wrapper">
          <img src="/step-3.png" alt="Save HD MP4" />
        </div>
    </section>


            {/* Step 3 */}
            <div className="howto-card">
              <div className="howto-badge">3</div>
              <h3 className="howto-step-title">Save HD MP4 Video</h3>
              <p className="howto-step-desc">
                Preview your media and click <span className="highlight-text">Save MP4</span> to store it directly to your device.
              </p>
              <div className="howto-img-wrapper">
                <img src="/step-3.png" alt="Save HD MP4" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Latest Articles &amp; Guides</h2>
            <p style={{ color: 'var(--text-muted)' }}>Explore tips on video formats, streaming quality, and tech</p>
          </div>

          <div className="blog-grid">
            {posts && posts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-thumb" style={{ background: post.gradient }}>
                  {post.emoji}
                </div>
                <div className="blog-body">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.date}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="faq-box">
                <div className="faq-q">{faq.q}</div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About Platform */}
        <section className="section" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '14px' }}>About Bili Save Platform</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8' }}>
            Bili Save is a lightweight, web-first utility engineered to extract stream media directly for personal and non-commercial archival use. Powered by Next.js edge architecture, it requires zero browser add-ons and delivers fast, safe video processing.
          </p>
        </section>

      </div>
    </Layout>
  );
          }
              
