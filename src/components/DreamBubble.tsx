import React from 'react';

interface DreamBubbleProps {
  size?: number;
  label?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const DreamBubble: React.FC<DreamBubbleProps> = ({
  size = 80,
  label,
  glowColor = 'rgba(167, 139, 250, 0.4)',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="animate-float"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(167,139,250,0.2) 60%, rgba(56,189,248,0.3) 100%)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: `0 8px 32px 0 ${glowColor}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        backdropFilter: 'blur(4px)',
        margin: '1rem',
        userSelect: 'none',
      }}
    >
      {label && <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{label}</span>}
    </div>
  );
};
