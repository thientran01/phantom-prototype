import React from 'react';

export const V2 = {
  paper:      '#FAF6EE',
  paperDeep:  '#F2ECDE',
  paperDark:  '#1A1714',
  ink:        '#1A1714',
  ink85:      'rgba(26,23,20,0.85)',
  ink70:      'rgba(26,23,20,0.70)',
  ink55:      'rgba(26,23,20,0.55)',
  ink35:      'rgba(26,23,20,0.35)',
  ink15:      'rgba(26,23,20,0.15)',
  ink08:      'rgba(26,23,20,0.08)',
  rule:       '#E8E1D2',
  indigo:     '#2B2B6E',
  indigoInk:  '#1D1D4A',
  indigoTint: 'rgba(43,43,110,0.08)',
  moss:       '#3D6B4A',
  mossInk:    '#2A4A34',
  mossTint:   'rgba(61,107,74,0.10)',
  ember:      '#B8542A',
  emberInk:   '#8A3E1D',
  emberTint:  'rgba(184,84,42,0.10)',
  shadow:     '0 1px 2px rgba(26,23,20,0.04), 0 8px 24px rgba(26,23,20,0.06)',
};

export const V2_FONT = {
  display: '"Newsreader", "Iowan Old Style", Georgia, serif',
  sans:    '"Geist", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono:    '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

export function V2Paper({ children, style, ...rest }) {
  return (
    <div {...rest} style={{
      background: V2.paper,
      color: V2.ink,
      fontFamily: V2_FONT.sans,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}>{children}</div>
  );
}

export function V2Meta({ children, style }) {
  return (
    <div style={{
      fontFamily: V2_FONT.sans,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: V2.ink55,
      ...style,
    }}>{children}</div>
  );
}

export function V2Display({ children, size = 40, italic = false, style }) {
  return (
    <h1 style={{
      fontFamily: V2_FONT.display,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      color: V2.ink,
      margin: 0,
      fontStyle: italic ? 'italic' : 'normal',
      textWrap: 'balance',
      ...style,
    }}>{children}</h1>
  );
}

export function V2Rule({ style }) {
  return <div style={{ height: 1, background: V2.rule, ...style }}/>;
}

const GHOST_MOOD_PRESETS = {
  quiet:   { size: 22, color: V2.emberInk, rotate: 0, stroke: 1.5  },
  waiting: { size: 22, color: V2.emberInk, rotate: 0, stroke: 1.5  },
  tender:  { size: 30, color: V2.emberInk, rotate: 0, stroke: 1.6  },
  hero:    { size: 56, color: V2.emberInk, rotate: 0, stroke: 1.75 },
};

const GHOST_MARK_CSS = `
.v2-ghost-mark {
  display: inline-flex;
  line-height: 0;
  transition: transform 160ms ease;
  will-change: transform;
  transform-origin: 50% 70%;
}
.v2-ghost-mark:hover {
  transform: scale(1.08) rotate(3deg) !important;
}
.v2-ghost-mark:active {
  transform: translateY(-3px) scale(1.05) !important;
  transition-duration: 100ms;
}
.v2-ghost-mark.v2-ghost-entry {
  animation: v2-ghost-entry 260ms ease-out both;
}
.v2-ghost-mark.v2-ghost-hop {
  animation: v2-ghost-hop 520ms ease-out;
}
.v2-ghost-mark.v2-ghost-nod {
  animation: v2-ghost-nod 700ms ease-in-out;
}
@keyframes v2-ghost-entry {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: none; }
}
@keyframes v2-ghost-hop {
  0%   { transform: none; }
  35%  { transform: translateY(-7px) scale(1.08); }
  65%  { transform: translateY(2px) scale(0.97); }
  100% { transform: none; }
}
@keyframes v2-ghost-nod {
  0%, 100% { transform: none; }
  30%      { transform: rotate(5deg) translateY(-1px); }
  65%      { transform: rotate(-3deg); }
}
@media (prefers-reduced-motion: reduce) {
  .v2-ghost-mark,
  .v2-ghost-mark.v2-ghost-entry,
  .v2-ghost-mark.v2-ghost-hop,
  .v2-ghost-mark.v2-ghost-nod {
    animation: none !important;
    transition: none !important;
  }
  .v2-ghost-mark:hover,
  .v2-ghost-mark:active {
    transform: none !important;
  }
}
`;

export function emitGhostEvent(name) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(`phantom:${name}`));
  }
}

if (typeof document !== 'undefined' && !document.getElementById('v2-ghost-mark-styles')) {
  const el = document.createElement('style');
  el.id = 'v2-ghost-mark-styles';
  el.textContent = GHOST_MARK_CSS;
  document.head.appendChild(el);
}

