// feature-onboarding.jsx — OpeningView + Step 1..4 + Container
// Mirrors ios/Features/Onboarding/Views/

const ONB_STEPS = [
  {
    key: 'opening',
    title: 'Phantom',
    body: "Log the trades you didn't take.",
    icon: 'hero',
  },
  {
    key: 'step1',
    title: 'What is a ghost trade?',
    body: "A ghost is a trade you thought about, almost made, and let drift away. Phantom is where you write them down.",
    icon: 'ghost',
  },
  {
    key: 'step2',
    title: 'See the cost of hesitation',
    body: "Over time, Phantom adds up your 'hesitation tax' — what you'd have made (or lost) if you'd pulled the trigger.",
    icon: 'coin',
  },
  {
    key: 'step3',
    title: 'Find your Investor DNA',
    body: "After a few logs, Phantom maps your behavior across five traits — from deliberate to impulsive, patient to reactive.",
    icon: 'radar',
  },
  {
    key: 'step4',
    title: 'Keep a streak',
    body: "Check in daily. Review what stayed with you. Notice the patterns that repeat.",
    icon: 'flame',
  },
];

function OnboardingScreen({ step, onBack, onNext, onComplete, isLast }) {
  const s = ONB_STEPS[step];
  return (
    <Screen bg={PHANTOM.white}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ProgressDots total={ONB_STEPS.length} current={step}/>
        {!isLast && (
          <button onClick={onComplete} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: TYPE.family, fontSize: 14, fontWeight: 500, color: PHANTOM.textSecondary,
          }}>Skip</button>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <OnbIcon kind={s.icon}/>
        <div style={{ ...TYPE.titleBold, maxWidth: 300 }}>
          <GradientText>{s.title}</GradientText>
        </div>
        <p style={{ ...TYPE.subheadline, color: PHANTOM.textSecondary, margin: 0, maxWidth: 320 }}>
          {s.body}
        </p>
        {s.key === 'opening' && <OnbCoinStack/>}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {step > 0 && (
          <PhantomButton style="secondary" fullWidth={false} title="Back" onClick={onBack}/>
        )}
        <PhantomButton
          title={isLast ? 'Get Started' : 'Next'}
          onClick={isLast ? onComplete : onNext}
          fullWidth
        />
      </div>
    </Screen>
  );
}

function OnbIcon({ kind }) {
  const bg = `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.lavender})`;
  const wrap = {
    width: 88, height: 88, borderRadius: 22,
    background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(56,3,177,0.3)',
  };
  if (kind === 'hero')  return <div style={wrap}><PhantomLogo size={52}/></div>;
  if (kind === 'ghost') return (
    <div style={wrap}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M10 22 A14 14 0 0 1 38 22 L38 38 Q35 43 31 38 Q27 43 24 38 Q21 43 17 38 Q13 43 10 38 Z" fill="#fff"/>
        <circle cx="19" cy="22" r="2.2" fill={PHANTOM.purple}/>
        <circle cx="29" cy="22" r="2.2" fill={PHANTOM.purple}/>
      </svg>
    </div>
  );
  if (kind === 'coin') return (
    <div style={wrap}>
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="#fff"/>
        <text x="26" y="33" textAnchor="middle" fontSize="24" fontWeight="700" fill={PHANTOM.purple} fontFamily="DM Sans">$</text>
      </svg>
    </div>
  );
  if (kind === 'radar') return (
    <div style={wrap}>
      <svg width="56" height="56" viewBox="-28 -28 56 56">
        {[10, 18, 24].map(r => (
          <polygon key={r} points={pentPts(r)} fill="none" stroke="#fff" strokeWidth="1" opacity="0.55"/>
        ))}
        <polygon points={pentPts(22, [0.6, 0.8, 0.4, 0.7, 0.5])} fill="rgba(255,255,255,0.5)" stroke="#fff" strokeWidth="1.5"/>
      </svg>
    </div>
  );
  if (kind === 'flame') return (
    <div style={wrap}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="#fff">
        <path d="M24 4c0 8-10 10-10 20 0 6 4 10 10 10s10-4 10-10c0-6-4-8-4-14 0 4-2 6-4 6s-2-4-2-12z"/>
      </svg>
    </div>
  );
  return <div style={wrap}/>;
}

function pentPts(r, scales = [1, 1, 1, 1, 1]) {
  return [0, 1, 2, 3, 4].map(i => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const rr = r * scales[i];
    return `${Math.cos(a) * rr},${Math.sin(a) * rr}`;
  }).join(' ');
}

// Decorative crypto coin stack from the SwiftUI opening
function OnbCoinStack() {
  const coin = (label, color, x, y, size) => (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, #fff, ${color} 70%)`,
      boxShadow: `0 8px 22px ${color}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: TYPE.family, fontWeight: 700, fontSize: size * 0.4, color: '#fff',
    }}>{label}</div>
  );
  return (
    <div style={{ position: 'relative', width: 260, height: 110 }}>
      {coin('◆', '#8247E5', 12,  30, 48)}  {/* Polygon */}
      {coin('Ξ', '#627EEA', 108, 8,  60)}  {/* Ethereum */}
      {coin('₿', '#F7931A', 196, 36, 52)}  {/* Bitcoin */}
    </div>
  );
}

Object.assign(window, { OnboardingScreen, ONB_STEPS });
