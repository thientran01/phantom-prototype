// feature-investor-dna.jsx — InvestorDNAView, 5 states
// Mirrors ios/Features/InvestorDNA/Views/
//   1. Empty (0 ghosts) → "Log a Ghost" prompt
//   2. Forming (1–6)   → blurred radar + progress
//   3. Filled (7+)     → full radar + dominant traits
//   4. Drill-down sheet → archetype + spectrum rows
//   5. Trait detail    → spectrum + meaning + examples

function DNAEmpty({ onOpenLogging, onBack }) {
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title="Investor DNA" onBack={onBack}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 18, textAlign: 'center' }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: PHANTOM.tagBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="48" height="48" viewBox="-24 -24 48 48">
            {[10, 18, 22].map(r => <polygon key={r} points={pentPts(r)} fill="none" stroke={PHANTOM.purple} strokeWidth="1" opacity="0.4"/>)}
          </svg>
        </div>
        <div>
          <div style={{ ...TYPE.title, marginBottom: 6 }}>
            <GradientText>Your DNA is locked</GradientText>
          </div>
          <div style={{ ...TYPE.subheadline, color: PHANTOM.textSecondary, maxWidth: 280 }}>
            Phantom needs a few ghosts before it can read the shape of your hesitation.
          </div>
        </div>
      </div>
      <PhantomButton title="Log a Ghost" onClick={onOpenLogging}/>
    </Screen>
  );
}

