/* =====================================================================
   MyTour Malaysia — Prototype Engine
   Declares all 20 screens, handles routing, and wires interactions.
   ===================================================================== */

/* ---------- tiny icon helper ---------- */
const I = {
  back:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="22" height="22"><path d="M15 5l-7 7 7 7"/></svg>',
  bell:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  mic:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  send:  '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M3 11 22 2l-9 19-2-8-8-2Z"/></svg>',
  walk:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="13" cy="4" r="2"/><path d="M11 8l2 4 3 2M13 12l-2 5-3 4M13 12l1 5 3 3"/></svg>',
  train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 11h14M9 20l-2 2M15 20l2 2"/><circle cx="9" cy="13.5" r="1" fill="currentColor"/><circle cx="15" cy="13.5" r="1" fill="currentColor"/></svg>',
  bus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="4" y="4" width="16" height="13" rx="3"/><path d="M4 11h16M8 20v-3M16 20v-3"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>',
  pin:   '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z"/><path d="M19 14l.9 2.6L22 17l-2.1.4L19 20l-.9-2.6L16 17l2.1-.4L19 14Z"/></svg>',
  ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
  star:  '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.9L12 17.5 5.7 20.6l1.6-6.9L2 9.1l7-.6L12 2Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M9 5l7 7-7 7"/></svg>',
  arrowU:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="26" height="26"><path d="M12 20V5M5 12l7-7 7 7"/></svg>',
  turnL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="26" height="26"><path d="M9 6 4 11l5 5M4 11h11a5 5 0 0 1 5 5v3"/></svg>',
};

/* badge for a transport mode */
function modeChip(mode, color){ return `<span class="tl-mode" style="background:${color}">${mode}</span>`; }

/* ---------- meta describing each screen ---------- */
const NAV_TABS = { home:'home', pass:'pass', explore:'explore', profile:'profile', planner:'planner' };

const screens = {};
let tgId = 0; // toggle id counter (used by rowToggle while screens are built)

/* 1 ── SPLASH ─────────────────────────────────────────────────────── */
screens.splash = { nav:false, dark:true, noStatus:false, html:`
  <div class="pad center" style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;
       background:linear-gradient(160deg,#0B5FFF 0%,#7B3FE4 60%,#E63946 130%);color:#fff;border-radius:40px">
    <div class="mark" style="width:96px;height:96px;border-radius:30px;display:grid;place-items:center;background:rgba(255,255,255,.16);backdrop-filter:blur(6px)">
      <svg viewBox="0 0 24 24" fill="none" width="52" height="52"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" fill="#fff"/><circle cx="12" cy="9" r="2.6" fill="#0B5FFF"/></svg>
    </div>
    <h1 style="font-size:34px;font-weight:900;margin-top:22px;letter-spacing:-1px">MyTour</h1>
    <div style="font-size:17px;font-weight:600;opacity:.92;letter-spacing:3px">M A L A Y S I A</div>
    <p style="opacity:.85;margin-top:14px;font-size:14px;max-width:240px;line-height:1.6">Navigate Malaysia's transit with confidence — one colour, one pass, one app.</p>
    <div class="strip row gap8 mt24" style="justify-content:center">
      ${['#1E73E8','#E63946','#7B3FE4','#14A06B','#F4B400'].map(c=>`<span style="width:26px;height:6px;border-radius:4px;background:${c}"></span>`).join('')}
    </div>
    <button class="btn" style="background:#fff;color:#0B5FFF;margin-top:40px;max-width:240px" onclick="go('onboarding')">Get Started</button>
    <button class="btn" style="background:transparent;color:#fff;margin-top:6px;max-width:240px" onclick="go('language')">I already have an account</button>
  </div>`};

/* 2 ── ONBOARDING ─────────────────────────────────────────────────── */
const obSlides = [
  { bg:'linear-gradient(160deg,#1E73E8,#0B5FFF)', icon:I.train,
    t:'Follow the Colours', d:'Every route, sign & platform shares one colour system. Just follow your colour from the app to the station floor.' },
  { bg:'linear-gradient(160deg,#7B3FE4,#9d5cff)', icon:I.spark,
    t:'AI Plans Your Trip', d:'Tell us your preference — fastest, cheapest, least walking or tourist-friendly — and MyTour AI builds the route.' },
  { bg:'linear-gradient(160deg,#14A06B,#0E7C6E)', icon:I.walk,
    t:'Walk Safely', d:'We prioritise covered walkways, bridges, lit paths & wheelchair access — not just the shortest line on a map.' },
  { bg:'linear-gradient(160deg,#F4B400,#E8861E)', icon:I.ticket,
    t:'One Pass, Every Ride', d:'A single digital tourist pass covers MRT, LRT, KTM, Monorail, Rapid Bus & Airport Transit.' },
];
screens.onboarding = { nav:false, dark:false, html:`
  <div class="pad">
    <div class="row between"><span class="muted small">Tutorial</span><button class="pill" onclick="go('language')">Skip</button></div>
    <div id="ob-illust" class="ob-illust mt12" style="background:${obSlides[0].bg}">
      <div style="color:#fff;transform:scale(3.2);opacity:.95">${obSlides[0].icon}</div>
      <div style="position:absolute;bottom:14px;left:14px;right:14px;display:flex;gap:6px">
        ${['#1E73E8','#E63946','#7B3FE4','#14A06B','#F4B400'].map(c=>`<span style="flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.5)"></span>`).join('')}
      </div>
    </div>
    <h1 class="h1 mt20" id="ob-title">${obSlides[0].t}</h1>
    <p class="muted mt8" id="ob-desc" style="line-height:1.6;font-size:14.5px">${obSlides[0].d}</p>
    <div class="dots mt24" id="ob-dots"></div>
    <button class="btn btn-primary mt24" id="ob-next" onclick="obNext()">Next</button>
  </div>`};

/* 3 ── LANGUAGE SELECTION ─────────────────────────────────────────── */
const langs = [
  ['🇬🇧','English','Default'],['🇲🇾','Bahasa Melayu','Malay'],['🇨🇳','中文','Chinese'],
  ['🇯🇵','日本語','Japanese'],['🇰🇷','한국어','Korean'],['🇸🇦','العربية','Arabic'],
];
screens.language = { nav:false, dark:false, html:`
  <div class="pad">
    <div class="row gap12" style="margin-bottom:6px">${I.globe}<span class="muted small">Step 1 of 2</span></div>
    <h1 class="h1">Choose your language</h1>
    <p class="muted mt8">Interface, station signs, chatbot & voice all switch instantly.</p>
    <div class="mt20" style="display:flex;flex-direction:column;gap:10px">
      ${langs.map((l,i)=>`<div class="lang-opt ${i===0?'sel':''}" data-lang onclick="pickLang(this,'${l[1]}')">
        <span class="flag">${l[0]}</span><div style="flex:1"><b>${l[1]}</b><span style="display:block">${l[2]}</span></div>
        <span class="tick-ring"></span></div>`).join('')}
    </div>
    <button class="btn btn-primary mt24" onclick="go('login')">Continue</button>
  </div>`};

