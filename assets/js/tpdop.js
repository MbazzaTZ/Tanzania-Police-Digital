/* =========================================================
   TPDOP – Shared JavaScript Utilities
   ========================================================= */

// ── SIDEBAR NAV ──
function initNav(activeId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.page === activeId) item.classList.add('active');
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ── LANGUAGE TOGGLE ──
const TRANSLATIONS = {
  sw: {
    search_placeholder: 'Tafuta mtu, gari, kesi, citation...',
    dashboard: 'Dashibodi',
    officers: 'Maafisa',
    citations: 'Citations / Tiketi',
    arrests: 'Kukamatwa / Arrests',
  },
  en: {
    search_placeholder: 'Search person, vehicle, case, citation...',
    dashboard: 'Dashboard',
    officers: 'Officers',
    citations: 'Citations / Tickets',
    arrests: 'Arrests',
  }
};

let currentLang = 'sw';
function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentLang = this.dataset.lang;
      applyTranslations();
    });
  });
}
function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  const sp = document.querySelector('.search-wrap input');
  if (sp) sp.placeholder = t.search_placeholder;
}

// ── TABS ──
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function () {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.target;
        if (target) {
          document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
          const pane = document.getElementById(target);
          if (pane) pane.style.display = 'block';
        }
      });
    });
  });
}

// ── ANIMATE NUMBERS ──
function animateNumbers() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

// ── STEPPER ──
function initStepper(totalSteps) {
  let currentStep = 1;
  function updateStepper() {
    document.querySelectorAll('.step').forEach((step, i) => {
      step.classList.remove('active', 'done');
      const n = i + 1;
      if (n < currentStep) step.classList.add('done');
      else if (n === currentStep) step.classList.add('active');
    });
    document.querySelectorAll('.step-pane').forEach((pane, i) => {
      pane.style.display = (i + 1 === currentStep) ? 'block' : 'none';
    });
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
    if (nextBtn) nextBtn.textContent = currentStep === totalSteps ? '✓ Thibitisha na Hifadhi' : 'Inayofuata →';
  }
  document.getElementById('btn-next')?.addEventListener('click', () => {
    if (currentStep < totalSteps) { currentStep++; updateStepper(); }
  });
  document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (currentStep > 1) { currentStep--; updateStepper(); }
  });
  updateStepper();
}

// ── TABLE SEARCH ──
function initTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', function () {
    const val = this.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
  });
}

// ── TOAST NOTIFICATION ──
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${type === 'success' ? '#1B5E20' : '#C62828'};
    color:#fff; padding:12px 20px; border-radius:8px;
    font-size:13px; font-weight:600; font-family:'Inter',sans-serif;
    box-shadow:0 4px 20px rgba(0,0,0,.4);
    animation: slideIn .3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── SIDEBAR HTML (shared) ──
