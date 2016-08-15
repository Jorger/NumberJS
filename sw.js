importScripts('/NumberJS/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('numbers').then(function(cache) {
      return cache.addAll([
        '/NumberJS/',
        'index.html',
        'css/styles.min.css',
        'js/build.min.js',
        'sounds/error.mp3',
        'sounds/pop.mp3',
        'sounds/success.mp3',
        'img/icon_192_192.png',
        'img/ribbon.png'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
