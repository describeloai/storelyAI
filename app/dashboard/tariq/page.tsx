'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sparkles } from 'lucide-react'; // Importamos Sparkles para un toque visual
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/dashboard/MarkdownMessage';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';

export default function TariqPage() {
  const { darkMode } = useDarkMode();
  const { user, isLoaded } = useUser();
  const { t } = useLanguage();

  const assistantName = "Tariq";
  const storeKey = 'blue'; // Usando 'blue' como el storeKey para todos los asistentes

  const [messages, setMessages] = useState([
    {
      from: 'tariq',
      text: t('tariqPage.initialGreeting', { assistantName: assistantName }),
    },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);

  // Colores y gradientes de Tariq
  const tariqGradient = 'linear-gradient(135deg, #4f73e5, #a447e7)'; // Azul a Morado
  const primaryColor = '#FFD600'; // Amarillo Vibrante (para acentos y modo claro)
  const secondaryColor = '#8a2be2'; // Azul Violeta (para más profundidad)

  // Colores dinámicos basados en el modo oscuro
  const userBubbleBg = darkMode ? tariqGradient : primaryColor;
  const userBubbleText = darkMode ? '#fff' : '#333';
  const assistantBubbleBg = darkMode ? '#2d3748' : '#f0f4f8'; // Azul grisáceo oscuro / Gris claro
  const assistantBubbleText = darkMode ? '#e2e8f0' : '#2d3748'; // Blanco grisáceo / Azul grisáceo oscuro
  const pageBg = darkMode ? '#1a202c' : '#f8fbfc'; // Fondo más oscuro / Fondo muy claro
  const sidebarBg = darkMode ? tariqGradient : 'linear-gradient(135deg, #FFD600, #ffec8b)'; // Gradiente inverso para sidebar claro
  const textColor = darkMode ? '#e2e8f0' : '#2d3748';
  const borderColor = darkMode ? '#4a5568' : '#cbd5e0'; // Bordes sutiles

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
      source: 'chat-tariq',
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
      setMessages(prev => [...prev, { from: 'tariq', text: t('tariqPage.authError') }]);
      console.error('Error: Usuario no autenticado o ID no disponible para Tariq.');
      return;
    }
    const currentUserId = user.id;

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
        body: JSON.stringify({ prompt: value, userId: currentUserId, history: prevHistory }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'tariq', text: data.output }]);
        if (value.length > 8) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'tariq', text: t('tariqPage.processError') }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'tariq', text: t('tariqPage.contactError') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { from: 'tariq', text: t('tariqPage.initialGreeting', { assistantName: assistantName }) },
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

  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        background: pageBg,
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        color: textColor,
        borderRadius: '1rem',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}>
        Cargando asistente...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        background: pageBg,
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        color: textColor,
        borderRadius: '1rem',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}>
        {t('tariqPage.notAuthenticated')}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: pageBg,
        color: textColor,
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'background 0.3s ease, color 0.3s ease',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '300px',
          background: sidebarBg,
          color: darkMode ? '#fff' : '#2d3748',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          borderRight: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0',
          transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div>
          <div
            style={{
              width: '100%',
              height: '160px',
              backgroundColor: darkMode ? '#2d3748' : '#fff',
              borderRadius: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: darkMode ? '#a0aec0' : '#4a5568',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            [ Tariq Image Placeholder ]
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: darkMode ? '#fff' : '#2d3748' }}>Tariq</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5, color: darkMode ? '#e2e8f0' : '#4a5568' }}>
            {t('tariqPage.assistantRole')}
          </p>

          <button
            onClick={handleNewChat}
            style={{
              marginTop: '2rem',
              marginBottom: '1rem',
              padding: '0.8rem 1.25rem',
              background: darkMode ? 'rgba(255,255,255,0.1)' : '#fff',
              color: darkMode ? '#fff' : secondaryColor,
              borderRadius: '0.75rem',
              border: `1px solid ${darkMode ? '#4a5568' : primaryColor}`,
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Sparkles size={18} /> {t('tariqPage.newChatButton')}
          </button>
        </div>

        <div
          style={{
            flex: 1,
            marginTop: '2rem',
            overflowY: 'auto',
            paddingRight: '0.5rem',
            scrollbarWidth: 'thin',
            scrollbarColor: `${darkMode ? '#4a5568' : '#cbd5e0'} transparent`, // Custom scrollbar
          }}
        >
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: darkMode ? '#e2e8f0' : '#2d3748' }}>{t('tariqPage.historyTitle')}</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {historyItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => scrollToMessage(item.index)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.6rem 0.75rem',
                    background: 'none',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: darkMode ? '#a0aec0' : '#4a5568',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.color = darkMode ? '#fff' : '#000';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = darkMode ? '#a0aec0' : '#4a5568';
                  }}
                >
                  {item.summary}
                </button>
              </li>
            ))}
            {historyItems.length === 0 && (
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#a0aec0' : '#718096' }}>
                {t('tariqPage.noHistory')}
              </p>
            )}
          </ul>
        </div>
      </aside>

      {/* Main chat */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2.5rem 3rem', // Increased padding for more space
          background: pageBg,
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ flexShrink: 0, marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2.8rem', // Larger font size for main greeting
              fontWeight: 800,
              marginBottom: '0.5rem',
              color: darkMode ? '#fff' : '#2d3748',
              letterSpacing: '-0.03em', // Slightly tighter letter spacing
            }}
          >
            {t('tariqPage.welcomeGreeting', { assistantName: assistantName })}
          </h1>
          <p style={{ fontSize: '1.2rem', color: darkMode ? '#a0aec0' : '#555', lineHeight: 1.6 }}>
            {t('tariqPage.howCanIHelp')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            {[
              t('tariqPage.suggestion1'),
              t('tariqPage.suggestion2'),
              t('tariqPage.suggestion3'),
              t('tariqPage.suggestion4'),
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
                  backgroundColor: darkMode ? '#2d3748' : '#fff',
                  border: `1px solid ${borderColor}`, // Lighter border for suggestions
                  borderRadius: '1.5rem', // More rounded corners
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  color: darkMode ? '#e2e8f0' : '#4a5568',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = primaryColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = borderColor;
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
            paddingRight: '1rem', // Increased padding for scrollbar
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            scrollbarWidth: 'thin',
            scrollbarColor: `${darkMode ? '#4a5568' : '#cbd5e0'} transparent`,
            paddingBottom: '1rem', // Padding at the bottom of the chat history
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={messageRefs[i]}
              style={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                background: msg.from === 'user' ? userBubbleBg : assistantBubbleBg,
                color: msg.from === 'user' ? userBubbleText : assistantBubbleText,
                padding: '1rem 1.25rem',
                borderRadius: '1.25rem', // More rounded bubbles
                borderTopLeftRadius: msg.from === 'user' ? '1.25rem' : '0.5rem', // Unique corner for conversation flow
                borderTopRightRadius: msg.from === 'user' ? '0.5rem' : '1.25rem',
                maxWidth: '75%', // Slightly wider bubbles
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <MarkdownMessage text={msg.text} />
              {msg.from !== 'user' && (
                <button
                  onClick={() => saveToBrain(msg.text)}
                  title="Guardar en Brain"
                  style={{
                    position: 'absolute',
                    bottom: '-8px', // Position below the bubble
                    right: msg.from === 'tariq' ? '-8px' : 'auto', // Adjust for right positioning
                    left: msg.from === 'tariq' ? 'auto' : '-8px', // Adjust for left positioning
                    backgroundColor: darkMode ? '#3a475a' : '#e0e5ea',
                    color: darkMode ? '#a0aec0' : '#718096',
                    borderRadius: '50%',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          ))}

          {loading && (
            <div
              style={{
                alignSelf: 'flex-start',
                background: assistantBubbleBg,
                color: assistantBubbleText,
                padding: '0.75rem 1.25rem',
                borderRadius: '1.25rem',
                borderTopLeftRadius: '0.5rem',
                maxWidth: '50%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: '0.5rem', // Increased gap for dots
                alignItems: 'center',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate 0.2s' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'currentColor', animation: 'bounce 1s infinite alternate 0.4s' }} />
              <style>{`@keyframes bounce { 0% { transform: translateY(0); opacity: 0.7; } 100% { transform: translateY(-6px); opacity: 1; } }`}</style>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.5rem 0', // Increased padding for form area
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: pageBg,
            borderTop: `1px solid ${borderColor}`,
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
        >
          <input
            ref={inputRef}
            name="msg"
            placeholder={t('tariqPage.typeQuestionPlaceholder')}
            disabled={loading}
            style={{
              flex: 1,
              padding: '1.25rem 1.5rem', // Larger input field
              borderRadius: '2rem', // More rounded input
              border: `1px solid ${borderColor}`,
              fontSize: '1.05rem',
              backgroundColor: darkMode ? '#2d3748' : '#fff',
              color: textColor,
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onFocus={e => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 3px ${primaryColor}40`; // Subtle focus ring
            }}
            onBlur={e => {
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: tariqGradient, // Gradient for the send button
              color: '#fff',
              border: 'none',
              padding: '1rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseDown={e => { if (!loading) e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.05)'; }}
          >
            <Send size={22} />
          </button>
        </form>
      </section>
    </div>
  );
}