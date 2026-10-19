import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, MoonStar, Sparkles, WandSparkles, Heart, RotateCcw, Send, Check } from 'lucide-react';
import IntroSequence, { hasSeenIntroThisSession, shouldSkipIntroForReducedMotion } from './components/IntroSequence';
import AudioToggle from './components/AudioToggle';
import PipMascot from './components/PipMascot';
import FairyDustIndex from './components/FairyDustIndex';
import { enableAudio, playChime } from './utils/audio';

const ROUTE_WINDOWS = [
  {
    id: 1,
    title: 'The Clocktower Attic',
    dreamer: 'A clockkeeper counting ticks',
    gift: 'Slow pendulum dreams',
    freq: 523.25,
  },
  {
    id: 2,
    title: 'The Greenhouse Glass',
    dreamer: 'A botanist & night jasmine',
    gift: 'Moonlight mist & soft breeze',
    freq: 659.25,
  },
  {
    id: 3,
    title: 'The Rooftop Nest',
    dreamer: 'A swallow resting from fog',
    gift: 'A warm feather blanket',
    freq: 783.99,
  },
  {
    id: 4,
    title: 'The Harbor Lookout',
    dreamer: 'An old sailor watching the tide',
    gift: 'Gentle waves & starlight',
    freq: 1046.5,
  },
];

