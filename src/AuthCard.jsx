import React from 'react';
import { V2, V2_FONT, V2Meta, V2Button } from './tokens.jsx';

export function V2AuthCard({ onSignIn, onDismiss }) {
  return (
    <div style={{
      background: V2.paperDeep,
      border: 'none',
      borderRadius: 24,
      padding: '22px 22px 20px',
      display: 'flex', flexDirection: 'column', gap: 14,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <V2Meta style={{ color: V2.ink70 }}>Save your journal</V2Meta>
        <button onClick={onDismiss} aria-label="Dismiss" style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: V2_FONT.sans, fontSize: 18, color: V2.ink35,
          padding: 0, lineHeight: 1,
        }}>×</button>
      </div>
      <div style={{
        fontFamily: V2_FONT.display,
        fontSize: 20,
        lineHeight: 1.35,
        color: V2.ink,
        letterSpacing: '-0.005em',
        textWrap: 'pretty',
      }}>
        A ghost lives as long as the app does. Sign in to keep yours.
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <V2Button variant="primary" onClick={onSignIn} style={{ flex: 1 }}>
          Sign in with Apple
        </V2Button>
        <V2Button variant="ghost" onClick={onDismiss}>
          Maybe later
        </V2Button>
      </div>
    </div>
  );
}
