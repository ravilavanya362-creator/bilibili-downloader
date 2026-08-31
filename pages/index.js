import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleDownload = () => {
    if (!url) return alert('Please enter a valid video link');
    setLoading(true);
    // API logic goes here
    setTimeout(() => setLoading(false), 1500);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Head>
        <title>Bili Save - Premium Ultra Fast Video Downloader</title>
        <meta name="description" content="Download high quality videos, audio, and content with Bili Save." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between text-sm font-medium text-gray-600">
          <span className="text-xl font-extrabold text-blue-600 tracking-tight">Bili Save</span>
          <div className="flex gap-6">
            <a href="#downloader" className="hover:text-blue-600 transition">Downloader</a>
            <a href="#how-to-use" className="hover:text-blue-600 transition">How to Use</a>
            <a href="#blog" className="hover:text-blue-600 transition">Articles</a>
            <a href="#faqs" className="hover:text-blue-600 transition">FAQs</a>
            <a href="#creator" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Step 2: Thunder Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold tracking-wide uppercase shadow-sm mb-6">
          <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
          100% Free &amp; Ultra Fast
        </div>

        {/* Step 3: Premium Name & Intro */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center text-gray-950 mb-4">
          Bili <span className="text-blue-600">Save</span>
        </h1>
        <p className="text-gray-500 text-center max-w-xl text-base sm:text-lg mb-8">
          Download high-definition videos, audio, and media effortlessly with our premium fast web downloader.
        </p>

        {/* Media Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-xl mb-6">
          {['Videos', 'Audios', 'Clips', 'Covers', 'Shorts', 'Highlights'].map((tab, idx) => (
            <button
              key={tab}
              className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                idx === 0
                  ? 'border-blue-600 bg-blue-50/40 text-blue-600 shadow-sm'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Input & Download Box */}
        <div id="downloader" className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl shadow-gray-100/50 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50/50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition">
            <input
              type="text"
              placeholder="Paste media link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            <button
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-medium hover:bg-black transition"
            >
              Paste
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:opacity-95 shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Download High Quality'}
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=Check out Bili Save downloader!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl font-bold text-white text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-2 transition"
          >
            Share Tool on WhatsApp
          </a>
        </div>

        {/* Step 4: How To Theme */}
        <section id="how-to-use" className="mt-20 w-full text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How to Download With Bili Save?</h2>
          <p className="text-gray-500 text-sm mb-12">Download your favorite content in 3 simple steps</p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/30 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Copy Video Link</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Open the video from the app or browser, tap Share, and select Copy link.</p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/30 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Paste into Bili Save</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Paste the link into the box above and click the Download button.</p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/30 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Download File</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Select HD Video or MP3 Audio to start the direct ultra-fast download.</p>
            </div>
          </div>
        </section>

        {/* Step 5: Premium Blog Section */}
        <section id="blog" className="mt-24 w-full">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Insights</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Latest Blog Posts</h2>
            <p className="text-gray-500 text-sm mt-1">Practical tips and strategies to elevate your content library.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
              <div className="h-40 bg-gradient-to-tr from-slate-900 via-purple-900 to-rose-500 p-6 flex flex-col justify-between text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-1 rounded w-max">Guide</span>
                <div>
                  <h4 className="font-bold text-lg leading-tight">Viral Growth Strategies</h4>
                  <p className="text-xs text-slate-200">Retention hooks &amp; algorithm secrets</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">Video Optimization &amp; Growth Formulas</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">Learn actionable methods to optimize high-retention clips, watch time, and resolution quality.</p>
                </div>
                <Link href="/blog" className="mt-4 inline-block text-center py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  Read article
                </Link>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
              <div className="h-40 bg-gradient-to-tr from-blue-900 via-indigo-900 to-cyan-500 p-6 flex flex-col justify-between text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-1 rounded w-max">AI Tools</span>
                <div>
                  <h4 className="font-bold text-lg leading-tight">Top Generative AI Video Tools</h4>
                  <p className="text-xs text-blue-200">Speed up production &amp; editing</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">Next-Gen Video Production Setup</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">Supercharge workflow with automated captions, smart B-roll generation, and AI enhancement.</p>
                </div>
                <Link href="/blog" className="mt-4 inline-block text-center py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  Read article
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6: FAQs */}
        <section id="faqs" className="mt-24 w-full max-w-2xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Help &amp; FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm mt-1">Everything you need to know about Bili Save.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: 'Is Bili Save completely free to use?', a: 'Yes, Bili Save is 100% free with unlimited conversions and high-speed downloads.' },
              { q: 'Do I need to login or create an account?', a: 'No credentials or registrations are required to parse and save videos.' },
              { q: 'Can I download videos in High Definition (HD)?', a: 'Yes, you can retrieve the highest original resolutions provided by the source, up to 1080p and 4K.' },
              { q: 'Does this tool work on mobile devices and iPhone?', a: 'Yes, Bili Save is fully optimized for iOS Safari, Android Chrome, and all desktop browsers.' }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-sm text-gray-800 hover:bg-gray-50"
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400 text-lg font-normal">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Step 7: About Platform */}
        <section className="mt-20 w-full max-w-2xl bg-gray-50/50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">About The Platform</span>
          <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed">
            <strong>Bili Save</strong> is an ultra-fast, independent online media utility designed to preview and save publicly accessible digital content with ease. Built with high performance standards to ensure complete privacy with zero data tracking.
          </p>
        </section>

        {/* Step 8: Connect With Creator */}
        <section id="creator" className="mt-10 w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Connect With Creator</span>
          <div className="mt-3">
            <h3 className="font-bold text-gray-900 text-lg">Dharshan Design and Tech labs</h3>
            <p className="text-xs text-gray-500">Design &amp; Innovation Labs</p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.instagram.com/_.pavi.rls________?igsi=MXFwdTd0ZTY0am4xbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-gray-400 transition"
            >
              Instagram
            </a>
            <a
              href="https://www.threads.com/@_.pavi.rls________"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-gray-400 transition"
            >
              Threads
            </a>
            <a
              href="mailto:pavanibevara045@gmail.com"
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-gray-400 transition"
            >
              Support
            </a>
          </div>
        </section>

        {/* Step 9: Footer Links */}
        <footer className="mt-16 pt-8 border-t border-gray-100 w-full text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
            <Link href="/about" className="hover:text-gray-900">About Us</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            <Link href="/copyright" className="hover:text-gray-900">DMCA</Link>
          </div>

          {/* Step 10: Disclaimer & Copyright */}
          <div className="max-w-xl mx-auto space-y-2 text-[11px] text-gray-400 leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> Bili Save is not affiliated with any specific video platform or third-party service. We do not host any media on our servers; all files are fetched directly from publicly accessible URLs.
            </p>
            <p>© 2026 Bili Save by Dharshan Design and Tech labs. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
          }
                
