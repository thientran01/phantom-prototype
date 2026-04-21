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
  quiet:    { size: 22, color: V2.ink55, rotate: 0,  stroke: 1.25 },
  speaking: { size: 20, color: V2.ink,   rotate: 0,  stroke: 1.3  },
  waiting:  { size: 22, color: V2.ink55, rotate: -5, stroke: 1.25 },
  tender:   { size: 30, color: V2.ink,   rotate: 0,  stroke: 1.35 },
  hero:     { size: 56, color: V2.ink,   rotate: 0,  stroke: 1.5  },
};

export function V2GhostMark({ size, color, strokeWidth, mood = 'quiet', style, title = 'Phantom' }) {
  const preset = GHOST_MOOD_PRESETS[mood] || GHOST_MOOD_PRESETS.quiet;
  const s = size ?? preset.size;
  const c = color ?? preset.color;
  const w = strokeWidth ?? preset.stroke;
  return (
    <svg
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
        transform: preset.rotate ? `rotate(${preset.rotate}deg)` : undefined,
        transformOrigin: '50% 60%',
        ...style,
      }}
    >
      <path d="M3 11 A8 8 0 0 1 19 11 L19 20 Q17 23.5 15 20 Q13 23.5 11 20 Q9 23.5 7 20 Q5 23.5 3 20 Z"/>
    </svg>
  );
}

export function V2PhantomSays({ children, mood = 'speaking', align = 'start', style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      ...style,
    }}>
      <span style={{ flexShrink: 0, paddingTop: 3 }}>
        <V2GhostMark mood={mood}/>
      </span>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 15, lineHeight: 1.5, color: V2.ink70,
        textWrap: 'pretty', maxWidth: 320,
      }}>{children}</span>
    </div>
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

export function V2Spectrum({ leftLabel, rightLabel, leftLetter, rightLetter, position, activeSide = 'left', dark = false }) {
  const pct = Math.max(4, Math.min(96, position));
  const inkColor = dark ? 'rgba(250,246,238,0.92)' : V2.ink;
  const metaColor = dark ? 'rgba(250,246,238,0.55)' : V2.ink55;
  const trackColor = dark ? 'rgba(250,246,238,0.15)' : V2.rule;
  const fillColor = dark ? '#E7A57A' : V2.indigo;
  const dotBg = dark ? V2.paper : V2.paper;
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
          left: `calc(${pct}% - 14px)`,
          transform: 'translateY(-50%)',
          width: 28, height: 28,
          borderRadius: 999,
          background: dotBg,
          border: `1.5px solid ${fillColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: V2_FONT.mono, fontSize: 12, fontWeight: 600,
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
