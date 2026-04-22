import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Button, V2Tag } from './tokens.jsx';

const V2_YOU_STATS = [
  { label: '47', sub: 'ghosts' },
  { label: '$2.8k', sub: 'saved' },
  { label: '$1.2k', sub: 'cost' },
  { label: '68%',   sub: 'held' },
];

export function V2You({ onOpenStyle, onResetOnboarding, onExport, onSignOut, userGhosts = [] }) {
  return (
    <div style={{
      padding: '32px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>You</V2Meta>
        <V2Display size={36} italic>Avery Chen</V2Display>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 0,
        border: `1px solid ${V2.rule}`,
        borderRadius: 20, overflow: 'hidden',
        background: V2.paperDeep,
      }}>
        {V2_YOU_STATS.map((s, i) => (
          <div key={i} style={{
            padding: '22px 22px',
            borderRight: i % 2 === 0 ? `1px solid ${V2.rule}` : 'none',
            borderTop: i >= 2 ? `1px solid ${V2.rule}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 28, color: V2.ink, letterSpacing: '-0.01em',
            }}>{s.label}</span>
            <V2Meta>{s.sub}</V2Meta>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <V2Rule />
        <YouRow label="Follow-ups" right="2 days after log" informational/>
        <V2Rule />
        <YouRow label="Notifications" right="Quiet hours 10pm–8am" informational/>
        <V2Rule />
        <YouRow label="Export journal" right="CSV" onClick={onExport}/>
        <V2Rule />
        <YouRow label="Style index" right="peek" onClick={onOpenStyle}/>
        <V2Rule />
        {onResetOnboarding && (
          <>
            <YouRow label="Replay onboarding" right="cover → first ghost" onClick={onResetOnboarding}/>
            <V2Rule />
          </>
        )}
        <YouRow label="Sign out" right="" onClick={onSignOut}/>
        <V2Rule />
      </div>

    </div>
  );
}

function YouRow({ label, right, onClick, informational }) {
  const interactive = !!onClick && !informational;
  return (
    <button onClick={interactive ? onClick : undefined} disabled={!interactive} style={{
      background: 'transparent', border: 'none', cursor: interactive ? 'pointer' : 'default',
      width: '100%', textAlign: 'left',
      padding: '16px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: V2_FONT.sans,
    }}>
      <span style={{ fontSize: 15, color: V2.ink, letterSpacing: '-0.005em' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {right && <span style={{ fontSize: 13, color: V2.ink55 }}>{right}</span>}
        {interactive && <span style={{ fontSize: 14, color: V2.ink35 }}>→</span>}
      </span>
    </button>
  );
}

export function V2StyleIndex({ onBack }) {
  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: V2.ink55, fontFamily: V2_FONT.sans, fontSize: 15, padding: 0,
        }}>← Back</button>
        <V2Meta>Style index</V2Meta>
        <span style={{ width: 40 }}/>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <V2Meta>Type</V2Meta>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 36, lineHeight: 1.1, color: V2.ink }}>Newsreader italic</div>
          <V2Meta>Display — confessional moments</V2Meta>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: V2_FONT.sans, fontSize: 20, fontWeight: 500, color: V2.ink, letterSpacing: '-0.01em' }}>Geist Medium</div>
          <V2Meta>UI — buttons, labels, tabs</V2Meta>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: V2_FONT.mono, fontSize: 14, color: V2.ink }}>Geist Mono — AAPL · MSFT · NVDA</div>
          <V2Meta>Mono — tickers & metadata</V2Meta>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <V2Meta>Color</V2Meta>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Swatch color={V2.paper}     name="Paper"      hex="#FAF6EE" border/>
          <Swatch color={V2.paperDeep} name="Paper deep" hex="#F2ECDE" border/>
          <Swatch color={V2.ink}       name="Ink"        hex="#1A1714" light/>
          <Swatch color={V2.indigo}    name="Indigo"     hex="#2B2B6E" light/>
          <Swatch color={V2.mossInk}   name="Moss"       hex="#2A4A34" light/>
          <Swatch color={V2.emberInk}  name="Ember"      hex="#8A3E1D" light/>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <V2Meta>Components</V2Meta>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <V2Tag tone="indigo">Fear of Loss</V2Tag>
          <V2Tag tone="moss">Long</V2Tag>
          <V2Tag tone="ember">Short</V2Tag>
          <V2Tag tone="neutral">Held</V2Tag>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <V2Button variant="primary">Log a ghost</V2Button>
          <V2Button variant="paper">Cancel</V2Button>
          <V2Button variant="ghost">Skip</V2Button>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>Principles</V2Meta>
        <p style={{ fontFamily: V2_FONT.display, fontSize: 16, lineHeight: 1.55, color: V2.ink70, margin: 0 }}>
          One color story: warm paper, deep ink. Serif italic for human moments. Sans and mono for data. No drop-shadows stacked on cards; hairlines, not borders. Prefer type hierarchy to boxes.
        </p>
      </section>
    </div>
  );
}

function Swatch({ color, name, hex, border, light }) {
  return (
    <div style={{
      background: color,
      borderRadius: 14,
      padding: '14px 14px 12px',
      border: border ? `1px solid ${V2.rule}` : 'none',
      display: 'flex', flexDirection: 'column', gap: 2,
      minHeight: 76,
      justifyContent: 'flex-end',
    }}>
      <span style={{
        fontFamily: V2_FONT.sans, fontSize: 13, fontWeight: 500,
        color: light ? V2.paper : V2.ink,
      }}>{name}</span>
      <span style={{
        fontFamily: V2_FONT.mono, fontSize: 11,
        color: light ? 'rgba(250,246,238,0.6)' : V2.ink55,
      }}>{hex}</span>
    </div>
  );
}
