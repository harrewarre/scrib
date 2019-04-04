const _previousVersion = "scrib_v1";
const _version = "scrib_v2";

const _staticFiles = [
    "/",
    "/app.css",
    "/favicon.ico",
    "/manifest.json",
    "/clipboard_144x144.png",
    "/clipboard_192x192.png",
    "/clipboard_512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.delete(_previousVersion));
    event.waitUntil(caches.open(_version).then(cache => {
        return cache.addAll(_staticFiles);
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.open(_version).then((cache) => {
        return cache.match(event.request).then((matching) => {
            return matching || Promise.reject('no-match');
        });
    }));
});