function renderSidebar(activePage) {
  const items = [
    { section: 'Msingi / Core', items: [
      { id: 'dashboard', icon: '📊', label: 'Dashibodi / Dashboard', href: '/index.html' },
      { id: 'map', icon: '🗺️', label: 'Ramani ya Operesheni', href: '/pages/operations/map.html' },
      { id: 'alerts', icon: '🚨', label: 'Taarifa za Haraka', href: '/pages/operations/alerts.html', badge: '5' },
    ]},
    { section: 'Utekelezaji / Enforcement', items: [
      { id: 'citations', icon: '📋', label: 'Citations / Tiketi', href: '/pages/enforcement/citations.html' },
      { id: 'arrests', icon: '⛓️', label: 'Kukamatwa / Arrests', href: '/pages/enforcement/arrests.html' },
      { id: 'incidents', icon: '📝', label: 'Matukio / Incidents', href: '/pages/enforcement/incidents.html' },
      { id: 'accidents', icon: '🚗', label: 'Ajali / Accidents', href: '/pages/enforcement/accidents.html' },
    ]},
    { section: 'Uchunguzi / Investigation', items: [
      { id: 'cases', icon: '📁', label: 'Kesi / Cases', href: '/pages/investigation/cases.html', badge: '12' },
      { id: 'wanted', icon: '🎯', label: 'Watuhumiwa Wanaotafutwa', href: '/pages/investigation/wanted.html' },
      { id: 'missing', icon: '👤', label: 'Watu Waliopotea', href: '/pages/investigation/missing.html' },
      { id: 'evidence', icon: '🔬', label: 'Ushahidi / Evidence', href: '/pages/investigation/evidence.html' },
    ]},
    { section: 'Usimamizi / Management', items: [
      { id: 'officers', icon: '👮', label: 'Maafisa / Officers', href: '/pages/management/officers.html' },
      { id: 'stations', icon: '🏢', label: 'Vituo / Stations', href: '/pages/management/stations.html' },
      { id: 'prisoners', icon: '🔒', label: 'Wafungwa / Prisoners', href: '/pages/management/prisoners.html' },
      { id: 'vehicles', icon: '🚔', label: 'Usajili wa Magari', href: '/pages/management/vehicles.html' },
      { id: 'firearms', icon: '🔫', label: 'Silaha / Firearms', href: '/pages/management/firearms.html' },
    ]},
    { section: 'Ripoti / Reports', items: [
      { id: 'reports', icon: '📈', label: 'Ripoti / Reports', href: '/pages/reports/reports.html' },
      { id: 'analytics', icon: '📉', label: 'Takwimu / Analytics', href: '/pages/reports/analytics.html' },
    ]},
    { section: 'Mfumo / System', items: [
      { id: 'persons', icon: '🔍', label: 'Tafuta Watu / Search', href: '/pages/management/persons.html' },
      { id: 'intel', icon: '🧠', label: 'Ujasusi / Intelligence', href: '/pages/system/intelligence.html' },
      { id: 'audit', icon: '🗂️', label: 'Rekodi ya Ukaguzi', href: '/pages/system/audit.html' },
      { id: 'settings', icon: '⚙️', label: 'Mipangilio', href: '/pages/system/settings.html' },
    ]},
  ];

  let html = `<aside class="sidebar">
    <a class="sidebar-logo" href="/index.html">
      <div class="police-badge">🛡️</div>
      <div class="logo-text">
        <strong>JESHI LA POLISI</strong>
        <span>Tanzania · TPDOP</span>
      </div>
    </a><nav style="flex:1">`;

  items.forEach(section => {
    html += `<div class="nav-section"><div class="nav-label">${section.section}</div>`;
    section.items.forEach(item => {
      const isActive = item.id === activePage ? 'active' : '';
      const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `<a class="nav-item ${isActive}" href="${item.href}" data-page="${item.id}">
        <span class="nav-icon">${item.icon}</span>${item.label}${badge}</a>`;
    });
    html += `</div>`;
  });

  html += `</nav>
    <div class="sidebar-footer">
      <div class="officer-card">
        <div class="officer-avatar">👮</div>
        <div class="officer-info">
          <strong>Insp. Juma M. Khamis</strong>
          <span>Badge: 123456 · IGP Level</span>
        </div>
        <div class="online-dot" title="Online"></div>
      </div>
    </div>
  </aside>`;
  return html;
}

// ── TOPBAR HTML ──
function renderTopbar(title, subtitle) {
  return `<header class="topbar">
    <div>
      <div class="topbar-title">${title || 'Tanzania Police Force'}</div>
      <div class="topbar-sub">${subtitle || 'Digital Operations Platform · Web Command Center'}</div>
    </div>
    <div class="search-wrap">
      <input type="text" placeholder="Tafuta mtu, gari, kesi, citation...">
    </div>
    <div class="topbar-actions">
      <div class="lang-toggle">
        <button class="lang-btn active" data-lang="sw">SW</button>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>
      <div class="icon-btn">🔔<span class="notif-count">5</span></div>
      <div class="icon-btn">📡</div>
      <div class="icon-btn" onclick="window.location='/pages/management/officers.html'">👤</div>
    </div>
  </header>`;
}

// ── INIT ALL ──
document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initTabs();
  animateNumbers();
});
