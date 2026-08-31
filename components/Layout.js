import Link from "next/link";
import Head from "next/head";
import { LightningIcon, InstagramIcon, ThreadsIcon, MailIcon } from "./Icons";

const INSTAGRAM_URL =
  "https://www.instagram.com/_.pavi.rls________?igsi=MXFwdTd0ZTY0am4xbw==";
const THREADS_URL = "https://www.threads.com/@_.pavi.rls________";
const SUPPORT_EMAIL = "pavanibevara045@gmail.com";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — Bili Save` : "Bili Save — Bilibili Video Downloader";
  const pageDescription =
    description ||
    "Paste a bilibili.com or b23.tv link and get a direct mp4 download, free and fast.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <LightningIcon size={18} />
          </span>
          <span>Bili Save</span>
        </Link>
        <nav className="site-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <section className="creator-section">
        <div className="creator-inner">
          <span className="eyebrow">Made By</span>
          <h2>Dharshan Design and Tech Labs</h2>
          <p>Follow along or reach out — we're happy to hear from you.</p>
          <div className="creator-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="creator-link">
              <InstagramIcon /> Instagram
            </a>
            <a href={THREADS_URL} target="_blank" rel="noreferrer" className="creator-link">
              <ThreadsIcon /> Threads
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="creator-link">
              <MailIcon /> Support
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">
                <LightningIcon size={16} />
              </span>
              <span>Bili Save</span>
            </div>
            <p className="footer-tagline">
              A simple, fast tool for saving public bilibili videos as mp4 —
              for personal, non-commercial use.
            </p>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Site</span>
            <Link href="/">Downloader</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Legal</span>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/copyright">Copyright / DMCA</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Bili Save. Not affiliated with
          Bilibili.com. All trademarks belong to their respective owners.
        </div>
      </footer>
    </>
  );
}
