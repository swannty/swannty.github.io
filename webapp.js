
'use strict'

const cache_name = 'cache-token-v1';
const cache_files = ['./index.html', './worker.js', './w3.css', './logo.svg', 'favicon.png'];

self.addEventListener('install', function(e)
{
	e.waitUntil((async () =>
	{
		const cache = await caches.open(cache_name);
		await cache.addAll(cache_files);
	})());
});


self.addEventListener('fetch', function(e)
{
	e.respondWith((async () =>
	{
		const res = await caches.match(e.request);
		return res || fetch(e.request);
	})());
});

