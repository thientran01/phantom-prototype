import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Button } from './tokens.jsx';

function Frame({ children }) {
  return (
    <div style={{
      padding: '32px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
      minHeight: '100%',
    }}>{children}</div>
  );
}

function Body({ children }) {
  return (
    <p style={{
      fontFamily: V2_FONT.display,
      fontSize: 19,
      lineHeight: 1.55,
      color: V2.ink70,
      margin: 0,
      textWrap: 'pretty',
      maxWidth: 340,
    }}>{children}</p>
  );
}

export function TodayEmpty({ onCompose }) {
  return (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <V2Meta>Tuesday · Apr 23</V2Meta>
        <div style={{
          fontFamily: V2_FONT.sans, fontSize: 13,
          color: V2.ink55, letterSpacing: '-0.005em',
        }}>Good morning, Avery.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
        <V2Display size={40} italic>The paper is blank.</V2Display>
        <Body>
          You haven't logged a ghost yet. The next trade you almost make is worth writing down — even just one line.
        </Body>
      </div>

      <div style={{ marginTop: 8 }}>
        <V2Button variant="primary" full onClick={onCompose}>
          Log your first ghost
        </V2Button>
      </div>
    </Frame>
  );
}

export function TodayQuiet({ ghostCount, onCompose, onOpenArchive }) {
  return (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <V2Meta>Tuesday · Apr 23</V2Meta>
        <div style={{
          fontFamily: V2_FONT.sans, fontSize: 13,
          color: V2.ink55, letterSpacing: '-0.005em',
        }}>Good morning, Avery.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
        <V2Display size={38} italic>Nothing to revisit yet.</V2Display>
        <Body>
          You've logged {ghostCount} ghost{ghostCount === 1 ? '' : 's'} — give them a day or two to turn into something worth re-reading.
        </Body>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <V2Rule/>
        <LedgerRow left={`${ghostCount} ghost${ghostCount === 1 ? '' : 's'} logged`} right="this week" onClick={onOpenArchive}/>
        <V2Rule/>
        <LedgerRow left="Follow-ups" right="none ready yet" onClick={null}/>
        <V2Rule/>
      </div>

      <div style={{ marginTop: 8 }}>
        <V2Button variant="ghost" full onClick={onCompose}>
          Log another ghost
        </V2Button>
      </div>
    </Frame>
  );
}

export function PatternsThin({ count, onCompose }) {
  const target = 5;
  const pct = Math.min(100, (count / target) * 100);
  return (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>Your patterns</V2Meta>
        <V2Display size={36} italic>Patterns take a minute.</V2Display>
      </div>

      <Body>
        You've logged <span style={{ color: V2.ink }}>{count} ghost{count === 1 ? '' : 's'}</span>. At {target}, Phantom starts reading the shape of your hesitation.
      </Body>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
        <div style={{
          height: 3, background: V2.ink08, borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{ width: `${pct}%`, height: '100%', background: V2.ink }}/>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: V2.ink55,
        }}>
          <span>{count} logged</span>
          <span>{target} to read</span>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <V2Button variant="ghost" full onClick={onCompose}>
          Log another ghost
        </V2Button>
      </div>
    </Frame>
  );
}

export function ArchiveEmpty({ onCompose }) {
  return (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>Archive</V2Meta>
        <V2Display size={36} italic>Nothing yet.</V2Display>
      </div>

      <Body>
        This is where ghosts live once you write them down. Start with a trade you almost made this week.
      </Body>

      <div style={{ marginTop: 8 }}>
        <V2Button variant="primary" full onClick={onCompose}>
          Log a ghost
        </V2Button>
      </div>
    </Frame>
  );
}

function LedgerRow({ left, right, onClick }) {
  return (
    <button onClick={onClick || undefined} style={{
      background: 'transparent', border: 'none',
      cursor: onClick ? 'pointer' : 'default',
      width: '100%', textAlign: 'left',
      padding: '16px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: V2_FONT.sans,
    }}>
      <span style={{ fontSize: 15, color: V2.ink, letterSpacing: '-0.005em' }}>{left}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: V2.ink55 }}>{right}</span>
        {onClick && <span style={{ fontSize: 14, color: V2.ink35 }}>→</span>}
      </span>
    </button>
  );
}
