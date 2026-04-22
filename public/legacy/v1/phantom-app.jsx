// phantom-app.jsx — top-level shell + screen picker
// Mirrors ios/PhantomApp.swift's AuthManager switch and ios/Core/Navigation/MainTabView.swift
//
// Screens are grouped by feature in the picker so presenters can walk the demo
// without going through real auth. No backend calls. Display-only.

const SCREEN_GROUPS = [
  { label: 'Auth',       items: [
    { k: 'auth-login',    l: 'Login' },
    { k: 'auth-signup',   l: 'Sign up' },
    { k: 'auth-confirm',  l: 'Confirm code' },
  ]},
  { label: 'Onboarding', items: [
    { k: 'onb-0', l: '1 · Opening' },
    { k: 'onb-1', l: '2 · Concept' },
    { k: 'onb-2', l: '3 · Hesitation tax' },
    { k: 'onb-3', l: '4 · DNA' },
    { k: 'onb-4', l: '5 · Streak' },
  ]},
  { label: 'Main tabs',  items: [
    { k: 'home',       l: 'Home' },
    { k: 'dashboard',  l: 'Dashboard' },
    { k: 'recent',     l: 'Recent ghosts' },
    { k: 'list',       l: 'Ghost list' },
    { k: 'dna-filled', l: 'Investor DNA' },
    { k: 'profile',    l: 'Profile' },
  ]},
  { label: 'Log flow',   items: [
    { k: 'log-start',   l: 'Start log' },
    { k: 'log-step1',   l: 'Step 1 — what' },
    { k: 'log-step2',   l: 'Step 2 — why' },
    { k: 'log-emotion', l: 'Emotion' },
    { k: 'log-notes',   l: 'Notes' },
    { k: 'log-done',    l: 'Ghost logged' },
  ]},
  { label: 'DNA states', items: [
    { k: 'dna-empty',     l: 'Empty' },
    { k: 'dna-forming',   l: 'Forming' },
    { k: 'dna-filled',    l: 'Filled' },
    { k: 'dna-archetype', l: 'Archetype' },
    { k: 'dna-trait',     l: 'Trait detail' },
  ]},
  { label: 'Analytics',  items: [
    { k: 'hesitation-tax', l: 'Hesitation Tax' },
    { k: 'streak',         l: 'Streak' },
  ]},
];

function App() {
  const [screen, setScreen] = React.useState('home');
  // Log-flow state carried across steps
  const [logState, setLogState] = React.useState({
    ticker: '', direction: '', priceMode: 'current', price: '',
    qtyUnit: 'shares', qty: '', tags: [], emotion: null, notes: '',
  });
  const resetLog = () => setLogState({
    ticker: '', direction: '', priceMode: 'current', price: '',
    qtyUnit: 'shares', qty: '', tags: [], emotion: null, notes: '',
  });

  // Render the active screen
  let content;
  switch (screen) {
    case 'auth-login':   content = <AuthLogin   onSignUp={() => setScreen('auth-signup')} onComplete={() => setScreen('home')}/>; break;
    case 'auth-signup':  content = <AuthSignUp  onBack={() => setScreen('auth-login')} onConfirm={() => setScreen('auth-confirm')}/>; break;
    case 'auth-confirm': content = <AuthConfirm onBack={() => setScreen('auth-signup')} onComplete={() => setScreen('onb-0')}/>; break;

    case 'onb-0': case 'onb-1': case 'onb-2': case 'onb-3': case 'onb-4': {
      const step = parseInt(screen.split('-')[1], 10);
      content = (
        <OnboardingScreen
          step={step}
          onBack={() => setScreen(`onb-${Math.max(0, step - 1)}`)}
          onNext={() => setScreen(`onb-${Math.min(ONB_STEPS.length - 1, step + 1)}`)}
          onComplete={() => setScreen('home')}
          isLast={step === ONB_STEPS.length - 1}
        />
      );
      break;
    }

    case 'home':      content = <HomeView onOpenHesitationTax={() => setScreen('hesitation-tax')} onOpenLogging={() => setScreen('log-start')}/>; break;
    case 'dashboard': content = <DashboardView onOpenLogging={() => setScreen('log-start')}/>; break;
    case 'recent':    content = <RecentGhostsView/>; break;
    case 'list':      content = <GhostListView/>; break;
    case 'profile':   content = <ProfileView onSignOut={() => setScreen('auth-login')}/>; break;

    case 'log-start':   content = <StartLogView   onStart={() => { resetLog(); setScreen('log-step1'); }} onBack={() => setScreen('home')}/>; break;
    case 'log-step1':   content = <LogStep1       onBack={() => setScreen('log-start')} onNext={() => setScreen('log-step2')} state={logState} setState={setLogState}/>; break;
    case 'log-step2':   content = <LogStep2       onBack={() => setScreen('log-step1')} onNext={() => setScreen('log-emotion')} state={logState} setState={setLogState}/>; break;
    case 'log-emotion': content = <LogEmotion     onBack={() => setScreen('log-step2')} onNext={() => setScreen('log-notes')} state={logState} setState={setLogState}/>; break;
    case 'log-notes':   content = <LogNotes       onBack={() => setScreen('log-emotion')} onNext={() => setScreen('log-done')} state={logState} setState={setLogState}/>; break;
    case 'log-done':    content = <GhostLoggedView state={logState} onDone={() => setScreen('home')}/>; break;

    case 'dna-empty':     content = <DNAEmpty     onOpenLogging={() => setScreen('log-start')} onBack={() => setScreen('home')}/>; break;
    case 'dna-forming':   content = <DNAForming   count={3} total={7} onBack={() => setScreen('home')}/>; break;
    case 'dna-filled':    content = <DNAFilled    onOpenArchetype={() => setScreen('dna-archetype')} onOpenTrait={() => setScreen('dna-trait')} onBack={() => setScreen('home')}/>; break;
    case 'dna-archetype': content = <DNAArchetype onBack={() => setScreen('dna-filled')} onOpenTrait={() => setScreen('dna-trait')}/>; break;
    case 'dna-trait':     content = <DNATrait     onBack={() => setScreen('dna-archetype')}/>; break;

    case 'hesitation-tax': content = <HesitationTaxView onBack={() => setScreen('home')}/>; break;
    case 'streak':         content = <StreakView        onBack={() => setScreen('home')}/>; break;

    default: content = <HomeView/>;
  }

  // Only show tab bar on the 5 "signed-in" main-tab screens
  const mainTabScreens = ['home', 'dashboard', 'list', 'dna-filled', 'profile'];
  const showTabBar = mainTabScreens.includes(screen);

  return (
    <React.Fragment>
      <ScreenPicker current={screen} setScreen={setScreen}/>
      <div id="phantom-device" style={{ marginTop: 8 }}>
        <IOSDevice width={402} height={874}>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
              {content}
            </div>
            {showTabBar && <TabBar active={screen} setScreen={setScreen}/>}
          </div>
        </IOSDevice>
      </div>
    </React.Fragment>
  );
}

