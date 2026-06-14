// Inject sidebar + topbar into every page
(function() {
  const page = document.body.dataset.page || 'dashboard';
  const title = document.body.dataset.title || 'Tanzania Police Force';
  const subtitle = document.body.dataset.subtitle || 'Digital Operations Platform · Web Command Center';

  // Build sidebar HTML
  const navSections = [
    { label: 'Msingi / Core', items: [
      { id:'dashboard', icon:'📊', label:'Dashibodi / Dashboard',      href:'../../index.html' },
      { id:'map',       icon:'🗺️', label:'Ramani ya Operesheni',        href:'../operations/map.html' },
      { id:'alerts',    icon:'🚨', label:'Taarifa za Haraka',           href:'../operations/alerts.html', badge:5 },
    ]},
    { label: 'Utekelezaji / Enforcement', items: [
      { id:'citations', icon:'📋', label:'Citations / Tiketi',          href:'../enforcement/citations.html' },
      { id:'arrests',   icon:'⛓️', label:'Kukamatwa / Arrests',        href:'../enforcement/arrests.html' },
      { id:'incidents', icon:'📝', label:'Matukio / Incidents',         href:'../enforcement/incidents.html' },
      { id:'accidents', icon:'🚗', label:'Ajali / Accidents',           href:'../enforcement/accidents.html' },
    ]},
    { label: 'Uchunguzi / Investigation', items: [
      { id:'cases',     icon:'📁', label:'Kesi / Cases',                href:'../investigation/cases.html', badge:12 },
      { id:'wanted',    icon:'🎯', label:'Watuhumiwa Wanaotafutwa',    href:'../investigation/wanted.html' },
      { id:'missing',   icon:'👤', label:'Watu Waliopotea',             href:'../investigation/missing.html' },
      { id:'evidence',  icon:'🔬', label:'Ushahidi / Evidence',         href:'../investigation/evidence.html' },
    ]},
    { label: 'Usimamizi / Management', items: [
      { id:'persons',   icon:'🔍', label:'Tafuta Watu / Search',        href:'../management/persons.html' },
      { id:'officers',  icon:'👮', label:'Maafisa / Officers',          href:'../management/officers.html' },
      { id:'stations',  icon:'🏢', label:'Vituo / Stations',            href:'../management/stations.html' },
      { id:'prisoners', icon:'🔒', label:'Wafungwa / Prisoners',        href:'../management/prisoners.html' },
      { id:'vehicles',  icon:'🚔', label:'Usajili wa Magari',           href:'../management/vehicles.html' },
      { id:'firearms',  icon:'🔫', label:'Silaha / Firearms',           href:'../management/firearms.html' },
    ]},
    { label: 'Ripoti / Reports', items: [
      { id:'reports',   icon:'📈', label:'Ripoti / Reports',            href:'../reports/reports.html' },
      { id:'analytics', icon:'📉', label:'Takwimu / Analytics',         href:'../reports/analytics.html' },
    ]},
    { label: 'Mfumo / System', items: [
      { id:'intel',     icon:'🧠', label:'Ujasusi / Intelligence',      href:'../system/intelligence.html' },
      { id:'audit',     icon:'🗂️', label:'Rekodi ya Ukaguzi',           href:'../system/audit.html' },
      { id:'settings',  icon:'⚙️', label:'Mipangilio',                  href:'../system/settings.html' },
    ]},
  ];

  // Special paths for index.html at root
  const isRoot = !window.location.pathname.includes('/pages/');
  if (isRoot) {
    navSections.forEach(s => s.items.forEach(i => {
      i.href = i.href.replace('../../','').replace('../','pages/');
    }));
  }

  let sidebarHTML = `<aside class="sidebar">
    <a class="sidebar-logo" href="${isRoot ? 'index.html' : '../../index.html'}">
      <div class="police-badge">🛡️</div>
      <div class="logo-text">
        <strong>JESHI LA POLISI</strong>
        <span>Tanzania · TPDOP</span>
      </div>
    </a><nav style="flex:1">`;

  navSections.forEach(s => {
    sidebarHTML += `<div class="nav-section"><div class="nav-label">${s.label}</div>`;
    s.items.forEach(item => {
      const active = item.id === page ? 'active' : '';
      const badge  = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      sidebarHTML += `<a class="nav-item ${active}" href="${item.href}"><span class="nav-icon">${item.icon}</span>${item.label}${badge}</a>`;
    });
    sidebarHTML += `</div>`;
  });

  sidebarHTML += `</nav>
    <div class="sidebar-footer">
      <div class="officer-card">
        <div class="officer-avatar">👮</div>
        <div class="officer-info">
          <strong>Insp. Juma M. Khamis</strong>
          <span>Badge: 123456 · IGP Level</span>
        </div>
        <div class="online-dot"></div>
      </div>
    </div></aside>`;

  const topbarHTML = `<header class="topbar">
    <div><div class="topbar-title">${title}</div><div class="topbar-sub">${subtitle}</div></div>
    <div class="search-wrap"><input type="text" placeholder="Tafuta mtu, gari, kesi, citation..."></div>
    <div class="topbar-actions">
      <div class="lang-toggle">
        <button class="lang-btn active" data-lang="sw">SW</button>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>
      <div class="icon-btn">🔔<span class="notif-count">5</span></div>
      <div class="icon-btn">📡</div>
      <div class="icon-btn">👤</div>
    </div>
  </header>`;

  const app = document.getElementById('app');
  if (app) {
    const main = app.querySelector('.main');
    app.insertAdjacentHTML('afterbegin', sidebarHTML);
    if (main) main.insertAdjacentHTML('afterbegin', topbarHTML);
  }

  // Lang toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Tabs
  document.querySelectorAll('.tabs').forEach(group => {
    group.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function() {
        group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });

  // Animate numbers
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw = el.textContent.replace(/,/g,'');
    const n   = parseInt(raw);
    if (isNaN(n) || n < 10) return;
    let c = 0; const step = Math.max(1, Math.floor(n/40));
    const t = setInterval(() => { c = Math.min(c+step,n); el.textContent=c.toLocaleString(); if(c>=n) clearInterval(t); }, 20);
  });
})();
