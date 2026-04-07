// background.js — floating snippets, theme toggle, nav behaviour
(function () {

  /* ── Theme toggle ───────────────────────────────────────── */
  var toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* ── Hamburger menu ─────────────────────────────────────── */
  var hamburger = document.getElementById("hamburger");
  var navLinks  = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open);
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
    // close menu on outside click
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Active nav on scroll ───────────────────────────────── */
  var sections = document.querySelectorAll("section[id], header[id]");
  var links    = document.querySelectorAll(".nav-links a");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("active"); });
        var match = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
        if (match) match.classList.add("active");
      }
    });
  }, { rootMargin: "-35% 0px -60% 0px" });
  sections.forEach(function (s) { io.observe(s); });

}());
