/* ============================================================
   TES — main.js
   Nav scroll behaviour · mobile menu · scroll entrances ·
   count-up stats · FAQ accordion · form handling (mock)
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: compress on scroll ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var ticking = false;
    function update() {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Mobile overlay menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var overlay = document.querySelector('.nav-overlay');
    if (!toggle || !overlay) return;

    function setOpen(open) {
      toggle.classList.toggle('is-open', open);
      overlay.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(!overlay.classList.contains('is-open'));
    });

    // Close on link tap or Escape
    overlay.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll entrance animations ---------- */
  function initScrollAnims() {
    var els = document.querySelectorAll('[data-anim]');
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('is-visible'); });
      return;
    }

    /*
      A [data-anim="reveal"] element is hidden with clip-path: inset(100%),
      which collapses its intersection rect to zero — IntersectionObserver
      would never fire on it. So each element is watched via an unclipped
      "trigger" node (its parent for reveals, itself otherwise), and one
      trigger can drive several elements.
    */
    var targets = new Map();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        (targets.get(entry.target) || []).forEach(function (el) {
          el.classList.add('is-visible');
        });
        targets.delete(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(els, function (el) {
      // Stagger siblings inside a [data-stagger] parent
      var parent = el.closest('[data-stagger]');
      if (parent) {
        var sibs = parent.querySelectorAll('[data-anim]');
        var i = Array.prototype.indexOf.call(sibs, el);
        if (i > -1) el.style.setProperty('--delay', (i * 0.1) + 's');
      }

      var trigger = el.dataset.anim === 'reveal' && el.parentElement
        ? el.parentElement
        : el;

      if (targets.has(trigger)) {
        targets.get(trigger).push(el);
      } else {
        targets.set(trigger, [el]);
        io.observe(trigger);
      }
    });
  }

  /* ---------- Count-up stats ---------- */
  function initCountUp() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    function run(el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.countSuffix || '';
      if (isNaN(target)) return;

      if (reduceMotion) { el.textContent = target + suffix; return; }

      var dur = 1600;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        // easeOutExpo — fast then settling, matches the site's motion feel
        var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        run(entry.target);
      });
    }, { threshold: 0.5 });

    Array.prototype.forEach.call(els, function (el) {
      el.textContent = '0' + (el.dataset.countSuffix || '');
      io.observe(el);
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var qs = document.querySelectorAll('.faq-q');
    Array.prototype.forEach.call(qs, function (q) {
      q.addEventListener('click', function () {
        var open = q.getAttribute('aria-expanded') === 'true';

        // Single-open accordion within each .faq group
        var group = q.closest('.faq');
        if (group && !open) {
          group.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (other) {
            other.setAttribute('aria-expanded', 'false');
          });
        }
        q.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ---------- Quote forms (mock — no backend) ---------- */
  function initForms() {
    var forms = document.querySelectorAll('form[data-mock-form]');
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var btn = form.querySelector('[type="submit"]');
        var note = form.querySelector('.form-status');
        if (!note) {
          note = document.createElement('p');
          note.className = 'form-status form-note';
          form.appendChild(note);
        }

        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        // Proof-of-concept only — nothing is transmitted anywhere
        setTimeout(function () {
          note.innerHTML = '<strong style="color:var(--red-vivid)">Demo only —</strong> ' +
            'this proof-of-concept form is not connected to a backend. ' +
            'On the live site this routes to the TES sales inbox.';
          if (btn) { btn.disabled = false; btn.textContent = 'Submit — Get a Quote'; }
        }, 700);
      });
    });
  }

  /* ---------- Marquee duplication (mobile service areas) ---------- */
  function initMarquee() {
    var list = document.querySelector('.areas-list[data-marquee]');
    if (!list) return;
    // Duplicate the items so the -50% translate loops seamlessly
    list.innerHTML += list.innerHTML;
  }

  function init() {
    initNavScroll();
    initMobileMenu();
    initScrollAnims();
    initCountUp();
    initFaq();
    initForms();
    initMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
