import { useCallback, useEffect, useRef, useState } from 'react';
import { SkipForward } from 'lucide-react';
import AudioToggle from './AudioToggle';
import Cloud from './Cloud';
import PipCharacter from './PipCharacter';
import { playChime } from '../utils/audio';

type IntroSequenceProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onComplete: () => void;
};

type IntroVariant = 'dark' | 'nursery';
const INTRO_VARIANT: IntroVariant = 'dark';

const VIDEO_SRC = `/assets/intro/intro-${INTRO_VARIANT}.mp4`;
const POSTER_SRC = `/assets/intro/intro-${INTRO_VARIANT}-poster.jpg`;

const INTRO_KEY = 'pip-midnight-intro-seen';

export function shouldSkipIntroForReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasSeenIntroThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_KEY, 'yes');
  } catch {
    // Some private browsing modes can block sessionStorage; the page still works.
  }
}

export default function IntroSequence({ soundEnabled, onToggleSound, onComplete }: IntroSequenceProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [needsUserTapForSound, setNeedsUserTapForSound] = useState(false);

  // Fallback states for CSS/SVG animation path
  const [fallbackPhase, setFallbackPhase] = useState<'wandering-cloud' | 'pip-greeting' | 'handoff'>('wandering-cloud');
  const [fallbackGreetingVisible, setFallbackGreetingVisible] = useState(false);
  const [fallbackWaving, setFallbackWaving] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    const v = videoRef.current;
    if (v) {
      v.muted = !soundEnabled;
      if (soundEnabled) {
        v.volume = 1.0;
        setNeedsUserTapForSound(false);
      }
    }
  }, [soundEnabled]);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    markIntroSeen();
    onComplete();
  }, [onComplete]);

  // Video time update handler
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    setCurrentTime(t);

    // Fade out when currentTime >= 19.2s
    if (t >= 19.2 && !isFading) {
      setIsFading(true);
    }
  };

  // Autoplay attempt on mount & gesture unmuting
  useEffect(() => {
    if (useFallback) return;

    const video = videoRef.current;
    if (video) {
      video.muted = !soundEnabledRef.current;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((_err) => {
          // If browser Autoplay policy blocks unmuted audio on load, start muted and listen for user gesture
          if (!video.muted) {
            video.muted = true;
            setNeedsUserTapForSound(true);
            video.play().catch(() => setUseFallback(true));
          } else {
            setUseFallback(true);
          }
        });
      }
    }

    // Safety completion timer at ~20.5s
    const safetyTimer = window.setTimeout(() => {
      complete();
    }, 20_500);

    // Check for stalled playback (>6s without forward progress)
    const stallInterval = window.setInterval(() => {
      const v = videoRef.current;
      if (!v) return;
      if (!v.paused && !v.ended) {
        if (v.currentTime > 0.5 && Math.abs(v.currentTime - lastTimeRef.current) < 0.1) {
          setUseFallback(true);
        } else {
          lastTimeRef.current = v.currentTime;
        }
      }
    }, 6_000);

    // Unmute on first user gesture if sound is enabled
    const handleGesture = () => {
      const v = videoRef.current;
      if (soundEnabledRef.current && v) {
        v.muted = false;
        v.volume = 1.0;
        setNeedsUserTapForSound(false);
      }
    };
    window.addEventListener('click', handleGesture);
    window.addEventListener('pointerdown', handleGesture);
    window.addEventListener('keydown', handleGesture);
    window.addEventListener('touchstart', handleGesture);

    return () => {
      window.clearTimeout(safetyTimer);
      window.clearInterval(stallInterval);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, [useFallback, complete]);

  // Fallback timer sequence (only runs if useFallback becomes true)
  useEffect(() => {
    if (!useFallback) return;

    const greetingTimer = window.setTimeout(() => {
      setFallbackPhase('pip-greeting');
      playChime(soundEnabledRef.current, 660);
    }, 10_000);
    const subtitleTimer = window.setTimeout(() => setFallbackGreetingVisible(true), 15_000);
    const waveTimer = window.setTimeout(() => {
      setFallbackWaving(true);
      playChime(soundEnabledRef.current, 880);
    }, 15_150);
    const handoffTimer = window.setTimeout(() => setFallbackPhase('handoff'), 18_000);
    const fadeTimer = window.setTimeout(() => setIsFading(true), 19_200);
    const completeTimer = window.setTimeout(complete, 20_000);

    return () => {
      window.clearTimeout(greetingTimer);
      window.clearTimeout(subtitleTimer);
      window.clearTimeout(waveTimer);
      window.clearTimeout(handoffTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [useFallback, complete]);

  const skip = () => {
    complete();
  };

  return (
    <div
      className={`intro-overlay ${isFading ? 'intro-overlay--fading' : ''} ${
        useFallback ? `intro-overlay--${fallbackPhase}` : 'intro-overlay--video'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Pip's introduction"
    >
      <AudioToggle enabled={soundEnabled} onToggle={onToggleSound} />
      <button className="skip-intro" type="button" onClick={skip}>
        Skip intro <SkipForward size={16} aria-hidden="true" />
      </button>

      {!useFallback ? (
        <>
          <video
            ref={videoRef}
            className="intro-video"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted={!soundEnabled}
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onTimeUpdate={handleTimeUpdate}
            onEnded={complete}
            onError={() => setUseFallback(true)}
          />

          {/* Pure black corner mask preventing any watermark or logo from ever displaying in the bottom right corner */}
          <div className="intro-video-corner-mask" aria-hidden="true" />

          {/* Subtitle during Pip's greeting (13.5s to 18.5s) */}
          {currentTime >= 13.5 && currentTime < 18.5 && (
            <div className="intro-video-subtitle" role="status">
              “Halooo, I Pip”
            </div>
          )}

          {/* Sound enable prompt if browser autoplay initially blocked unmuted sound */}
          {needsUserTapForSound && soundEnabled && currentTime < 12 && (
            <div className="sound-unmute-hint" aria-hidden="true">
              <span>Click anywhere to enable sound ♫</span>
            </div>
          )}

          <p className="intro-sr-only" aria-live="polite">
            {currentTime < 10
              ? 'A little cloud is finding its way across the midnight sky.'
              : currentTime < 18
              ? 'Pip wakes up and greets you: Halooo, I Pip.'
              : 'Pip leads you into the Midnight Nursery.'}
          </p>
        </>
      ) : (
        <>
          <div className="intro-stars" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className={`intro-star intro-star--${i + 1}`}>✦</span>
            ))}
            <span className="impact-burst impact-burst--top">✦</span>
            <span className="impact-burst impact-burst--left">✦</span>
            <span className="impact-burst impact-burst--bottom">✦</span>
          </div>

          <div className="intro-stage" aria-hidden="false">
            <div
              className={`cloud-track ${
                fallbackPhase === 'wandering-cloud' ? 'cloud-track--wandering' : 'cloud-track--resting'
              }`}
            >
              <Cloud />
              <div className="cloud-dust cloud-dust--one" />
              <div className="cloud-dust cloud-dust--two" />
              <div className="cloud-dust cloud-dust--three" />
            </div>

            {fallbackPhase !== 'wandering-cloud' && (
              <div className={`pip-emergence${fallbackPhase === 'handoff' ? ' pip-emergence--handoff' : ''}`}>
                <PipCharacter waving={fallbackWaving} />
                {fallbackGreetingVisible && fallbackPhase !== 'handoff' && (
                  <div className="pip-greeting" role="status">“Halooo, I Pip”</div>
                )}
              </div>
            )}
          </div>

          <p className="intro-sr-only" aria-live="polite">
            {fallbackPhase === 'wandering-cloud'
              ? 'A little cloud is finding its way.'
              : fallbackPhase === 'pip-greeting'
              ? 'Pip wakes up and greets you: Halooo, I Pip.'
              : 'Pip leads you into the Midnight Nursery.'}
          </p>
        </>
      )}
    </div>
  );
}
