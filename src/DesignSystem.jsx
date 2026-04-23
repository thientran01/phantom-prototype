import React from 'react';
import { V2, V2_FONT, V2Meta, V2Rule, V2Button, V2Tag, V2Ticker, V2Spectrum, V2GhostMark } from './tokens.jsx';
import { V2EmotionMini } from './Emotion.jsx';

export function V2DesignSystemPanel() {
  return (
    <aside style={{
      position: 'fixed',
      top: 20, right: 20, bottom: 20,
      width: 360,
      background: V2.paper,
      border: `1px solid ${V2.rule}`,
      borderRadius: 20,
      padding: '24px 24px 28px',
      overflowY: 'auto',
      fontFamily: V2_FONT.sans,
      color: V2.ink,
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <V2Meta>Design system</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 26, color: V2.ink, letterSpacing: '-0.01em', lineHeight: 1.15,
        }}>Phantom</div>
        <a href="/compare.html" style={{
          fontFamily: V2_FONT.sans, fontSize: 13,
          fontWeight: 600,
          color: V2.ink, textDecoration: 'none',
          letterSpacing: '-0.01em',
          marginTop: 6,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          alignSelf: 'flex-start',
          padding: '8px 14px',
          borderRadius: 999,
          background: V2.ink,
          color: V2.paper,
        }}>Compare MVP ↗</a>
      </header>

      <Section label="Type">
        <TypeRow
          sample="Newsreader italic"
          style={{ fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 32, lineHeight: 1.1, color: V2.ink }}
          caption="Display — confessional moments"
        />
        <TypeRow
          sample="Newsreader regular"
          style={{ fontFamily: V2_FONT.display, fontSize: 20, color: V2.ink, lineHeight: 1.35 }}
          caption="Body serif — paragraphs & moment cards"
        />
        <TypeRow
          sample="Geist Medium"
          style={{ fontFamily: V2_FONT.sans, fontSize: 17, fontWeight: 500, color: V2.ink, letterSpacing: '-0.005em' }}
          caption="UI — buttons, labels, tabs"
        />
        <TypeRow
          sample="AAPL · MSFT · NVDA"
          style={{ fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink, letterSpacing: '0.02em' }}
          caption="Geist Mono — tickers & metadata"
        />
        <TypeRow
          sample="OVERLINE META · 0.14EM"
          style={{
            fontFamily: V2_FONT.sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: V2.ink55,
          }}
          caption="Meta — section overlines"
        />
      </Section>

      <Section label="Color">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Swatch color={V2.paper} name="Paper" hex="#FAF6EE" border />
          <Swatch color={V2.paperDeep} name="Paper deep" hex="#F2ECDE" border />
          <Swatch color={V2.ink} name="Ink" hex="#1A1714" light />
          <Swatch color={V2.paperDark} name="Paper dark" hex="#1A1714" light />
          <Swatch color={V2.indigo} name="Indigo" hex="#2B2B6E" light />
          <Swatch color={V2.mossInk} name="Moss" hex="#2A4A34" light />
          <Swatch color={V2.emberInk} name="Ember" hex="#8A3E1D" light />
          <Swatch color={V2.rule} name="Rule" hex="#E8E1D2" border />
        </div>
      </Section>

      <Section label="Ink opacities">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <V2Rule />
          <InkRow label="ink" value="100%" color={V2.ink} />
          <V2Rule />
          <InkRow label="ink85" value="85%" color={V2.ink85} />
          <V2Rule />
          <InkRow label="ink70" value="70%" color={V2.ink70} />
          <V2Rule />
          <InkRow label="ink55" value="55%" color={V2.ink55} />
          <V2Rule />
          <InkRow label="ink35" value="35%" color={V2.ink35} />
          <V2Rule />
          <InkRow label="ink15" value="15%" color={V2.ink15} />
          <V2Rule />
        </div>
      </Section>

      <Section label="Buttons">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <V2Button variant="primary">Log a ghost</V2Button>
          <V2Button variant="paper">Cancel</V2Button>
          <V2Button variant="ghost">Skip</V2Button>
        </div>
      </Section>

      <Section label="Tags">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <V2Tag tone="indigo">Fear of Loss</V2Tag>
          <V2Tag tone="moss">Long</V2Tag>
          <V2Tag tone="ember">Short</V2Tag>
          <V2Tag tone="neutral">Held</V2Tag>
        </div>
      </Section>

      <Section label="Tickers">
        <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
          <V2Ticker>AAPL</V2Ticker>
          <V2Ticker color={V2.mossInk}>+$412</V2Ticker>
          <V2Ticker color={V2.emberInk}>−$180</V2Ticker>
        </div>
      </Section>

      <Section label="Spectrum">
        <V2Spectrum
          leftLabel="Deliberate"
          rightLabel="Impulsive"
          leftLetter="D"
          rightLetter="I"
          position={28}
          activeSide="left"
        />
      </Section>

      <Section label="Moment card">
        <div style={{
          background: V2.paperDeep,
          borderRadius: 20,
          padding: '18px 18px 20px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <V2Meta style={{ color: V2.ink70 }}>A ghost is ready</V2Meta>
          <div style={{
            fontFamily: V2_FONT.display, fontSize: 18, lineHeight: 1.3,
            color: V2.ink, letterSpacing: '-0.005em',
          }}>
            Two days ago, you almost bought <V2Ticker>AAPL</V2Ticker> at $182.
          </div>
          <div style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 32, color: V2.emberInk, letterSpacing: '-0.02em', lineHeight: 1,
          }}>+$412</div>
        </div>
      </Section>

      <Section label="Mascot">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'end', gap: 8,
        }}>
          {['quiet', 'waiting', 'tender', 'hero'].map(m => (
            <div key={m} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              minHeight: 78, justifyContent: 'flex-end',
            }}>
              <V2GhostMark mood={m} />
              <span style={{
                fontFamily: V2_FONT.mono, fontSize: 10,
                color: V2.ink55, letterSpacing: '0.04em',
              }}>{m}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Emotion compass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <V2EmotionMini emotion={{ valence: 0.6, arousal: 0.5 }} size={96} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <V2Meta>High stress · Greed</V2Meta>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 14, color: V2.ink70, lineHeight: 1.4,
            }}>
              Valence × arousal, −1 to 1.
            </span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: V2.ink55, marginTop: 4, lineHeight: 1.5 }}>
          Fear ↔ Greed on x, Calm ↔ High stress on y. Ember dot at the placed point. Post-log, skippable. Read-only mini in Ghost detail.
        </div>
      </Section>

      <Section label="Hairline">
        <V2Rule />
        <div style={{ fontSize: 12, color: V2.ink55, marginTop: 8 }}>
          1px in <code style={{ fontFamily: V2_FONT.mono }}>V2.rule</code> — used everywhere a border would be.
        </div>
      </Section>

      <Section label="Empty states">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <EmptyThumb
            tag="Today · pre-first"
            headline="The paper is blank."
            sub="Log your first ghost"
          />
          <EmptyThumb
            tag="Today · quiet"
            headline="Nothing to revisit yet."
            sub="2 ghosts logged"
          />
          <EmptyThumb
            tag="Patterns · thin"
            headline="Patterns take a minute."
            sub="2 / 5"
            progress={2 / 5}
          />
          <EmptyThumb
            tag="Archive · empty"
            headline="Nothing yet."
            sub="Log a ghost"
          />
        </div>
        <div style={{ fontSize: 11, color: V2.ink55, marginTop: 4, lineHeight: 1.5 }}>
          Serif italic headline · one paragraph · one CTA. No illustrations, no cards.
        </div>
      </Section>

      <Section label="Principles">
        <ol style={{
          margin: 0, paddingLeft: 0, listStyle: 'none',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {[
            'One color story: warm paper, deep ink.',
            'Serif italic for human moments. Sans and mono for data.',
            'Hairlines, not borders. No stacked drop-shadows.',
            'Prefer type hierarchy to boxes. Cards earn their edges.',
            'Mono is for things the market writes. Italic is for things you write.',
          ].map((p, i) => (
            <li key={i} style={{
              display: 'flex', gap: 10, alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: V2_FONT.mono, fontSize: 10, color: V2.ink35,
                minWidth: 18, letterSpacing: '0.04em',
              }}>0{i + 1}</span>
              <span style={{
                fontFamily: V2_FONT.display, fontSize: 14, lineHeight: 1.5,
                color: V2.ink70,
              }}>{p}</span>
            </li>
          ))}
        </ol>
      </Section>
    </aside>
  );
}

