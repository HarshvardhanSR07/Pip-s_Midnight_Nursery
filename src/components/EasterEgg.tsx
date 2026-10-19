import React, { useState } from 'react';

export const EasterEgg: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.6 }}>
      <button
        onClick={() => setUnlocked(!unlocked)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-muted)',
          fontSize: '0.8rem',
          cursor: 'pointer',
          textDecoration: 'underline dotted',
        }}
      >
        {unlocked ? '✨ Stardust secret revealed!' : 'Tiptoe lightly...'}
      </button>
      {unlocked && (
        <p style={{ marginTop: '0.5rem', color: 'var(--color-accent-gold)', fontSize: '0.9rem' }}>
          Pip tucked a tiny origami crane beneath the nursery eaves. You found it!
        </p>
      )}
    </div>
  );
};
