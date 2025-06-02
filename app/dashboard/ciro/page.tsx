'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';
import { detectCiroIntent } from '@/lib/ai/intent/ciro';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/common/MarkdownMessage';

export default function CiroPage() {
  const { darkMode } = useDarkMode();
  const [messages, setMessages] = useState([
    { from: 'ciro', text: 'Hi! **I’m Ciro**, your data advisor. Ask me anything about pricing, inventory or campaign performance.' },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);
  const primaryColor = '#1E40AF'; // azul oscuro

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

    const prevHistory = messages.slice(-4).filter(m => m.from === 'user' || m.from === 'ciro')
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    const intent = detectCiroIntent(value, true);
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
        if (value.length > 8) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'ciro', text: 'Ups, no pude procesarlo.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'ciro', text: 'Error al contactar con la IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{ from: 'ciro', text: 'Hi! **I’m Ciro**, your data advisor. Ask me anything about pricing, inventory or campaign performance.' }]);
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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: darkMode ? '#0f0f11' : '#fff',
        color: darkMode ? '#f2f2f2' : '#111',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        transition: 'background 0.3s ease, color 0.3s ease',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '300px',
          backgroundColor: primaryColor,
          color: '#fff',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <div
            style={{
              width: '100%',
              height: '160px',
              backgroundColor: '#e0ecff',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: primaryColor,
              fontWeight: 600,
            }}
          >
            [ Ciro Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Ciro</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Data Advisor</p>

          <button
            onClick={handleNewChat}
            style={{
              marginTop: '2rem',
              padding: '0.6rem 1rem',
              background: '#fff',
              color: primaryColor,
              borderRadius: '0.75rem',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            + New Chat
          </button>
        </div>

        <div
          style={{
            flex: 1,
            marginTop: '2rem',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            paddingRight: '0.25rem',
          }}
        >
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>History</h4>
          {historyItems.length === 0 ? (
            <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>No chat history</p>
          ) : (
            historyItems.map((item, idx) => (
              <HistoryItem key={idx} summary={item.summary} onClick={() => scrollToMessage(item.index)} />
            ))
          )}
        </div>
      </aside>

      {/* Main Chat */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          background: darkMode ? '#1a1a1d' : '#f0f6ff',
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              marginBottom: '0.25rem',
              color: darkMode ? '#fff' : '#2b2b2b',
            }}
          >
            Hey, it's <span style={{ color: primaryColor }}>Ciro</span> 👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#555' }}>
            How can I help with your numbers?
          </p>

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
                  backgroundColor: darkMode ? '#2b2b2e' : '#fff',
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  color: darkMode ? '#eee' : '#000',
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

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
            scrollbarWidth: 'thin',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={messageRefs[i]}
              style={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                background:
                  msg.from === 'user'
                    ? primaryColor
                    : darkMode
                    ? '#2b2b2e'
                    : '#fff',
                color: msg.from === 'user' ? '#fff' : darkMode ? '#f0f0f0' : '#333',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                borderTopLeftRadius: msg.from === 'user' ? '1rem' : '0.25rem',
                borderTopRightRadius: msg.from === 'user' ? '0.25rem' : '1rem',
                maxWidth: '70%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <MarkdownMessage text={msg.text} />
            </div>
          ))}

          {loading && (
            <div
              style={{
                alignSelf: 'flex-start',
                background: darkMode ? '#2b2b2e' : '#fff',
                color: darkMode ? '#eee' : '#333',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                maxWidth: '50%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: '0.3rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate 0.2s' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate 0.4s' }} />
              <style>{`@keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }`}</style>
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
            backgroundColor: darkMode ? '#1a1a1d' : '#f0f6ff',
            borderTop: darkMode ? '1px solid #333' : '1px solid #e4e4e4',
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
              border: '1px solid',
              borderColor: darkMode ? '#444' : '#ccc',
              fontSize: '1rem',
              backgroundColor: darkMode ? '#2b2b2e' : '#fff',
              color: darkMode ? '#eee' : '#000',
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
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
