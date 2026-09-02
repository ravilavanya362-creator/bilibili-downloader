export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing target url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    try {
      // 1. b23.tv షార్ట్ లింక్ అయితే దాన్ని ఫుల్ లింక్‌గా మార్చడం (Expand redirect)
      let finalUrl = targetUrl;
      if (targetUrl.includes('b23.tv')) {
        const redirectRes = await fetch(targetUrl, {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          }
        });
        finalUrl = redirectRes.url || targetUrl;
      }

      // 2. Bilibili API కి తగినట్లుగా హెడర్స్ సెట్ చేయడం
      const modifiedRequest = new Request(finalUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://www.bilibili.com',
          'Origin': 'https://www.bilibili.com',
          'Accept': 'application/json, text/plain, */*'
        },
        method: 'GET',
      });

      const response = await fetch(modifiedRequest);
      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Error: ' + e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  },
};
