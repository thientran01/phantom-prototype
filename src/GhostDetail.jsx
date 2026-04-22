import React from 'react';
import { V2, V2_FONT, V2Meta, V2Rule, V2Ticker, V2Tag, V2GhostMark } from './tokens.jsx';
import { V2_ARCHIVE, allEntriesFlat, PATTERN_TAG_TO_KEY } from './Archive.jsx';
import { V2EmotionMini, emotionQuadrantLabel } from './Emotion.jsx';

const PATTERN_LINE = {
  'Fear of Loss':   'You exited to protect the gain. Sometimes the trade keeps going without you.',
  'FOMO Entry':     'You bought the noise. The room was already too loud.',
  'Overthinking':   'You re-read the thesis until the window closed.',
  'Low Confidence': 'You saw it. You waited for someone else to call it first.',
};

const OUTCOME_CAPTION = {
  'held-positive':   'you didn\'t walk away from',
  'held-negative':   'you avoided losing',
  'missed-positive': 'you would have made',
  'missed-negative': 'you dodged',
};

const RESOLUTION_LINE = {
  regret: 'You came back to this — a regret.',
  peace:  'You came back to this — at peace.',
};

function outcomeKey(outcome, isPositive) {
  return `${outcome}-${isPositive ? 'positive' : 'negative'}`;
}

