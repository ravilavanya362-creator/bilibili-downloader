import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/posts";

export default function BlogIndex({ posts }) {
  return (
    <Layout
      title="Blog"
      description="Articles about video quality, streaming formats, and downloading responsibly."
    >
      <div className="content-page">
        <div className="eyebrow">Blog</div>
        <h1>Articles</h1>
        <p className="subtitle" style={{ textAlign: "left", margin: "0 0 32px" }}>
          Short, plain-language reads on how video streaming and downloading
          actually work.
        </p>

        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div className="post-thumb" style={{ background: post.gradient }}>
                <div className="thumb-visual">
                  <div className="thumb-top-row">
                    {post.category && <span className="thumb-tag">{post.category}</span>}
                    <div className="thumb-icon-badge">
                      <span>{post.emoji}</span>
                    </div>
                  </div>
                  {post.tagline && (
                    <div className="thumb-heading">
                      <p className="thumb-title">{post.tagline}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="post-card-body">
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="post-read-more">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