/* 4 ── GUEST / LOGIN ──────────────────────────────────────────────── */
screens.login = { nav:false, dark:false, html:`
  <div class="pad">
    <div class="center mt8">
      <div class="mark" style="width:64px;height:64px;border-radius:20px;display:inline-grid;place-items:center;background:linear-gradient(135deg,#0B5FFF,#7B3FE4)">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" fill="#fff"/><circle cx="12" cy="9" r="2.6" fill="#0B5FFF"/></svg>
      </div>
      <h1 class="h1 mt16">Welcome to MyTour</h1>
      <p class="muted mt8">Sign in to sync your pass & trips — or explore as a guest.</p>
    </div>
    <div class="mt24">
      <div class="field-label">Email</div>
      <input class="input" placeholder="you@email.com" value="ikhwansoleh1620@gmail.com"/>
      <div class="field-label mt16">Password</div>
      <input class="input" type="password" placeholder="••••••••" value="touristpass"/>
    </div>
    <button class="btn btn-primary mt24" onclick="enterApp()">Sign In</button>
    <div class="row gap12 mt16"><div class="divider" style="flex:1"></div><span class="muted small">or</span><div class="divider" style="flex:1"></div></div>
    <div class="row gap12">
      <button class="btn btn-outline" onclick="enterApp()"><svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3.8h5.3A5.3 5.3 0 0 1 6.7 12 5.3 5.3 0 0 1 12 6.7c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9 9 0 1 0 21 12c0-.6-.1-1.3-.2-1.9H12Z"/></svg>Google</button>
      <button class="btn btn-outline" onclick="enterApp()"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.8-.9 2.8 1.1.1 2.2-.6 2.9-1.4.6-.8 1-1.9.9-2.9ZM19 17c-.5 1.1-1.1 2.2-2 3-.7.6-1.5 1.2-2.5 1.2-.9 0-1.5-.6-2.6-.6s-1.8.6-2.6.6c-1 0-1.8-.7-2.5-1.4C3 18 2 14 3.6 11.4c.8-1.3 2.1-2.1 3.5-2.1 1 0 1.9.7 2.6.7.6 0 1.8-.8 3-.7.5 0 2 .2 2.9 1.5-2.5 1.6-2.1 5.2.4 6.2Z"/></svg>Apple</button>
    </div>
    <button class="btn btn-ghost mt12" onclick="enterApp()">Continue as Guest →</button>
  </div>`};

/* 5 ── HOME DASHBOARD ─────────────────────────────────────────────── */
screens.home = { nav:true, tab:'home', dark:true, html:`
  <div class="hero brand">
    <div class="row between">
      <div><div class="small" style="opacity:.85">Selamat datang 👋</div><div style="font-size:20px;font-weight:800">Hi, Traveller</div></div>
      <button class="icon-btn" style="background:rgba(255,255,255,.18);color:#fff" onclick="go('notifications')">${I.bell}</button>
    </div>
    <div class="mt16 search-bar" onclick="go('planner')">
      ${I.pin}<span style="flex:1">Where do you want to go?</span>${I.mic}
    </div>
  </div>
  <div class="pad" style="padding-top:16px">
    <!-- active pass strip -->
    <div class="card" style="background:linear-gradient(135deg,#0B5FFF,#7B3FE4);color:#fff;display:flex;align-items:center;gap:14px" onclick="go('pass')">
      <div style="width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.2);display:grid;place-items:center">${I.ticket}</div>
      <div style="flex:1"><b style="font-size:15px">3-Day Tourist Pass · Active</b><div class="small" style="opacity:.9">Expires in 2d 6h 14m · All transit covered</div></div>
      ${I.chev}
    </div>

    <h2 class="h2 mt20">Quick actions</h2>
    <div class="qa-grid mt12">
      <button class="qa" onclick="go('planner')"><span class="ic" style="background:var(--c-blue-soft);color:var(--c-blue)">${I.spark}</span><span>AI Route Planner</span></button>
      <button class="qa" onclick="go('routemap')"><span class="ic" style="background:var(--c-yellow-soft);color:#9a7400">${I.pin}</span><span>Colour Map</span></button>
      <button class="qa" onclick="go('pass')"><span class="ic" style="background:var(--c-purple-soft);color:var(--c-purple)">${I.ticket}</span><span>My Pass</span></button>
      <button class="qa" onclick="go('chat')"><span class="ic" style="background:var(--c-green-soft);color:var(--c-green)">${I.spark}</span><span>MyTour AI</span></button>
      <button class="qa" onclick="go('pedestrian')"><span class="ic" style="background:var(--c-green-soft);color:var(--c-green)">${I.walk}</span><span>Safe Walk</span></button>
      <button class="qa" onclick="go('coverage')"><span class="ic" style="background:var(--c-red-soft);color:var(--c-red)">${I.train}</span><span>Coverage</span></button>
      <button class="qa" onclick="go('nearby')"><span class="ic" style="background:var(--c-blue-soft);color:var(--c-blue)">${I.star}</span><span>Nearby</span></button>
      <button class="qa" onclick="go('emergency')"><span class="ic" style="background:var(--c-red-soft);color:var(--c-red)">${I.shield}</span><span>Emergency</span></button>
    </div>

    <div class="row between mt24"><h2 class="h2">Popular right now</h2><span class="small" style="color:var(--brand);font-weight:700" onclick="go('explore')">See all</span></div>
    <div class="mt12" style="display:flex;gap:12px;overflow-x:auto;padding-bottom:4px">
      ${[['Batu Caves','#14A06B','Green · Nature','colorBlue'],['KLCC Twin Towers','#E63946','Red · City Centre'],['Petaling Street','#1E73E8','Blue · Attraction']].map((a,i)=>`
        <div class="attr-card" style="min-width:190px" onclick="go('nearby')">
          <div class="attr-img" style="background:linear-gradient(135deg,${a[1]},#0008),${gradFor(i)}">
            <span class="badge chip" style="background:#fff;color:${a[1]}">${a[2]}</span>
          </div>
          <div class="attr-body"><b>${a[0]}</b><div class="stars mt8">${I.star}${I.star}${I.star}${I.star}${I.star} <span class="muted small">4.8</span></div></div>
        </div>`).join('')}
    </div>

    <div class="card mt20" style="display:flex;gap:12px;align-items:center;background:var(--c-yellow-soft)" onclick="go('chat')">
      <div style="font-size:26px">🤖</div>
      <div style="flex:1"><b style="font-size:14px">Ask MyTour AI</b><div class="small muted">"How do I get to Batu Caves?"</div></div>
      ${I.chev}
    </div>
  </div>`};

