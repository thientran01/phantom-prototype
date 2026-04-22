// feature-home.jsx — HomeView (with inline top tabs: Home / Hesitation / Ghosted)
// Mirrors ios/Features/Home/Views/HomeView.swift

function HomeView({ onOpenGhost, onOpenLogging, onOpenHesitationTax }) {
  const [tab, setTab] = React.useState('home');
  const F = window.PhantomFixtures;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ ...TYPE.largeTitle, fontSize: 32, color: PHANTOM.textPrimary }}>
          Hi, {F.user.displayName.split(' ')[0]}
        </div>
        <button style={{
          background: PHANTOM.white, border: 'none', width: 42, height: 42,
          borderRadius: '50%', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(56,3,177,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PhantomLogo size={22}/>
        </button>
      </div>

      <HomeTopTabs tab={tab} setTab={setTab}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
        {tab === 'home' && <HomeOverview onOpenHesitationTax={onOpenHesitationTax}/>}
        {tab === 'hesitation' && <HomeHesitationGlimpse onOpenHesitationTax={onOpenHesitationTax}/>}
        {tab === 'ghosted' && <HomeGhostedAssets/>}
        {tab === 'placeholder' && (
          <Card>
            <div style={{ ...TYPE.bodyMed, color: PHANTOM.textSecondary, textAlign: 'center', padding: 24 }}>
              Coming soon.
            </div>
          </Card>
        )}
      </div>
    </Screen>
  );
}

function HomeTopTabs({ tab, setTab }) {
  const items = [
    { k: 'home',        l: 'Home' },
    { k: 'hesitation',  l: 'Hesitation' },
    { k: 'ghosted',     l: 'Ghosted' },
    { k: 'placeholder', l: '···' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 6,
      background: PHANTOM.white, borderRadius: 14,
      padding: 4,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {items.map(it => (
        <button key={it.k} onClick={() => setTab(it.k)} style={{
          flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none',
          background: tab === it.k ? PHANTOM.purple : 'transparent',
          color: tab === it.k ? PHANTOM.white : PHANTOM.textSecondary,
          fontFamily: TYPE.family, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          transition: 'background 140ms ease, color 140ms ease',
        }}>{it.l}</button>
      ))}
    </div>
  );
}

function HomeOverview({ onOpenHesitationTax }) {
  const F = window.PhantomFixtures;
  return (
    <React.Fragment>
      <HomeStreakCard/>
      <InsightOfTheWeekCard/>

      <SectionHeader style={{ paddingTop: 8 }}>Overview</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <HomeStatCard label="Ghosted trades" value={F.overview.ghostedTrades} accent={PHANTOM.purple}/>
        <HomeStatCard label="Hesitation tax" value={`$${F.overview.totalHesitationTax.toLocaleString()}`} accent={PHANTOM.green} onClick={onOpenHesitationTax}/>
        <HomeStatCard label="Avg / trade"    value={`$${F.overview.avgPerTrade}`} accent={PHANTOM.purpleGrad}/>
        <HomeStatCard label="Hesitation %"   value={`${F.overview.hesitationPct}%`} accent={PHANTOM.lavender}/>
      </div>
    </React.Fragment>
  );
}

function HomeStreakCard() {
  const F = window.PhantomFixtures;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad} 70%, ${PHANTOM.lavender})`,
      borderRadius: 20, padding: 18,
      color: PHANTOM.white,
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 8px 22px rgba(56,3,177,0.28)',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="26" height="26" viewBox="0 0 48 48" fill="#fff">
          <path d="M24 4c0 8-10 10-10 20 0 6 4 10 10 10s10-4 10-10c0-6-4-8-4-14 0 4-2 6-4 6s-2-4-2-12z"/>
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...TYPE.smallM, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current streak</div>
        <div style={{ ...TYPE.headlineBold, marginTop: 2 }}>{F.streak.current} days</div>
      </div>
      <button style={{
        background: PHANTOM.white, color: PHANTOM.purple,
        border: 'none', borderRadius: 999, padding: '8px 14px',
        fontFamily: TYPE.family, fontWeight: 600, fontSize: 13,
        cursor: 'pointer',
      }}>Check in</button>
    </div>
  );
}

function InsightOfTheWeekCard() {
  const F = window.PhantomFixtures;
  return (
    <Card style={{ display: 'flex', gap: 12, padding: 14 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: PHANTOM.tagBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18h6m-5 3h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" stroke={PHANTOM.purple} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Insight of the week
        </div>
        <div style={{ ...TYPE.bodySmallSB, marginTop: 2 }}>{F.insight.title}</div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 4 }}>{F.insight.body}</div>
      </div>
    </Card>
  );
}

function HomeStatCard({ label, value, accent, onClick }) {
  return (
    <Card onClick={onClick} style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 4, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 26, height: 4, borderRadius: 2, background: accent, marginBottom: 4 }}/>
      <div style={{ ...TYPE.headlineBold, fontSize: 22 }}>{value}</div>
      <div style={{ ...TYPE.smallM, color: PHANTOM.textSecondary }}>{label}</div>
    </Card>
  );
}

function HomeHesitationGlimpse({ onOpenHesitationTax }) {
  const F = window.PhantomFixtures;
  const t = F.hesitationTaxDetail;
  return (
    <React.Fragment>
      <Card style={{ padding: 18 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          If you had invested
        </div>
        <div style={{ ...TYPE.title, marginTop: 4, color: PHANTOM.textPrimary }}>
          ${t.ifYouInvested.toLocaleString()}
        </div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 6 }}>
          across every ghost you logged.
        </div>
      </Card>
      <Card style={{ padding: 18 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.green, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Gain
        </div>
        <div style={{ ...TYPE.title, marginTop: 4, color: PHANTOM.green }}>
          +${t.gain.toLocaleString()} <span style={{ ...TYPE.body, fontWeight: 500, color: PHANTOM.textSecondary }}>({t.gainPct}%)</span>
        </div>
      </Card>
      <PhantomButton title="See full breakdown →" style="secondary" onClick={onOpenHesitationTax}/>
    </React.Fragment>
  );
}

function HomeGhostedAssets() {
  const F = window.PhantomFixtures;
  return (
    <Card style={{ padding: 0 }}>
      {F.frequentlyGhosted.map((a, i) => (
        <div key={a.ticker} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px',
          borderBottom: i === F.frequentlyGhosted.length - 1 ? 'none' : `1px solid ${PHANTOM.separator}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: PHANTOM.tagBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: TYPE.family, fontSize: 12, fontWeight: 700, color: PHANTOM.purple,
          }}>{a.ticker.slice(0, 2)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ ...TYPE.bodySmallSB }}>{a.ticker}</div>
            <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>{a.count} ghost{a.count === 1 ? '' : 's'}</div>
          </div>
          <svg width="7" height="12" viewBox="0 0 7 12">
            <path d="M1 1l5 5-5 5" stroke={PHANTOM.lightGray} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      ))}
    </Card>
  );
}

Object.assign(window, { HomeView });
