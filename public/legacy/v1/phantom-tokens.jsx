// phantom-tokens.jsx — design tokens + shared primitives
// Ported from rlearned/phantom ios/DesignSystem (Colors.swift + Typography.swift)

const PHANTOM = {
  purple:        '#3803B1',
  purpleGrad:    '#7B61FF',
  lavender:      '#A49EF4',
  lightPurple:   '#F1F0FB',
  borderPurple:  '#E2E4FB',
  card:          '#E2E4FB',
  white:         '#FFFFFF',
  black:         '#000000',
  textPrimary:   '#000000',
  textSecondary: 'rgba(0,0,0,0.67)',
  textTertiary:  'rgba(0,0,0,0.50)',
  tagBg:         'rgba(56,3,177,0.10)',
  tagBorder:     'rgba(56,3,177,0.15)',
  inputBorder:   '#EDF1F3',
  separator:     '#EFF0F6',
  gray:          '#6C7278',
  lightGray:     '#ACB5BB',
  darkGray:      '#3C3D3B',
  green:         '#0BAA36',
  red:           '#D92D20',
};

const TYPE = {
  family: "'DM Sans', system-ui, -apple-system, sans-serif",
  largeTitle:    { fontSize: 40, fontWeight: 700, lineHeight: 1.1 },
  title:         { fontSize: 32, fontWeight: 600, lineHeight: 1.15 },
  titleBold:     { fontSize: 32, fontWeight: 700, lineHeight: 1.15 },
  headline:      { fontSize: 24, fontWeight: 400, lineHeight: 1.25 },
  headlineBold:  { fontSize: 26, fontWeight: 700, lineHeight: 1.2 },
  subheadline:   { fontSize: 20, fontWeight: 300, lineHeight: 1.4 },
  subheadlineM:  { fontSize: 20, fontWeight: 500, lineHeight: 1.4 },
  body:          { fontSize: 18, fontWeight: 400, lineHeight: 1.5 },
  bodyMed:       { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
  bodySmall:     { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
  bodySmallSB:   { fontSize: 14, fontWeight: 600, lineHeight: 1.5 },
  bodySmallM:    { fontSize: 14, fontWeight: 500, lineHeight: 1.5 },
  caption:       { fontSize: 14, fontWeight: 300, lineHeight: 1.4 },
  small:         { fontSize: 12, fontWeight: 400, lineHeight: 1.4 },
  smallM:        { fontSize: 12, fontWeight: 500, lineHeight: 1.4 },
  smallSB:       { fontSize: 12, fontWeight: 600, lineHeight: 1.4 },
};

// ─────────────────────────────────────────────────────────────
// Screen — outer wrapper with status bar clearance
// ─────────────────────────────────────────────────────────────
function Screen({ children, bg = PHANTOM.white, pad = true, style = {} }) {
  return (
    <div style={{
      background: bg,
      minHeight: '100%',
      paddingTop: 56,
      paddingLeft: pad ? 24 : 0,
      paddingRight: pad ? 24 : 0,
      paddingBottom: 120,
      fontFamily: TYPE.family,
      color: PHANTOM.textPrimary,
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhantomButton — primary (gradient) / secondary / destructive
// ─────────────────────────────────────────────────────────────
function PhantomButton({ title, onClick, style: variant = 'primary', fullWidth = true, disabled = false, leadingIcon, children }) {
  const base = {
    fontFamily: TYPE.family,
    fontSize: 16, fontWeight: 600,
    padding: '16px 20px',
    borderRadius: 14,
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    opacity: disabled ? 0.45 : 1,
    transition: 'transform 120ms ease, box-shadow 120ms ease',
  };
  const variants = {
    primary: {
      background: `linear-gradient(180deg, ${PHANTOM.purple} 0%, ${PHANTOM.purpleGrad} 100%)`,
      color: PHANTOM.white,
      boxShadow: '0 2px 10px rgba(56,3,177,0.25)',
    },
    secondary: {
      background: PHANTOM.white,
      color: PHANTOM.purple,
      border: `1.5px solid ${PHANTOM.purple}`,
    },
    ghost: {
      background: 'transparent',
      color: PHANTOM.purple,
      border: `1px solid ${PHANTOM.borderPurple}`,
    },
    destructive: {
      background: PHANTOM.white,
      color: PHANTOM.red,
      border: `1px solid rgba(217,45,32,0.25)`,
    },
    social: {
      background: PHANTOM.white,
      color: PHANTOM.textPrimary,
      border: `1px solid ${PHANTOM.inputBorder}`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>
      {leadingIcon}{title || children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Card — white rounded, hairline border + subtle shadow
// ─────────────────────────────────────────────────────────────
function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: PHANTOM.white,
      border: `1px solid ${PHANTOM.inputBorder}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhantomTextField — email/password/search
// ─────────────────────────────────────────────────────────────
function PhantomTextField({ placeholder, type = 'text', value, onChange, leading, trailing, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: PHANTOM.white,
      border: `1px solid ${PHANTOM.inputBorder}`,
      borderRadius: 14,
      padding: '14px 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      ...style,
    }}>
      {leading && <span style={{ display: 'flex', color: PHANTOM.gray }}>{leading}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: TYPE.family, fontSize: 15, color: PHANTOM.textPrimary,
        }}
      />
      {trailing && <span style={{ display: 'flex', color: PHANTOM.gray }}>{trailing}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tag — selectable chip (purple when active)
// ─────────────────────────────────────────────────────────────
function Tag({ label, active = false, onClick, leading, trailing }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 12px',
      borderRadius: 999,
      background: active ? PHANTOM.purple : PHANTOM.tagBg,
      color: active ? PHANTOM.white : PHANTOM.purple,
      border: `1px solid ${active ? PHANTOM.purple : PHANTOM.tagBorder}`,
      fontFamily: TYPE.family, fontSize: 13, fontWeight: 500,
      cursor: 'pointer',
    }}>
      {leading}{label}{trailing}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// ListRow — iOS-style list row with optional chevron
// ─────────────────────────────────────────────────────────────
function ListRow({ title, detail, leading, onClick, chevron = true, destructive = false, isLast = false }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      width: '100%',
      background: 'transparent',
      border: 'none',
      padding: '14px 16px',
      borderBottom: isLast ? 'none' : `1px solid ${PHANTOM.separator}`,
      cursor: onClick ? 'pointer' : 'default',
      textAlign: 'left',
      fontFamily: TYPE.family,
    }}>
      {leading && <span style={{ flexShrink: 0, display: 'flex' }}>{leading}</span>}
      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: destructive ? PHANTOM.red : PHANTOM.textPrimary }}>{title}</span>
      {detail && <span style={{ fontSize: 14, color: PHANTOM.textSecondary }}>{detail}</span>}
      {chevron && !destructive && (
        <svg width="7" height="12" viewBox="0 0 7 12" style={{ flexShrink: 0 }}>
          <path d="M1 1l5 5-5 5" stroke={PHANTOM.lightGray} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// SectionHeader — uppercase label above a list/group
// ─────────────────────────────────────────────────────────────
function SectionHeader({ children, style = {} }) {
  return (
    <div style={{
      ...TYPE.smallM,
      color: PHANTOM.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      padding: '0 4px 8px',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// GradientText — used for hero headlines on auth/onboarding
// ─────────────────────────────────────────────────────────────
function GradientText({ children, style = {} }) {
  return (
    <span style={{
      background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad} 60%, ${PHANTOM.lavender})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: PHANTOM.purple,
      ...style,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// Logo — simple purple ghost mark (placeholder for the real asset)
// ─────────────────────────────────────────────────────────────
function PhantomLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id="plg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={PHANTOM.purple}/>
          <stop offset="50%" stopColor={PHANTOM.purpleGrad}/>
          <stop offset="100%" stopColor={PHANTOM.lavender}/>
        </linearGradient>
      </defs>
      <path
        d="M10 22 A14 14 0 0 1 38 22 L38 38 Q35 43 31 38 Q27 43 24 38 Q21 43 17 38 Q13 43 10 38 Z"
        fill="url(#plg)"
      />
      <circle cx="19" cy="22" r="2.2" fill={PHANTOM.white}/>
      <circle cx="29" cy="22" r="2.2" fill={PHANTOM.white}/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// ProgressDots — step indicator (onboarding, multi-step forms)
// ─────────────────────────────────────────────────────────────
function ProgressDots({ total, current }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8, height: 8,
          borderRadius: 999,
          background: i === current ? PHANTOM.purple : PHANTOM.borderPurple,
          transition: 'width 160ms ease, background 160ms ease',
        }}/>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StepProgress — "Step 1 of 2" label + bar
// ─────────────────────────────────────────────────────────────
function StepProgress({ current, total }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ ...TYPE.smallSB, color: PHANTOM.purple, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Step {current} of {total}
      </div>
      <div style={{ height: 4, borderRadius: 2, background: PHANTOM.borderPurple, overflow: 'hidden' }}>
        <div style={{
          width: `${(current / total) * 100}%`, height: '100%',
          background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
          transition: 'width 220ms ease',
        }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TopBar — simple back arrow + title bar (for non-tabbed screens)
// ─────────────────────────────────────────────────────────────
function TopBar({ title, onBack, trailing }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '4px 0 16px',
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          background: PHANTOM.white, border: `1px solid ${PHANTOM.inputBorder}`,
          width: 36, height: 36, borderRadius: 999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="10" height="16" viewBox="0 0 10 16">
            <path d="M8 2L2 8l6 6" stroke={PHANTOM.textPrimary} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : <span style={{ width: 36 }}/>}
      <div style={{ flex: 1, ...TYPE.headlineBold, textAlign: 'center' }}>{title}</div>
      <span style={{ width: 36, display: 'flex', justifyContent: 'flex-end' }}>{trailing}</span>
    </div>
  );
}

Object.assign(window, {
  PHANTOM, TYPE,
  Screen, PhantomButton, Card, PhantomTextField, Tag, ListRow, SectionHeader,
  GradientText, PhantomLogo, ProgressDots, StepProgress, TopBar,
});
