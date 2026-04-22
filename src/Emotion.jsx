import React from 'react';
import { V2, V2_FONT, V2Meta, V2Button } from './tokens.jsx';

// Compass maps a 2D point to (valence, arousal) both in [-1, 1].
//   valence: -1 = FEAR,          +1 = GREED      (x-axis)
//   arousal: -1 = CALM,          +1 = HIGH STRESS (y-axis, top is positive)
//
// Used as a post-log emotional coda: the user places a single dot to stamp
// how the ghost felt in the body. Skippable. Later renders read-only in
// GhostDetail as a mini compass.

const LABEL_STYLE = {
  fontFamily: V2_FONT.sans,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: V2.ink55,
  userSelect: 'none',
  pointerEvents: 'none',
};

function quadrantLabel(valence, arousal) {
  const v = valence > 0 ? 'Greed' : 'Fear';
  const a = arousal > 0 ? 'High stress' : 'Calm';
  return `${a} · ${v}`;
}

export function V2Emotion({ ghostId, initialEmotion, mode = 'post-log', onSave, onSkip, onBack }) {
  const panelRef = React.useRef(null);
  const [pos, setPos] = React.useState(() => {
    if (initialEmotion && typeof initialEmotion.valence === 'number') {
      // Convert valence/arousal (-1..1) to panel pct (0..1). Arousal inverted: +1 → top (0%).
      return {
        x: (initialEmotion.valence + 1) / 2,
        y: (1 - initialEmotion.arousal) / 2,
        placed: true,
      };
    }
    return { x: 0.5, y: 0.5, placed: false };
  });

  const updateFromEvent = React.useCallback((e) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const cx = Math.max(0, Math.min(1, x));
    const cy = Math.max(0, Math.min(1, y));
    setPos({ x: cx, y: cy, placed: true });
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    const el = panelRef.current;
    if (el && el.setPointerCapture) {
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }
    updateFromEvent(e);
  };
  const onPointerMove = (e) => {
    if (!(e.buttons > 0) && e.pointerType === 'mouse') return;
    updateFromEvent(e);
  };
  const onPointerUp = (e) => {
    const el = panelRef.current;
    if (el && el.releasePointerCapture) {
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    }
  };

  const toEmotion = () => {
    if (!pos.placed) return null;
    return {
      valence: +(pos.x * 2 - 1).toFixed(3),
      arousal: +(1 - pos.y * 2).toFixed(3),
    };
  };

  const commit = () => {
    const emotion = toEmotion();
    if (emotion && onSave) onSave(emotion);
    else if (onSkip) onSkip();
  };

  const skip = () => {
    if (onSkip) onSkip();
  };

  const currentQuad = pos.placed
    ? quadrantLabel(pos.x * 2 - 1, 1 - pos.y * 2)
    : null;

  return (
    <div style={{
      padding: '20px 28px 32px',
      display: 'flex', flexDirection: 'column', gap: 20,
      fontFamily: V2_FONT.sans, minHeight: '100%',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: V2_FONT.sans, fontSize: 15, color: V2.ink55,
          padding: 0, letterSpacing: '-0.005em',
        }}>{mode === 'edit' ? '← Back' : 'Skip'}</button>
        <V2Meta>{mode === 'edit' ? 'Edit emotion' : 'Ghost logged'}</V2Meta>
        <span style={{ width: 40 }}/>
      </div>

      {/* Title block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{
          fontFamily: V2_FONT.display,
          fontStyle: 'italic',
          fontSize: 30, fontWeight: 400, lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: V2.ink, margin: 0,
          textWrap: 'balance',
        }}>How did it feel?</h1>
        <p style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 15, lineHeight: 1.5, color: V2.ink55,
          margin: 0, textWrap: 'pretty',
        }}>
          Place a dot where the ghost lived in your body.
        </p>
      </div>

      {/* Compass panel */}
      <div
        ref={panelRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          background: V2.paperDeep,
          border: `1px solid ${V2.ink15}`,
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'crosshair',
          touchAction: 'none',
        }}
      >
        {/* Axis lines */}
        <div style={{
          position: 'absolute', left: 20, right: 20, top: '50%',
          height: 1, background: V2.ink15,
          transform: 'translateY(-0.5px)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: 20, bottom: 20, left: '50%',
          width: 1, background: V2.ink15,
          transform: 'translateX(-0.5px)',
          pointerEvents: 'none',
        }}/>

        {/* Labels */}
        <div style={{
          ...LABEL_STYLE,
          position: 'absolute', top: 12, left: '50%',
          transform: 'translateX(-50%)',
          background: V2.paperDeep,
          padding: '2px 6px',
        }}>High Stress</div>
        <div style={{
          ...LABEL_STYLE,
          position: 'absolute', bottom: 12, left: '50%',
          transform: 'translateX(-50%)',
          background: V2.paperDeep,
          padding: '2px 6px',
        }}>Calm</div>
        <div style={{
          ...LABEL_STYLE,
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)',
          background: V2.paperDeep,
          padding: '2px 6px',
        }}>Fear</div>
        <div style={{
          ...LABEL_STYLE,
          position: 'absolute', right: 12, top: '50%',
          transform: 'translateY(-50%)',
          background: V2.paperDeep,
          padding: '2px 6px',
        }}>Greed</div>

        {/* Dot */}
        <div style={{
          position: 'absolute',
          left: `${pos.x * 100}%`,
          top: `${pos.y * 100}%`,
          width: 20, height: 20,
          marginLeft: -10, marginTop: -10,
          borderRadius: 999,
          background: V2.emberInk,
          opacity: pos.placed ? 1 : 0.35,
          boxShadow: pos.placed ? '0 1px 2px rgba(26,23,20,0.12)' : 'none',
          transition: 'opacity 180ms ease, box-shadow 180ms ease',
          pointerEvents: 'none',
        }}/>
      </div>

      {/* Quadrant readout / hint line */}
      <div style={{
        minHeight: 22,
        fontFamily: V2_FONT.display,
        fontStyle: 'italic',
        fontSize: 15,
        lineHeight: 1.4,
        color: V2.ink70,
        textAlign: 'center',
        textWrap: 'balance',
      }}>
        {currentQuad
          ? currentQuad
          : <span style={{ color: V2.ink35 }}>Tap anywhere in the square.</span>}
      </div>

      {/* Footer: Skip link + Save button */}
      <div style={{
        marginTop: 'auto',
        display: 'flex', flexDirection: 'column', gap: 10,
        alignItems: 'center',
      }}>
        {mode !== 'edit' && (
          <button onClick={skip} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 14, color: V2.ink55, padding: 6,
            letterSpacing: '-0.005em',
          }}>Skip for now</button>
        )}
        <V2Button
          variant="primary"
          full
          onClick={commit}
          style={{
            opacity: pos.placed ? 1 : 0.35,
            pointerEvents: pos.placed ? 'auto' : 'none',
          }}
        >
          Save
        </V2Button>
      </div>
    </div>
  );
}

// Read-only miniature for use in GhostDetail.
export function V2EmotionMini({ emotion, size = 120 }) {
  if (!emotion) return null;
  const x = (emotion.valence + 1) / 2;
  const y = (1 - emotion.arousal) / 2;
  return (
    <div style={{
      position: 'relative',
      width: size, height: size,
      background: V2.paperDeep,
      border: `1px solid ${V2.ink15}`,
      borderRadius: 12,
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', left: 8, right: 8, top: '50%',
        height: 1, background: V2.ink15,
        transform: 'translateY(-0.5px)',
      }}/>
      <div style={{
        position: 'absolute', top: 8, bottom: 8, left: '50%',
        width: 1, background: V2.ink15,
        transform: 'translateX(-0.5px)',
      }}/>
      <div style={{
        position: 'absolute',
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: 12, height: 12,
        marginLeft: -6, marginTop: -6,
        borderRadius: 999,
        background: V2.emberInk,
        boxShadow: '0 1px 2px rgba(26,23,20,0.12)',
      }}/>
    </div>
  );
}

export function emotionQuadrantLabel(emotion) {
  if (!emotion) return null;
  return quadrantLabel(emotion.valence, emotion.arousal);
}
