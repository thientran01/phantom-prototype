import { V2_ARCHIVE, PATTERN_TAG_TO_KEY } from './Archive.jsx';

const GHOSTS_KEY = 'phantom.v2.ghosts';
const OVERLAYS_KEY = 'phantom.v2.overlays';
const LAST_RESOLVED_KEY = 'phantom.v2.lastResolvedSession';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

export function loadUserGhosts() {
  return safeParse(localStorage.getItem(GHOSTS_KEY), []);
}
export function saveUserGhosts(arr) {
  localStorage.setItem(GHOSTS_KEY, JSON.stringify(arr));
}

export function loadOverlays() {
  return safeParse(localStorage.getItem(OVERLAYS_KEY), {});
}
export function saveOverlays(obj) {
  localStorage.setItem(OVERLAYS_KEY, JSON.stringify(obj));
}

export function loadLastResolvedSession() {
  const raw = localStorage.getItem(LAST_RESOLVED_KEY);
  return raw ? parseInt(raw, 10) : 0;
}
export function saveLastResolvedSession(n) {
  localStorage.setItem(LAST_RESOLVED_KEY, String(n));
}

export function applyOverlay(entry, overlays) {
  const o = overlays[entry.id];
  if (!o) return entry;
  return {
    ...entry,
    notes: o.notes || '',
    userTags: o.userTags || [],
    resolution: o.resolution || null,
    emotion: o.emotion || null,
  };
}

function formatAgo(loggedAt, now) {
  const days = Math.floor((now - loggedAt) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7)  return `${days} days ago`;
  if (days < 14) return 'last week';
  const weeks = Math.floor(days / 7);
  return `${weeks} weeks ago`;
}

function formatShortDate(ms) {
  const d = new Date(ms);
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function sizeString(parsed) {
  if (!parsed.size) return '';
  if (parsed.sizeUnit === 'shares') return `${parsed.size} shares`;
  if (parsed.sizeUnit === 'dollars') return `$${parsed.size}`;
  return String(parsed.size);
}

const SENTIMENT_TO_TAG = {
  'Fear of Loss':   'Fear of Loss',
  'FOMO':           'FOMO Entry',
  'Overthinking':   'Overthinking',
  'Low Confidence': 'Low Confidence',
};

export function parsedToGhost(parsed, text, now = Date.now()) {
  const tag = SENTIMENT_TO_TAG[parsed.sentiment] || 'Overthinking';
  return {
    id: `user-${now}`,
    loggedAt: now,
    loggedSession: null,
    d: formatShortDate(now),
    ago: 'today',
    ticker: parsed.ticker || '—',
    dir: parsed.direction || 'long',
    size: sizeString(parsed) || '—',
    text: text || '',
    tag,
    outcome: 'pending',
    delta: null,
    userLogged: true,
  };
}

function weightedAmount(bias) {
  const r = Math.random();
  const positive = r < bias;
  const amount = 30 + Math.floor(Math.random() * 420);
  return { sign: positive ? '+' : '−', amount, positive };
}

const PATTERN_BIAS = {
  fear:      0.7,
  overthink: 0.7,
  lowconf:   0.7,
  fomo:      0.3,
};

export function resolvePending(userGhosts, currentSession, lastResolvedSession) {
  if (currentSession <= lastResolvedSession) return userGhosts;
  let changed = false;
  const out = userGhosts.map(g => {
    if (g.outcome !== 'pending') return g;
    if (g.loggedSession != null && g.loggedSession >= currentSession) return g;
    const patternKey = PATTERN_TAG_TO_KEY[g.tag] || 'overthink';
    const bias = PATTERN_BIAS[patternKey] ?? 0.5;
    const { sign, amount, positive } = weightedAmount(bias);
    const held = patternKey === 'fear' || patternKey === 'overthink';
    changed = true;
    return {
      ...g,
      outcome: held ? 'held' : 'missed',
      delta: `${sign}$${amount}`,
      resolvedAt: Date.now(),
      _positive: positive,
    };
  });
  return changed ? out : userGhosts;
}

export function ghostsToCSV(entries) {
  const header = ['id','date','ticker','direction','size','outcome','delta','tag','text','notes','userTags','resolution','valence','arousal'];
  const esc = (v) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = entries.map(e => [
    e.id, e.d, e.ticker, e.dir, e.size, e.outcome, e.delta || '', e.tag,
    e.text || '', e.notes || '', (e.userTags || []).join('|'), e.resolution || '',
    e.emotion ? e.emotion.valence.toFixed(3) : '',
    e.emotion ? e.emotion.arousal.toFixed(3) : '',
  ].map(esc).join(','));
  return [header.join(','), ...rows].join('\n');
}

export function downloadCSV(csv, filename = 'phantom-ghosts.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function currentMonthLabel(now = Date.now()) {
  const d = new Date(now);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function fixtureSlice(level) {
  if (level === 'cold') return [];
  if (level === 'warming') {
    const first = V2_ARCHIVE[0];
    return [{ month: first.month, entries: first.entries.slice(0, 2) }];
  }
  return V2_ARCHIVE;
}

export function mergeArchive(userGhosts, demoLevel, overlays, now = Date.now()) {
  const fixtures = fixtureSlice(demoLevel);
  const withOverlays = (list) => list.map(e => applyOverlay(e, overlays));

  const userWithAgo = userGhosts.map(g => ({ ...g, ago: formatAgo(g.loggedAt, now) }));
  if (!userWithAgo.length) {
    return fixtures.map(g => ({ ...g, entries: withOverlays(g.entries) }));
  }

  const currentMonth = currentMonthLabel(now);
  const sorted = [...userWithAgo].sort((a, b) => b.loggedAt - a.loggedAt);
  const head = { month: currentMonth, entries: withOverlays(sorted) };

  const rest = fixtures
    .filter(g => g.month !== currentMonth)
    .map(g => ({ ...g, entries: withOverlays(g.entries) }));

  const sameMonthFixture = fixtures.find(g => g.month === currentMonth);
  if (sameMonthFixture) {
    head.entries = [...head.entries, ...withOverlays(sameMonthFixture.entries)];
  }

  return [head, ...rest];
}

export function flattenArchive(groups) {
  return groups.flatMap(g => g.entries);
}
