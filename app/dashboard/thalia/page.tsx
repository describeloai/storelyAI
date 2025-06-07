'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react'; // Importamos Plus aquí
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/dashboard/MarkdownMessage';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';


export default function ThaliaPage() {
  const { darkMode } = useDarkMode();
  const { user, isLoaded } = useUser();
  const { t } = useLanguage();

  const assistantName = "Thalia";
  const storeKey = 'blue'; // Usando 'blue' como el storeKey para todos los asistentes

  const [messages, setMessages] = useState([
    {
      from: 'thalia',
      text: t('thaliaPage.initialGreeting', { assistantName: assistantName }),
    },
  ]);
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);

  const primaryColor = '#D946EF';
  const gradient = 'linear-gradient(135deg, #4f73e5, #a447e7)';
  const userBubbleColor = darkMode ? gradient : primaryColor;
  // Colores del asistente para burbujas y texto
  const assistantBubbleColor = darkMode ? '#2b2b2e' : '#fff';
  const assistantTextColor = darkMode ? '#f0f0f0' : '#333';


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Función para guardar en el Brain
  const saveToBrain = async (text: string) => {
    if (!user || !user.id) return;

    const body = {
      userId: user.id,
      storeKey, // Utiliza la storeKey 'blue'
      type: 'text',
      title: '',
      content: text,
      source: 'chat-thalia', // Fuente específica para Thalia
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
      setMessages(prev => [...prev, { from: 'thalia', text: t('thaliaPage.authError') }]);
      console.error('Error: Usuario no autenticado o ID no disponible para Thalia.');
      return;
    }
    const currentUserId = user.id;

    const userMessage = { from: 'user', text: value };
    setMessages(prev => [...prev, userMessage]);
    if (inputRef.current) inputRef.current.value = '';

    const prevHistory = messages.slice(-4).filter(m => m.from === 'user' || m.from === 'thalia')
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    setLoading(true);
    try {
      const res = await fetch('/api/thalia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, userId: currentUserId, history: prevHistory }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev, { from: 'thalia', text: data.output }]);
        if (value.length > 8) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev, { from: 'thalia', text: t('thaliaPage.processError') }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'thalia', text: t('thaliaPage.contactError') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        from: 'thalia',
        text: t('thaliaPage.initialGreeting', { assistantName: assistantName }),
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

  // --- Manejo de estados de carga o no autenticación al inicio del render ---
  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 2rem)',
        margin: '1rem',
        background: darkMode ? '#0f0f11' : '#fff',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        color: darkMode ? '#f2f2f2' : '#111',
        borderRadius: '1rem',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        Cargando asistente...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 2rem)',
        margin: '1rem',
        background: darkMode ? '#0f0f11' : '#fff',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        color: darkMode ? '#f2f2f2' : '#111',
        borderRadius: '1rem',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {t('thaliaPage.notAuthenticated')}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 2rem)',
        margin: '1rem',
        background: darkMode ? '#0f0f11' : '#fff',
        color: darkMode ? '#f2f2f2' : '#111',
        fontFamily: `'Inter', 'Segoe UI', sans-serif`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'background 0.3s ease, color 0.3s ease',
        boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '300px',
          background: darkMode ? gradient : primaryColor,
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
              backgroundColor: '#faf5ff',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: primaryColor,
            }}
          >
            [ Thalia Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Thalia</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>{t('thaliaPage.assistantRole')}</p>

          <button
            onClick={handleNewChat}
            style={{
              marginTop: '2rem',
              marginBottom: '1rem',
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
            {t('thaliaPage.newChatButton')}
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
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('thaliaPage.historyTitle')}</h4>
          {historyItems.length === 0 ? (
            <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>{t('thaliaPage.noChatHistory')}</p>
          ) : (
            historyItems.map((item, idx) => (
              <HistoryItem key={idx} summary={item.summary} onClick={() => scrollToMessage(item.index)} />
            ))
          )}
        </div>
      </aside>

      {/* Chat Main Section */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          background: darkMode ? '#1a1a1d' : '#faf5ff',
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
            {t('thaliaPage.welcomeGreeting', { assistantName: assistantName })}
          </h1>
          <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#555' }}>
            {t('thaliaPage.howCanIHelp')}
          </p>
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
                    ? userBubbleColor
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
                position: 'relative', // Necesario para posicionar el botón
              }}
            >
              <MarkdownMessage text={msg.text} />
              {msg.from !== 'user' && ( // Solo muestra el botón para mensajes del asistente
                <button
                  onClick={() => saveToBrain(msg.text)}
                  title="Guardar en Brain"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '-36px', // Ajusta si es necesario para el diseño de Thalia
                    backgroundColor: darkMode ? '#3a3a3a' : '#eee', // Puedes ajustar estos colores
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
            backgroundColor: darkMode ? '#1a1a1d' : '#faf5ff',
            borderTop: darkMode ? '1px solid #333' : '1px solid #e4e4e4',
          }}
        >
          <input
            ref={inputRef}
            name="msg"
            placeholder={t('thaliaPage.typeQuestionPlaceholder')}
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
              backgroundColor: userBubbleColor,
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