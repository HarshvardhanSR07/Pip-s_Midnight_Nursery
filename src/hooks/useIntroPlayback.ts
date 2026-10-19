import { useState, useEffect, useCallback } from 'react';

const INTRO_PLAYED_KEY = 'pip_midnight_intro_viewed';

export function useIntroPlayback() {
  const [hasPlayedBefore, setHasPlayedBefore] = useState<boolean>(true);
  const [isPlayingIntro, setIsPlayingIntro] = useState<boolean>(false);
  const [introPhase, setIntroPhase] = useState<'cloud' | 'greeting' | 'complete'>('cloud');

  useEffect(() => {
    const viewed = sessionStorage.getItem(INTRO_PLAYED_KEY);
    if (!viewed) {
      setHasPlayedBefore(false);
      setIsPlayingIntro(true);
      setIntroPhase('cloud');
    } else {
      setHasPlayedBefore(true);
      setIsPlayingIntro(false);
      setIntroPhase('complete');
    }
  }, []);

  const skipIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_PLAYED_KEY, 'true');
    setIsPlayingIntro(false);
    setIntroPhase('complete');
  }, []);

  const replayIntro = useCallback(() => {
    setIsPlayingIntro(true);
    setIntroPhase('cloud');
  }, []);

  return {
    hasPlayedBefore,
    isPlayingIntro,
    introPhase,
    setIntroPhase,
    skipIntro,
    replayIntro,
  };
}
