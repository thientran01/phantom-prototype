import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Ticker, V2Button, V2GhostMark } from './tokens.jsx';
import { TodayEmpty, TodayQuiet } from './emptyStates.jsx';
import { V2AuthCard } from './AuthCard.jsx';

export function V2Today({
  demoLevel = 'warm',
  ghostCount = 47,
  hasFollowup = true,
  showAuthCard = false,
  pendingGhost = null,
  onSignIn,
  onDismissAuth,
  onCompose, onOpenFollowup, onOpenPatterns, onOpenArchive, onOpenDNA, onOpenGhost,
}) {
  if (demoLevel === 'cold' && !pendingGhost) return <TodayEmpty onCompose={onCompose}/>;
  if (demoLevel !== 'warm' && !pendingGhost) return <TodayQuiet ghostCount={ghostCount} onCompose={onCompose} onOpenArchive={onOpenArchive}/>;

  return (
    <div style={{
      padding: '32px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 32,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <V2Meta>Tuesday · Apr 23</V2Meta>
          <div style={{
            fontFamily: V2_FONT.sans,
            fontSize: 13,
            color: V2.ink55,
            letterSpacing: '-0.005em',
          }}>Good morning, Avery.</div>
        </div>
        <V2GhostMark/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
        {pendingGhost ? (
          <>
            <V2Display size={38} italic>
              {pendingGhost.ago === 'today' ? 'You just wrote about' : 'You wrote about'} <span style={{ fontStyle: 'normal', fontFamily: V2_FONT.mono, fontSize: 30, letterSpacing: 0 }}>{pendingGhost.ticker}</span>.
            </V2Display>
            <div style={{
              fontFamily: V2_FONT.display,
              fontSize: 19,
              lineHeight: 1.5,
              color: V2.ink70,
              maxWidth: 320,
              textWrap: 'pretty',
            }}>
              Come back in a day or two. The market will have said something by then.
            </div>
          </>
        ) : (
          <>
            <V2Display size={38} italic>
              Yesterday you almost sold <span style={{ fontStyle: 'normal', fontFamily: V2_FONT.mono, fontSize: 30, letterSpacing: 0 }}>MSFT</span>.
            </V2Display>
            <div style={{
              fontFamily: V2_FONT.display,
              fontSize: 19,
              lineHeight: 1.5,
              color: V2.ink70,
              maxWidth: 320,
              textWrap: 'pretty',
            }}>
              You held. It's up 2.4% today — about <span style={{ color: V2.mossInk, fontWeight: 500 }}>$47</span> you didn't walk away from.
            </div>
          </>
        )}
      </div>

      {showAuthCard && (
        <V2AuthCard onSignIn={onSignIn} onDismiss={onDismissAuth}/>
      )}

      {pendingGhost ? (
        <button onClick={() => onOpenGhost && onOpenGhost(pendingGhost.id)} style={{
          textAlign: 'left', cursor: 'pointer',
          background: V2.paperDeep,
          border: 'none',
          borderRadius: 24,
          padding: '24px 24px 22px',
          display: 'flex', flexDirection: 'column', gap: 14,
          fontFamily: V2_FONT.sans,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <V2GhostMark mood="waiting"/>
              <V2Meta style={{ color: V2.ink70 }}>Still open</V2Meta>
            </div>
            <span style={{ fontSize: 18, color: V2.ink35, lineHeight: 1 }}>→</span>
          </div>
          <div style={{
            fontFamily: V2_FONT.display,
            fontSize: 24,
            lineHeight: 1.25,
            color: V2.ink,
            letterSpacing: '-0.005em',
          }}>
            You wrote about <V2Ticker>{pendingGhost.ticker}</V2Ticker> {pendingGhost.ago}.
          </div>
          <div style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 17, color: V2.ink55,
          }}>
            The market hasn't answered yet.
          </div>
        </button>
      ) : (
        <button onClick={onOpenFollowup} style={{
          textAlign: 'left', cursor: 'pointer',
          background: V2.paperDeep,
          border: 'none',
          borderRadius: 24,
          padding: '24px 24px 22px',
          display: 'flex', flexDirection: 'column', gap: 14,
          fontFamily: V2_FONT.sans,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <V2Meta style={{ color: V2.ink70 }}>A ghost is ready</V2Meta>
            <span style={{ fontSize: 18, color: V2.ink35, lineHeight: 1 }}>→</span>
          </div>
          <div style={{
            fontFamily: V2_FONT.display,
            fontSize: 24,
            lineHeight: 1.25,
            color: V2.ink,
            letterSpacing: '-0.005em',
          }}>
            Two days ago, you almost bought <V2Ticker>AAPL</V2Ticker> at $182.
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{
              fontFamily: V2_FONT.display,
              fontStyle: 'italic',
              fontSize: 44,
              color: V2.emberInk,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>+$412</span>
            <span style={{ fontSize: 13, color: V2.ink55 }}>you would have made</span>
          </div>
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <V2Rule />
        <LedgerRow left="3 ghosts logged" right="this week" onClick={onOpenArchive}/>
        <V2Rule />
        <LedgerRow left="1 follow-up" right="ready to read" onClick={onOpenFollowup}/>
        <V2Rule />
        <LedgerRow left="Your patterns" right="updated" onClick={onOpenPatterns}/>
        <V2Rule />
        <LedgerRow left="Your DNA" right="Watchman · DGRS" onClick={onOpenDNA}/>
        <V2Rule />
      </div>

      <div style={{ marginTop: 8 }}>
        <V2Button variant="primary" full onClick={onCompose}>
          Log a ghost
        </V2Button>
      </div>
    </div>
  );
}

function LedgerRow({ left, right, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 'none', cursor: 'pointer',
      width: '100%', textAlign: 'left',
      padding: '16px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: V2_FONT.sans,
    }}>
      <span style={{ fontSize: 15, color: V2.ink, letterSpacing: '-0.005em' }}>{left}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: V2.ink55 }}>{right}</span>
        <span style={{ fontSize: 14, color: V2.ink35 }}>→</span>
      </span>
    </button>
  );
}
