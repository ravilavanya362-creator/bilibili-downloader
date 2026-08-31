import { useState } from 'react';
import Layout from '../components/Layout';

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
      <div className="container">
        
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

      </div>
    </Layout>
  );
}