/* 6 ── AI ROUTE PLANNER ───────────────────────────────────────────── */
const prefs = [
  ['fast','Fastest Route','Shortest total time',I.clock,'#E63946'],
  ['cheap','Cheapest Route','Lowest total fare',I.ticket,'#14A06B'],
  ['less','Least Walking','Minimise steps',I.walk,'#7B3FE4'],
  ['safe','Safest Walking Route','Lit & monitored paths',I.shield,'#1E73E8'],
  ['covered','Covered Walkway Route','Stay out of the rain/sun',I.walk,'#F4B400'],
  ['tourist','Tourist-Friendly Route','Scenic & sightseeing-rich',I.star,'#1E73E8'],
];
screens.planner = { nav:true, tab:'planner', dark:false, back:'home', title:'AI Route Planner', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('home')">${I.back}</button><span class="title">AI Route Planner</span><span class="chip tag-purple">${I.spark} AI</span></div>

    <div class="card mt8">
      <div class="row gap12"><span class="legend-dot" style="background:var(--c-green)"></span><div style="flex:1"><div class="field-label" style="margin:0">From</div><input class="input" style="border:none;padding:4px 0;font-weight:700" value="My location (KL Sentral)"></div></div>
      <div class="divider"></div>
      <div class="row gap12"><span class="legend-dot" style="background:var(--c-red)"></span><div style="flex:1"><div class="field-label" style="margin:0">To</div><input class="input" id="dest-input" style="border:none;padding:4px 0;font-weight:700" value="Batu Caves"></div></div>
    </div>

    <h2 class="h2 mt20">Travel preference</h2>
    <p class="muted small mt8">MyTour AI tailors the route to what matters to you.</p>
    <div class="mt12" style="display:flex;flex-direction:column;gap:10px">
      ${prefs.map((p,i)=>`<div class="pref ${p[0]==='tourist'?'sel':''}" data-pref="${p[0]}" onclick="pickPref(this)">
        <span class="ic" style="background:${p[4]}1a;color:${p[4]}">${p[3]}</span>
        <div class="body"><b>${p[1]}</b><span>${p[2]}</span></div>
        <span class="tick">${tickSvg()}</span></div>`).join('')}
    </div>
    <button class="btn btn-primary mt24" onclick="generateRoute()">${I.spark} Generate Route</button>
  </div>`};

/* 7 ── COLOUR-CODED ROUTE MAP (also the AI result) ────────────────── */
screens.routemap = { nav:false, dark:false, back:'planner', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('planner')">${I.back}</button><span class="title">Recommended Route</span><span class="chip tag-blue" id="route-pref-chip">Tourist-Friendly</span></div>

    <!-- summary strip -->
    <div class="row gap12 mt8">
      <div class="stat-tile center"><div class="n">53<span style="font-size:13px">min</span></div><div class="l">Duration</div></div>
      <div class="stat-tile center"><div class="n">RM 6<span style="font-size:13px">.30</span></div><div class="l">Est. cost</div></div>
      <div class="stat-tile center"><div class="n">650<span style="font-size:13px">m</span></div><div class="l">Walking</div></div>
    </div>

    <!-- COLOUR MAP -->
    <div class="map-canvas mt16" id="route-map">
      <div class="map-park"></div><div class="map-water"></div>
      <!-- route segments (blue → yellow interchange → green) -->
      <div class="map-line" style="left:14%;top:78%;width:140px;background:#1E73E8;transform:rotate(-28deg)"></div>
      <div class="map-line" style="left:46%;top:50%;width:90px;background:#F4B400;transform:rotate(8deg)"></div>
      <div class="map-line" style="left:62%;top:55%;width:120px;background:#14A06B;transform:rotate(-34deg)"></div>
      <div class="map-stn" style="left:14%;top:80%"></div>
      <div class="map-stn" style="left:46%;top:50%"></div>
      <div class="map-stn" style="left:62%;top:55%"></div>
      <div class="map-pin" style="left:80%;top:30%"><div class="dot" style="background:#14A06B"></div></div>
      <div style="position:absolute;left:8%;top:84%;font-size:10px;font-weight:800;color:#1E73E8;background:#fff;padding:2px 6px;border-radius:6px;box-shadow:var(--shadow-sm)">KL Sentral</div>
      <div style="position:absolute;left:40%;top:42%;font-size:10px;font-weight:800;color:#9a7400;background:#fff;padding:2px 6px;border-radius:6px;box-shadow:var(--shadow-sm)">Interchange</div>
      <div style="position:absolute;left:74%;top:20%;font-size:10px;font-weight:800;color:#14A06B;background:#fff;padding:2px 6px;border-radius:6px;box-shadow:var(--shadow-sm)">Batu Caves</div>
      <div class="map-overlay-card card" style="display:flex;align-items:center;gap:10px;padding:12px">
        <span class="chip tag-blue">${I.spark}</span>
        <div style="flex:1"><b style="font-size:13px">Follow the Blue Tourist Route</b><div class="small muted">Colours match station floor markings & signs</div></div>
      </div>
    </div>

    <!-- legend for this route -->
    <div class="card flat mt16">
      <div class="row gap16 wrap" style="justify-content:space-around">
        <div class="row gap8"><span class="legend-dot" style="background:#1E73E8"></span><span class="small"><b>Blue</b> Attraction</span></div>
        <div class="row gap8"><span class="legend-dot" style="background:#F4B400"></span><span class="small"><b>Yellow</b> Interchange</span></div>
        <div class="row gap8"><span class="legend-dot" style="background:#14A06B"></span><span class="small"><b>Green</b> Nature</span></div>
      </div>
    </div>

    <!-- TIMELINE -->
    <h2 class="h2 mt20">Step by step</h2>
    <div class="card mt12 timeline">
      ${tlStep('#1E73E8', I.walk,'Walk to KL Sentral MRT','Follow Blue Route · 180m · covered',modeChip('WALK','#1E73E8'))}
      ${tlStep('#1E73E8', I.train,'MRT Kajang Line → Muzium Negara','2 stops · 6 min',modeChip('MRT','#1E73E8'))}
      ${tlStep('#F4B400', I.walk,'Follow Yellow Route to Interchange','Transfer link bridge · 120m · covered',modeChip('TRANSFER','#F4B400'))}
      ${tlStep('#F4B400', I.train,'KTM Komuter at KL Sentral','Board Batu Caves line',modeChip('KTM','#F4B400'))}
      ${tlStep('#14A06B', I.train,'KTM → Batu Caves (terminus)','7 stops · 28 min',modeChip('KTM','#14A06B'))}
      ${tlStep('#14A06B', I.pin,'Arrive · Follow Green Nature Route','350m to the cave steps',modeChip('ARRIVE','#14A06B'),true)}
    </div>

    <div class="row gap12 mt20">
      <button class="btn btn-outline" onclick="go('pedestrian')">${I.walk} Walk preview</button>
      <button class="btn btn-primary" onclick="go('navlive')">Start Navigation</button>
    </div>
  </div>`};

/* 8 ── LIVE NAVIGATION ────────────────────────────────────────────── */
screens.navlive = { nav:false, dark:true, back:'routemap', html:`
  <div style="height:100%;display:flex;flex-direction:column">
    <div class="map-canvas" style="height:100%;border-radius:0;flex:1">
      <div class="map-park"></div><div class="map-water"></div>
      <div class="map-line" style="left:20%;top:70%;width:200px;background:#1E73E8;transform:rotate(-30deg)"></div>
      <div class="map-pin" style="left:30%;top:62%"><div class="dot" style="background:#0B5FFF;width:20px;height:20px"></div></div>

      <!-- top turn banner -->
      <div style="position:absolute;top:calc(var(--safe-top) + 8px);left:14px;right:14px">
        <div class="nav-banner">
          <div class="turn" style="background:var(--c-blue)">${I.arrowU}</div>
          <div style="flex:1"><div style="font-size:22px;font-weight:800">200 m</div><div class="small" style="opacity:.85">Follow the Blue Route to Platform B</div></div>
        </div>
      </div>

      <!-- voice chip -->
      <div style="position:absolute;top:calc(var(--safe-top) + 96px);left:14px" class="chip" style="background:#000c;color:#fff;padding:8px 12px">
        <span style="display:inline-flex;gap:6px;align-items:center;color:#fff">${I.mic}<span class="small" id="voice-line">"Walk 200 metres, follow the Blue Route"</span></span>
      </div>

      <!-- bottom sheet -->
      <div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:24px 24px 0 0;padding:18px 18px 26px;box-shadow:0 -8px 30px rgba(0,0,0,.18)">
        <div style="width:42px;height:5px;background:var(--line);border-radius:3px;margin:0 auto 14px"></div>
        <div class="row between"><div><b style="font-size:17px;color:var(--ink)">To Batu Caves</b><div class="small muted">Arriving 10:34 · 53 min left</div></div>
          <button class="btn-sm btn" style="background:var(--c-red);color:#fff;width:auto" onclick="go('home')">End</button></div>
        <div class="bar mt16"><i style="width:34%;background:var(--c-blue)"></i></div>
        <div class="row between mt8 small muted"><span>KL Sentral</span><span>Interchange</span><span>Batu Caves</span></div>
        <div class="row gap12 mt16">
          <button class="btn btn-ghost" onclick="toast('🔊 Voice guidance on')">${I.mic} Voice</button>
          <button class="btn btn-outline" onclick="go('pedestrian')">${I.walk} Safe walk</button>
        </div>
      </div>
    </div>
  </div>`};

