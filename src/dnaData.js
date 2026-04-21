export const DNA_AXES = [
  {
    key: 'tempo',
    letters: ['D', 'I'],
    names: ['Deliberate', 'Impulsive'],
    title: 'Tempo',
    question: 'Do you act fast, or slow?',
    left: {
      letter: 'D',
      name: 'Deliberate',
      blurb: 'You sit with a trade before you make it. The window sometimes closes before you do.',
      tone: 'moss',
    },
    right: {
      letter: 'I',
      name: 'Impulsive',
      blurb: 'You trust the first move. Speed is a feature — until it isn\'t.',
      tone: 'ember',
    },
    meaning: 'Tempo is about how long a trade sits in your head before you act. Deliberate traders protect themselves from noise but can miss real signal. Impulsive traders catch the move but also the fake.',
    keepInMind: 'Neither end wins on its own. The trader who keeps a journal is borrowing from the other side — a fast trader slowing down to log, a slow trader catching themselves mid-hesitation.',
    patternKey: 'overthink',
  },
  {
    key: 'drive',
    letters: ['G', 'H'],
    names: ['Guarded', 'Hungry'],
    title: 'Drive',
    question: 'Are you scared of losing, or hungry to win?',
    left: {
      letter: 'G',
      name: 'Guarded',
      blurb: 'You feel the downside first. Your wins are smaller, but so are your losses.',
      tone: 'moss',
    },
    right: {
      letter: 'H',
      name: 'Hungry',
      blurb: 'You feel the upside first. You size in when you see it — sometimes when it isn\'t there.',
      tone: 'ember',
    },
    meaning: 'Drive is the gravity of your P&L. Guarded traders flinch at red and exit early. Hungry traders chase green and size too soon. Most beginners oscillate between the two within a single week.',
    keepInMind: 'The goal is not to pick a side, but to notice which one is steering the wheel today.',
    patternKey: 'fear',
  },
  {
    key: 'mood',
    letters: ['C', 'R'],
    names: ['Calm', 'Reactive'],
    title: 'Mood',
    question: 'Does news spook your trigger finger?',
    left: {
      letter: 'C',
      name: 'Calm',
      blurb: 'Headlines pass through you. You\'ve already decided what matters.',
      tone: 'moss',
    },
    right: {
      letter: 'R',
      name: 'Reactive',
      blurb: 'News moves you, even when it shouldn\'t. Earnings weeks feel loud.',
      tone: 'ember',
    },
    meaning: 'Mood measures how much the outside world edits your thesis. Calm traders hold through noise; reactive traders re-underwrite every morning. Reactive isn\'t bad — it\'s expensive.',
    keepInMind: 'If you catch yourself rewriting a thesis because of a 3-line headline, it\'s usually the headline, not the thesis.',
    patternKey: 'fear',
  },
  {
    key: 'signal',
    letters: ['S', 'F'],
    names: ['Solo', 'Follower'],
    title: 'Signal',
    question: 'Do you trust your own read, or need the room?',
    left: {
      letter: 'S',
      name: 'Solo',
      blurb: 'You want to see the setup yourself. Crowds make you skeptical, not sure.',
      tone: 'moss',
    },
    right: {
      letter: 'F',
      name: 'Follower',
      blurb: 'You need confirmation before you pull. The louder the room, the surer you feel.',
      tone: 'ember',
    },
    meaning: 'Signal is where your conviction comes from: your own work, or other people\'s. Solo traders take smaller, stranger positions. Followers take bigger, later ones.',
    keepInMind: 'A crowd is not a thesis. But neither is a hunch. Beginners tend to be followers and call it research.',
    patternKey: 'lowconf',
  },
];

const A = (code, name, subtitle, essay, strengths, blindspots, twins) => ({
  code, name, subtitle, essay, strengths, blindspots, twins,
});

