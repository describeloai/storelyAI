// TariqPage refinado como Sofía y Thalia
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';

export default function TariqPage() {
  const [messages, setMessages] = useState([
    { from: 'tariq', text: 'Hello! **I’m Tariq.** Ask me anything related to content, campaigns or ad copy.' },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);
  const primaryColor = '#FFD600';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    const userMessage = { from: 'user', text: value };
    setMessages(prev => [...prev, userMessage]);
    if (inputRef.current) inputRef.current.value = '';

    const prevHistory = messages.slice(-4).filter(m => m.from === 'user' || m.from === 'tariq')
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    setLoading(true);
    try {
      const res = await fetch('/api/tariq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, userId: 'demo-user', history: prevHistory }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'tariq', text: data.output }]);

        if (value.length > 8) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'tariq', text: 'Oops, I couldn’t process that.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'tariq', text: 'Error contacting AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{ from: 'tariq', text: 'Hello! **I’m Tariq.** Ask me anything related to content, campaigns or ad copy.' }]);
    setHistoryItems([]);
  };

  const scrollToMessage = (index: number) => {
    const messageElement = messageRefs[index]?.current;
    const container = scrollRef.current;
    if (messageElement && container) {
      const relativeOffset = messageElement.offsetTop - container.offsetTop;
      container.scrollTo({ top: relativeOffset - 40, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fff', borderRadius: '1rem', overflow: 'hidden' }}>
      <aside style={{
        width: '300px',
        backgroundColor: primaryColor,
        color: '#000',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ width: '100%', height: '160px', backgroundColor: '#fffde7', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: primaryColor, fontWeight: 600 }}>
            [ Tariq Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Tariq</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Content & Campaigns</p>

          <button
            onClick={handleNewChat}
            style={{ marginTop: '2rem', padding: '0.6rem 1rem', background: '#000', color: '#fff', borderRadius: '0.75rem', border: 'none', fontWeight: 600, cursor: 'pointer' }}
          >
            + New Chat
          </button>

          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>History</h4>
            <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {historyItems.length === 0 ? (
                <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>No chat history</p>
              ) : (
                historyItems.map((item, idx) => (
                  <HistoryItem
                    key={idx}
                    summary={item.summary}
                    onClick={() => scrollToMessage(item.index)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </aside>

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem', background: '#fffdf2', overflow: 'hidden' }}>
        <div style={{ flexShrink: 0 }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.25rem', color: '#2b2b2b' }}>
            Hey, it's <span style={{ color: primaryColor }}>Tariq</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>Let’s create amazing content together.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[ 'Escribe un anuncio para redes sociales', 'Genera un correo para carrito abandonado', 'Crea un título llamativo para un banner', 'Escribe un guion para video en TikTok' ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = suggestion;
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }
                }}
                style={{ backgroundColor: '#fff', border: `1px solid ${primaryColor}`, borderRadius: '1rem', padding: '0.5rem 1rem', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginTop: '2rem', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={messageRefs[i]}
              style={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                background: msg.from === 'user' ? primaryColor : '#fff',
                color: msg.from === 'user' ? '#000' : '#333',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                borderTopLeftRadius: msg.from === 'user' ? '1rem' : '0.25rem',
                borderTopRightRadius: msg.from === 'user' ? '0.25rem' : '1rem',
                maxWidth: '70%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#fff', color: '#333', padding: '0.75rem 1rem', borderRadius: '1rem', maxWidth: '50%', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '0.3rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#333', animation: 'bounce 1s infinite alternate' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#333', animation: 'bounce 1s infinite alternate 0.2s' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#333', animation: 'bounce 1s infinite alternate 0.4s' }} />
              <style>{`@keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }`}</style>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1rem 0 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: '#fffdf2', borderTop: '1px solid #e4e4e4' }}>
          <input
            ref={inputRef}
            name="msg"
            placeholder="Type your question..."
            disabled={loading}
            style={{ flex: 1, padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: '#fff' }}
          />
          <button type="submit" disabled={loading} style={{ backgroundColor: primaryColor, color: '#000', border: 'none', padding: '0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: loading ? 'not-allowed' : 'pointer' }}>
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}