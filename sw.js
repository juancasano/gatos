// Service Worker basico para Mundo Felino
// Cachea recursos estaticos para funcionamiento offline

const CACHE_NAME = 'mundo-felino-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/images/gato1.avif',
  '/images/gato2.avif',
  '/images/gato3.avif',
  '/images/gato4.avif',
  '/images/gato5.avif',
  '/images/gato6.avif',
  '/images/gato7.avif',
  '/images/gato8.avif'
];

// Instalacion: precachea todos los assets criticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activacion: limpia caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Estrategia: Cache First, fallback a network
self.addEventListener('fetch', (event) => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Solo cachear respuestas exitosas del mismo origen
        if (
          response.ok &&
          response.type === 'basic' &&
          new URL(event.request.url).origin === self.location.origin
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Si falla todo y es navegacion, devolver index
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
