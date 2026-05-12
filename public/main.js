/* 
  main.js
  Handles all the interactive bits:
  - navbar becomes solid when you scroll down
  - hamburger opens/closes the mobile menu
  - flash messages disappear after 4 seconds
  - elements fade in as you scroll down the page
  - buttons have a ripple effect on click
  - stat card numbers count up when they come into view
*/

document.addEventListener('DOMContentLoaded', () => {

  /* 
    NAVBAR - add .solid class when user scrolls down
    This makes the background more opaque
  */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('solid', window.scrollY > 40);
    }, { passive: true });
  }

  /* 
    HAMBURGER MENU
    Toggles the mobile nav open/closed.
    Also animates the three bars into an X.
  */
  const toggleBtn  = document.getElementById('navbarToggle');
  const navMenu    = document.getElementById('navbarMenu');
  const navActions = document.getElementById('navbarActions');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open', isOpen);
      if (navActions) navActions.classList.toggle('open', isOpen);
    });

    /* Close menu when a link is clicked (smooth on mobile) */
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navActions && navActions.classList.remove('open');
        toggleBtn.classList.remove('open');
      });
    });

    /* Close menu when clicking outside of it */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        navActions && navActions.classList.remove('open');
        toggleBtn.classList.remove('open');
      }
    });
  }

  /* 
    FLASH MESSAGES
    Auto-remove each flash message after 4 seconds
  */
  document.querySelectorAll('.flash-msg').forEach(msg => {
    setTimeout(() => {
      msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      msg.style.opacity    = '0';
      msg.style.transform  = 'translateY(-8px)';
      setTimeout(() => msg.remove(), 400);
    }, 4000);
  });

  /* 
    SCROLL REVEAL
    Elements with class .reveal start invisible.
    IntersectionObserver adds .visible when they scroll into view.
  */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target); /* only animate once */
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => revealObs.observe(el));
  }

  /* 
    RIPPLE EFFECT ON BUTTONS
    When you click a .btn, a circle expands from where you clicked
  */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleGrow 0.5s linear;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 550);
    });
  });

  /* Add the ripple keyframe dynamically if it doesn't already exist */
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleGrow {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* 
    COUNTER ANIMATION
    Elements with data-counter animate their number
    from 0 up to the target when they scroll into view
  */
  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(el => countObs.observe(el));
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.counter || el.textContent.replace(/[^0-9.]/g, ''));
    const isFloat  = String(target).includes('.');
    const duration = 1600;
    const start    = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      /* ease out quart */
      const eased    = 1 - Math.pow(1 - progress, 4);
      el.textContent = isFloat
        ? (target * eased).toFixed(1)
        : Math.floor(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* 
    CAPACITY BARS
    Bars start at 0 width and expand to their target
    when they scroll into view
  */
  document.querySelectorAll('.cap-bar, .capacity-bar').forEach(bar => {
    const fill = bar.querySelector('.cap-fill, .capacity-fill');
    if (!fill) return;

    /* Store the target width then reset to 0 */
    const target = fill.style.width;
    fill.dataset.target = target;
    fill.style.width    = '0%';

    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => fill.style.width = fill.dataset.target, 150);
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    barObs.observe(bar);
  });

  /* 
    MODAL HELPERS
    openModal and closeModal can be called from EJS onclick attributes
  */
  window.openModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  /* Close modal when clicking on the dark background behind it */
  document.querySelectorAll('.modal-bg').forEach(bg => {
    bg.addEventListener('click', (e) => {
      if (e.target === bg) closeModal(bg.id);
    });
  });

  /* Close modal with Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-bg.open').forEach(m => closeModal(m.id));
    }
  });

  /* 
    TOAST NOTIFICATION
    Call showToast('Your message', 'success') from anywhere
  */
  window.showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.style.cssText = `
        position: fixed; top: 80px; right: 18px; z-index: 5000;
        display: flex; flex-direction: column; gap: 8px; pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: var(--dark-card);
      border: 1px solid var(--dark-border);
      border-left: 3px solid var(--neon-purple);
      color: var(--text-primary);
      padding: 11px 16px;
      border-radius: var(--radius-md);
      font-size: 0.87rem;
      font-weight: 500;
      min-width: 240px;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: all;
      box-shadow: 0 8px 22px rgba(0,0,0,0.5);
      animation: slideUp 0.35s ease;
    `;

    toast.innerHTML = `<span>${icons[type] || '✓'}</span><span>${message}</span>`;
    container.appendChild(toast);

    /* Remove after 3.5 seconds */
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s, transform 0.4s';
      toast.style.opacity    = '0';
      toast.style.transform  = 'translateX(14px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  console.log('Advanced Events - UI ready');
});