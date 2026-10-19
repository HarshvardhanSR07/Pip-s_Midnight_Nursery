import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { Mascot, type Reaction } from './Mascot';
import { playGreetingChime, speakGreeting, stopSpeaking } from '../utils/audio';

type PipMascotProps = {
  soundEnabled: boolean;
};

export default function PipMascot({ soundEnabled }: PipMascotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const [speechActive, setSpeechActive] = useState(false);
  const [speechText, setSpeechText] = useState('Hey there! You found me. Come a little closer!');
  const [isHovered, setIsHovered] = useState(false);
  const [isBooped, setIsBooped] = useState(false);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    };
  }, []);

  const triggerSpeech = useCallback(
    (text: string, voiceLine?: string) => {
      setSpeechText(text);
      setSpeechActive(true);

      if (soundEnabled) {
        playGreetingChime(true);
      }

      speakGreeting(voiceLine || text, () => {
        // Speech ended
      });

      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
      speechTimerRef.current = window.setTimeout(() => {
        setSpeechActive(false);
      }, 4200);
    },
    [soundEnabled]
  );

  const handleBoop = (reaction: Reaction, count: number) => {
    setIsBooped(true);
    setTimeout(() => setIsBooped(false), 500);

    if (count >= 4 || reaction === 'dizzy') {
      triggerSpeech('Whoa... the stars are spinning! So many boops!', 'Whoa! The stars are spinning!');
    } else if (reaction === 'heart') {
      triggerSpeech('Aww, thank you! Sending you sweet dreams. ♡', 'Aww, thank you! Sending you sweet dreams!');
    } else if (reaction === 'sparkle' || reaction === 'delighted') {
      triggerSpeech('✦ *boop!* Hehe, that tickles! ✦', 'Hehe, that tickles!');
    } else {
      triggerSpeech('Hey there! You found me. Come a little closer!');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBoop('sparkle', 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`interactive-pip-card pip-mascot-card ${isHovered ? 'interactive-pip-card--hovered' : ''} ${
        isBooped ? 'interactive-pip-card--recoil' : ''
      }`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Pip, the Junior Dream Engineer page mascot. Follows your cursor and reacts when booped."
    >
      {/* Ambient starlight glow */}
      <div className="pip-ambient-glow" aria-hidden="true" />

      {/* Floating stardust accents */}
      <span className="pip-float-star pip-float-star--top-left" aria-hidden="true">✦</span>
      <span className="pip-float-star pip-float-star--bottom-right" aria-hidden="true">✧</span>
      <span className="pip-float-star pip-float-star--mid-left" aria-hidden="true">·</span>

      {/* Page Mascot Stage */}
      <div className="pip-mascot-stage" aria-label="Pip looking at your pointer">
        <div className="pip-mascot-wrapper">
          <Mascot
            directions="/mascots/pip-directions.webp"
            reactions="/mascots/pip-reactions.webp"
            size={240}
            label="Pip the skeleton"
            onBoop={handleBoop}
          />
        </div>

        {/* Fluffy stardust cloud pedestal */}
        <div className="pip-mascot-cloud" aria-hidden="true">
          <span className="mascot-cloud-puff mascot-cloud-puff--one" />
          <span className="mascot-cloud-puff mascot-cloud-puff--two" />
          <span className="mascot-cloud-puff mascot-cloud-puff--three" />
        </div>
      </div>

      {/* Spoken Greeting Speech Bubble */}
      {speechActive && (
        <div id="pip-mascot-speech" className="pip-speech-bubble" role="status" aria-live="polite">
          <div className="pip-speech-bubble__badge">
            <Volume2 size={13} aria-hidden="true" />
            <span>Pip</span>
          </div>
          <p className="pip-speech-bubble__text">“{speechText}”</p>
          <span className="pip-speech-bubble__tail" aria-hidden="true" />
        </div>
      )}

      {/* Helper caption */}
      <div className="pip-interactive-caption" aria-hidden="true">
        <Sparkles size={12} />
        <span>{isHovered ? 'click to boop Pip' : 'watches your cursor • click to boop'}</span>
      </div>
    </div>
  );
}
