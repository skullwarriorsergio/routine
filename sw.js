// Offline support: the app opens instantly from the cache, then refreshes itself in the background.
const CACHE = 'routine-05a18e8c6a';
const ASSETS = [
 "./",
 "./index.html",
 "./manifest.webmanifest",
 "./icon-180.png",
 "./icon-192.png",
 "./icon-512.png",
 "./img/anim/arnold.webp",
 "./img/anim/back_ext.webp",
 "./img/anim/bench.webp",
 "./img/anim/cable_lateral.webp",
 "./img/anim/cable_row.webp",
 "./img/anim/calf.webp",
 "./img/anim/cs_pulldown.webp",
 "./img/anim/db_lateral.webp",
 "./img/anim/db_shoulder_press.webp",
 "./img/anim/face_pull.webp",
 "./img/anim/hammer_curl.webp",
 "./img/anim/htl_fly.webp",
 "./img/anim/incline_db.webp",
 "./img/anim/katana.webp",
 "./img/anim/leg_curl.webp",
 "./img/anim/leg_ext.webp",
 "./img/anim/leg_press.webp",
 "./img/anim/lth_fly.webp",
 "./img/anim/lunges.webp",
 "./img/anim/machine_fly.webp",
 "./img/anim/machine_press.webp",
 "./img/anim/mts_high_row.webp",
 "./img/anim/mts_row.webp",
 "./img/anim/plank.webp",
 "./img/anim/preacher.webp",
 "./img/anim/pullup.webp",
 "./img/anim/pushdown.webp",
 "./img/anim/rev_crunch.webp",
 "./img/anim/rev_pec.webp",
 "./img/anim/rope_pushdown.webp",
 "./img/anim/sl_rdl.webp",
 "./img/anim/smith_shrug.webp",
 "./img/anim/straight_arm.webp",
 "./img/anim/zottman.webp",
 "./img/r15c6.png",
 "./img/r18c5.png",
 "./img/r3c7.jpeg",
 "./img/thumb/arnold.webp",
 "./img/thumb/back_ext.webp",
 "./img/thumb/bayesian.webp",
 "./img/thumb/behind_ext.webp",
 "./img/thumb/bench.webp",
 "./img/thumb/cable_lateral.webp",
 "./img/thumb/cable_row.webp",
 "./img/thumb/calf.webp",
 "./img/thumb/cs_pulldown.webp",
 "./img/thumb/db_lateral.webp",
 "./img/thumb/db_shoulder_press.webp",
 "./img/thumb/face_pull.webp",
 "./img/thumb/hammer_curl.webp",
 "./img/thumb/horse.webp",
 "./img/thumb/htl_fly.webp",
 "./img/thumb/incline_db.webp",
 "./img/thumb/katana.webp",
 "./img/thumb/leg_curl.webp",
 "./img/thumb/leg_ext.webp",
 "./img/thumb/leg_press.webp",
 "./img/thumb/lth_fly.webp",
 "./img/thumb/lunges.webp",
 "./img/thumb/machine_fly.webp",
 "./img/thumb/machine_press.webp",
 "./img/thumb/mts_high_row.webp",
 "./img/thumb/mts_row.webp",
 "./img/thumb/plank.webp",
 "./img/thumb/preacher.webp",
 "./img/thumb/pullup.webp",
 "./img/thumb/pushdown.webp",
 "./img/thumb/rev_crunch.webp",
 "./img/thumb/rev_pec.webp",
 "./img/thumb/rope_pushdown.webp",
 "./img/thumb/sl_rdl.webp",
 "./img/thumb/smith_shrug.webp",
 "./img/thumb/straight_arm.webp",
 "./img/thumb/zottman.webp"
];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache (GitHub Pages allows 10 min), so a new version
  // always stores the files that were just published
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonts) return;
  const key = req.mode === 'navigate' ? './index.html' : req;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(key);
    const fresh = fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') cache.put(key, res.clone());
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
});
