import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { storyScenes } from '../data/story';

export const RooftopChaseScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'rooftop-chase');

  return (
    <SceneSection id="rooftop-chase" title={scene?.title} subtitle={scene?.subtitle}>
      <div
        style={{
          border: 'var(--glass-border)',
          borderRadius: '20px',
          padding: '2.5rem',
          background: 'var(--color-bg-card)',
          maxWidth: '750px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐈⬛ 🏰 💨</div>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          {scene?.narrative}
        </p>
      </div>
    </SceneSection>
  );
};
