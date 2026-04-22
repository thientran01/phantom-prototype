// feature-dashboard.jsx — DashboardView, RecentGhostsView, GhostListView
// Mirrors ios/Features/Dashboard/Views/

function DashboardView({ onOpenLogging }) {
  const F = window.PhantomFixtures;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ ...TYPE.largeTitle, fontSize: 32 }}>Dashboard</div>
        <button style={{
          background: PHANTOM.white, border: 'none', width: 42, height: 42,
          borderRadius: '50%', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(56,3,177,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PhantomLogo size={22}/>
        </button>
      </div>

      <Card style={{ padding: 18 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Total ghosts logged
        </div>
        <div style={{ ...TYPE.title, marginTop: 4 }}>{F.overview.ghostedTrades}</div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 6 }}>
          You've been tracking since {F.user.memberSince}.
        </div>
      </Card>

      <SectionHeader style={{ paddingTop: 8 }}>Quick actions</SectionHeader>
      <Card style={{ padding: 0 }}>
        <ListRow
          title="Log a new ghost"
          detail="Takes 2 steps"
          leading={<PlusBubble/>}
          onClick={onOpenLogging}
        />
        <ListRow
          title="Review recent ghosts"
          detail={`${F.ghosts.length} logged`}
          leading={<BookBubble/>}
          onClick={() => {}}
          isLast
        />
      </Card>

      <div style={{
        position: 'absolute', bottom: 88, left: '50%', transform: 'translateX(-50%)',
      }}>
        <button onClick={onOpenLogging} style={{
          width: 62, height: 62, borderRadius: '50%', border: 'none',
          background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
          color: PHANTOM.white, cursor: 'pointer',
          boxShadow: '0 10px 26px rgba(56,3,177,0.4)',
          fontFamily: TYPE.family, fontSize: 32, fontWeight: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>+</button>
      </div>
    </Screen>
  );
}

function RecentGhostsView({ onOpenGhost }) {
  const F = window.PhantomFixtures;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <div style={{ ...TYPE.largeTitle, fontSize: 30, marginBottom: 4 }}>Recent ghosts</div>
      <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginBottom: 12 }}>
        Every trade you almost made.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {F.ghosts.map(g => (
          <GhostRowCard key={g.id} ghost={g} onClick={() => onOpenGhost && onOpenGhost(g)}/>
        ))}
      </div>
    </Screen>
  );
}

function GhostListView({ onOpenGhost }) {
  const F = window.PhantomFixtures;
  const [filter, setFilter] = React.useState('all');
  const shown = filter === 'all' ? F.ghosts
    : filter === 'buy' ? F.ghosts.filter(g => g.direction === 'Buy')
    : F.ghosts.filter(g => g.direction === 'Sell');

  return (
    <Screen bg={PHANTOM.lightPurple}>
      <div style={{ ...TYPE.largeTitle, fontSize: 30, marginBottom: 10 }}>All ghosts</div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {['all', 'buy', 'sell'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 14px', borderRadius: 999,
            border: `1px solid ${filter === f ? PHANTOM.purple : PHANTOM.tagBorder}`,
            background: filter === f ? PHANTOM.purple : PHANTOM.white,
            color: filter === f ? PHANTOM.white : PHANTOM.purple,
            fontFamily: TYPE.family, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', textTransform: 'capitalize',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map(g => <GhostRowCard key={g.id} ghost={g} onClick={() => onOpenGhost && onOpenGhost(g)}/>)}
      </div>
    </Screen>
  );
}

function GhostRowCard({ ghost, onClick }) {
  const isGain = ghost.hesitationTax >= 0;
  return (
    <Card onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: PHANTOM.tagBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: TYPE.family, fontWeight: 700, fontSize: 13, color: PHANTOM.purple,
      }}>{ghost.ticker.slice(0, 3)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ ...TYPE.bodySmallSB }}>{ghost.ticker}</div>
          <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>{ghost.direction} · {ghost.size}</div>
        </div>
        <div style={{ ...TYPE.small, color: PHANTOM.textTertiary, marginTop: 2 }}>
          {ghost.loggedAt} · {ghost.reason}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ ...TYPE.bodySmallSB, color: isGain ? PHANTOM.green : PHANTOM.red }}>
          {isGain ? '+' : '−'}${Math.abs(ghost.hesitationTax).toLocaleString()}
        </div>
        <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>
          {isGain ? '+' : ''}{ghost.pct}%
        </div>
      </div>
    </Card>
  );
}

function PlusBubble() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
      color: PHANTOM.white,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: TYPE.family, fontSize: 22, fontWeight: 300,
    }}>+</div>
  );
}

function BookBubble() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: PHANTOM.tagBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" stroke={PHANTOM.purple} strokeWidth="1.6"/>
        <path d="M4 5v16" stroke={PHANTOM.purple} strokeWidth="1.6"/>
      </svg>
    </div>
  );
}

Object.assign(window, { DashboardView, RecentGhostsView, GhostListView });