/* 9 ── PEDESTRIAN SAFETY NAVIGATION ───────────────────────────────── */
screens.pedestrian = { nav:false, dark:false, back:'routemap', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('routemap')">${I.back}</button><span class="title">Safe Walking Route</span><span class="chip tag-green">${I.shield} Safe</span></div>

    <div class="map-canvas mt8" style="height:200px">
      <div class="map-line" style="left:12%;top:75%;width:150px;background:#1E73E8;transform:rotate(-24deg)"></div>
      <div class="map-line" style="left:48%;top:45%;width:90px;background:#14A06B;transform:rotate(10deg);height:8px;border:2px dashed #fff"></div>
      <div class="map-stn" style="left:12%;top:78%"></div>
      <div class="map-pin" style="left:74%;top:42%"><div class="dot" style="background:#14A06B"></div></div>
      <span class="chip tag-green" style="position:absolute;left:40%;top:34%;box-shadow:var(--shadow-sm)">🌂 Covered</span>
    </div>

    <div class="card mt16" style="background:var(--c-green-soft)">
      <div class="row gap12"><span class="chip tag-green">${I.shield}</span><div style="flex:1"><b style="font-size:14px">This route is optimised for safety</b><div class="small muted">Well-lit · covered · wheelchair accessible · CCTV-monitored</div></div></div>
    </div>

    <div class="row gap8 mt16 wrap">
      <span class="chip tag-green">🌂 Covered walkway</span>
      <span class="chip tag-blue">🌉 Pedestrian bridge</span>
      <span class="chip tag-yellow">🚦 Zebra crossing</span>
      <span class="chip tag-green">💡 Illuminated</span>
      <span class="chip tag-purple">♿ Step-free</span>
    </div>

    <h2 class="h2 mt20">Walking instructions</h2>
    <div class="card mt12 timeline">
      ${tlStep('#14A06B', I.walk,'Exit through Gate B','Avoids the unlit service road',modeChip('EXIT','#14A06B'))}
      ${tlStep('#1E73E8', I.walk,'Use the covered pedestrian bridge','120m · sheltered from rain & sun',modeChip('BRIDGE','#1E73E8'))}
      ${tlStep('#F4B400', I.walk,'Cross at the zebra crossing','Signal-controlled · 15s wait',modeChip('CROSS','#F4B400'))}
      ${tlStep('#1E73E8', I.walk,'Follow the Blue Route for 200m','Lit walkway alongside the main road',modeChip('WALK','#1E73E8'))}
      ${tlStep('#14A06B', I.pin,'Arrive at platform entrance','Step-free access available',modeChip('ARRIVE','#14A06B'),true)}
    </div>

    <div class="card flat mt16">
      <b class="small">Avoided for your safety</b>
      <div class="row gap8 mt8 wrap">
        <span class="chip" style="background:#fbeaea;color:#b3261e">⚠ Isolated road</span>
        <span class="chip" style="background:#fbeaea;color:#b3261e">⚠ Poorly lit area</span>
        <span class="chip" style="background:#fbeaea;color:#b3261e">⚠ Unsafe crossing</span>
      </div>
    </div>
    <button class="btn btn-primary mt20" onclick="go('navlive')">Start Safe Navigation</button>
  </div>`};

/* 10 ── TOURIST PASS WALLET ───────────────────────────────────────── */
screens.pass = { nav:true, tab:'pass', dark:false, html:`
  <div class="pad">
    <div class="app-header"><span class="title">Tourist Pass Wallet</span><button class="icon-btn" onclick="go('history')">${I.clock}</button></div>

    <!-- active pass -->
    <div class="pass-card">
      <div class="row between"><div><div class="small" style="opacity:.85">Malaysia Unified Tourist Pass</div><div style="font-size:22px;font-weight:900">3-Day Pass</div></div>
        <span class="chip" style="background:rgba(255,255,255,.22);color:#fff">● Active</span></div>
      <div class="row between mt20">
        <div><div class="small" style="opacity:.8">Remaining</div><div style="font-size:20px;font-weight:800" id="pass-count">2d 06:14:22</div></div>
        <div style="text-align:right"><div class="small" style="opacity:.8">Activated</div><div style="font-weight:700">19 Jun 2026</div></div>
      </div>
      <div class="bar mt16" style="background:rgba(255,255,255,.25)"><i style="width:62%;background:#fff"></i></div>
      <button class="btn mt16" style="background:#fff;color:#0B5FFF" onclick="go('qr')">${I.ticket} Show QR to ride</button>
    </div>

    <h2 class="h2 mt20">Covered transport</h2>
    <div class="qa-grid mt12" style="grid-template-columns:repeat(3,1fr)">
      ${[['MRT','#1E73E8'],['LRT','#E63946'],['KTM','#14A06B'],['Monorail','#7B3FE4'],['Rapid Bus','#F4B400'],['Airport Transit','#7B3FE4']].map(t=>`
        <div class="qa" style="cursor:default"><span class="ic" style="background:${t[1]}1a;color:${t[1]}">${t[0]==='Rapid Bus'?I.bus:I.train}</span><span>${t[0]}</span></div>`).join('')}
    </div>

    <div class="row between mt20"><h2 class="h2">Get another pass</h2></div>
    <div class="mt12" style="display:flex;flex-direction:column;gap:10px">
      ${[['1 Day Pass','RM 35','Unlimited rides for 24 hours','green'],['2 Day Pass','RM 65','Best for a weekend trip','gold'],['3 Day Pass','RM 90','Most popular · save 15%','']].map(p=>`
        <div class="card row between" onclick="toast('${p[0]} added to cart')" style="cursor:pointer">
          <div class="row gap12"><span class="chip ${p[3]==='gold'?'tag-yellow':p[3]==='green'?'tag-green':'tag-purple'}">${I.ticket}</span>
            <div><b style="font-size:15px">${p[0]}</b><div class="small muted">${p[2]}</div></div></div>
          <div style="text-align:right"><b style="color:var(--brand)">${p[1]}</b>${I.chev}</div>
        </div>`).join('')}
    </div>
  </div>`};

/* 11 ── QR PASS SCREEN ────────────────────────────────────────────── */
screens.qr = { nav:false, dark:false, back:'pass', html:`
  <div class="pad center">
    <div class="app-header"><button class="icon-btn" onclick="go('pass')">${I.back}</button><span class="title">Your Pass QR</span><span style="width:40px"></span></div>
    <div class="card mt8" style="padding:24px">
      <span class="chip tag-green">● Valid</span>
      <div class="qr-box mt16">${qrSvg()}</div>
      <h2 class="h2 mt16">3-Day Tourist Pass</h2>
      <p class="muted small">Scan at any MRT / LRT / KTM / Monorail / Bus gate</p>
      <div class="card flat mt16" style="background:var(--bg)">
        <div class="row between small"><span class="muted">Pass ID</span><b>MY-TR-3D-882047</b></div>
        <div class="divider"></div>
        <div class="row between small"><span class="muted">Remaining</span><b style="color:var(--brand)">2d 06:14:22</b></div>
        <div class="divider"></div>
        <div class="row between small"><span class="muted">Status</span><b style="color:var(--c-green)">Active & valid</b></div>
      </div>
      <div class="row gap8 mt16" style="justify-content:center">
        ${[1,2,3].map(()=>'<span style="width:34px;height:6px;border-radius:3px;background:var(--c-green)"></span>').join('')}
      </div>
      <p class="muted small mt8">Brightness boosted for scanning</p>
    </div>
  </div>`};

/* 12 ── AI CHATBOT ────────────────────────────────────────────────── */
screens.chat = { nav:false, dark:false, back:'home', html:`
  <div class="pad" style="display:flex;flex-direction:column;height:100%;background:var(--bg)">
    <div class="app-header"><button class="icon-btn" onclick="go('home')">${I.back}</button>
      <div style="display:flex;align-items:center;gap:10px;flex:1"><div style="font-size:26px">🤖</div><div><div class="title" style="font-size:16px">MyTour AI</div><div class="small" style="color:var(--c-green)">● Online · 6 languages</div></div></div></div>
    <div class="chat-stream mt12" id="chat-stream" style="flex:1;overflow-y:auto;padding-bottom:8px">
      <div class="bubble ai">Hi! I'm <b>MyTour AI</b> 👋 Ask me anything about getting around Malaysia — routes, transfers, tickets, or attractions.</div>
    </div>
    <div class="chat-suggest mt12" id="chat-suggest">
      ${['How do I get to Batu Caves?','Cheapest route to KLCC?','Can I use my pass on KTM?','Emergency numbers?'].map(q=>`<span class="pill" onclick="askBot('${q.replace(/'/g,"")}')">${q}</span>`).join('')}
    </div>
    <div class="chat-input">
      <input class="input" id="chat-text" placeholder="Message MyTour AI…" onkeydown="if(event.key==='Enter')sendChat()"/>
      <button class="icon-btn" style="background:var(--brand);color:#fff;width:48px;height:48px" onclick="sendChat()">${I.send}</button>
    </div>
  </div>`};

/* 13 ── TOURIST RECOMMENDATIONS (Explore) ─────────────────────────── */
const attractions = [
  ['Batu Caves','Parks & Nature','#14A06B','green','13 km','KTM · 35 min',4.7,'97% love it'],
  ['KLCC Twin Towers','City Centre','#E63946','red','2 km','MRT · 9 min',4.9,'Top rated'],
  ['Petaling Street','Tourist Attraction','#1E73E8','blue','1.5 km','MRT · 7 min',4.5,'Foodie favourite'],
  ['Perdana Botanical','Parks & Nature','#14A06B','green','3 km','Bus · 14 min',4.6,'Family pick'],
  ['Central Market','Tourist Attraction','#1E73E8','blue','1.8 km','LRT · 8 min',4.4,'Crafts & art'],
];
screens.explore = { nav:true, tab:'explore', dark:false, html:`
  <div class="pad">
    <div class="app-header"><span class="title">Explore</span><button class="icon-btn" onclick="go('nearby')">${I.pin}</button></div>
    <div class="search-bar" style="box-shadow:var(--shadow-sm)">${I.spark}<span style="flex:1">Search attractions, food, culture…</span></div>
    <div class="row gap8 mt16" style="overflow-x:auto;padding-bottom:4px">
      ${[['All','#0E1726'],['Attractions','#1E73E8'],['City Centre','#E63946'],['Parks','#14A06B'],['Culture','#7B3FE4'],['Food','#F4B400']].map((c,i)=>`<span class="pill ${i===0?'active':''}" style="${i===0?'':'border-color:'+c[1]}">${c[0]}</span>`).join('')}
    </div>
    <div class="row between mt20"><h2 class="h2">Recommended for you</h2><span class="small" style="color:var(--brand);font-weight:700">AI ranked</span></div>
    <div class="mt12" style="display:flex;flex-direction:column;gap:14px">
      ${attractions.map((a,i)=>`
        <div class="attr-card" onclick="go('nearby')">
          <div class="attr-img" style="background:linear-gradient(135deg,${a[2]}cc,#0006),${gradFor(i)}">
            <span class="badge chip tag-${a[3]}">${a[1]}</span>
            <span class="chip" style="position:absolute;right:10px;top:10px;background:#000a;color:#fff">${I.star}${a[6]}</span>
          </div>
          <div class="attr-body">
            <div class="row between"><b style="font-size:15px">${a[0]}</b><span class="chip tag-${a[3]}" style="font-size:10px">${a[7]}</span></div>
            <div class="row gap12 mt8 small muted">
              <span class="row gap8">${I.pin}${a[4]}</span><span class="row gap8">${I.train}${a[5]}</span>
            </div>
          </div>
        </div>`).join('')}
    </div>
  </div>`};

/* 14 ── NEARBY ATTRACTIONS (detail-ish) ───────────────────────────── */
screens.nearby = { nav:false, dark:true, back:'explore', html:`
  <div>
    <div class="attr-img" style="height:230px;background:linear-gradient(160deg,#14A06Bcc,#0007),${gradFor(0)};border-radius:0 0 26px 26px;position:relative">
      <button class="icon-btn" style="position:absolute;left:18px;top:calc(var(--safe-top));" onclick="go('explore')">${I.back}</button>
      <div style="position:absolute;left:18px;bottom:18px;color:#fff">
        <span class="chip tag-green">Parks & Nature · Green Route</span>
        <h1 class="h1" style="color:#fff;margin-top:8px">Batu Caves</h1>
        <div class="row gap12 small" style="opacity:.95"><span class="row gap8">${I.star} 4.7 (28k)</span><span class="row gap8">${I.pin} 13 km away</span></div>
      </div>
    </div>
    <div class="pad" style="padding-top:16px">
      <div class="row gap12">
        <div class="stat-tile center"><div class="n" style="color:var(--c-green)">35<span style="font-size:12px">m</span></div><div class="l">Travel time</div></div>
        <div class="stat-tile center"><div class="n" style="color:var(--c-blue)">RM6<span style="font-size:12px">.30</span></div><div class="l">By pass: free</div></div>
        <div class="stat-tile center"><div class="n" style="color:var(--c-yellow)">97<span style="font-size:12px">%</span></div><div class="l">Popularity</div></div>
      </div>
      <div class="card mt16">
        <b class="small">How to get there</b>
        <div class="list-item"><span class="lead tag-blue">${I.train}</span><div class="body"><b>MRT to KL Sentral</b><span>Blue tourist route · 6 min</span></div></div>
        <div class="divider" style="margin:4px 0"></div>
        <div class="list-item"><span class="lead tag-green">${I.train}</span><div class="body"><b>KTM Komuter to Batu Caves</b><span>Green nature route · 28 min</span></div></div>
      </div>
      <p class="muted mt16" style="line-height:1.6;font-size:14px">A 400-million-year-old limestone hill with a series of caves & Hindu temples, famous for the 272 rainbow steps and the golden Murugan statue.</p>
      <div class="row gap8 mt12 wrap">
        <span class="chip tag-green">🌿 Nature</span><span class="chip tag-purple">🛕 Cultural site</span><span class="chip tag-blue">📸 Photo spot</span>
      </div>
      <div class="row gap12 mt20">
        <button class="btn btn-outline" onclick="go('chat')">🤖 Ask AI</button>
        <button class="btn btn-primary" onclick="go('routemap')">Get directions</button>
      </div>
    </div>
  </div>`};

/* 15 ── EMERGENCY ─────────────────────────────────────────────────── */
screens.emergency = { nav:false, dark:false, back:'home', html:`
  <div class="pad center">
    <div class="app-header"><button class="icon-btn" onclick="go('home')">${I.back}</button><span class="title">Emergency Assistance</span><span style="width:40px"></span></div>
    <p class="muted mt8">Hold the button to alert local emergency services with your live location.</p>
    <button class="sos-btn sos-pulse mt16" onclick="toast('🚨 Alerting emergency services & sharing location')">SOS</button>
    <div class="card flat mt16" style="background:var(--c-red-soft)"><div class="row gap8" style="justify-content:center;color:var(--c-red)">${I.pin}<b class="small">Live location: KL Sentral, Kuala Lumpur</b></div></div>
    <h2 class="h2 mt24" style="text-align:left">Quick contacts</h2>
    <div class="mt12" style="display:flex;flex-direction:column;gap:10px">
      ${[['Police','999','#1E73E8'],['Ambulance / Fire','999','#E63946'],['Tourist Police','03-2149 6590','#7B3FE4'],['Tourism Hotline','1-300-88-5050','#14A06B']].map(c=>`
        <div class="card row between" onclick="toast('Calling ${c[0]}…')" style="cursor:pointer">
          <div class="row gap12"><span class="chip" style="background:${c[2]}1a;color:${c[2]}">${I.shield}</span><b>${c[0]}</b></div>
          <b style="color:${c[2]}">${c[1]}</b></div>`).join('')}
    </div>
    <div class="card mt16" style="background:var(--c-yellow-soft);text-align:left">
      <b class="small">Nearest help</b>
      <div class="list-item"><span class="lead tag-red">${I.pin}</span><div class="body"><b>KL Sentral Police Post</b><span>120m · inside main concourse</span></div></div>
      <div class="list-item"><span class="lead tag-blue">${I.shield}</span><div class="body"><b>HKL Hospital</b><span>4.2 km · 11 min by Grab</span></div></div>
    </div>
  </div>`};

/* 16 ── PROFILE SETTINGS ──────────────────────────────────────────── */
screens.profile = { nav:true, tab:'profile', dark:false, html:`
  <div class="pad">
    <div class="app-header"><span class="title">Profile</span><button class="icon-btn" onclick="go('help')">?</button></div>
    <div class="card row gap12" style="align-items:center">
      <div class="avatar" style="width:56px;height:56px;font-size:20px">T</div>
      <div style="flex:1"><b style="font-size:16px">Traveller</b><div class="small muted">ikhwansoleh1620@gmail.com</div><span class="chip tag-purple mt8">${I.ticket} 3-Day Pass active</span></div>
    </div>
    <div class="row gap12 mt16">
      <div class="stat-tile center"><div class="n">12</div><div class="l">Trips</div></div>
      <div class="stat-tile center"><div class="n">5</div><div class="l">Places</div></div>
      <div class="stat-tile center"><div class="n">2</div><div class="l">Passes</div></div>
    </div>

    <h2 class="h2 mt20">Preferences</h2>
    <div class="card mt12" style="padding:6px 16px">
      ${rowLink(I.globe,'Language','English',"go('language')")}
      ${rowToggle(I.shield,'Prioritise safe walking',true)}
      ${rowToggle(I.mic,'Voice navigation',true)}
      ${rowToggle('🌂','Prefer covered routes',false)}
      ${rowToggle('♿','Step-free / accessible',false)}
    </div>
    <h2 class="h2 mt20">Account</h2>
    <div class="card mt12" style="padding:6px 16px">
      ${rowLink(I.ticket,'My passes & wallet','',"go('pass')")}
      ${rowLink(I.clock,'Route history','',"go('history')")}
      ${rowLink(I.bell,'Notifications','3 new',"go('notifications')")}
      ${rowLink(I.shield,'Help & support','',"go('help')")}
    </div>
    <button class="btn btn-outline mt20" style="color:var(--c-red);border-color:var(--c-red)" onclick="go('splash')">Log out</button>
  </div>`};

/* 17 ── ROUTE HISTORY ─────────────────────────────────────────────── */
screens.history = { nav:false, dark:false, back:'profile', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('profile')">${I.back}</button><span class="title">Route History</span></div>
    <div class="seg mt8"><button class="on">Recent</button><button>This week</button><button>All</button></div>
    <div class="mt16" style="display:flex;flex-direction:column;gap:12px">
      ${[['Batu Caves','Today · 09:41','RM 6.30','53 min','blue'],['KLCC Twin Towers','Yesterday · 18:02','Pass','12 min','red'],['Petaling Street','20 Jun · 13:15','Pass','9 min','blue'],['KL Bird Park','19 Jun · 10:30','RM 4.10','22 min','green'],['KLIA Airport','19 Jun · 06:50','RM 55.00','33 min','purple']].map(h=>`
        <div class="card row between" onclick="go('routemap')" style="cursor:pointer">
          <div class="row gap12"><span class="chip tag-${h[4]}">${I.pin}</span><div><b style="font-size:14.5px">${h[0]}</b><div class="small muted">${h[1]}</div></div></div>
          <div style="text-align:right"><b class="small" style="color:var(--brand)">${h[2]}</b><div class="small muted">${h[3]}</div></div>
        </div>`).join('')}
    </div>
    <div class="card flat mt16 center"><b class="small muted">12 trips · RM 71.50 spent · 4 saved by pass</b></div>
  </div>`};

