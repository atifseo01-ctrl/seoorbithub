(() => {
  const style = document.createElement('style');
  style.textContent = `
    .site-header{background:#081426!important;border-bottom:1px solid rgba(255,255,255,.08)!important;color:#fff}
    .site-header .nav-wrap{min-height:86px}
    .site-header .logo{display:flex;flex-direction:column;align-items:flex-start;color:#fff!important;line-height:1.05;letter-spacing:-.6px}
    .site-header .logo::after{content:'Rank Higher • Grow Faster';margin-top:6px;color:#8fa2bd;font-size:10px;font-weight:600;letter-spacing:.45px}
    .site-header .logo span{color:#6d8dff}
    .site-header .nav-links{gap:27px;color:#dce5f4}
    .site-header .nav-links a{color:#dce5f4!important;transition:color .2s ease}
    .site-header .nav-links a:hover,.site-header .nav-links a.active{color:#6f90ff!important}
    .site-header .nav-cta{display:inline-flex!important;align-items:center;gap:5px;padding:13px 18px!important;border-radius:999px!important;background:#4f73f5!important;color:#fff!important;box-shadow:0 8px 20px rgba(47,91,230,.25)}
    .site-header .nav-cta:hover{background:#6687ff!important;color:#fff!important;transform:translateY(-1px)}
    .site-header .menu-toggle{color:#fff!important}
    .service-menu{position:relative;display:flex;align-items:center}
    .service-trigger{display:inline-flex;align-items:center;gap:7px;cursor:pointer}
    .service-trigger::after{content:'⌄';font-size:15px;color:#91a7ff;line-height:1;transform:translateY(-1px)}
    .service-dropdown{position:absolute;top:calc(100% + 18px);left:-18px;min-width:220px;padding:10px;background:#101f36;border:1px solid rgba(255,255,255,.1);border-radius:12px;box-shadow:0 18px 45px rgba(0,0,0,.3);opacity:0;visibility:hidden;transform:translateY(-6px);transition:.2s ease;z-index:100}
    .service-menu:hover .service-dropdown,.service-menu.open .service-dropdown{opacity:1;visibility:visible;transform:translateY(0)}
    .service-dropdown a{display:block!important;padding:9px 12px;border-radius:7px;font-size:13px!important;color:#dce5f4!important;white-space:nowrap}
    .service-dropdown a:hover{background:rgba(111,144,255,.14);color:#8fa8ff!important}
    @media(max-width:850px){
      .site-header .nav-wrap{min-height:78px}
      .site-header .nav-links{background:#081426!important;border-bottom:1px solid rgba(255,255,255,.08)!important;gap:0}
      .site-header .nav-links a{padding:9px 0}
      .site-header .nav-cta{justify-content:center;margin-top:8px}
      .service-menu{display:block}
      .service-trigger{width:100%;justify-content:space-between}
      .service-dropdown{position:static;display:none;min-width:0;margin:4px 0 6px;padding:4px 10px;background:#0d1b30;border:0;box-shadow:none;opacity:1;visibility:visible;transform:none}
      .service-menu.open .service-dropdown{display:block}
      .service-dropdown a{padding:8px 10px!important}
    }
  `;
  document.head.appendChild(style);

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  const servicesLink = Array.from(nav.querySelectorAll('a')).find(link => link.textContent.trim().toLowerCase() === 'services');
  if (servicesLink && !nav.querySelector('.service-menu')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'service-menu';
    const trigger = document.createElement('a');
    trigger.className = 'service-trigger';
    trigger.href = '/services';
    trigger.textContent = 'Services';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    const dropdown = document.createElement('div');
    dropdown.className = 'service-dropdown';
    const services = [
      ['Local SEO','/services/local-seo'], ['SaaS SEO','/services/saas-seo'],
      ['Link Building','/services/link-building'], ['Technical SEO','/services/technical-seo'],
      ['On-Page SEO','/services/on-page-seo'], ['SEO Content','/services/seo-content']
    ];
    services.forEach(([label, href]) => { const link = document.createElement('a'); link.href = href; link.textContent = label; dropdown.appendChild(link); });
    wrapper.append(trigger, dropdown);
    servicesLink.replaceWith(wrapper);
    trigger.addEventListener('click', event => {
      if (window.innerWidth <= 850) { event.preventDefault(); const open = wrapper.classList.toggle('open'); trigger.setAttribute('aria-expanded', String(open)); }
    });
  }

  const path = window.location.pathname.replace(/\\/$/, '') || '/';
  nav.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === path && href !== '/services') link.classList.add('active');
  });

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('form[data-mailto]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('SEO Orbit Hub - New Website Inquiry');
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nWebsite: ${data.get('website')}\nService: ${data.get('service')}\n\nMessage:\n${data.get('message')}`);
    window.location.href = `mailto:hello@seoorbithub.com?subject=${subject}&body=${body}`;
  }));
})();
