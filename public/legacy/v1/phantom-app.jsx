// phantom-app.jsx — Top-level app + toolbar + iOS device frame routing

function App() {
  const [screen, setScreen] = React.useState(() => localStorage.getItem('phantom.screen') || 'splash');
  const [tab, setTab] = React.useState(() => localStorage.getItem('phantom.tab') || 'home');
  const [topTab, setTopTab] = React.useState(() => localStorage.getItem('phantom.topTab') || 'home');
  const [dnaStage, setDnaStage] = React.useState(() => localStorage.getItem('phantom.dnaStage') || 'filled');
  const [iaVariant, setIaVariant] = React.useState(() => localStorage.getItem('phantom.iaVariant') || 'v1');

  React.useEffect(() => { localStorage.setItem('phantom.screen', screen); }, [screen]);
  React.useEffect(() => { localStorage.setItem('phantom.tab', tab); }, [tab]);
  React.useEffect(() => { localStorage.setItem('phantom.topTab', topTab); }, [topTab]);
  React.useEffect(() => { localStorage.setItem('phantom.dnaStage', dnaStage); }, [dnaStage]);
  React.useEffect(() => { localStorage.setItem('phantom.iaVariant', iaVariant); }, [iaVariant]);

  // When switching variants, remap the active tab to something valid in the new variant
  React.useEffect(() => {
    if (iaVariant === 'v1') {
      if (!['home', 'log', 'dna', 'profile'].includes(tab)) setTab('home');
    } else if (iaVariant === 'A') {
      if (!['home', 'ghosts', 'insights', 'profile', 'dna-full'].includes(tab)) setTab('home');
    } else if (iaVariant === 'B') {
      if (!['home', 'hesitation', 'dna', 'profile'].includes(tab)) setTab('home');
    }
  }, [iaVariant]);

  // Toolbar screen list is variant-aware
  const toolbarByVariant = {
    v1: [
      { k: 'splash',       l: '1 · Splash' },
      { k: 'login',        l: '2 · Login' },
      { k: 'home',         l: '3 · Home' },
      { k: 'hesitation',   l: '4 · Hesitation' },
      { k: 'ghosted',      l: '5 · Ghosted' },
      { k: 'log-1',        l: '6 · Log (what)' },
      { k: 'log-2',        l: '7 · Log (why)' },
      { k: 'log-done',     l: '8 · Logged ✓' },
      { k: 'dna-empty',    l: '9 · DNA (0 ghosts)' },
      { k: 'dna-forming',  l: '10 · DNA (forming)' },
      { k: 'dna-filled',   l: '11 · DNA (filled)' },
      { k: 'dna-archetype',l: '12 · DNA (archetype)' },
      { k: 'dna-trait',    l: '13 · DNA (trait)' },
      { k: 'profile',      l: '14 · Profile' },
    ],
    A: [
      { k: 'splash',     l: '1 · Splash' },
      { k: 'login',      l: '2 · Login' },
      { k: 'home',       l: '3 · Home (scrollable)' },
      { k: 'ghosts',     l: '4 · Ghosts' },
      { k: 'insights',   l: '5 · Insights' },
      { k: 'dna-full',   l: '6 · DNA (from Insights)' },
      { k: 'profile',    l: '7 · Profile' },
      { k: 'log-1',      l: '8 · Log (what)' },
      { k: 'log-2',      l: '9 · Log (why)' },
      { k: 'log-done',   l: '10 · Logged ✓' },
    ],
    B: [
      { k: 'splash',     l: '1 · Splash' },
      { k: 'login',      l: '2 · Login' },
      { k: 'home',       l: '3 · Home (dashboard)' },
      { k: 'hesitation', l: '4 · Hesitation Tax' },
      { k: 'dna-empty',    l: '5 · DNA (0 ghosts)' },
      { k: 'dna-forming',  l: '6 · DNA (forming)' },
      { k: 'dna-filled',   l: '7 · DNA (filled)' },
      { k: 'dna-archetype',l: '8 · DNA (archetype)' },
      { k: 'dna-trait',    l: '9 · DNA (trait)' },
      { k: 'profile',    l: '10 · Profile' },
      { k: 'log-1',      l: '11 · Log (what)' },
      { k: 'log-2',      l: '12 · Log (why)' },
      { k: 'log-done',   l: '13 · Logged ✓' },
    ],
  };

  const goMain = (nextTab, nextTop) => {
    setScreen('main');
    setTab(nextTab);
    if (nextTop) setTopTab(nextTop);
  };

  // When the bottom tab changes from inside the phone
  const handleBottomTab = (k) => {
    if (k === 'log') { setScreen('log-1'); return; }
    setTab(k);
    setScreen('main');
  };

  // When a toolbar button is clicked, map to the right screen + tab
  const handleToolbar = (k) => {
    switch (k) {
      case 'splash':     setScreen('splash'); break;
      case 'login':      setScreen('login'); break;
      case 'home':
        setScreen('main'); setTab('home'); setTopTab('home'); break;
      case 'hesitation':
        if (iaVariant === 'B') { setScreen('main'); setTab('hesitation'); }
        else { setScreen('main'); setTab('home'); setTopTab('hesitation'); }
        break;
      case 'ghosted':    setScreen('main'); setTab('home'); setTopTab('ghosted'); break;
      case 'ghosts':     setScreen('main'); setTab('ghosts'); break;
      case 'insights':   setScreen('main'); setTab('insights'); break;
      case 'dna-full':   setScreen('main'); setTab('dna-full'); setDnaStage('filled'); break;
      case 'log-1':      setScreen('log-1'); break;
      case 'log-2':      setScreen('log-2'); break;
      case 'log-done':   setScreen('log-done'); break;
      case 'dna-empty':     setScreen('main'); setTab(iaVariant === 'A' ? 'dna-full' : 'dna'); setDnaStage('empty'); break;
      case 'dna-forming':   setScreen('main'); setTab(iaVariant === 'A' ? 'dna-full' : 'dna'); setDnaStage('forming'); break;
      case 'dna-filled':    setScreen('main'); setTab(iaVariant === 'A' ? 'dna-full' : 'dna'); setDnaStage('filled'); break;
      case 'dna-archetype': setScreen('main'); setTab(iaVariant === 'A' ? 'dna-full' : 'dna'); setDnaStage('archetype'); break;
      case 'dna-trait':     setScreen('main'); setTab(iaVariant === 'A' ? 'dna-full' : 'dna'); setDnaStage('trait:Deliberation'); break;
      case 'profile':    setScreen('main'); setTab('profile'); break;
    }
  };

  const openLog = () => setScreen('log-1');

  // ── CONTENT DISPATCH ─────────────────────────────────────
  let inner;

  // Pre-main screens are shared across variants
  if (screen === 'splash') {
    inner = <SplashScreen onNext={() => setScreen('login')} />;
  } else if (screen === 'login') {
    inner = <LoginScreen onLogin={() => goMain('home', 'home')} onSignup={() => goMain('home', 'home')} />;
  } else if (screen === 'log-1') {
    inner = <LogStep1 onNext={() => setScreen('log-2')} onBack={() => goMain('home')} />;
  } else if (screen === 'log-2') {
    inner = <LogStep2 onNext={() => setScreen('log-done')} onBack={() => setScreen('log-1')} />;
  } else if (screen === 'log-done') {
    inner = <GhostLoggedScreen onDone={() => goMain('home', 'home')} />;

  } else if (screen === 'main' && iaVariant === 'v1') {
    // ── VARIANT V1: current (top tabs + bottom bar)
    let content;
    if (tab === 'home') {
      let topScreen;
      if (topTab === 'home') topScreen = <HomeOverview />;
      else if (topTab === 'hesitation') topScreen = <GhostPerformanceFlow />;
      else if (topTab === 'ghosted') topScreen = <GhostedAssetsScreen />;
      else topScreen = <PlaceholderScreen />;
      content = (
        <div style={{ paddingTop: 56, minHeight: '100%' }}>
          <TopActionBar tab={topTab} onTab={setTopTab} />
          {topScreen}
        </div>
      );
    } else if (tab === 'dna') {
      content = (
        <div style={{ paddingTop: 56 }}>
          <InvestorDNAFlow stage={dnaStage} setStage={setDnaStage} openLog={openLog} />
        </div>
      );
    } else if (tab === 'profile') {
      content = <div style={{ paddingTop: 56 }}><ProfileScreen onSignOut={() => setScreen('splash')} /></div>;
    } else {
      content = <div style={{ paddingTop: 56 }}><HomeOverview /></div>;
    }
    inner = (
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 92 }}>
          {content}
        </div>
        <BottomTabBar tab={tab} onTab={handleBottomTab} />
      </div>
    );

  } else if (screen === 'main' && iaVariant === 'A') {
    inner = <VariantA tab={tab} setTab={setTab} openLog={openLog} dnaStage={dnaStage} setDnaStage={setDnaStage} />;

  } else if (screen === 'main' && iaVariant === 'B') {
    inner = <VariantB tab={tab} setTab={setTab} openLog={openLog} dnaStage={dnaStage} setDnaStage={setDnaStage} />;

  } else {
    inner = <div style={{ paddingTop: 56 }}><HomeOverview /></div>;
  }

  const toolbar = toolbarByVariant[iaVariant];

  const isEmbed = typeof window !== 'undefined' && /[?&]embed(=|&|$)/.test(window.location.search);

  if (isEmbed || true) {
    // Compare-view: just the phone, no variant switcher or screen picker.
    return (
      <IOSDevice>
        {inner}
      </IOSDevice>
    );
  }

  return (
    <React.Fragment>
      <VariantSwitcher value={iaVariant} onChange={setIaVariant} />
      <Toolbar items={toolbar} active={currentToolbarKey(screen, tab, topTab, dnaStage, iaVariant)} onPick={handleToolbar} />
      <div style={{ marginTop: 12 }}>
        <IOSDevice>
          {inner}
        </IOSDevice>
      </div>
    </React.Fragment>
  );
}

