(function () {
  'use strict';
  var root = document.documentElement;

  // Fecha o menu mobile ao clicar em uma âncora.
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
  }

  // Fallback de revelação por scroll, só sem animation-timeline.
  var supportsTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsTimeline && !reduce && 'IntersectionObserver' in window) {
    root.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }
})();
