export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // మీ క్లౌడ్‌ఫ్లేర్ వర్కర్ లింక్ ఇక్కడ ఇవ్వండి
    const workerProxyUrl = `https://your-cloudflare-worker-name.your-subdomain.workers.dev/?url=${encodeURIComponent(url)}`;

    const bilibiliApiResponse = await fetch(workerProxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!bilibiliApiResponse.ok) {
      throw new Error(`Proxy responded with status: ${bilibiliApiResponse.status}`);
    }

    const data = await bilibiliApiResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Parse Error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch data due to blocking or network issue.',
      details: error.message 
    });
  }
}
