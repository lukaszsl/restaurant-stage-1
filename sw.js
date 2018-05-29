var cacheName = 'v3';
var cacheFiles = [
	'/',
	'css/styles.css',
	'data/restaurants.json',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js'
];


self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Installed');

	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activated');

	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					console.log('[ServiceWorker] Removing cached files from', key);
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetching', e.request.url);

	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	)
});
