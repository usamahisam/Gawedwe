self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat SVG
  // event.waitUntil(
  //   caches.open('static-v1').then(cache => cache.add('/cat.svg'))
  // );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin == location.origin && url.pathname != '') {
    // event.respondWith(caches.match(url.pathname));
  }
});