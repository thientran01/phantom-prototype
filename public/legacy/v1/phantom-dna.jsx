// phantom-dna.jsx — Investor DNA flow, Iteration 2
// States: empty (0 ghosts) → forming (3+) → filled → archetype → trait-detail
// Uses PH, phFont, PhLogo, Card, Icon from phantom-screens.jsx

/* ──────────────────────────────────────────────────────────────
   Design tokens specific to DNA (pulled from Figma)
   ────────────────────────────────────────────────────────────── */
const DNA = {
  deepPurple:  'rgb(61,36,148)',
  accent:      'rgb(91,55,212)',     // spectrum fill
  accentSoft:  'rgba(91,55,212,0.08)',
  accentLabel: 'rgb(155,130,234)',   // "YOUR ARCHETYPE" label
  spectrumBg:  'rgb(221,212,249)',
  panelBg:     'rgb(248,248,250)',
  panelBorder: 'rgb(240,240,243)',
  heading:     'rgb(26,26,31)',
  secondary:   'rgb(138,138,150)',
  muted:       'rgb(197,197,205)',
  body:        'rgb(84,85,90)',
  brand:       'rgb(56,3,177)',
  brandSoft:   'rgba(56,3,177,0.25)',
  brandSofter: 'rgba(56,3,177,0.1)',
};

/* ──────────────────────────────────────────────────────────────
   Radar chart (6 axes, labels + polygon)
   ────────────────────────────────────────────────────────────── */
const DNA_AXES = [
  { key: 'Intensity',    pos: 'top' },
  { key: 'Momentum',     pos: 'tr'  },
  { key: 'Conviction',   pos: 'br'  },
  { key: 'Caution',      pos: 'bot' },
  { key: 'Deliberation', pos: 'bl'  },
  { key: 'Sensitivity',  pos: 'tl'  },
];

