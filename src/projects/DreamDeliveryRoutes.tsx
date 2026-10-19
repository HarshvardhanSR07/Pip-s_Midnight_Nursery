import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export const DreamDeliveryRoutes: React.FC = () => {
  const project = projects.find((p) => p.id === 'dream-delivery-routes')!;

  return (
    <ProjectCard project={project}>
      <div
        style={{
          height: '60px',
          borderRadius: '8px',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          border: '1px dashed rgba(255,255,255,0.15)',
          padding: '0 1rem',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nursery ➔</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-gold)' }}>Attic ➔</span>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Chimney 3 ➔</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-violet)' }}>Cradle</span>
      </div>
    </ProjectCard>
  );
};
