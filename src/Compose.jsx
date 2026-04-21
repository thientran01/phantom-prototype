import React from 'react';
import { V2, V2_FONT, V2Meta, V2Display, V2Rule, V2Ticker, V2Tag } from './tokens.jsx';

export function parseGhost(text) {
  const out = {
    ticker: null,
    direction: null,
    size: null,
    sizeUnit: null,
    price: null,
    sentiment: null,
    confidence: { ticker: 0, direction: 0, size: 0, sentiment: 0 },
  };
  if (!text) return out;
  const t = text;

  const tickerRe = /\b([A-Z]{2,5})\b/g;
  const stop = new Set(['I','A','AM','PM','USD','THE','AND','OR','BUT','IS','TO','ON','IN','AT','OF','FOR','MY','IT','SO','AS']);
  let m;
  let bestTicker = null;
  while ((m = tickerRe.exec(t)) !== null) {
    if (!stop.has(m[1])) { bestTicker = m[1]; break; }
  }
  if (bestTicker) { out.ticker = bestTicker; out.confidence.ticker = 1; }

  const lower = t.toLowerCase();
  if (/\b(short|shorting|sell|selling|puts?|bearish)\b/.test(lower)) {
    out.direction = 'short'; out.confidence.direction = 1;
  } else if (/\b(long|buy|buying|calls?|bullish)\b/.test(lower)) {
    out.direction = 'long'; out.confidence.direction = 1;
  }

  let sz = lower.match(/(\d[\d,]*)\s*(?:shares?|contracts?)/);
  if (sz) {
    out.size = sz[1].replace(/,/g,'');
    out.sizeUnit = 'shares';
    out.confidence.size = 1;
  } else {
    sz = lower.match(/\$\s*(\d[\d,]*(?:\.\d+)?)/);
    if (sz) {
      out.size = sz[1].replace(/,/g,'');
      out.sizeUnit = 'dollars';
      out.confidence.size = 0.8;
    }
  }

  const priceM = lower.match(/\bat\s*\$?\s*(\d[\d,]*(?:\.\d+)?)/);
  if (priceM) out.price = priceM[1].replace(/,/g,'');

  const sentimentMap = [
    [/\b(scared|afraid|fear|top(ped)?|crash|tank)/, 'Fear of Loss'],
    [/\b(fomo|chas(e|ing)|rally|moon|pump|everyone)/, 'FOMO'],
    [/\b(overthink|overthinking|analyz|paralysis|uncertain)/, 'Overthinking'],
    [/\b(not sure|unsure|doubt|low confidence|hesita)/, 'Low Confidence'],
    [/\b(greed|greedy|more|double down)/, 'Greed'],
    [/\b(revenge|angry|mad|frustrat)/, 'Revenge'],
  ];
  for (const [re, tag] of sentimentMap) {
    if (re.test(lower)) { out.sentiment = tag; out.confidence.sentiment = 1; break; }
  }

  return out;
}

