import React from 'react';
import type { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  children?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, children }) => {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        borderRadius: '16px',
        padding: '2rem',
        border: 'var(--glass-border)',
        boxShadow: 'var(--glass-glow)',
        textAlign: 'left',
        margin: '1rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '2rem' }}>{project.icon}</span>
        <div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>{project.title}</h3>
          <p style={{ color: 'var(--color-accent-gold)', fontSize: '0.9rem' }}>{project.tagline}</p>
        </div>
      </div>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        {project.description}
      </p>
      {children}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
