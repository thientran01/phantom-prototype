// phantom-ghost-performance.jsx — Ghost Performance screen from Iteration 2
// Uses PH, phFont, Card, Icon from phantom-screens.jsx

const GP = {
  bg: 'rgb(254,254,255)',
  text: 'rgb(26,26,31)',
  mute: 'rgb(138,138,150)',
  chev: 'rgb(197,197,205)',
  border: 'rgb(240,240,243)',
  cardBg: 'rgb(248,248,250)',
  green: 'rgb(34,160,107)',
  red: 'rgb(212,32,74)',
  purple: 'rgb(56,3,177)',
  purpleTint: 'rgba(56,3,177,0.10)',
  purpleTintB: 'rgba(56,3,177,0.15)',
  accent: 'rgb(91,55,212)',
  accentTint: 'rgba(91,55,212,0.08)',
  greyChip: 'rgba(118,118,128,0.10)',
  greyChipText: 'rgb(142,142,147)',
  chartBg: 'rgb(245,245,245)',
};

const gpFontRound = '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "SF Pro", system-ui, sans-serif';

/* ──────────────────────────────────────────────────────────────
   Small building blocks
   ────────────────────────────────────────────────────────────── */
function Pill({ children, variant = 'purple', size = 'md' }) {
  const palette = {
    purple: { bg: GP.purpleTint, color: GP.purple, border: `1px solid ${GP.purpleTintB}` },
    grey:   { bg: GP.greyChip, color: GP.greyChipText, border: 'none' },
  }[variant];
  const pad = size === 'sm' ? '6px 10px' : '8px 12px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 30, padding: pad,
      borderRadius: 100, background: palette.bg, border: palette.border,
      fontFamily: gpFontRound, fontSize: 12, fontWeight: 700, color: palette.color,
      lineHeight: 1, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      height: 32, padding: '8px 14px', borderRadius: 10,
      border: 'none', cursor: 'pointer',
      fontFamily: phFont, fontSize: 13, fontWeight: 700,
      background: active ? GP.accent : GP.cardBg,
      color: active ? 'white' : GP.text,
      transition: 'background 120ms ease',
    }}>{children}</button>
  );
}

function PatternChipFilter({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      height: 30, padding: '0 14px', borderRadius: 100,
      border: active ? `1px solid ${GP.purpleTintB}` : 'none',
      background: active ? GP.purpleTint : GP.greyChip,
      color: active ? GP.purple : GP.greyChipText,
      fontFamily: gpFontRound, fontSize: 12, fontWeight: 700,
      cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function StatMini({ value, label, valueColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ fontFamily: phFont, fontSize: 17, fontWeight: 700, color: valueColor || GP.text, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontFamily: phFont, fontSize: 11, color: GP.mute, lineHeight: 1 }}>{label}</div>
    </div>
  );
}

