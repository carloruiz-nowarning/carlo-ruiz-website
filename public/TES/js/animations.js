/* ============================================================
   TES — animations.js  (video edition, deployed at /TES/)
   AV lighting background controller:
     · assigns a looping video to every [data-bg-anim] section
     · crossfades 3 clips in the hero on an 8s cycle
   Clips are muted, looping MP4/WebM (converted from the source
   GIFs). Every section clip is lazy-loaded and only fetched once
   its host section nears the viewport.
   ============================================================ */

(function () {
  'use strict';

  /* Absolute base so paths resolve at /TES, /TES/, or /TES/index.html alike */
  var BASE = '/TES/assets/animations/';
  var CLIPS = ['01','02','03','04','05','06','07','08','09'];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Fisher-Yates — distinct clip per section before any repeat */
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Build a muted looping <video>. Sources are attached but not fetched
     until load() is called, thanks to preload="none". */
  function buildVideo(id, className) {
    var v = document.createElement('video');
    v.className = className;
    v.muted = true;
    v.loop = true;
    v.autoplay = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    v.preload = 'none';

    var webm = document.createElement('source');
    webm.dataset.src = BASE + 'av-light-' + id + '.webm';
    webm.type = 'video/webm';
    var mp4 = document.createElement('source');
    mp4.dataset.src = BASE + 'av-light-' + id + '.mp4';
    mp4.type = 'video/mp4';

    v.appendChild(webm);
    v.appendChild(mp4);
    return v;
  }

  /* Promote data-src → src, then load and play */
  function activate(video, onReady) {
    var already = video.dataset.loaded === '1';
    if (!already) {
      Array.prototype.forEach.call(video.querySelectorAll('source'), function (s) {
        if (s.dataset.src) s.src = s.dataset.src;
      });
      video.dataset.loaded = '1';
      video.load();
    }
    var done = false;
    function ready() {
      if (done) return;
      done = true;
      if (onReady) onReady();
    }
    if (video.readyState >= 2) ready();
    else video.addEventListener('loadeddata', ready, { once: true });
    video.addEventListener('error', ready, { once: true });

    var p = video.play();
    if (p && p.catch) p.catch(function () { /* autoplay blocked — clip stays on first frame */ });
  }

  /* ---------- Section backgrounds ---------- */
  function initSectionBackgrounds() {
    var hosts = document.querySelectorAll('[data-bg-anim]');
    if (!hosts.length) return;

    var pool = shuffled(CLIPS);
    var idx = 0;

    Array.prototype.forEach.call(hosts, function (host) {
      var explicit = host.dataset.bgAnim;
      var id = explicit && explicit !== 'auto' ? explicit : pool[idx++ % pool.length];

      var video = buildVideo(id, 'section-bg-animation');
      video.style.setProperty('--bg-opacity', host.dataset.bgOpacity || '0.10');
      host.insertBefore(video, host.firstChild);

      // Defer the fetch until the section is close to view
      observeOnce(host, function () {
        activate(video, function () { video.classList.add('is-live'); });
      }, '600px');
    });
  }

  /* ---------- Hero crossfade ---------- */
  function initHeroLights() {
    var stage = document.querySelector('.hero-lights');
    if (!stage) return;

    var picks = shuffled(CLIPS).slice(0, 3);
    var layers = picks.map(function (id) {
      var v = buildVideo(id, 'hero-light-layer');
      stage.appendChild(v);
      return v;
    });

    var current = 0;
    var ready = [];

    // First clip is above-the-fold atmosphere — load it now
    activate(layers[0], function () {
      ready[0] = true;
      layers[0].classList.add('is-active');
    });

    if (reduceMotion) return; // one static layer is enough

    // Stagger the other two so they don't fight for bandwidth
    picks.slice(1).forEach(function (_id, i) {
      setTimeout(function () {
        activate(layers[i + 1], function () { ready[i + 1] = true; });
      }, 4000 * (i + 1));
    });

    setInterval(function () {
      if (document.hidden) return;      // don't churn in a background tab
      var next = (current + 1) % layers.length;
      if (!ready[next]) return;         // skip until that layer is decoded
      layers[current].classList.remove('is-active');
      layers[next].classList.add('is-active');
      current = next;
    }, 8000);
  }

  /* ---------- Shared one-shot observer ---------- */
  function observeOnce(el, cb, margin) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.unobserve(entry.target); cb(); }
      });
    }, { rootMargin: margin || '200px' });
    io.observe(el);
  }

  function init() {
    initHeroLights();
    initSectionBackgrounds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
