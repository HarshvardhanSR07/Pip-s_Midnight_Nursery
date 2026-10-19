import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { playGreetingChime, speakGreeting, stopSpeaking } from '../utils/audio';

type InteractivePipCharacterProps = {
  soundEnabled: boolean;
};

export default function InteractivePipCharacter({ soundEnabled }: InteractivePipCharacterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const blinkTimerRef = useRef<number | null>(null);
  const hasGreetedThisEntryRef = useRef(false);

  // Motion state
  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0);
  const currentYawRef = useRef(0);
  const currentPitchRef = useRef(0);

  // Visual states
  const [isHovered, setIsHovered] = useState(false);
  const [isRecoiling, setIsRecoiling] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Idle blink cycle every ~4.5s
  useEffect(() => {
    if (reducedMotion) return;
    const scheduleNextBlink = () => {
      const delay = 3500 + Math.random() * 2500;
      blinkTimerRef.current = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
        scheduleNextBlink();
      }, delay);
    };
    scheduleNextBlink();
    return () => {
      if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
    };
  }, [reducedMotion]);

  // Buttery-smooth lerp animation loop for 3D cursor tracking
  useEffect(() => {
    if (reducedMotion) return;

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      // Smooth lerp (0.1 damping factor for natural, responsive head movement)
      currentYawRef.current += (targetYawRef.current - currentYawRef.current) * 0.1;
      currentPitchRef.current += (targetPitchRef.current - currentPitchRef.current) * 0.1;

      const yaw = currentYawRef.current;
      const pitch = currentPitchRef.current;
      const roll = yaw * 0.22;

      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--pip-yaw', `${yaw.toFixed(2)}deg`);
        container.style.setProperty('--pip-pitch', `${pitch.toFixed(2)}deg`);
        container.style.setProperty('--pip-roll', `${roll.toFixed(2)}deg`);
        container.style.setProperty('--pip-eye-x', `${(yaw * 0.6).toFixed(2)}px`);
        container.style.setProperty('--pip-eye-y', `${(-pitch * 0.45).toFixed(2)}px`);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [reducedMotion]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    };
  }, []);

  // Trigger playful recoil and greeting sentence
  const triggerGreeting = useCallback(() => {
    setIsRecoiling(true);
    setIsWaving(true);
    setSpeechActive(true);

    // Play synthesized friendly voice and magical nursery chime
    if (soundEnabled) {
      playGreetingChime(true);
    }
    speakGreeting('Hey there! You found me. Come a little closer!', () => {
      // Keep waving slightly after speech completes
      setTimeout(() => setIsWaving(false), 600);
    });

    // Auto-dismiss bubble after 4.2s
    if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    speechTimerRef.current = window.setTimeout(() => {
      setSpeechActive(false);
      setIsWaving(false);
    }, 4200);
  }, [soundEnabled]);

  // Pointer Move: map client coordinates to clamped yaw/pitch
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    // Restrained yaw (-16deg to +16deg) and pitch (-12deg to +12deg) to prevent unnatural twisting
    targetYawRef.current = nx * 16;
    targetPitchRef.current = -ny * 12;
  };

  // Pointer Enter: trigger recoil & greeting ONCE per hover entry
  const handlePointerEnter = () => {
    setIsHovered(true);
    if (!hasGreetedThisEntryRef.current) {
      hasGreetedThisEntryRef.current = true;
      triggerGreeting();
    }
  };

  // Pointer Leave: smoothly restore neutral pose and settle
  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsRecoiling(false);
    targetYawRef.current = 0;
    targetPitchRef.current = 0;
    hasGreetedThisEntryRef.current = false;
  };

  // Mobile / Click tap toggle
  const handleClick = () => {
    if (!speechActive) {
      triggerGreeting();
    } else {
      setSpeechActive(false);
      setIsWaving(false);
      stopSpeaking();
    }
  };

  // Keyboard accessibility: Enter or Space triggers greeting
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerGreeting();
    }
  };

  // Select active image pose based on state
  const currentImage = isWaving
    ? '/assets/pip/pip-interactive-wave.jpg'
    : isBlinking && !isHovered
    ? '/assets/pip/pip-interactive-blink.jpg'
    : '/assets/pip/pip-interactive-idle.jpg';

  return (
    <div
      ref={containerRef}
      className={`interactive-pip-card ${isHovered ? 'interactive-pip-card--hovered' : ''} ${
        isRecoiling ? 'interactive-pip-card--recoil' : ''
      } ${reducedMotion ? 'interactive-pip-card--reduced-motion' : ''}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Pip, the Junior Dream Engineer. Tap or hover to interact."
      aria-describedby="pip-interactive-speech"
    >
      {/* Ambient background glow that shifts with parallax */}
      <div className="pip-ambient-glow" aria-hidden="true" />

      {/* Floating stardust accents */}
      <span className="pip-float-star pip-float-star--top-left" aria-hidden="true">✦</span>
      <span className="pip-float-star pip-float-star--bottom-right" aria-hidden="true">✧</span>
      <span className="pip-float-star pip-float-star--mid-left" aria-hidden="true">·</span>

      {/* 3D Character Stage */}
      <div className="pip-3d-stage">
        {/* Recoil Spring Anchor */}
        <div className="pip-recoil-layer">
          {/* 3D Tilt Layer (Head and Body) */}
          <div className="pip-tilt-layer">
            {/* Soft-edge Character Render */}
            <img
              src={currentImage}
              alt="Pip, a cute baby skeleton in a lavender nightcap resting on a fluffy cloud"
              className="pip-character-render"
              draggable={false}
            />

            {/* Volumetric Glowing Eye Lights (Parallax Z-Depth inside skull sockets) */}
            <div className="pip-eye-glows" aria-hidden="true">
              <span className="pip-eye-glow pip-eye-glow--left" />
              <span className="pip-eye-glow pip-eye-glow--right" />
            </div>
          </div>
        </div>
      </div>

      {/* Spoken Greeting Speech Bubble */}
      {speechActive && (
        <div id="pip-interactive-speech" className="pip-speech-bubble" role="status" aria-live="polite">
          <div className="pip-speech-bubble__badge">
            <Volume2 size={13} aria-hidden="true" />
            <span>Pip</span>
          </div>
          <p className="pip-speech-bubble__text">
            “Hey there! You found me. Come a little closer!”
          </p>
          <span className="pip-speech-bubble__tail" aria-hidden="true" />
        </div>
      )}

      {/* Interactive Helper Caption */}
      <div className="pip-interactive-caption" aria-hidden="true">
        <Sparkles size={12} />
        <span>{isHovered ? 'watching your pointer' : 'hover or tap me'}</span>
      </div>
    </div>
  );
}
