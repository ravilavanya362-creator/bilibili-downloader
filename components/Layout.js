import Link from "next/link";
import Head from "next/head";

export default function Layout({ children, title, description }) {
  const pageTitle = title
    ? `${title} — Bilibili Video Downloader`
    : "Bilibili Video Downloader — Save Bilibili Videos as MP4";
  const pageDescription =
    description ||
    "Paste a bilibili.com or b23.tv link and get a direct mp4 download, right in your browser.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">哔</span>
          <span>Bilibili → MP4</span>
        </Link>
        <nav className="site-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">哔</span>
              <span>Bilibili → MP4</span>
            </div>
            <p className="footer-tagline">
              A simple browser tool for saving public bilibili videos as mp4,
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
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Bilibili → MP4. Not affiliated with
          Bilibili.com. All trademarks belong to their respective owners.
        </div>
      </footer>
    </>
  );
}
