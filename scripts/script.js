
// Enhanced menu toggle with accessibility
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.querySelector('.hamburger');

  navLinks.classList.toggle('active');

  const isExpanded = navLinks.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);

  // Prevent body scroll when menu is open on mobile
  document.body.style.overflow = isExpanded ? 'hidden' : '';
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
  const nav = document.querySelector('nav');
  const navLinks = document.getElementById('nav-links');

  if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
    toggleMenu();
  }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const navLinks = document.getElementById('nav-links');
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Optimize video loading
document.addEventListener('DOMContentLoaded', function () {
  const video = document.querySelector('.hero-video');
  if (video) {
    video.addEventListener('loadeddata', function () {
      video.style.opacity = '1';
    });
  }
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.section, .benefit-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Performance optimization: Lazy load video
const video = document.querySelector('.hero-video');
if (video && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(e => console.log('Video autoplay failed:', e));
        videoObserver.unobserve(video);
      }
    });
  });
  videoObserver.observe(video);
}

// Handle video errors gracefully
if (video) {
  video.addEventListener('error', function () {
    console.log('Video failed to load, hiding video element');
    video.style.display = 'none';
    document.querySelector('.hero').style.background = 'linear-gradient(135deg, #111 0%, #222 100%)';
  });
}

// Debounced resize handler for performance
let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const navLinks = document.getElementById('nav-links');
      const hamburger = document.querySelector('.hamburger');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  }, 250);
});

// Preload critical images
const criticalImages = ['images/blitzfilm12.png'];
criticalImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Add loading states
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});

// Error handling for missing images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    console.log('Image failed to load:', this.src);
  });
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
  document.head.appendChild(script);
}
document.querySelector('.hamburger')?.addEventListener('click', () => {
  const nav = document.getElementById('nav-links');
  const btn = document.querySelector('.hamburger');

  nav.classList.toggle('active');
  btn.setAttribute('aria-expanded', nav.classList.contains('active'));
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent event bubbling to document
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  // Close menu if clicking outside
  document.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  // Prevent clicks inside navLinks from closing menu
  navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
window.addEventListener('resize', () => {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (window.innerWidth > 700 && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', false);
  }
});

