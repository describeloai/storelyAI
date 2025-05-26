'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { detectCiroIntent } from '@/lib/ai/intent/ciro';

export default function CiroPage() {
  const [messages, setMessages] = useState([
    { from: 'ciro', text: 'Hi! I’m Ciro, your data advisor. Ask me anything about pricing, inventory or campaign performance.' },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const primaryColor = '#1E40AF';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    const userMessage = { from: 'user', text: value };

    const prevHistory = messages
      .slice(-4)
      .filter(m => m.from === 'user' || m.from === 'ciro')
      .map(m => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    const intent = detectCiroIntent(value, true); // ✅ CORRECTO

    setMessages(prev => [...prev, userMessage]);
    if (inputRef.current) inputRef.current.value = '';
    setLoading(true);

    try {
      const res = await fetch('/api/ciro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: value,
          userId: 'demo-user',
          history: prevHistory,
          model: intent.model,
          tool: intent.tool,
        }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'ciro', text: data.output }]);
      } else {
        setMessages(prev => [...prev, { from: 'ciro', text: 'Ups, no pude procesarlo.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { from: 'ciro', text: 'Error al contactar con la IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#fff',
      borderRadius: '1rem',
      overflow: 'hidden',
    }}>
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
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Data Advisor</p>

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

      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        background: '#f0f6ff',
        overflow: 'hidden',
      }}>
        <div style={{ flexShrink: 0 }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
            color: '#2b2b2b'
          }}>
            Hey, it's <span style={{ color: primaryColor }}>Ciro</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>How can I help with your numbers?</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              'Analiza mis márgenes de beneficio',
              'Haz una predicción de ventas',
              'Detecta campañas poco rentables',
              'Sugiere un precio dinámico',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = suggestion;
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }
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

        <div ref={scrollRef} style={{
          flex: 1,
          overflowY: 'auto',
          marginTop: '2rem',
          paddingRight: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
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

          {loading && (
            <div style={{
              alignSelf: 'flex-start',
              background: '#fff',
              color: '#333',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              maxWidth: '50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              display: 'flex',
              gap: '0.3rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#333',
                animation: 'bounce 1s infinite alternate',
              }} />
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#333',
                animation: 'bounce 1s infinite alternate 0.2s',
              }} />
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#333',
                animation: 'bounce 1s infinite alternate 0.4s',
              }} />
              <style>
                {`@keyframes bounce {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-5px); }
                }`}
              </style>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1rem 0 1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: '#f0f6ff',
            borderTop: '1px solid #e4e4e4',
          }}
        >
          <input
            ref={inputRef}
            name="msg"
            placeholder="Type your question..."
            disabled={loading}
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
            disabled={loading}
            style={{
              backgroundColor: primaryColor,
              color: '#fff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