/* 18 ── NOTIFICATIONS ─────────────────────────────────────────────── */
screens.notifications = { nav:false, dark:false, back:'home', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('home')">${I.back}</button><span class="title">Notifications</span><span class="small" style="color:var(--brand)">Mark read</span></div>
    <div class="mt8" style="display:flex;flex-direction:column;gap:10px">
      ${[['unread','#E63946',I.ticket,'Pass expiring soon','Your 3-Day Pass ends in 2 days. Renew & save 15%.','2m'],
         ['unread','#F4B400',I.train,'Service notice — KTM','Minor delays on the Batu Caves line (~5 min).','18m'],
         ['unread','#14A06B',I.spark,'AI tip','Rain expected at 4pm — covered routes are now prioritised.','1h'],
         ['','#1E73E8',I.pin,'You arrived at KLCC','Trip completed · 12 min · rate your route.','Yesterday'],
         ['','#7B3FE4',I.star,'New nearby attraction','Aquaria KLCC is 400m from your last stop.','Yesterday']].map(n=>`
        <div class="notif ${n[0]}">
          <span class="ic" style="background:${n[1]}1a;color:${n[1]}">${n[2]}</span>
          <div style="flex:1"><div class="row between"><b style="font-size:14px">${n[3]}</b><span class="small muted">${n[5]}</span></div><div class="small muted" style="margin-top:3px">${n[4]}</div></div>
        </div>`).join('')}
    </div>
  </div>`};

/* 19 ── TRANSPORT COVERAGE MAP ────────────────────────────────────── */
screens.coverage = { nav:false, dark:false, back:'home', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('home')">${I.back}</button><span class="title">Transport Coverage</span></div>
    <div class="map-canvas mt8" style="height:240px">
      <div class="map-park"></div><div class="map-water"></div>
      <div class="map-line" style="left:10%;top:30%;width:240px;background:#1E73E8;transform:rotate(12deg)"></div>
      <div class="map-line" style="left:14%;top:70%;width:220px;background:#E63946;transform:rotate(-10deg)"></div>
      <div class="map-line" style="left:30%;top:20%;width:180px;background:#7B3FE4;transform:rotate(40deg)"></div>
      <div class="map-line" style="left:20%;top:50%;width:160px;background:#14A06B;transform:rotate(-2deg)"></div>
      <div class="map-stn" style="left:46%;top:48%;width:18px;height:18px;border-color:#F4B400"></div>
      <span class="chip tag-yellow" style="position:absolute;left:50%;top:40%;box-shadow:var(--shadow-sm)">KL Sentral · Interchange</span>
    </div>
    <p class="muted small mt12">All lines below are included in your tourist pass.</p>
    <div class="mt12" style="display:flex;flex-direction:column;gap:10px">
      ${[['MRT','#1E73E8','Kajang & Putrajaya lines','58 stations'],
         ['LRT','#E63946','Kelana Jaya & Ampang lines','62 stations'],
         ['Monorail','#7B3FE4','KL city loop','11 stations'],
         ['KTM','#14A06B','Komuter incl. Batu Caves','53 stations'],
         ['Rapid Bus','#F4B400','City & feeder routes','170+ routes'],
         ['Airport Transit','#7B3FE4','KLIA Ekspres & Transit','to KLIA/KLIA2']].map(l=>`
        <div class="cov-line"><span class="badge" style="background:${l[1]}">${l[0].slice(0,3).toUpperCase()}</span>
          <div style="flex:1"><b style="font-size:14px">${l[0]}</b><div class="small muted">${l[2]}</div></div>
          <span class="chip" style="background:${l[1]}1a;color:${l[1]}">${l[3]}</span></div>`).join('')}
    </div>
  </div>`};