function TabBar({ active, setScreen }) {
  const tabs = [
    { k: 'home',       l: 'Home',    icon: 'home' },
    { k: 'list',       l: 'Ghosts',  icon: 'book' },
    { k: 'dashboard',  l: '',        icon: 'plus', fab: true },
    { k: 'dna-filled', l: 'DNA',     icon: 'atom' },
    { k: 'profile',    l: 'Profile', icon: 'person' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 34,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `1px solid ${PHANTOM.separator}`,
      zIndex: 20,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 0 4px',
      }}>
        {tabs.map(t => {
          const isActive = (t.k === active) || (t.fab && active === 'dashboard');
          if (t.fab) {
            return (
              <button key={t.k} onClick={() => setScreen(t.k)} style={{
                width: 52, height: 52, borderRadius: '50%', border: 'none',
                background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
                color: PHANTOM.white, cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(56,3,177,0.35)',
                fontFamily: TYPE.family, fontSize: 28, fontWeight: 300,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'translateY(-10px)',
              }}>+</button>
            );
          }
          return (
            <button key={t.k} onClick={() => setScreen(t.k)} style={{
              flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '6px 0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? PHANTOM.purple : PHANTOM.lightGray,
              fontFamily: TYPE.family, fontSize: 10, fontWeight: 600,
            }}>
              <TabIcon kind={t.icon} color={isActive ? PHANTOM.purple : PHANTOM.lightGray}/>
              <span>{t.l}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabIcon({ kind, color }) {
  const paths = {
    home:   <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round"/>,
    book:   <React.Fragment><path d="M4 4a2 2 0 012-2h13v18H6a2 2 0 00-2 2" stroke={color} strokeWidth="1.6" fill="none"/><path d="M4 4v18" stroke={color} strokeWidth="1.6"/></React.Fragment>,
    atom:   <React.Fragment><circle cx="12" cy="12" r="2.2" fill={color}/><ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)"/></React.Fragment>,
    person: <React.Fragment><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" fill="none"/><circle cx="12" cy="10" r="3" stroke={color} strokeWidth="1.6" fill="none"/><path d="M6 19c1.5-3 4-4 6-4s4.5 1 6 4" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round"/></React.Fragment>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24">{paths[kind]}</svg>;
}

function ScreenPicker({ current, setScreen }) {
  return (
    <div id="picker-bar" style={{
      display: 'flex', flexWrap: 'wrap', gap: 6,
      padding: 8,
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: 16,
      maxWidth: 720,
      justifyContent: 'center',
      boxShadow: '0 8px 30px rgba(60,3,177,0.08)',
      fontFamily: TYPE.family,
    }}>
      {SCREEN_GROUPS.map((g, gi) => (
        <React.Fragment key={g.label}>
          {gi > 0 && <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.08)', alignSelf: 'center', margin: '0 2px' }}/>}
          <span style={{
            fontSize: 10, fontWeight: 600, color: '#8a8a96',
            textTransform: 'uppercase', letterSpacing: 0.6,
            alignSelf: 'center', padding: '0 6px 0 10px',
          }}>{g.label}</span>
          {g.items.map(it => {
            const active = current === it.k;
            return (
              <button
                key={it.k}
                onClick={() => setScreen(it.k)}
                style={{
                  font: 'inherit', fontSize: 11.5, fontWeight: 500,
                  padding: '7px 10px', borderRadius: 9,
                  border: '1px solid transparent',
                  background: active ? PHANTOM.purple : 'transparent',
                  color: active ? '#fff' : '#3c3c4b',
                  cursor: 'pointer',
                  boxShadow: active ? '0 2px 8px rgba(56,3,177,0.3)' : 'none',
                  transition: 'all 0.15s',
                }}
              >{it.l}</button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mount
// ─────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('device-root')).render(React.createElement(App));