function Section({ label, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <V2Meta>{label}</V2Meta>
      {children}
    </section>
  );
}

function TypeRow({ sample, style, caption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={style}>{sample}</div>
      <div style={{ fontSize: 11, color: V2.ink55, letterSpacing: '0.02em' }}>{caption}</div>
    </div>
  );
}

function Swatch({ color, name, hex, border, light }) {
  return (
    <div style={{
      background: color,
      borderRadius: 12,
      padding: '12px 12px 10px',
      border: border ? `1px solid ${V2.rule}` : 'none',
      display: 'flex', flexDirection: 'column', gap: 2,
      minHeight: 62,
      justifyContent: 'flex-end',
    }}>
      <span style={{
        fontFamily: V2_FONT.sans, fontSize: 12, fontWeight: 500,
        color: light ? V2.paper : V2.ink,
      }}>{name}</span>
      <span style={{
        fontFamily: V2_FONT.mono, fontSize: 10,
        color: light ? 'rgba(250,246,238,0.6)' : V2.ink55,
      }}>{hex}</span>
    </div>
  );
}

function EmptyThumb({ tag, headline, sub, progress }) {
  return (
    <div style={{
      background: V2.paper,
      border: `1px solid ${V2.rule}`,
      borderRadius: 12,
      padding: '12px 12px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      minHeight: 108,
    }}>
      <span style={{
        fontFamily: V2_FONT.sans, fontSize: 9, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: V2.ink55,
      }}>{tag}</span>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 15, lineHeight: 1.2, color: V2.ink,
        letterSpacing: '-0.005em',
      }}>{headline}</span>
      {typeof progress === 'number' ? (
        <div style={{
          height: 2, background: V2.ink08, borderRadius: 2, marginTop: 'auto',
        }}>
          <div style={{
            width: `${Math.min(100, progress * 100)}%`, height: '100%', background: V2.ink,
          }} />
        </div>
      ) : null}
      <span style={{
        fontSize: 10, color: V2.ink55, marginTop: typeof progress === 'number' ? 0 : 'auto',
      }}>{sub}</span>
    </div>
  );
}

function InkRow({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0',
    }}>
      <span style={{ fontFamily: V2_FONT.mono, fontSize: 12, color: V2.ink70 }}>{label}</span>
      <span style={{
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 11, color: V2.ink55 }}>{value}</span>
        <span style={{
          width: 60, height: 16, borderRadius: 4,
          background: color, border: `1px solid ${V2.rule}`,
        }} />
      </span>
    </div>
  );
}
