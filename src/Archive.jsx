import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Ticker, V2Tag } from './tokens.jsx';
import { ArchiveEmpty } from './emptyStates.jsx';

export const V2_ARCHIVE = [
  { month: 'April 2025', entries: [
    { id: 'apr22-msft', d: 'Apr 22', ago: 'yesterday', ticker: 'MSFT', dir: 'short', size: '40 shares', outcome: 'held', delta: '+$47',  tag: 'Fear of Loss',
      text: "MSFT 40 short at 418. Tape looked heavy and I'd made money on the last two — didn't want to give it back. Closing before earnings even though my thesis hasn't changed." },
    { id: 'apr21-aapl', d: 'Apr 21', ago: '2 days ago', ticker: 'AAPL', dir: 'long',  size: '$1,000',   outcome: 'missed', delta: '+$412', tag: 'Overthinking',
      text: "AAPL long, about $1,000. Setup is clean but earnings are next week. I keep pulling up the options chain and putting the phone down. Probably safer to wait." },
    { id: 'apr19-coin', d: 'Apr 19', ago: '4 days ago', ticker: 'COIN', dir: 'long',  size: '20 shares', outcome: 'missed', delta: '−$180', tag: 'FOMO Entry',
      text: "COIN long, 20 shares at $210. Everyone on timeline is posting 30% days. Feels like I'm late but if I don't get in now I'll watch it rip without me." },
    { id: 'apr16-tsla', d: 'Apr 16', ago: 'last week',  ticker: 'TSLA', dir: 'long',  size: '10 shares', outcome: 'held',   delta: '−$42',  tag: 'Fear of Loss',
      text: "TSLA 10 long at 172. Thought about taking profit at 178 because the last time I held through a run like this it gave it all back. Closing at 171." },
    { id: 'apr12-goog', d: 'Apr 12', ago: 'last week',  ticker: 'GOOG', dir: 'long',  size: '$500',      outcome: 'missed', delta: '+$210', tag: 'Overthinking',
      text: "GOOG long around $500. Re-ran the DCF twice this morning. The number's fine, I just can't pull the trigger when the tape is green." },
  ]},
  { month: 'March 2025', entries: [
    { id: 'mar28-pypl', d: 'Mar 28', ago: '4 weeks ago', ticker: 'PYPL', dir: 'long', size: '30 shares', outcome: 'missed', delta: '+$110', tag: 'Low Confidence',
      text: "PYPL 30 long around 62. I've been watching this for three weeks. Every time I almost buy, I wait to see if someone smarter posts about it first." },
    { id: 'mar24-nflx', d: 'Mar 24', ago: '4 weeks ago', ticker: 'NFLX', dir: 'long', size: '5 shares',  outcome: 'missed', delta: '+$40',  tag: 'FOMO Entry',
      text: "NFLX 5 long around 630. Saw the earnings reaction and wanted in — felt late but maybe not too late. Didn't click." },
    { id: 'mar19-shop', d: 'Mar 19', ago: '5 weeks ago', ticker: 'SHOP', dir: 'long', size: '$300',      outcome: 'held',   delta: '−$215', tag: 'FOMO Entry',
      text: "SHOP long $300 at 78. Reddit was screaming. Going in small because I don't trust it — if I'm wrong I want to feel it for $300, not $3,000." },
  ]},
];

export const PATTERN_TAG_TO_KEY = {
  'Fear of Loss':   'fear',
  'FOMO Entry':     'fomo',
  'Overthinking':   'overthink',
  'Low Confidence': 'lowconf',
};

export function allEntriesFlat(archive = V2_ARCHIVE) {
  return archive.flatMap(g => g.entries);
}

export function V2Archive({ entries = V2_ARCHIVE, onCompose, onOpenGhost }) {
  const [filter, setFilter] = React.useState('all');

  const totalEntries = entries.reduce((n, g) => n + g.entries.length, 0);
  if (totalEntries === 0) return <ArchiveEmpty onCompose={onCompose}/>;

  return (
    <div style={{
      padding: '32px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>Archive</V2Meta>
        <V2Display size={36} italic>Every ghost you've written.</V2Display>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${V2.rule}` }}>
        {[
          { k: 'all',    l: 'All'       },
          { k: 'held',   l: 'Held back' },
          { k: 'missed', l: 'Missed'    },
        ].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '10px 0', marginRight: 24,
            fontFamily: V2_FONT.sans,
            fontSize: 13,
            color: filter === f.k ? V2.ink : V2.ink55,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            borderBottom: `2px solid ${filter === f.k ? V2.ink : 'transparent'}`,
            marginBottom: -1,
            transition: 'color 120ms ease, border-color 120ms ease',
          }}>{f.l}</button>
        ))}
      </div>

      {entries.map(group => {
        const entries = group.entries.filter(e =>
          filter === 'all' ? true :
          filter === 'held' ? e.outcome === 'held' :
          e.outcome === 'missed'
        );
        if (!entries.length) return null;
        return (
          <div key={group.month} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              fontFamily: V2_FONT.display,
              fontStyle: 'italic',
              fontSize: 18,
              color: V2.ink55,
              marginBottom: 6,
            }}>{group.month}</div>
            <V2Rule />
            {entries.map((e, i) => (
              <React.Fragment key={e.id || i}>
                <ArchiveRow entry={e} onClick={() => onOpenGhost && onOpenGhost(e.id)}/>
                <V2Rule />
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ArchiveRow({ entry, onClick }) {
  const isPending = entry.outcome === 'pending';
  const isPositive = !isPending && entry.delta && entry.delta.startsWith('+');
  const heldLabel = isPending
    ? 'Just logged'
    : (entry.outcome === 'held' ? 'You held' : 'You missed');
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
      padding: '16px 0', cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 14,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{
        width: 54, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2,
        paddingTop: 2,
      }}>
        <span style={{
          fontFamily: V2_FONT.mono, fontSize: 11,
          color: V2.ink70, letterSpacing: '0.02em',
        }}>{entry.d}</span>
        <span style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 11, color: V2.ink35,
        }}>{entry.ago}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <V2Ticker>{entry.ticker}</V2Ticker>
          <span style={{ fontSize: 13, color: V2.ink55 }}>· {entry.dir} · {entry.size}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: V2.ink70 }}>{heldLabel}</span>
          <V2Tag tone="indigo">{entry.tag}</V2Tag>
        </div>
      </div>

      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        {isPending ? (
          <>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 18, color: V2.ink55,
              letterSpacing: '-0.01em', lineHeight: 1,
            }}>pending</span>
            <span style={{ fontSize: 11, color: V2.ink35 }}>open</span>
          </>
        ) : (
          <>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 18,
              color: isPositive ? V2.mossInk : V2.emberInk,
              letterSpacing: '-0.01em', lineHeight: 1,
            }}>{entry.delta}</span>
            <span style={{ fontSize: 11, color: V2.ink35 }}>
              {entry.outcome === 'held' ? (isPositive ? 'saved' : 'avoided') : (isPositive ? 'missed' : 'dodged')}
            </span>
          </>
        )}
      </div>
    </button>
  );
}
