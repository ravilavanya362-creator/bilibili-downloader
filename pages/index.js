import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/posts';
import { ShieldIcon, HDIcon, ClockIcon, DeviceIcon, ChevronIcon } from '../components/Icons';

const FAQS = [
  {
    q: 'Is Bili Save free to use?',
    a: 'Yes. There is no account, no subscription, and no limit on how many links you can paste — every download is free.',
  },
  {
    q: 'Do I need to install an app or browser extension?',
    a: 'No. Everything runs in the browser tab you already have open, on desktop or mobile.',
  },
  {
    q: 'Does this work with shortened b23.tv links?',
    a: 'Yes, both full bilibili.com/video/ links and shortened b23.tv links are supported.',
  },
  {
    q: 'Why is the video quality capped around 720p?',
    a: 'Without a logged-in Bilibili session, the public stream endpoints only expose lower resolutions. Logged-in, higher-quality streams require an account cookie that this tool does not collect.',
  },
  {
    q: 'Is it safe to download Bilibili videos this way?',
    a: 'The tool only reads the same public metadata your browser already loads to play the video — it does not ask for a Bilibili login or any personal information.',
  },
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const [openFaq, setOpenFaq] = useState(null);
  const allPosts = getAllPosts();
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/parse?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch video details');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Bilibili Video Downloader - No Watermark" description="Download high quality Bilibili videos instantly without watermark.">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      <div className="container" id="top">

        {/* Trust Bar */}
        <div className="trust-bar">
          <div className="trust-item"><ShieldIcon size={18} /> No login required</div>
          <div className="trust-item"><HDIcon size={18} /> HD MP4 output</div>
          <div className="trust-item"><ClockIcon size={18} /> Ready in seconds</div>
          <div className="trust-item"><DeviceIcon size={18} /> Works on any device</div>
        </div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="badge-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Paste
              </button>
            </div>
            <button type="submit" className="btn-main" disabled={loading}>
              {loading ? 'Processing...' : 'Download Video (MP4)'}
            </button>
          </form>

          {error && <div className="error-box" style={{ marginTop: '16px', color: '#ff0844', fontWeight: '600' }}>{error}</div>}
        </section>

        {/* Result Card Section */}
        {result && (
          <section className="result-section" style={{ margin: '30px auto', background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            {result.cover && <img src={result.cover} alt="Thumbnail" style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#0f172a' }}>{result.title}</h3>
              <a href={`/api/download?url=${encodeURIComponent(result.downloadUrl)}&title=${encodeURIComponent(result.title)}`} target="_blank" rel="noopener noreferrer" className="btn-main" style={{ display: 'inline-block', padding: '10px 20px', fontSize: '0.9rem' }}>
                Save MP4 File
              </a>
            </div>
          </section>
        )}

        {/* How To Download Section (Safe Vector Cards) */}
        <section className="howto-section">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '35px' }}>
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
                Open Bilibili app or web, find the video you want to download, and choose <span className="highlight-text">Copy Link</span>.
              </p>
              <div className="howto-icon-box" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginTop: '15px', color: '#ff0844' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="howto-card">
              <div className="howto-badge">2</div>
              <h3 className="howto-step-title">Paste into Downloader</h3>
              <p className="howto-step-desc">
                Return to this website, paste the copied link into the <span className="highlight-text">input box</span> above.
              </p>
              <div className="howto-icon-box" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginTop: '15px', color: '#ff0844' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="howto-card">
              <div className="howto-badge">3</div>
              <h3 className="howto-step-title">Download & Save</h3>
              <p className="howto-step-desc">
                Click the <span className="highlight-text">Download Video (MP4)</span> button to save high-definition files directly.
              </p>
              <div className="howto-icon-box" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginTop: '15px', color: '#ff0844' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Article Section */}
        {featuredPost && (
          <section className="featured-article-section">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div className="eyebrow eyebrow-center">From the blog</div>
              <h2 className="howto-main-title">
                The Complete <span className="highlight-text">Download Guide</span>
              </h2>
              <p className="howto-subtitle">Everything you need to know, in one detailed read</p>
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="featured-article-card">
              <div className="featured-article-thumb" style={{ background: featuredPost.gradient }}>
                <div className="thumb-visual">
                  <div className="thumb-top-row">
                    <span className="thumb-tag">{featuredPost.category || "Most Popular Guide"}</span>
                    <div className="thumb-icon-badge">
                      <span>{featuredPost.emoji}</span>
                    </div>
                  </div>
                  {featuredPost.tagline && (
                    <div className="thumb-heading">
                      <p className="thumb-title">{featuredPost.tagline}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="featured-article-body">
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.excerpt}</p>
                <div className="article-meta-row">
                  <span className="post-date">
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                  {featuredPost.readTime && (
                    <>
                      <span className="meta-dot">•</span>
                      <span className="post-date">{featuredPost.readTime}</span>
                    </>
                  )}
                </div>
                <span className="post-read-more">Read the full guide →</span>
              </div>
            </Link>

            <div className="more-articles-link">
              <Link href="/blog">Browse all articles →</Link>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 className="howto-main-title">Frequently Asked <span className="highlight-text">Questions</span></h2>
            <p className="howto-subtitle">Quick answers about using the downloader</p>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? 'faq-open' : ''}`} key={i}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <ChevronIcon open={openFaq === i} />
                </button>
                {openFaq === i && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
