import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Button, V2Tag, V2Spectrum, V2Ticker } from './tokens.jsx';
import { DNA_AXES, DNA_ARCHETYPES, USER_DNA } from './dnaData.js';

function Header({ onBack, label, trailing }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: V2.ink55, fontFamily: V2_FONT.sans, fontSize: 15, padding: 0,
      }}>← Close</button>
      <V2Meta>{label}</V2Meta>
      <span style={{ width: 40, textAlign: 'right', fontSize: 13, color: V2.ink35 }}>{trailing || ''}</span>
    </div>
  );
}

function activeSideFor(axisKey, scores) {
  return scores[axisKey] < 50 ? 'left' : 'right';
}

function letterFor(axis, scores) {
  return scores[axis.key] < 50 ? axis.letters[0] : axis.letters[1];
}

export function V2DNALocked({ onBack }) {
  const logged = USER_DNA.formingGhostCount > USER_DNA.ghostsNeeded ? USER_DNA.ghostsNeeded : 1;
  const needed = USER_DNA.ghostsNeeded;
  const pct = Math.min(100, (logged / needed) * 100);

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 36,
      fontFamily: V2_FONT.sans,
      minHeight: '100%',
    }}>
      <Header onBack={onBack} label="Your DNA"/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <V2Meta>Sealed · {logged} of {needed} ghosts</V2Meta>
        <V2Display size={40} italic>Your DNA is sealed.</V2Display>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 19, lineHeight: 1.55,
          color: V2.ink70, margin: 0, textWrap: 'pretty', maxWidth: 340,
        }}>
          Log <span style={{ color: V2.ink }}>{needed - logged} more {needed - logged === 1 ? 'ghost' : 'ghosts'}</span> to read the first letter. The rest reveal as you go.
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 14, justifyContent: 'center',
        padding: '36px 0',
      }}>
        {['—', '—', '—', '—'].map((l, i) => (
          <LetterTile key={i} letter={l} muted/>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          height: 3, background: V2.ink08, borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{ width: `${pct}%`, height: '100%', background: V2.ink }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: V2.ink55 }}>
          <span>{logged} logged</span>
          <span>{needed} to unlock</span>
        </div>
      </div>

      <p style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 15,
        color: V2.ink55, textAlign: 'center', margin: 0, textWrap: 'balance',
        marginTop: 'auto',
      }}>
        "You are the shape of the trades you almost made."
      </p>
    </div>
  );
}

export function V2DNAForming({ onBack, onOpenRevealed }) {
  const revealedKeys = USER_DNA.formingRevealedOrder;
  const letters = DNA_AXES.map(axis => {
    if (revealedKeys.includes(axis.key)) {
      return { letter: letterFor(axis, USER_DNA.scores), revealed: true };
    }
    return { letter: '—', revealed: false };
  });
  const count = revealedKeys.length;

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 32,
      fontFamily: V2_FONT.sans,
    }}>
      <Header onBack={onBack} label="Your DNA"/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        <V2Meta>Forming · {count} of 4 letters read</V2Meta>
        <V2Display size={36} italic>The shape is starting to show.</V2Display>
      </div>

      <div style={{
        display: 'flex', gap: 14, justifyContent: 'center',
        padding: '20px 0 8px',
      }}>
        {letters.map((l, i) => (
          <LetterTile key={i} letter={l.letter} muted={!l.revealed}/>
        ))}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        alignItems: 'center',
      }}>
        <V2Meta>Early signal</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 13, color: V2.ink55,
          letterSpacing: '0.02em',
        }}>
          {DNA_AXES.filter(a => revealedKeys.includes(a.key))
            .map(a => a.names[USER_DNA.scores[a.key] < 50 ? 0 : 1])
            .join(' · ')}
        </div>
      </div>

      <div style={{
        background: V2.paperDeep,
        border: 'none',
        borderRadius: 24,
        padding: '22px 22px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <V2Meta style={{ color: V2.ink70 }}>What we have so far</V2Meta>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 22, lineHeight: 1.3,
          color: V2.ink, letterSpacing: '-0.005em',
        }}>
          You take your time, and you lead with caution. The rest of you is still on paper.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <V2Rule/>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0',
        }}>
          <span style={{ fontSize: 14, color: V2.ink70 }}>Next letter reveals at</span>
          <span style={{ fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink }}>10 ghosts</span>
        </div>
        <V2Rule/>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0',
        }}>
          <span style={{ fontSize: 14, color: V2.ink70 }}>You've logged</span>
          <span style={{ fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink }}>{USER_DNA.formingGhostCount} ghosts</span>
        </div>
        <V2Rule/>
      </div>

      {onOpenRevealed && (
        <V2Button variant="ghost" full onClick={onOpenRevealed}>
          Preview the full read →
        </V2Button>
      )}
    </div>
  );
}

