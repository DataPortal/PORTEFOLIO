const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.side-nav a');
const reveals = document.querySelectorAll('.reveal');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
}

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem(
    'portfolio-theme',
    body.classList.contains('dark') ? 'dark' : 'light'
  );
});

mobileNavToggle?.addEventListener('click', () => {
  body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('nav-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];

const setActiveLink = () => {
  let current = sections[0]?.id || '';
  const scrollY = window.scrollY + 180;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
