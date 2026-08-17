// 칼퇴랩스 — site interactions
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const html = document.documentElement;
  html.classList.add('js');

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- nav: scrolled state + active link ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    }, { threshold: 0.4, rootMargin: '-30% 0px -55% 0px' });
    sections.forEach((s) => navIo.observe(s));
  }

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobilePanel');
  if (toggle && panel) {
    const closeMenu = () => { toggle.classList.remove('open'); panel.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      panel.classList.toggle('open');
    });
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  if (reduceMotion) return;

  /* ---------- cursor glow ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', (e) => {
      glow.style.setProperty('--x', `${e.clientX}px`);
      glow.style.setProperty('--y', `${e.clientY}px`);
    }, { passive: true });
  }

  /* ---------- tilt on service visuals ---------- */
  document.querySelectorAll('.service-visual').forEach((card) => {
    const inner = card.querySelector('.mock');
    if (!inner) return;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave', () => { inner.style.transform = ''; });
    inner.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
    inner.style.transformStyle = 'preserve-3d';
  });

  /* ---------- magnetic buttons ---------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
})();
