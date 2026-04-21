import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Ticker } from './tokens.jsx';
import { V2_PATTERNS } from './Patterns.jsx';
import { PATTERN_TAG_TO_KEY } from './Archive.jsx';

const PATTERN_DETAIL = {
  fear: {
    hero: { label: 'Fear, in dollars', value: '+$1,450', tone: 'moss', sub: 'saved by hesitating' },
    stats: [
      { n: '7',    sub: 'times' },
      { n: '$207', sub: 'avg saved' },
      { n: '71%',  sub: 'held' },
    ],
    shape:
      "You tend to exit early when a position starts to slide. Five of the seven times, that instinct protected you. Twice, the trade continued in your favor after you were already out.",
    experiment:
      "Before you close next time, write the exit price you'd accept on paper. If the market reaches it, you'll know it wasn't fear talking.",
    occurrences: [
      { d: 'Apr 10', ticker: 'NVDA', dir: 'long',  delta: '+$120' },
      { d: 'Apr 8',  ticker: 'AAPL', dir: 'short', delta: '+$85'  },
      { d: 'Apr 5',  ticker: 'TSLA', dir: 'long',  delta: '−$42'  },
      { d: 'Apr 2',  ticker: 'META', dir: 'long',  delta: '+$95'  },
    ],
  },
  fomo: {
    hero: { label: 'What chasing cost', value: '−$620', tone: 'ember', sub: 'in trades you took back' },
    stats: [
      { n: '7',   sub: 'times' },
      { n: '$89', sub: 'avg cost' },
      { n: '29%', sub: 'worked' },
    ],
    shape:
      "You jump in once the room starts shouting. Two of seven chased plays held — the rest reversed within the day. The chase is almost always late.",
    experiment:
      "When the urge hits, set a 20-minute timer before you click buy. Half the time the setup will pass; the other half it'll still be there, and you'll have a clearer head.",
    occurrences: [
      { d: 'Apr 19', ticker: 'COIN', dir: 'long', delta: '−$180' },
      { d: 'Apr 11', ticker: 'SMCI', dir: 'long', delta: '−$145' },
      { d: 'Mar 28', ticker: 'NFLX', dir: 'long', delta: '+$40'  },
      { d: 'Mar 19', ticker: 'SHOP', dir: 'long', delta: '−$215' },
    ],
  },
  overthink: {
    hero: { label: 'The cost of waiting', value: '+$890', tone: 'moss', sub: "in windows you didn't enter" },
    stats: [
      { n: '7',    sub: 'times' },
      { n: '$127', sub: 'avg missed' },
      { n: '86%',  sub: 'reviewed' },
    ],
    shape:
      "You re-underwrite every thesis twice. It spares you from bad entries — and from good ones. Most of your overthinking is on plays you'd already decided on.",
    experiment:
      "Next time you catch yourself re-checking, name the one number that would change your mind. If it hasn't moved, the second look is costing you the trade.",
    occurrences: [
      { d: 'Apr 21', ticker: 'AAPL', dir: 'long', delta: '+$412' },
      { d: 'Apr 12', ticker: 'GOOG', dir: 'long', delta: '+$210' },
      { d: 'Apr 3',  ticker: 'MSFT', dir: 'long', delta: '+$180' },
      { d: 'Mar 24', ticker: 'AMZN', dir: 'long', delta: '+$88'  },
    ],
  },
  lowconf: {
    hero: { label: 'Trades you saw', value: '+$340', tone: 'moss', sub: "but didn't take" },
    stats: [
      { n: '7',   sub: 'times' },
      { n: '$49', sub: 'avg missed' },
      { n: '64%', sub: 'right' },
    ],
    shape:
      "You spot the setup, then wait for someone else to go first. Your read has been right more often than not — the hesitation isn't about the thesis, it's about the act of deciding.",
    experiment:
      "Before the next one, write down what you'd do if the setup were someone else's call. If you'd take it for them, you can take it for you.",
    occurrences: [
      { d: 'Mar 28', ticker: 'PYPL', dir: 'long', delta: '+$110' },
      { d: 'Mar 24', ticker: 'NFLX', dir: 'long', delta: '+$40'  },
      { d: 'Mar 11', ticker: 'UBER', dir: 'long', delta: '+$72'  },
      { d: 'Mar 4',  ticker: 'CRM',  dir: 'long', delta: '+$118' },
    ],
  },
};

