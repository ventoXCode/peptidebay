/**
 * PeptideBay Scroll Animations
 * Adds chemistry-themed scroll effects
 */

export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on element position
        const delay = (index % 10) * 50;
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.classList.add('animate-crystallize');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Card hover effects - molecular glow
 */
export function initCardEffects() {
  document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s ease';
    });
  });
}

/**
 * Search input glow effect
 */
export function initSearchEffects() {
  const searchInputs = document.querySelectorAll('.search-lab');
  
  searchInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.add('animate-border-glow');
    });
    
    input.addEventListener('blur', () => {
      input.classList.remove('animate-border-glow');
    });
  });
}

/**
 * Initialize all animations
 */
export function initAllAnimations() {
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initCardEffects();
      initSearchEffects();
    });
  } else {
    initScrollAnimations();
    initCardEffects();
    initSearchEffects();
  }
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  initAllAnimations();
}
