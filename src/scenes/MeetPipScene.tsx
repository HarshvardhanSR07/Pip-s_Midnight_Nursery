import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { storyScenes } from '../data/story';

export const MeetPipScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'meet-pip');

  return (
    <SceneSection id="meet-pip" title={scene?.title} subtitle={scene?.subtitle}>
      <div
        style={{
          background: 'var(--color-bg-card)',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '700px',
          margin: '0 auto',
          border: 'var(--glass-border)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦉✨</div>
        <p style={{ lineHeight: '1.8', color: 'var(--color-text-secondary)', fontSize: '1.15rem' }}>
          {scene?.narrative}
        </p>
      </div>
    </SceneSection>
  );
};
