import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { DreamBubble } from '../components/DreamBubble';
import { storyScenes } from '../data/story';

export const SpillScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'spill');

  return (
    <SceneSection id="spill" title={scene?.title} subtitle={scene?.subtitle}>
      <p style={{ maxWidth: '650px', margin: '0 auto 2rem', color: 'var(--color-text-secondary)' }}>
        {scene?.narrative}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <DreamBubble size={55} label="🌟" />
        <DreamBubble size={75} label="💫" />
        <DreamBubble size={60} label="✨" />
        <DreamBubble size={80} label="🌙" />
      </div>
    </SceneSection>
  );
};
