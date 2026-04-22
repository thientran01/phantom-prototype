// feature-streak.jsx — StreakView
// Mirrors ios/Features/Streak/Views/StreakView.swift

function StreakView({ onBack }) {
  const F = window.PhantomFixtures;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title="Streak" onBack={onBack}/>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, margin: '10px 0 24px', textAlign: 'center' }}>
        <div style={{
          width: 76, height: 76, borderRadius: '50%',
          background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 14px 30px rgba(56,3,177,0.28)',
        }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="#fff">
            <path d="M24 4c0 8-10 10-10 20 0 6 4 10 10 10s10-4 10-10c0-6-4-8-4-14 0 4-2 6-4 6s-2-4-2-12z"/>
          </svg>
        </div>
        <div style={{ ...TYPE.title }}>
          <GradientText>Your investing commitment</GradientText>
        </div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary }}>
          Check in every day to keep it going.
        </div>
      </div>

      <Card style={{
        padding: 20,
        background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
        border: 'none',
        color: PHANTOM.white,
        boxShadow: '0 14px 30px rgba(56,3,177,0.28)',
        marginBottom: 14,
      }}>
        <div style={{ ...TYPE.smallM, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Current streak
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <div style={{ ...TYPE.largeTitle }}>{F.streak.current}</div>
          <div style={{ ...TYPE.subheadline, opacity: 0.9 }}>days</div>
        </div>
        <div style={{ ...TYPE.bodySmall, opacity: 0.85, marginTop: 6 }}>
          Longest: {F.streak.longest} days · Last check-in: {F.streak.lastCheckIn}
        </div>
      </Card>

      <SectionHeader>This week</SectionHeader>
      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {F.streak.days.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ ...TYPE.smallSB, color: PHANTOM.textSecondary }}>{d.date}</div>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: d.checked ? `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})` : PHANTOM.lightPurple,
                border: d.checked ? 'none' : `1px solid ${PHANTOM.borderPurple}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: PHANTOM.white,
              }}>
                {d.checked && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(11,170,54,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke={PHANTOM.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...TYPE.bodySmallSB, color: PHANTOM.green }}>Checked in today</div>
          <div style={{ ...TYPE.small, color: PHANTOM.textSecondary, marginTop: 2 }}>Come back tomorrow to keep the streak.</div>
        </div>
      </Card>

      <SectionHeader>Milestones</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MilestoneRow label="First week" target={7} current={F.streak.current} unlocked/>
        <MilestoneRow label="Two-week rhythm" target={14} current={F.streak.current}/>
        <MilestoneRow label="A full month" target={30} current={F.streak.current}/>
      </div>
    </Screen>
  );
}

function MilestoneRow({ label, target, current, unlocked = false }) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <Card style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: unlocked ? PHANTOM.purple : PHANTOM.borderPurple,
          color: unlocked ? PHANTOM.white : PHANTOM.purple,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TYPE.family, fontSize: 12, fontWeight: 700,
        }}>{target}</div>
        <div style={{ flex: 1 }}>
          <div style={{ ...TYPE.bodySmallSB }}>{label}</div>
          <div style={{ ...TYPE.small, color: PHANTOM.textSecondary }}>{current}/{target} days</div>
        </div>
        {unlocked && (
          <div style={{ ...TYPE.smallSB, color: PHANTOM.green }}>Unlocked</div>
        )}
      </div>
      <div style={{ height: 4, background: PHANTOM.borderPurple, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
        }}/>
      </div>
    </Card>
  );
}

Object.assign(window, { StreakView });