export default function App() {
  const [introVisible, setIntroVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('intro') || params.has('replay')) return true;
      if (params.has('nointro')) return false;
    }
    return !hasSeenIntroThisSession() && !shouldSkipIntroForReducedMotion();
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<'midnight' | 'morning'>('midnight');
  const [bubbleCaught, setBubbleCaught] = useState(false);
  const [bubbleAttempts, setBubbleAttempts] = useState(0);
  const [ghostFreed, setGhostFreed] = useState(false);
  const [cloudAsleep, setCloudAsleep] = useState(false);
  const [dreamNote, setDreamNote] = useState('');
  const [submittedDream, setSubmittedDream] = useState('');
  const [starTaps, setStarTaps] = useState(0);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [activeProjects, setActiveProjects] = useState<number[]>([]);
  const [lullabyPlaying, setLullabyPlaying] = useState(false);
  const lullabyRef = useRef<HTMLAudioElement | null>(null);
  const [deliveredWindows, setDeliveredWindows] = useState<number[]>([]);
  const [latestDelivery, setLatestDelivery] = useState<string | null>(null);

  const deliverDreamTo = (windowId: number) => {
    const win = ROUTE_WINDOWS.find((w) => w.id === windowId);
    if (!win) return;

    if (!deliveredWindows.includes(windowId)) {
      setDeliveredWindows((prev) => [...prev, windowId]);
      setLatestDelivery(`Waved at ${win.title}: Sent ${win.gift}! ✨`);
      playChime(soundEnabled, win.freq);
    } else {
      setLatestDelivery(`Waved again at ${win.title} ♡`);
      playChime(soundEnabled, win.freq * 1.15);
    }
  };

  const deliverNextWindow = () => {
    const next = ROUTE_WINDOWS.find((w) => !deliveredWindows.includes(w.id));
    if (next) {
      deliverDreamTo(next.id);
    }
  };

  const resetRoute = () => {
    setDeliveredWindows([]);
    setLatestDelivery('Satchel repacked with fresh starlight dreams! ✦');
    playChime(soundEnabled, 440);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (lullabyRef.current) {
        lullabyRef.current.pause();
        lullabyRef.current = null;
      }
    };
  }, []);

  // Stop lullaby if sound is disabled globally
  useEffect(() => {
    if (!soundEnabled && lullabyRef.current && !lullabyRef.current.paused) {
      lullabyRef.current.pause();
      setLullabyPlaying(false);
      setActiveProjects((curr) => curr.filter((id) => id !== 1));
    }
  }, [soundEnabled]);

  const submitDream = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = dreamNote.trim();
    if (!trimmed) return;
    setSubmittedDream(trimmed);
    setDreamNote('');
  };

  const tapWordmarkStar = () => {
    const next = starTaps + 1;
    if (next >= 5) {
      setEasterEggFound(true);
      setStarTaps(0);
      return;
    }
    setStarTaps(next);
  };

  const toggleProject = (projectId: number) => {
    if (projectId === 1) {
      const willPlay = !activeProjects.includes(1);
      if (willPlay) {
        if (!lullabyRef.current) {
          lullabyRef.current = new Audio('/assets/audio/skipped-lullaby.mp3');
        }
        lullabyRef.current.currentTime = 0;
        lullabyRef.current.onended = () => {
          setLullabyPlaying(false);
          setActiveProjects((curr) => curr.filter((id) => id !== 1));
        };
        lullabyRef.current.play().then(() => {
          setLullabyPlaying(true);
        }).catch(() => {
          setLullabyPlaying(false);
        });
        setActiveProjects((curr) => [...curr.filter((id) => id !== 1), 1]);
      } else {
        if (lullabyRef.current) {
          lullabyRef.current.pause();
          lullabyRef.current.currentTime = 0;
        }
        setLullabyPlaying(false);
        setActiveProjects((curr) => curr.filter((id) => id !== 1));
      }
      return;
    }

    setActiveProjects((current) => current.includes(projectId)
      ? current.filter((id) => id !== projectId)
      : [...current, projectId]);
  };

  const completeIntro = useCallback(() => setIntroVisible(false), []);

  const toggleSound = useCallback(async () => {
    const nextValue = !soundEnabled;
    setSoundEnabled(nextValue);
    if (nextValue) await enableAudio();
  }, [soundEnabled]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={`site-shell site-shell--${theme}`}>
      <FairyDustIndex />
      <a className="skip-link" href="#home" inert={introVisible ? '' : undefined}>Skip to story</a>
      {introVisible && (
        <IntroSequence
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onComplete={completeIntro}
        />
      )}

      <header className="site-header" inert={introVisible ? '' : undefined}>
        <div className="wordmark-group">
          <button
            className="wordmark-star"
            type="button"
            onClick={tapWordmarkStar}
            aria-label="Discover Pip’s secret by tapping five times"
            aria-controls={easterEggFound ? "easter-egg-reveal" : undefined}
            aria-expanded={easterEggFound}
            title="A tiny nursery secret"
          >✦</button>
          <a className="wordmark" href="#home" aria-label="Pip — home">
            PIP <span className="wordmark-dot" aria-hidden="true">·</span> MIDNIGHT NURSERY
          </a>
        </div>
        <nav className="header-controls" aria-label="Site controls">
          <AudioToggle enabled={soundEnabled} onToggle={toggleSound} />
          <button
            className="utility-button theme-toggle"
            type="button"
            onClick={() => setTheme((current) => current === 'midnight' ? 'morning' : 'midnight')}
            aria-pressed={theme === 'morning'}
          >
            <MoonStar size={17} aria-hidden="true" />
            <span>{theme === 'midnight' ? 'Midnight' : 'Morning'}</span>
          </button>
          <button
            className="utility-button replay-intro-button"
            type="button"
            onClick={() => {
              try { window.sessionStorage.removeItem('pip-midnight-intro-seen-v2'); } catch {}
              setIntroVisible(true);
            }}
            title="Watch Pip's introduction again"
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Replay intro</span>
          </button>
        </nav>
      </header>

      <main id="home" tabIndex={-1} inert={introVisible ? '' : undefined}>
        <section className="hero-section">
          <div className="hero-backdrop" aria-hidden="true">
            <span className="hero-moon" />
            <span className="hero-cloud hero-cloud--left" />
            <span className="hero-cloud hero-cloud--right" />
            <span className="hero-orbit hero-orbit--one" />
            <span className="hero-orbit hero-orbit--two" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> THE MIDNIGHT NURSERY</p>
            <h1>Little dreams.<br /><em>Loose ends.</em></h1>
            <p className="hero-role">Pip — Junior Dream Engineer</p>
            <p className="hero-description">“I build the dreams you fall asleep inside.”</p>
            <p className="hero-subtext">Some dreams need a little room left over.</p>
            <a className="primary-link" href="#phase-one-next">
              Enter the nursery <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <PipMascot soundEnabled={soundEnabled} />
          <div className="scroll-note"><span /> THE STORY UNFOLDS BELOW</div>
        </section>

        <section className="nursery-scene" id="phase-one-next">
          <div className="nursery-scene__stars" aria-hidden="true"><i>✦</i><i>✧</i><i>·</i><i>✦</i><i>✧</i></div>
          <div className="scene-heading">
            <div className="section-kicker"><Sparkles size={13} /> SCENE 01 · A TINY ACCIDENT</div>
            <h2>Oh. That dream<br /><em>wasn’t tied down.</em></h2>
            <p>In Pip’s workshop, every dream gets a little star, a little ribbon, and a very official stamp. Usually.</p>
          </div>
          <div className={`workshop-stage ${bubbleCaught ? 'workshop-stage--settled' : ''}`}>
            <div className="workshop-window"><span className="window-moon" /><i>✦</i><i>✧</i><i>✦</i></div>
            <div className="workbench"><span className="bench-label">JUNIOR DREAM ENGINEER</span><span className="bench-leg bench-leg--left" /><span className="bench-leg bench-leg--right" /></div>
            <div className="dream-jar"><span>z z z</span><i /></div>
            <div className="paper-note">DREAM<br /><b>#018</b><br />HANDLE<br />GENTLY</div>
            <button className="interactive-dream-bubble" type="button" onClick={() => { setBubbleCaught((v) => !v); setBubbleAttempts((n) => n + 1); }} aria-label={bubbleCaught ? 'Release the dream bubble' : 'Catch the runaway dream bubble'} aria-pressed={bubbleCaught}>
              <span className="bubble-glint">✦</span><span className="bubble-dream">{bubbleCaught ? '♡' : '☾'}</span><span className="bubble-spark">✧</span>
            </button>
            <div className="workshop-cloud" aria-hidden="true" />
            <div className="stage-caption">{bubbleCaught ? 'Dream secured. For now.' : 'Tap the runaway dream to catch it.'}</div>
          </div>
          <div className="scene-outcome" aria-live="polite">
            <div className="outcome-icon"><WandSparkles size={20} /></div>
            <div><h3>{bubbleCaught ? 'A little magic, held gently.' : 'A dream has slipped its ribbon.'}</h3><p>{bubbleCaught ? 'The bubble settles into Pip’s hands, glowing softly. But something quiet is waiting inside it…' : 'It bobs just out of reach, carrying a tiny unfinished dream. Help Pip catch it before it drifts out the window.'}</p></div>
            {bubbleAttempts > 0 && <span className="attempt-count">{bubbleAttempts} {bubbleAttempts === 1 ? 'touch' : 'touches'}</span>}
          </div>
          <button className="reset-scene" type="button" onClick={() => { setBubbleCaught(false); setBubbleAttempts(0); }}><RotateCcw size={14} /> Reset little accident</button>
          <div className="scene-transition-note"><Heart size={13} /> Not every dream needs to be perfect to be worth keeping.</div>
        </section>

        <section className="ghost-scene" id="ghost-rescue" aria-labelledby="ghost-scene-title">
          <div className="ghost-scene__stars" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span></div>
          <div className="scene-heading ghost-scene__heading">
            <div className="section-kicker"><Sparkles size={13} /> SCENE 02 · THE UNFINISHED DREAM</div>
            <h2>There’s a little ghost<br /><em>in the in-between.</em></h2>
            <p>The bubble was never a mistake. It was carrying a dream that didn’t know how to end — and someone who didn’t want it to.</p>
          </div>
          <div className={`ghost-stage ${ghostFreed ? 'ghost-stage--freed' : ''}`}>
            <div className="ghost-window"><span className="ghost-moon" /><i>✦</i><i>✧</i></div>
            <div className="ghost-bubble" aria-hidden="true"><span className="ghost-figure">{ghostFreed ? '♡' : '☁'}</span><span className="ghost-bubble__shine">✦</span></div>
            <div className="tiny-ghost" aria-hidden="true"><span className="tiny-ghost__eyes">••</span><span className="tiny-ghost__tail" /></div>
            <div className="ghost-stage__floor" />
            <p className="ghost-stage__caption">{ghostFreed ? 'The ghost is free to choose its own ending.' : 'A tiny tap can open the dream.'}</p>
          </div>
          <div className="ghost-story-card" aria-live="polite">
            <div className="ghost-story-card__icon"><Heart size={20} /></div>
            <div className="ghost-story-card__copy">
              <h3>{ghostFreed ? 'No perfect ending required.' : 'Let the dream breathe.'}</h3>
              <p>{ghostFreed ? 'The ghost drifts out of the bubble, not to disappear, but to stay beside Pip. Some stories feel safer when they are allowed to remain unfinished.' : 'The little ghost is tired of being wrapped up neatly. Help Pip open the bubble and let the ghost decide what comes next.'}</p>
            </div>
            <button className="story-action" type="button" onClick={() => setGhostFreed((v) => !v)} aria-pressed={ghostFreed}>{ghostFreed ? 'Tuck ghost back in' : 'Open the dream'}</button>
          </div>

          <div className={`sleep-cloud-card ${cloudAsleep ? 'sleep-cloud-card--asleep' : ''}`}>
            <div className="sleep-cloud-card__art" aria-hidden="true"><span className="sleep-cloud"> <i /><i /><i /></span><span className="sleep-z sleep-z--one">z</span><span className="sleep-z sleep-z--two">z</span><span className="sleep-z sleep-z--three">✦</span></div>
            <div className="sleep-cloud-card__copy">
              <div className="section-kicker"><MoonStar size={13} /> A SMALL SIDE QUEST</div>
              <h3>{cloudAsleep ? 'The cloud is dreaming now.' : 'One last thing before dawn.'}</h3>
              <p>{cloudAsleep ? 'Pip dims the lantern and hums one soft note. The cloud finally lets go of its worries.' : 'A little cloud has been carrying everyone else’s dreams all night. It needs someone to remind it that it can rest, too.'}</p>
              <button className="story-action story-action--soft" type="button" onClick={() => setCloudAsleep((v) => !v)} aria-pressed={cloudAsleep}>{cloudAsleep ? 'Wake the cloud gently' : 'Help the cloud sleep'} <MoonStar size={14} /></button>
            </div>
          </div>
          <div className="scene-transition-note"><Heart size={13} /> Even a dream engineer deserves a little uncertainty.</div>
        </section>

        <section className="projects-section" id="dream-projects" aria-labelledby="projects-title">
          <div className="projects-heading">
            <div className="section-kicker"><Sparkles size={13} aria-hidden="true" /> PIP’S LITTLE INVENTIONS</div>
            <h2 id="projects-title">Three dreams.<br /><em>None quite finished.</em></h2>
            <p>Every project solves a small problem in a slightly unusual way. Pick one to see what Pip has been working on.</p>
          </div>
          <div className="project-grid">
            <article className={`project-card project-card--lullaby${activeProjects.includes(1) ? ' project-card--awake' : ''}`}>
              <div className="project-art" aria-hidden="true">
                <div className="project-art__frame">
                  <img
                    src="/assets/projects/project-01-lullaby.jpg"
                    alt="The Skipped Lullaby music box"
                    className="project-art__img"
                    loading="lazy"
                  />
                  {lullabyPlaying && (
                    <div className="lullaby-audio-indicator" aria-label="Lullaby music box playing">
                      <span className="lullaby-bar" />
                      <span className="lullaby-bar" />
                      <span className="lullaby-bar" />
                      <span className="lullaby-bar" />
                    </div>
                  )}
                </div>
                <span className="project-art__sparkle project-art__sparkle--one">✦</span>
                <span className="project-art__sparkle project-art__sparkle--two">♪</span>
              </div>
              <div className="project-card__body"><p className="project-number">PROJECT 01 · SOUND DESIGN</p><h3>The Skipped Lullaby</h3><p>A lullaby with one missing note. The silence leaves just enough room for a dreamer’s own imagination.</p><details className="project-details"><summary>Inspect the invention</summary><p>Pip’s note-box plays a tiny tune, pauses, then lets the listener finish the melody in their head. The “bug” is the feature.</p></details><button className="project-action" type="button" onClick={() => toggleProject(1)} aria-pressed={activeProjects.includes(1)}>{lullabyPlaying ? 'Let the note rest' : 'Play the missing note'} <span aria-hidden="true">↗</span></button></div>
            </article>
            <article className={`project-card project-card--lantern${activeProjects.includes(2) ? ' project-card--awake' : ''}`}>
              <div className="project-art" aria-hidden="true">
                <div className="project-art__frame">
                  <img
                    src="/assets/projects/project-02-lantern.jpg"
                    alt="The Almost-Brave Lantern"
                    className="project-art__img"
                    loading="lazy"
                  />
                </div>
                <span className="project-art__sparkle project-art__sparkle--one">✧</span>
                <span className="project-art__sparkle project-art__sparkle--two">✦</span>
              </div>
              <div className="project-card__body"><p className="project-number">PROJECT 02 · GUIDED COURAGE</p><h3>The Almost-Brave Lantern</h3><p>A lantern that only glows when someone is willing to look into the dark with it.</p><details className="project-details"><summary>Inspect the invention</summary><p>Its light doesn’t erase the shadows. It makes them small enough to approach, one careful step at a time.</p></details><button className="project-action" type="button" onClick={() => toggleProject(2)} aria-pressed={activeProjects.includes(2)}>{activeProjects.includes(2) ? 'Dim the lantern' : 'Look into the dark'} <span aria-hidden="true">↗</span></button></div>
            </article>
            <article className={`project-card project-card--route${activeProjects.includes(3) ? ' project-card--awake' : ''}`}>
              <div className="project-art" aria-hidden="true">
                <div className="project-art__frame">
                  <img
                    src="/assets/projects/project-03-route.png"
                    alt="The Window-Waving Route with Pip"
                    className="project-art__img project-art__img--pip"
                    loading="lazy"
                  />
                  {activeProjects.includes(3) && (
                    <div className="route-flight-trail" aria-hidden="true">
                      <span className="route-star-pulse route-star-pulse--1">✦</span>
                      <span className="route-star-pulse route-star-pulse--2">✧</span>
                      <span className="route-star-pulse route-star-pulse--3">✨</span>
                    </div>
                  )}
                </div>
                <span className="project-art__sparkle project-art__sparkle--one">☁</span>
                <span className="project-art__sparkle project-art__sparkle--two">✦</span>
              </div>
              <div className="project-card__body">
                <p className="project-number">PROJECT 03 · DREAM DELIVERY</p>
                <h3>The Window-Waving Route</h3>
                <p>A delivery route that takes the long way round because every sleeping window deserves a little hello.</p>
                <details className="project-details">
                  <summary>Inspect the invention</summary>
                  <p>Instead of optimizing only for speed, Pip’s route leaves room for small rituals: a wave, a star, and one more gentle goodnight.</p>
                </details>

                {activeProjects.includes(3) && (
                  <div className="delivery-route-dashboard" role="region" aria-label="Interactive Dream Delivery Route">
                    <div className="route-progress-bar-wrap">
                      <div className="route-progress-info">
                        <span className="route-progress-text">
                          <Sparkles size={13} aria-hidden="true" />
                          {deliveredWindows.length === ROUTE_WINDOWS.length
                            ? 'All 4 sleeping windows greeted! ☾'
                            : `Delivered to ${deliveredWindows.length} of ${ROUTE_WINDOWS.length} windows`}
                        </span>
                        <span className="route-progress-pct">
                          {Math.round((deliveredWindows.length / ROUTE_WINDOWS.length) * 100)}%
                        </span>
                      </div>
                      <div className="route-progress-track">
                        <div
                          className="route-progress-fill"
                          style={{ width: `${(deliveredWindows.length / ROUTE_WINDOWS.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="route-windows-grid">
                      {ROUTE_WINDOWS.map((win, idx) => {
                        const isDelivered = deliveredWindows.includes(win.id);
                        return (
                          <button
                            key={win.id}
                            type="button"
                            className={`route-window-card ${isDelivered ? 'route-window-card--delivered' : ''}`}
                            onClick={() => deliverDreamTo(win.id)}
                            aria-label={`${win.title}: ${win.dreamer}. ${isDelivered ? 'Dream delivered' : 'Click to wave and deliver dream'}`}
                            aria-pressed={isDelivered}
                          >
                            <div className="window-card-header">
                              <span className="window-emoji" aria-hidden="true">{isDelivered ? '✨' : '🪟'}</span>
                              <span className="window-number">STOP 0{idx + 1}</span>
                              {isDelivered && <span className="window-check" aria-hidden="true"><Check size={12} /></span>}
                            </div>
                            <div className="window-title">{win.title}</div>
                            <div className="window-dreamer">{win.dreamer}</div>
                            <div className="window-gift-tag">
                              {isDelivered ? `♡ ${win.gift}` : `Wave & send ${win.gift}`}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {latestDelivery && (
                      <div className="route-toast-banner" role="status" aria-live="polite">
                        <span>{latestDelivery}</span>
                      </div>
                    )}

                    <div className="route-quick-actions">
                      {deliveredWindows.length < ROUTE_WINDOWS.length ? (
                        <button
                          type="button"
                          className="route-btn-primary"
                          onClick={deliverNextWindow}
                        >
                          <Send size={13} aria-hidden="true" /> Wave at next window
                        </button>
                      ) : (
                        <div className="route-completed-badge">
                          <Heart size={14} aria-hidden="true" /> Every window is resting warmly!
                        </div>
                      )}
                      {deliveredWindows.length > 0 && (
                        <button
                          type="button"
                          className="route-btn-secondary"
                          onClick={resetRoute}
                          title="Reset delivery route to deliver dreams again"
                        >
                          <RotateCcw size={12} aria-hidden="true" /> Reset route
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  className="project-action"
                  type="button"
                  onClick={() => toggleProject(3)}
                  aria-pressed={activeProjects.includes(3)}
                >
                  {activeProjects.includes(3) ? 'Finish the route' : 'Send a dream'} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          </div>
          <p className="projects-footnote"><Heart size={13} aria-hidden="true" /> Pip’s rule: if it helps someone feel less alone, it’s working.</p>
        </section>

        <section className="keeper-section" id="keeper-of-loose-ends" aria-labelledby="keeper-title">
          <div className="keeper-orbit" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span></div>
          <div className="keeper-copy">
            <p className="section-kicker"><Sparkles size={13} aria-hidden="true" /> THE LAST PAGE THAT ISN’T A LAST PAGE</p>
            <h2 id="keeper-title">Keeper of<br /><em>Loose Ends.</em></h2>
            <p>By dawn, Pip understands: the ghost didn’t need a perfect ending. The cloud didn’t need to carry every dream. And a little unfinishedness can be a place to rest.</p>
            <p>So Pip changes the label on the workshop door. Not “Fixer of Dreams.” Not “Finisher of Everything.” Just <strong>Keeper of Loose Ends</strong> — leaving a little space for what comes next.</p>
            <a className="primary-link keeper-link" href="#leave-a-dream">Leave a little space <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
          <div className="keeper-art" aria-label="A glowing nursery window under a crescent moon">
            <div className="keeper-moon" />
            <div className="keeper-window"><span>✦</span><span>✧</span><i /></div>
            <div className="keeper-cloud" />
            <p>THE END IS A SOFT PLACE TO BEGIN AGAIN</p>
          </div>
        </section>

        <section className="dream-note-section" id="leave-a-dream" aria-labelledby="dream-note-title">
          <div className="section-kicker"><Heart size={13} aria-hidden="true" /> A LITTLE GUESTBOOK</div>
          <h2 id="dream-note-title">What are you still<br /><em>figuring out?</em></h2>
          <p>You can leave a small unfinished thought here. It stays in this page while it is open; nothing is sent to a server.</p>
          <form className="dream-note-form" onSubmit={submitDream}>
            <label htmlFor="dream-note">A loose end I’m keeping</label>
            <textarea id="dream-note" value={dreamNote} onChange={(event) => setDreamNote(event.target.value)} maxLength={240} rows={3} placeholder="A plan, a hope, a question… it doesn’t need to be finished." required />
            <div className="dream-note-form__bottom"><span>{dreamNote.length}/240</span><button className="story-action" type="submit">Leave it with Pip <Sparkles size={14} aria-hidden="true" /></button></div>
          </form>
          {submittedDream && <div className="dream-note-result" aria-live="polite"><span className="dream-note-result__star" aria-hidden="true">✦</span><div><strong>Your loose end has a place.</strong><p>“{submittedDream}”</p><button type="button" className="text-button" onClick={() => setSubmittedDream('')}>Let it drift away</button></div></div>}
          {easterEggFound && <div className="easter-egg-reveal" id="easter-egg-reveal" role="status"><span aria-hidden="true">✧</span><div><strong>You found Pip’s secret.</strong><p>There is a tiny star under the workshop floorboards. Pip keeps it for dreams that are too shy to shine.</p></div><button type="button" className="text-button" onClick={() => { setEasterEggFound(false); setStarTaps(0); }}>Hide the secret</button></div>}
          <p className="easter-hint">Psst… the little star in the top-left has a secret.</p>
        </section>
      </main>

      <footer className="site-footer" inert={introVisible ? '' : undefined}>
        <span>Made with moonlight at the Midnight Nursery.</span>
        <span>Phase 8 · Midnight Nursery</span>
      </footer>
    </div>
  );
}
