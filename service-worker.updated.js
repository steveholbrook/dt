/* v2 - network-first for HTML to prevent stale pages; cache-first for assets */
const CACHE_NAME = 'dtracker-v2';
const ASSET_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try { await cache.addAll(ASSET_CACHE); } catch(e){ /* ignore */ }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isHTML = req.headers.get('accept') && req.headers.get('accept').includes('text/html');
  if (isHTML) {
    // Network-first for HTML (avoid stale index.html)
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }
  // Cache-first for other assets
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const resp = await fetch(req);
    try {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, resp.clone());
    } catch(e){}
    return resp;
  })());
});