/* 20 ── HELP & SUPPORT ────────────────────────────────────────────── */
screens.help = { nav:false, dark:false, back:'profile', html:`
  <div class="pad">
    <div class="app-header"><button class="icon-btn" onclick="go('profile')">${I.back}</button><span class="title">Help & Support</span></div>
    <div class="card mt8 row gap12" style="background:var(--c-blue-soft)" onclick="go('chat')">
      <div style="font-size:26px">🤖</div><div style="flex:1"><b>Chat with MyTour AI</b><div class="small muted">Instant answers, 24/7, in 6 languages</div></div>${I.chev}
    </div>
    <h2 class="h2 mt20">Frequently asked</h2>
    <div class="mt12" style="display:flex;flex-direction:column;gap:10px">
      ${[['How does the colour system work?','Each route type has a fixed colour — Blue (attractions), Red (city centre), Purple (airport), Green (parks), Yellow (interchange). The same colours appear in the app and on station floor markings, signs and maps, so you just keep following your colour.'],
         ['What does the tourist pass cover?','One pass covers MRT, LRT, KTM, Monorail, Rapid Bus and Airport Transit for 1, 2 or 3 days of unlimited rides.'],
         ['Can I use the app offline?','Saved routes, your QR pass and downloaded maps work offline. Live navigation and AI need a connection.'],
         ['How is the safe walking route chosen?','We prioritise covered walkways, pedestrian bridges, lit and CCTV-monitored paths, and step-free access, while avoiding isolated or poorly lit areas.'],
         ['Which languages are supported?','English, Malay, Chinese, Japanese, Korean and Arabic — across the interface, sign translation, chatbot and voice.']].map(f=>`
        <details class="acc"><summary>${f[0]} <span>${I.chev}</span></summary><p>${f[1]}</p></details>`).join('')}
    </div>
    <div class="row gap12 mt20">
      <button class="btn btn-outline" onclick="go('emergency')">${I.shield} Emergency</button>
      <button class="btn btn-primary" onclick="toast('Support request sent')">Contact us</button>
    </div>
    <p class="center muted small mt20">MyTour Malaysia · v1.0 · Prototype</p>
  </div>`};

