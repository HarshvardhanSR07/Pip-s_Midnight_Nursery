import { useCallback, useEffect, useRef, useState } from 'react';
import { SkipForward, Volume2 } from 'lucide-react';
import AudioToggle from './AudioToggle';
import Cloud from './Cloud';

type IntroSequenceProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onComplete: () => void;
};

// Use the clean dark intro from antigravity_video_pack (assets/scene_02_clean.mp4)
const VIDEO_SRC = '/assets/intro/scene_02_clean.mp4';
const POSTER_SRC = '/assets/intro/intro-dark-poster.jpg';
const INTRO_KEY = 'pip-midnight-intro-seen-v2';

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
    // Private browsing safe
  }
}

export default function IntroSequence({ soundEnabled, onToggleSound, onComplete }: IntroSequenceProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    const v = videoRef.current;
    if (v) {
      if (!soundEnabled) {
        v.muted = true;
        setIsVideoMuted(true);
      } else {
        // Attempt to unmute if user enabled sound
        v.muted = false;
        v.volume = 1.0;
        setIsVideoMuted(false);
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

  // Safe autoplay on mount
  useEffect(() => {
    if (useFallback) return;

    const video = videoRef.current;
    if (video) {
      // Start muted to satisfy browser autoplay requirements
      video.muted = true;
      setIsVideoMuted(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // If sound was preferred, we will unmute on first user interaction
          })
          .catch(() => {
            // If autoplay failed completely, try muted retry
            video.muted = true;
            video.play().catch(() => setUseFallback(true));
          });
      }
    }

    // Safety completion timer at ~20.5s
    const safetyTimer = window.setTimeout(() => {
      complete();
    }, 20_500);

    // Gesture unmuting
    const handleGesture = () => {
      const v = videoRef.current;
      if (v && soundEnabledRef.current && v.muted) {
        v.muted = false;
        v.volume = 1.0;
        setIsVideoMuted(false);
      }
    };

    window.addEventListener('click', handleGesture);
    window.addEventListener('pointerdown', handleGesture);
    window.addEventListener('keydown', handleGesture);
    window.addEventListener('touchstart', handleGesture);

    return () => {
      window.clearTimeout(safetyTimer);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, [useFallback, complete]);

  // Fallback timer sequence if video fails or reduced motion
  useEffect(() => {
    if (!useFallback) return;

    const fadeTimer = window.setTimeout(() => setIsFading(true), 4_500);
    const completeTimer = window.setTimeout(complete, 5_200);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [useFallback, complete]);

  const toggleVideoAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.volume = 1.0;
      setIsVideoMuted(false);
      if (!soundEnabled) onToggleSound();
    } else {
      v.muted = true;
      setIsVideoMuted(true);
    }
  };

  return (
    <div
      className={`intro-overlay ${isFading ? 'intro-overlay--fading' : ''} ${
        useFallback ? 'intro-overlay--fallback' : 'intro-overlay--video'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Pip's introduction"
    >
      <AudioToggle enabled={soundEnabled && !isVideoMuted} onToggle={toggleVideoAudio} />
      <button className="skip-intro" type="button" onClick={complete}>
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
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onTimeUpdate={handleTimeUpdate}
            onEnded={complete}
            onError={() => setUseFallback(true)}
          />

          {/* Mask guaranteeing no watermark at bottom right */}
          <div className="intro-video-corner-mask" aria-hidden="true" />



          {/* Unmute prompt banner if sound is enabled globally but video is muted by browser policy */}
          {isVideoMuted && soundEnabled && currentTime > 1.5 && currentTime < 12 && (
            <button
              type="button"
              className="sound-unmute-hint"
              onClick={toggleVideoAudio}
              aria-label="Unmute intro audio"
            >
              <Volume2 size={14} aria-hidden="true" />
              <span>Tap anywhere for sound</span>
            </button>
          )}

          <p className="intro-sr-only" aria-live="polite">
            {currentTime < 2
              ? 'A midnight darkness rests over the nursery.'
              : currentTime < 9
              ? 'A fluffy cloud enters and playfully bounces across the sky with stardust trails.'
              : currentTime < 18
              ? 'Pip the baby skeleton emerges from the cloud in a starry nightcap and greets you.'
              : 'Entering the Midnight Nursery.'}
          </p>
        </>
      ) : (
        <div className="intro-fallback-stage">
          <div className="intro-stars" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={`intro-star intro-star--${i + 1}`}>✦</span>
            ))}
          </div>
          <div className="intro-fallback-content">
            <Cloud />
            <h2>The Midnight Nursery</h2>
            <p>“I build the dreams you fall asleep inside.”</p>
            <button className="story-action" type="button" onClick={complete}>
              Enter nursery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