export function V2Compose({ onCancel, onSave, examples, onSkip, cancelLabel = 'Cancel' }) {
  const [text, setText] = React.useState('');
  const [pickedExample, setPickedExample] = React.useState(null);
  const parsed = React.useMemo(() => parseGhost(text), [text]);
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const hasAny = parsed.ticker || parsed.direction || parsed.size || parsed.sentiment;
  const canSave = !!parsed.ticker && !!parsed.direction;

  const pickExample = (i) => {
    setPickedExample(i);
    setText(examples[i].text);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const example = "Tap to write — e.g. \u201CAAPL 50 shares long, scared it's already topped at $182.\u201D";

  return (
    <div style={{
      padding: '20px 28px 40px',
      display: 'flex', flexDirection: 'column', gap: 24,
      fontFamily: V2_FONT.sans, minHeight: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onCancel} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: V2_FONT.sans, fontSize: 15, color: V2.ink55,
          padding: 0, letterSpacing: '-0.005em',
        }}>{cancelLabel}</button>
        <V2Meta>New ghost</V2Meta>
        <button disabled={!canSave}
          onClick={() => canSave && onSave(parsed, text)}
          style={{
            background: 'transparent', border: 'none',
            cursor: canSave ? 'pointer' : 'default',
            fontFamily: V2_FONT.sans, fontSize: 15,
            color: canSave ? V2.ink : V2.ink35,
            fontWeight: 500,
            padding: 0, letterSpacing: '-0.005em',
            transition: 'color 120ms ease',
          }}>Save</button>
      </div>

      <V2Display size={30} italic style={{ marginTop: 4 }}>
        What almost happened?
      </V2Display>

      {examples && examples.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Meta>Or tap one to start</V2Meta>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {examples.map((ex, i) => (
              <button key={i} onClick={() => pickExample(i)} style={{
                textAlign: 'left', cursor: 'pointer',
                background: 'transparent',
                border: `1px solid ${pickedExample === i ? V2.ink : V2.ink15}`,
                borderRadius: 14,
                padding: '14px 16px',
                display: 'flex', flexDirection: 'column', gap: 6,
                fontFamily: V2_FONT.sans,
                transition: 'border-color 140ms ease',
              }}>
                <div style={{
                  fontFamily: V2_FONT.display, fontStyle: 'italic',
                  fontSize: 13, color: V2.ink55,
                }}>{ex.label}</div>
                <div style={{
                  fontFamily: V2_FONT.display,
                  fontSize: 15, lineHeight: 1.45,
                  color: V2.ink70, textWrap: 'pretty',
                }}>"{ex.text}"</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder=""
          style={{
            width: '100%',
            minHeight: 120,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: V2_FONT.display,
            fontSize: 22,
            lineHeight: 1.5,
            color: V2.ink,
            letterSpacing: '-0.005em',
            padding: 0,
          }}
        />
        {!text && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            pointerEvents: 'none',
            fontFamily: V2_FONT.display,
            fontSize: 22, fontStyle: 'italic',
            lineHeight: 1.5, color: V2.ink35,
            letterSpacing: '-0.005em',
          }}>{example}</div>
        )}
      </div>

      <div>
        <V2Rule />
        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <V2Meta>{hasAny ? 'Phantom reads this as' : 'As you write, Phantom listens'}</V2Meta>

          <ParseRow label="Ticker" value={parsed.ticker} empty="—" mono known={!!parsed.ticker}/>
          <ParseRow label="Direction"
            value={parsed.direction}
            empty="—"
            known={!!parsed.direction}
            tag
            tone={parsed.direction === 'short' ? 'ember' : parsed.direction === 'long' ? 'moss' : 'neutral'}/>
          <ParseRow label="Size"
            value={parsed.size ? (parsed.sizeUnit === 'shares' ? `${parsed.size} shares` : `$${Number(parsed.size).toLocaleString()}`) : null}
            empty="—"
            known={!!parsed.size}/>
          {parsed.price && (
            <ParseRow label="Price" value={`$${parsed.price}`} known mono/>
          )}
          <ParseRow label="Feeling" value={parsed.sentiment} empty="—" known={!!parsed.sentiment} tag tone="indigo"/>
        </div>
      </div>

      <div style={{
        fontFamily: V2_FONT.display, fontStyle: 'italic',
        fontSize: 14, color: V2.ink55, lineHeight: 1.5,
        textWrap: 'pretty', marginTop: 'auto',
      }}>
        Write it the way you'd tell a friend. Phantom will pull the structure — you can correct anything it misses.
      </div>

      {onSkip && (
        <button onClick={onSkip} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: V2_FONT.sans, fontSize: 13, color: V2.ink35,
          padding: 8, alignSelf: 'center',
          letterSpacing: '-0.005em',
        }}>I'll log one later</button>
      )}
    </div>
  );
}

function ParseRow({ label, value, empty = '—', mono, tag, tone = 'neutral' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16,
    }}>
      <span style={{
        fontFamily: V2_FONT.sans,
        fontSize: 13,
        color: V2.ink55,
        letterSpacing: '-0.005em',
      }}>{label}</span>
      {value ? (
        tag ? <V2Tag tone={tone}>{value}</V2Tag>
        : mono ? <V2Ticker>{value}</V2Ticker>
        : <span style={{
            fontFamily: V2_FONT.sans,
            fontSize: 15,
            color: V2.ink,
            fontWeight: 500,
            letterSpacing: '-0.005em',
          }}>{value}</span>
      ) : (
        <span style={{
          fontFamily: V2_FONT.display,
          fontStyle: 'italic',
          fontSize: 15,
          color: V2.ink35,
        }}>{empty}</span>
      )}
    </div>
  );
}
