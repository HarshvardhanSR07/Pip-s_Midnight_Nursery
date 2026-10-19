export default function Cloud() {
  return (
    <svg className="cloud-art" viewBox="0 0 220 140" role="img" aria-label="A small, fluffy cloud">
      <defs>
        <linearGradient id="cloudFill" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#fffaf4" />
          <stop offset="100%" stopColor="#d9d4f5" />
        </linearGradient>
        <filter id="cloudShadow" x="-20%" y="-30%" width="140%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#8a7db7" floodOpacity="0.28" />
        </filter>
      </defs>
      <path
        d="M45 111C23 111 9 96 9 78c0-18 14-32 32-32 4 0 8 1 11 2C58 28 76 15 98 15c23 0 42 15 47 36 5-3 11-5 17-5 20 0 36 15 36 34 0 18-14 31-33 31H45Z"
        fill="url(#cloudFill)"
        stroke="#fffaf7"
        strokeWidth="3"
        filter="url(#cloudShadow)"
      />
      <path d="M35 83c9-13 20-14 30-11M84 43c10-9 22-9 33-3M145 68c10-8 20-7 29 0" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".74" />
      {/* Intentionally faceless: do not add eyes, a mouth, or a smile. */}
    </svg>
  );
}