function DNAForming({ count = 3, total = 7, onBack }) {
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title="Investor DNA" onBack={onBack}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, textAlign: 'center' }}>
        <div style={{ position: 'relative' }}>
          <RadarCanvas values={[0.4, 0.3, 0.5, 0.2, 0.4]} blur/>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(241,240,251,0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            borderRadius: '50%',
          }}>
            <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textAlign: 'center' }}>
              <div>{count} / {total}</div>
              <div>ghosts</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...TYPE.title, marginBottom: 6 }}>
            <GradientText>Forming</GradientText>
          </div>
          <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, maxWidth: 280 }}>
            Your shape is starting to show. {total - count} more ghost{total - count === 1 ? '' : 's'} to unlock your full archetype.
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <div style={{ height: 6, background: PHANTOM.borderPurple, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${(count / total) * 100}%`, height: '100%',
              background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
              transition: 'width 260ms ease',
            }}/>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function DNAFilled({ onOpenArchetype, onOpenTrait, onBack }) {
  const F = window.PhantomFixtures;
  const d = F.dna;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title="Investor DNA" onBack={onBack}/>

      <button onClick={onOpenArchetype} style={{
        background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
        color: PHANTOM.white,
        border: 'none', borderRadius: 20, padding: 18,
        textAlign: 'left', cursor: 'pointer',
        boxShadow: '0 12px 30px rgba(56,3,177,0.28)',
        marginBottom: 14,
        fontFamily: TYPE.family,
      }}>
        <div style={{ ...TYPE.smallM, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          You are
        </div>
        <div style={{ ...TYPE.title, marginTop: 2 }}>{d.archetype}</div>
        <div style={{ ...TYPE.bodySmall, opacity: 0.88, marginTop: 6 }}>
          {d.archetypeSubtitle}
        </div>
      </button>

      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RadarCanvas values={d.axes.map(a => a.value)} labels={d.axes.map(a => a.letter)}/>
        </div>
      </Card>

      <SectionHeader>Dominant traits</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {d.dominantTraits.map(t => (
          <Card key={t.label} onClick={() => onOpenTrait && onOpenTrait(t.label)} style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: PHANTOM.tagBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: TYPE.family, fontWeight: 700, color: PHANTOM.purple,
            }}>{t.label[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ ...TYPE.bodySmallSB }}>{t.label}</div>
              <div style={{ ...TYPE.small, color: PHANTOM.textSecondary, marginTop: 2 }}>{t.hint}</div>
            </div>
            <svg width="7" height="12" viewBox="0 0 7 12">
              <path d="M1 1l5 5-5 5" stroke={PHANTOM.lightGray} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function DNAArchetype({ onBack, onOpenTrait }) {
  const F = window.PhantomFixtures;
  const d = F.dna;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title={d.archetype} onBack={onBack}/>

      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Archetype
        </div>
        <div style={{ ...TYPE.title, marginTop: 4 }}>{d.archetype}</div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 8, lineHeight: 1.55 }}>
          {d.archetypeSubtitle} Built from {d.totalGhosts} logged ghosts — the Watchman reads more than most, and waits longer than they'd like to admit.
        </div>
      </Card>

      <SectionHeader>Where you land</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {d.axes.map(a => (
          <button key={a.key} onClick={() => onOpenTrait && onOpenTrait(a.label)} style={{
            width: '100%', textAlign: 'left',
            background: PHANTOM.white, border: `1px solid ${PHANTOM.inputBorder}`,
            borderRadius: 14, padding: 14,
            cursor: 'pointer', fontFamily: TYPE.family,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...TYPE.smallM, marginBottom: 8 }}>
              <span style={{ color: a.value < 0.5 ? PHANTOM.purple : PHANTOM.textSecondary, fontWeight: a.value < 0.5 ? 700 : 500 }}>{a.label}</span>
              <span style={{ color: a.value >= 0.5 ? PHANTOM.purple : PHANTOM.textSecondary, fontWeight: a.value >= 0.5 ? 700 : 500 }}>{a.opposite}</span>
            </div>
            <DNASpectrumBar value={a.value}/>
          </button>
        ))}
      </div>
    </Screen>
  );
}

function DNATrait({ traitLabel = 'Guarded', onBack }) {
  const F = window.PhantomFixtures;
  const axis = F.dna.axes.find(a => a.label === traitLabel) || F.dna.axes[1];
  const related = F.ghosts.slice(0, 3);
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title={axis.label} onBack={onBack}/>

      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Your position
        </div>
        <div style={{ ...TYPE.title, marginTop: 4 }}>{axis.label}</div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...TYPE.smallM, marginBottom: 8 }}>
            <span style={{ color: axis.value < 0.5 ? PHANTOM.purple : PHANTOM.textSecondary, fontWeight: axis.value < 0.5 ? 700 : 500 }}>{axis.label}</span>
            <span style={{ color: axis.value >= 0.5 ? PHANTOM.purple : PHANTOM.textSecondary, fontWeight: axis.value >= 0.5 ? 700 : 500 }}>{axis.opposite}</span>
          </div>
          <DNASpectrumBar value={axis.value}/>
        </div>
      </Card>

      <SectionHeader>What it means</SectionHeader>
      <Card style={{ padding: 16, marginBottom: 14 }}>
        <p style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, margin: 0, lineHeight: 1.55 }}>
          You pull back when losses feel real. That protects you from bad entries — and from good ones you talked yourself out of. Most of your "guarded" ghosts cluster around uncertain earnings windows.
        </p>
      </Card>

      <SectionHeader>Ghosts that shaped this</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {related.map(g => (
          <Card key={g.id} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: PHANTOM.tagBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: TYPE.family, fontWeight: 700, fontSize: 12, color: PHANTOM.purple,
            }}>{g.ticker.slice(0, 3)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ ...TYPE.bodySmallSB }}>{g.ticker} · {g.direction}</div>
              <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>{g.reason}</div>
            </div>
            <div style={{ ...TYPE.small, color: PHANTOM.textTertiary }}>{g.loggedAt}</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

// ─────────────────────────────────────────────────────────────
// Radar canvas — 5-ring pentagon with data polygon
// ─────────────────────────────────────────────────────────────
function RadarCanvas({ values, labels = [], blur = false }) {
  const size = 240;
  const r = 92;
  const cx = size / 2, cy = size / 2;
  const pts = (scales) => scales.map((s, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const rr = r * s;
    return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  }).join(' ');
  const axisPt = (i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  };
  const labelPt = (i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const rr = r + 18;
    return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr };
  };

  return (
    <svg width={size} height={size} style={{ filter: blur ? 'blur(2px)' : 'none' }}>
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor={PHANTOM.purple} stopOpacity="0.55"/>
          <stop offset="100%" stopColor={PHANTOM.lavender} stopOpacity="0.35"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s} points={pts([s, s, s, s, s])} fill="none" stroke={PHANTOM.borderPurple} strokeWidth="1"/>
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1={cx} y1={cy} x2={axisPt(i).split(',')[0]} y2={axisPt(i).split(',')[1]} stroke={PHANTOM.borderPurple} strokeWidth="1"/>
      ))}
      <polygon points={pts(values)} fill="url(#radarFill)" stroke={PHANTOM.purple} strokeWidth="2"/>
      {values.map((v, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const rr = r * v;
        return <circle key={i} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} r="3.5" fill={PHANTOM.purple}/>;
      })}
      {labels.map((l, i) => {
        const p = labelPt(i);
        return (
          <text key={i} x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="DM Sans" fontSize="12" fontWeight="700" fill={PHANTOM.purple}>
            {l}
          </text>
        );
      })}
    </svg>
  );
}

function DNASpectrumBar({ value }) {
  return (
    <div style={{ position: 'relative', height: 6, background: PHANTOM.borderPurple, borderRadius: 3 }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: value < 0.5 ? `${(1 - value) * 100}%` : `${value * 100}%`,
        right: value < 0.5 ? 'auto' : undefined,
        background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
        borderRadius: 3,
      }}/>
      <div style={{
        position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
        left: `${value * 100}%`,
        width: 14, height: 14, borderRadius: '50%',
        background: PHANTOM.white,
        border: `2px solid ${PHANTOM.purple}`,
        boxShadow: '0 2px 6px rgba(56,3,177,0.25)',
      }}/>
    </div>
  );
}

function pentPts(r, scales = [1, 1, 1, 1, 1]) {
  return [0, 1, 2, 3, 4].map(i => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const rr = r * scales[i];
    return `${Math.cos(a) * rr},${Math.sin(a) * rr}`;
  }).join(' ');
}

Object.assign(window, { DNAEmpty, DNAForming, DNAFilled, DNAArchetype, DNATrait });
