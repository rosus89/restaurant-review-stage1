// Source: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

let cache_name = 'restaurants-review-Cache-v1';
let cached_items = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/data/restaurants.json'
    
]
// Install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cache_name).then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(cached_items);
        })
    );
});

// activate
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cache_name).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});