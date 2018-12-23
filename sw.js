// Source: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

// Install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('restaurants-review-Cache-v1').then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(
                [   '/restaurant-review-stage1/',
                    '/restaurant-review-stage1/img/1.jpg',
                    '/restaurant-review-stage1/img/2.jpg',
                    '/restaurant-review-stage1/img/3.jpg',
                    '/restaurant-review-stage1/img/4.jpg',
                    '/restaurant-review-stage1/img/5.jpg',
                    '/restaurant-review-stage1/img/6.jpg',
                    '/restaurant-review-stage1/img/7.jpg',
                    '/restaurant-review-stage1/img/8.jpg',
                    '/restaurant-review-stage1/img/9.jpg',
                    '/restaurant-review-stage1/img/10.jpg',
                    '/restaurant-review-stage1/js/dbhelper.js',
                    '/restaurant-review-stage1/js/main.js',
                    '/restaurant-review-stage1/js/restaurant_info.js',
                    '/restaurant-review-stage1/css/styles.css'
                ]
            );
        })
    );
});

// Cache falling back to the network offline first method

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//         .then((response) => {
//             console.log('fetch request');
//             return response || fetch(event.request);
//         })
//     ); 
// });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('restaurants-review-Cache-v1').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});