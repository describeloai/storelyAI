'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddInfoButton from '@/components/dashboard/ui/AddInfoButton';

export default function StorelyBrainPage() {
  const backgroundColor = '#f4f2f9';
  const purple = '#371866';
  const blue = '#1A73E8';
  const textColor = '#ffffff';

  const [activeCard, setActiveCard] = useState<'purple' | 'blue'>('purple');

  const handleToggle = () => {
    setActiveCard(prev => (prev === 'purple' ? 'blue' : 'purple'));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: backgroundColor,
      padding: '3rem 3.5rem',
      borderRadius: '2rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
    }}>
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: 800,
        color: purple,
      }}>
        Storely Brain
      </h1>

      {/* WRAPPER de ambas cards */}
      <div style={{ position: 'relative', height: '200px' }}>
        {/* CARD 1 */}
        <motion.div
          onClick={handleToggle}
          initial={false}
          animate={{
            top: activeCard === 'purple' ? 0 : 80,
            zIndex: activeCard === 'purple' ? 2 : 1,
            scale: activeCard === 'purple' ? 1 : 0.95,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '100%',
            background: purple,
            borderRadius: '1.75rem',
            padding: '2rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          <AnimatePresence>
            {activeCard === 'purple' && (
              <motion.div
                key="purpleText"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ fontSize: '1rem', color: textColor, opacity: 0.9, marginBottom: '0.25rem' }}>
                  Knowledge Status
                </p>
                <div style={{
                  display: 'flex',
                  gap: '2.5rem',
                  fontWeight: 600,
                  color: textColor,
                  fontSize: '1.1rem',
                  marginTop: '0.5rem'
                }}>
                  <div><strong>0</strong> Snippets</div>
                  <div><strong>0</strong> Websites</div>
                  <div><strong>0</strong> Files</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ flexShrink: 0 }}>
            <Image
              src="/icons/brain.png"
              alt="Brain"
              width={130}
              height={130}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              }}
            />
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          onClick={handleToggle}
          initial={false}
          animate={{
            top: activeCard === 'blue' ? 0 : 80,
            zIndex: activeCard === 'blue' ? 2 : 1,
            scale: activeCard === 'blue' ? 1 : 0.95,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '100%',
            background: blue,
            borderRadius: '1.75rem',
            padding: '2rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          <AnimatePresence>
            {activeCard === 'blue' && (
              <motion.div
                key="blueText"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ fontSize: '1rem', color: textColor, opacity: 0.9, marginBottom: '0.25rem' }}>
                  AI Memory
                </p>
                <div style={{
                  display: 'flex',
                  gap: '2.5rem',
                  fontWeight: 600,
                  color: textColor,
                  fontSize: '1.1rem',
                  marginTop: '0.5rem'
                }}>
                  <div><strong>0</strong> Prompts</div>
                  <div><strong>0</strong> Tags</div>
                  <div><strong>0</strong> Notes</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ flexShrink: 0 }}>
            <Image
              src="/icons/brain.png"
              alt="Brain"
              width={130}
              height={130}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* CARD CENTRAL DE CONTENIDO */}
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        padding: '2.5rem 2.5rem',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}>
        <Image
          src="/icons/brain.png"
          alt="Empty Brain"
          width={90}
          height={90}
          style={{ opacity: 0.3, marginBottom: '1.25rem' }}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#222' }}>
          Brain is empty
        </h2>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          Add information to start using it
        </p>
        <AddInfoButton />
      </div>
    </div>
  );
}
