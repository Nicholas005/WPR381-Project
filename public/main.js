/**
 * ADVANCED EVENTS — Main Client JS
 * Handles: mobile nav, particle effects, scroll animations, flash messages
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Navigation Toggle ───────────────────────────────────────────────
  const toggle = document.getElementById('navbarToggle');
  const navMenu = document.getElementById('navbarMenu');
  const navActions = document.getElementById('navbarActions');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu?.classList.toggle('open');
      navActions?.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navMenu?.classList.remove('open');
      navActions?.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    }
  });

  // ─── Active Nav Link ─────────────────────────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath === href) {
      link.classList.add('active');
    } else if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // ─── Particle Effects ────────────────────────────────────────────────────────
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    const colors = ['#b44fff', '#00d4ff', '#ff2d78', '#ffffff'];
    const count = window.innerWidth > 768 ? 40 : 20;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 8;
      const delay = Math.random() * 10;

      p.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 3}px ${color};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  // ─── Scroll Reveal Animations ────────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // ─── Flash / Alert Auto-dismiss ──────────────────────────────────────────────
  document.querySelectorAll('.alert[data-autodismiss]').forEach(alert => {
    const delay = parseInt(alert.dataset.autodismiss) || 5000;
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-10px)';
      setTimeout(() => alert.remove(), 500);
    }, delay);
  });

  // Manual close for alerts
  document.querySelectorAll('.alert-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.alert');
      if (alert) {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }
    });
  });

  // ─── Stat Counter Animations ─────────────────────────────────────────────────
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  if (statValues.length) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1500;
          const start = performance.now();

          const animate = (time) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => statsObserver.observe(el));
  }

  // ─── Hero Stat Counters (simple version) ─────────────────────────────────────
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 25);
  });

  // ─── Filter Form Enhancement ─────────────────────────────────────────────────
  const filterForm = document.getElementById('filterForm');
  if (filterForm) {
    // Auto-submit on select change
    filterForm.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', () => filterForm.submit());
    });

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        filterForm.querySelectorAll('input, select').forEach(el => {
          if (el.type !== 'submit') el.value = '';
        });
        filterForm.submit();
      });
    }
  }

  // ─── Image Lazy Load + Error Fallback ────────────────────────────────────────
  document.querySelectorAll('img[data-src]').forEach(img => {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    imgObserver.observe(img);
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const placeholder = img.closest('.event-card-image');
      if (placeholder) {
        placeholder.innerHTML = '<div class="event-card-image-placeholder">🎪</div>';
      }
    });
  });

  // ─── Confirm Delete ───────────────────────────────────────────────────────────
  document.querySelectorAll('[data-confirm]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (!confirm(el.dataset.confirm || 'Are you sure?')) {
        e.preventDefault();
      }
    });
  });

  // ─── Scroll to top button ────────────────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.opacity = window.scrollY > 500 ? '1' : '0';
      scrollTopBtn.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Glowing cursor trail (optional, desktop only) ───────────────────────────
  if (window.innerWidth > 1024) {
    let trail = [];
    const maxTrail = 8;

    document.addEventListener('mousemove', (e) => {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--neon-purple);
        box-shadow: 0 0 8px var(--neon-purple);
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        transition: opacity 0.5s ease;
        opacity: 0.6;
      `;
      document.body.appendChild(dot);
      trail.push(dot);

      if (trail.length > maxTrail) {
        const old = trail.shift();
        old.style.opacity = '0';
        setTimeout(() => old.remove(), 500);
      }

      setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 500);
        trail = trail.filter(d => d !== dot);
      }, 200);
    });
  }

});