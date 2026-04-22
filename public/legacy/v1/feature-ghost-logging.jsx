// feature-ghost-logging.jsx — StartLog, Step1, Step2, Emotion, Notes, GhostLogged
// Mirrors ios/Features/GhostLogging/Views/

function StartLogView({ onStart, onBack }) {
  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Log a ghost" onBack={onBack}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <PhantomLogo size={64}/>
        <div>
          <div style={{ ...TYPE.title, marginBottom: 6 }}>
            <GradientText>Phantom</GradientText>
          </div>
          <div style={{ ...TYPE.subheadline, color: PHANTOM.textSecondary }}>
            Log the trades you didn't take.
          </div>
        </div>
      </div>
      <PhantomButton title="Start Log" onClick={onStart}/>
    </Screen>
  );
}

function LogStep1({ onBack, onNext, state, setState }) {
  const [ticker, setTicker]       = [state.ticker,    v => setState({ ...state, ticker: v })];
  const [direction, setDirection] = [state.direction, v => setState({ ...state, direction: v })];
  const [priceMode, setPriceMode] = [state.priceMode, v => setState({ ...state, priceMode: v })];
  const [price, setPrice]         = [state.price,     v => setState({ ...state, price: v })];
  const [qtyUnit, setQtyUnit]     = [state.qtyUnit,   v => setState({ ...state, qtyUnit: v })];
  const [qty, setQty]             = [state.qty,       v => setState({ ...state, qty: v })];

  const validTicker = ticker.length >= 2;
  const canNext = validTicker && direction && (priceMode === 'current' || price) && qty;

  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Log a ghost" onBack={onBack}/>

      <div style={{ marginBottom: 18 }}>
        <StepProgress current={1} total={2}/>
      </div>

      <div style={{ ...TYPE.title, marginBottom: 4 }}>What did you almost trade?</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 12 }}>
        <div>
          <Label>Search ticker (e.g. NVDA)</Label>
          <PhantomTextField
            placeholder="SEARCH TICKER"
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            leading={<SearchIcon/>}
          />
        </div>

        {validTicker && (
          <React.Fragment>
            <div>
              <Label>Direction</Label>
              <ChoicePair
                options={[{ k: 'Buy' }, { k: 'Sell' }]}
                value={direction}
                onChange={setDirection}
              />
            </div>

            <div>
              <Label>Price</Label>
              <ChoicePair
                options={[{ k: 'current', l: 'Current price' }, { k: 'enter', l: 'Enter price' }]}
                value={priceMode}
                onChange={setPriceMode}
              />
              {priceMode === 'enter' && (
                <div style={{ marginTop: 10 }}>
                  <PhantomTextField
                    placeholder="Price per share"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    leading={<span style={{ ...TYPE.bodySmallSB, color: PHANTOM.gray }}>$</span>}
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Quantity</Label>
              <ChoicePair
                options={[{ k: 'shares', l: 'Shares' }, { k: 'dollars', l: 'Dollars' }]}
                value={qtyUnit}
                onChange={setQtyUnit}
              />
              <div style={{ marginTop: 10 }}>
                <PhantomTextField
                  placeholder={qtyUnit === 'shares' ? 'Number of shares' : 'Dollar amount ($)'}
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <PhantomButton title="Next" onClick={onNext} disabled={!canNext}/>
      </div>
    </Screen>
  );
}

function LogStep2({ onBack, onNext, state, setState }) {
  const F = window.PhantomFixtures;
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = [state.tags || [], tags => setState({ ...state, tags })];
  const reasons = F.hesitationReasons.filter(r => r.toLowerCase().includes(q.toLowerCase()));
  const toggle = (r) => {
    setSelected(selected.includes(r) ? selected.filter(x => x !== r) : [...selected, r]);
  };

  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Log a ghost" onBack={onBack}/>

      <div style={{ marginBottom: 18 }}>
        <StepProgress current={2} total={2}/>
      </div>

      <div style={{ ...TYPE.title, marginBottom: 4 }}>Why did you hesitate?</div>
      <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginBottom: 16 }}>
        Pick any that apply. You can add your own after.
      </div>

      <PhantomTextField
        placeholder="Search reasons"
        value={q}
        onChange={e => setQ(e.target.value)}
        leading={<SearchIcon/>}
      />

      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {selected.map(s => (
            <Tag
              key={s}
              label={s}
              active
              onClick={() => toggle(s)}
              trailing={<span style={{ fontSize: 14, marginLeft: 2 }}>×</span>}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <SectionHeader>Suggestions</SectionHeader>
        <Card style={{ padding: 0 }}>
          {reasons.map((r, i) => (
            <button key={r} onClick={() => toggle(r)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '13px 16px',
              background: 'transparent', border: 'none',
              borderBottom: i === reasons.length - 1 ? 'none' : `1px solid ${PHANTOM.separator}`,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: TYPE.family,
            }}>
              <span style={{ flex: 1, fontSize: 15 }}>{r}</span>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                border: `1.5px solid ${selected.includes(r) ? PHANTOM.purple : PHANTOM.lightGray}`,
                background: selected.includes(r) ? PHANTOM.purple : 'transparent',
                color: PHANTOM.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, lineHeight: 1,
              }}>{selected.includes(r) ? '✓' : '+'}</span>
            </button>
          ))}
        </Card>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <PhantomButton title="Log Ghost" onClick={onNext} disabled={selected.length === 0}/>
      </div>
    </Screen>
  );
}

