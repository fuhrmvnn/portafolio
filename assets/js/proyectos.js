/* -----------------------------------------------
   proyectos.js — Lógica exclusiva de la página
   de archivo de proyectos
----------------------------------------------- */
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ── Filtro por categoría ──────────────────────
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards      = document.querySelectorAll('.archive-card-wrap');
 
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Estado activo del tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
 
      const filter = tab.dataset.filter;
 
      cards.forEach(card => {
        const category = card.dataset.category;
        const match    = filter === 'all' || category === filter;
 
        if (match) {
          card.style.display = '';
          // Re-trigger reveal si estaba oculto
          requestAnimationFrame(() => {
            card.querySelector('.archive-card')?.classList.add('visible');
          });
        } else {
          card.style.display = 'none';
        }
      });
 
      // Recalcular bordes según columnas visibles
      updateBorders();
    });
  });
 
  // ── Bordes dinámicos por fila ─────────────────
  function updateBorders() {
    const visibleWraps = [...cards].filter(c => c.style.display !== 'none');
    const cols = getColumnsCount();
 
    visibleWraps.forEach((wrap, i) => {
      // Borde derecho: quitar en el último de cada fila
      const isLastInRow = (i + 1) % cols === 0 || i === visibleWraps.length - 1;
      wrap.style.borderRight = isLastInRow ? 'none' : '';
    });
  }
 
  function getColumnsCount() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 768) return 2;
    return 1;
  }
 
  window.addEventListener('resize', updateBorders);
 
  // ── Reveal on scroll ─────────────────────────
  // (Reutiliza el sistema del index si script.js ya lo maneja;
  //  si no, activamos uno propio aquí.)
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
 
});
 