export const DNA_ARCHETYPES = {
  DGCS: A('DGCS', 'The Steward',
    'Careful, risk-aware, own research, plays the long game.',
    [
      'You think before you trade, and think twice before you size up. Losing a night\'s sleep over a position is, to you, a sign the position is too big — not a sign to double down.',
      'The Steward is the archetype most beginners wish they were. Your risk is usually the right size. Your mistake is not entering at all.',
    ],
    ['Low drawdowns', 'Thesis-first entries', 'Rarely tilted by news'],
    ['Misses fast moves', 'Under-sizes winners', 'Confuses patience with avoidance'],
    ['DGCF', 'DHCS'],
  ),
  DGCF: A('DGCF', 'The Apprentice',
    'Patient, risk-aware, still learning whose read to trust.',
    [
      'You do the work, but you double-check it against someone else before you pull the trigger. That\'s fine — for a while.',
      'The risk is you outsource the final call to the loudest voice in your feed, and then blame yourself when their call was wrong.',
    ],
    ['Rarely reckless', 'Studies every loss', 'Welcomes feedback'],
    ['Copies entries', 'Hesitates at the edge', 'Externalizes blame'],
    ['DGCS', 'DGRF'],
  ),
  DGRS: A('DGRS', 'The Watchman',
    'Does the homework, but news still makes you flinch.',
    [
      'You prepare like a Steward and react like a Worrier. Your thesis is usually right. Your nerves are usually earlier than your thesis.',
      'Ghosts pile up for you not because you don\'t see the trade, but because by the time you\'re sure, the headline that shook you has become the reason everyone else is in.',
    ],
    ['Does the research', 'Cuts risk fast', 'Catches own errors'],
    ['Exits on headlines', 'Lets ghosts outnumber trades', 'Overweights worst-case'],
    ['DGCS', 'DHRS'],
  ),
  DGRF: A('DGRF', 'The Worrier',
    'Scared, thoughtful, waiting for permission.',
    [
      'You read everything. You ask everyone. You\'re usually right about what you didn\'t do, and usually too late on what you finally did.',
      'The Worrier is not a bad archetype. It\'s a very common starting point. Most of the work is learning which of your fears is data and which is weather.',
    ],
    ['Rarely blows up', 'Thorough research', 'Honest about fear'],
    ['Needs permission to enter', 'Follows the crowd late', 'Regret-heavy'],
    ['DGCF', 'IGRF'],
  ),
  DHCS: A('DHCS', 'The Architect',
    'Deliberate conviction, big ambition, steady hand.',
    [
      'You want the big trade, and you\'re willing to wait for it. When it shows up, you size into it like you\'ve been rehearsing — because you have.',
      'The Architect\'s risk isn\'t recklessness. It\'s stubbornness: a beautifully built thesis that the market has already moved past.',
    ],
    ['Sizes into conviction', 'Ignores noise', 'Writes trades down'],
    ['Falls in love with theses', 'Slow to cut', 'Undersizes hedges'],
    ['DGCS', 'IHCS'],
  ),
  DHCF: A('DHCF', 'The Scholar',
    'Studies the whole room, then sizes into the consensus with a steady hand.',
    [
      'You read research the way some people read novels. When you finally act, it\'s because you\'ve triangulated three sources and they agree.',
      'The Scholar\'s danger is that consensus is priced in. You get the thesis right and the entry late.',
    ],
    ['Deep research', 'Cross-checks sources', 'Rarely surprised'],
    ['Late entries', 'Over-weights consensus', 'Paralysis in gray zones'],
    ['DHCS', 'DGCF'],
  ),
  DHRS: A('DHRS', 'The Visionary',
    'Big, patient bets — but the day-to-day gets under your skin.',
    [
      'Your theses span quarters. Your nerves span hours. The gap between those two is where most of your ghosts live.',
      'You\'re often correct on direction and wrong on timing, which feels like being wrong.',
    ],
    ['Long horizons', 'Original theses', 'Willing to be early'],
    ['Panics on drawdown', 'Over-trades around a core', 'Conflates timing with thesis'],
    ['DHCS', 'DGRS'],
  ),
  DHRF: A('DHRF', 'The Dreamer',
    'Wants in big, waits for the signal, jumpy when it comes.',
    [
      'You want to swing for the fence, but you want someone else to tell you the pitch is coming. When the room finally agrees, you size in — and then every candle shakes you.',
      'The Dreamer oscillates between patience and panic within the same position.',
    ],
    ['Ambitious theses', 'Sees the upside', 'Writes the story well'],
    ['Needs confirmation', 'Flinches under drawdown', 'Sizes up late'],
    ['DHRS', 'IHRF'],
  ),
  IGCS: A('IGCS', 'The Sniper',
    'Moves fast, plays small, trusts own read.',
    [
      'You take the shot before the room is awake. Your positions are small enough that you don\'t mind being wrong, and precise enough that you usually aren\'t.',
      'The Sniper\'s risk is boredom — sitting out the moves that don\'t fit the setup and then forcing one that doesn\'t.',
    ],
    ['Fast, precise entries', 'Small, clean losses', 'Independent read'],
    ['Force-trades flat weeks', 'Under-sizes conviction', 'Impatient with winners'],
    ['DGCS', 'IHCS'],
  ),
  IGCF: A('IGCF', 'The Hedger',
    'Quick to move, guarded by habit, takes cues from the tape.',
    [
      'You act fast, but always with a foot near the door. The tape is your co-pilot — when it shifts, you shift.',
      'The Hedger rarely has a disaster trade. The Hedger also rarely has a great one.',
    ],
    ['Disciplined stops', 'Reads flow well', 'Rarely full-size'],
    ['Cuts winners early', 'Over-hedges', 'Follows the tape past its signal'],
    ['IGCS', 'DGCF'],
  ),
  IGRS: A('IGRS', 'The Skittish',
    'Fast finger, guarded gut, your own read — and every candle matters.',
    [
      'You enter quick and exit quicker. Every tick registers. You take a dozen small trades for every one you should have let breathe.',
      'The Skittish does not lose big. The Skittish loses in a thousand paper cuts.',
    ],
    ['Very low per-trade risk', 'Quick to recognize mistakes', 'Independent'],
    ['Churns positions', 'Cuts before thesis', 'Misses the middle of moves'],
    ['IGCS', 'IGRF'],
  ),
  IGRF: A('IGRF', 'The Flincher',
    'Flinches at every headline, follows the exit.',
    [
      'You move fast in both directions. A headline hits, you\'re out. A pundit pivots, you\'re back in. Your trades are other people\'s trades, shortened.',
      'The Flincher\'s ghosts are the loudest in the journal, because every one of them is a moment you let someone else write your thesis.',
    ],
    ['Acts quickly', 'Hard to tilt for long', 'Adapts to new info'],
    ['Chases exits', 'Reacts to noise', 'Outsources conviction'],
    ['IGRS', 'DGRF'],
  ),
  IHCS: A('IHCS', 'The Maverick',
    'Cold degen — fast, hungry, self-led, unbothered.',
    [
      'You see it, you take it, you don\'t explain it. Your sizes scare your friends. Your calm scares you more.',
      'The Maverick is one bad week from being the Degen. What separates them is whether you keep writing the trades down.',
    ],
    ['Sizes conviction', 'Immune to noise', 'Original read'],
    ['Invisible tilt', 'No hedge mentality', 'Hard to coach'],
    ['DHCS', 'IHRS'],
  ),
  IHCF: A('IHCF', 'The Operator',
    'Fast, hungry, unbothered — but only pulls when the room is pulling too.',
    [
      'You want the big move and the clean exit, and you\'re willing to ride the crowd to both. The Operator is a trader\'s trader, right until the crowd turns.',
      'Your blowups tend to be collective. So do your best weeks.',
    ],
    ['Rides trends', 'Sizes boldly', 'Reads the room'],
    ['Caught at tops', 'Mistakes flow for thesis', 'Levered to consensus'],
    ['IHCS', 'IGCF'],
  ),
  IHRS: A('IHRS', 'The Gambler',
    'Fast, hungry, your own read, and every move matters.',
    [
      'You size into your conviction immediately, and every candle after that is personal. You\'re often right. You\'re also often loud about it.',
      'The Gambler\'s ghosts tend to be the trades you didn\'t let breathe.',
    ],
    ['High conviction', 'Fast decisions', 'Comfortable with risk'],
    ['Over-monitors', 'Cuts winners too soon', 'Emotional P&L'],
    ['IHCS', 'IHRF'],
  ),
  IHRF: A('IHRF', 'The Degen',
    'Classic WSB — YOLO on whatever\'s trending, reacts loud.',
    [
      'You trade what\'s moving, size what\'s loud, and exit when the group chat blinks. The Degen\'s best days and worst days are on the same chart.',
      'This is the archetype the rest of the app is designed to protect you from.',
    ],
    ['Full commitment', 'Adapts fast', 'Learns loudly'],
    ['No risk model', 'Crowd-driven entries', 'Panic exits'],
    ['IHRS', 'DHRF'],
  ),
};

