import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const videoUrl = req.query.url || (req.body && req.body.url);

  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  try {
    let actualUrl = videoUrl;
    if (videoUrl.includes('b23.tv')) {
      const expandRes = await fetch(videoUrl, { method: 'HEAD', redirect: 'follow' });
      actualUrl = expandRes.url || videoUrl;
    }

    const bvMatch = actualUrl.match(/(BV[a-zA-Z0-9]+)/);
    if (!bvMatch) {
      throw new Error('Invalid Bilibili video URL or BV ID not found');
    }
    const bvid = bvMatch[1];

    const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
    
    // IPRoyal డాష్‌బోర్డ్ నుండి తీసుకున్న వివరాలు
    const proxyHost = 'geo.iproyal.com';
    const proxyPort = '12321';
    const proxyUser = 'BgLs28YZVs8NRoaH';
    const proxyPass = 'QDqbQTRrDrjqQjNn_country-us_session-AR2nLBLy_lifetime-168h';

    const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
    const agent = new HttpsProxyAgent(proxyUrl);

    const apiRes = await fetch(apiUrl, {
      agent: agent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com'
      }
    });

    const jsonText = await apiRes.text();
    
    if (jsonText.trim().startsWith('<')) {
      throw new Error('Bilibili blocked the request or returned an HTML page.');
    }

    const data = JSON.parse(jsonText);
    
    if (data.code !== 0) {
      throw new Error(data.message || 'Failed to fetch from Bilibili API');
    }

    return res.status(200).json({
      title: data.data.title,
      pic: data.data.pic,
      duration: data.data.duration,
      owner: data.data.owner,
      bvid: data.data.bvid,
      pages: data.data.pages
    });

  } catch (error) {
    console.error('Parse Error:', error);
    return res.status(500).json({ error: 'Failed to parse video: ' + error.message });
  }
}