function currentToolbarKey(screen, tab, topTab, dnaStage, iaVariant) {
  if (screen === 'splash') return 'splash';
  if (screen === 'login') return 'login';
  if (screen === 'log-1') return 'log-1';
  if (screen === 'log-2') return 'log-2';
  if (screen === 'log-done') return 'log-done';

  const dnaKey = () => {
    if (dnaStage === 'empty')     return 'dna-empty';
    if (dnaStage === 'forming')   return 'dna-forming';
    if (dnaStage === 'archetype') return 'dna-archetype';
    if (dnaStage && dnaStage.startsWith('trait:')) return 'dna-trait';
    return 'dna-filled';
  };

  if (iaVariant === 'v1') {
    if (tab === 'dna') return dnaKey();
    if (tab === 'profile') return 'profile';
    if (tab === 'home') {
      if (topTab === 'hesitation') return 'hesitation';
      if (topTab === 'ghosted') return 'ghosted';
      return 'home';
    }
    return 'home';
  }
  if (iaVariant === 'A') {
    if (tab === 'dna-full') return dnaKey() === 'dna-filled' ? 'dna-full' : dnaKey();
    if (tab === 'ghosts') return 'ghosts';
    if (tab === 'insights') return 'insights';
    if (tab === 'profile') return 'profile';
    return 'home';
  }
  if (iaVariant === 'B') {
    if (tab === 'dna') return dnaKey();
    if (tab === 'hesitation') return 'hesitation';
    if (tab === 'profile') return 'profile';
    return 'home';
  }
  return 'home';
}

