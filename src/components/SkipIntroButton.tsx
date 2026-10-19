import React from 'react';

interface SkipIntroButtonProps {
  onSkip: () => void;
}

export const SkipIntroButton: React.FC<SkipIntroButtonProps> = ({ onSkip }) => {
  return (
    <button
      onClick={onSkip}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 100,
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        color: '#f8fafc',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      Skip Intro →
    </button>
  );
};
