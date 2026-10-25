/* عامل خدمة بسيط: يجلب أحدث نسخة من الإنترنت دائمًا، ويستخدم النسخة المحفوظة فقط عند انقطاع الاتصال */
var CACHE='mona-v1';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){
    if(r&&r.ok&&(r.type==='basic'||r.type==='cors')){var c=r.clone();caches.open(CACHE).then(function(ch){ch.put(e.request,c);});}
    return r;
  }).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('./');});}));
});
