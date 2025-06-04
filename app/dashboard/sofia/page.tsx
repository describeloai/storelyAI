'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/dashboard/MarkdownMessage';

export default function SofiaPage() {
  const { darkMode } = useDarkMode();
  const [messages, setMessages] = useState([
    {
      from: 'sofia',
      text: 'Hi! **I’m Sofía**, your AI marketing assistant. Ready to boost your store’s visibility and sales?',
    },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);

  const sofiaGradient = 'linear-gradient(135deg, #4f73e5, #a447e7)';
  const userBubbleColor = darkMode ? sofiaGradient : '#ea580c';
  const assistantBubbleColor = darkMode ? '#2b2b2e' : '#fff';
  const assistantTextColor = darkMode ? '#e2e2e2' : '#333';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    const neutralMessages = ['ok', 'vale', 'gracias', 'entendido', 'de acuerdo', 'ajá', 'sí', 'bueno', 'perfecto'];
    const isTrivial = value.length < 10 && neutralMessages.some(m => value.toLowerCase().includes(m));

    const userMessage = { from: 'user', text: value };
    setMessages(prev => [...prev, userMessage]);
    if (inputRef.current) inputRef.current.value = '';

    const prevHistory = messages
      .slice(isTrivial ? 0 : -1)
      .filter(m => (m.from === 'user' || m.from === 'sofia') && m.text.length < 500)
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    setLoading(true);
    try {
      const res = await fetch('/api/sofia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, userId: 'demo-user', history: prevHistory }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'sofia', text: data.output }]);

        const intentKeywords =
          /automatiza|tienda|campaña|ventas|cliente|email|marca|producto|nombre|seo|meta|título|página|landing|anuncio|copy|categoría|oferta|destacado/i;
        const isLikelyRelevant = value.length > 12 && (intentKeywords.test(value) || intentKeywords.test(data.output));

        if (isLikelyRelevant) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'sofia', text: 'Ups, no pude procesarlo.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'sofia', text: 'Error al contactar con la IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        from: 'sofia',
        text: 'Hi! **I’m Sofía**, your AI marketing assistant. Ready to boost your store’s visibility and sales?',
      },
    ]);
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
        fontFamily: `'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif`,
        color: darkMode ? '#f2f2f2' : '#111',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <aside
        style={{
          width: '300px',
          background: darkMode ? sofiaGradient : '#ea580c',
          color: darkMode ? '#eee' : '#000',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              width: '100%',
              height: '160px',
              backgroundColor: darkMode ? '#2a2a2a' : '#fff7ed',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkMode ? '#aaa' : '#ea580c',
              fontWeight: 600,
            }}
          >
            [ Sofía Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sofía</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>AI Marketer</p>

          <button
            onClick={handleNewChat}
            style={{
              marginTop: '2rem',
              padding: '0.6rem 1rem',
              background: darkMode ? '#fff' : '#000',
              color: darkMode ? '#000' : '#fff',
              borderRadius: '0.75rem',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + New Chat
          </button>

          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>History</h4>
            <div
              style={{
                maxHeight: '240px',
                overflowY: 'auto',
                paddingRight: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {historyItems.length === 0 ? (
                <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>No chat history</p>
              ) : (
                historyItems.map((item, idx) => (
                  <HistoryItem key={idx} summary={item.summary} onClick={() => scrollToMessage(item.index)} />
                ))
              )}
            </div>
          </div>
        </div>
      </aside>

      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          background: darkMode ? '#1a1a1d' : '#fffaf3',
          overflow: 'hidden',
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
            Hey, it's{' '}
            <span
              style={{
                background: darkMode ? sofiaGradient : 'none',
                WebkitBackgroundClip: darkMode ? 'text' : undefined,
                WebkitTextFillColor: darkMode ? 'transparent' : undefined,
                color: darkMode ? undefined : '#ea580c',
              }}
            >
              Sofía
            </span>{' '}
            👋
          </h1>
          <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#555' }}>
            Let’s level up your marketing!
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              'Sugiere una campaña para aumentar ventas',
              'Genera un asunto para email marketing',
              'Optimiza mis textos de landing',
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
                  background: darkMode ? sofiaGradient : '#ea580c',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  color: '#fff',
                  fontWeight: 500,
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
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={messageRefs[i]}
              style={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                background: msg.from === 'user' ? userBubbleColor : assistantBubbleColor,
                color: msg.from === 'user' ? '#fff' : assistantTextColor,
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
                background: assistantBubbleColor,
                color: assistantTextColor,
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
            backgroundColor: darkMode ? '#1a1a1d' : '#fffaf3',
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
              background: userBubbleColor,
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
