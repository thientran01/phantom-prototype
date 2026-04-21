import React from 'react';
import { V2, V2_FONT } from './tokens.jsx';

export const V2_TABS = [
  { k: 'today',    label: 'Today' },
  { k: 'patterns', label: 'Patterns' },
  { k: 'archive',  label: 'Archive' },
  { k: 'you',      label: 'You' },
];

export function V2BottomBar({ tab, onTab, onCompose }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '10px 20px 28px',
      background: `linear-gradient(180deg, rgba(250,246,238,0) 0%, ${V2.paper} 40%)`,
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{
        flex: 1,
        background: V2.paper,
        border: `1px solid ${V2.ink08}`,
        borderRadius: 999,
        padding: '4px',
        display: 'flex',
        boxShadow: V2.shadow,
      }}>
        {V2_TABS.map(t => {
          const active = tab === t.k;
          return (
            <button key={t.k} onClick={() => onTab(t.k)} style={{
              flex: 1,
              border: 'none',
              background: active ? V2.ink : 'transparent',
              color: active ? V2.paper : V2.ink55,
              fontFamily: V2_FONT.sans,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              padding: '10px 0',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'background 160ms ease, color 160ms ease',
            }}>{t.label}</button>
          );
        })}
      </div>
      <button onClick={onCompose} aria-label="Log a ghost" style={{
        width: 52, height: 52, borderRadius: 999,
        background: V2.ink, color: V2.paper,
        border: 'none', cursor: 'pointer',
        fontFamily: V2_FONT.display,
        fontSize: 28, fontWeight: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: V2.shadow,
        lineHeight: 1,
        paddingBottom: 4,
      }}>+</button>
    </div>
  );
}
