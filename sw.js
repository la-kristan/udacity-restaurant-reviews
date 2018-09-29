//service worker code based on https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/ and
//https://itnext.io/service-workers-your-first-step-towards-progressive-web-apps-pwa-e4e11d1a2e85

const filesToCache = [
	"/",
	"/index.html",
	"/restaurant.html",
	"/css/styles.css",
	"/js/dbhelper.js",
	"/js/main.js",
	"/js/restaurant_info.js",
	"/data/restaurants.json",
	"/img/1.jpg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/7.jpg",
	"/img/8.jpg",
	"/img/9.jpg",
	"/img/10.jpg",
];

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open("v3").then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			else {
				const reqClone = event.request.clone();
				return fetch(event.request).then(function(response) {
					const resClone = response.clone();
					caches.open("v3").then(function(cache) {
						cache.put(reqClone, resClone);
					});
					return response;
				});
			}
		})
	);
});