/* -----------------------------------------------
   contacto.js — Lógica exclusiva de la página
   de contacto
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
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── Envío del formulario (simulado) ──────────
  const submitBtn = document.getElementById('contact-submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const nombre  = document.getElementById('nombre').value.trim();
    const email   = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
      submitBtn.textContent = 'COMPLETA LOS CAMPOS';
      submitBtn.style.color = '#b00';
      submitBtn.style.borderBottomColor = '#b00';
      setTimeout(() => {
        submitBtn.textContent = 'ENVIAR MENSAJE';
        submitBtn.style.color = '';
        submitBtn.style.borderBottomColor = '';
      }, 2400);
      return;
    }

    // Construcción del mailto como fallback limpio
    const subject = encodeURIComponent(`Contacto desde portfolio — ${nombre}`);
    const body    = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`);
    window.location.href = `mailto:joji.oyaneder@gmail.com?subject=${subject}&body=${body}`;
  });

});