export function V2GhostDetail({ ghostId, ghosts, overlay = {}, onUpdateOverlay, onBack, onOpenPattern, onOpenGhost, onEditEmotion }) {
  const all = ghosts && ghosts.length ? ghosts : allEntriesFlat(V2_ARCHIVE);
  const entry = all.find(e => e.id === ghostId) || all[0];
  const isPending = entry.outcome === 'pending';
  const isPositive = !isPending && entry.delta && entry.delta.startsWith('+');
  const deltaColor = isPositive ? V2.mossInk : V2.emberInk;
  const patternKey = PATTERN_TAG_TO_KEY[entry.tag];

  const notes = overlay.notes ?? entry.notes ?? '';
  const userTags = overlay.userTags ?? entry.userTags ?? [];
  const resolution = overlay.resolution ?? entry.resolution ?? null;
  const emotion = overlay.emotion ?? entry.emotion ?? null;

  const [draftNotes, setDraftNotes] = React.useState(notes);
  React.useEffect(() => { setDraftNotes(notes); }, [ghostId, notes]);

  const [newTag, setNewTag] = React.useState('');
  const [showTagInput, setShowTagInput] = React.useState(false);

  const commitNotes = () => {
    if (draftNotes !== notes && onUpdateOverlay) onUpdateOverlay({ notes: draftNotes });
  };
  const addTag = () => {
    const t = newTag.trim();
    if (!t) return;
    if (userTags.includes(t)) { setNewTag(''); setShowTagInput(false); return; }
    onUpdateOverlay && onUpdateOverlay({ userTags: [...userTags, t] });
    setNewTag('');
    setShowTagInput(false);
  };
  const removeTag = (t) => {
    onUpdateOverlay && onUpdateOverlay({ userTags: userTags.filter(x => x !== t) });
  };

  const related = all
    .filter(e => e.id !== entry.id && (e.tag === entry.tag || e.ticker === entry.ticker))
    .slice(0, 3);

  return (
    <div style={{
      padding: '20px 28px 120px',
      display: 'flex', flexDirection: 'column', gap: 28,
      fontFamily: V2_FONT.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: V2.ink55, fontFamily: V2_FONT.sans, fontSize: 15, padding: 0,
          letterSpacing: '-0.005em',
        }}>← Back</button>
        <V2Meta>Ghost</V2Meta>
        <span style={{ width: 40 }}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: V2_FONT.mono, fontSize: 13,
            color: V2.ink70, letterSpacing: '0.02em',
          }}>{entry.d}</span>
          <span style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 14, color: V2.ink55,
          }}>{entry.ago}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <V2Ticker>{entry.ticker}</V2Ticker>
          <span style={{ fontSize: 14, color: V2.ink55 }}>· {entry.dir} · {entry.size}</span>
        </div>
      </div>

      <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <V2Meta>What you wrote</V2Meta>
        <blockquote style={{
          margin: 0,
          paddingLeft: 18,
          borderLeft: `2px solid ${V2.ink15}`,
          fontFamily: V2_FONT.display, fontStyle: 'italic',
          fontSize: 22, lineHeight: 1.45,
          color: V2.ink, letterSpacing: '-0.005em',
          textWrap: 'pretty',
        }}>
          "{entry.text}"
        </blockquote>
      </figure>

      {isPending ? (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          paddingTop: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <V2GhostMark mood="waiting"/>
            <V2Meta>Still open</V2Meta>
          </div>
          <div style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.35,
            color: V2.ink70, letterSpacing: '-0.005em',
          }}>
            The market hasn't answered yet.
          </div>
          <div style={{
            fontSize: 13, color: V2.ink55,
          }}>
            Come back in a day or two.
          </div>
        </div>
      ) : (
        <div style={{
          background: V2.paperDeep,
          borderRadius: 20,
          padding: '22px 22px 24px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <V2Meta style={{ color: V2.ink70 }}>
            What the market said back
          </V2Meta>
          <div style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 52, color: deltaColor,
            letterSpacing: '-0.02em', lineHeight: 1,
          }}>{entry.delta}</div>
          <div style={{
            fontFamily: V2_FONT.display, fontStyle: 'italic',
            fontSize: 15, color: V2.ink55,
          }}>{OUTCOME_CAPTION[outcomeKey(entry.outcome, isPositive)]}</div>
        </div>
      )}

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <V2Meta>Why this one</V2Meta>
        <button
          onClick={() => patternKey && onOpenPattern && onOpenPattern(patternKey)}
          style={{
            background: 'transparent', border: 'none', cursor: patternKey ? 'pointer' : 'default',
            textAlign: 'left', padding: 0,
            display: 'flex', flexDirection: 'column', gap: 8,
            fontFamily: V2_FONT.sans,
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <V2Tag tone="indigo">{entry.tag}</V2Tag>
            {patternKey && <span style={{ fontSize: 13, color: V2.ink35 }}>See this pattern →</span>}
          </div>
          <p style={{
            fontFamily: V2_FONT.display, fontSize: 18, lineHeight: 1.55,
            color: V2.ink70, margin: 0, textWrap: 'pretty',
          }}>
            {PATTERN_LINE[entry.tag]}
          </p>
        </button>
      </section>

      {resolution && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>Your answer</V2Meta>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ flexShrink: 0, paddingTop: 4 }}>
              <V2GhostMark mood="tender" interactive/>
            </span>
            <div style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 19, lineHeight: 1.45, color: V2.ink,
              letterSpacing: '-0.005em',
            }}>
              {RESOLUTION_LINE[resolution]}
            </div>
          </div>
        </section>
      )}

      {emotion ? (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>How you felt</V2Meta>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <V2EmotionMini emotion={emotion}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontFamily: V2_FONT.display, fontStyle: 'italic',
                fontSize: 19, color: V2.ink, letterSpacing: '-0.005em',
              }}>{emotionQuadrantLabel(emotion)}</span>
              {onEditEmotion && (
                <button onClick={() => onEditEmotion(entry.id)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: V2_FONT.sans, fontSize: 13, color: V2.ink55,
                  padding: 0, alignSelf: 'flex-start',
                  letterSpacing: '-0.005em',
                }}>Edit →</button>
              )}
            </div>
          </div>
        </section>
      ) : onEditEmotion && onUpdateOverlay ? (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>How you felt</V2Meta>
          <button onClick={() => onEditEmotion(entry.id)} style={{
            background: 'transparent',
            border: `1px dashed ${V2.ink15}`,
            borderRadius: 14,
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
            fontFamily: V2_FONT.sans,
          }}>
            <span style={{
              fontFamily: V2_FONT.display, fontStyle: 'italic',
              fontSize: 17, color: V2.ink70,
              letterSpacing: '-0.005em',
            }}>Add how it felt</span>
            <span style={{ fontSize: 15, color: V2.ink35 }}>→</span>
          </button>
        </section>
      ) : null}

      {onUpdateOverlay && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>A note to yourself</V2Meta>
          <textarea
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            onBlur={commitNotes}
            placeholder="What do you want to remember about this one?"
            rows={3}
            style={{
              fontFamily: V2_FONT.display,
              fontSize: 17, lineHeight: 1.5,
              color: V2.ink, background: 'transparent',
              border: 'none', borderBottom: `1px solid ${V2.rule}`,
              outline: 'none', padding: '8px 0',
              resize: 'vertical', minHeight: 60,
              width: '100%',
            }}
          />
        </section>
      )}

      {onUpdateOverlay && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>Your tags</V2Meta>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {userTags.map(t => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                border: `1px solid ${V2.rule}`, background: V2.paperDeep,
                fontSize: 12, color: V2.ink70, fontFamily: V2_FONT.sans,
              }}>
                {t}
                <button onClick={() => removeTag(t)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: V2.ink35, padding: 0, fontSize: 14, lineHeight: 1,
                }}>×</button>
              </span>
            ))}
            {showTagInput ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 999,
                border: `1px solid ${V2.ink}`, background: V2.paper,
              }}>
                <input
                  autoFocus
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addTag(); }
                    if (e.key === 'Escape') { setNewTag(''); setShowTagInput(false); }
                  }}
                  onBlur={addTag}
                  placeholder="tag"
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: V2_FONT.sans, fontSize: 12, color: V2.ink,
                    width: 80, padding: '4px 0',
                  }}
                />
              </span>
            ) : (
              <button onClick={() => setShowTagInput(true)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                border: `1px dashed ${V2.ink15}`, background: 'transparent',
                fontSize: 12, color: V2.ink55, fontFamily: V2_FONT.sans,
                cursor: 'pointer',
              }}>+ add tag</button>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
          <V2Meta style={{ marginBottom: 10 }}>Ghosts like this</V2Meta>
          <V2Rule/>
          {related.map(r => (
            <React.Fragment key={r.id}>
              <RelatedRow entry={r} onClick={() => onOpenGhost && onOpenGhost(r.id)}/>
              <V2Rule/>
            </React.Fragment>
          ))}
        </section>
      )}

    </div>
  );
}

function RelatedRow({ entry, onClick }) {
  const isPending = entry.outcome === 'pending';
  const isPositive = !isPending && entry.delta && entry.delta.startsWith('+');
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
      padding: '14px 0', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: V2_FONT.sans,
    }}>
      <span style={{
        width: 54, flexShrink: 0,
        fontFamily: V2_FONT.mono, fontSize: 11,
        color: V2.ink70, letterSpacing: '0.02em',
      }}>{entry.d}</span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <V2Ticker>{entry.ticker}</V2Ticker>
          <span style={{ fontSize: 12, color: V2.ink55 }}>· {entry.dir}</span>
        </div>
        <span style={{ fontSize: 12, color: V2.ink55 }}>{entry.tag}</span>
      </div>
      <span style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 17,
        color: isPending ? V2.ink55 : (isPositive ? V2.mossInk : V2.emberInk),
        letterSpacing: '-0.01em',
      }}>{isPending ? 'pending' : entry.delta}</span>
    </button>
  );
}
