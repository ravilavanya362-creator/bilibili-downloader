import Link from 'next/link';
import Head from 'next/head';
import { LightningIcon, InstagramIcon, ThreadsIcon, MailIcon } from './Icons';

const INSTAGRAM_URL = "https://www.instagram.com/_.pavi.rls________?igsi=MXFwdTd0ZTY0am4xbw==";
const THREADS_URL = "https://www.threads.com/@_.pavi.rls________";
const SUPPORT_EMAIL = "pavanibevara045@gmail.com";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — Bili Save` : "Bili Save — High Quality Bilibili Video Downloader";
  const pageDescription = description || "Paste a bilibili.com or b23.tv link and get high quality MP4 downloads free and fast.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="site-header">
        <Link href="/" className="brand">
  <div className="brand-icon">
    <LightningIcon size={20} />
  </div>
  <div className="brand-text">
    <span className="brand-bili">Bili</span>
    <span className="brand-save">Save</span>
  </div>
</Link>

        <nav className="site-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main>{children}</main>

      {/* Step 8: Creator Section */}
      <div className="container">
        <section className="creator-box">
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
            Crafted with Excellence
          </span>
          <h2 style={{ fontSize: '1.8rem', margin: '8px 0 12px', fontWeight: 800 }}>
            Dharshan Design and Tech Labs
          </h2>
          <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.85, fontSize: '0.95rem' }}>
            Building high-performance, seamless media tools for modern web experiences.
          </p>

          <div className="social-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="social-btn">
              <InstagramIcon size={18} /> Instagram
            </a>
            <a href={THREADS_URL} target="_blank" rel="noreferrer" className="social-btn">
              <ThreadsIcon size={18} /> Threads
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="social-btn">
              <MailIcon size={18} /> Support Email
            </a>
          </div>
        </section>
      </div>

      {/* Step 9 & 10: Legal & Disclaimer Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-nav">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/copyright">DMCA Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
          <div className="footer-copy">
            <p>© {new Date().getFullYear()} Bili Save. All trademarks belong to their respective owners.</p>
            <p style={{ marginTop: '6px', fontSize: '0.8rem' }}>
              Disclaimer: Bili Save is not affiliated with, endorsed, or sponsored by Bilibili.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
