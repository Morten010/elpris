const staticCacheName = "staticCache1.0"

const cacheAssets = [
    "/pages/offline.html"
]

// Call Install Event
self.addEventListener('install', e => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log("Service Worker: Caching Files")
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log(err))
    )
})

// Call Activate Event
self.addEventListener("activate", e => {
    console.log('Service Worker: Activated');

    e.waitUntil(
        caches.keys().then(cache => {
            return Promise.all(
                cache.map(cacheItem => {
                    if(cacheItem !== staticCacheName){
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cacheItem)
                    }
                })
            )
        })
    )
})

// call fetch event
self.addEventListener("fetch", e => {
    console.log("Service Worker: Fetching");
    // for chrome extentions
    if(!(e.request.url.indexOf('http') === 0)) return
    
    e.respondWith(
        fetch(e.request).catch(() => {
            if(e.request.url.indexOf('.html') > -1){
                return caches.match('/pages/offline.html')
            }
        })
    )
})