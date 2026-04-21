import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Button, V2GhostMark, V2PhantomSays } from './tokens.jsx';
import { V2Compose } from './Compose.jsx';
import { SEED_OPTIONS } from './dnaData.js';

const ONB_EXAMPLES = [
  {
    label: 'A hesitation ghost',
    text: "AAPL long, about $1,000. Earnings next week — probably safer to wait.",
  },
  {
    label: 'A chase ghost',
    text: "COIN long, 20 shares at $210. Everyone's posting gains, feels like I'm late.",
  },
];

export function V2Onboarding({ startStep = 0, onDone, onSetSeed }) {
  const [step, setStep] = React.useState(startStep);
  const [seed, setSeed] = React.useState(null);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  React.useEffect(() => { setStep(startStep); }, [startStep]);

  if (step === 0) return <V2OnbCover onNext={next}/>;
  if (step === 1) return <V2OnbConcept onNext={next} onBack={back}/>;
  if (step === 2) return (
    <V2OnbSeed
      selected={seed}
      onSelect={setSeed}
      onNext={() => { if (seed) { onSetSeed && onSetSeed(seed); next(); } }}
      onBack={back}
    />
  );
  return (
    <V2OnbFirstGhost
      onSave={(parsed, text) => onDone && onDone({ parsed, text, seed })}
      onSkip={() => onDone && onDone({ skipped: true, seed })}
      onBack={back}
    />
  );
}

export function V2OnbCover({ onNext }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      minHeight: '100%', fontFamily: V2_FONT.sans,
    }}>
      <span style={{ flex: 1 }}/>

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
      }}>
        <V2GhostMark mood="hero"/>
        <div style={{
          fontFamily: V2_FONT.display,
          fontSize: 56, fontWeight: 400,
          color: V2.ink, letterSpacing: '-0.02em', lineHeight: 1,
        }}>Phantom</div>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 22, color: V2.ink55,
          letterSpacing: '-0.005em', textAlign: 'center',
          textWrap: 'balance', maxWidth: 300,
        }}>
          For the trades you almost made.
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'flex-end',
        width: '100%',
        opacity: ready ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}>
        <V2Button variant="primary" full onClick={onNext}>
          Begin
        </V2Button>
      </div>
    </div>
  );
}

export function V2OnbConcept({ onNext, onBack }) {
  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column',
      minHeight: '100%', fontFamily: V2_FONT.sans,
    }}>
      <OnbHeader step={2} total={4} onBack={onBack}/>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 20,
        maxWidth: 340, margin: '0 auto', width: '100%',
      }}>
        <V2Meta>A ghost trade</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display,
          fontSize: 26, fontStyle: 'italic',
          lineHeight: 1.3, color: V2.ink,
          letterSpacing: '-0.01em', textWrap: 'balance',
        }}>
          A ghost is a trade you almost made.
        </div>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 18, lineHeight: 1.55,
          color: V2.ink70, margin: 0, textWrap: 'pretty',
        }}>
          You thought about it, you didn't act, and it drifted away. Phantom is where you write those down — so later, you can see the shape of them.
        </p>
        <V2PhantomSays style={{ marginTop: 4 }}>
          I keep them for you.
        </V2PhantomSays>
      </div>

      <V2Button variant="primary" full onClick={onNext}>
        Next
      </V2Button>
    </div>
  );
}

export function V2OnbSeed({ selected, onSelect, onNext, onBack }) {
  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 24,
      minHeight: '100%', fontFamily: V2_FONT.sans,
    }}>
      <OnbHeader step={3} total={4} onBack={onBack}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>One question</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 28, lineHeight: 1.25, color: V2.ink,
          letterSpacing: '-0.005em', textWrap: 'balance',
        }}>
          What brings you here?
        </div>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 15, lineHeight: 1.5,
          color: V2.ink55, margin: 0, textWrap: 'pretty',
        }}>
          Pick the one that sounds most like you. We'll refine this as you write.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SEED_OPTIONS.map(opt => (
          <SeedChoice
            key={opt.key}
            label={opt.label}
            sub={opt.sub}
            selected={selected === opt.key}
            onClick={() => onSelect(opt.key)}
          />
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <V2Button variant="primary" full onClick={onNext} style={{
          opacity: selected ? 1 : 0.35,
          pointerEvents: selected ? 'auto' : 'none',
        }}>
          Continue
        </V2Button>
      </div>
    </div>
  );
}

export function V2OnbFirstGhost({ onSave, onSkip, onBack }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      minHeight: '100%',
    }}>
      <div style={{
        padding: '20px 28px 0',
        display: 'flex', justifyContent: 'center',
      }}>
        <V2Meta>Step 4 of 4</V2Meta>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <V2Compose
          onCancel={onBack}
          cancelLabel="Back"
          onSave={onSave}
          onSkip={onSkip}
          examples={ONB_EXAMPLES}
        />
      </div>
    </div>
  );
}

function OnbHeader({ step, total, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 8,
    }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: V2.ink55, fontFamily: V2_FONT.sans, fontSize: 15,
        padding: 0, letterSpacing: '-0.005em',
      }}>← Back</button>
      <V2Meta>Step {step} of {total}</V2Meta>
      <span style={{ width: 40 }}/>
    </div>
  );
}

function SeedChoice({ label, sub, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', cursor: 'pointer',
      background: selected ? V2.paperDeep : 'transparent',
      border: `1px solid ${selected ? V2.ink : V2.ink15}`,
      borderRadius: 16,
      padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 4,
      fontFamily: V2_FONT.sans,
      transition: 'background 140ms ease, border-color 140ms ease',
    }}>
      <span style={{
        fontFamily: V2_FONT.display, fontSize: 18,
        color: V2.ink, letterSpacing: '-0.005em',
      }}>{label}</span>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 13, color: V2.ink55,
      }}>{sub}</span>
    </button>
  );
}
