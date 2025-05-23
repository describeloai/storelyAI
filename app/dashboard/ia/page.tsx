'use client';

import Image from 'next/image';

export default function StorelyBrainPage() {
  const backgroundColor = '#f4f2f9';       // Morado pálido
  const cardColor = '#371866';            // Morado oscuro
  const textColor = '#ffffff';            // Blanco

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
      boxShadow: '0 0 0 100vmax #f4f2f9', // asegura que el fondo externo no se vea si hay contenido expandido
    }}>
      {/* TÍTULO */}
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: 800,
        color: cardColor,
        marginBottom: '-1.5rem',
        borderRadius: '1rem',
      }}>
        Storely Brain
      </h1>

      {/* CARD SUPERIOR */}
      <div style={{
        background: cardColor,
        borderRadius: '1.75rem',
        padding: '2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      }}>
        <div>
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
        </div>

        <div style={{ flexShrink: 0 }}>
          <Image
            src="/icons/brain.png"
            alt="Brain"
            width={130}
            height={130}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              marginRight: '-0.25rem'
            }}
          />
        </div>
      </div>

      {/* CONTENIDO CENTRAL */}
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        padding: '2.5rem 2.5rem',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
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
        <button style={{
          padding: '0.8rem 1.4rem',
          backgroundColor: cardColor,
          color: '#fff',
          border: 'none',
          borderRadius: '0.75rem',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer'
        }}>
          + Add info manually
        </button>
      </div>
    </div>
  );
}
