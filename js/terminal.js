/**
 * AKARSH PORTFOLIO - INTERACTIVE DEVELOPER TERMINAL MODULE
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalTabs();
  initInteractiveShell();
});

/* --- 1. Terminal Tab Switcher --- */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.term-tab');
  const contents = document.querySelectorAll('.term-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(`tabContent-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // If interactive tab is clicked, focus the input
      if (targetTab === 'shell') {
        const input = document.getElementById('terminalInput');
        if (input) input.focus();
      }
    });
  });
}

/* --- 2. Interactive CLI Shell Emulator --- */
function initInteractiveShell() {
  const input = document.getElementById('terminalInput');
  const logContainer = document.getElementById('terminalLog');
  if (!input || !logContainer) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Initial welcome message in shell
  printLine('🚀 Welcome to Akarsh CLI v2.4 (x86_64-akarsh-web)', 'token-property');
  printLine('Type <span class="token-string">"help"</span> to view available interactive commands.', 'token-comment');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        handleCommand(command);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  function handleCommand(cmd) {
    // Print user input prompt
    printLine(`<span style="color:#2dd4bf">visitor@akarsh:~$</span> ${escapeHTML(cmd)}`, 'cli-user-cmd');

    const cleanCmd = cmd.toLowerCase().trim();

    switch (cleanCmd) {
      case 'help':
        printLine('Available Commands:', 'token-property');
        printLine('  <span class="token-string">pitch</span>        - 30-second elevator pitch for recruiters / interviewers');
        printLine('  <span class="token-string">about</span>        - Candidate background & 3rd-year CSE status');
        printLine('  <span class="token-string">skills</span>       - Core tech stack & CS engineering competencies');
        printLine('  <span class="token-string">projects</span>     - Production deployments & backend architectures');
        printLine('  <span class="token-string">experience</span>   - Virtual internships (Java Full Stack & AWS)');
        printLine('  <span class="token-string">certs</span>        - 9 verified industry certifications');
        printLine('  <span class="token-string">resume</span>       - View / Download official resume PDF');
        printLine('  <span class="token-string">contact</span>      - Email & LinkedIn connection info');
        printLine('  <span class="token-string">clear</span>        - Clear the terminal screen');
        break;

      case 'pitch':
      case 'hire':
      case 'placement':
        printLine('🎯 <strong>30-Second Interview Pitch:</strong>', 'token-property');
        printLine('  • <strong>Candidate:</strong> 3rd-Year B.Tech CSE (Axis Institute Kanpur, Batch 2028).');
        printLine('  • <strong>Core Focus:</strong> Enterprise Java Backend (Spring Boot, Hibernate, MySQL) & Modern Full-Stack.');
        printLine('  • <strong>Proven Work:</strong> Deployed <strong>SkyCast AI</strong> (Meteorological platform) & <strong>Mehfil</strong> (Audio app).');
        printLine('  • <strong>Training:</strong> EduSkills Java Full-Stack & AWS Academy Data Engineering virtual programs.');
        printLine('  • <strong>Status:</strong> Ready for immediate Technical Interviews & SDE Roles! 🚀');
        break;

      case 'about':
        printLine('👤 Akarsh | 3rd-Year B.Tech CSE Candidate (2024-2028)');
        printLine('🏛️ Axis Institute of Technology & Management, Kanpur');
        printLine('🎯 SDE & Java Full Stack Candidate specializing in Spring Boot, REST APIs, Web Dev & Cloud.');
        break;

      case 'skills':
        printLine('⚡ Core Languages: Java (Core, OOP, Collections), JavaScript (ES6+), Python, C/C++, SQL');
        printLine('🌐 Backend & Web: Spring Boot, Hibernate ORM, RESTful APIs, HTML5, CSS3, DOM APIs');
        printLine('☁️ Cloud & DB: MySQL, MongoDB Atlas, AWS Cloud Academy Graduate, Data Pipelines');
        printLine('🛠️ Tools: Git, GitHub, VS Code, IntelliJ IDEA, Postman, Netlify');
        break;

      case 'projects':
        printLine('📂 Featured Production Deployments & Systems:');
        printLine('  1. <strong>SkyCast AI</strong> - District Disaster & Meteorological Intelligence Platform');
        printLine('  2. <strong>Mehfil</strong> - Soulful Music Streaming Web Application (Netlify)');
        printLine('  3. <strong>Java Full-Stack REST API Architecture</strong> - Spring Boot, Hibernate & MySQL');
        printLine('  4. <strong>Developer Portfolio v2</strong> - Glassmorphic Bento UI & CLI Emulator');
        break;

      case 'experience':
        printLine('💼 Experience & Virtual Internships:');
        printLine('  • Java Full Stack Developer (Jan-Mar 2026) · EduSkills Academy');
        printLine('  • Data Engineering Virtual Internship (Oct-Dec 2025) · AWS Academy');
        break;

      case 'certs':
      case 'certifications':
        printLine('📜 Top Credentials:');
        printLine('  • AWS Academy Graduate - Cloud Foundations');
        printLine('  • AI Fundamentals - Google / Coursera');
        printLine('  • Introduction to Cybersecurity - Cisco Networking Academy');
        printLine('  • Getting Started with MongoDB Atlas');
        break;

      case 'resume':
        printLine('📄 Opening resume...');
        window.open('assets/Akarsh-Resume.pdf', '_blank');
        break;

      case 'contact':
        printLine('📬 Contact Information:');
        printLine('  • Email: askarsh32@gmail.com');
        printLine('  • LinkedIn: linkedin.com/in/singhakarsh01/');
        printLine('  • GitHub: github.com/akarsh32-hub');
        break;

      case 'clear':
        logContainer.innerHTML = '';
        break;

      case 'sudo':
        printLine('🔒 Permission denied: You are a guest in this universe!', 'token-keyword');
        break;

      case 'matrix':
        printLine('🟩 Wake up, Neo... Follow the white rabbit 🐇', 'token-string');
        if (window.showToast) window.showToast('Matrix mode activated ✨');
        break;

      default:
        printLine(`Command not found: "${escapeHTML(cmd)}". Type <span class="token-string">"help"</span> for a list of commands.`, 'token-keyword');
    }

    // Scroll to bottom of terminal log
    logContainer.parentElement.scrollTop = logContainer.parentElement.scrollHeight;
  }

  function printLine(htmlContent, className = '') {
    const line = document.createElement('div');
    line.className = `cli-line ${className}`;
    line.innerHTML = htmlContent;
    logContainer.appendChild(line);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
