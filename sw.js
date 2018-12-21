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
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});