export const USER_DNA = {
  name: 'Avery Chen',
  scores: {
    tempo:  28,
    drive:  35,
    mood:   68,
    signal: 22,
  },
  code: 'DGRS',
  ghostCount: 47,
  formingGhostCount: 6,
  ghostsNeeded: 3,
  formingRevealedOrder: ['tempo', 'drive'],
  ghostsForAxis: {
    tempo: [
      { d: 'Apr 21', ago: '2 days ago', ticker: 'AAPL', dir: 'long',  size: '$1,000',    delta: '+$412', note: 'Earnings next week — probably safer to wait.' },
      { d: 'Apr 12', ago: 'last week',  ticker: 'GOOG', dir: 'long',  size: '$500',      delta: '+$210', note: 'Wanted to confirm one more signal.' },
      { d: 'Mar 28', ago: '4 weeks ago',ticker: 'PYPL', dir: 'long',  size: '30 shares', delta: '+$110', note: 'Re-read the 10-Q three times.' },
    ],
    drive: [
      { d: 'Apr 22', ago: 'yesterday', ticker: 'MSFT', dir: 'short', size: '40 shares', delta: '+$47',  note: 'Bailed to protect the week\'s gain.' },
      { d: 'Apr 16', ago: 'last week', ticker: 'TSLA', dir: 'long',  size: '10 shares', delta: '−$42',  note: 'Held — but only because I was scared to cut.' },
      { d: 'Mar 19', ago: '5 weeks ago',ticker: 'SHOP', dir: 'long', size: '$300',      delta: '−$215', note: 'Should have exited when the thesis broke.' },
    ],
    mood: [
      { d: 'Apr 19', ago: '4 days ago', ticker: 'COIN', dir: 'long',  size: '20 shares', delta: '−$180', note: 'SEC headline — couldn\'t tell if it mattered.' },
      { d: 'Apr 22', ago: 'yesterday',  ticker: 'MSFT', dir: 'short', size: '40 shares', delta: '+$47',  note: 'CPI print spooked me out of the short.' },
      { d: 'Mar 24', ago: '4 weeks ago',ticker: 'NFLX', dir: 'long',  size: '5 shares',  delta: '+$40',  note: 'Subscriber news made me re-underwrite everything.' },
    ],
    signal: [
      { d: 'Apr 12', ago: 'last week', ticker: 'GOOG', dir: 'long', size: '$500',      delta: '+$210', note: 'Waited to see if the group chat agreed.' },
      { d: 'Mar 28', ago: '4 weeks ago',ticker: 'PYPL', dir: 'long', size: '30 shares', delta: '+$110', note: 'Two analyst upgrades before I acted.' },
      { d: 'Mar 19', ago: '5 weeks ago',ticker: 'SHOP', dir: 'long', size: '$300',      delta: '−$215', note: 'Followed a call from a friend I trust.' },
    ],
  },
};

export const SEED_OPTIONS = [
  { key: 'hesitate',  label: 'I hesitate too much',         sub: 'I see the setup and I wait too long.' },
  { key: 'chase',     label: 'I chase too fast',            sub: 'I jump in once the room starts shouting.' },
  { key: 'overthink', label: 'I overthink',                 sub: 'I re-underwrite every thesis twice.' },
  { key: 'follow',    label: "I don't trust my own read",   sub: 'I wait for someone else to go first.' },
];

export function seedToScores(seedKey) {
  const base = { tempo: 50, drive: 50, mood: 50, signal: 50 };
  switch (seedKey) {
    case 'hesitate':  return { ...base, tempo: 25, drive: 30 };
    case 'chase':     return { ...base, tempo: 75, drive: 70, mood: 62 };
    case 'overthink': return { ...base, tempo: 20, mood: 60 };
    case 'follow':    return { ...base, signal: 72, drive: 40 };
    default:          return base;
  }
}

export function resolveCode(scores) {
  const letter = (k) => {
    const axis = DNA_AXES.find(a => a.key === k);
    return scores[k] < 50 ? axis.letters[0] : axis.letters[1];
  };
  return letter('tempo') + letter('drive') + letter('mood') + letter('signal');
}
