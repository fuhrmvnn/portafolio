/* -----------------------------------------------
   single-proyecto.js — Lógica del single
----------------------------------------------- */
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ── Reveal on scroll ─────────────────────────
  if (!window.__revealObserver) {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
 
    revealEls.forEach(el => observer.observe(el));
    window.__revealObserver = observer;
  }
 
});
 