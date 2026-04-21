import React from 'react';
import { V2, V2_FONT, V2Meta } from './tokens.jsx';

export function V2Followup({ onBack, onResolve }) {
  const [resolved, setResolved] = React.useState(null);

  return (
    <div style={{
      background: V2.paperDark,
      color: V2.paper,
      minHeight: '100%',
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 36,
      fontFamily: V2_FONT.sans,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'rgba(250,246,238,0.55)', fontFamily: V2_FONT.sans,
          fontSize: 15, padding: 0, letterSpacing: '-0.005em',
        }}>← Close</button>
        <span style={{
          fontFamily: V2_FONT.sans, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(250,246,238,0.55)',
        }}>A Follow-Up</span>
        <span style={{ width: 40 }}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 12 }}>
        <div style={{
          fontFamily: V2_FONT.mono, fontSize: 11,
          color: 'rgba(250,246,238,0.5)', letterSpacing: '0.08em',
        }}>Apr 21 · 2 days ago</div>

        <div style={{
          fontFamily: V2_FONT.display,
          fontSize: 30,
          fontStyle: 'italic',
          lineHeight: 1.25,
          color: V2.paper,
          letterSpacing: '-0.01em',
          textWrap: 'balance',
        }}>
          You almost bought <span style={{ fontFamily: V2_FONT.mono, fontStyle: 'normal', fontSize: 24, letterSpacing: 0 }}>AAPL</span> at $182.
        </div>

        <div style={{
          fontFamily: V2_FONT.display,
          fontSize: 18,
          lineHeight: 1.55,
          color: 'rgba(250,246,238,0.75)',
          textWrap: 'pretty',
        }}>
          You wrote: <span style={{ fontStyle: 'italic' }}>"Earnings next week — don't know if I'm late. Probably safer to wait."</span>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(250,246,238,0.12)',
        borderBottom: '1px solid rgba(250,246,238,0.12)',
        padding: '28px 0',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <V2Meta style={{ color: 'rgba(250,246,238,0.55)' }}>Today, it's at $189</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display,
          fontStyle: 'italic',
          fontSize: 72,
          color: '#E7A57A',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>+$412</div>
        <div style={{
          fontSize: 14,
          color: 'rgba(250,246,238,0.6)',
          lineHeight: 1.5,
        }}>
          you would have made on a <span style={{ color: V2.paper }}>$1,000</span> position.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 19, color: V2.paper, lineHeight: 1.45,
        }}>How do you feel about it now?</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ResolveChoice
            label="That's a regret"
            sub="I should have trusted it."
            selected={resolved === 'regret'}
            onClick={() => setResolved('regret')}
          />
          <ResolveChoice
            label="I'm at peace with it"
            sub="Same call, I'd still pass."
            selected={resolved === 'peace'}
            onClick={() => setResolved('peace')}
          />
        </div>
      </div>

      <button
        onClick={() => resolved && onResolve(resolved)}
        disabled={!resolved}
        style={{
          marginTop: 'auto',
          fontFamily: V2_FONT.sans,
          fontSize: 15, fontWeight: 500,
          padding: '16px 20px',
          borderRadius: 999,
          border: 'none',
          cursor: resolved ? 'pointer' : 'default',
          background: resolved ? V2.paper : 'rgba(250,246,238,0.12)',
          color: resolved ? V2.ink : 'rgba(250,246,238,0.4)',
          transition: 'background 160ms ease, color 160ms ease',
        }}>
        Save to memory
      </button>
    </div>
  );
}

function ResolveChoice({ label, sub, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', cursor: 'pointer',
      background: selected ? 'rgba(250,246,238,0.08)' : 'transparent',
      border: `1px solid ${selected ? 'rgba(250,246,238,0.3)' : 'rgba(250,246,238,0.15)'}`,
      borderRadius: 16,
      padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 4,
      fontFamily: V2_FONT.sans,
      transition: 'background 160ms ease, border-color 160ms ease',
    }}>
      <span style={{
        fontFamily: V2_FONT.display, fontSize: 17,
        color: V2.paper, letterSpacing: '-0.005em',
      }}>{label}</span>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 13, color: 'rgba(250,246,238,0.55)',
      }}>{sub}</span>
    </button>
  );
}
