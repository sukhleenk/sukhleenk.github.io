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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// rotating word in the hero (words come from _config.yml via data-words)
const rotator = document.getElementById('rotator');
if (rotator && !reduceMotion) {
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

// yarn that unspools along the top + timeline that draws itself
const yarn = document.getElementById('yarn');
const timeline = document.querySelector('.timeline');
let scrollQueued = false;
function drawOnScroll() {
  if (yarn) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    yarn.style.setProperty('--p', (max > 0 ? window.scrollY / max : 0).toFixed(4));
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
    requestAnimationFrame(drawOnScroll);
  }
}, { passive: true });
window.addEventListener('resize', drawOnScroll);
drawOnScroll();

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

// the lamp in the nav: pull the cord to switch between the day and night studio.
// the starting theme is already set by the inline script in <head>
const root = document.documentElement;
const lamp = document.getElementById('lamp');
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeColor.content = theme === 'dark' ? '#1D1916' : '#FBF6EC';
  if (lamp) {
    lamp.setAttribute('aria-pressed', theme === 'dark');
    lamp.title = theme === 'dark' ? 'Pull for daylight' : 'Pull for night mode';
  }
}
setTheme(root.dataset.theme);

if (lamp) {
  lamp.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (e) {}

    lamp.classList.remove('tug');
    void lamp.offsetWidth; // restart the tug animation
    lamp.classList.add('tug');

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }
    // the new theme spills outward from the lamp like light filling a room
    const box = lamp.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height * 0.6;
    const reach = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const swap = document.startViewTransition(() => setTheme(next));
    swap.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${reach}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.5, 0, .3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });
}

// follow the system setting until someone picks a theme themselves
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (!saved) setTheme(e.matches ? 'dark' : 'light');
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

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
