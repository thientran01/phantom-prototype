// phantom-ia.jsx — Alternate information-architecture variants.
// v1 = current (top tabs + bottom bar)
// A  = scrollable home, no top tabs, 4-tab bottom (Home / Ghosts / Insights / Profile) with + in Home header
// B  = no top tabs, 4 bottom tabs + center floating action button (Home / Hesitation / DNA / Profile)

/* ──────────────────────────────────────────────────────────────
   Shared helpers
   ────────────────────────────────────────────────────────────── */
function SectionTitle({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: PH.text, flex: 1 }}>{children}</div>
      {right}
    </div>
  );
}

function SeeAll({ onTap }) {
  return (
    <button onClick={onTap} style={{
      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
      fontFamily: phFont, fontSize: 13, color: PH.purple, fontWeight: 500,
    }}>See all ›</button>
  );
}

/* ──────────────────────────────────────────────────────────────
   VARIANT A: Scrollable Home
   Tabs: Home · Ghosts · Insights · Profile   (log = + button in Home header)
   ────────────────────────────────────────────────────────────── */

function AHome({ onLog, goInsights, goGhosts }) {
  return (
    <div style={{ padding: '12px 20px 140px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header row — title + quick log */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3, fontWeight: 500 }}>Welcome back</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.3 }}>Xinyue</div>
        </div>
        <button onClick={onLog} aria-label="Log a ghost" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: PH.purple, color: 'white',
          border: 'none', borderRadius: 22, padding: '10px 16px',
          fontFamily: phFont, fontSize: 14, fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(56,3,177,0.18)',
        }}>
          <Icon name="plus" size={16} color="white"/> Log ghost
        </button>
      </div>

      {/* Streak + insight split */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3 }}>Streak</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>7</div>
            <div style={{ fontSize: 13, color: PH.text3 }}>days 🔥</div>
          </div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3 }}>This week</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>3</div>
            <div style={{ fontSize: 13, color: PH.text3 }}>ghosts</div>
          </div>
        </Card>
      </div>

      {/* Featured insight card */}
      <Card padding={0}>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="bulb" size={14} color={PH.purple}/>
            <div style={{ fontSize: 11, fontWeight: 600, color: PH.purple, letterSpacing: 0.4 }}>INSIGHT</div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>
            You hesitate most on Mondays
          </div>
          <div style={{ fontSize: 13, color: PH.text3, lineHeight: 1.5 }}>
            67% of your ghost trades happen at the start of the week. Consider automated entry rules for Monday setups.
          </div>
        </div>
      </Card>

      {/* Hesitation Tax summary → taps into Insights */}
      <SectionTitle right={<SeeAll onTap={goInsights}/>}>Hesitation Tax</SectionTitle>
      <Card onClick={goInsights} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: PH.text3 }}>Opportunity missed</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: PH.purple, marginTop: 2 }}>$3,412</div>
            <div style={{ fontSize: 12, color: PH.text3, marginTop: 2 }}>12.4% of potential return · 14 trades</div>
          </div>
          <div style={{ width: 80 }}>
            <svg width="100%" height="44" viewBox="0 0 80 44" preserveAspectRatio="none">
              <path d="M0,36 L15,30 L30,32 L45,22 L60,18 L80,8" stroke={PH.purple} strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </Card>

      {/* Recent ghosts */}
      <SectionTitle right={<SeeAll onTap={goGhosts}/>}>Recent ghosts</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { t: 'NVDA', d: 'Long · 2h ago',    r: 'Fear of loss' },
          { t: 'TSLA', d: 'Short · Yesterday', r: 'Conflicting signals' },
          { t: 'AAPL', d: 'Long · 2 days ago', r: 'Timing seems off' },
        ].map(g => (
          <Card key={g.t + g.d} padding={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
              <div style={{
                width: 38, height: 38, borderRadius: 19,
                background: 'rgba(56,3,177,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: PH.purple,
              }}>{g.t.slice(0,2)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{g.t}</div>
                <div style={{ fontSize: 12, color: PH.text3, marginTop: 2 }}>{g.d} · {g.r}</div>
              </div>
              <Icon name="chevron" size={12} color={PH.text4}/>
            </div>
          </Card>
        ))}
      </div>

      {/* Frequently ghosted */}
      <SectionTitle right={<SeeAll onTap={goGhosts}/>}>Frequently ghosted</SectionTitle>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, margin: '0 -20px', padding: '0 20px 4px' }}>
        {[
          { t: 'NVDA', c: 7 },
          { t: 'TSLA', c: 5 },
          { t: 'AAPL', c: 4 },
          { t: 'MSFT', c: 3 },
          { t: 'AMZN', c: 2 },
        ].map(a => (
          <div key={a.t} style={{
            flexShrink: 0, width: 100,
            background: PH.white, border: `1px solid ${PH.border}`,
            borderRadius: 14, padding: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
            boxShadow: PH.cardShadow,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: 'rgba(56,3,177,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: PH.purple,
            }}>{a.t.slice(0,2)}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{a.t}</div>
            <div style={{ fontSize: 11, color: PH.text3 }}>Ghosted {a.c}×</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Ghosts tab (variant A): combined history + frequency filter */
function AGhosts() {
  const [filter, setFilter] = React.useState('all');
  const filters = [
    { k: 'all',        l: 'All ghosts' },
    { k: 'frequent',   l: 'By asset' },
    { k: 'reason',     l: 'By reason' },
  ];
  const ghosts = [
    { t: 'NVDA', d: 'Long · Today · 2h ago',    r: 'Fear of loss' },
    { t: 'TSLA', d: 'Short · Yesterday 4:12pm', r: 'Conflicting signals' },
    { t: 'AAPL', d: 'Long · Mon 9:41am',        r: 'Timing seems off' },
    { t: 'NVDA', d: 'Long · Mon 9:02am',        r: 'Fear of loss' },
    { t: 'MSFT', d: 'Long · Sun 7:00pm',        r: 'Price too high' },
    { t: 'TSLA', d: 'Short · Sun 2:14pm',       r: 'Market volatility' },
    { t: 'SPY',  d: 'Long · Fri 11:30am',       r: 'Distracted' },
  ];
  const assets = [
    { t: 'NVDA', c: 7 }, { t: 'TSLA', c: 5 }, { t: 'AAPL', c: 4 },
    { t: 'MSFT', c: 3 }, { t: 'AMZN', c: 2 }, { t: 'SPY',  c: 2 },
  ];
  const reasons = [
    { r: 'Fear of loss',         c: 9 },
    { r: 'Conflicting signals',  c: 6 },
    { r: 'Timing seems off',     c: 4 },
    { r: 'Price too high',       c: 3 },
    { r: 'Market volatility',    c: 2 },
  ];
  return (
    <div style={{ padding: '12px 20px 140px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>Ghosts</div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8 }}>
        {filters.map(f => {
          const sel = filter === f.k;
          return (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding: '8px 14px', borderRadius: 16,
              border: `1px solid ${sel ? PH.purple : PH.border}`,
              background: sel ? PH.purple : 'white',
              color: sel ? 'white' : PH.text2,
              fontFamily: phFont, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>{f.l}</button>
          );
        })}
      </div>

      {filter === 'all' && ghosts.map((g, i) => (
        <Card key={i} padding={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: 'rgba(56,3,177,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: PH.purple,
            }}>{g.t.slice(0,2)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{g.t}</div>
              <div style={{ fontSize: 12, color: PH.text3, marginTop: 2 }}>{g.d}</div>
              <div style={{ fontSize: 11, color: PH.purple, marginTop: 2 }}>{g.r}</div>
            </div>
            <Icon name="chevron" size={12} color={PH.text4}/>
          </div>
        </Card>
      ))}

      {filter === 'frequent' && assets.map(a => (
        <Card key={a.t} padding={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22, background: 'rgba(56,3,177,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: PH.purple,
            }}>{a.t.slice(0,2)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{a.t}</div>
              <div style={{ fontSize: 13, color: PH.text3, marginTop: 2 }}>Ghosted {a.c}×</div>
            </div>
            <Icon name="chevron" size={14} color={PH.text4}/>
          </div>
        </Card>
      ))}

      {filter === 'reason' && reasons.map(r => (
        <Card key={r.r} padding={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
            <div style={{
              width: 8, height: 40, borderRadius: 4, background: PH.purple, opacity: 0.6 + r.c * 0.03,
            }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{r.r}</div>
              <div style={{ fontSize: 13, color: PH.text3, marginTop: 2 }}>{r.c} times</div>
            </div>
            <Icon name="chevron" size={14} color={PH.text4}/>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* Insights tab (variant A): Hesitation Tax + DNA bundled, plus drill-ins */
function AInsights({ onOpenDNA }) {
  return (
    <div style={{ padding: '12px 20px 140px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>Insights</div>
      <div style={{ fontSize: 14, color: PH.text3, marginTop: -6 }}>Patterns across your 14 ghost trades</div>

      {/* Hesitation Tax headline */}
      <Card>
        <div style={{ fontSize: 12, fontWeight: 600, color: PH.text3, letterSpacing: 0.4 }}>HESITATION TAX</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: PH.purple, marginTop: 6 }}>$3,412</div>
        <div style={{ fontSize: 13, color: PH.text3 }}>12.4% of potential return · if you'd invested: $14,401</div>
        <div style={{ marginTop: 14 }}>
          <MiniChart />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: PH.text3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 2, background: PH.purple }}/>Actual
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 2, background: PH.text3, borderTop: '1px dashed', borderImage: 'none' }}/>
            If you'd invested
          </div>
        </div>
      </Card>

      {/* DNA entry point */}
      <Card onClick={onOpenDNA} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 24,
            background: 'rgba(91,55,212,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="dna" size={22} color="rgb(91,55,212)"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgb(155,130,234)', letterSpacing: 0.4 }}>YOUR ARCHETYPE</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>The Cautious Analyst</div>
            <div style={{ fontSize: 12, color: PH.text3, marginTop: 2 }}>Investor DNA · 23 ghosts</div>
          </div>
          <Icon name="chevron" size={14} color={PH.text3}/>
        </div>
      </Card>

      {/* Common triggers */}
      <InfoCard icon="brain" title="Your Common Hesitation Triggers">
        Fear of buying at the wrong time<br/>
        Waiting for a "better" entry point<br/>
        Analysis paralysis<br/>
        Emotional decision-making
      </InfoCard>

      {/* Overcoming */}
      <InfoCard icon="bulb" title="Overcoming Hesitation">
        Set clear entry and exit rules before analyzing trades<br/>
        Use dollar-cost averaging to reduce timing pressure<br/>
        Trust your research — no entry is perfect<br/>
        The second best time to invest is today
      </InfoCard>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VARIANT A: bottom bar (no center FAB)
   ────────────────────────────────────────────────────────────── */
function ABottomBar({ tab, onTab }) {
  const items = [
    { k: 'home',     icon: 'home',   fill: 'homeFill', l: 'Home' },
    { k: 'ghosts',   icon: 'ghost',  fill: 'ghost',    l: 'Ghosts' },
    { k: 'insights', icon: 'chart',  fill: 'chart',    l: 'Insights' },
    { k: 'profile',  icon: 'person', fill: 'personFill', l: 'Profile' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', padding: '10px 12px 34px',
      boxShadow: '0 -1px 4px rgba(0,0,0,0.03)',
    }}>
      {items.map(it => {
        const sel = tab === it.k;
        return (
          <button key={it.k} onClick={() => onTab(it.k)} style={{
            flex: 1, padding: '4px 0', background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 2,
          }}>
            <Icon name={sel ? it.fill : it.icon} size={24} color={sel ? PH.purple : 'rgba(0,0,0,0.4)'}/>
            <div style={{
              fontFamily: phFont, fontSize: 10, fontWeight: 500,
              color: sel ? PH.purple : 'rgba(0,0,0,0.5)',
            }}>{it.l}</div>
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VARIANT B: same home but with center FAB for logging,
   separate Hesitation and DNA tabs
   ────────────────────────────────────────────────────────────── */

function BHome({ goHesitation, goDNA, goProfile }) {
  return (
    <div style={{ padding: '12px 20px 140px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header — greet + gear */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3, fontWeight: 500 }}>Welcome back</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.3 }}>Xinyue</div>
        </div>
        <button onClick={goProfile} aria-label="Profile" style={{
          width: 40, height: 40, borderRadius: 20,
          background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="person" size={18} color={PH.text}/>
        </button>
      </div>

      {/* Streak + week */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3 }}>Streak</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>7</div>
            <div style={{ fontSize: 13, color: PH.text3 }}>days 🔥</div>
          </div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: PH.text3 }}>This week</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>3</div>
            <div style={{ fontSize: 13, color: PH.text3 }}>ghosts</div>
          </div>
        </Card>
      </div>

      {/* Two headline feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card onClick={goHesitation} style={{ cursor: 'pointer' }}>
          <Icon name="dollar" size={18} color={PH.purple}/>
          <div style={{ fontSize: 22, fontWeight: 700, color: PH.purple, marginTop: 10 }}>$3,412</div>
          <div style={{ fontSize: 11, color: PH.text3, marginTop: 2 }}>Hesitation tax</div>
          <div style={{ fontSize: 10, color: PH.text4, marginTop: 4 }}>12.4% · tap to explore</div>
        </Card>
        <Card onClick={goDNA} style={{ cursor: 'pointer' }}>
          <Icon name="dna" size={18} color="rgb(91,55,212)"/>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 10, lineHeight: 1.2 }}>Cautious Analyst</div>
          <div style={{ fontSize: 11, color: PH.text3, marginTop: 2 }}>Your archetype</div>
          <div style={{ fontSize: 10, color: PH.text4, marginTop: 4 }}>23 ghosts · see traits</div>
        </Card>
      </div>

      {/* Insight */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="bulb" size={14} color={PH.purple}/>
          <div style={{ fontSize: 11, fontWeight: 600, color: PH.purple, letterSpacing: 0.4 }}>INSIGHT THIS WEEK</div>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8, lineHeight: 1.25 }}>
          You hesitate most on Mondays
        </div>
        <div style={{ fontSize: 13, color: PH.text3, marginTop: 6, lineHeight: 1.5 }}>
          67% of your ghost trades happen at the start of the week.
        </div>
      </Card>

      {/* Recent ghosts */}
      <SectionTitle>Recent ghosts</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { t: 'NVDA', d: 'Long · 2h ago',    r: 'Fear of loss' },
          { t: 'TSLA', d: 'Short · Yesterday', r: 'Conflicting signals' },
          { t: 'AAPL', d: 'Long · 2 days ago', r: 'Timing seems off' },
        ].map(g => (
          <Card key={g.t + g.d} padding={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
              <div style={{
                width: 38, height: 38, borderRadius: 19,
                background: 'rgba(56,3,177,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: PH.purple,
              }}>{g.t.slice(0,2)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{g.t}</div>
                <div style={{ fontSize: 12, color: PH.text3, marginTop: 2 }}>{g.d} · {g.r}</div>
              </div>
              <Icon name="chevron" size={12} color={PH.text4}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VARIANT B: bottom bar with center FAB
   ────────────────────────────────────────────────────────────── */
function BBottomBar({ tab, onTab, onLog }) {
  const left = [
    { k: 'home',        icon: 'home',   fill: 'homeFill',  l: 'Home' },
    { k: 'hesitation',  icon: 'chart',  fill: 'chart',     l: 'Tax' },
  ];
  const right = [
    { k: 'dna',     icon: 'dna',     fill: 'dna',       l: 'DNA' },
    { k: 'profile', icon: 'person',  fill: 'personFill', l: 'Profile' },
  ];

  const renderTab = (it) => {
    const sel = tab === it.k;
    return (
      <button key={it.k} onClick={() => onTab(it.k)} style={{
        flex: 1, padding: '4px 0', background: 'none', border: 'none',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 2,
      }}>
        <Icon name={sel ? it.fill : it.icon} size={24} color={sel ? PH.purple : 'rgba(0,0,0,0.4)'}/>
        <div style={{
          fontFamily: phFont, fontSize: 10, fontWeight: 500,
          color: sel ? PH.purple : 'rgba(0,0,0,0.5)',
        }}>{it.l}</div>
      </button>
    );
  };

  return (
    <React.Fragment>
      {/* Bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', padding: '10px 12px 34px',
        boxShadow: '0 -1px 4px rgba(0,0,0,0.03)',
      }}>
        {left.map(renderTab)}
        <div style={{ flex: 1 }}/> {/* FAB slot */}
        {right.map(renderTab)}
      </div>

      {/* Floating action button */}
      <button onClick={onLog} aria-label="Log a ghost" style={{
        position: 'absolute', bottom: 38, left: '50%',
        transform: 'translateX(-50%)',
        width: 60, height: 60, borderRadius: 30,
        background: PH.purple, color: 'white',
        border: '4px solid white',
        boxShadow: '0 4px 14px rgba(56,3,177,0.3)',
        cursor: 'pointer', zIndex: 21,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="plus" size={26} color="white"/>
      </button>
    </React.Fragment>
  );
}

/* ──────────────────────────────────────────────────────────────
   Variant renderers
   ────────────────────────────────────────────────────────────── */

function VariantA({ tab, setTab, openLog, dnaStage, setDnaStage }) {
  let inner;
  if (tab === 'home') {
    inner = <AHome
      onLog={openLog}
      goInsights={() => setTab('insights')}
      goGhosts={() => setTab('ghosts')}
    />;
  } else if (tab === 'ghosts') {
    inner = <AGhosts />;
  } else if (tab === 'insights') {
    inner = <AInsights onOpenDNA={() => setTab('dna-full')} />;
  } else if (tab === 'dna-full') {
    inner = <InvestorDNAFlow stage={dnaStage} setStage={setDnaStage} openLog={openLog} />;
  } else if (tab === 'profile') {
    inner = <ProfileScreen onSignOut={() => {}} />;
  }

  // DNA full occupies the insights tab position
  const barTab = tab === 'dna-full' ? 'insights' : tab;

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingTop: 56, paddingBottom: 92 }}>
        {inner}
      </div>
      <ABottomBar tab={barTab} onTab={setTab} />
    </div>
  );
}

function VariantB({ tab, setTab, openLog, dnaStage, setDnaStage }) {
  let inner;
  if (tab === 'home') {
    inner = <BHome
      goHesitation={() => setTab('hesitation')}
      goDNA={() => setTab('dna')}
      goProfile={() => setTab('profile')}
    />;
  } else if (tab === 'hesitation') {
    inner = <GhostPerformanceFlow />;
  } else if (tab === 'dna') {
    inner = <InvestorDNAFlow stage={dnaStage} setStage={setDnaStage} openLog={openLog} />;
  } else if (tab === 'profile') {
    inner = <ProfileScreen onSignOut={() => {}} />;
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingTop: 56, paddingBottom: 108 }}>
        {inner}
      </div>
      <BBottomBar tab={tab} onTab={setTab} onLog={openLog} />
    </div>
  );
}

Object.assign(window, { VariantA, VariantB });
