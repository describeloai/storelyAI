'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/dashboard/MarkdownMessage';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';

export default function MaraPage() {
  const { darkMode } = useDarkMode();
  const { user, isLoaded } = useUser();
  const { t } = useLanguage();

  const assistantName = "Mara";
  const storeKey = 'blue';

  const [messages, setMessages] = useState([
    {
      from: 'mara',
      text: t('maraPage.initialGreeting', { assistantName }),
    },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);

  const maraGradient = 'linear-gradient(135deg, #8f00a8, #c100ff)';
  const primaryColor = '#9c27b0';
  const userBubbleColor = darkMode ? maraGradient : primaryColor;
  const assistantBubbleColor = darkMode ? '#2b2b2e' : '#fff';
  const assistantTextColor = darkMode ? '#e2e2e2' : '#333';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const saveToBrain = async (text: string) => {
    if (!user || !user.id) return;

    const body = {
      userId: user.id,
      storeKey,
      type: 'text',
      title: '',
      content: text,
      source: 'chat-mara',
      category: null,
    };

    try {
      const res = await fetch('/api/brain/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        console.log('✅ Guardado en Brain:', text);
      } else {
        console.error('❌ Error guardando en Brain:', data.error);
      }
    } catch (err) {
      console.error('❌ Error de red al guardar en Brain:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    if (!isLoaded || !user || !user.id) {
      setMessages(prev => [...prev, { from: 'mara', text: t('maraPage.authError') }]);
      return;
    }

    const userMessage = { from: 'user', text: value };
    setMessages(prev => [...prev, userMessage]);
    if (inputRef.current) inputRef.current.value = '';

    const prevHistory = messages.slice(-4).filter(m => (m.from === 'user' || m.from === 'mara') && m.text.length < 500)
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    const neutralMessages = ['ok', 'vale', 'gracias', 'entendido', 'de acuerdo', 'ajá', 'sí', 'bueno', 'perfecto'];
    const isTrivial = value.length < 10 && neutralMessages.some(m => value.toLowerCase().includes(m));

    setLoading(true);
    try {
      const res = await fetch('/api/mara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, userId: user.id, history: prevHistory, isTrivial }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'mara', text: data.output }]);

        const intentKeywords =
          /copy|texto|anuncio|marketing|creativo|contenido|eslogan|lema|descripción|producto|campaña/i;
        const isLikelyRelevant = value.length > 12 && (intentKeywords.test(value) || intentKeywords.test(data.output));

        if (isLikelyRelevant) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'mara', text: t('maraPage.processError') }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'mara', text: t('maraPage.contactError') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        from: 'mara',
        text: t('maraPage.initialGreeting', { assistantName }),
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

  if (!isLoaded || !user) {
    return (
      <div style={{
        display: 'flex', height: '100vh',
        background: darkMode ? '#0f0f11' : '#fff',
        color: darkMode ? '#f2f2f2' : '#111',
        justifyContent: 'center', alignItems: 'center',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
      }}>
        {isLoaded ? t('maraPage.notAuthenticated') : 'Cargando asistente...'}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: darkMode ? '#0f0f11' : '#fff',
      fontFamily: `'Inter', 'Segoe UI', sans-serif`,
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '300px', background: darkMode ? maraGradient : primaryColor,
        color: darkMode ? '#eee' : '#000', padding: '2rem 1.5rem',
      }}>
        <div style={{
          height: '160px', backgroundColor: darkMode ? '#2a2a2a' : '#ffe6ff',
          borderRadius: '1rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: darkMode ? '#aaa' : '#9c27b0', fontWeight: 600,
        }}>[ Mara Image ]</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mara</h2>
        <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>{t('maraPage.assistantRole')}</p>
        <button onClick={handleNewChat} style={{
          marginTop: '2rem', padding: '0.6rem 1rem',
          background: '#fff', borderRadius: '0.75rem',
          fontWeight: 600, cursor: 'pointer',
        }}>{t('maraPage.newChatButton')}</button>
        <div style={{ marginTop: '3rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t('maraPage.historyTitle')}</h4>
          <div style={{
            maxHeight: '240px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {historyItems.length === 0 ? (
              <p style={{ opacity: 0.7 }}>{t('maraPage.noChatHistory')}</p>
            ) : (
              historyItems.map((item, idx) => (
                <HistoryItem key={idx} summary={item.summary} onClick={() => scrollToMessage(item.index)} />
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Chat */}
      <section style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: darkMode ? '#1a1a1d' : '#ffe6ff',
        padding: '2rem', overflow: 'hidden',
      }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{t('maraPage.welcomeGreeting', { assistantName })}</h1>
        <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#555' }}>{t('maraPage.howCanIHelp')}</p>

        {/* Suggestions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
          {[t('maraPage.suggestion1'), t('maraPage.suggestion2'), t('maraPage.suggestion3'), t('maraPage.suggestion4')].map((s, idx) => (
            <button key={idx} onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = s;
                handleSubmit({ preventDefault: () => { } } as React.FormEvent);
              }
            }} style={{
              background: darkMode ? maraGradient : '#9c27b0',
              borderRadius: '1rem', padding: '0.5rem 1rem',
              color: '#fff', fontWeight: 500,
            }}>{s}</button>
          ))}
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: 'auto', marginTop: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {messages.map((msg, i) => (
            <div key={i} ref={messageRefs[i]} style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? userBubbleColor : assistantBubbleColor,
              color: msg.from === 'user' ? '#fff' : assistantTextColor,
              padding: '0.75rem 1rem', borderRadius: '1rem',
              maxWidth: '70%', position: 'relative',
              transition: 'transform 0.15s ease',
            }}>
              <MarkdownMessage text={msg.text} />
              {msg.from !== 'user' && (
                <button onClick={() => saveToBrain(msg.text)} title="Guardar en Brain"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '-36px',
                    backgroundColor: darkMode ? '#3a3a3a' : '#eee',
                    borderRadius: '999px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.85)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          ))}

          {loading && (
            <div style={{
              alignSelf: 'flex-start', background: assistantBubbleColor,
              color: assistantTextColor, padding: '0.75rem 1rem',
              borderRadius: '1rem', maxWidth: '50%',
              display: 'flex', gap: '0.3rem',
            }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%', background: 'currentColor',
                  animation: `bounce 1s infinite alternate ${d}s`,
                }} />
              ))}
              <style>{`@keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }`}</style>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{
          padding: '1rem 0', display: 'flex', gap: '1rem',
          alignItems: 'center', borderTop: darkMode ? '1px solid #333' : '1px solid #e4e4e4',
        }}>
          <input
            ref={inputRef}
            placeholder={t('maraPage.typeQuestionPlaceholder')}
            disabled={loading}
            style={{
              flex: 1, padding: '1rem 1.25rem', borderRadius: '1rem',
              border: '1px solid', borderColor: darkMode ? '#444' : '#ccc',
              backgroundColor: darkMode ? '#2b2b2e' : '#fff',
              color: darkMode ? '#eee' : '#000',
            }}
          />
          <button type="submit" disabled={loading} style={{
            backgroundColor: userBubbleColor, color: '#fff',
            border: 'none', padding: '0.75rem', borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            <Send size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
