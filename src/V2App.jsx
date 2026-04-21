import React from 'react';
import { IOSDevice } from './iosFrame.jsx';
import { V2, V2_FONT, V2Paper } from './tokens.jsx';
import { V2BottomBar } from './BottomBar.jsx';
import { V2Today } from './Today.jsx';
import { V2Compose } from './Compose.jsx';
import { V2Patterns } from './Patterns.jsx';
import { V2Archive, V2_ARCHIVE } from './Archive.jsx';
import { V2Followup } from './Followup.jsx';
import { V2You, V2StyleIndex } from './You.jsx';
import { V2DNALocked, V2DNAForming, V2DNARevealed, V2DNAArchetype, V2DNAAxis } from './DNA.jsx';
import { V2DesignSystemPanel } from './DesignSystem.jsx';
import { V2Onboarding } from './Onboarding.jsx';
import { V2PatternDetail } from './PatternDetail.jsx';
import { V2GhostDetail } from './GhostDetail.jsx';
import {
  loadUserGhosts, saveUserGhosts,
  loadOverlays, saveOverlays,
  loadLastResolvedSession, saveLastResolvedSession,
  parsedToGhost, resolvePending, computeStreak, lastLoggedAgo,
  ghostsToCSV, downloadCSV, mergeArchive, flattenArchive,
} from './ghostStore.js';

const GHOST_COUNT_FIXTURE = { cold: 0, warming: 2, warm: 47 };

function dnaScreenForLevel(level) {
  if (level === 'cold') return 'dna-locked';
  if (level === 'warming') return 'dna-forming';
  return 'dna-revealed';
}

