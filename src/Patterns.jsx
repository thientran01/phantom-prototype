import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule } from './tokens.jsx';
import { DNA_ARCHETYPES, USER_DNA } from './dnaData.js';
import { PatternsThin } from './emptyStates.jsx';

export const V2_PATTERNS = [
  { key: 'fear',      name: 'Fear of Loss',   count: 7, tone: 'moss',  net: '+$1,450', desc: 'Exited early to protect gains' },
  { key: 'fomo',      name: 'FOMO Entry',     count: 7, tone: 'ember', net: '−$620',   desc: 'Chased momentum plays that reversed' },
  { key: 'overthink', name: 'Overthinking',   count: 7, tone: 'moss',  net: '+$890',   desc: 'Over-analyzed until the window closed' },
  { key: 'lowconf',   name: 'Low Confidence', count: 7, tone: 'moss',  net: '+$340',   desc: 'Skipped trades despite valid signals' },
];

const COMPOSITION_COLORS = ['#2B2B6E', '#B8542A', '#3D6B4A', '#8C7A3F'];

export function V2Patterns({ onOpenPattern, onOpenDNA, ghostCount = 47, onCompose }) {
  if (ghostCount < 5) return <PatternsThin count={ghostCount} onCompose={onCompose}/>;

  return (
    <div style={{
      padding: '32px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>Your patterns</V2Meta>
        <V2Display size={36} italic>The shape of your hesitation.</V2Display>
      </div>

      <p style={{
        fontFamily: V2_FONT.display,
        fontSize: 19,
        lineHeight: 1.55,
        color: V2.ink70,
        margin: 0,
        textWrap: 'pretty',
      }}>
        Across <span style={{ color: V2.ink }}>47 ghosts</span>, you hesitate out of fear more than you chase out of greed. Your patience has saved you <span style={{ color: V2.mossInk, fontStyle: 'italic' }}>$2,847</span> — and cost you <span style={{ color: V2.emberInk, fontStyle: 'italic' }}>$1,203</span>.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr',
        gap: 0,
        border: `1px solid ${V2.rule}`,
        borderRadius: 20,
        overflow: 'hidden',
        background: V2.paperDeep,
      }}>
        <NumberCell label="Saved" value="+$2,847" color={V2.mossInk} sub="Hesitation that worked"/>
        <div style={{ background: V2.rule }}/>
        <NumberCell label="Cost" value="−$1,203" color={V2.emberInk} sub="Trades you'd take back"/>
      </div>

      <YourDNASection onOpenDNA={onOpenDNA}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
        <V2Meta style={{ marginBottom: 8 }}>By pattern</V2Meta>
        <V2Rule />
        {V2_PATTERNS.map(p => (
          <React.Fragment key={p.key}>
            <PatternListRow pattern={p} onClick={() => onOpenPattern && onOpenPattern(p.key)}/>
            <V2Rule />
          </React.Fragment>
        ))}
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <V2Meta>Composition</V2Meta>
        <CompositionBar patterns={V2_PATTERNS}/>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px 14px',
          fontSize: 12, color: V2.ink70,
        }}>
          {V2_PATTERNS.map((p, i) => (
            <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 8, height: 8, borderRadius: 2,
                background: COMPOSITION_COLORS[i % COMPOSITION_COLORS.length],
              }}/>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function YourDNASection({ onOpenDNA }) {
  const archetype = DNA_ARCHETYPES[USER_DNA.code];
  if (!archetype) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
      <V2Meta>Your DNA</V2Meta>
      <V2Rule/>
      <button onClick={onOpenDNA} style={{
        width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
        padding: '18px 0', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        fontFamily: V2_FONT.sans,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{
              fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink55,
              letterSpacing: '0.06em',
            }}>{archetype.code}</span>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 22,
              color: V2.ink, letterSpacing: '-0.005em',
            }}>{archetype.name}</span>
          </div>
          <span style={{ fontSize: 13, color: V2.ink55, lineHeight: 1.4, textWrap: 'pretty' }}>
            {archetype.subtitle}
          </span>
        </div>
        <span style={{ fontSize: 14, color: V2.ink35 }}>See your DNA →</span>
      </button>
      <V2Rule/>
    </div>
  );
}

function NumberCell({ label, value, color, sub }) {
  return (
    <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <V2Meta>{label}</V2Meta>
      <div style={{
        fontFamily: V2_FONT.display,
        fontStyle: 'italic',
        fontSize: 40,
        color,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>{value}</div>
      <div style={{ fontSize: 12, color: V2.ink55, lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function PatternListRow({ pattern, onClick }) {
  const isPositive = pattern.net.startsWith('+');
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
      padding: '18px 0', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: V2_FONT.display,
            fontSize: 20,
            color: V2.ink,
            letterSpacing: '-0.005em',
          }}>{pattern.name}</span>
          <span style={{ fontSize: 12, color: V2.ink35 }}>×{pattern.count}</span>
        </div>
        <span style={{ fontSize: 13, color: V2.ink55, lineHeight: 1.4 }}>{pattern.desc}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontFamily: V2_FONT.display,
          fontStyle: 'italic',
          fontSize: 18,
          color: isPositive ? V2.mossInk : V2.emberInk,
          letterSpacing: '-0.01em',
        }}>{pattern.net}</span>
        <span style={{ fontSize: 16, color: V2.ink35 }}>→</span>
      </div>
    </button>
  );
}

function CompositionBar({ patterns }) {
  const total = patterns.reduce((s, p) => s + p.count, 0);
  return (
    <div style={{
      display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden',
      background: V2.ink08,
    }}>
      {patterns.map((p, i) => (
        <div key={p.key} style={{
          flex: p.count / total,
          background: COMPOSITION_COLORS[i % COMPOSITION_COLORS.length],
          marginRight: i < patterns.length - 1 ? 2 : 0,
        }}/>
      ))}
    </div>
  );
}
