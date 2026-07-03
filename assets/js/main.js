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
