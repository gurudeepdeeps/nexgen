// Service Worker for ZERONE - YUGA
// Version: 3.0.0

const CACHE_NAME = 'zerone-v3';
const OFFLINE_URL = '/offline.html';

// List of files to cache during installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/App.tsx',
  '/constants.ts',
  '/types.ts',
  '/vite.config.ts',
  '/SIT-Tumkur-Logo.png',
  '/event-coordinators-dp/achyuth.jpg',
  '/event-coordinators-dp/bindushree_tr.jpeg',
  '/event-coordinators-dp/bindusree_ks.jpeg',
  '/event-coordinators-dp/khushi.jpeg',
  '/event-coordinators-dp/likitha.jpeg',
  '/event-coordinators-dp/lingadevaru.jpg',
  '/event-coordinators-dp/madhumitha.jpeg',
  '/event-coordinators-dp/nithya.jpg',
  '/event-coordinators-dp/nuthan.jpg',
  '/event-coordinators-dp/pooja.jpeg',
  '/event-coordinators-dp/shashiraj.jpeg',
  '/event-coordinators-dp/snehashree.jpeg',
  '/BROCHURE.pdf',
  // Add other static assets here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch((error) => {
        console.error('Error during service worker installation:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all clients immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests and non-GET requests
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extensions and other browser-specific requests
  if (event.request.url.includes('chrome-extension://') || 
      event.request.url.includes('sockjs-node') ||
      event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  
  // Handle navigation requests with HTML content
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the response for future use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match('/index.html');
        })
    );
    return;
  }
  
  // For all other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response for caching
            const responseToCache = response.clone();
            
            // Cache the response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // If both cache and network fail, show offline page for HTML requests
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Listen for message events (can be used for cache updates)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
