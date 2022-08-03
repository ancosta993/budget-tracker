// define cache name
const APP_PREFIX = 'BudgetWorker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// files to CACAHE
const FILES_TO_CACHE = [
   './index.html',
   './js/index.js'
]

// on install fazee
self.addEventListener('install', function(e){
   e.waitUntil(
      caches.open(CACHE_NAME)
         .then(cache => {
            console.log("Installing Cache : " + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE);
         })
   )
});


self.addEventListener('activate', function(e){
   e.waitUntil(
      caches.keys().then(function(keyList){
         let cacheKeepList = keyList.filter(function(key){
            return key.indexOf(APP_PREFIX);
         });
         cacheKeepList.push(CACHE_NAME);

         return Promise.all(
            keyList.map(function(key, i){
               if(cacheKeepList.indexOf(key) === -1) {
                  console.log('deleting cache : ' + keyList[i]);
                  return caches.delete(keyList[i]);
               }
            })
         );
      })
   );
})

self.addEventListener('fetch', function(e){
   console.log('fetch request : ' + e.reques.url);
   e.respondWith(
      caches.match(e.request).then(function(request){
         if(request){
            console.log('responding with cache: ' + e.request.url)
            return request
         } else {
            console.log('file is not cached, fetching ' + e.request.url)
            return fetch(e.request);
         }
      })
   )
})