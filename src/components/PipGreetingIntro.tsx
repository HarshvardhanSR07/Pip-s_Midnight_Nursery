import React, { useEffect, useState } from 'react';

interface PipGreetingIntroProps {
  onComplete: () => void;
}

export const PipGreetingIntro: React.FC<PipGreetingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'emerge' | 'glance' | 'wave'>('emerge');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('glance'), 3000);
    const t2 = setTimeout(() => setPhase('wave'), 6500);
    const t3 = setTimeout(() => onComplete(), 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0b0f19',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* 10–20s: Pip emergence, glance, wave, subtitle */}
      <div
        className="animate-float"
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f6d365, #e08b3c)',
          boxShadow: '0 0 40px rgba(246, 211, 101, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
        }}
      >
        {phase === 'emerge' && '✨'}
        {phase === 'glance' && '👀'}
        {phase === 'wave' && '👋'}
      </div>

      <h2 style={{ marginTop: '2rem', color: '#f8fafc', fontWeight: 500 }}>
        {phase === 'emerge' && 'Pip awakens softly...'}
        {phase === 'glance' && 'Looking around the midnight quiet...'}
        {phase === 'wave' && '“Welcome to the Midnight Nursery!”'}
      </h2>

      <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        Chapter 1: The Starlight Awakens
      </p>
    </div>
  );
};
