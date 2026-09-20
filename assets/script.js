const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const dropdown = document.querySelector('.nav-dropdown');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (dropdown) {
  dropdown.addEventListener('click', (event) => {
    if (window.innerWidth <= 820) {
      event.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
}

const yearNode = document.querySelector('[data-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
