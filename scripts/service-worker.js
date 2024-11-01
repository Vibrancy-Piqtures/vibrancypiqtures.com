const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/scripts/script1.js',
  '/css/style.css'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error('Failed to open cache:', error))
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // If the request is in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request).catch(function() {
          console.warn('Fetching failed; returning offline page instead.');
          return caches.match('/offline.html');
        });
      })
  );
});

