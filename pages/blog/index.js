import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/posts";

export default function BlogIndex({ posts }) {
  return (
    <Layout
      title="BiliSave Blog - Guides & Tips"
      description="Articles about video quality, streaming formats, and downloading responsibly."
    >
      <div className="content-page" style={{ maxWidth: "820px" }}>
        
        {/* Modern Header Section */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="eyebrow eyebrow-center" style={{ marginBottom: "12px" }}>
            FROM THE BLOG
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900", letterSpacing: "-0.03em", marginBottom: "14px" }}>
            The Complete Download <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Guide</span>
          </h1>
          <p className="subtitle" style={{ textAlign: "center", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "520px" }}>
            Everything you need to know about video streaming, formats, and safe downloading, all in one detailed read.
          </p>
        </div>

        {/* Premium Blog Cards Grid */}
        <div className="post-list" style={{ gap: "28px" }}>
          {posts.map((post, index) => {
            // Dynamic premium styling per card for variety
            const gradients = [
              "linear-gradient(135deg, #ff0844 0%, #ff4e50 100%)",
              "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
              "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
            ];
            const cardBg = post.gradient || gradients[index % gradients.length];

            return (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="post-card"
                style={{ 
                  borderRadius: "24px", 
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 14px 35px -10px rgba(0, 0, 0, 0.07)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  overflow: "hidden"
                }}
              >
                {/* Visual Banner Header */}
                <div className="post-thumb" style={{ background: cardBg, height: "160px", position: "relative" }}>
                  <div className="thumb-visual" style={{ padding: "20px" }}>
                    <div className="thumb-top-row">
                      {post.category && (
                        <span className="thumb-tag" style={{ background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.35)", fontWeight: "800", fontSize: "0.7rem", padding: "6px 14px" }}>
                          {post.category}
                        </span>
                      )}
                      <div className="thumb-icon-badge" style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.25)", border: "1px solid rgba(255, 255, 255, 0.4)" }}>
                        <span style={{ fontSize: "1.5rem" }}>{post.emoji || "✨"}</span>
                      </div>
                    </div>
                    {post.tagline && (
                      <div className="thumb-heading" style={{ marginTop: "10px" }}>
                        <p className="thumb-title" style={{ fontSize: "1.1rem", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>{post.tagline}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body Information */}
                <div className="post-card-body" style={{ padding: "24px 26px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span className="post-date" style={{ fontSize: "0.8rem", fontWeight: "700", color: "#94a3b8" }}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.readingTime && (
                      <>
                        <span style={{ color: "#cbd5e1" }}>•</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#94a3b8" }}>{post.readingTime}</span>
                      </>
                    )}
                  </div>

                  <h2 style={{ fontSize: "1.25rem", fontWeight: "800", letterSpacing: "-0.02em", color: "var(--text-main)", marginBottom: "10px", lineHeight: "1.35" }}>
                    {post.title}
                  </h2>

                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "20px" }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                    <span className="post-read-more" style={{ color: "#ff0844", fontWeight: "800", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      Read the full guide 
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
                  }
