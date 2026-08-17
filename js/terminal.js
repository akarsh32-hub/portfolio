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
        printLine('  <span class="token-string">about</span>       - Print developer bio and summary');
        printLine('  <span class="token-string">skills</span>      - List core tech stack & competencies');
        printLine('  <span class="token-string">projects</span>    - Display featured live projects');
        printLine('  <span class="token-string">experience</span>  - View virtual internships & programs');
        printLine('  <span class="token-string">certs</span>       - List verified certifications');
        printLine('  <span class="token-string">resume</span>      - Open / Download official resume');
        printLine('  <span class="token-string">contact</span>     - Display email & social profiles');
        printLine('  <span class="token-string">clear</span>       - Clear the terminal screen');
        printLine('  <span class="token-string">matrix</span>      - Easter egg mode');
        break;

      case 'about':
        printLine('👤 Akarsh | B.Tech CSE Student (2024-2028)');
        printLine('🏛️ Axis Institute of Technology & Management, Kanpur');
        printLine('🎯 Software Developer with expertise in Java, DSA, Web Dev & AI.');
        break;

      case 'skills':
        printLine('⚡ Core Languages: Java, JavaScript, Python, C/C++');
        printLine('🌐 Web Tech: HTML5, CSS3, ES6+, REST APIs, Spring Boot, MySQL');
        printLine('🧠 Foundations: DSA, Object-Oriented Programming, Cloud (AWS), Git/GitHub');
        break;

      case 'projects':
        printLine('📂 Featured Projects:');
        printLine('  1. <strong>SkyCast Weather App</strong> - Live forecast app with OpenWeather API');
        printLine('  2. <strong>DSA Problem Solving in Java</strong> - Arrays, Strings, Trees & LeetCode');
        printLine('  3. <strong>Akarsh Developer Portfolio</strong> - Modern interactive portfolio');
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
