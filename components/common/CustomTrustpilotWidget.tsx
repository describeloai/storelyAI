'use client'

import Image from 'next/image'

export default function CustomTrustpilotWidget() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        backgroundColor: '#ffffff',
        padding: '1.5rem 2rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        maxWidth: '400px',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Logo Trustpilot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Image src="/trustpilot-star.svg" alt="Trustpilot logo" width={28} height={28} />
        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#000' }}>Trustpilot</span>
      </div>

      {/* Estrellas */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {[1, 2, 3, 4].map((_, i) => (
          <Image
            key={i}
            src="/trustpilot-star-full.svg"
            alt="Star"
            width={32}
            height={32}
          />
        ))}
        <Image src="/trustpilot-star-half.svg" alt="Half Star" width={32} height={32} />
      </div>

      {/* Score */}
      <div style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>
        TrustScore <strong style={{ fontWeight: 700 }}>4.6</strong> | <strong>4,490</strong> reviews
      </div>
    </div>
  )
}
