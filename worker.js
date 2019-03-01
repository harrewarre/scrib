const _previousVersion = "scrib_v1";
const _version = "scrib_v2";

const _staticFiles = [
    "/scrib/",
    "/scrib/favicon.ico",
    "/scrib/manifest.json",
    "/scrib/clipboard_144x144.png",
    "/scrib/clipboard_192x192.png",
    "/scrib/clipboard_512x512.png"
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