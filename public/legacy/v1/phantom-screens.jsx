// phantom-screens.jsx — Individual screens for Phantom prototype.
// Mirrors the SwiftUI views; all values are hard-coded placeholders.

/* ──────────────────────────────────────────────────────────────
   Shared tokens & helpers
   ────────────────────────────────────────────────────────────── */
const PH = {
  purple: '#3803B1',
  purpleSoft: '#5B37D4',
  lavender: '#A49EF4',
  purpleGrad: '#7B61FF',
  bg: '#F8F8FA',
  white: '#FFFFFF',
  text: '#1A1A1F',
  text2: '#47474F',
  text3: '#8A8A96',
  text4: '#C5C5CD',
  border: '#E5E5E5',
  borderSoft: '#F0F0F3',
  lightPurple: '#F1F0FB',
  cardShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.025)',
};

const phFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", system-ui, sans-serif';

function PhLogo({ size = 48, color = PH.purple }) {
  return (
    <svg width={size} height={size * (50/48)} viewBox="0 0 48 50" fill="none">
      <path d="M20 23C20 23.5933 19.8241 24.1734 19.4944 24.6667C19.1648 25.1601 18.6962 25.5446 18.1481 25.7716C17.5999 25.9987 16.9967 26.0581 16.4147 25.9424C15.8328 25.8266 15.2982 25.5409 14.8787 25.1213C14.4591 24.7018 14.1734 24.1672 14.0576 23.5853C13.9419 23.0033 14.0013 22.4001 14.2284 21.8519C14.4554 21.3038 14.8399 20.8352 15.3333 20.5056C15.8266 20.1759 16.4067 20 17 20C17.7956 20 18.5587 20.3161 19.1213 20.8787C19.6839 21.4413 20 22.2044 20 23ZM31 20C30.4067 20 29.8266 20.1759 29.3333 20.5056C28.8399 20.8352 28.4554 21.3038 28.2284 21.8519C28.0013 22.4001 27.9419 23.0033 28.0576 23.5853C28.1734 24.1672 28.4591 24.7018 28.8787 25.1213C29.2982 25.5409 29.8328 25.8266 30.4147 25.9424C30.9967 26.0581 31.5999 25.9987 32.148 25.7716C32.6962 25.5446 33.1648 25.1601 33.4944 24.6667C33.8241 24.1734 34 23.5933 34 23C34 22.2044 33.6839 21.4413 33.1213 20.8787C32.5587 20.3161 31.7956 20 31 20ZM48 24V48C48.0001 48.3787 47.8926 48.7497 47.6901 49.0698C47.4876 49.3899 47.1984 49.6458 46.8561 49.808C46.5138 49.9701 46.1325 50.0317 45.7565 49.9855C45.3806 49.9394 45.0255 49.7875 44.7325 49.5475L38.6675 44.585L32.6 49.5475C32.2427 49.8397 31.7953 49.9994 31.3338 49.9994C30.8722 49.9994 30.4248 49.8397 30.0675 49.5475L24 44.585L17.9325 49.5475C17.5752 49.8397 17.1278 49.9994 16.6663 49.9994C16.2047 49.9994 15.7573 49.8397 15.4 49.5475L9.3325 44.585L3.2675 49.5475C2.97452 49.7875 2.61941 49.9394 2.24348 49.9855C1.86755 50.0317 1.48625 49.9701 1.14395 49.808C0.801645 49.6458 0.512413 49.3899 0.3099 49.0698C0.107388 48.7497 -8.02814e-05 48.3787 4.49967e-08 48V24C1.39846e-07 17.6348 2.52856 11.5303 7.02944 7.02944C11.5303 2.52856 17.6348 0 24 0C30.3652 0 36.4697 2.52856 40.9706 7.02944C45.4714 11.5303 48 17.6348 48 24ZM44 24C44 18.6957 41.8929 13.6086 38.1421 9.85786C34.3914 6.10714 29.3043 4 24 4C18.6957 4 13.6086 6.10714 9.85786 9.85786C6.10714 13.6086 4 18.6957 4 24V43.78L8.0675 40.4525C8.42479 40.1603 8.87216 40.0006 9.33375 40.0006C9.79533 40.0006 10.2427 40.1603 10.6 40.4525L16.6675 45.415L22.7325 40.4525C23.09 40.1596 23.5379 39.9996 24 39.9996C24.4621 39.9996 24.91 40.1596 25.2675 40.4525L31.3325 45.415L37.4 40.4525C37.7573 40.1603 38.2047 40.0006 38.6662 40.0006C39.1278 40.0006 39.5752 40.1603 39.9325 40.4525L44 43.78V24Z" fill={color}/>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Common card wrapper
   ────────────────────────────────────────────────────────────── */
function Card({ children, style = {}, padding = 16 }) {
  return (
    <div style={{
      background: PH.white,
      border: `1px solid ${PH.border}`,
      borderRadius: 16,
      padding,
      boxShadow: PH.cardShadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* SF Symbol-ish glyphs done as tiny inline SVGs */
function Icon({ name, size = 16, color = PH.text3 }) {
  const s = size, sw = 1.6;
  const stroke = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const fill = { fill: color };
  const paths = {
    flame: <path d="M12 2c1 4 5 5 5 10a5 5 0 11-10 0c0-2 1-3 2-4-1 3 1 4 2 4 0-4-2-6 1-10z" {...fill}/>,
    bulb: <g><path d="M9 14a5 5 0 116 0c-1 1-1 2-1 3H10c0-1 0-2-1-3zM10 20h4M10 22h4" {...stroke}/></g>,
    dollar: <g><circle cx="12" cy="12" r="9" {...stroke}/><path d="M12 7v10M15 9c-.5-1-2-2-3-2s-3 1-3 2 1 2 3 2 3 1 3 2-1.5 2-3 2-2.5-1-3-2" {...stroke}/></g>,
    chart: <g><path d="M3 19l5-6 4 3 5-7 4 5" {...stroke}/><path d="M3 21h18" {...stroke}/></g>,
    percent: <g><circle cx="7" cy="7" r="2.5" {...stroke}/><circle cx="17" cy="17" r="2.5" {...stroke}/><path d="M19 5L5 19" {...stroke}/></g>,
    ghost: <path d="M6 10a6 6 0 0112 0v10l-2-2-2 2-2-2-2 2-2-2v-8z M9 9h.1 M15 9h.1" {...stroke}/>,
    search: <g><circle cx="11" cy="11" r="6" {...stroke}/><path d="M20 20l-4-4" {...stroke}/></g>,
    home: <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" {...stroke}/>,
    homeFill: <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" {...fill}/>,
    plus: <g><path d="M12 5v14M5 12h14" {...stroke}/></g>,
    book: <path d="M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3V4zM4 17a3 3 0 013-3h12" {...stroke}/>,
    bookFill: <path d="M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" {...fill}/>,
    person: <g><circle cx="12" cy="8" r="4" {...stroke}/><path d="M4 21c1-4 4-6 8-6s7 2 8 6" {...stroke}/></g>,
    personFill: <g><circle cx="12" cy="8" r="4" {...fill}/><path d="M4 21c1-4 4-6 8-6s7 2 8 6z" {...fill}/></g>,
    chevron: <path d="M9 6l6 6-6 6" {...stroke}/>,
    chevLeft: <path d="M15 6l-6 6 6 6" {...stroke}/>,
    bell: <path d="M6 17h12l-2-3V10a4 4 0 00-8 0v4l-2 3zM10 20a2 2 0 004 0" {...stroke}/>,
    clock: <g><circle cx="12" cy="12" r="9" {...stroke}/><path d="M12 7v5l3 2" {...stroke}/></g>,
    moon: <path d="M20 15A8 8 0 119 4a7 7 0 0011 11z" {...stroke}/>,
    lock: <g><rect x="5" y="11" width="14" height="9" rx="2" {...stroke}/><path d="M8 11V8a4 4 0 018 0v3" {...stroke}/></g>,
    mail: <g><rect x="3" y="6" width="18" height="12" rx="2" {...stroke}/><path d="M3 7l9 6 9-6" {...stroke}/></g>,
    logout: <g><path d="M13 4h6v16h-6" {...stroke}/><path d="M9 8l-4 4 4 4M5 12h12" {...stroke}/></g>,
    help: <g><circle cx="12" cy="12" r="9" {...stroke}/><path d="M9 9a3 3 0 116 0c0 2-3 2-3 4M12 17h.1" {...stroke}/></g>,
    doc: <g><path d="M6 3h9l4 4v14H6z" {...stroke}/><path d="M14 3v5h5" {...stroke}/></g>,
    pencil: <g><path d="M4 20l4-1L20 7l-3-3L5 16z" {...stroke}/></g>,
    brain: <path d="M9 5a3 3 0 00-3 3 3 3 0 00-1 5 3 3 0 001 4 3 3 0 004 2 3 3 0 004 0 3 3 0 004-2 3 3 0 001-4 3 3 0 00-1-5 3 3 0 00-3-3 3 3 0 00-3-1 3 3 0 00-3 1z" {...stroke}/>,
    note: <g><path d="M5 4h11l3 3v13H5z" {...stroke}/><path d="M8 10h8M8 14h8M8 18h5" {...stroke}/></g>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" {...stroke}/>,
    dna: <g><path d="M7 3c10 4 0 14 10 18M17 3C7 7 17 17 7 21" {...stroke}/><path d="M9 7h6M9 17h6" {...stroke}/></g>,
    xmark: <path d="M6 6l12 12M18 6L6 18" {...stroke}/>,
    check: <path d="M4 12l5 5L20 6" {...stroke}/>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24">{paths[name] || null}</svg>;
}

/* ──────────────────────────────────────────────────────────────
   Top action bar (Home / Hesitation / Ghosted / Placeholder)
   ────────────────────────────────────────────────────────────── */
function TopActionBar({ tab, onTab }) {
  const tabs = [
    { k: 'home', label: 'Home' },
    { k: 'hesitation', label: 'Hesitation' },
    { k: 'ghosted', label: 'Ghosted' },
    { k: 'placeholder', label: 'Placeholder' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 28, padding: '16px 24px 12px',
      background: PH.bg, borderBottom: '1px solid rgba(0,0,0,0.04)',
      overflowX: 'auto',
    }}>
      {tabs.map(t => (
        <button key={t.k} onClick={() => onTab(t.k)} style={{
          background: 'none', border: 'none', padding: '0 0 4px',
          fontFamily: phFont, fontSize: 20, fontWeight: 400,
          color: tab === t.k ? PH.purple : 'rgba(0,0,0,0.35)',
          cursor: 'pointer',
          borderBottom: tab === t.k ? `2px solid ${PH.purple}` : '2px solid transparent',
          whiteSpace: 'nowrap',
        }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Bottom tab bar
   ────────────────────────────────────────────────────────────── */
function BottomTabBar({ tab, onTab }) {
  const items = [
    { k: 'home', icon: 'home', fill: 'homeFill' },
    { k: 'log', icon: 'plus', fill: 'plus' },
    { k: 'dna', icon: 'book', fill: 'bookFill' },
    { k: 'profile', icon: 'person', fill: 'personFill' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', padding: '12px 24px 34px',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
      zIndex: 20,
    }}>
      {items.map(it => {
        const sel = tab === it.k;
        return (
          <button key={it.k} onClick={() => onTab(it.k)} style={{
            flex: 1, padding: '4px 0', background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', justifyContent: 'center',
          }}>
            <Icon name={sel ? it.fill : it.icon} size={26} color={sel ? PH.purple : 'rgba(0,0,0,0.35)'} />
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Splash / Opening
   ────────────────────────────────────────────────────────────── */
function SplashScreen({ onNext }) {
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: PH.white,
    }}>
      {/* soft gradient blobs */}
      <div style={{
        position: 'absolute', width: 357, height: 357, borderRadius: '50%',
        background: PH.lavender, filter: 'blur(110px)', opacity: 0.6,
        top: -200, left: -210,
      }} />
      <div style={{
        position: 'absolute', width: 357, height: 357, borderRadius: '50%',
        background: PH.lavender, filter: 'blur(110px)', opacity: 0.6,
        bottom: -100, right: -200,
      }} />

      {/* decorative coin placeholders (subtle circles) */}
      <div style={{
        position: 'absolute', top: '12%', right: 12, width: 110, height: 110,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #C7B9FF, #6840E9 70%, #2A0E80)',
        boxShadow: '0 10px 30px rgba(56,3,177,0.28)',
      }} />
      <div style={{
        position: 'absolute', top: '32%', left: 24, width: 130, height: 130,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #F3C8FF, #B34FFF 70%, #4B1372)',
        boxShadow: '0 10px 30px rgba(110,50,200,0.28)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: 24, width: 95, height: 95,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #FFD58C, #F2A541 70%, #8B5A0C)',
        boxShadow: '0 10px 30px rgba(242,165,65,0.28)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '0 32px', textAlign: 'center',
      }}>
        <PhLogo size={64} />
        <div style={{ height: 24 }} />
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>Phantom</div>
        <div style={{ height: 8 }} />
        <div style={{ fontSize: 20, fontWeight: 300, color: 'rgba(0,0,0,0.67)' }}>
          Log the trades you didn't take
        </div>
        <div style={{ height: 40 }} />
        <button onClick={onNext} style={{
          border: 'none', background: PH.purple, color: 'white',
          fontFamily: phFont, fontSize: 18, fontWeight: 500,
          padding: '14px 48px', borderRadius: 28, cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(56,3,177,0.35)',
        }}>Get started</button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Login
   ────────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin, onSignup }) {
  const input = {
    width: '100%', boxSizing: 'border-box',
    padding: '14px',
    border: '1px solid #EDF1F3', borderRadius: 10,
    fontFamily: phFont, fontSize: 14, color: '#1A1C1E',
    background: 'white', outline: 'none',
  };
  const social = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '10px', border: '1px solid #EFF0F6',
    borderRadius: 10, background: 'white', cursor: 'pointer',
    fontFamily: phFont, fontSize: 14, fontWeight: 600, color: '#1A1C1E',
  };
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden', background: PH.white }}>
      <div style={{
        position: 'absolute', width: 357, height: 357, borderRadius: '50%',
        background: PH.lavender, filter: 'blur(110px)', opacity: 0.5,
        top: -200, left: -210,
      }} />
      <div style={{
        position: 'absolute', width: 357, height: 357, borderRadius: '50%',
        background: PH.lavender, filter: 'blur(110px)', opacity: 0.5,
        bottom: -150, right: -200,
      }} />

      <div style={{
        position: 'relative', padding: '100px 24px 24px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        <div style={{
          background: 'white', padding: 24, borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 26, fontWeight: 700,
              background: `linear-gradient(90deg, ${PH.purple}, ${PH.purpleGrad}, ${PH.lavender})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 8,
            }}>Get Started now</div>
            <div style={{ fontSize: 12, color: '#6C7278' }}>
              Create an account or log in to explore our app
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button style={social}>
              <span style={{ fontSize: 18, color: '#EA4335', fontWeight: 900 }}>G</span>
              Sign in with Google
            </button>
            <button style={social}>
              <span style={{ fontSize: 18 }}>􀣺</span>
              Sign in with Apple
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#EDF1F3' }} />
            <span style={{ fontSize: 12, color: '#6C7278' }}>Or</span>
            <div style={{ flex: 1, height: 1, background: '#EDF1F3' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#6C7278' }}>Email</label>
            <input style={input} defaultValue="user@uw.edu" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#6C7278' }}>Password</label>
            <input style={input} type="password" defaultValue="••••••••" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <label style={{ color: '#6C7278', display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: PH.purple }} />
              Remember me
            </label>
            <a style={{ color: PH.purple, fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</a>
          </div>

          <button onClick={onLogin} style={{
            border: 'none', background: PH.purple, color: 'white',
            fontFamily: phFont, fontSize: 14, fontWeight: 600,
            padding: '12px', borderRadius: 30, cursor: 'pointer',
          }}>Log In</button>

          <div style={{ textAlign: 'center', fontSize: 12, color: '#6C7278' }}>
            Don't have an account? <a onClick={onSignup} style={{ color: PH.purple, fontWeight: 600, cursor: 'pointer' }}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Home Overview (tab "Home")
   ────────────────────────────────────────────────────────────── */
function HomeOverview() {
  return (
    <div style={{ padding: '12px 20px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* streak */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>Current Streak</div>
            <div style={{ fontSize: 13, color: PH.text3, marginTop: 4 }}>7 Days</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 24 }}>🔥</div>
        </div>
      </Card>

      {/* insight */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="bulb" size={16} color={PH.purple} />
          <div style={{ fontSize: 17, fontWeight: 600 }}>Insight for this week</div>
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: PH.text3 }}>
          You hesitate most on Mondays
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: PH.text3, lineHeight: 1.5 }}>
          67% of your ghost trades happen at the start of the week. Consider setting automated entry rules to overcome this pattern.
        </div>
      </Card>

      <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Overview</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <StatCard value="14" label="Ghosted Trades" icon="person" />
        <StatCard value="$3,412" label="Total Hesitation Tax" icon="dollar" />
        <StatCard value="$243.71" label="Avg per Trade" icon="chart" />
        <StatCard value="12.4%" label="Hesitation Percentage" icon="percent" />
      </div>
    </div>
  );
}
function StatCard({ value, label, icon }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <Icon name={icon} size={18} color={PH.text3} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: 14, color: PH.text3, marginTop: 4 }}>{label}</div>
    </Card>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Hesitation Tax
   ────────────────────────────────────────────────────────────── */
function HesitationTaxScreen() {
  return (
    <div style={{ padding: '12px 24px 120px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 600 }}>Hesitation Tax</div>
        <div style={{ fontSize: 13, color: PH.text2, marginTop: 6 }}>
          See how hesitation has impacted your performance over time!
        </div>
      </div>

      {/* search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: 12, borderRadius: 24, background: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}>
        <Icon name="search" size={14} color="rgba(0,0,0,0.4)" />
        <input placeholder="SEARCH TICKER (E.G. NVDA)" style={{
          border: 'none', outline: 'none', flex: 1,
          fontFamily: phFont, fontSize: 14, letterSpacing: 0.5, color: PH.text3,
          background: 'transparent',
        }}/>
      </div>

      {/* two summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card padding={12}>
          <div style={{ display: 'flex' }}>
            <Icon name="chart" size={16} color={PH.text3} />
          </div>
          <div style={{ fontSize: 15, marginTop: 4 }}>If You Invested</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>$14,401</div>
          <div style={{ fontSize: 13, color: PH.text3, marginTop: 4 }}>Gain: $4,401 (+44.2%)</div>
        </Card>
        <Card padding={12}>
          <div style={{ display: 'flex' }}>
            <Icon name="chart" size={16} color={PH.text3} />
          </div>
          <div style={{ fontSize: 15, marginTop: 4 }}>Your Hesitation</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>$4,401</div>
          <div style={{ fontSize: 13, color: PH.text3, marginTop: 4 }}>Loss: $4,401 (44.2%)</div>
        </Card>
      </div>

      {/* chart placeholder */}
      <div>
        <div style={{
          height: 120, borderRadius: 12, background: 'rgba(0,0,0,0.04)',
          border: `1px dashed ${PH.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8, padding: 12,
        }}>
          <MiniChart />
          <div style={{ fontSize: 11, color: PH.text3 }}>Chart: Ghost vs. Actual Performance</div>
        </div>
      </div>

      <InfoCard icon="dollar" title="Your Hesitation Tax">
        Across 14 ghost trades, by not taking action you've paid a hesitation tax of $3,412 (12.4% potential return). This represents the opportunity cost of delaying or avoiding your investment decisions.
      </InfoCard>

      <InfoCard icon="brain" title="Your Common Hesitation Triggers">
        Fear of buying at the wrong time<br/>
        Waiting for a "better" entry point<br/>
        Analysis paralysis<br/>
        Emotional decision-making
      </InfoCard>

      <InfoCard icon="bulb" title="Overcoming Hesitation">
        Set clear entry and exit rules before analyzing trades<br/>
        Use dollar-cost averaging to reduce timing pressure<br/>
        Trust your research — no entry is perfect<br/>
        The second best time to invest is today
      </InfoCard>
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={icon} size={17} color={PH.text} />
        <div style={{ fontSize: 17, fontWeight: 600 }}>{title}</div>
        <div style={{ marginLeft: 'auto' }}>
          <Icon name="chevron" size={14} color={PH.text3} />
        </div>
      </div>
      <div style={{ fontSize: 13, color: PH.text2, marginTop: 12, lineHeight: 1.6 }}>
        {children}
      </div>
    </Card>
  );
}

function MiniChart() {
  return (
    <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none">
      <path d="M0,50 L30,42 L60,46 L90,38 L120,30 L150,34 L180,22 L210,18 L240,12 L270,16 L300,8" stroke={PH.purple} strokeWidth="2" fill="none"/>
      <path d="M0,50 L30,48 L60,48 L90,44 L120,40 L150,42 L180,38 L210,36 L240,32 L270,34 L300,28" stroke={PH.text3} strokeWidth="2" strokeDasharray="3 3" fill="none"/>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Ghosted assets list
   ────────────────────────────────────────────────────────────── */
function GhostedAssetsScreen() {
  const assets = [
    { ticker: 'NVDA', count: 7 },
    { ticker: 'TSLA', count: 5 },
    { ticker: 'AAPL', count: 4 },
    { ticker: 'MSFT', count: 3 },
    { ticker: 'AMZN', count: 2 },
    { ticker: 'SPY',  count: 2 },
  ];
  return (
    <div style={{ padding: '12px 20px 120px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Frequently Ghosted Assets</div>
      {assets.map(a => (
        <Card key={a.ticker} padding={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: 'rgba(56,3,177,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: PH.purple }}>
                {a.ticker.slice(0, 2)}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{a.ticker}</div>
              <div style={{ fontSize: 13, color: PH.text3, marginTop: 2 }}>Ghosted {a.count}×</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Placeholder (4th home tab)
   ────────────────────────────────────────────────────────────── */
function PlaceholderScreen() {
  return (
    <div style={{
      padding: '80px 24px', textAlign: 'center', color: PH.text3,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <Icon name="bulb" size={40} color={PH.text3} />
      <div style={{ fontSize: 20, fontWeight: 600, color: PH.text }}>Something coming soon</div>
      <div style={{ fontSize: 14 }}>This tab is reserved for a future feature.</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Log Ghost flow — 3 steps
   ────────────────────────────────────────────────────────────── */
const primaryBtnStyle = {
  width: '100%', padding: '14px 34px',
  background: PH.purple, color: 'white',
  border: 'none', borderRadius: 24,
  fontFamily: phFont, fontSize: 17, fontWeight: 600,
  cursor: 'pointer',
};

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: 13, color: PH.text3, fontWeight: 300 }}>Step {step} of {total}</div>
      <div style={{ flex: 1, height: 4, background: '#EFF0F6', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${step/total*100}%`, height: '100%', background: PH.purple }}/>
      </div>
    </div>
  );
}

function LogStep1({ onNext, onBack }) {
  const [ticker, setTicker] = React.useState('NVDA');
  const [dir, setDir] = React.useState('BUY');
  const [priceSrc, setPriceSrc] = React.useState('MARKET_CURRENT');
  const [qtyType, setQtyType] = React.useState('SHARES');
  return (
    <div style={{ height: '100%', background: PH.white, padding: '64px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
      <button onClick={onBack} style={backBtnStyle}><Icon name="chevLeft" size={20} color={PH.text}/></button>
      <ProgressBar step={1} total={2}/>
      <div style={{ fontSize: 24, fontWeight: 400 }}>What did you almost trade?</div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: 12, borderRadius: 24, border: `1px solid ${PH.text}`,
      }}>
        <Icon name="search" size={16} color={PH.text3}/>
        <input value={ticker} onChange={e => setTicker(e.target.value.toUpperCase())}
          placeholder="SEARCH TICKER (E.G. NVDA)" style={{
          flex: 1, border: 'none', outline: 'none',
          fontFamily: phFont, fontSize: 14, letterSpacing: 0.5,
          color: PH.text3, background: 'transparent',
        }}/>
        <button style={{ background: 'none', border: 'none', color: PH.text, fontSize: 14, fontWeight: 300, cursor: 'pointer' }}>Search</button>
      </div>

      <Pills value={dir} onChange={setDir} options={[{v:'BUY',l:'Buy'},{v:'SELL',l:'Sell'}]} />

      <LabelGroup label="Price">
        <Pills value={priceSrc} onChange={setPriceSrc} options={[{v:'MARKET_CURRENT',l:'Current Price'},{v:'MANUAL',l:'Enter Price'}]} />
      </LabelGroup>

      <LabelGroup label="Quantity">
        <Pills value={qtyType} onChange={setQtyType} options={[{v:'SHARES',l:'Shares'},{v:'DOLLARS',l:'Dollars'}]} />
      </LabelGroup>

      <LabelGroup label={qtyType === 'SHARES' ? 'Number of shares' : 'Dollar amount ($)'}>
        <input placeholder={qtyType === 'SHARES' ? 'Enter shares' : 'Enter total dollar amount'}
          defaultValue={qtyType === 'SHARES' ? '10' : '1000'}
          style={textInputStyle}/>
      </LabelGroup>

      <div style={{ flex: 1 }} />
      <button onClick={onNext} style={primaryBtnStyle}>Next</button>
    </div>
  );
}

const backBtnStyle = {
  position: 'absolute', top: 60, left: 16,
  background: 'none', border: 'none', padding: 8, cursor: 'pointer',
};

function Pills({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {options.map(o => {
        const sel = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            flex: 1, padding: '8px 16px', borderRadius: 16,
            border: `1px solid ${PH.text}`,
            background: sel ? PH.purple : 'transparent',
            color: sel ? 'white' : PH.text2,
            fontFamily: phFont, fontSize: 14, cursor: 'pointer',
          }}>{o.l}</button>
        );
      })}
    </div>
  );
}

function LabelGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 14, color: PH.text3, fontWeight: 300 }}>{label}</div>
      {children}
    </div>
  );
}

const textInputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '12px 14px',
  border: `1px solid ${PH.border}`, borderRadius: 10,
  fontFamily: phFont, fontSize: 14, outline: 'none',
};

function LogStep2({ onNext, onBack }) {
  const tags = ['Fear of loss', 'Not enough confidence', 'Conflicting Signals', 'Distracted', 'Price too high', 'Timing seems off', 'Market volatility'];
  const [selected, setSelected] = React.useState(['Fear of loss', 'Not enough confidence']);
  const toggle = t => setSelected(selected.includes(t) ? selected.filter(x=>x!==t) : [...selected, t]);
  return (
    <div style={{ height: '100%', background: PH.white, padding: '64px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
      <button onClick={onBack} style={backBtnStyle}><Icon name="chevLeft" size={20} color={PH.text}/></button>
      <ProgressBar step={2} total={2}/>

      <div>
        <div style={{ fontSize: 24, fontWeight: 400 }}>Why did you hesitate?</div>
        <div style={{ fontSize: 16, color: PH.text3, marginTop: 8 }}>Select all that apply</div>
      </div>

      {selected.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {selected.map(t => (
            <div key={t} style={{
              background: PH.purple, color: 'white',
              padding: '6px 12px', borderRadius: 12,
              fontSize: 14, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {t}
              <span onClick={() => toggle(t)} style={{ cursor: 'pointer' }}>
                <Icon name="xmark" size={10} color="white"/>
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: 12, borderRadius: 24, border: `1px solid ${PH.text}`,
      }}>
        <Icon name="search" size={16} color={PH.text3}/>
        <input placeholder="Search or type reason..." style={{
          flex: 1, border: 'none', outline: 'none', fontFamily: phFont, fontSize: 14,
          color: PH.text3, background: 'transparent',
        }}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tags.map(t => {
          const sel = selected.includes(t);
          return (
            <div key={t} style={{
              display: 'flex', alignItems: 'center',
              padding: '8px 0',
            }}>
              <div style={{ flex: 1, fontSize: 16, color: PH.text3 }}>{t}</div>
              <button onClick={() => toggle(t)} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', color: PH.purple,
                fontFamily: phFont, fontSize: 16, cursor: 'pointer',
              }}>
                <Icon name={sel ? 'check' : 'plus'} size={14} color={PH.purple}/>
                {sel ? 'Added' : 'Add'}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />
      <button onClick={onNext} style={primaryBtnStyle}>Log Ghost</button>
    </div>
  );
}

function GhostLoggedScreen({ onDone }) {
  return (
    <div style={{ height: '100%', background: PH.white, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1 }}/>
      <PhLogo size={64} />
      <div style={{ fontSize: 40, fontWeight: 600 }}>Ghost Logged</div>
      <div style={{ flex: 1 }}/>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <OptRow icon="note" title="Add Notes" sub="Any specifics you want to remember?"/>
        <div style={{ height: 1, background: PH.border, margin: '0 16px' }}/>
        <OptRow icon="heart" title="Log Emotion" sub="Track your emotional state"/>
      </div>
      <div style={{ flex: 1 }}/>
      <button onClick={onDone} style={primaryBtnStyle}>Done</button>
    </div>
  );
}
function OptRow({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 16 }}>
      <Icon name={icon} size={22} color={PH.text} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18 }}>{title}</div>
        <div style={{ fontSize: 14, color: PH.text3, fontWeight: 300 }}>{sub}</div>
      </div>
      <Icon name="chevron" size={14} color={PH.text3}/>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Investor DNA (filled state)
   ────────────────────────────────────────────────────────────── */
function InvestorDNAScreen() {
  const axes = ['Patience', 'Conviction', 'Risk', 'Timing', 'Diversity', 'Discipline'];
  const values = [0.82, 0.65, 0.4, 0.7, 0.55, 0.78];
  return (
    <div style={{ padding: '12px 20px 120px', display: 'flex', flexDirection: 'column', gap: 20, background: 'white', minHeight: '100%' }}>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>Investor DNA</div>
        <div style={{ fontSize: 15, color: PH.text3, marginTop: 4 }}>Your behavioral profile based on 14 ghost trades</div>
      </div>

      <Card padding={24}>
        <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Your Trading Tendencies</div>
        <RadarChart axes={axes} values={values} size={260} />
      </Card>

      <div>
        <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>Your Dominant Tendencies</div>
        <TraitRow name="The Patient Analyzer" desc="You take time to weigh decisions carefully."/>
        <TraitRow name="High Conviction" desc="When you believe, you commit — but sometimes too slowly."/>
        <TraitRow name="Disciplined Mover" desc="You rarely break your own rules once set."/>
      </div>

      <div style={{ fontSize: 11, color: PH.text4, lineHeight: 1.5 }}>
        Based on patterns in your ghost trades. This is not a prediction or financial assessment.
      </div>
    </div>
  );
}

function TraitRow({ name, desc }) {
  return (
    <div style={{
      background: PH.bg, border: `1px solid ${PH.borderSoft}`,
      borderRadius: 12, padding: 16, marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 13, color: PH.text3, marginTop: 4 }}>{desc}</div>
      </div>
      <Icon name="chevron" size={13} color={PH.text4}/>
    </div>
  );
}

function RadarChart({ axes, values, size = 240 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 30;
  const rings = 5;
  const n = axes.length;
  const angle = i => -Math.PI/2 + i * (2*Math.PI / n);

  const polyPoints = fraction => {
    return Array.from({length: n}).map((_, i) => {
      const a = angle(i);
      return `${cx + Math.cos(a) * r * fraction},${cy + Math.sin(a) * r * fraction}`;
    }).join(' ');
  };
  const dataPoints = values.map((v, i) => {
    const a = angle(i);
    return `${cx + Math.cos(a) * r * v},${cy + Math.sin(a) * r * v}`;
  }).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto', maxWidth: size }}>
      {Array.from({length: rings}).map((_, i) => (
        <polygon key={i} points={polyPoints((i+1)/rings)} fill="none" stroke="#DBDEE4" strokeWidth="1"/>
      ))}
      {axes.map((_, i) => {
        const a = angle(i);
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="#CFD2D7" strokeWidth="1"/>;
      })}
      <polygon points={dataPoints} fill={PH.purple} fillOpacity="0.25" stroke={PH.purple} strokeWidth="2"/>
      <circle cx={cx} cy={cy} r="4" fill={PH.purple}/>
      {axes.map((name, i) => {
        const a = angle(i);
        const lr = r + 16;
        return (
          <text key={i} x={cx + Math.cos(a)*lr} y={cy + Math.sin(a)*lr + 3}
            fontSize="10" fill={PH.text2} textAnchor="middle" fontFamily={phFont}>
            {name}
          </text>
        );
      })}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Screen: Profile
   ────────────────────────────────────────────────────────────── */
function ProfileScreen({ onSignOut }) {
  const [push, setPush] = React.useState(true);
  const [daily, setDaily] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  return (
    <div style={{ padding: '20px 24px 120px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ fontSize: 20, fontWeight: 600 }}>Profile</div>
      <div style={{ fontSize: 13, color: PH.text2, marginTop: 6, marginBottom: 20 }}>Manage your account settings</div>

      <Card padding={16} style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 70, height: 70 }}>
            <div style={{
              width: 70, height: 70, borderRadius: 35, background: '#D9D9D9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
              fontSize: 22, color: PH.text,
            }}>U</div>
            <div style={{
              position: 'absolute', right: 0, bottom: 0,
              width: 20, height: 20, borderRadius: 10,
              background: '#0BAA36', border: '2px solid white',
            }}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 600 }}>Xinyue Li</div>
            <div style={{ fontSize: 11, color: PH.text3, fontWeight: 500, marginTop: 2 }}>user@uw.edu</div>
            <div style={{ fontSize: 11, color: PH.text3, fontWeight: 500, marginTop: 2 }}>Member since Jan 2026</div>
          </div>
          <Icon name="pencil" size={14} color={PH.text}/>
        </div>
      </Card>

      <SectionHeader title="Account"/>
      <SettingCardGroup>
        <SettingRow icon="person" title="Personal Information"/>
        <SettingRow icon="mail" title="Email Address"/>
        <SettingRow icon="lock" title="Password & Security"/>
      </SettingCardGroup>

      <SectionHeader title="Preferences"/>
      <SettingCardGroup>
        <ToggleRow icon="bell" title="Push Notifications" sub="Receive alerts about your trades" on={push} onChange={setPush}/>
        <ToggleRow icon="clock" title="Daily Reminder" sub="Get reminded to check in daily" on={daily} onChange={setDaily}/>
        <ToggleRow icon="moon" title="Dark Mode" sub="Switch to Dark theme" on={dark} onChange={setDark}/>
      </SettingCardGroup>

      <SectionHeader title="Support"/>
      <SettingCardGroup>
        <SettingRow icon="help" title="Help Center"/>
        <SettingRow icon="doc" title="Terms & Privacy"/>
      </SettingCardGroup>

      <div onClick={onSignOut} style={{ cursor: 'pointer' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 16, background: '#D9D9D9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
            }}>
              <Icon name="logout" size={14} color="#d33"/>
            </div>
            <div style={{ fontSize: 15, flex: 1 }}>Log Out</div>
            <Icon name="chevron" size={14} color={PH.text3}/>
          </div>
        </Card>
      </div>
    </div>
  );
}
function SectionHeader({ title }) {
  return <div style={{ fontSize: 20, fontWeight: 600, padding: '0 0 12px' }}>{title}</div>;
}
function SettingCardGroup({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
      {children}
    </div>
  );
}
function SettingRow({ icon, title }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: '#D9D9D9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
        }}>
          <Icon name={icon} size={14} color={PH.text}/>
        </div>
        <div style={{ fontSize: 15, flex: 1 }}>{title}</div>
        <Icon name="chevron" size={14} color={PH.text3}/>
      </div>
    </Card>
  );
}
function ToggleRow({ icon, title, sub, on, onChange }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: '#D9D9D9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
        }}>
          <Icon name={icon} size={14} color={PH.text}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15 }}>{title}</div>
          <div style={{ fontSize: 11, color: PH.text3, fontWeight: 500, marginTop: 2 }}>{sub}</div>
        </div>
        <div onClick={() => onChange(!on)} style={{
          width: 44, height: 26, borderRadius: 13,
          background: on ? PH.purple : '#E5E5E9',
          position: 'relative', cursor: 'pointer', transition: 'background 0.15s',
        }}>
          <div style={{
            position: 'absolute', top: 2, left: on ? 20 : 2,
            width: 22, height: 22, borderRadius: 11, background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s',
          }}/>
        </div>
      </div>
    </Card>
  );
}

Object.assign(window, {
  PH, phFont, PhLogo, Card, Icon,
  TopActionBar, BottomTabBar,
  SplashScreen, LoginScreen,
  HomeOverview, HesitationTaxScreen, GhostedAssetsScreen, PlaceholderScreen,
  LogStep1, LogStep2, GhostLoggedScreen,
  InvestorDNAScreen, ProfileScreen,
});
