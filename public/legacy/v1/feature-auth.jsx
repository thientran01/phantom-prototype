// feature-auth.jsx — LoginView, SignUpView, ConfirmSignUpView
// Mirrors ios/Features/Authentication/Views/

function AuthLogin({ onSignUp, onComplete }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [showPw, setShowPw] = React.useState(false);

  return (
    <Screen bg={PHANTOM.white}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <PhantomLogo size={56}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' }}>
          <div style={{ ...TYPE.titleBold }}>
            <GradientText>Get Started now</GradientText>
          </div>
          <p style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, margin: 0 }}>
            Create an account or log in to explore our app
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PhantomButton
            style="social"
            leadingIcon={<GoogleG/>}
            title="Continue with Google"
          />
          <PhantomButton
            style="social"
            leadingIcon={<AppleLogo/>}
            title="Continue with Apple"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: PHANTOM.separator }}/>
          <span style={{ ...TYPE.smallM, color: PHANTOM.textTertiary }}>Or</span>
          <div style={{ flex: 1, height: 1, background: PHANTOM.separator }}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PhantomTextField
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            leading={<EnvelopeIcon/>}
          />
          <PhantomTextField
            placeholder="Password"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            leading={<LockIcon/>}
            trailing={
              <button onClick={() => setShowPw(s => !s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <EyeIcon open={showPw}/>
              </button>
            }
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setRemember(r => !r)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: TYPE.family, fontSize: 14, color: PHANTOM.textSecondary,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 5,
              background: remember ? PHANTOM.purple : PHANTOM.white,
              border: `1.5px solid ${remember ? PHANTOM.purple : PHANTOM.lightGray}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {remember && (
                <svg width="10" height="8" viewBox="0 0 10 8">
                  <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            Remember me
          </button>
          <a style={{ ...TYPE.bodySmallM, color: PHANTOM.purple, textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password ?
          </a>
        </div>

        <PhantomButton
          title="Log In"
          onClick={onComplete}
          disabled={!email || !password}
        />

        <div style={{ textAlign: 'center', ...TYPE.bodySmall, color: PHANTOM.textSecondary }}>
          Don't have an account?{' '}
          <a onClick={onSignUp} style={{ color: PHANTOM.purple, fontWeight: 600, cursor: 'pointer' }}>Sign Up</a>
        </div>
      </div>
    </Screen>
  );
}

function AuthSignUp({ onBack, onConfirm }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);

  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Sign Up" onBack={onBack}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ ...TYPE.title }}>
            <GradientText>Create your account</GradientText>
          </div>
          <p style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, margin: 0 }}>
            Start logging the trades you didn't take.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PhantomTextField
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            leading={<UserIcon/>}
          />
          <PhantomTextField
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            leading={<EnvelopeIcon/>}
          />
          <PhantomTextField
            placeholder="Create a password"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            leading={<LockIcon/>}
            trailing={
              <button onClick={() => setShowPw(s => !s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <EyeIcon open={showPw}/>
              </button>
            }
          />
        </div>

        <p style={{ ...TYPE.small, color: PHANTOM.textTertiary, margin: 0 }}>
          By creating an account you agree to Phantom's Terms & Privacy.
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PhantomButton
            title="Create Account"
            onClick={onConfirm}
            disabled={!name || !email || !password}
          />
          <div style={{ textAlign: 'center', ...TYPE.bodySmall, color: PHANTOM.textSecondary }}>
            Already have an account?{' '}
            <a onClick={onBack} style={{ color: PHANTOM.purple, fontWeight: 600, cursor: 'pointer' }}>Log In</a>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function AuthConfirm({ onBack, onComplete }) {
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const filled = code.every(c => c.length === 1);
  const setAt = (i, v) => setCode(arr => arr.map((c, j) => j === i ? v.slice(-1) : c));

  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Confirm Email" onBack={onBack}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ ...TYPE.title }}>
            <GradientText>Check your inbox</GradientText>
          </div>
          <p style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, margin: 0 }}>
            We sent a 6-digit code to your email. Enter it below to confirm your account.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {code.map((c, i) => (
            <input
              key={i}
              value={c}
              onChange={e => setAt(i, e.target.value)}
              maxLength={1}
              style={{
                width: 44, height: 56, borderRadius: 12,
                border: `1.5px solid ${c ? PHANTOM.purple : PHANTOM.inputBorder}`,
                background: PHANTOM.white,
                textAlign: 'center',
                fontFamily: TYPE.family, fontSize: 22, fontWeight: 600,
                color: PHANTOM.textPrimary, outline: 'none',
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', ...TYPE.bodySmall, color: PHANTOM.textSecondary }}>
          Didn't get it?{' '}
          <a style={{ color: PHANTOM.purple, fontWeight: 600, cursor: 'pointer' }}>Resend code</a>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <PhantomButton title="Confirm" onClick={onComplete} disabled={!filled}/>
        </div>
      </div>
    </Screen>
  );
}

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.3l6.7-6.7C35.5 2.3 30 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.8 6c2-5.7 7.3-9.8 13.7-9.8z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.4 5.8c4.3-4 6.8-9.9 6.8-17.3z"/>
      <path fill="#FBBC05" d="M10.3 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.8-6C.9 16.4 0 20.1 0 24s.9 7.6 2.5 10.7l7.8-6z"/>
      <path fill="#34A853" d="M24 48c6 0 11.5-2 15.3-5.5l-7.4-5.8c-2 1.3-4.6 2.1-7.9 2.1-6.4 0-11.7-4.1-13.7-9.8l-7.8 6C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="#000">
      <path d="M12.6 9.4c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.8.8-3.6.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.8 2.4 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8 2.1-1.2 2.9-2.3c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.8-1-2.8-4zM10.3 2.5c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z"/>
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <rect x="1.5" y="7" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M4 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path d="M1 7c2-4 5-6 8-6s6 2 8 6c-2 4-5 6-8 6s-6-2-8-6z" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="9" cy="7" r="2.3" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    );
  }
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path d="M1 7c2-4 5-6 8-6s6 2 8 6c-2 4-5 6-8 6s-6-2-8-6z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 1l14 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

Object.assign(window, {
  AuthLogin, AuthSignUp, AuthConfirm,
});