function LogEmotion({ onBack, onNext, state, setState }) {
  const emotions = [
    { k: 'calm',      l: 'Calm',      color: '#7B61FF' },
    { k: 'anxious',   l: 'Anxious',   color: '#E89E3F' },
    { k: 'confident', l: 'Confident', color: '#0BAA36' },
    { k: 'fearful',   l: 'Fearful',   color: '#D92D20' },
    { k: 'excited',   l: 'Excited',   color: '#3803B1' },
    { k: 'regretful', l: 'Regretful', color: '#6C7278' },
  ];
  const sel = state.emotion;
  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="How did it feel?" onBack={onBack}/>
      <div style={{ ...TYPE.title, marginBottom: 4 }}>Name the feeling</div>
      <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginBottom: 20 }}>
        This helps Phantom spot patterns you can't see yet.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {emotions.map(e => (
          <button key={e.k} onClick={() => setState({ ...state, emotion: e.k })} style={{
            padding: '16px 14px',
            border: `1.5px solid ${sel === e.k ? e.color : PHANTOM.inputBorder}`,
            background: sel === e.k ? `${e.color}18` : PHANTOM.white,
            borderRadius: 14,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: TYPE.family,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: e.color }}/>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{e.l}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
        <PhantomButton style="secondary" fullWidth={false} title="Skip" onClick={onNext}/>
        <PhantomButton title="Continue" onClick={onNext} fullWidth disabled={!sel}/>
      </div>
    </Screen>
  );
}

function LogNotes({ onBack, onNext, state, setState }) {
  return (
    <Screen bg={PHANTOM.white}>
      <TopBar title="Notes" onBack={onBack}/>
      <div style={{ ...TYPE.title, marginBottom: 4 }}>Anything to remember?</div>
      <div style={{ ...TYPE.bodySmall, color: PHANTOM.textSecondary, marginBottom: 16 }}>
        Optional. A line you'll want to re-read when this ghost comes back.
      </div>

      <textarea
        value={state.notes || ''}
        onChange={e => setState({ ...state, notes: e.target.value })}
        placeholder="e.g. Earnings next week — probably safer to wait."
        style={{
          width: '100%', minHeight: 180,
          padding: 16,
          border: `1px solid ${PHANTOM.inputBorder}`,
          borderRadius: 14,
          fontFamily: TYPE.family, fontSize: 15, lineHeight: 1.5,
          color: PHANTOM.textPrimary,
          outline: 'none', resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
        <PhantomButton style="secondary" fullWidth={false} title="Skip" onClick={onNext}/>
        <PhantomButton title="Save ghost" onClick={onNext}/>
      </div>
    </Screen>
  );
}

function GhostLoggedView({ state, onDone }) {
  return (
    <Screen bg={PHANTOM.white}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 18, textAlign: 'center' }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: `linear-gradient(135deg, ${PHANTOM.purple}, ${PHANTOM.purpleGrad})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 14px 30px rgba(56,3,177,0.28)',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ ...TYPE.titleBold }}>
          <GradientText>Ghost logged</GradientText>
        </div>
        <div style={{ ...TYPE.subheadline, color: PHANTOM.textSecondary, maxWidth: 280 }}>
          {state.ticker ? `${state.ticker} · ${state.direction}` : 'We\'ll hold onto this one for you.'}
        </div>
        <div style={{ ...TYPE.bodySmall, color: PHANTOM.textTertiary, maxWidth: 300 }}>
          We'll surface it again when the market moves — so you can see what hesitation cost or saved.
        </div>
      </div>

      <PhantomButton title="Done" onClick={onDone}/>
    </Screen>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{ ...TYPE.smallSB, color: PHANTOM.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
      {children}
    </div>
  );
}

function ChoicePair({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map(o => {
        const k = o.k;
        const l = o.l || o.k;
        const active = value === k;
        return (
          <button key={k} onClick={() => onChange(k)} style={{
            flex: 1, padding: '12px 16px',
            border: `1.5px solid ${active ? PHANTOM.purple : PHANTOM.inputBorder}`,
            background: active ? PHANTOM.tagBg : PHANTOM.white,
            color: active ? PHANTOM.purple : PHANTOM.textPrimary,
            borderRadius: 12,
            fontFamily: TYPE.family, fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>{l}</button>
        );
      })}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

Object.assign(window, {
  StartLogView, LogStep1, LogStep2, LogEmotion, LogNotes, GhostLoggedView,
});
