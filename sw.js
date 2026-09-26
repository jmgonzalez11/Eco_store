// Sube este número junto con "version" en version.json y APP_VERSION en index.html
const VERSION = 'ecos-v4';
const CORE = ['./', './index.html', './xlsx.full.min.js', './manifest.webmanifest',
              './icon-192.png', './icon-512.png', './apple-touch-icon.png', './icon-maskable-512.png', './favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Nunca cachear la sincronización ni el archivo de versión
  if (url.hostname.endsWith('script.google.com') || url.hostname.endsWith('googleusercontent.com')) return;
  if (url.pathname.endsWith('/version.json')) { e.respondWith(fetch(req, { cache: 'no-store' })); return; }
  // Página: red primero (recibe actualizaciones), caché sin conexión
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ca => ca.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Resto: caché primero
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); }
    return r;
  })));
});