/* =====================================================================
   HELPERS used inside templates
   ===================================================================== */
function tlStep(color, icon, title, meta, chip, last){
  return `<div class="tl-step">
    <div class="tl-rail" style="color:${color}">
      <span class="tl-node" style="background:${color}"></span>
      ${last?'':`<span class="tl-line" style="background:${color}"></span>`}
    </div>
    <div class="tl-body"><b>${title}</b><div class="meta">${meta}</div>${chip||''}</div>
  </div>`;
}
function rowLink(ic,label,val,act){
  return `<div class="list-item" onclick="${act}" style="cursor:pointer">
    <span class="lead" style="background:var(--bg);color:var(--ink-2)">${ic}</span>
    <div class="body"><b>${label}</b></div>
    <span class="small muted">${val||''}</span>${I.chev}</div>`;
}
function rowToggle(ic,label,on){
  const id='tg'+(tgId++);
  return `<div class="list-item">
    <span class="lead" style="background:var(--bg);color:var(--ink-2)">${ic}</span>
    <div class="body"><b>${label}</b></div>
    <div class="toggle ${on?'on':''}" id="${id}" onclick="this.classList.toggle('on');toast('${label}: '+(this.classList.contains('on')?'On':'Off'))"></div></div>`;
}
function tickSvg(){ return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3"><path d="M5 13l4 4 10-10"/></svg>'; }
function gradFor(i){
  const g=['radial-gradient(circle at 30% 20%,#7fd9ad,#1b9c6e)','radial-gradient(circle at 70% 30%,#ff8a8f,#c92e3a)','radial-gradient(circle at 40% 40%,#7fb2ff,#1e5fd8)','radial-gradient(circle at 50% 20%,#b794f6,#7B3FE4)','radial-gradient(circle at 60% 30%,#ffd86b,#e8a31e)'];
  return g[i%g.length];
}
function qrSvg(){
  // deterministic pseudo-QR
  let cells=''; const n=21; const seed=[1,3,5,8,11,13,2,17,19];
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const corner=(x<7&&y<7)||(x>n-8&&y<7)||(x<7&&y>n-8);
    const on = corner ? ((x===0||x===6||y===0||y===6||(x>1&&x<5&&y>1&&y<5)) && !((x===5||y===5)&&!(x===6||y===6))) : ((x*y+seed[(x+y)%9]+x+ (y*3))%3===0);
    if(on) cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="0 0 21 21" fill="#0E1726">${cells}</svg>`;
}

/* =====================================================================
   RENDER all screens into the DOM
   ===================================================================== */
const viewsEl = document.getElementById('views');
Object.entries(screens).forEach(([id,s])=>{
  const v=document.createElement('div');
  v.className='view'+(s.nav?'':' no-nav');
  v.id='view-'+id;
  v.innerHTML = s.html; // each template includes its own .pad / layout
  viewsEl.appendChild(v);
});

/* build the right-side screen map */
const screenTitles = {
  splash:'Splash', onboarding:'Onboarding Tutorial', language:'Language Selection', login:'Guest / Login',
  home:'Home Dashboard', planner:'AI Route Planner', routemap:'Colour-Coded Route Map', navlive:'Live Navigation',
  pedestrian:'Pedestrian Safety Nav', pass:'Tourist Pass Wallet', qr:'QR Pass Screen', chat:'AI Chatbot Assistant',
  explore:'Tourist Recommendations', nearby:'Nearby Attractions', emergency:'Emergency Assistance', profile:'Profile Settings',
  history:'Route History', notifications:'Notification Center', coverage:'Transport Coverage Map', help:'Help & Support'
};
const order=['splash','onboarding','language','login','home','planner','routemap','navlive','pedestrian','pass','qr','chat','explore','nearby','emergency','profile','history','notifications','coverage','help'];
const mapEl=document.getElementById('screenmap');
order.forEach((id,i)=>{
  const b=document.createElement('button'); b.dataset.map=id;
  b.innerHTML=`<span class="idx">${String(i+1).padStart(2,'0')}</span> ${screenTitles[id]}`;
  b.onclick=()=>go(id); mapEl.appendChild(b);
});

/* =====================================================================
   ROUTING
   ===================================================================== */
let current='splash';
function go(id){
  if(!screens[id]) return;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const v=document.getElementById('view-'+id); v.classList.add('active'); v.scrollTop=0;
  current=id;
  // tab bar visibility + state
  const tb=document.getElementById('tabbar');
  tb.style.display = screens[id].nav ? 'flex' : 'none';
  document.querySelectorAll('#tabbar [data-tab]').forEach(b=>b.classList.toggle('active', b.dataset.tab===screens[id].tab));
  // status bar theme
  document.getElementById('statusbar').className='statusbar'+(screens[id].dark?' light':'');
  // screen map highlight
  document.querySelectorAll('#screenmap button').forEach(b=>b.classList.toggle('active', b.dataset.map===id));
}

/* =====================================================================
   SCREEN-SPECIFIC INTERACTIONS
   ===================================================================== */
/* onboarding */
let obIdx=0;
function renderDots(){
  document.getElementById('ob-dots').innerHTML = obSlides.map((_,i)=>`<i class="${i===obIdx?'on':''}"></i>`).join('');
}
function obNext(){
  obIdx++;
  if(obIdx>=obSlides.length){ go('language'); obIdx=0; return; }
  const s=obSlides[obIdx];
  const il=document.getElementById('ob-illust'); il.style.background=s.bg;
  il.querySelector('div').innerHTML=s.icon;
  document.getElementById('ob-title').textContent=s.t;
  document.getElementById('ob-desc').textContent=s.d;
  document.getElementById('ob-next').textContent = obIdx===obSlides.length-1 ? 'Get Started' : 'Next';
  renderDots();
}

/* language */
function pickLang(el,name){
  document.querySelectorAll('[data-lang]').forEach(x=>x.classList.remove('sel'));
  el.classList.add('sel');
  toast('Language set to '+name);
}

/* login → app */
function enterApp(){ go('home'); toast('Welcome to MyTour Malaysia 🎉'); }

/* planner preference */
let chosenPref='tourist';
const prefLabel={fast:'Fastest',cheap:'Cheapest',less:'Least Walking',safe:'Safest Walking',covered:'Covered Walkway',tourist:'Tourist-Friendly'};
function pickPref(el){
  document.querySelectorAll('[data-pref]').forEach(x=>x.classList.remove('sel'));
  el.classList.add('sel'); chosenPref=el.dataset.pref;
}
function generateRoute(){
  const dest=document.getElementById('dest-input')?.value||'your destination';
  toast('🤖 AI built a '+prefLabel[chosenPref]+' route to '+dest);
  const chip=document.getElementById('route-pref-chip'); if(chip) chip.textContent=prefLabel[chosenPref];
  setTimeout(()=>go('routemap'),650);
}

/* chatbot */
const botReplies=[
  [/batu caves/i,'To reach <b>Batu Caves</b>: take the <b style="color:#1E73E8">MRT</b> to KL Sentral, then the <b style="color:#14A06B">KTM Komuter</b> to Batu Caves (terminus). ~53 min, RM 6.30 — or <b>free with your pass</b>. Follow the Blue then Green route. Want me to start navigation?'],
  [/cheapest.*klcc|klcc.*cheap/i,'Cheapest to <b>KLCC</b>: a single <b style="color:#1E73E8">MRT</b> ride, ~9 min for RM 2.10 — but it\'s <b>already covered by your tourist pass</b>, so it costs you nothing. Follow the Red city-centre route.'],
  [/pass.*ktm|ktm.*pass/i,'Yes ✅ your tourist pass works on <b>KTM Komuter</b>, plus MRT, LRT, Monorail, Rapid Bus and Airport Transit. Just scan the QR at the gate.'],
  [/emergency|police|ambulance/i,'In an emergency dial <b>999</b> (police/ambulance/fire). Tourist Police: <b>03-2149 6590</b>. Tap the Emergency screen to share your live location instantly.'],
  [/klcc|twin tower/i,'<b>KLCC Twin Towers</b> is on the Red city-centre route — MRT, ~9 min, covered by your pass. Best photos at the park fountain after sunset!'],
  [/airport|klia/i,'For <b style="color:#7B3FE4">KLIA</b>, take the Purple airport route — KLIA Ekspres from KL Sentral, ~33 min. It\'s included in your pass\'s Airport Transit coverage.'],
];
function pushBubble(text,who){
  const s=document.getElementById('chat-stream');
  const b=document.createElement('div'); b.className='bubble '+who; b.innerHTML=text; s.appendChild(b);
  s.scrollTop=s.scrollHeight;
}
function botAnswer(q){
  const hit=botReplies.find(r=>r[0].test(q));
  const ans=hit?hit[1]:'Great question! I can help with routes, transfers, ticket usage, attractions and emergencies. Try asking "How do I get to Batu Caves?" or "Can I use my pass on KTM?"';
  setTimeout(()=>pushBubble(ans,'ai'),450);
}
function askBot(q){ pushBubble(q,'me'); botAnswer(q); }
function sendChat(){
  const inp=document.getElementById('chat-text'); const t=inp.value.trim(); if(!t)return;
  pushBubble(t,'me'); inp.value=''; botAnswer(t);
}

/* toast */
let toastT;
function toast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2200);
}

/* live clock */
function tick(){
  const d=new Date(); const h=d.getHours()%12||12; const m=String(d.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent=h+':'+m;
}
setInterval(tick,10000); tick();

/* boot */
renderDots();
go('splash');
