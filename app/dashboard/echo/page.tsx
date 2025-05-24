'use client';

import { Send } from 'lucide-react';
import BrainAssistant from '@/components/dashboard/BrainAssistant';

export default function EchoPage() {
  const primaryColor = '#22C55E'; // Verde vivo

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#fff',
      borderRadius: '1rem',
      overflow: 'hidden',
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '300px',
        background: `linear-gradient(135deg, ${primaryColor}, #bbf7d0)`,
        color: '#000',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            width: '100%',
            height: '160px',
            backgroundColor: '#ecfdf5',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: primaryColor,
            fontWeight: 600
          }}>
            [ Echo Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Echo</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Data Analyst</p>

          <button style={{
            marginTop: '2rem',
            padding: '0.6rem 1rem',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '0.75rem',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            + New Chat
          </button>

          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Power-Ups</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '0.75rem', backgroundColor: '#fff', opacity: 0.5 }} />
              <div style={{ width: '36px', height: '36px', borderRadius: '0.75rem', backgroundColor: '#fff', opacity: 0.5 }} />
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>History</h4>
          <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>No chat history</p>
        </div>
      </aside>

      {/* MAIN CHAT PANEL */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        background: '#f0fdf4',
        overflow: 'hidden',
      }}>
        <div style={{ flexShrink: 0 }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
            color: '#2b2b2b'
          }}>
            Hey, it's <span style={{ color: primaryColor }}>Echo</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>Ready to analyze your data?</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              'Analiza mis métricas de conversión',
              'Detecta caídas de rendimiento',
              'Resume los KPIs del mes',
              'Sugiere mejoras basadas en los datos',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>('input[name="brain-input"]');
                  if (input) input.value = suggestion;
                }}
                style={{
                  backgroundColor: '#fff',
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* CHAT IA MODULAR */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          marginTop: '2rem',
        }}>
          <BrainAssistant role="echo" />
        </div>
      </section>
    </div>
  );
}
