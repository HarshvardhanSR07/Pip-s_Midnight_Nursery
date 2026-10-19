import React, { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

const PALETTES = ['#f6d365', '#fda085', '#a78bfa', '#38bdf8'];

export const NightlightCollection: React.FC = () => {
  const project = projects.find((p) => p.id === 'nightlight-collection')!;
  const [currentColor, setCurrentColor] = useState(PALETTES[0]);

  return (
    <ProjectCard project={project}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Color Preset:</span>
        {PALETTES.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: color,
              border: currentColor === color ? '2px solid white' : 'none',
              cursor: 'pointer',
              boxShadow: currentColor === color ? `0 0 10px ${color}` : 'none',
            }}
          />
        ))}
      </div>
    </ProjectCard>
  );
};
