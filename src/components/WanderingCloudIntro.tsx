import React, { useEffect, useState } from 'react';

interface WanderingCloudIntroProps {
  onComplete: () => void;
}

export const WanderingCloudIntro: React.FC<WanderingCloudIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* 0–10s: black hold, wandering cloud path, edge bumps */}
      <div
        className="animate-cloud-drift"
        style={{
          width: '160px',
          height: '60px',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(200,220,255,0.4) 70%, transparent 100%)',
          borderRadius: '50px',
          filter: 'blur(8px)',
        }}
      />
      <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
        A wandering midnight cloud drifts across the sky...
      </p>
      <div style={{ width: '200px', height: '2px', background: '#1e293b', marginTop: '1rem', borderRadius: '1px' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f6d365, #fda085)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  );
};
