// lib/posts.js
// Simple in-file blog content. Each entry is an original, short article.
// `emoji` + `gradient` drive the card thumbnail (no external images needed).

const posts = [
  {
    slug: "how-to-download-bilibili-videos-hd-complete-guide",
    title: "How to Download Bilibili Videos in HD: The Complete 2026 Guide",
    date: "2026-08-28",
    emoji: "📥",
    gradient: "linear-gradient(135deg, #ff2a6d, #ff5e3a)",
    readTime: "7 min read",
    featured: true,
    keywords: [
      "download bilibili videos",
      "bilibili video downloader",
      "bilibili mp4 download",
      "save bilibili videos to phone",
      "bilibili downloader no watermark",
    ],
    excerpt:
      "A complete, step-by-step walkthrough for saving Bilibili videos in HD on any device — plus quality tips, common errors, and safety notes.",
    content: `
Bilibili has grown into one of the largest video communities in Asia, and plenty of
viewers outside China watch it too — for anime, gaming clips, music performances,
and commentary you simply won't find anywhere else. The catch is that Bilibili
doesn't offer an official "save for offline" button on the web, so if you want a
video available without an internet connection, you need a dedicated downloader.
This guide walks through the whole process end to end.

## Why people download Bilibili videos

The most common reason is simply patchy connectivity — mobile data on a commute,
airplane wifi, or a slow connection abroad all make streaming unreliable. Beyond
that, some viewers want a personal backup of a video before it's taken down or
region-locked, or want to watch content in an app that doesn't support in-browser
Bilibili playback. Whatever the reason, the process below is the same.

## Step-by-step: how to download a Bilibili video

### Step 1 — Copy the video link
Open the video on the Bilibili app or bilibili.com, tap the share icon, and choose
Copy Link. You can also just copy the URL straight out of your browser's address
bar — either a full bilibili.com/video/... link or a shortened b23.tv link works.

### Step 2 — Paste it into the downloader
Come back to this page, tap the input box at the top, and paste the link. If you
copied it just a moment ago, the Paste button will grab it automatically.

### Step 3 — Fetch the video details
Tap Download Video (MP4). The tool reads the video's title, cover image, and an
available stream URL directly from Bilibili's own public endpoints — the same data
your browser already loads to play the video normally.

### Step 4 — Save the MP4 file
Once the preview card appears, tap Save MP4 File. Your browser will download the
file to your usual downloads folder or camera roll, ready to watch offline.

## Getting the best possible quality

Bilibili adjusts the resolution it serves based on whether you're logged in and
what plan your account has. Without a logged-in session, most public streams top
out in the 480p–720p range, which is what a simple link-paste downloader can
retrieve. If a video looks softer than expected:

- Try the original, non-shortened bilibili.com/video/ link rather than a b23.tv
  redirect — it occasionally preserves slightly better metadata.
- Confirm the source video itself was uploaded in HD. A downloader can't add detail
  that was never in the original upload.
- For long videos, remember file size scales with both resolution and length — a
  20-minute 1080p video can easily be several times larger than the same clip at
  480p.

## Desktop vs. mobile: does it matter?

Not really. Because everything runs through the browser, the same paste-and-download
flow works identically on a laptop, an Android phone, or an iPhone — there's nothing
to install either way. The only practical difference is where the finished file
lands: desktop browsers typically save to a Downloads folder, while phones usually
save straight into your gallery or a Files app.

## Common errors and how to fix them

**"Failed to fetch video details."** This almost always means the link was copied
incorrectly, the video is private or region-restricted, or it's been removed. Double
check the link opens normally in a separate tab first.

**The download starts but the file won't play.** This usually points to an
interrupted download rather than a bad video — try again on a stable connection,
and avoid switching apps mid-download on mobile.

**Video plays but has no sound, or vice versa.** Some higher-quality Bilibili streams
split video and audio into separate tracks (a delivery method called DASH). A
downloader built around simple progressive links will sometimes need to fall back
to a lower quality tier that keeps both tracks together in one file.

## A quick word on doing this responsibly

Downloading a personal copy for offline viewing is very different from
re-uploading someone else's video elsewhere. Stick to content you have the rights
to, or that you're using for personal, non-commercial viewing, and never
redistribute a saved file as your own work. See our full [downloading responsibly
guide](/blog/downloading-responsibly-a-quick-guide) for more detail.

## Frequently asked questions

**Is this free to use?** Yes — there's no account, no subscription, and no limit on
how many links you can paste.

**Do I need to install an app?** No. Everything happens in the browser tab you're
already using.

**Will this work with b23.tv short links?** Yes, both full bilibili.com links and
shortened b23.tv links are supported.

**Can I download an entire series at once?** Not currently — paste one video link
at a time and repeat for each episode.
    `,
  },
  {
    slug: "how-video-quality-works-on-streaming-sites",
    title: "How Video Quality Options Actually Work on Streaming Sites",
    date: "2026-07-02",
    emoji: "🎞️",
    gradient: "linear-gradient(135deg, #7c5cfc, #3e7bfa)",
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
    emoji: "🎬",
    gradient: "linear-gradient(135deg, #3e7bfa, #22c1a4)",
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
    emoji: "🛡️",
    gradient: "linear-gradient(135deg, #f5a524, #fc5c8c)",
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
