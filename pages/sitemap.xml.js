import { getAllPosts } from "../lib/posts";

const SITE_URL = "https://bilibili-downloader-one.vercel.app";

const STATIC_PATHS = [
  { path: "/", priority: "1.0" },
  { path: "/blog", priority: "0.8" },
  { path: "/about", priority: "0.5" },
  { path: "/contact", priority: "0.4" },
  { path: "/privacy", priority: "0.3" },
  { path: "/terms", priority: "0.3" },
  { path: "/disclaimer", priority: "0.3" },
  { path: "/copyright", priority: "0.3" },
];

function generateSiteMap(posts) {
  const urls = [
    ...STATIC_PATHS.map(
      ({ path, priority }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <priority>${priority}</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>`
    ),
  ].join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap(getAllPosts());
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

