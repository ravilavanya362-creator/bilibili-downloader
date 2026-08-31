import Layout from "../../components/Layout";
import { getAllPosts, getPostBySlug } from "../../lib/posts";

export default function BlogPost({ post }) {
  if (!post) return null;

  return (
    <Layout title={post.title} description={post.excerpt}>
      <article className="content-page post-article">
        <div className="post-article-thumb" style={{ background: post.gradient }}>
          {post.emoji}
        </div>
        <span className="post-date">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h1>{post.title}</h1>
        {post.content
          .trim()
          .split("\n\n")
          .map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post: post || null } };
}
