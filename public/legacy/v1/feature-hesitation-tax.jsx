// feature-hesitation-tax.jsx — HesitationTaxView
// Mirrors ios/Features/HesitationTax/Views/HesitationTaxView.swift

function HesitationTaxView({ onBack }) {
  const F = window.PhantomFixtures;
  const t = F.hesitationTaxDetail;
  return (
    <Screen bg={PHANTOM.lightPurple}>
      <TopBar title="Hesitation Tax" onBack={onBack}/>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <HTCompareCard label="If you invested" value={`$${t.ifYouInvested.toLocaleString()}`} muted/>
        <HTCompareCard label="Your hesitation" value={`$${t.yourHesitation.toLocaleString()}`}/>
      </div>

      <Card style={{ padding: 18, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <TaxBadge/>
          <div style={{ ...TYPE.bodySmallSB }}>Your Hesitation Tax</div>
        </div>
        <div style={{ ...TYPE.title, color: PHANTOM.green }}>
          Gain: +${t.gain.toLocaleString()} <span style={{ ...TYPE.body, fontWeight: 500, color: PHANTOM.textSecondary }}>({t.gainPct}%)</span>
        </div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginTop: 8 }}>
          The difference between what you hesitated on and what actually happened.
        </div>

        {/* Placeholder for Swift Charts view */}
        <div style={{
          marginTop: 14, height: 120, borderRadius: 12,
          background: PHANTOM.lightPurple,
          border: `1px dashed ${PHANTOM.borderPurple}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: PHANTOM.textTertiary, fontSize: 12,
        }}>
          Chart: Ghost vs. Actual Performance
        </div>
      </Card>

      <Card style={{ padding: 18, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <TaxBadge kind="triggers"/>
          <div style={{ ...TYPE.bodySmallSB }}>Your common triggers</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {t.triggers.map(tr => {
            const pct = Math.min(100, (tr.count / t.triggers[0].count) * 100);
            return (
              <div key={tr.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', ...TYPE.bodySmall, marginBottom: 4 }}>
                  <span>{tr.label}</span>
                  <span style={{ color: PHANTOM.textSecondary }}>{tr.count} ghosts</span>
                </div>
                <div style={{ height: 6, background: PHANTOM.borderPurple, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: `linear-gradient(90deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
                  }}/>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 18, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <TaxBadge kind="overcome"/>
          <div style={{ ...TYPE.bodySmallSB }}>Overcoming hesitation</div>
        </div>
        <p style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, margin: 0, lineHeight: 1.55 }}>
          Small commits beat big leaps. Try logging the next ghost <em>before</em> you decide — writing it down is half the discipline.
        </p>
      </Card>

      <Card style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <TaxBadge kind="perf"/>
          <div style={{ ...TYPE.bodySmallSB }}>Ghost performance</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {window.PhantomFixtures.ghosts.slice(0, 4).map(g => {
            const isGain = g.hesitationTax >= 0;
            return (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ ...TYPE.bodySmallSB, width: 52 }}>{g.ticker}</div>
                <div style={{ ...TYPE.small, color: PHANTOM.textSecondary, flex: 1 }}>
                  {g.direction} · {g.size}
                </div>
                <div style={{ ...TYPE.bodySmallSB, color: isGain ? PHANTOM.green : PHANTOM.red }}>
                  {isGain ? '+' : '−'}${Math.abs(g.hesitationTax).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Screen>
  );
}

function HTCompareCard({ label, value, muted = false }) {
  return (
    <div style={{
      flex: 1,
      background: muted ? PHANTOM.white : `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
      borderRadius: 16, padding: 14,
      color: muted ? PHANTOM.textPrimary : PHANTOM.white,
      border: muted ? `1px solid ${PHANTOM.inputBorder}` : 'none',
      boxShadow: muted ? '0 1px 4px rgba(0,0,0,0.04)' : '0 8px 20px rgba(56,3,177,0.26)',
    }}>
      <div style={{ ...TYPE.smallM, opacity: muted ? 1 : 0.85, color: muted ? PHANTOM.textSecondary : PHANTOM.white, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        {label}
      </div>
      <div style={{ ...TYPE.title, fontSize: 26, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function TaxBadge({ kind = 'tax' }) {
  const bg = PHANTOM.tagBg;
  const color = PHANTOM.purple;
  const paths = {
    tax: <path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-7h6v7" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    triggers: <path d="M12 3v6m0 0l-4 4m4-4l4 4M5 21h14" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    overcome: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    perf: <path d="M3 17l5-5 4 4 9-9" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  };
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 9,
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{paths[kind] || paths.tax}</svg>
    </div>
  );
}

Object.assign(window, { HesitationTaxView });
