'use client'

import { useRouter } from 'next/navigation'

export default function NewHero() {
  const router = useRouter()

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/blue-camaleon-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay oscuro */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Contenido del Hero */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: '#fff',
            textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          Transform the future of ecommerce with <br /> AI-powered intelligence.
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#eee', marginBottom: '2rem' }}>
          Smart. Adaptable. Unstoppable. Optimize your business with your team of Chamas.
        </p>
        <button
          onClick={() => router.push('/sign-up')}
          style={{
            padding: '0.9rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '0.6rem',
            backgroundColor: '#6366f1',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(99, 102, 241, 0.5)',
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  )
}
