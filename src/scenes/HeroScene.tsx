import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { DreamBubble } from '../components/DreamBubble';
import { storyScenes } from '../data/story';

export const HeroScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'hero');

  return (
    <SceneSection id="hero" title={scene?.title} subtitle={scene?.subtitle}>
      <p style={{ maxWidth: '650px', margin: '0 auto 2rem', color: 'var(--color-text-secondary)' }}>
        {scene?.narrative}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <DreamBubble size={70} label="Stars" glowColor="rgba(246, 211, 101, 0.4)" />
        <DreamBubble size={90} label="Pip" glowColor="rgba(167, 139, 250, 0.4)" />
        <DreamBubble size={65} label="Moon" glowColor="rgba(56, 189, 248, 0.4)" />
      </div>
    </SceneSection>
  );
};
