'use client';

import { useEffect, useState } from 'react';

export default function AiSettings() {
  const userId = 'demo-user'; // ⬅️ Reemplazar por auth real
  const assistantId = 'sofia'; // Si haces esto dinámico, pásalo como prop

  const [tone, setTone] = useState('friendly');
  const [detailed, setDetailed] = useState(true);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar valores guardados desde la DB
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/assistant-settings?userId=${userId}&assistantId=${assistantId}`);
        if (!res.ok) throw new Error('Failed to fetch settings');

        const data = await res.json();
        setTone(data.tone || 'friendly');
        setDetailed(data.detailed ?? true);
      } catch (err) {
        console.warn('No previous settings found, using defaults.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 💾 Guardar en la DB cada vez que el usuario cambia algo
  useEffect(() => {
    if (!loading) {
      fetch('/api/assistant-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, assistantId, tone, detailed }),
      });
    }
  }, [tone, detailed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Assistant tone</h3>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontWeight: 500,
          }}
        >
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="playful">Playful</option>
          <option value="direct">Direct</option>
        </select>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Response style</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            type="checkbox"
            checked={detailed}
            onChange={(e) => setDetailed(e.target.checked)}
          />
          Give detailed answers
        </label>
      </div>
    </div>
  );
}
