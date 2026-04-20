// ── METRICS COUNT-UP ANIMATION ──
function animateCountUp(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.metric-value').forEach(animateCountUp);
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const metricsBanner = document.querySelector('.metrics-banner');
if (metricsBanner) metricsObserver.observe(metricsBanner);

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const navLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('main section[id]:not(#metrics)');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.sidebar-nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));
