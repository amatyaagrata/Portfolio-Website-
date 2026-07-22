// Agrata Amatya - Portfolio Scripts (Savita Singh Inspired)

document.addEventListener('DOMContentLoaded', () => {

  // Splash Screen
  const splash = document.getElementById('splash');
  const splashSkip = document.getElementById('splashSkip');

  function dismissSplash() {
    if (splash) splash.classList.add('hide');
  }

  if (splashSkip) splashSkip.addEventListener('click', dismissSplash);
  setTimeout(dismissSplash, 2800);

  // Theme Toggle Switcher
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = localStorage.getItem('agrata_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('agrata_theme', next);
      updateThemeUI(next);
    });
  }

  function updateThemeUI(t) {
    if (!themeIcon || !themeLabel) return;
    if (t === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeLabel.textContent = 'Dark';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeLabel.textContent = 'Light';
    }
  }

  // Mobile Menu Burger
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // Project Modals Data
  const projectsData = {
    gogodam: {
      title: "GoGodam Inventory & Logistics Management System",
      role: "Project Manager & Lead Developer",
      tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "HTML5", "CSS3"],
      overview: "GoGodam is a comprehensive enterprise inventory platform tailored for logistics tracking and warehouse operations. As Lead Developer and PM, I architected the database schema, designed role-based access control (Admin, Warehouse Manager, Staff), and led team sprint planning.",
      features: [
        "Multi-tier role-based authentication and privilege scoping.",
        "Real-time inventory stock level tracking with low-stock threshold alerts.",
        "Order dispatch lifecycle tracking — from receipt to delivery confirmation.",
        "Optimised MySQL relational schema built for multi-user concurrency.",
        "Agile task coordination and milestone management."
      ]
    },
    weather: {
      title: "Full-Stack Weather Application with OpenWeather API",
      role: "Full Stack Developer",
      tech: ["PHP", "JavaScript", "MySQL", "OpenWeather REST API", "CSS3"],
      overview: "Interactive weather dashboard integrating the OpenWeather REST API with a PHP/MySQL backend. Features location search, automatic geolocation, multi-day forecasting, user query history, and saved preferences.",
      features: [
        "RESTful API integration with caching for high performance.",
        "User registration, authentication, and saved location preferences.",
        "Historical weather search query log stored in a MySQL database.",
        "Dynamic weather cards rendering temperature, humidity, and wind metrics."
      ]
    },
    mlclass: {
      title: "Machine Learning Classification Pipeline",
      role: "AI / ML Engineer",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      overview: "End-to-end classification pipeline built for structured tabular data. Performs data cleaning, automated feature selection, hyperparameter tuning via GridSearchCV, and benchmark evaluation.",
      features: [
        "Exploratory Data Analysis and statistical profiling.",
        "Missing value imputation and categorical encoding.",
        "Algorithms benchmarked: Logistic Regression, Decision Tree, Random Forest, SVM.",
        "Confusion matrix and ROC/AUC performance metric evaluation."
      ]
    },
    mlreg: {
      title: "Predictive ML Regression Modeling Pipeline",
      role: "ML Analyst",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      overview: "Supervised machine learning regression models engineered on real-world datasets to predict continuous target variables.",
      features: [
        "Feature engineering and multivariate correlation analysis.",
        "Linear Regression, Ridge/Lasso, and Random Forest Regressors.",
        "Model evaluation via RMSE, MAE, and R² scores."
      ]
    },
    java: {
      title: "Java Swing Desktop Application Suite",
      role: "Desktop Software Developer",
      tech: ["Java", "Java Swing", "JDBC", "OOP Principles"],
      overview: "Suite of desktop GUI tools developed adhering strictly to Object-Oriented Programming (OOP) principles.",
      features: [
        "Competition Management System for scoring and competitor management.",
        "Scientific Calculator and GUI User Authentication System.",
        "JDBC database layer for persistent record management."
      ]
    }
  };

  // Modals Logic
  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const cvModal = document.getElementById('cvModal');
  const printCv = document.getElementById('printCv');

  // Open Project Modal
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      const data = projectsData[key];
      if (!data || !modalContent) return;

      modalContent.innerHTML = `
        <div style="font-size:0.85rem; color:var(--accent-pink); font-weight:600; margin-bottom:6px;"><i class="fa-solid fa-code"></i> ${data.role}</div>
        <h2 style="font-size:1.8rem; margin-bottom:16px;">${data.title}</h2>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
          ${data.tech.map(t => `<span style="padding:4px 10px; border-radius:4px; background:rgba(255,255,255,0.05); border:1px solid var(--border-color); font-size:0.78rem; font-family:var(--font-mono);">${t}</span>`).join('')}
        </div>
        <h3 style="font-size:1.1rem; color:var(--accent-pink); margin-bottom:8px;">Overview</h3>
        <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem;">${data.overview}</p>
        <h3 style="font-size:1.1rem; color:var(--accent-pink); margin-bottom:8px;">Key Technical Features</h3>
        <ul style="padding-left:20px; color:var(--text-secondary); margin-bottom:24px; font-size:0.92rem; list-style:disc;">
          ${data.features.map(f => `<li style="margin-bottom:6px;">${f}</li>`).join('')}
        </ul>
        <a href="https://github.com" target="_blank" rel="noopener" class="pill pill--solid">
          <i class="fa-brands fa-github"></i> View GitHub Repository
        </a>
      `;
      openModal(projectModal);
    });
  });

  // Open CV Modal Buttons
  ['cvBtn', 'cvBtn2', 'cvBtn3', 'cvBtn4'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => openModal(cvModal));
  });

  // Print CV
  if (printCv) {
    printCv.addEventListener('click', () => window.print());
  }

  function openModal(m) {
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(m) {
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close modals on click close button or backdrop
  document.querySelectorAll('.modal').forEach(m => {
    m.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(m));
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
    }
  });

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
        alert('Thank you! Your message has been sent successfully. Agrata will get back to you shortly.');
        contactForm.reset();
        btn.innerHTML = origText;
        btn.disabled = false;
      }, 1200);
    });
  }
});
