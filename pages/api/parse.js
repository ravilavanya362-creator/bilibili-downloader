export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const videoUrl = req.query.url || (req.body && req.body.url);

  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  try {
    // మీ క్లౌడ్‌ఫ్లేర్ వర్కర్ లింక్ ద్వారా Bilibili డేటాను ఫెచ్ చేయడం
    const proxyWorkerUrl = `https://nameless-mouse-57a8.lravi1916.workers.dev?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetch(proxyWorkerUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video details: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Parse Error:', error);
    return res.status(500).json({ error: 'Failed to parse video: ' + error.message });
  }
}
