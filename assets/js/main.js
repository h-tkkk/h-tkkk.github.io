// 칼퇴랩스 — nav, reveal, one-time ritual snap
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobilePanel');
  if (toggle && panel) {
    const closeMenu = () => {
      toggle.classList.remove('open');
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      panel.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  const ritual = document.getElementById('ritual');
  if (!ritual) return;

  const play = () => ritual.classList.add('played');
  if (reduceMotion) {
    play();
    return;
  }
  if ('IntersectionObserver' in window) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
          rio.disconnect();
        }
      });
    }, { threshold: 0.45 });
    rio.observe(ritual);
  } else {
    play();
  }
})();