export function V2PatternDetail({ patternKey = 'fear', ghosts = [], onBack, onOpenGhost }) {
  const pattern = V2_PATTERNS.find(p => p.key === patternKey) || V2_PATTERNS[0];
  const detail = PATTERN_DETAIL[pattern.key] || PATTERN_DETAIL.fear;
  const heroColor = detail.hero.tone === 'moss' ? V2.mossInk : V2.emberInk;

  const matchingGhosts = ghosts.filter(g => PATTERN_TAG_TO_KEY[g.tag] === pattern.key);
  const occurrences = matchingGhosts.length > 0
    ? matchingGhosts.slice(0, 6).map(g => ({
        id: g.id, d: g.d, ticker: g.ticker, dir: g.dir,
        delta: g.outcome === 'pending' ? 'pending' : g.delta,
        pending: g.outcome === 'pending',
      }))
    : detail.occurrences.map((o, i) => ({ ...o, id: null }));

  return (
    <div style={{
      padding: '20px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: V2.ink55, fontFamily: V2_FONT.sans, fontSize: 15, padding: 0,
          letterSpacing: '-0.005em',
        }}>← Back</button>
        <V2Meta>Pattern</V2Meta>
        <span style={{ width: 40 }}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <V2Display size={34} italic>{pattern.name}</V2Display>
          <span style={{
            fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink55,
          }}>×{pattern.count}</span>
        </div>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 18, lineHeight: 1.55,
          color: V2.ink70, margin: 0, textWrap: 'pretty',
        }}>{pattern.desc}.</p>
      </div>

      <div style={{
        background: V2.paperDeep,
        borderRadius: 20,
        padding: '22px 22px 24px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <V2Meta style={{ color: V2.ink70 }}>{detail.hero.label}</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 52, color: heroColor,
          letterSpacing: '-0.02em', lineHeight: 1,
        }}>{detail.hero.value}</div>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 15, color: V2.ink55,
        }}>{detail.hero.sub}</div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
        border: `1px solid ${V2.rule}`,
        borderRadius: 18, overflow: 'hidden',
        background: V2.paper,
      }}>
        <StatCell n={detail.stats[0].n} sub={detail.stats[0].sub}/>
        <div style={{ background: V2.rule }}/>
        <StatCell n={detail.stats[1].n} sub={detail.stats[1].sub}/>
        <div style={{ background: V2.rule }}/>
        <StatCell n={detail.stats[2].n} sub={detail.stats[2].sub}/>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>The shape of it</V2Meta>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 19, lineHeight: 1.55,
          color: V2.ink, margin: 0, textWrap: 'pretty',
        }}>{detail.shape}</p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>A small experiment</V2Meta>
        <p style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.55,
          color: V2.ink70, margin: 0, textWrap: 'pretty',
        }}>{detail.experiment}</p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
        <V2Meta style={{ marginBottom: 10 }}>Ghosts of this shape</V2Meta>
        <V2Rule/>
        {occurrences.map((o, i) => (
          <React.Fragment key={o.id || i}>
            <OccurrenceRow o={o} onClick={o.id && onOpenGhost ? () => onOpenGhost(o.id) : null}/>
            <V2Rule/>
          </React.Fragment>
        ))}
      </section>
    </div>
  );
}

function StatCell({ n, sub }) {
  return (
    <div style={{
      padding: '18px 14px',
      display: 'flex', flexDirection: 'column', gap: 4,
      alignItems: 'flex-start',
    }}>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 26, color: V2.ink, letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>{n}</span>
      <span style={{ fontSize: 12, color: V2.ink55 }}>{sub}</span>
    </div>
  );
}

function OccurrenceRow({ o, onClick }) {
  const isPending = o.pending;
  const isPositive = !isPending && o.delta && o.delta.startsWith('+');
  return (
    <button onClick={onClick || undefined} disabled={!onClick} style={{
      width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
      padding: '14px 0', cursor: onClick ? 'pointer' : 'default',
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: V2_FONT.sans,
    }}>
      <span style={{
        width: 54, flexShrink: 0,
        fontFamily: V2_FONT.mono, fontSize: 11,
        color: V2.ink70, letterSpacing: '0.02em',
      }}>{o.d}</span>
      <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
        <V2Ticker>{o.ticker}</V2Ticker>
        <span style={{ fontSize: 13, color: V2.ink55 }}>· {o.dir}</span>
      </div>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 17,
        color: isPending ? V2.ink55 : (isPositive ? V2.mossInk : V2.emberInk),
        letterSpacing: '-0.01em',
      }}>{o.delta}</span>
    </button>
  );
}
