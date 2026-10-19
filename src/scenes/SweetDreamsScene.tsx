import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { storyScenes } from '../data/story';

export const SweetDreamsScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'sweet-dreams');

  return (
    <SceneSection id="sweet-dreams" title={scene?.title} subtitle={scene?.subtitle}>
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(23, 32, 54, 0.8), rgba(11, 15, 25, 0.95))',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '700px',
          margin: '0 auto',
          border: 'var(--glass-border)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛌 🌙 💤</div>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
          {scene?.narrative}
        </p>
      </div>
    </SceneSection>
  );
};
