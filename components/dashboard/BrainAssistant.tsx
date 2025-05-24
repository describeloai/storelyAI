'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

interface BrainAssistantProps {
  role: 'sofia' | 'echo' | 'ciro' | 'tariq' | 'mara' | 'thalia';
}

export default function BrainAssistant({ role }: BrainAssistantProps) {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { type: 'user' as const, text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, role }),
      });

      const { output } = await res.json();
      setMessages(prev => [...prev, { type: 'bot', text: output }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Error al conectar con la IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: '1rem',
      backgroundColor: '#f0fdf4',
      overflow: 'hidden',
    }}>
      {/* Scrollable message area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
              background: msg.type === 'user' ? '#1A73E8' : '#fff',
              color: msg.type === 'user' ? '#fff' : '#333',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              maxWidth: '70%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        padding: '1rem 1rem 1.25rem',
        borderTop: '1px solid #e4e4e4',
        backgroundColor: '#f0fdf4',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
      }}>
        <input
          name="brain-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
          onClick={sendMessage}
          disabled={loading}
          style={{
            backgroundColor: '#1A73E8',
            color: '#fff',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
