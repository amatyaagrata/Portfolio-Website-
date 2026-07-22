// Agrata Amatya - Portfolio Interactive Scripts (Girly Aesthetic)

document.addEventListener('DOMContentLoaded', () => {

  // Splash Screen Dismissal
  const splash = document.getElementById('splash');
  const skipSplash = document.getElementById('skipSplash');

  if (skipSplash && splash) {
    skipSplash.addEventListener('click', () => {
      splash.classList.add('fade-out');
    });

    setTimeout(() => {
      if (splash && !splash.classList.contains('fade-out')) {
        splash.classList.add('fade-out');
      }
    }, 2500);
  }

  // Theme Switcher
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('agrata_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('agrata_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(t) {
    if (!themeIcon) return;
    if (t === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      if (navMenu.classList.contains('active')) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--bg-secondary)';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
      } else {
        navMenu.style.display = '';
      }
    });
  }

  // Project Category Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Details Modal Data
  const projectsData = {
    gogodam: {
      title: "GoGodam Inventory & Logistics Management System",
      role: "Project Manager & Lead Developer",
      tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "HTML5", "CSS3"],
      overview: "GoGodam is a comprehensive enterprise inventory platform built for warehouse logistics. As Lead Developer and PM, I architected the database schema, designed role-based access control (Admin, Warehouse Manager, Staff), and led team sprint planning.",
      features: [
        "Multi-tier role-based authentication and privilege scoping.",
        "Real-time inventory stock tracking with low-stock alerts.",
        "Order dispatch lifecycle management — from receipt to delivery.",
        "Optimised MySQL schema built for multi-user concurrency."
      ]
    },
    weather: {
      title: "Full-Stack Weather Application (REST API)",
      role: "Full Stack Developer",
      tech: ["PHP", "JavaScript", "MySQL", "OpenWeather REST API", "CSS3"],
      overview: "Interactive weather dashboard integrating OpenWeather REST API with a PHP/MySQL backend. Features location search, automatic geolocation, multi-day forecasts, user preferences, and search history logging.",
      features: [
        "RESTful API integration with intelligent response caching.",
        "User registration, authentication, and saved location preferences.",
        "Historical weather query search log saved in a MySQL database.",
        "Dynamic UI card rendering based on atmospheric metrics."
      ]
    },
    mlclass: {
      title: "Machine Learning Classification Model Suite",
      role: "AI / ML Engineer",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      overview: "End-to-end Machine Learning classification framework for structured tabular data. Features automated data cleaning, feature engineering, hyperparameter tuning via GridSearchCV, and benchmark evaluation.",
      features: [
        "Exploratory Data Analysis and statistical profiling.",
        "Missing value imputation and categorical encoding.",
        "Algorithms tested: Logistic Regression, Decision Tree, Random Forest, SVM.",
        "Confusion matrix and ROC/AUC performance evaluation."
      ]
    },
    mlreg: {
      title: "Predictive ML Regression Modeling Pipeline",
      role: "ML Analyst",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      overview: "Supervised machine learning regression models engineered on real-world datasets to predict continuous target variables.",
      features: [
        "Multivariate feature correlation analysis.",
        "Linear Regression, Ridge/Lasso, and Random Forest Regressors.",
        "Model validation using RMSE, MAE, and R² scores."
      ]
    },
    java: {
      title: "Java Swing Desktop Application Suite",
      role: "Desktop Software Developer",
      tech: ["Java", "Java Swing", "JDBC", "OOP Principles"],
      overview: "Suite of desktop GUI tools developed adhering strictly to Object-Oriented Programming (OOP) principles.",
      features: [
        "Competition Management System for competitor registration and scoring.",
        "Scientific Calculator and GUI User Authentication System.",
        "JDBC database layer for persistent record management."
      ]
    }
  };

  // Modals Logic
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalBg = document.getElementById('modalBg');

  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectsData[key];
      if (!data || !modalBody) return;

      modalBody.innerHTML = `
        <div style="font-size:0.85rem; color:var(--rose-pink); font-weight:700; margin-bottom:6px;"><i class="fa-solid fa-sparkles"></i> ${data.role}</div>
        <h2 style="font-size:1.7rem; margin-bottom:16px;">${data.title}</h2>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
          ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <h3 style="font-size:1.1rem; color:var(--rose-pink); margin-bottom:8px;">Overview</h3>
        <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem;">${data.overview}</p>
        <h3 style="font-size:1.1rem; color:var(--rose-pink); margin-bottom:8px;">Key Technical Features</h3>
        <ul style="padding-left:20px; color:var(--text-secondary); margin-bottom:24px; font-size:0.92rem; list-style:disc;">
          ${data.features.map(f => `<li style="margin-bottom:6px;">${f}</li>`).join('')}
        </ul>
        <a href="https://github.com" target="_blank" rel="noopener" class="btn btn-girly btn-sm">
          <i class="fa-brands fa-github"></i> View GitHub Repository
        </a>
      `;
      projectModal.classList.add('active');
    });
  });

  if (modalClose && projectModal) {
    modalClose.addEventListener('click', () => projectModal.classList.remove('active'));
  }
  if (modalBg && projectModal) {
    modalBg.addEventListener('click', () => projectModal.classList.remove('active'));
  }

  // Resume / CV Modal Logic
  const cvModal = document.getElementById('cvModal');
  const cvBtn = document.getElementById('cvBtn');
  const cvModalClose = document.getElementById('cvModalClose');
  const cvModalBg = document.getElementById('cvModalBg');
  const printCv = document.getElementById('printCv');

  if (cvBtn && cvModal) {
    cvBtn.addEventListener('click', () => cvModal.classList.add('active'));
  }
  if (cvModalClose && cvModal) {
    cvModalClose.addEventListener('click', () => cvModal.classList.remove('active'));
  }
  if (cvModalBg && cvModal) {
    cvModalBg.addEventListener('click', () => cvModal.classList.remove('active'));
  }
  if (printCv) {
    printCv.addEventListener('click', () => window.print());
  }

  // Copy Email Clipboard
  const copyEmail = document.getElementById('copyEmail');
  if (copyEmail) {
    copyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('amatyaagrata@gmail.com').then(() => {
        const orig = copyEmail.innerHTML;
        copyEmail.innerHTML = '<i class="fa-solid fa-check" style="color:var(--mint)"></i> Copied!';
        setTimeout(() => copyEmail.innerHTML = orig, 2000);
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent. Agrata will get back to you shortly 💖');
        contactForm.reset();
        btn.innerHTML = origText;
        btn.disabled = false;
      }, 1200);
    });
  }
});
