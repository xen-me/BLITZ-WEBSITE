document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('navLinks');

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
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  if (window.innerWidth > 700 && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', false);
  }
});

