import React, { useState } from 'react';
import { SceneSection } from '../components/SceneSection';
import { DreamBubble } from '../components/DreamBubble';
import { storyScenes } from '../data/story';

export const CatchScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'catch');
  const [caughtCount, setCaughtCount] = useState(0);

  return (
    <SceneSection id="catch" title={scene?.title} subtitle={scene?.subtitle}>
      <p style={{ maxWidth: '650px', margin: '0 auto 1.5rem', color: 'var(--color-text-secondary)' }}>
        {scene?.narrative}
      </p>
      <div style={{ marginBottom: '1rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>
        Dreams caught: {caughtCount} / 3
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <DreamBubble size={70} label="Catch me!" onClick={() => setCaughtCount((c) => Math.min(3, c + 1))} />
        <DreamBubble size={65} label="Catch me!" onClick={() => setCaughtCount((c) => Math.min(3, c + 1))} />
        <DreamBubble size={80} label="Catch me!" onClick={() => setCaughtCount((c) => Math.min(3, c + 1))} />
      </div>
    </SceneSection>
  );
};
