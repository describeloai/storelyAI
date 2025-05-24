'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function TariqPage() {
  const [messages, setMessages] = useState([
    { from: 'tariq', text: 'Hello! I’m Tariq. Ask me anything related to customer support or user experience.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const primaryColor = '#FFD600'; // Amarillo brillante

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    setMessages(prev => [
      ...prev,
      { from: 'user', text: value },
      { from: 'tariq', text: 'Let me look into that for you...' }
    ]);
    if (inputRef.current) inputRef.current.value = '';
  };

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
        background: `linear-gradient(135deg, ${primaryColor}, #fff799)`,
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
            backgroundColor: '#fffde7',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: primaryColor,
            fontWeight: 600
          }}>
            [ Tariq Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Tariq</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Customer Support</p>

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
        background: '#fffdf2',
        overflow: 'hidden',
      }}>
        <div style={{ flexShrink: 0 }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
            color: '#2b2b2b'
          }}>
            Hey, it's <span style={{ color: primaryColor }}>Tariq</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>How can I help with your customers?</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              'Responde una queja de un cliente',
              'Sugiere una respuesta para una devolución',
              'Consejos para mejorar el soporte',
              'Detecta patrones de tickets repetitivos',
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

        {/* MENSAJES CON SCROLL */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            marginTop: '2rem',
            paddingRight: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? primaryColor : '#fff',
              color: msg.from === 'user' ? '#000' : '#333',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              maxWidth: '70%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1rem 0 1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: '#fffdf2',
            borderTop: '1px solid #e4e4e4',
          }}
        >
          <input
            ref={inputRef}
            name="msg"
            placeholder="Type your question..."
            style={{
              flex: 1,
              padding: '1rem 1.25rem',
              borderRadius: '1rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              backgroundColor: '#fff',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: primaryColor,
              color: '#000',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
