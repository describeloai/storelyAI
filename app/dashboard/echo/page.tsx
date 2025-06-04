'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { summarizeMessage } from '@/utils/summarize';
import { useMessageRefs } from '@/hooks/useMessageRefs';
import HistoryItem from '@/components/dashboard/HistoryItem';
import { useDarkMode } from '@/context/DarkModeContext';
import MarkdownMessage from '@/components/dashboard/MarkdownMessage';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';

export default function EchoPage() {
  const { darkMode } = useDarkMode();
  const { user, isLoaded } = useUser();
  const { t } = useLanguage();

  const initialAssistantMessage = {
    from: 'echo',
    text: 'Hello! **I’m Echo**, your AI support assistant. I can help you analyze performance, answer questions, and support your customers.',
  };
  const [messages, setMessages] = useState([initialAssistantMessage]); // Estado de mensajes para la UI
  const [historyItems, setHistoryItems] = useState<{ summary: string; index: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useMessageRefs(messages.length);
  const primaryColor = '#22C55E';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    if (!isLoaded || !user || !user.id) {
      setMessages(prev => [...prev, { from: 'echo', text: 'Error: No se pudo procesar la pregunta. Usuario no autenticado o ID no disponible.' }]);
      console.error('Error: User not loaded or user.id is null/undefined. Cannot submit question.');
      return;
    }

    const currentUserId = user.id;

    const userMessage = { from: 'user', text: value }; 
    setMessages(prev => [...prev, userMessage]); 
    if (inputRef.current) inputRef.current.value = '';

    // ****** CAMBIO CLAVE FINAL AQUI - LA LÓGICA MÁS SIMPLE Y SEGURA ******
    // El historial a enviar al backend será vacío SI el array 'messages'
    // solo contiene el mensaje inicial del asistente antes de añadir el mensaje del usuario.
    // Esto significa que la longitud de 'messages' es 1 cuando se envía el primer mensaje del usuario.
    const isFirstUserMessage = messages.length === 1 && messages[0].from === 'echo';

    let historyToSend: { role: 'user' | 'assistant'; content: string }[];

    if (isFirstUserMessage) {
      historyToSend = []; // Si es el primer mensaje real del usuario, el historial es **VACÍO**
    } else {
      // Si no es el primer mensaje (hay más de un mensaje en la UI además del inicial del asistente),
      // entonces construimos el historial normal, EXCLUYENDO el mensaje inicial del asistente
      // y tomando los últimos 4 pares de mensajes.
      historyToSend = messages
        .filter(msg => msg !== initialAssistantMessage) // Excluye el mensaje de bienvenida de la UI
        .slice(-4) // Limita el historial a los últimos 4 pares (user/assistant)
        .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    }
    // *******************************************************************

    // --- LOG para depurar el historial que se envía ---
    console.log("Frontend (EchoPage.tsx): historyToSend (antes de enviar):", historyToSend);
    // ------------------------------------------------------------

    setLoading(true);
    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, userId: currentUserId, history: historyToSend }),
      });

      const data = await res.json();
      if (data.output) {
        setMessages(prev => [...prev.slice(0, prev.length - 1), userMessage, { from: 'echo', text: data.output }]);

        if (value.length > 8) {
          const summary = summarizeMessage(value);
          setHistoryItems(prev => [...prev, { summary, index: messages.length }]);
        }
      } else {
        setMessages(prev => [...prev.slice(0, prev.length - 1), userMessage, { from: 'echo', text: t('echoPage.processError') }]);
      }
    } catch {
      setMessages(prev => [...prev.slice(0, prev.length - 1), userMessage, { from: 'echo', text: t('echoPage.contactError') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([initialAssistantMessage]); // Volvemos al estado inicial de la UI
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
        background: darkMode ? '#0f0f11' : '#fff',
        fontFamily: `'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif`,
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
        height: '100vh',
        background: darkMode ? '#0f0f11' : '#fff',
        fontFamily: `'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif`,
        color: darkMode ? '#f2f2f2' : '#111',
        borderRadius: '1rem',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        Por favor, inicia sesión para chatear con Echo.
      </div>
    );
  }

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
      {/* Sidebar */}
      <aside
        style={{
          width: '300px',
          backgroundColor: primaryColor,
          color: '#fff',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div>
          <div
            style={{
              width: '100%',
              height: '160px',
              backgroundColor: '#dcfce7',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: primaryColor,
              fontWeight: 600,
            }}
          >
            [ Echo Image ]
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Echo</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>{t('echoPage.assistantRole')}</p>

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
            {t('echoPage.newChatButton')}
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            paddingRight: '0.25rem',
            marginTop: '1rem',
          }}
        >
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('echoPage.historyTitle')}</h4>
          {historyItems.length === 0 ? (
            <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>{t('echoPage.noChatHistory')}</p>
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
          background: darkMode ? '#1a1a1d' : '#f0fdf4',
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
            {t('echoPage.welcomeGreeting', { assistantName: 'Echo' })}
          </h1>
          <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#555' }}>{t('echoPage.howCanIHelp')}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              t('echoPage.suggestion1'),
              t('echoPage.suggestion2'),
              t('echoPage.suggestion3'),
              t('echoPage.suggestion4'),
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

        {/* Chat content */}
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

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1rem 0 1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: darkMode ? '#1a1a1d' : '#f0fdf4',
            borderTop: darkMode ? '1px solid #333' : '1px solid #e4e4e4',
          }}
        >
          <input
            ref={inputRef}
            name="msg"
            placeholder={t('echoPage.typeQuestionPlaceholder')}
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