'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function CiroPage() {
  const [messages, setMessages] = useState([
    { from: 'ciro', text: 'Hi! I’m Ciro, your SEO assistant. Ask me anything about optimization, keywords, or site performance.' },
  ]);

  const primaryColor = '#1E40AF'; // Azul oscuro (inspirado en la card)

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
      background: '#fff',
      borderRadius: '1rem',
      overflow: 'hidden',
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '300px',
        background: `linear-gradient(135deg, ${primaryColor}, #3b82f6)`,
        color: '#fff',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            width: '100%',
            height: '160px',
            backgroundColor: '#e0ecff',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: primaryColor,
            fontWeight: 600
          }}>
            [ Ciro Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Ciro</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>SEO Assistant</p>

          <button style={{
            marginTop: '2rem',
            padding: '0.6rem 1rem',
            backgroundColor: '#fff',
            color: primaryColor,
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
        background: '#f0f6ff',
      }}>
        <div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
            color: '#2b2b2b'
          }}>
            Hey, it's <span style={{ color: primaryColor }}>Ciro</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>How can I help improve your SEO?</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              'Haz una auditoría SEO rápida',
              'Sugiere mejoras de velocidad web',
              'Genera metadescripciones atractivas',
              'Analiza mis palabras clave actuales',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMessages(prev => [...prev, { from: 'user', text: suggestion }]);
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

        <div style={{
          flex: 1,
          marginTop: '2rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingBottom: '2rem'
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? primaryColor : '#fff',
              color: msg.from === 'user' ? '#fff' : '#333',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              maxWidth: '70%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.msg as HTMLInputElement;
            const value = input.value.trim();
            if (!value) return;
            setMessages(prev => [...prev, { from: 'user', text: value }, { from: 'ciro', text: 'Let me check that for SEO insights...' }]);
            input.value = '';
          }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: 'auto',
            padding: '1rem 0',
            alignItems: 'center',
          }}
        >
          <input
            name="msg"
            placeholder="Type your question..."
            style={{
              flex: 1,
              padding: '1rem 1.25rem',
              borderRadius: '1rem',
              border: '1px solid #ddd',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: primaryColor,
              color: '#fff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
