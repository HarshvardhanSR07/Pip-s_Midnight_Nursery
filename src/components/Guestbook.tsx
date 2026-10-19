import React, { useState } from 'react';

export const Guestbook: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([
    'Goodnight from Tokyo! 🗼',
    'Sweet dreams from Vancouver 🌲',
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setNotes((prev) => [...prev, inputVal.trim()]);
    setInputVal('');
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: 'var(--color-bg-card)',
        borderRadius: '12px',
        border: 'var(--glass-border)',
      }}
    >
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-accent-violet)' }}>Midnight Guestbook</h4>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Leave a whisper for Pip..."
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--color-accent-gold)',
            color: '#000',
            fontWeight: 600,
            border: 'none',
          }}
        >
          Send
        </button>
      </form>
      <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {notes.map((note, index) => (
          <li key={index} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            ✦ {note}
          </li>
        ))}
      </ul>
    </div>
  );
};
