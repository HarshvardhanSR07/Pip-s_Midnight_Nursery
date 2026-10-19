import React from 'react';
import { SceneSection } from '../components/SceneSection';
import { LullabyLab } from '../projects/LullabyLab';
import { NightlightCollection } from '../projects/NightlightCollection';
import { DreamDeliveryRoutes } from '../projects/DreamDeliveryRoutes';
import { storyScenes } from '../data/story';

export const WorkshopScene: React.FC = () => {
  const scene = storyScenes.find((s) => s.id === 'workshop');

  return (
    <SceneSection id="workshop" title={scene?.title} subtitle={scene?.subtitle}>
      <p style={{ maxWidth: '700px', margin: '0 auto 2.5rem', color: 'var(--color-text-secondary)' }}>
        {scene?.narrative}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <LullabyLab />
        <NightlightCollection />
        <DreamDeliveryRoutes />
      </div>
    </SceneSection>
  );
};