export function V2GhostMark({ size, color, strokeWidth, mood = 'quiet', interactive = false, style, title = 'Phantom' }) {
  const preset = GHOST_MOOD_PRESETS[mood] || GHOST_MOOD_PRESETS.quiet;
  const s = size ?? preset.size;
  const c = color ?? preset.color;
  const w = strokeWidth ?? preset.stroke;

  const spanRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [cursorTilt, setCursorTilt] = React.useState(0);

  React.useEffect(() => {
    if (!interactive) return undefined;
    let raf = 0;
    let pending = null;
    const handler = (e) => {
      pending = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const evt = pending;
        if (!evt || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = evt.clientX - cx;
        const dy = evt.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const maxReach = 520;
        if (dist > maxReach) { setCursorTilt(0); return; }
        const falloff = Math.max(0, 1 - dist / maxReach);
        const tilt = Math.max(-6, Math.min(6, (dx / 28) * falloff));
        setCursorTilt(tilt);
      });
    };
    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [interactive]);

  // Event-driven reactions: hop on save, nod on resolve.
  React.useEffect(() => {
    const el = spanRef.current;
    if (!el) return undefined;
    const playOnce = (cls) => {
      el.classList.remove(cls);
      void el.offsetWidth; // restart animation
      el.classList.add(cls);
    };
    const onSaved = () => playOnce('v2-ghost-hop');
    const onResolved = () => playOnce('v2-ghost-nod');
    const onAnimEnd = (e) => {
      if (e.animationName === 'v2-ghost-hop') el.classList.remove('v2-ghost-hop');
      if (e.animationName === 'v2-ghost-nod') el.classList.remove('v2-ghost-nod');
    };
    window.addEventListener('phantom:saved', onSaved);
    window.addEventListener('phantom:resolved', onResolved);
    el.addEventListener('animationend', onAnimEnd);
    return () => {
      window.removeEventListener('phantom:saved', onSaved);
      window.removeEventListener('phantom:resolved', onResolved);
      el.removeEventListener('animationend', onAnimEnd);
    };
  }, []);

  const innerRotate = (preset.rotate || 0) + cursorTilt;

  return (
    <span ref={spanRef} className="v2-ghost-mark v2-ghost-entry" style={style}>
      <svg
        ref={svgRef}
        role="img"
        aria-label={title}
        width={s}
        height={s * (24 / 22)}
        viewBox="0 0 22 24"
        fill="none"
        stroke={c}
        strokeWidth={w}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          display: 'block',
          transform: innerRotate ? `rotate(${innerRotate}deg)` : undefined,
          transformOrigin: '50% 60%',
          transition: interactive ? 'transform 120ms ease-out' : undefined,
        }}
      >
        <path d="M3 11 A8 8 0 0 1 19 11 L19 20 Q17 23.5 15 20 Q13 23.5 11 20 Q9 23.5 7 20 Q5 23.5 3 20 Z"/>
      </svg>
    </span>
  );
}

export function V2Ticker({ children, color = V2.ink }) {
  return (
    <span style={{
      fontFamily: V2_FONT.mono,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.02em',
      color,
    }}>{children}</span>
  );
}

export function V2Button({ children, onClick, variant = 'primary', full, style }) {
  const palette = {
    primary: { bg: V2.ink, color: V2.paper, border: 'none' },
    ghost:   { bg: 'transparent', color: V2.ink, border: `1px solid ${V2.ink15}` },
    paper:   { bg: V2.paperDeep, color: V2.ink, border: 'none' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      fontFamily: V2_FONT.sans,
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      padding: '14px 20px',
      borderRadius: 999,
      cursor: 'pointer',
      background: palette.bg,
      color: palette.color,
      border: palette.border,
      width: full ? '100%' : 'auto',
      transition: 'opacity 140ms ease',
      ...style,
    }}>{children}</button>
  );
}

export function V2Spectrum({ leftLabel, rightLabel, leftLetter, rightLetter, position, activeSide = 'left' }) {
  const pct = Math.max(4, Math.min(96, position));
  const inkColor = V2.ink;
  const metaColor = V2.ink55;
  const trackColor = V2.rule;
  const fillColor = V2.indigo;
  const dotBg = V2.paper;
  const activeLetter = activeSide === 'left' ? leftLetter : rightLetter;
  const leftWeight = activeSide === 'left' ? 600 : 400;
  const rightWeight = activeSide === 'right' ? 600 : 400;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: V2_FONT.sans }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: V2_FONT.sans, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: activeSide === 'left' ? inkColor : metaColor,
        }}>
          <span style={{ fontFamily: V2_FONT.mono, fontWeight: leftWeight, marginRight: 8 }}>{leftLetter}</span>
          {leftLabel}
        </span>
        <span style={{
          fontFamily: V2_FONT.sans, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: activeSide === 'right' ? inkColor : metaColor,
        }}>
          {rightLabel}
          <span style={{ fontFamily: V2_FONT.mono, fontWeight: rightWeight, marginLeft: 8 }}>{rightLetter}</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: 2, background: trackColor, borderRadius: 1 }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: activeSide === 'left' ? 0 : `${pct}%`,
          right: activeSide === 'left' ? `${100 - pct}%` : 0,
          background: fillColor,
          borderRadius: 1,
        }}/>
        <div style={{
          position: 'absolute', top: '50%',
          left: `calc(${pct}% - 11px)`,
          transform: 'translateY(-50%)',
          width: 22, height: 22,
          borderRadius: 999,
          background: dotBg,
          border: `1.5px solid ${fillColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: V2_FONT.mono, fontSize: 11, fontWeight: 600,
          color: fillColor,
        }}>{activeLetter}</div>
      </div>
    </div>
  );
}

export function V2Tag({ children, tone = 'neutral' }) {
  const palette = {
    neutral: { bg: V2.ink08, color: V2.ink70 },
    indigo:  { bg: V2.indigoTint, color: V2.indigo },
    moss:    { bg: V2.mossTint, color: V2.mossInk },
    ember:   { bg: V2.emberTint, color: V2.emberInk },
  }[tone];
  return (
    <span style={{
      fontFamily: V2_FONT.sans,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: 999,
      background: palette.bg,
      color: palette.color,
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
    }}>{children}</span>
  );
}
