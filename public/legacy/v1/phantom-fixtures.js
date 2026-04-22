// phantom-fixtures.js — all hardcoded demo data
// Shape mirrors the Smithy model field names in service/model/ where practical.

window.PhantomFixtures = {
  user: {
    displayName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    memberSince: 'Feb 2026',
    avatarColor: '#7B61FF',
  },

  streak: {
    current: 7,
    longest: 14,
    lastCheckIn: 'Today',
    days: [
      { date: 'Mon', checked: true },
      { date: 'Tue', checked: true },
      { date: 'Wed', checked: true },
      { date: 'Thu', checked: true },
      { date: 'Fri', checked: true },
      { date: 'Sat', checked: true },
      { date: 'Sun', checked: true },
    ],
  },

  ghosts: [
    { id: 'g1', ticker: 'NVDA', direction: 'Buy',  size: '10 shares', price: 920.00,  loggedAt: 'Today · 9:12am',    reason: 'Fear of loss',       currentPrice: 971.50, delta: 51.50, pct: 5.6, hesitationTax: 515 },
    { id: 'g2', ticker: 'AAPL', direction: 'Buy',  size: '$1,000',    price: 182.30,  loggedAt: 'Yesterday',         reason: 'Market volatility',  currentPrice: 189.10, delta: 6.80,  pct: 3.7, hesitationTax: 37  },
    { id: 'g3', ticker: 'TSLA', direction: 'Sell', size: '5 shares',  price: 265.10,  loggedAt: '2 days ago',         reason: 'Earnings uncertainty',currentPrice: 244.80, delta: 20.30, pct: 7.7, hesitationTax: 102 },
    { id: 'g4', ticker: 'COIN', direction: 'Buy',  size: '20 shares', price: 210.00,  loggedAt: '3 days ago',         reason: 'FOMO',               currentPrice: 198.40, delta: -11.60,pct: -5.5, hesitationTax: -232 },
    { id: 'g5', ticker: 'MSFT', direction: 'Buy',  size: '$500',      price: 412.00,  loggedAt: '4 days ago',         reason: 'Waiting for dip',    currentPrice: 425.20, delta: 13.20, pct: 3.2, hesitationTax: 16  },
    { id: 'g6', ticker: 'GOOG', direction: 'Buy',  size: '3 shares',  price: 158.50,  loggedAt: 'Last week',          reason: 'Uncertainty',        currentPrice: 164.90, delta: 6.40,  pct: 4.0, hesitationTax: 19  },
    { id: 'g7', ticker: 'SHOP', direction: 'Buy',  size: '$300',      price: 78.20,   loggedAt: '2 weeks ago',        reason: 'Analyst downgrade',  currentPrice: 74.10,  delta: -4.10, pct: -5.2, hesitationTax: -16 },
  ],

  hesitationReasons: [
    'Fear of loss',
    'Market volatility',
    'Earnings uncertainty',
    'FOMO',
    'Waiting for dip',
    'Analyst downgrade',
    'Not enough research',
  ],

  // Home overview stats (4-stat grid)
  overview: {
    ghostedTrades: 47,
    totalHesitationTax: 2840,
    avgPerTrade: 60.4,
    hesitationPct: 68,
  },

  // Frequently ghosted assets
  frequentlyGhosted: [
    { ticker: 'NVDA', count: 8 },
    { ticker: 'AAPL', count: 6 },
    { ticker: 'TSLA', count: 5 },
    { ticker: 'MSFT', count: 4 },
    { ticker: 'COIN', count: 3 },
    { ticker: 'GOOG', count: 2 },
  ],

  // Hesitation tax detail
  hesitationTaxDetail: {
    ifYouInvested: 12400,
    yourHesitation: 8000,
    gain: 4401,
    gainPct: 44.2,
    triggers: [
      { label: 'Fear of loss',         count: 18 },
      { label: 'Market volatility',    count: 12 },
      { label: 'FOMO',                 count:  9 },
      { label: 'Earnings uncertainty', count:  8 },
    ],
  },

  // Investor DNA — 5 axes (radar), normalized 0..1
  dna: {
    archetype: 'The Watchman',
    archetypeSubtitle: 'Does the homework, but news still makes you flinch.',
    totalGhosts: 47,
    axes: [
      { key: 'deliberate', label: 'Deliberate',  opposite: 'Impulsive',  value: 0.28, letter: 'D' },
      { key: 'guarded',    label: 'Guarded',     opposite: 'Hungry',     value: 0.22, letter: 'G' },
      { key: 'reactive',   label: 'Reactive',    opposite: 'Calm',       value: 0.72, letter: 'R' },
      { key: 'solo',       label: 'Solo',        opposite: 'Follower',   value: 0.18, letter: 'S' },
      { key: 'patient',    label: 'Patient',     opposite: 'Restless',   value: 0.55, letter: 'P' },
    ],
    dominantTraits: [
      { label: 'Guarded', hint: 'You pull back when losses feel real.' },
      { label: 'Reactive', hint: 'Headlines move your hand more than charts do.' },
    ],
  },

  // Insight of the week
  insight: {
    title: "You hesitated most on Thursdays",
    body: "4 of your last 7 ghosts were logged on a Thursday morning — usually within 20 minutes of market open.",
  },
};