export function V2DNARevealed({ onBack, onOpenArchetype, onOpenAxis }) {
  const archetype = DNA_ARCHETYPES[USER_DNA.code];
  const letters = USER_DNA.code.split('');

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 32,
      fontFamily: V2_FONT.sans,
    }}>
      <Header onBack={onBack} label="Your DNA" trailing="locked"/>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'baseline',
        gap: 4, padding: '12px 0 4px',
      }}>
        {letters.map((l, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => onOpenAxis && onOpenAxis(DNA_AXES[i].key)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '4px 8px',
                fontFamily: V2_FONT.display,
                fontStyle: 'italic',
                fontSize: 84,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: V2.ink,
              }}>{l}</button>
            {i < letters.length - 1 && (
              <span style={{
                fontFamily: V2_FONT.display,
                fontSize: 48, color: V2.ink35, lineHeight: 1,
                transform: 'translateY(-14px)',
              }}>·</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <button onClick={onOpenArchetype} style={{
        textAlign: 'left', cursor: 'pointer',
        background: V2.paperDeep,
        border: 'none',
        borderRadius: 24,
        padding: '22px 24px 24px',
        display: 'flex', flexDirection: 'column', gap: 8,
        fontFamily: V2_FONT.sans,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <V2Meta style={{ color: V2.ink70 }}>You are</V2Meta>
          <span style={{ fontSize: 18, color: V2.ink35, lineHeight: 1 }}>→</span>
        </div>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 36,
          color: V2.ink, letterSpacing: '-0.01em', lineHeight: 1.1,
        }}>{archetype.name}</div>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 17, lineHeight: 1.45,
          color: V2.ink70, textWrap: 'pretty',
        }}>{archetype.subtitle}</div>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <V2Meta>Where you land</V2Meta>
        {DNA_AXES.map(axis => (
          <button key={axis.key}
            onClick={() => onOpenAxis && onOpenAxis(axis.key)}
            style={{
              background: 'transparent', border: 'none', padding: '8px 0',
              cursor: 'pointer', width: '100%', textAlign: 'left',
            }}>
            <V2Spectrum
              leftLabel={axis.left.name}
              rightLabel={axis.right.name}
              leftLetter={axis.letters[0]}
              rightLetter={axis.letters[1]}
              position={USER_DNA.scores[axis.key]}
              activeSide={activeSideFor(axis.key, USER_DNA.scores)}
            />
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <V2Meta>Radar</V2Meta>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MiniRadar scores={USER_DNA.scores} onSelectAxis={onOpenAxis}/>
        </div>
      </div>

      <p style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 14,
        color: V2.ink55, textAlign: 'center', margin: 0, textWrap: 'balance',
      }}>
        Tap a letter or a spectrum row to read why.
      </p>
    </div>
  );
}

