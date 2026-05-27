const CACHE = 'rainbow-route-v1'
const URLS = [
  '/',
  '/index.html',
  '/app.js',
  '/sample-data.js',
  '/station-shinjuku.js',
  '/station-shibuya.js',
  '/manifest.json'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
})
