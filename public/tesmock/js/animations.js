/* ============================================================
   TES — animations.js
   AV lighting background controller:
     · assigns a GIF to every [data-bg-anim] section
     · crossfades 3 GIFs in the hero on an 8s cycle
   GIFs are heavy, so every load is lazy and deferred until the
   host section is near the viewport.
   ============================================================ */

(function () {
  'use strict';

  var BASE = 'assets/animations/';
  var GIFS = [
    BASE + 'av-light-01.gif',
    BASE + 'av-light-02.gif',
    BASE + 'av-light-03.gif',
    BASE + 'av-light-04.gif',
    BASE + 'av-light-05.gif',
    BASE + 'av-light-06.gif',
    BASE + 'av-light-07.gif',
    BASE + 'av-light-08.gif',
    BASE + 'av-light-09.gif'
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Fisher-Yates — gives each section a distinct GIF before repeating */
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Load a GIF, then fade its layer in — avoids a hard pop-in */
  function loadInto(el, src, onReady) {
    var img = new Image();
    img.onload = function () {
      el.style.setProperty('--bg-gif', 'url("' + src + '")');
      el.style.backgroundImage = 'url("' + src + '")';
      el.classList.add('is-live');
      if (onReady) onReady();
    };
    img.onerror = function () {
      // GIF missing — leave the layer transparent rather than showing a broken box
      if (onReady) onReady();
    };
    img.src = src;
  }

  /* ---------- Section backgrounds ---------- */
  function initSectionBackgrounds() {
    var hosts = document.querySelectorAll('[data-bg-anim]');
    if (!hosts.length) return;

    var pool = shuffled(GIFS);
    var idx = 0;

    Array.prototype.forEach.call(hosts, function (host) {
      // Sections may declare their own opacity via data-bg-opacity
      var layer = document.createElement('div');
      layer.className = 'section-bg-animation';
      layer.setAttribute('aria-hidden', 'true');
      layer.style.setProperty('--bg-opacity', host.dataset.bgOpacity || '0.10');

      var explicit = host.dataset.bgAnim;
      var src = explicit && explicit !== 'auto'
        ? BASE + explicit
        : pool[idx++ % pool.length];

      host.insertBefore(layer, host.firstChild);

      // Defer the actual download until the section is close to view
      observeOnce(host, function () { loadInto(layer, src); }, '600px');
    });
  }

  /* ---------- Hero crossfade ---------- */
  function initHeroLights() {
    var stage = document.querySelector('.hero-lights');
    if (!stage) return;

    var picks = shuffled(GIFS).slice(0, 3);
    var layers = picks.map(function () {
      var l = document.createElement('div');
      l.className = 'hero-light-layer';
      l.setAttribute('aria-hidden', 'true');
      stage.appendChild(l);
      return l;
    });

    var current = 0;
    var loaded = [];

    // Load the first GIF immediately — it's the above-the-fold atmosphere
    loadInto(layers[0], picks[0], function () {
      loaded[0] = true;
      layers[0].classList.add('is-active');
    });

    if (reduceMotion) return; // one static layer is enough

    // Stagger the other two so they don't fight the first for bandwidth
    picks.slice(1).forEach(function (src, i) {
      setTimeout(function () {
        loadInto(layers[i + 1], src, function () { loaded[i + 1] = true; });
      }, 4000 * (i + 1));
    });

    setInterval(function () {
      if (document.hidden) return; // don't churn in a background tab

      var next = (current + 1) % layers.length;
      if (!loaded[next]) return;   // skip until that layer is ready

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
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          cb();
        }
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
