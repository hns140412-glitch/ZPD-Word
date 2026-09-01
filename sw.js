const CACHE='word-detective-v4.0.0';
const CORE=["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./assets/asset-map.json", "./assets/backgrounds/academy.png", "./assets/backgrounds/bookstore.png", "./assets/backgrounds/cafe.png", "./assets/backgrounds/classroom.png", "./assets/backgrounds/night.png", "./assets/backgrounds/park.png", "./assets/backgrounds/station.png", "./assets/characters/buffalo.png", "./assets/characters/fennec.png", "./assets/characters/fox.png", "./assets/characters/hippo.png", "./assets/characters/leopard.png", "./assets/characters/rabbit.png", "./assets/characters/sheep.png", "./assets/characters/sloth.png", "./assets/emotions/good.png", "./assets/emotions/great.png", "./assets/emotions/hmm.png", "./assets/emotions/oops.png", "./assets/icons/icon-128x128.png", "./assets/icons/icon-144x144.png", "./assets/icons/icon-180x180.png", "./assets/icons/icon-192x192.png", "./assets/icons/icon-512x512.png", "./assets/icons/icon-72x72.png", "./assets/icons/icon-96x96.png", "./assets/rewards/great-badge.png", "./assets/ui/badge-paw.png", "./assets/ui/badge-star.png", "./assets/ui/home.png", "./assets/ui/mypage.png", "./assets/ui/quiz-panel.png", "./assets/ui/quiz.png", "./assets/ui/review.png", "./assets/ui/study.png", "./assets/ui/word-card.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
      if(res && res.ok && new URL(e.request.url).origin===self.location.origin){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return res;
    }).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))
  );
});
