const CACHE_NAME = "app-v1";

// INSTALL
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
];

self.addEventListener("install", event => {
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// FETCH ROUTER
self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // HTML → Network First
  if (request.destination === "document") {
    event.respondWith(networkFirst(request));
    return;
  }

  // JS / CSS → Cache First
  if (
    request.destination === "script" ||
    request.destination === "style"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images → Stale While Revalidate
  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // API → Network First
  if (url.pathname.startsWith("/api")) {
    event.respondWith(networkFirst(request));
    return;
  }
});

// STRATEGIES
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse;
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, networkResponse.clone());

  return networkResponse;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const networkFetch = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });

  return cachedResponse || networkFetch;
}