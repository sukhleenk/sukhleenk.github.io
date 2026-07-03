// scroll-in reveals
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// rotating word in the hero (words come from _config.yml via data-words)
const rotator = document.getElementById('rotator');
if (rotator && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = (rotator.dataset.words || rotator.textContent).split('|');
  let wi = 0;
  setInterval(() => {
    rotator.classList.add('swap');
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      rotator.textContent = words[wi];
      rotator.classList.remove('swap');
    }, 300);
  }, 2600);
}

// paint progress bar along the top + timeline that draws itself
const paintBar = document.getElementById('paint-bar');
const timeline = document.querySelector('.timeline');
let scrollQueued = false;
function paintOnScroll() {
  if (paintBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    paintBar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  if (timeline) {
    const box = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - box.top) / box.height));
    timeline.style.setProperty('--tl-progress', p.toFixed(4));
  }
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(paintOnScroll);
  }
}, { passive: true });
window.addEventListener('resize', paintOnScroll);
paintOnScroll();

// highlight the section currently in view in the nav
const navAnchor = {};
document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
  navAnchor[a.hash.slice(1)] = a;
});
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.nav-links a.active').forEach((x) => x.classList.remove('active'));
    const link = navAnchor[e.target.id];
    if (link) link.classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });
['work', 'experience', 'education', 'skills', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObs.observe(el);
});

// little easter egg: the paint swatches by the photo tint the hero
const hero = document.querySelector('.hero');
document.querySelectorAll('.swatch-card i').forEach((sw) => {
  sw.addEventListener('click', () => {
    const c = sw.style.getPropertyValue('--c');
    if (hero.style.getPropertyValue('--hero-accent') === c) {
      hero.style.removeProperty('--hero-accent');
    } else {
      hero.style.setProperty('--hero-accent', c);
    }
  });
});

// mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );
}

document.getElementById('year').textContent = new Date().getFullYear();