function DNARadar({ values, dashed = false, size = 260, onAxisTap }) {
  const n = DNA_AXES.length;
  const cx = size / 2;
  const cy = size / 2 + 6;
  const r = size * 0.36;
  const rings = 4;
  const angle = i => -Math.PI / 2 + i * (2 * Math.PI / n);

  const poly = fraction =>
    Array.from({ length: n }).map((_, i) => {
      const a = angle(i);
      return `${cx + Math.cos(a) * r * fraction},${cy + Math.sin(a) * r * fraction}`;
    }).join(' ');

  const dataPoly = values.map((v, i) => {
    const a = angle(i);
    return `${cx + Math.cos(a) * r * v},${cy + Math.sin(a) * r * v}`;
  }).join(' ');

  // Label positions (hand-placed offsets to match Figma)
  const labelPos = (i) => {
    const a = angle(i);
    const lr = r + 22;
    return {
      x: cx + Math.cos(a) * lr,
      y: cy + Math.sin(a) * lr + 4,
      anchor:
        Math.abs(Math.cos(a)) < 0.15 ? 'middle' :
        Math.cos(a) > 0 ? 'start' : 'end',
    };
  };

  return (
    <svg width="100%" viewBox={`-40 0 ${size + 80} ${size * 0.82}`}
      style={{ display: 'block', margin: '0 auto', maxWidth: size + 80 }}>
      {/* rings */}
      {Array.from({ length: rings }).map((_, i) => (
        <polygon key={i}
          points={poly((i + 1) / rings)}
          fill="none"
          stroke="rgb(207,210,215)"
          strokeWidth="1"
        />
      ))}
      {/* spokes */}
      {DNA_AXES.map((_, i) => {
        const a = angle(i);
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke="rgb(207,210,215)" strokeWidth="1"
          />
        );
      })}
      {/* data */}
      <polygon
        points={dataPoly}
        fill={dashed ? DNA.brandSofter : DNA.brandSoft}
        stroke={DNA.brand}
        strokeWidth="2"
        strokeDasharray={dashed ? '5 5' : 'none'}
      />
      {/* labels */}
      {DNA_AXES.map((ax, i) => {
        const p = labelPos(i);
        return (
          <text key={ax.key}
            x={p.x} y={p.y}
            fontSize="12"
            fontFamily={phFont}
            fill={DNA.body}
            textAnchor={p.anchor}
            style={{ cursor: onAxisTap ? 'pointer' : 'default' }}
            onClick={onAxisTap ? () => onAxisTap(ax.key) : undefined}
          >{ax.key}</text>
        );
      })}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Shared header
   ────────────────────────────────────────────────────────────── */
function DNAHeader({ title, subtitle, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {onClose && (
          <button onClick={onClose} style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontSize: 20, color: DNA.secondary, width: 24,
          }}>✕</button>
        )}
        <div style={{ fontFamily: phFont, fontSize: 28, fontWeight: 700, color: DNA.heading, lineHeight: 1 }}>
          {title}
        </div>
      </div>
      {subtitle && (
        <div style={{ fontFamily: phFont, fontSize: 15, color: DNA.secondary, marginLeft: onClose ? 40 : 0 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function DNAFootnote({ children }) {
  return (
    <div style={{
      fontFamily: phFont, fontSize: 11,
      color: DNA.muted, lineHeight: 1.35, padding: '4px 0 8px',
    }}>{children}</div>
  );
}

/* ──────────────────────────────────────────────────────────────
   State 1: Empty (0 ghosts)
   ────────────────────────────────────────────────────────────── */
function DNAEmpty({ onLogGhost }) {
  return (
    <div style={{
      height: '100%', background: 'white',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 44px', textAlign: 'center', gap: 24,
    }}>
      <PhLogo size={64} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontFamily: phFont, fontSize: 28, fontWeight: 700, color: 'black', lineHeight: 1.1 }}>
          Build Your Investor DNA
        </div>
        <div style={{ fontFamily: phFont, fontSize: 17, color: DNA.body, lineHeight: 1.35 }}>
          Log 3 Ghost Trades to unlock your initial profile.
        </div>
      </div>
      <button onClick={onLogGhost} style={{
        padding: '14px 28px', borderRadius: 24,
        background: DNA.brand, color: 'white',
        border: 'none', cursor: 'pointer',
        fontFamily: phFont, fontSize: 20, fontWeight: 500,
      }}>Log a Ghost</button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   State 2: Forming (3+ ghosts)
   ────────────────────────────────────────────────────────────── */
function DNAForming({ logged = 3, target = 7 }) {
  const values = [0.45, 0.35, 0.3, 0.4, 0.55, 0.38];
  const pct = Math.max(0, Math.min(1, logged / target));
  return (
    <div style={{
      padding: '24px 20px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
      background: 'white', minHeight: '100%',
    }}>
      <DNAHeader title="Investor DNA" subtitle="Your profile is forming"/>

      <div style={{
        borderRadius: 16, background: 'white',
        border: '1px solid rgb(229,229,229)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 14px rgba(0,0,0,0.03)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 18, fontWeight: 700,
          textAlign: 'center', color: 'black',
        }}>Tendencies Forming</div>
        <DNARadar values={values} dashed={true} size={280}/>
        <div>
          <div style={{ fontFamily: phFont, fontSize: 14, fontWeight: 500, color: 'black' }}>
            {logged} of {target} Logged
          </div>
          <div style={{
            marginTop: 10, height: 12, borderRadius: 8,
            border: `2px solid ${DNA.brand}`, overflow: 'hidden',
            background: 'white',
          }}>
            <div style={{
              width: `${pct * 100}%`, height: '100%',
              background: DNA.brand,
            }}/>
          </div>
          <div style={{
            marginTop: 14,
            fontFamily: phFont, fontSize: 12, color: DNA.body,
            textAlign: 'center', lineHeight: 1.4,
          }}>
            Your profile is forming. Log {Math.max(0, target - logged)} more ghosts to see your full tendencies.
          </div>
        </div>
      </div>

      {/* Early signal */}
      <div style={{
        borderRadius: 12, background: DNA.accentSoft,
        padding: 16, display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.05em', color: DNA.accentLabel,
        }}>EARLY SIGNAL</div>
        <div style={{ fontFamily: phFont, fontSize: 15, fontWeight: 700, color: DNA.deepPurple }}>
          You may lean toward high deliberation
        </div>
        <div style={{ fontFamily: phFont, fontSize: 13, color: DNA.secondary, lineHeight: 1.4 }}>
          Based on 3 ghost trades so far. This may change as you log more.
        </div>
      </div>

      <DNAFootnote>
        Your profile becomes more reliable with more data. Keep logging to build confidence in these patterns.
      </DNAFootnote>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   State 3: Filled (radar + dominant tendencies)
   ────────────────────────────────────────────────────────────── */
function DNAFilled({ onOpenArchetype }) {
  const values = [0.75, 0.55, 0.4, 0.8, 0.82, 0.5];
  const tendencies = [
    { title: 'High Deliberation',  desc: 'You tend to overthink before acting, often missing windows of opportunity.' },
    { title: 'Elevated Intensity', desc: 'Most of your ghost trades happen during high-stress market moments.' },
    { title: 'Low Conviction',     desc: 'You frequently second-guess your analysis even when signals align.' },
  ];
  return (
    <div style={{
      padding: '24px 20px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
      background: 'white', minHeight: '100%',
    }}>
      <DNAHeader title="Investor DNA" subtitle="Your behavioral profile based on 23 ghost trades"/>

      <div onClick={onOpenArchetype} style={{
        cursor: 'pointer',
        borderRadius: 16, background: 'white',
        border: '1px solid rgb(229,229,229)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 14px rgba(0,0,0,0.03)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 18, fontWeight: 700,
          textAlign: 'center', color: 'black',
        }}>Your Trading Tendencies</div>
        <DNARadar values={values}/>
        <div style={{
          textAlign: 'center', fontFamily: phFont, fontSize: 11,
          color: DNA.accentLabel, fontWeight: 500, letterSpacing: '0.08em',
          marginTop: 4,
        }}>TAP TO SEE BREAKDOWN →</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          fontFamily: phFont, fontSize: 17, fontWeight: 700, color: DNA.heading,
        }}>Your Dominant Tendencies</div>
        {tendencies.map(t => (
          <div key={t.title} onClick={onOpenArchetype} style={{
            cursor: 'pointer',
            borderRadius: 12, background: DNA.accentSoft,
            padding: 16, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: phFont, fontSize: 15, fontWeight: 700,
                color: DNA.deepPurple, lineHeight: 1.2,
              }}>{t.title}</div>
              <div style={{
                fontFamily: phFont, fontSize: 13, color: DNA.secondary,
                marginTop: 4, lineHeight: 1.35,
              }}>{t.desc}</div>
            </div>
            <Icon name="chevron" size={14} color="black"/>
          </div>
        ))}
      </div>

      <DNAFootnote>
        Based on patterns in your ghost trades. This is not a prediction or financial assessment.
      </DNAFootnote>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   State 4: Archetype + tendency spectrums
   ────────────────────────────────────────────────────────────── */
function DNAArchetype({ onOpenTrait }) {
  const traits = [
    { key: 'Intensity',    desc: 'You ghost more during volatile moments',       l: 'Calm',        r: 'Reactive',       v: 0.78 },
    { key: 'Caution',      desc: 'You tend to protect capital over chasing gains', l: 'Risk-taker',  r: 'Conservative',   v: 0.72 },
    { key: 'Conviction',   desc: 'You often second-guess your own analysis',     l: 'Uncertain',   r: 'Decisive',       v: 0.35 },
    { key: 'Sensitivity',  desc: 'Moderately influenced by market sentiment',    l: 'Detached',    r: 'Emotional',      v: 0.55 },
    { key: 'Momentum',     desc: 'You split between following and fading trends', l: 'Contrarian',  r: 'Trend-follower', v: 0.48 },
    { key: 'Deliberation', desc: 'You weigh options carefully before deciding',  l: 'Impulsive',   r: 'Methodical',     v: 0.82 },
  ];
  return (
    <div style={{
      padding: '24px 20px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
      background: 'white', minHeight: '100%',
    }}>
      <DNAHeader title="Investor DNA" subtitle="Your behavioral profile based on 23 ghost trades"/>

      {/* Archetype banner */}
      <div style={{
        borderRadius: 16, background: DNA.accentSoft,
        padding: 24, textAlign: 'center',
        display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.1em', color: DNA.accentLabel,
        }}>YOUR ARCHETYPE</div>
        <div style={{
          fontFamily: phFont, fontSize: 24, fontWeight: 700,
          color: 'black', lineHeight: 1.15,
        }}>The Cautious Analyst</div>
        <div style={{
          fontFamily: phFont, fontSize: 15, color: DNA.body,
          lineHeight: 1.4, maxWidth: 300,
        }}>
          You analyze deeply and prefer certainty over speed. Your hesitation often protects you, but sometimes holds you back.
        </div>
      </div>

      {/* Tendencies list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          fontFamily: phFont, fontSize: 17, fontWeight: 700, color: DNA.heading,
          marginBottom: 2,
        }}>Your Tendencies</div>
        {traits.map(t => <TraitRowSpectrum key={t.key} trait={t} onTap={() => onOpenTrait(t.key)}/>)}
      </div>

      <DNAFootnote>
        Based on patterns in your ghost trades. This is not a prediction or financial assessment.
      </DNAFootnote>
    </div>
  );
}

function TraitRowSpectrum({ trait, onTap }) {
  return (
    <div onClick={onTap} style={{
      cursor: 'pointer',
      borderRadius: 12, background: DNA.panelBg,
      border: `1px solid ${DNA.panelBorder}`,
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: phFont, fontSize: 15, fontWeight: 700, color: DNA.heading,
        }}>{trait.key}</span>
        <Icon name="chevron" size={14} color="black"/>
      </div>
      <div style={{
        fontFamily: phFont, fontSize: 13, color: DNA.secondary, lineHeight: 1.35,
      }}>{trait.desc}</div>
      <div style={{ marginTop: 4 }}>
        <Spectrum value={trait.v}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 6, fontFamily: phFont, fontSize: 11, color: DNA.muted,
        }}>
          <span>{trait.l}</span>
          <span>{trait.r}</span>
        </div>
      </div>
    </div>
  );
}

function Spectrum({ value, withDot = false }) {
  return (
    <div style={{ position: 'relative', height: withDot ? 16 : 6 }}>
      <div style={{
        position: 'absolute', top: withDot ? 5 : 0, left: 0, right: 0,
        height: 6, borderRadius: 3, background: DNA.spectrumBg,
      }}/>
      <div style={{
        position: 'absolute', top: withDot ? 5 : 0, left: 0,
        width: `${value * 100}%`, height: 6,
        borderRadius: 3, background: DNA.accent,
      }}/>
      {withDot && (
        <div style={{
          position: 'absolute', top: 0,
          left: `calc(${value * 100}% - 8px)`,
          width: 16, height: 16, borderRadius: 8,
          background: DNA.deepPurple,
          border: '3px solid white',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }}/>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   State 5: Trait Detail
   ────────────────────────────────────────────────────────────── */
const TRAIT_DETAILS = {
  Deliberation: {
    subtitle: 'How much you analyze before acting',
    position: 'You: Methodical', l: 'Impulsive', r: 'Methodical', v: 0.8,
    explain: 'Deliberation measures how much you analyze before acting. High deliberation means you tend to research extensively — which can protect you from bad trades, but may also cause you to miss opportunities when speed matters.',
    ghosts: [
      { t: 'NVDA · Long',  d: 'Apr 10 — Spent 40 min analyzing, missed entry' },
      { t: 'AAPL · Short', d: 'Apr 8 — Waited for extra confirmation signal' },
      { t: 'TSLA · Long',  d: 'Apr 5 — Re-checked thesis 3 times before passing' },
    ],
    keepInMind: 'Try setting a decision deadline. Give yourself 5 minutes of analysis, then commit. This can help you act on your research without overthinking.',
  },
  Intensity: {
    subtitle: 'How stress affects your trading',
    position: 'You: Reactive', l: 'Calm', r: 'Reactive', v: 0.78,
    explain: 'Intensity measures how much market volatility influences your decisions. High intensity means you\'re more likely to hesitate or act when the market is noisy.',
    ghosts: [
      { t: 'SPY · Long',   d: 'Apr 12 — Ghosted during CPI release' },
      { t: 'QQQ · Short',  d: 'Apr 9 — Paralyzed during intraday dip' },
    ],
    keepInMind: 'Pre-commit to your plan before volatile events. Write your rules when the market is calm, then follow them when it isn\'t.',
  },
  Caution: {
    subtitle: 'Your default stance toward risk',
    position: 'You: Conservative', l: 'Risk-taker', r: 'Conservative', v: 0.72,
    explain: 'Caution measures whether you tend to protect capital or chase gains. High caution tends to preserve downside but caps upside.',
    ghosts: [
      { t: 'MSFT · Long',  d: 'Apr 11 — Reduced size to zero at the last minute' },
    ],
    keepInMind: 'Size positions smaller rather than skipping them entirely. A small stake keeps you in the game without risking too much.',
  },
  Conviction: {
    subtitle: 'How strongly you trust your own analysis',
    position: 'You: Uncertain', l: 'Uncertain', r: 'Decisive', v: 0.35,
    explain: 'Conviction measures how much you trust your own thesis. Low conviction means you often second-guess research even when signals align.',
    ghosts: [
      { t: 'AMD · Long',   d: 'Apr 7 — Strong thesis, passed anyway' },
    ],
    keepInMind: 'Write your thesis in one sentence before you act. If it still holds after a 10-minute walk, trust it.',
  },
  Sensitivity: {
    subtitle: 'How market sentiment affects you',
    position: 'You: Mixed', l: 'Detached', r: 'Emotional', v: 0.55,
    explain: 'Sensitivity measures how much prevailing sentiment moves you. Moderate sensitivity means you pick up on mood shifts but don\'t always act on them.',
    ghosts: [
      { t: 'TSLA · Short', d: 'Apr 6 — Headlines shifted your thesis mid-trade' },
    ],
    keepInMind: 'Notice which sources change your mind. Limit exposure to the ones that don\'t add information.',
  },
  Momentum: {
    subtitle: 'Following vs. fading trends',
    position: 'You: Mixed', l: 'Contrarian', r: 'Trend-follower', v: 0.48,
    explain: 'Momentum measures whether you ride existing trends or bet against them. A mid-spectrum score means your approach varies by trade.',
    ghosts: [
      { t: 'COIN · Long',  d: 'Apr 4 — Chased a breakout, then hesitated' },
    ],
    keepInMind: 'Decide your style per setup before entering. Mixing approaches mid-trade is a common cause of hesitation.',
  },
};

function DNATraitDetail({ trait, onClose }) {
  const d = TRAIT_DETAILS[trait] || TRAIT_DETAILS.Deliberation;
  return (
    <div style={{
      padding: '16px 20px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
      background: 'white', minHeight: '100%',
    }}>
      <DNAHeader title={trait} subtitle={d.subtitle} onClose={onClose}/>

      {/* Where you fall */}
      <div style={{
        borderRadius: 16, background: DNA.panelBg,
        border: `1px solid ${DNA.panelBorder}`,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.05em', color: DNA.secondary,
        }}>WHERE YOU FALL</div>
        <Spectrum value={d.v} withDot={true}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 2,
          fontFamily: phFont, fontSize: 13, color: DNA.muted,
        }}>
          <span>{d.l}</span>
          <span style={{ color: DNA.deepPurple, fontWeight: 600 }}>{d.position}</span>
          <span>{d.r}</span>
        </div>
      </div>

      {/* What this means */}
      <div style={{
        borderRadius: 16, background: DNA.accentSoft,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 17, fontWeight: 700, color: DNA.accent,
        }}>What this means</div>
        <div style={{
          fontFamily: phFont, fontSize: 15, color: DNA.heading, lineHeight: 1.47,
        }}>{d.explain}</div>
      </div>

      {/* In your ghosts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          fontFamily: phFont, fontSize: 17, fontWeight: 700, color: DNA.heading,
        }}>In your ghosts</div>
        {d.ghosts.map((g, i) => (
          <div key={i} style={{
            borderRadius: 10, background: DNA.panelBg,
            border: `1px solid ${DNA.panelBorder}`,
            padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{
              fontFamily: phFont, fontSize: 15, fontWeight: 700, color: DNA.heading,
            }}>{g.t}</div>
            <div style={{
              fontFamily: phFont, fontSize: 13, color: DNA.secondary,
            }}>{g.d}</div>
          </div>
        ))}
      </div>

      {/* What to keep in mind */}
      <div style={{
        borderRadius: 16, background: DNA.panelBg,
        border: `1px solid ${DNA.panelBorder}`,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{
          fontFamily: phFont, fontSize: 15, fontWeight: 700, color: DNA.heading,
        }}>What to keep in mind</div>
        <div style={{
          fontFamily: phFont, fontSize: 15, color: DNA.secondary, lineHeight: 1.47,
        }}>{d.keepInMind}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Top-level wrapper that owns DNA-sub-state
   ────────────────────────────────────────────────────────────── */
function InvestorDNAFlow({ stage, setStage, openLog }) {
  // stage: 'empty' | 'forming' | 'filled' | 'archetype' | 'trait:<Name>'
  if (stage === 'empty')    return <DNAEmpty onLogGhost={openLog} />;
  if (stage === 'forming')  return <DNAForming logged={3} target={7} />;
  if (stage === 'filled')   return <DNAFilled onOpenArchetype={() => setStage('archetype')} />;
  if (stage === 'archetype') return <DNAArchetype onOpenTrait={(t) => setStage('trait:' + t)} />;
  if (stage && stage.startsWith('trait:')) {
    return <DNATraitDetail trait={stage.slice(6)} onClose={() => setStage('archetype')} />;
  }
  return <DNAFilled onOpenArchetype={() => setStage('archetype')} />;
}

Object.assign(window, {
  DNA, DNARadar, DNAEmpty, DNAForming, DNAFilled, DNAArchetype, DNATraitDetail,
  InvestorDNAFlow,
});
