const _previousVersion = "scrib_v1";
const _version = "scrib_v1";

const _staticFiles = [
    "/",
    "/favicon.ico",
    "/manifest.json",
    "/clipboard.png"
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