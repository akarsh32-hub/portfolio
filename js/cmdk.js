/**
 * AKARSH PORTFOLIO - COMMAND PALETTE (CTRL+K / CMD+K) MODULE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCommandPalette();
});

function initCommandPalette() {
  const overlay = document.getElementById('cmdkOverlay');
  const input = document.getElementById('cmdkInput');
  const resultsContainer = document.getElementById('cmdkResults');
  const triggers = document.querySelectorAll('.cmdk-trigger-btn');
  if (!overlay || !input || !resultsContainer) return;

  const items = [
    // Sections
    { title: 'Home', subtitle: 'Back to top overview', icon: 'fa-solid fa-house', type: 'Section', action: () => scrollToSection('home') },
    { title: 'Why Hire Me / Recruiter Brief', subtitle: 'Executive summary for technical interviewers', icon: 'fa-solid fa-bolt', type: 'Section', action: () => scrollToSection('why-hire-me') },
    { title: 'About Candidate', subtitle: '3rd-year CSE background & career goals', icon: 'fa-solid fa-user', type: 'Section', action: () => scrollToSection('about') },
    { title: 'Technical Skills', subtitle: 'Java, Spring Boot, MySQL, AWS, JS', icon: 'fa-solid fa-code', type: 'Section', action: () => scrollToSection('skills') },
    { title: 'Featured Projects', subtitle: 'SkyCast AI, Mehfil, Java Full-Stack Backend', icon: 'fa-solid fa-folder-open', type: 'Section', action: () => scrollToSection('projects') },
    { title: 'Experience & Internships', subtitle: 'EduSkills Java Full Stack & AWS internships', icon: 'fa-solid fa-briefcase', type: 'Section', action: () => scrollToSection('experience') },
    { title: 'Certifications', subtitle: '9 verified credentials (AWS, Google AI, Cisco, MongoDB)', icon: 'fa-solid fa-award', type: 'Section', action: () => scrollToSection('certificates') },
    { title: 'Academic Journey', subtitle: 'B.Tech CSE (3rd Year), Class XII & X', icon: 'fa-solid fa-graduation-cap', type: 'Section', action: () => scrollToSection('education') },
    { title: 'Contact Candidate', subtitle: 'Send email or connect on LinkedIn', icon: 'fa-solid fa-paper-plane', type: 'Section', action: () => scrollToSection('contact') },

    // Direct Actions
    { title: 'Download Official Resume', subtitle: 'Single-page ATS PDF Document', icon: 'fa-solid fa-file-arrow-down', type: 'Action', action: () => window.open('assets/Akarsh-Resume.pdf', '_blank') },
    { title: 'SkyCast AI Live Platform', subtitle: 'Disaster & meteorological intelligence platform', icon: 'fa-solid fa-cloud-bolt', type: 'Action', action: () => window.open('https://akarsh32-hub.github.io/SkyCast-AI/', '_blank') },
    { title: 'SkyCast AI GitHub Repo', subtitle: 'View SkyCast AI source code', icon: 'fa-brands fa-github', type: 'Action', action: () => window.open('https://github.com/akarsh32-hub/SkyCast-AI', '_blank') },
    { title: 'Mehfil Music Live Demo', subtitle: 'Open Mehfil music web app', icon: 'fa-solid fa-music', type: 'Action', action: () => window.open('https://mehfildilse.netlify.app', '_blank') },
    { title: 'Mehfil GitHub Repo', subtitle: 'View Mehfil music platform source code', icon: 'fa-brands fa-github', type: 'Action', action: () => window.open('https://github.com/akarsh32-hub/Mahfil-song-site', '_blank') },
    { title: 'GitHub Profile', subtitle: 'github.com/akarsh32-hub', icon: 'fa-brands fa-github', type: 'External', action: () => window.open('https://github.com/akarsh32-hub', '_blank') },
    { title: 'LinkedIn Profile', subtitle: 'linkedin.com/in/singhakarsh01', icon: 'fa-brands fa-linkedin-in', type: 'External', action: () => window.open('https://linkedin.com/in/singhakarsh01/', '_blank') },
    { title: 'Toggle Light / Dark Theme', subtitle: 'Switch color appearance', icon: 'fa-solid fa-circle-half-stroke', type: 'Theme', action: () => document.getElementById('themeBtn')?.click() }
  ];

  let selectedIndex = 0;
  let filteredItems = [...items];

  // Open / Close helper
  function openCmdk() {
    overlay.classList.add('open');
    input.value = '';
    renderResults(items);
    setTimeout(() => input.focus(), 50);
  }

  function closeCmdk() {
    overlay.classList.remove('open');
  }

  // Event triggers
  triggers.forEach(btn => btn.addEventListener('click', openCmdk));

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closeCmdk();
      } else {
        openCmdk();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeCmdk();
    }
  });

  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCmdk();
  });

  // Input filter
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    filteredItems = items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.subtitle.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderResults(filteredItems);
  });

  // Keyboard navigation inside list
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredItems.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        closeCmdk();
      }
    }
  });

  function renderResults(list) {
    if (list.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">No commands or links found.</div>';
      return;
    }

    resultsContainer.innerHTML = '';
    list.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = `cmdk-item ${index === selectedIndex ? 'selected' : ''}`;
      itemEl.innerHTML = `
        <div class="cmdk-item-left">
          <i class="${item.icon}"></i>
          <div>
            <div style="font-weight:600; color:var(--text-primary); font-size:0.875rem;">${item.title}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.subtitle}</div>
          </div>
        </div>
        <kbd>${item.type}</kbd>
      `;

      itemEl.addEventListener('click', () => {
        item.action();
        closeCmdk();
      });

      resultsContainer.appendChild(itemEl);
    });
  }

  function updateSelection() {
    const renderedItems = resultsContainer.querySelectorAll('.cmdk-item');
    renderedItems.forEach((el, i) => {
      el.classList.toggle('selected', i === selectedIndex);
      if (i === selectedIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
