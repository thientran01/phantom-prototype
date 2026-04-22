// feature-profile.jsx — ProfileView
// Mirrors ios/Features/Profile/Views/ProfileView.swift

function ProfileView({ onBack, onSignOut }) {
  const F = window.PhantomFixtures;
  const [push, setPush] = React.useState(true);
  const [reminder, setReminder] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Screen bg={PHANTOM.lightPurple}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ ...TYPE.largeTitle, fontSize: 30 }}>Profile</div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 4 }}>
          Manage your account settings.
        </div>
      </div>

      <Card style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
          color: PHANTOM.white,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TYPE.family, fontSize: 22, fontWeight: 700,
        }}>{F.user.displayName[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ ...TYPE.bodySmallSB }}>{F.user.displayName}</div>
          <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>{F.user.email}</div>
          <div style={{ ...TYPE.small, color: PHANTOM.textTertiary, marginTop: 2 }}>Member since {F.user.memberSince}</div>
        </div>
        <button style={{
          background: PHANTOM.tagBg, color: PHANTOM.purple, border: 'none',
          padding: '8px 14px', borderRadius: 999,
          fontFamily: TYPE.family, fontWeight: 600, fontSize: 13,
          cursor: 'pointer',
        }}>Edit</button>
      </Card>

      <SectionHeader>Account</SectionHeader>
      <Card style={{ padding: 0, marginBottom: 14 }}>
        <ListRow title="Personal information" leading={<IconBubble kind="user"/>} onClick={() => {}}/>
        <ListRow title="Email address"         leading={<IconBubble kind="mail"/>} onClick={() => {}}/>
        <ListRow title="Password & security"   leading={<IconBubble kind="lock"/>} onClick={() => {}} isLast/>
      </Card>

      <SectionHeader>Preferences</SectionHeader>
      <Card style={{ padding: 0, marginBottom: 14 }}>
        <ToggleRow label="Push notifications" value={push}     onChange={setPush}/>
        <ToggleRow label="Daily reminder"     value={reminder} onChange={setReminder}/>
        <ToggleRow label="Dark mode"          value={darkMode} onChange={setDarkMode} isLast/>
      </Card>

      <SectionHeader>Support</SectionHeader>
      <Card style={{ padding: 0, marginBottom: 14 }}>
        <ListRow title="Help center"       leading={<IconBubble kind="help"/>} onClick={() => {}}/>
        <ListRow title="Terms & privacy"   leading={<IconBubble kind="doc"/>} onClick={() => {}} isLast/>
      </Card>

      <PhantomButton style="destructive" title="Log out" onClick={onSignOut}/>
    </Screen>
  );
}

function ToggleRow({ label, value, onChange, isLast = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: isLast ? 'none' : `1px solid ${PHANTOM.separator}`,
      fontFamily: TYPE.family,
    }}>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 44, height: 26, borderRadius: 999,
        background: value ? PHANTOM.purple : PHANTOM.borderPurple,
        border: 'none', cursor: 'pointer',
        position: 'relative',
        transition: 'background 140ms ease',
      }}>
        <div style={{
          position: 'absolute', top: 3, left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: '50%',
          background: PHANTOM.white,
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 140ms ease',
        }}/>
      </button>
    </div>
  );
}

function IconBubble({ kind }) {
  const paths = {
    user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9c0-4 3-7 7-7s7 3 7 7" stroke={PHANTOM.purple} strokeWidth="1.6" fill="none" strokeLinecap="round"/>,
    mail: <React.Fragment><rect x="3" y="5" width="18" height="14" rx="2" stroke={PHANTOM.purple} strokeWidth="1.6"/><path d="M3 7l9 6 9-6" stroke={PHANTOM.purple} strokeWidth="1.6" strokeLinecap="round"/></React.Fragment>,
    lock: <React.Fragment><rect x="5" y="11" width="14" height="10" rx="2" stroke={PHANTOM.purple} strokeWidth="1.6"/><path d="M8 11V7a4 4 0 018 0v4" stroke={PHANTOM.purple} strokeWidth="1.6"/></React.Fragment>,
    help: <React.Fragment><circle cx="12" cy="12" r="9" stroke={PHANTOM.purple} strokeWidth="1.6"/><path d="M9.5 9c0-1.5 1.2-2.5 2.5-2.5S14.5 7.5 14.5 9c0 2-2.5 2-2.5 4M12 17h.01" stroke={PHANTOM.purple} strokeWidth="1.6" strokeLinecap="round"/></React.Fragment>,
    doc:  <React.Fragment><path d="M6 3h8l4 4v14H6z" stroke={PHANTOM.purple} strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M14 3v4h4" stroke={PHANTOM.purple} strokeWidth="1.6" fill="none"/></React.Fragment>,
  };
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 9,
      background: PHANTOM.tagBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{paths[kind]}</svg>
    </div>
  );
}

Object.assign(window, { ProfileView });