function VariantSwitcher({ value, onChange }) {
  const opts = [
    { k: 'v1', label: 'v1 — Current', sub: 'Top tabs + bottom bar' },
    { k: 'A',  label: 'A — Scrollable Home', sub: 'Home · Ghosts · Insights · Profile' },
    { k: 'B',  label: 'B — Headline + FAB', sub: 'Home · Tax · DNA · Profile · ⊕' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '0 4px 10px', flexWrap: 'wrap',
      borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 10,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: 0.5,
        textTransform: 'uppercase', alignSelf: 'center', marginRight: 4,
      }}>IA Variant</div>
      {opts.map(o => {
        const sel = value === o.k;
        return (
          <button key={o.k} onClick={() => onChange(o.k)} style={{
            padding: '8px 12px', borderRadius: 10,
            border: `1px solid ${sel ? '#3803B1' : 'rgba(0,0,0,0.12)'}`,
            background: sel ? '#3803B1' : 'white',
            color: sel ? 'white' : '#222',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            textAlign: 'left',
            lineHeight: 1.2,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{o.label}</div>
            <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{o.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

function Toolbar({ items, active, onPick }) {
  return (
    <div className="toolbar">
      {items.map(it => (
        <button key={it.k} onClick={() => onPick(it.k)}
          className={active === it.k ? 'active' : ''}>
          {it.l}
        </button>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('device-root')).render(<App />);
