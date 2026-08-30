// lib/posts.js
// Simple in-file blog content. Each entry is an original, short article.
// Swap this for a CMS or markdown files later if the blog grows.

const posts = [
  {
    slug: "how-video-quality-works-on-streaming-sites",
    title: "How Video Quality Options Actually Work on Streaming Sites",
    date: "2026-07-02",
    excerpt:
      "A plain-language look at resolution, bitrate, and why 'HD' doesn't always mean what you think it means.",
    content: `
When a streaming site offers you a choice between 360p, 720p, or 1080p, it's really
offering a trade-off between three things: how sharp the picture looks, how big the
file is, and how much bandwidth is needed to play it smoothly.

Resolution (the "p" number) describes how many horizontal lines of pixels make up
the video frame. More lines generally means a sharper picture on a large screen, but
it isn't the whole story — bitrate matters just as much. Bitrate is how much data is
used per second of video. A 1080p video encoded at a low bitrate can actually look
worse than a well-encoded 720p video, because there isn't enough data to represent
fine detail and motion without visible blocky artifacts.

Most platforms automatically pick a quality level based on your current connection
speed, then let you override it manually. If you've ever noticed a video looking
blurry for the first few seconds before sharpening up, that's the player detecting
your bandwidth and stepping up the quality in real time — a technique called
adaptive bitrate streaming.

For downloads rather than live streaming, the calculation changes: you're trading
storage space for quality, since the whole file needs to live on your device rather
than trickle in as needed. A short clip in 1080p might be perfectly reasonable, while
a two-hour video at the same setting could easily run past a gigabyte.
    `,
  },
  {
    slug: "progressive-vs-dash-video-formats",
    title: "Progressive vs. DASH: Why Some Downloads Need Extra Steps",
    date: "2026-07-18",
    excerpt:
      "Ever wonder why some video downloads give you one file and others give you separate video and audio? Here's the difference.",
    content: `
Not all video delivery works the same way under the hood. Two common approaches are
progressive download and DASH (Dynamic Adaptive Streaming over HTTP), and the
difference explains a lot about why some downloader tools are simpler than others.

A progressive file is exactly what it sounds like: one file containing both video
and audio tracks muxed together, playable and downloadable as a single unit — much
like an older-style mp4 you'd save directly to a hard drive. It's simple to work
with, but it doesn't adapt well to changing network conditions and typically caps
out at more modest quality levels.

DASH splits things up. The video track and the audio track are stored and served as
separate streams, often further broken into small time-sliced chunks at multiple
quality levels. This is what lets a modern player switch resolution mid-playback
without a rebuffer, and it's how most high-quality streaming (1080p and above) is
delivered today.

The catch: if you want to save a DASH-delivered video as one normal mp4 file, the
video and audio streams need to be downloaded separately and then muxed (combined)
back together, usually with a tool like ffmpeg. That's an extra processing step
progressive downloads don't need — which is why many lightweight downloader tools
intentionally request the progressive version of a video when a site offers one,
trading a bit of maximum quality for a much simpler, faster download.
    `,
  },
  {
    slug: "downloading-responsibly-a-quick-guide",
    title: "Downloading Videos Responsibly: A Quick Guide",
    date: "2026-08-05",
    excerpt:
      "Saving a video for offline viewing is convenient — here's how to think about doing it the right way.",
    content: `
Offline video is genuinely useful: spotty train wifi, long flights, or just wanting
a local backup of something you don't want to lose are all legitimate reasons to
save a copy of a video you've watched online. But "you can" and "you should" aren't
always the same question, so it's worth a quick gut-check before hitting download.

The simplest rule of thumb: only save videos you made yourself, videos explicitly
marked as free to download by their creator, or videos you otherwise have clear
permission to keep a copy of. Most platforms' terms of service draw a hard line
between watching a video through their player and keeping a standalone copy of it —
even when the technical option to download exists somewhere.

A few practical habits help:
- Check for a creator's own download or "save offline" feature first — many
  platforms build this in for exactly the use case you have in mind.
- If you're downloading for research, archiving, or criticism, keep in mind that
  fair use / fair dealing exceptions are narrow and vary by country — they're not
  a blanket permission slip.
- Never redistribute a downloaded video as your own or re-upload it elsewhere.
  Saving a personal copy and republishing it are very different things legally.
- When in doubt, ask the creator. Most are happy to grant permission for
  reasonable personal use if you simply ask.

None of this is legal advice — just a sensible starting point for treating other
people's work the way you'd want your own treated.
    `,
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export default posts;
