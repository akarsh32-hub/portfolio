/**
 * AKARSH PORTFOLIO - MAIN JAVASCRIPT MODULE
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initScrollSpyAndProgress();
  initRevealAnimations();
  initStatsCounters();
  initFilterSystems();
  initContactAndClipboard();
  initAmbientEffects();
});

/* --- 1. Dark / Light Theme Controller --- */
function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('akarsh-theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('light-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('akarsh-theme', isLight ? 'light' : 'dark');
    themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    showToast(`Switched to ${isLight ? 'Light' : 'Dark'} mode`);
  });
}

/* --- 2. Dynamic Typing Effect --- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    "Software Developer",
    "Java Developer",
    "Web Developer",
    "DSA Practitioner",
    "AI Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --- 3. Scroll Progress, Scroll Spy & Header Shrink --- */
function initScrollSpyAndProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Scroll handler
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Update Progress bar
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy for active navigation item
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --- 4. Intersection Observer for Scroll Reveals --- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(r => r.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --- 5. Animated Number Counters --- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      statNumbers.forEach(counter => {
        const target = counter.getAttribute('data-target');
        if (!target || target === '∞') return;

        const countTo = parseInt(target, 10);
        let count = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / countTo));

        const timer = setInterval(() => {
          count += 1;
          counter.textContent = `${count}+`;
          if (count >= countTo) {
            clearInterval(timer);
            counter.textContent = `${countTo}+`;
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* --- 6. Category Filtering (Skills & Certificates) --- */
function initFilterSystems() {
  // Skills filtering
  const skillFilters = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => card.classList.add('active'), 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Certificate filtering
  const certFilters = document.querySelectorAll('[data-cert-filter]');
  const certCards = document.querySelectorAll('.cert-card');

  certFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-cert-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 7. Contact Form & Quick Copy --- */
function initContactAndClipboard() {
  // Copy Email button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'askarsh32@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('akarsh32@gmail.com');
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim() || 'Portfolio Contact';
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:askarsh32@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello Akarsh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showToast('Opening your email client...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 500);
    });
  }
}

/* --- 8. Ambient Glow & Particle Effects --- */
function initAmbientEffects() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  // Ambient Floating Particles
  const container = document.getElementById('particleContainer');
  if (container) {
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('span');
      p.className = 'ambient-particle';
      p.style.left = `${Math.random() * 100}vw`;
      p.style.width = `${Math.random() * 3 + 2}px`;
      p.style.height = p.style.width;
      p.style.animationDelay = `${Math.random() * 15}s`;
      p.style.animationDuration = `${Math.random() * 10 + 14}s`;
      container.appendChild(p);
    }
  }
}

/* --- Toast Notification Utility --- */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
window.showToast = showToast;
