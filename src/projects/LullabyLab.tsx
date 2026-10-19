import React, { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export const LullabyLab: React.FC = () => {
  const project = projects.find((p) => p.id === 'lullaby-lab')!;
  const [isPlayingNote, setIsPlayingNote] = useState(false);

  const triggerNote = () => {
    setIsPlayingNote(true);
    setTimeout(() => setIsPlayingNote(false), 600);
  };

  return (
    <ProjectCard project={project}>
      <button
        onClick={triggerNote}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          background: isPlayingNote ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.1)',
          color: isPlayingNote ? '#000' : '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        {isPlayingNote ? 'Playing Note... 🎶' : 'Test Synth Tone 🎵'}
      </button>
    </ProjectCard>
  );
};
