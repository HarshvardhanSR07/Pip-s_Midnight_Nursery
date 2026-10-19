import React from 'react';

interface ThemeToggleProps {
  theme: 'midnight' | 'dawn';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle midnight / dawn theme"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: 'var(--glass-border)',
        borderRadius: '50%',
        width: '42px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc',
        cursor: 'pointer',
      }}
    >
      {theme === 'midnight' ? '🌙' : '🌅'}
    </button>
  );
};
