
'use strict'

self.addEventListener('install', function(e)
{
	const cache_files = ['./index.html', './worker.js', './qrcode.js', './w3.css', './logo.svg', 'favicon.png'];

	e.waitUntil((async function()
	{
		const cache = await caches.open('tokenizer-v1qr');
		await cache.addAll(cache_files);

	})());
});

self.addEventListener('fetch', function(e)
{
	e.respondWith((async function()
	{
		const res = await caches.match(e.request);
		if (res) return res;
		
		const response = await fetch(e.request);
		const cache = await caches.open('tokenizer-v1qr');

		cache.put(e.request, response.clone());
		return response;

	})());
});

