/* ========================================
   QuickWebTools - Global Scripts
   ======================================== */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeMobileMenu();
  initializeFAQ();
});

/* ========================================
   THEME MANAGEMENT
   ======================================== */

function initializeTheme() {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  setTheme(initialTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function setTheme(theme) {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    html.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/* ========================================
   MOBILE MENU
   ======================================== */

function initializeMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

/* ========================================
   FAQ ACCORDION
   ======================================== */

function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');
      
      // Close other answers
      document.querySelectorAll('.faq-answer.active').forEach(active => {
        if (active !== answer) {
          active.classList.remove('active');
          active.previousElementSibling.querySelector('.faq-toggle').classList.remove('active');
        }
      });
      
      // Toggle current answer
      answer.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  });
}

/* ========================================
   SEARCH FUNCTIONALITY
   ======================================== */

function searchTools(query) {
  const tools = [
    { name: 'Percentage Calculator', url: 'percentage-calculator.html' },
    { name: 'Age Calculator', url: 'age-calculator.html' },
    { name: 'BMI Calculator', url: 'bmi-calculator.html' },
    { name: 'Word Counter', url: 'word-counter.html' },
    { name: 'JSON Formatter', url: 'json-formatter.html' }
  ];
  
  if (!query.trim()) return;
  
  const results = tools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (results.length === 1) {
    window.location.href = results[0].url;
  }
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    showNotification('Failed to copy', 'error');
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '300px';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function formatNumber(num, decimals = 2) {
  return parseFloat(num).toFixed(decimals);
}

function isValidNumber(value) {
  return !isNaN(value) && value !== '' && isFinite(value);
}

// Format JSON with indentation
function formatJSON(jsonString, minify = false) {
  try {
    const parsed = JSON.parse(jsonString);
    return minify 
      ? JSON.stringify(parsed) 
      : JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON: ' + error.message);
  }
}

// Validate JSON
function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/* ========================================
   SEARCH BOX FUNCTIONALITY
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) searchTools(searchInput.value);
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchTools(searchInput.value);
    });
  }
});

// Back to top button
function createBackToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 24px;
    box-shadow: var(--shadow-lg);
  `;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  document.body.appendChild(button);
}

// Add back to top button on tool pages
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('-calculator.html') || 
      window.location.pathname.includes('-counter.html') ||
      window.location.pathname.includes('-formatter.html')) {
    createBackToTopButton();
  }
});
