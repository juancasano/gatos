/* ============================================================
   Mundo Felino - JavaScript principal
   - Dark mode con localStorage
   - Buscador de galeria en tiempo real
   - Lightbox para imagenes con teclado y swipe
   - Animaciones de scroll con Intersection Observer
   - Boton "ir arriba"
   - Validacion de formulario de contacto
   - Registro del Service Worker
   ============================================================ */

(function () {
  'use strict';

  /* ============ DARK MODE ============ */
  const THEME_KEY = 'mundo-felino-theme';
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }
  }

  // Cargar tema guardado o detectar preferencia del sistema
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ============ BUSCADOR DE GALERIA ============ */
  const searchInput = document.getElementById('gallery-search-input');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const emptyMessage = document.querySelector('.gallery-empty');

  function filterGallery(query) {
    const normalizedQuery = query.trim().toLowerCase();
    let visibleCount = 0;

    galleryItems.forEach((item) => {
      const tags = (item.dataset.tags || '').toLowerCase();
      const matches = !normalizedQuery || tags.includes(normalizedQuery);
      item.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    emptyMessage?.classList.toggle('is-visible', visibleCount === 0);
  }

  searchInput?.addEventListener('input', (e) => filterGallery(e.target.value));

  /* ============ LIGHTBOX ============ */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxCounter = lightbox?.querySelector('.lightbox-counter');
  let currentIndex = 0;
  let lightboxImages = [];

  function openLightbox(index) {
    lightboxImages = Array.from(document.querySelectorAll('.gallery-item:not(.is-hidden) img'));
    if (lightboxImages.length === 0) return;
    currentIndex = index;
    showLightboxImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showLightboxImage() {
    const img = lightboxImages[currentIndex];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxImages.length}`;
    }
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + lightboxImages.length) % lightboxImages.length;
    showLightboxImage();
  }

  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
  lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

  // Cerrar al hacer click fuera de la imagen
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navegacion con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Swipe en movil
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      navigateLightbox(diff > 0 ? -1 : 1);
    }
  }, { passive: true });

  /* ============ SCROLL ANIMATIONS ============ */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in-on-scroll').forEach((el) => observer.observe(el));
  } else {
    // Fallback: mostrar todo si no hay soporte
    document.querySelectorAll('.fade-in-on-scroll').forEach((el) => el.classList.add('is-visible'));
  }

  /* ============ BOTON "IR ARRIBA" + NAVBAR AUTO-HIDE/SHOW ============ */
  const backToTop = document.querySelector('.back-to-top');
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  const SCROLL_DELTA = 8; // umbral minimo para registrar cambio de direccion

  function handleScroll() {
    const currentY = window.scrollY;
    const scrolled = currentY > 50;

    backToTop?.classList.toggle('is-visible', currentY > 400);
    navbar?.classList.toggle('scrolled', scrolled);

    if (navbar) {
      const diff = currentY - lastScrollY;

      // Cerca del top: siempre visible
      if (currentY < 80) {
        navbar.classList.remove('is-hidden');
      }
      // Scroll hacia abajo y ya pasaste el hero -> ocultar
      else if (diff > SCROLL_DELTA && currentY > 200) {
        navbar.classList.add('is-hidden');
      }
      // Scroll hacia arriba -> mostrar
      else if (diff < -SCROLL_DELTA) {
        navbar.classList.remove('is-hidden');
      }

      lastScrollY = currentY;
    }
  }

  // Throttle con requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Estado inicial
  handleScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ FORMULARIO DE CONTACTO ============ */
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.querySelector('.form-success');

  const validators = {
    name: (value) => value.trim().length >= 2 || 'Introduce un nombre valido (minimo 2 caracteres).',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Introduce un email con formato valido.',
    message: (value) => value.trim().length >= 10 || 'El mensaje debe tener al menos 10 caracteres.'
  };

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;
    const result = validator(field.value);
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (result === true) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (feedback) feedback.textContent = '';
      return true;
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      if (feedback) feedback.textContent = result;
      return false;
    }
  }

  contactForm?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = contactForm.querySelectorAll('input, textarea');
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (allValid) {
      // Simulacion de envio (no hay backend real)
      contactSuccess?.classList.add('is-visible');
      contactForm.reset();
      fields.forEach((f) => f.classList.remove('is-valid'));
      setTimeout(() => contactSuccess?.classList.remove('is-visible'), 5000);
    }
  });

  /* ============ SERVICE WORKER ============ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker no registrado:', err);
      });
    });
  }
})();
