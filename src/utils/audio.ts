let audioContext: AudioContext | null = null;

/** Create/resume the audio context from a user gesture, never on page load. */
export async function enableAudio(): Promise<void> {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return;
  audioContext ??= new AudioContextClass();
  if (audioContext.state === 'suspended') await audioContext.resume();
}

/** A short synthesized chime for the cloud's gentle bumps and Pip's wave. */
export function playChime(enabled: boolean, frequency = 760): void {
  if (!enabled || !audioContext || audioContext.state !== 'running') return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.28, now + 0.11);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.34);
}

export function playGreetingChime(enabled: boolean): void {
  if (!enabled || !audioContext || audioContext.state !== 'running') return;
  const now = audioContext.currentTime;
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(587.33, now); // D5
  osc1.frequency.exponentialRampToValueAtTime(880, now + 0.16); // A5

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(880, now + 0.08);
  osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.26); // D6

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioContext.destination);

  osc1.start(now);
  osc2.start(now + 0.08);
  osc1.stop(now + 0.32);
  osc2.stop(now + 0.42);
}

/** Speaks the greeting line with browser speech synthesis if available. */
export function speakGreeting(
  text = 'Hey there! You found me. Come a little closer!',
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.35; // friendly, slightly higher pitched cute voice
    utterance.volume = 0.95;

    // Search for friendly English voices
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Samantha') ||
          v.name.includes('Victoria') ||
          v.name.includes('Zira') ||
          v.name.includes('Google') ||
          v.name.includes('Natural'))
    );
    if (friendlyVoice) utterance.voice = friendlyVoice;

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    window.speechSynthesis.speak(utterance);
  } catch {
    onEnd?.();
  }
}

/** Stops any ongoing speech synthesis immediately. */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignored
    }
  }
}
