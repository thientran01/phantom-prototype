# Phantom — v2 prototype

An editorial trading-journal prototype. This repo is the reference build for the SwiftUI port: every screen, token, and state the iOS devs need to replicate is here and runnable.

## Run it

```bash
npm install
npm run dev
```

- `/` — the v2 app (this is what you're porting)
- `/compare.html` — side-by-side MVP vs v2, with a state selector for walking every screen

## Repo map

```
src/                     ← the live v2 app (port this)
  main.jsx               entry; mounts V2App
  V2App.jsx              state machine + routing across all screens
  tokens.jsx             colors, typography, reusable UI primitives
  DesignSystem.jsx       right-side token reference panel (also state picker)

  Today.jsx              home feed
  Compose.jsx            log a new ghost (ticker + emotion parsing)
  Emotion.jsx            3-axis emotional compass
  Archive.jsx            chronological ghost list
  Patterns.jsx           4 pattern cards
  PatternDetail.jsx      single pattern drill-down
  GhostDetail.jsx        single ghost view
  Followup.jsx           post-resolution reflection
  DNA.jsx                psychometric profile wizard
  Onboarding.jsx         4-step first-run flow
  You.jsx                profile, CSV export, sign-out

  ghostStore.js          persistence (localStorage) + CSV export
  dnaData.js             archetype matrix, axes, pattern metadata
  BottomBar.jsx          tab nav
  AuthCard.jsx           warmup CTA
  emptyStates.jsx        empty-state placeholders
  iosFrame.jsx           mobile device frame wrapper

public/
  legacy/v1/             original MVP screens — loaded by /compare.html only
  compare.html           MVP vs v2 comparison view

design/phantom/          Figma HTML specs + component JSX exports
                         (gitignored — bundle separately for hand-off)
```

## Where to start for the SwiftUI port

1. **Run the dev server and click through every state.** Use the state selector in the Design System panel (right side) to hit every screen the app can render.
2. **Read `src/tokens.jsx` first.** Port these colors, font families, and spacing values to SwiftUI constants. Everything else depends on them.
3. **Read `src/V2App.jsx`.** It's a flat state machine — the `screen` state plus a handful of flags drive every route. This is the navigation model to replicate.
4. **Walk screens one at a time.** Each `src/<Screen>.jsx` is self-contained and maps to one SwiftUI `View`.
5. **Data layer:**
   - `src/ghostStore.js` — persistence. `localStorage` keys prefixed `phantom.v2.*` become `UserDefaults` keys (or Core Data / SwiftData if you prefer).
   - `src/dnaData.js` — static content; port as Swift structs.
6. **Fonts:** Newsreader (serif, italic for editorial voice), Geist (sans, UI), Geist Mono (tickers). Loaded from Google Fonts in `index.html`.

## Notes

- No router library — navigation is a single `screen` state in `V2App.jsx`.
- All persistence is `localStorage`; no backend.
- The MVP in `public/legacy/v1/` is reference-only and is **not** the spec. Build from v2.