export function V2DNAArchetype({ onBack, onOpenAxis, onOpenArchetypeCode }) {
  const archetype = DNA_ARCHETYPES[USER_DNA.code];
  const [filter, setFilter] = React.useState('essay');

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <Header onBack={onBack} label={archetype.code}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <V2Meta>You are</V2Meta>
        <V2Display size={44} italic>{archetype.name}</V2Display>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 19, lineHeight: 1.5,
          color: V2.ink70, textWrap: 'pretty', marginTop: 4,
        }}>{archetype.subtitle}</div>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${V2.rule}` }}>
        {[
          { k: 'essay',      l: 'Essay'      },
          { k: 'strengths',  l: 'Strengths'  },
          { k: 'blindspots', l: 'Blindspots' },
          { k: 'twins',      l: 'Twins'      },
        ].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '10px 0', marginRight: 20,
            fontFamily: V2_FONT.sans,
            fontSize: 13,
            color: filter === f.k ? V2.ink : V2.ink55,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            borderBottom: `2px solid ${filter === f.k ? V2.ink : 'transparent'}`,
            marginBottom: -1,
            transition: 'color 120ms ease, border-color 120ms ease',
          }}>{f.l}</button>
        ))}
      </div>

      {filter === 'essay' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {archetype.essay.map((p, i) => (
            <p key={i} style={{
              fontFamily: V2_FONT.display, fontSize: 18, lineHeight: 1.55,
              color: i === 0 ? V2.ink : V2.ink70, margin: 0,
              textWrap: 'pretty',
            }}>{p}</p>
          ))}
        </div>
      )}

      {filter === 'strengths' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <V2Rule/>
          {archetype.strengths.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 16,
                padding: '18px 0',
              }}>
                <span style={{
                  fontFamily: V2_FONT.mono, fontSize: 11, color: V2.mossInk,
                  minWidth: 16,
                }}>0{i+1}</span>
                <span style={{
                  fontFamily: V2_FONT.display, fontSize: 19, color: V2.ink,
                  letterSpacing: '-0.005em',
                }}>{s}</span>
              </div>
              <V2Rule/>
            </React.Fragment>
          ))}
        </div>
      )}

      {filter === 'blindspots' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <V2Rule/>
          {archetype.blindspots.map((b, i) => (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 16,
                padding: '18px 0',
              }}>
                <span style={{
                  fontFamily: V2_FONT.mono, fontSize: 11, color: V2.emberInk,
                  minWidth: 16,
                }}>0{i+1}</span>
                <span style={{
                  fontFamily: V2_FONT.display, fontSize: 19, color: V2.ink,
                  letterSpacing: '-0.005em',
                }}>{b}</span>
              </div>
              <V2Rule/>
            </React.Fragment>
          ))}
        </div>
      )}

      {filter === 'twins' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{
            fontFamily: V2_FONT.display, fontSize: 16, lineHeight: 1.5,
            color: V2.ink70, margin: 0,
          }}>One letter away from you. You could drift either direction depending on the week.</p>
          {archetype.twins.map(twinCode => {
            const twin = DNA_ARCHETYPES[twinCode];
            if (!twin) return null;
            return (
              <button key={twinCode}
                onClick={() => onOpenArchetypeCode && onOpenArchetypeCode(twinCode)}
                style={{
                  background: 'transparent', border: `1px solid ${V2.rule}`,
                  borderRadius: 18, padding: '18px 20px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                  textAlign: 'left', cursor: 'pointer',
                  fontFamily: V2_FONT.sans,
                }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: V2_FONT.mono, fontSize: 13, color: V2.ink55,
                    letterSpacing: '0.04em',
                  }}>{twin.code}</span>
                  <span style={{ fontSize: 14, color: V2.ink35 }}>→</span>
                </div>
                <div style={{
                  fontFamily: V2_FONT.display, fontStyle: 'italic',
                  fontSize: 22, color: V2.ink, letterSpacing: '-0.005em',
                }}>{twin.name}</div>
                <div style={{
                  fontFamily: V2_FONT.display, fontSize: 14, lineHeight: 1.45,
                  color: V2.ink70,
                }}>{twin.subtitle}</div>
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
        <V2Meta>Your spectra</V2Meta>
        {DNA_AXES.map(axis => (
          <button key={axis.key}
            onClick={() => onOpenAxis && onOpenAxis(axis.key)}
            style={{
              background: 'transparent', border: 'none', padding: '6px 0',
              cursor: 'pointer', width: '100%', textAlign: 'left',
            }}>
            <V2Spectrum
              leftLabel={axis.left.name}
              rightLabel={axis.right.name}
              leftLetter={axis.letters[0]}
              rightLetter={axis.letters[1]}
              position={USER_DNA.scores[axis.key]}
              activeSide={activeSideFor(axis.key, USER_DNA.scores)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function V2DNAAxis({ axisKey, onBack, onOpenArchetype }) {
  const axis = DNA_AXES.find(a => a.key === axisKey) || DNA_AXES[0];
  const score = USER_DNA.scores[axis.key];
  const side = score < 50 ? 'left' : 'right';
  const dominant = side === 'left' ? axis.left : axis.right;
  const other = side === 'left' ? axis.right : axis.left;
  const examples = USER_DNA.ghostsForAxis[axis.key] || [];

  return (
    <div style={{
      padding: '24px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <Header onBack={onBack} label={axis.title}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>{axis.title}</V2Meta>
        <V2Display size={32} italic>{axis.question}</V2Display>
      </div>

      <div style={{ padding: '8px 0' }}>
        <V2Spectrum
          leftLabel={axis.left.name}
          rightLabel={axis.right.name}
          leftLetter={axis.letters[0]}
          rightLetter={axis.letters[1]}
          position={score}
          activeSide={side}
        />
      </div>

      <div style={{
        background: V2.paperDeep, borderRadius: 20,
        padding: '20px 22px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 12,
        }}>
          <span style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 28,
            color: V2.ink, letterSpacing: '-0.01em',
          }}>{dominant.name}</span>
          <span style={{
            fontFamily: V2_FONT.mono, fontSize: 12, color: V2.ink55,
          }}>{dominant.letter}</span>
        </div>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 17, lineHeight: 1.5,
          color: V2.ink70, textWrap: 'pretty',
        }}>{dominant.blurb}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>What this means</V2Meta>
        <p style={{
          fontFamily: V2_FONT.display, fontSize: 17, lineHeight: 1.55,
          color: V2.ink70, margin: 0, textWrap: 'pretty',
        }}>{axis.meaning}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <V2Meta>In your ghosts</V2Meta>
        <V2Rule/>
        {examples.map((e, i) => (
          <React.Fragment key={i}>
            <AxisGhostRow entry={e}/>
            <V2Rule/>
          </React.Fragment>
        ))}
      </div>

      <div style={{
        borderTop: `1px solid ${V2.rule}`,
        paddingTop: 20,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <V2Meta>The other side</V2Meta>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 22,
            color: V2.ink55,
          }}>{other.name}</span>
          <span style={{
            fontFamily: V2_FONT.mono, fontSize: 12, color: V2.ink35,
          }}>{other.letter}</span>
        </div>
        <div style={{
          fontFamily: V2_FONT.display, fontSize: 16, lineHeight: 1.55,
          color: V2.ink55, textWrap: 'pretty',
        }}>{other.blurb}</div>
      </div>

      <p style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic', fontSize: 15,
        color: V2.ink70, margin: 0, lineHeight: 1.55, textWrap: 'balance',
      }}>
        {axis.keepInMind}
      </p>

      {onOpenArchetype && (
        <V2Button variant="ghost" full onClick={onOpenArchetype}>
          Back to your archetype →
        </V2Button>
      )}
    </div>
  );
}

function LetterTile({ letter, muted }) {
  return (
    <div style={{
      width: 52, height: 64,
      borderRadius: 10,
      border: `1px solid ${muted ? V2.ink15 : V2.ink}`,
      background: muted ? 'transparent' : V2.paperDeep,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: muted ? V2_FONT.display : V2_FONT.mono,
      fontStyle: muted ? 'italic' : 'normal',
      fontSize: muted ? 28 : 26,
      color: muted ? V2.ink35 : V2.ink,
      letterSpacing: '-0.01em',
    }}>{letter}</div>
  );
}

function MiniRadar({ scores, onSelectAxis }) {
  const SIZE = 200;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 78;
  const axes = DNA_AXES;

  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;

  const polyPoints = axes.map((axis, i) => {
    const raw = scores[axis.key];
    const mag = Math.abs(raw - 50) / 50;
    const r = 20 + mag * (R - 20);
    const a = angle(i);
    return [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
  });

  const ringLevels = [0.33, 0.66, 1];

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: 'visible' }}>
      {ringLevels.map((lvl, i) => (
        <circle key={i} cx={CX} cy={CY} r={R * lvl}
          fill="none" stroke={V2.rule} strokeWidth="1"/>
      ))}
      {axes.map((axis, i) => {
        const a = angle(i);
        return (
          <line key={i}
            x1={CX} y1={CY}
            x2={CX + Math.cos(a) * R}
            y2={CY + Math.sin(a) * R}
            stroke={V2.rule} strokeWidth="1"/>
        );
      })}
      <polygon
        points={polyPoints.map(p => p.join(',')).join(' ')}
        fill={V2.indigo} fillOpacity="0.12"
        stroke={V2.indigo} strokeWidth="1.5"
      />
      {polyPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3"
          fill={V2.indigo}/>
      ))}
      {axes.map((axis, i) => {
        const a = angle(i);
        const lx = CX + Math.cos(a) * (R + 18);
        const ly = CY + Math.sin(a) * (R + 18);
        return (
          <g key={i} style={{ cursor: onSelectAxis ? 'pointer' : 'default' }}
             onClick={() => onSelectAxis && onSelectAxis(axis.key)}>
            <text x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              style={{
                fontFamily: V2_FONT.sans, fontSize: 10,
                fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', fill: V2.ink55,
              }}>{axis.title}</text>
          </g>
        );
      })}
    </svg>
  );
}

function AxisGhostRow({ entry }) {
  const isPositive = entry.delta.startsWith('+');
  return (
    <div style={{
      padding: '16px 0',
      display: 'flex', alignItems: 'flex-start', gap: 14,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{
        width: 54, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2,
        paddingTop: 2,
      }}>
        <span style={{
          fontFamily: V2_FONT.mono, fontSize: 11,
          color: V2.ink70, letterSpacing: '0.02em',
        }}>{entry.d}</span>
        <span style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 11, color: V2.ink35,
        }}>{entry.ago}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <V2Ticker>{entry.ticker}</V2Ticker>
          <span style={{ fontSize: 12, color: V2.ink55 }}>· {entry.dir} · {entry.size}</span>
        </div>
        <div style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 14, color: V2.ink70, lineHeight: 1.45,
        }}>"{entry.note}"</div>
      </div>

      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <span style={{
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 17,
          color: isPositive ? V2.mossInk : V2.emberInk,
          letterSpacing: '-0.01em', lineHeight: 1,
        }}>{entry.delta}</span>
      </div>
    </div>
  );
}
