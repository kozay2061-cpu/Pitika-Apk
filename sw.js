const CACHE_NAME = 'pitaka-app-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './articles.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
