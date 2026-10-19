import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { storyScenes } from '../data/story';

export const GhostWindowScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'ghost-window');

  return (
    <SceneSection id="ghost-window" title={scene?.title} subtitle={scene?.subtitle}>
      <div
        style={{
          border: '1px dashed var(--color-accent-violet)',
          borderRadius: '20px',
          padding: '2.5rem',
          background: 'rgba(167, 139, 250, 0.05)',
          maxWidth: '650px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🪟 👻 👋</div>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          {scene?.narrative}
        </p>
      </div>
    </SceneSection>
  );
};
