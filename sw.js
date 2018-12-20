// Source: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

// Install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('restaurants-review-Cache-v1').then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(
                [   '/',
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
                    '/css/styles.css'
                ]
            );
        })
    );
});

// Cache falling back to the network offline first method

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((response) => {
            return response || fetch(event.request);
        })
    ); 
});