function StatTile({ value, label }) {
  return (
    <div style={{
      flex: 1, borderRadius: 12, background: GP.cardBg,
      border: `1px solid ${GP.border}`, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ fontFamily: phFont, fontSize: 22, fontWeight: 700, color: GP.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: phFont, fontSize: 13, color: GP.mute, lineHeight: 1 }}>{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main chart card (purple gradient outline) with SVG line chart
   ────────────────────────────────────────────────────────────── */
function PerformanceChart() {
  // Ghost line (purple) vs Target 2:1 R/R (magenta)
  // Both start at 0 and climb
  return (
    <div style={{
      borderRadius: 16,
      background: 'linear-gradient(rgba(232,224,255,0.22) 0%, rgba(56,3,177,0.04) 100%)',
      border: '1px solid rgb(229,229,229)',
      padding: 24, display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* Chart region */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        {/* Y-axis labels */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '6px 0', fontFamily: phFont, fontSize: 11, color: GP.mute,
          textAlign: 'right', minWidth: 36,
        }}>
          <span>$2000</span><span>$1500</span><span>$1000</span><span>$500</span><span>$0</span>
        </div>
        {/* Chart */}
        <div style={{ flex: 1, height: 130, borderRadius: 8, background: GP.chartBg, position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="100%" viewBox="0 0 240 130" preserveAspectRatio="none">
            {/* subtle horizontal gridlines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" x2="240" y1={8 + i * 28.5} y2={8 + i * 28.5}
                stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>
            ))}
            {/* Target (2:1 R/R) — magenta, a straight diagonal */}
            <polyline points="6,118 50,96 100,70 150,46 200,24 234,10"
              fill="none" stroke="rgb(177,3,89)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
            {/* Ghost line — purple, undulating climb */}
            <polyline
              points="6,118 24,112 42,108 60,100 80,92 100,88 120,78 140,72 160,62 180,50 200,42 220,36 234,32"
              fill="none" stroke="rgb(56,3,177)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* X-axis labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', paddingLeft: 44,
        fontFamily: phFont, fontSize: 11, color: GP.mute,
      }}>
        <span>AM</span><span>6:00</span><span>9:00</span><span>12:00</span><span>3:00</span><span>6:00</span>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 4 }}>
        <Legend color="rgb(56,3,177)" label="GHOST"/>
        <Legend color="rgb(177,3,89)" label="TARGET (2:1 R/R)"/>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 18, height: 4, borderRadius: 8, background: color }}/>
      <span style={{ fontFamily: gpFontRound, fontSize: 11, fontWeight: 500, color: 'black' }}>{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Pattern row — tappable → opens Pattern Detail
   ────────────────────────────────────────────────────────────── */
function PatternRow({ pattern, count, desc, value, valueColor, onTap }) {
  return (
    <button onClick={onTap} style={{
      width: '100%', textAlign: 'left',
      borderRadius: 16, background: 'white',
      border: `1px solid ${GP.border}`,
      padding: '16px 16px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 10,
      fontFamily: phFont,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Pill variant="purple">{pattern}</Pill>
          <Pill variant="grey">×{count}</Pill>
        </div>
        <span style={{ fontSize: 17, color: GP.chev, lineHeight: 1 }}>›</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: GP.mute }}>{desc}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: valueColor || GP.green }}>{value}</span>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────
   Ghost Performance (overview)
   ────────────────────────────────────────────────────────────── */
const GP_PATTERNS = [
  { key: 'fear',     pattern: 'Fear of Loss',    count: 7, desc: 'Exited early to protect gains',       value: '+$1,450', valueColor: 'rgb(34,160,107)' },
  { key: 'fomo',     pattern: 'FOMO Entry',      count: 7, desc: 'Chased momentum plays that reversed', value: '-$620',   valueColor: 'rgb(212,32,74)' },
  { key: 'overthink',pattern: 'Overthinking',    count: 7, desc: 'Over-analyzed until the window closed', value: '+$890', valueColor: 'rgb(34,160,107)' },
  { key: 'lowconf',  pattern: 'Low Confidence',  count: 7, desc: 'Skipped trades despite valid signals', value: '+$340',  valueColor: 'rgb(34,160,107)' },
];

/* Tiny sparkline for the hero card */
function HeroSparkline() {
  // climbs from bottom-left to top-right, soft undulation
  return (
    <svg width="100%" height="48" viewBox="0 0 320 48" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="gp-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgb(34,160,107)" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="rgb(34,160,107)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,40 L20,38 L40,36 L60,34 L80,31 L100,32 L120,26 L140,24 L160,20 L180,22 L200,16 L220,14 L240,11 L260,9 L280,7 L300,5 L320,4 L320,48 L0,48 Z"
            fill="url(#gp-spark-fill)"/>
      <path d="M0,40 L20,38 L40,36 L60,34 L80,31 L100,32 L120,26 L140,24 L160,20 L180,22 L200,16 L220,14 L240,11 L260,9 L280,7 L300,5 L320,4"
            fill="none" stroke="rgb(34,160,107)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GhostPerformanceScreen({ onOpenPattern }) {
  const [range, setRange] = React.useState('24H');
  const [patternFilter, setPatternFilter] = React.useState('All Patterns');

  return (
    <div style={{
      background: GP.bg, padding: '16px 20px 32px',
      display: 'flex', flexDirection: 'column', gap: 20, fontFamily: phFont,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: GP.text, lineHeight: 1 }}>Ghost Performance</div>
        <div style={{ fontSize: 15, color: GP.mute, lineHeight: 1 }}>Based on 23 ghost trades</div>
      </div>

      {/* Time filters */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['24H', '1W', '1M', '1Y'].map(r => (
          <FilterButton key={r} active={range === r} onClick={() => setRange(r)}>{r}</FilterButton>
        ))}
      </div>

      {/* HERO Hesitation Tax Card — full-bleed, warm, confident */}
      <div style={{
        borderRadius: 24,
        background: 'linear-gradient(180deg, rgb(227,252,239) 0%, rgb(239,252,245) 100%)',
        padding: '24px 24px 20px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            color: GP.green, opacity: 0.8,
          }}>HESITATION TAX</div>
          <div style={{
            fontSize: 12, fontWeight: 600, color: GP.green,
            background: 'rgba(34,160,107,0.12)',
            padding: '4px 10px', borderRadius: 100, lineHeight: 1,
          }}>↑ 12%</div>
        </div>
        <div style={{
          fontSize: 56, fontWeight: 700, color: GP.green,
          lineHeight: 1, letterSpacing: '-0.02em',
        }}>+$2,847</div>
        <div style={{ fontSize: 14, color: 'rgb(72,120,95)', lineHeight: 1.3 }}>
          Net gain from trades you didn't take this month
        </div>
        <div style={{ margin: '4px -4px 0' }}>
          <HeroSparkline />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          paddingTop: 14, borderTop: '1px solid rgba(34,160,107,0.15)',
        }}>
          <StatMini value="$1,203" label="Protected" valueColor={GP.green}/>
          <StatMini value="$4,050" label="Missed"    valueColor="rgb(72,120,95)"/>
          <StatMini value="65%"    label="Win Rate"  valueColor={GP.text}/>
        </div>
      </div>

      {/* Patterns section — the real product */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: GP.text }}>Patterns</div>
        <div style={{ fontSize: 13, color: GP.mute }}>4 detected</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['All Patterns', 'Protected', 'Growth'].map(c => (
          <PatternChipFilter key={c} active={patternFilter === c} onClick={() => setPatternFilter(c)}>
            {c}
          </PatternChipFilter>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {GP_PATTERNS.map(p => (
          <PatternRow key={p.key}
            pattern={p.pattern} count={p.count} desc={p.desc}
            value={p.value} valueColor={p.valueColor}
            onTap={() => onOpenPattern(p.key)}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Pattern Detail (drill-in)
   ────────────────────────────────────────────────────────────── */
const PATTERN_DETAILS = {
  fear: {
    name: 'Fear of Loss',
    count: 7,
    subtitle: 'Exited early to protect gains',
    hTaxLabel: 'PATTERN HESITATION TAX',
    hTaxValue: '+$450',
    hTaxSubtitle: 'saved by hesitating',
    hTaxBg: 'rgb(227,252,239)',
    hTaxColor: 'rgb(34,160,107)',
    stats: [
      { value: '7',    label: 'Occurrences' },
      { value: '+$64', label: 'Avg Saved' },
      { value: '71%',  label: 'Win Rate' },
    ],
    meaning: "You tend to exit positions early when you sense downside risk. 5 of 7 times, this protected your capital — but the 2 times it didn't, the trade continued in your favor.",
    tryThis: 'Consider setting a predefined stop-loss before entering. This can reduce emotional exits while still protecting against downside.',
    occurrences: [
      { t: 'NVDA · Long', d: 'Apr 10', v: '+$120', c: 'rgb(34,160,107)' },
      { t: 'AAPL · Short', d: 'Apr 8', v: '+$85',  c: 'rgb(34,160,107)' },
      { t: 'TSLA · Long', d: 'Apr 5',  v: '-$42',  c: 'rgb(212,32,74)'  },
      { t: 'META · Long', d: 'Apr 2',  v: '+$95',  c: 'rgb(34,160,107)' },
    ],
  },
  fomo: {
    name: 'FOMO Entry',
    count: 7,
    subtitle: 'Chased momentum plays that reversed',
    hTaxLabel: 'PATTERN HESITATION TAX',
    hTaxValue: '-$620',
    hTaxSubtitle: 'lost to late entries',
    hTaxBg: 'rgb(255,237,240)',
    hTaxColor: 'rgb(212,32,74)',
    stats: [
      { value: '7',    label: 'Occurrences' },
      { value: '-$89', label: 'Avg Loss' },
      { value: '29%',  label: 'Win Rate' },
    ],
    meaning: "You tend to enter trades after a strong upward move — often near the top. 5 of 7 times the move had already exhausted by your entry.",
    tryThis: 'Wait for a pullback to a prior support level before entering. A 3–5% retrace on strong setups usually offers a better risk/reward.',
    occurrences: [
      { t: 'COIN · Long', d: 'Apr 12', v: '-$180', c: 'rgb(212,32,74)' },
      { t: 'AMD · Long',  d: 'Apr 9',  v: '-$95',  c: 'rgb(212,32,74)' },
      { t: 'NFLX · Long', d: 'Apr 4',  v: '+$40',  c: 'rgb(34,160,107)' },
      { t: 'SHOP · Long', d: 'Mar 30', v: '-$215', c: 'rgb(212,32,74)' },
    ],
  },
  overthink: {
    name: 'Overthinking',
    count: 7,
    subtitle: 'Over-analyzed until the window closed',
    hTaxLabel: 'PATTERN HESITATION TAX',
    hTaxValue: '+$890',
    hTaxSubtitle: 'missed by delaying',
    hTaxBg: 'rgb(227,252,239)',
    hTaxColor: 'rgb(34,160,107)',
    stats: [
      { value: '7',     label: 'Occurrences' },
      { value: '+$127', label: 'Avg Missed' },
      { value: '83%',   label: 'Would Win' },
    ],
    meaning: "You research setups well but often hesitate past the trigger. 6 of 7 setups played out favorably — meaning your analysis is usually right.",
    tryThis: 'Use a 10-minute decision window after a setup triggers. If the thesis still holds, enter — perfect timing rarely beats action.',
    occurrences: [
      { t: 'GOOG · Long', d: 'Apr 11', v: '+$210', c: 'rgb(34,160,107)' },
      { t: 'AMZN · Long', d: 'Apr 7',  v: '+$145', c: 'rgb(34,160,107)' },
      { t: 'MSFT · Long', d: 'Apr 3',  v: '+$75',  c: 'rgb(34,160,107)' },
      { t: 'SPY · Short', d: 'Mar 29', v: '-$30',  c: 'rgb(212,32,74)'  },
    ],
  },
  lowconf: {
    name: 'Low Confidence',
    count: 7,
    subtitle: 'Skipped trades despite valid signals',
    hTaxLabel: 'PATTERN HESITATION TAX',
    hTaxValue: '+$340',
    hTaxSubtitle: 'missed on A+ setups',
    hTaxBg: 'rgb(227,252,239)',
    hTaxColor: 'rgb(34,160,107)',
    stats: [
      { value: '7',    label: 'Occurrences' },
      { value: '+$49', label: 'Avg Missed' },
      { value: '57%',  label: 'Would Win' },
    ],
    meaning: "Even when multiple signals align, you sometimes sit out. Your skipped setups averaged a 57% win rate — only slightly below your taken trades.",
    tryThis: 'Pre-define 3 criteria for an A+ setup. If a ghost meets all 3, commit — confidence grows from consistency, not certainty.',
    occurrences: [
      { t: 'UBER · Long', d: 'Apr 10', v: '+$60', c: 'rgb(34,160,107)' },
      { t: 'ABNB · Long', d: 'Apr 6',  v: '+$45', c: 'rgb(34,160,107)' },
      { t: 'DIS · Long',  d: 'Apr 1',  v: '-$20', c: 'rgb(212,32,74)'  },
      { t: 'PYPL · Long', d: 'Mar 28', v: '+$110',c: 'rgb(34,160,107)' },
    ],
  },
};

function PatternDetailScreen({ patternKey, onClose }) {
  const d = PATTERN_DETAILS[patternKey] || PATTERN_DETAILS.fear;

  return (
    <div style={{
      background: GP.bg, padding: '16px 20px 32px',
      display: 'flex', flexDirection: 'column', gap: 20, fontFamily: phFont,
    }}>
      {/* Close */}
      <button onClick={onClose} aria-label="Close" style={{
        alignSelf: 'flex-start', width: 24, height: 24, padding: 0,
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 20, fontWeight: 500, color: GP.mute, lineHeight: 1,
      }}>✕</button>

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill variant="purple">{d.name}</Pill>
          <Pill variant="grey">×{d.count}</Pill>
        </div>
        <div style={{ fontSize: 15, color: GP.mute, lineHeight: 1 }}>{d.subtitle}</div>
      </div>

      {/* Hesitation Tax card */}
      <div style={{
        borderRadius: 16, background: d.hTaxBg, padding: '20px 24px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: d.hTaxColor }}>
          {d.hTaxLabel}
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, color: d.hTaxColor, lineHeight: 1.1 }}>
          {d.hTaxValue}
        </div>
        <div style={{ fontSize: 13, color: d.hTaxColor, opacity: 0.8 }}>{d.hTaxSubtitle}</div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12 }}>
        {d.stats.map(s => <StatTile key={s.label} value={s.value} label={s.label}/>)}
      </div>

      {/* Insight Card */}
      <div style={{
        borderRadius: 16, background: GP.accentTint, padding: 20,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GP.accent, lineHeight: 1 }}>What this means</div>
        <div style={{ fontSize: 15, color: GP.text, lineHeight: '22px' }}>{d.meaning}</div>
      </div>

      {/* Suggestion Card */}
      <div style={{
        borderRadius: 16, background: GP.cardBg, border: `1px solid ${GP.border}`, padding: 20,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: GP.text, lineHeight: 1 }}>What to try</div>
        <div style={{ fontSize: 15, color: GP.mute, lineHeight: '22px' }}>{d.tryThis}</div>
      </div>

      {/* Occurrences */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: GP.text, lineHeight: 1 }}>Occurrences</div>
        {d.occurrences.map((o, i) => (
          <div key={i} style={{
            borderRadius: 12, background: GP.cardBg, border: `1px solid ${GP.border}`,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: GP.text, lineHeight: 1 }}>{o.t}</span>
              <span style={{ fontSize: 13, color: GP.mute, lineHeight: 1 }}>{o.d}</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, color: o.c, lineHeight: 1 }}>{o.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { GhostPerformanceScreen, PatternDetailScreen });

/* ──────────────────────────────────────────────────────────────
   GhostPerformanceFlow — wrapper that manages overview ↔ detail
   (drop-in replacement for <HesitationTaxScreen />)
   ────────────────────────────────────────────────────────────── */
function GhostPerformanceFlow() {
  const [patternKey, setPatternKey] = React.useState(null);
  if (patternKey) {
    return <PatternDetailScreen patternKey={patternKey} onClose={() => setPatternKey(null)} />;
  }
  return <GhostPerformanceScreen onOpenPattern={setPatternKey} />;
}

Object.assign(window, { GhostPerformanceFlow });