export default function V2App() {
  const [onboarded, setOnboarded] = React.useState(() => localStorage.getItem('phantom.v2.onboarded') === '1');
  const [onbStep, setOnbStep] = React.useState(0);
  const [screen, setScreen] = React.useState(() => localStorage.getItem('phantom.v2.screen') || 'main');
  const [tab, setTab] = React.useState(() => localStorage.getItem('phantom.v2.tab') || 'today');
  const [dnaAxis, setDnaAxis] = React.useState(() => localStorage.getItem('phantom.v2.dnaAxis') || 'tempo');
  const [dnaReferrer, setDnaReferrer] = React.useState(() => localStorage.getItem('phantom.v2.dnaReferrer') || 'patterns');
  const [patternKey, setPatternKey] = React.useState(() => localStorage.getItem('phantom.v2.patternKey') || 'fear');
  const [ghostId, setGhostId] = React.useState(() => localStorage.getItem('phantom.v2.ghostId') || 'apr22-msft');
  const [demoLevel, setDemoLevel] = React.useState(() => localStorage.getItem('phantom.v2.demoLevel') || 'warm');
  const [authDismissed, setAuthDismissed] = React.useState(() => localStorage.getItem('phantom.v2.authDismissed') === '1');
  const [sessionCount] = React.useState(() => {
    const prev = parseInt(localStorage.getItem('phantom.v2.sessionCount') || '0', 10);
    const next = prev + 1;
    localStorage.setItem('phantom.v2.sessionCount', String(next));
    return next;
  });

  const [userGhosts, setUserGhosts] = React.useState(() => {
    const stored = loadUserGhosts();
    const lastResolved = loadLastResolvedSession();
    const resolved = resolvePending(stored, sessionCount, lastResolved);
    if (resolved !== stored) saveUserGhosts(resolved);
    saveLastResolvedSession(sessionCount);
    return resolved;
  });
  const [overlays, setOverlays] = React.useState(() => loadOverlays());

  React.useEffect(() => { localStorage.setItem('phantom.v2.screen', screen); }, [screen]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.tab', tab); }, [tab]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.dnaAxis', dnaAxis); }, [dnaAxis]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.dnaReferrer', dnaReferrer); }, [dnaReferrer]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.patternKey', patternKey); }, [patternKey]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.ghostId', ghostId); }, [ghostId]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.demoLevel', demoLevel); }, [demoLevel]);
  React.useEffect(() => { localStorage.setItem('phantom.v2.authDismissed', authDismissed ? '1' : '0'); }, [authDismissed]);

  const archiveGroups = React.useMemo(
    () => mergeArchive(userGhosts, demoLevel, overlays),
    [userGhosts, demoLevel, overlays]
  );
  const allGhosts = React.useMemo(() => flattenArchive(archiveGroups), [archiveGroups]);
  const pendingGhost = React.useMemo(
    () => userGhosts.find(g => g.outcome === 'pending') || null,
    [userGhosts]
  );
  const resolvedUserGhost = React.useMemo(
    () => [...userGhosts]
      .filter(g => g.outcome !== 'pending' && !(overlays[g.id] && overlays[g.id].resolution))
      .sort((a, b) => (b.resolvedAt || 0) - (a.resolvedAt || 0))[0] || null,
    [userGhosts, overlays]
  );

  const fixtureGhostCount = GHOST_COUNT_FIXTURE[demoLevel] ?? 47;
  const ghostCount = fixtureGhostCount + userGhosts.length;
  const hasFollowup = demoLevel === 'warm' || !!resolvedUserGhost;
  const showAuthCard = onboarded && demoLevel === 'warm' && sessionCount >= 2 && !authDismissed;

  const goCompose  = () => setScreen('compose');
  const goFollowup = () => setScreen('followup');
  const goStyle    = () => setScreen('style');

  const setMainTab = (t) => { setTab(t); setScreen('main'); };

  const openDNAFrom = (from) => { setDnaReferrer(from); setScreen(dnaScreenForLevel(demoLevel)); };
  const closeDNA = () => {
    if (dnaReferrer === 'today') { setTab('today'); setScreen('main'); }
    else { setTab('patterns'); setScreen('main'); }
  };

  const saveGhost = React.useCallback((parsed, text) => {
    const ghost = parsedToGhost(parsed, text);
    ghost.loggedSession = sessionCount;
    setUserGhosts(prev => {
      const next = [...prev, ghost];
      saveUserGhosts(next);
      return next;
    });
    return ghost.id;
  }, [sessionCount]);

  const updateOverlay = React.useCallback((id, patch) => {
    setOverlays(prev => {
      const existing = prev[id] || {};
      const merged = { ...prev, [id]: { ...existing, ...patch } };
      saveOverlays(merged);
      return merged;
    });
  }, []);

  const forceResolvePending = React.useCallback(() => {
    setUserGhosts(prev => {
      const next = resolvePending(prev, sessionCount + 1, sessionCount);
      saveUserGhosts(next);
      return next;
    });
  }, [sessionCount]);

  const exportJournal = React.useCallback(() => {
    const csv = ghostsToCSV(allGhosts);
    downloadCSV(csv);
  }, [allGhosts]);

  const finishOnboarding = ({ skipped, parsed, text } = {}) => {
    localStorage.setItem('phantom.v2.onboarded', '1');
    if (skipped) {
      setDemoLevel('cold');
    } else {
      setDemoLevel(prev => prev === 'warm' ? 'warm' : 'warming');
    }
    if (parsed && !skipped) {
      saveGhost(parsed, text);
    }
    setOnboarded(true);
    setTab('today');
    setScreen('main');
  };

  const resetOnboarding = () => {
    localStorage.removeItem('phantom.v2.onboarded');
    localStorage.removeItem('phantom.v2.authDismissed');
    localStorage.setItem('phantom.v2.sessionCount', '0');
    setAuthDismissed(false);
    setOnbStep(0);
    setOnboarded(false);
  };

  const signOut = React.useCallback(() => {
    if (!window.confirm('Sign out and clear your journal from this device?')) return;
    Object.keys(localStorage)
      .filter(k => k.startsWith('phantom.v2.'))
      .forEach(k => localStorage.removeItem(k));
    setUserGhosts([]);
    setOverlays({});
    setAuthDismissed(false);
    setOnbStep(0);
    setOnboarded(false);
  }, []);

  const STATUS_BAR = 56;

  if (!onboarded) {
    return (
      <>
        <div style={{
          maxWidth: 440, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            padding: '4px 8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap',
            justifyContent: 'center', fontFamily: V2_FONT.sans,
          }}>
            <span style={{ fontSize: 12, color: V2.ink55, padding: '8px 4px' }}>
              Onboarding · step {onbStep + 1} of 4
            </span>
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => setOnbStep(i)} style={{
                padding: '8px 12px', borderRadius: 10,
                border: `1px solid ${onbStep === i ? V2.ink : V2.ink15}`,
                background: onbStep === i ? V2.ink : V2.paper,
                color: onbStep === i ? V2.paper : V2.ink,
                fontSize: 12, cursor: 'pointer', fontFamily: V2_FONT.sans,
              }}>{13 + i} · {['Cover','Concept','Seed','First ghost'][i]}</button>
            ))}
            <button onClick={() => { localStorage.setItem('phantom.v2.onboarded','1'); setOnboarded(true); setTab('today'); setScreen('main'); }} style={{
              padding: '8px 12px', borderRadius: 10,
              border: `1px solid ${V2.ink15}`,
              background: V2.paper, color: V2.ink55,
              fontSize: 12, cursor: 'pointer', fontFamily: V2_FONT.sans,
            }}>Skip to app</button>
          </div>
          <IOSDevice>
            <V2Paper>
              <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}>
                <V2Onboarding
                  startStep={onbStep}
                  onDone={finishOnboarding}
                  onSetSeed={() => {}}
                />
              </div>
            </V2Paper>
          </IOSDevice>
        </div>
        <V2DesignSystemPanel/>
      </>
    );
  }

  const isDNA = screen.startsWith('dna-');

  let inner;
  if (screen === 'compose') {
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}><V2Compose
      onCancel={() => setScreen('main')}
      onSave={(parsed, text) => { saveGhost(parsed, text); setTab('today'); setScreen('main'); }}
    /></div>;
  } else if (screen === 'followup') {
    const followupTargetId = resolvedUserGhost ? resolvedUserGhost.id : null;
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR, background: V2.paperDark }}><V2Followup
      onBack={() => setScreen('main')}
      onResolve={(resolved) => {
        if (followupTargetId) updateOverlay(followupTargetId, { resolution: resolved });
        setScreen('main');
      }}
    /></div>;
  } else if (screen === 'style') {
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}><V2StyleIndex onBack={() => setScreen('main')}/></div>;
  } else if (screen === 'pattern') {
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}>
      <V2PatternDetail
        patternKey={patternKey}
        ghosts={allGhosts}
        onBack={() => { setTab('patterns'); setScreen('main'); }}
        onOpenGhost={(id) => { setGhostId(id); setScreen('ghost'); }}
      />
    </div>;
  } else if (screen === 'ghost') {
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}>
      <V2GhostDetail
        ghostId={ghostId}
        ghosts={allGhosts}
        overlay={overlays[ghostId] || {}}
        onUpdateOverlay={(patch) => updateOverlay(ghostId, patch)}
        onBack={() => { setTab('archive'); setScreen('main'); }}
        onOpenPattern={(k) => { setPatternKey(k); setScreen('pattern'); }}
        onOpenGhost={(id) => { setGhostId(id); setScreen('ghost'); }}
      />
    </div>;
  } else if (isDNA) {
    let dnaContent;
    if (screen === 'dna-locked')   dnaContent = <V2DNALocked onBack={closeDNA}/>;
    else if (screen === 'dna-forming')  dnaContent = <V2DNAForming onBack={closeDNA} onOpenRevealed={() => setScreen('dna-revealed')}/>;
    else if (screen === 'dna-archetype') dnaContent = <V2DNAArchetype onBack={() => setScreen('dna-revealed')} onOpenAxis={(k) => { setDnaAxis(k); setScreen('dna-axis'); }}/>;
    else if (screen === 'dna-axis') dnaContent = <V2DNAAxis axisKey={dnaAxis} onBack={() => setScreen('dna-revealed')} onOpenArchetype={() => setScreen('dna-archetype')}/>;
    else dnaContent = <V2DNARevealed
      onBack={closeDNA}
      onOpenArchetype={() => setScreen('dna-archetype')}
      onOpenAxis={(k) => { setDnaAxis(k); setScreen('dna-axis'); }}
    />;
    inner = <div style={{ flex: 1, overflowY: 'auto', paddingTop: STATUS_BAR }}>{dnaContent}</div>;
  } else {
    let content;
    if (tab === 'today')    content = <V2Today
      demoLevel={demoLevel}
      ghostCount={ghostCount}
      hasFollowup={hasFollowup}
      showAuthCard={showAuthCard}
      pendingGhost={pendingGhost}
      onSignIn={() => setAuthDismissed(true)}
      onDismissAuth={() => setAuthDismissed(true)}
      onCompose={goCompose}
      onOpenFollowup={goFollowup}
      onOpenPatterns={() => setMainTab('patterns')}
      onOpenArchive={() => setMainTab('archive')}
      onOpenDNA={() => openDNAFrom('today')}
      onOpenGhost={(id) => { setGhostId(id); setScreen('ghost'); }}
    />;
    else if (tab === 'patterns') content = <V2Patterns
      ghostCount={ghostCount}
      onOpenPattern={(k) => { setPatternKey(k); setScreen('pattern'); }}
      onOpenDNA={() => openDNAFrom('patterns')}
      onCompose={goCompose}
    />;
    else if (tab === 'archive')  content = <V2Archive
      entries={archiveGroups}
      onCompose={goCompose}
      onOpenGhost={(id) => { setGhostId(id); setScreen('ghost'); }}
    />;
    else                         content = <V2You
      userGhosts={userGhosts}
      streak={computeStreak(userGhosts)}
      lastLogged={lastLoggedAgo(userGhosts)}
      onOpenStyle={goStyle}
      onResetOnboarding={resetOnboarding}
      onExport={exportJournal}
      onSignOut={signOut}
    />;
    inner = (
      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingTop: STATUS_BAR }}>
          {content}
        </div>
        <V2BottomBar tab={tab} onTab={setMainTab} onCompose={goCompose}/>
      </div>
    );
  }

  const picker = [
    { k: 'today',    l: '1 · Today' },
    { k: 'compose',  l: '2 · Compose (try typing)' },
    { k: 'followup', l: '3 · Follow-up' },
    { k: 'patterns', l: '4 · Patterns' },
    { k: 'archive',  l: '5 · Archive' },
    { k: 'you',      l: '6 · You' },
    { k: 'style',    l: '7 · Style index' },
    { k: 'dna-locked',    l: '8 · DNA · Locked' },
    { k: 'dna-forming',   l: '9 · DNA · Forming' },
    { k: 'dna-revealed',  l: '10 · DNA · Revealed' },
    { k: 'dna-archetype', l: '11 · DNA · Archetype' },
    { k: 'dna-axis',      l: '12 · DNA · Axis detail' },
    { k: 'pattern',       l: '13 · Pattern · Detail' },
    { k: 'ghost',         l: '14 · Ghost · Detail'   },
  ];
  const currentKey =
    screen === 'compose'   ? 'compose' :
    screen === 'followup'  ? 'followup' :
    screen === 'style'     ? 'style' :
    screen === 'pattern'   ? 'pattern' :
    screen === 'ghost'     ? 'ghost' :
    isDNA                  ? screen :
    tab;

  const pick = (k) => {
    if (k === 'compose')   setScreen('compose');
    else if (k === 'followup') setScreen('followup');
    else if (k === 'style')    setScreen('style');
    else if (k === 'pattern')  setScreen('pattern');
    else if (k === 'ghost')    setScreen('ghost');
    else if (k.startsWith('dna-')) { setDnaReferrer('patterns'); setScreen(k); }
    else { setScreen('main'); setTab(k); }
  };

  const levels = [
    { k: 'cold',    l: 'cold · 0 ghosts'  },
    { k: 'warming', l: 'warming · 2 ghosts' },
    { k: 'warm',    l: 'warm · 47 ghosts'  },
  ];

  return (
    <>
    <div style={{
      maxWidth: 440, margin: '0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{
        padding: '4px 8px 4px', display: 'flex', gap: 6, flexWrap: 'wrap',
        justifyContent: 'center', fontFamily: V2_FONT.sans,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: V2.ink55,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontWeight: 500, padding: '8px 4px',
        }}>State</span>
        {levels.map(lv => (
          <button key={lv.k} onClick={() => setDemoLevel(lv.k)} style={{
            padding: '8px 12px', borderRadius: 10,
            border: `1px solid ${demoLevel === lv.k ? V2.ink : V2.ink15}`,
            background: demoLevel === lv.k ? V2.ink : V2.paper,
            color: demoLevel === lv.k ? V2.paper : V2.ink,
            fontSize: 12, cursor: 'pointer', fontFamily: V2_FONT.sans,
          }}>{lv.l}</button>
        ))}
        <button onClick={resetOnboarding} style={{
          padding: '8px 12px', borderRadius: 10,
          border: `1px dashed ${V2.ink15}`,
          background: 'transparent', color: V2.ink55,
          fontSize: 12, cursor: 'pointer', fontFamily: V2_FONT.sans,
        }}>Restart onboarding</button>
        <button onClick={forceResolvePending} style={{
          padding: '8px 12px', borderRadius: 10,
          border: `1px dashed ${V2.ink15}`,
          background: 'transparent', color: V2.ink55,
          fontSize: 12, cursor: 'pointer', fontFamily: V2_FONT.sans,
        }}>Resolve pending ({userGhosts.filter(g => g.outcome === 'pending').length})</button>
      </div>
      <div style={{
        padding: '4px 8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: V2_FONT.sans,
      }}>
        {picker.map(p => (
          <button key={p.k} onClick={() => pick(p.k)} style={{
            padding: '8px 12px', borderRadius: 10,
            border: `1px solid ${currentKey === p.k ? V2.ink : V2.ink15}`,
            background: currentKey === p.k ? V2.ink : V2.paper,
            color: currentKey === p.k ? V2.paper : V2.ink,
            fontSize: 12, cursor: 'pointer',
            fontFamily: V2_FONT.sans,
          }}>{p.l}</button>
        ))}
      </div>
      <IOSDevice dark={screen === 'followup'}>
        <V2Paper style={screen === 'followup' ? { background: V2.paperDark, color: V2.paper } : undefined}>{inner}</V2Paper>
      </IOSDevice>
    </div>
    <V2DesignSystemPanel/>
    </>
  );
}
