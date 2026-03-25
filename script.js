/* =============================================
   MARC PEREZ — PERSONAL WEBPAGE
   JavaScript: Animations, Scrolling, Particles
   ============================================= */

// ===== SMOOTH SCROLL NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER — FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animations slightly for grouped elements
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 300);
            skillObserver.unobserve(bar);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== PARTICLE BACKGROUND =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#00d4ff', '#a855f7', '#ff6b9d', '#ffd700'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 4 + 4;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            bottom: -10px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            box-shadow: 0 0 ${size * 3}px ${color};
        `;

        container.appendChild(particle);
    }
}

createParticles();

// ===== HERO PARALLAX EFFECT =====
const heroAvatar = document.getElementById('hero-avatar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroAvatar && scrollY < window.innerHeight) {
        const parallaxSpeed = 0.3;
        heroAvatar.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHTER =====
const sections = document.querySelectorAll('.section, .hero');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksAll.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = '#00d4ff';
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-70px 0px 0px 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ===== CONSOLE EASTER EGG =====
console.log(
    '%c🎮 Marc Perez | Gamer · Artist · Developer',
    'background: linear-gradient(135deg, #00d4ff, #a855f7); color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;'
);
console.log('%c✨ Thanks for checking out the console! Built with ❤️ and AI.', 'color: #ff6b9d; font-size: 12px;');
