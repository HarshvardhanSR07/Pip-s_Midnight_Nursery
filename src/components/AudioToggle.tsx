import { Volume2, VolumeX } from 'lucide-react';

type AudioToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export default function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <button
      className="utility-button audio-toggle"
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
      <span>{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
