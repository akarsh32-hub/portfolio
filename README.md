# 🚀 Akarsh - Upgraded Developer Portfolio

An elite, modern developer portfolio website designed for **Akarsh** (B.Tech CSE, Software Developer).

🔗 **Live Site:** [akarsh32-hub.github.io/portfolio/](https://akarsh32-hub.github.io/portfolio/)

---

## ✨ Key Features & Upgrades

- 🎨 **Modern Glassmorphism & Bento UI**: Ultra-clean dark and light themes with smooth transitions, custom scrollbars, and ambient mouse glow.
- ⚡ **Interactive Developer CLI Terminal**: Tabbed code viewer (`developer.ts`, `skills.json`) and interactive shell (`interactive.sh`) with commands (`help`, `skills`, `projects`, `stats`, `contact`, `clear`, `matrix`).
- 🔍 **Command Palette (`Ctrl + K` / `Cmd + K`)**: Global spotlight search modal to instantly jump to any section, project, certificate, or download resume.
- 📂 **Filterable Skills & Certificates**: Interactive filter tabs to browse by category with verified credential links and PDF viewers.
- 📱 **100% Responsive & SEO Optimized**: Full OpenGraph / Twitter metadata cards, JSON-LD Schema, and smooth mobile navigation.
- ✉️ **Interactive Contact Form & 1-Click Copy**: Instant email clipboard copy with toast feedback and formatted mailto client launcher.

---

## 📁 Project Structure

```
akarsh-portfolio/
├── index.html            # Main semantic markup with SEO & OpenGraph tags
├── css/
│   ├── style.css         # Modern design tokens, variables, typography, and responsive styles
│   └── animations.css    # Keyframes, hover shines, ambient particles, and reveal transitions
├── js/
│   ├── main.js           # Theme toggle, typing effect, scroll spy, toasts, and stats counter
│   ├── terminal.js       # Interactive developer CLI emulator & tab switcher
│   └── cmdk.js           # Command Palette (Ctrl+K) search and navigation
└── assets/               # Profile photo, resume, and PDF certificates
    ├── profile.jpg
    ├── Akarsh-Resume.pdf
    ├── 01-AKARSH-Certificate.pdf
    ├── 02-MongoDB-Atlas.pdf
    ├── 03-AWS-Data-Engineering-Virtual-Internship.pdf
    ├── 04-AWS-Cloud-Foundations.pdf
    ├── 06-Cisco-Introduction-to-Cybersecurity.pdf
    ├── 07-Ethical-Hacking-101.pdf
    ├── 08-Introduction-to-Generative-AI-Studio.pdf
    └── 09-Java-Full-Stack-Developer-Virtual-Internship.pdf
```

---

## 🖥️ How to Test Locally

You can test the site locally using any simple HTTP server:

### Option 1: Python
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

### Option 2: Node.js / npx
```bash
npx -y serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🚀 How to Deploy to GitHub Pages

1. Open your portfolio repository folder on your local machine.
2. Replace `index.html`, `css/`, `js/`, and `assets/` with these upgraded files.
3. Commit and push:
   ```bash
   git add .
   git commit -m "feat: upgrade portfolio UI/UX, interactive terminal, and command palette"
   git push origin main
   ```
4. GitHub Pages will automatically rebuild and deploy your upgraded site in 1–2 minutes!
