'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewHero() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
        padding: isMobile ? '1.5rem 1rem' : '0',
        textAlign: 'center',
      }}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
          maxWidth: isMobile ? '100%' : '900px',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '2rem' : '4rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            lineHeight: isMobile ? 1.3 : 1.2,
            marginBottom: isMobile ? '1rem' : '1.5rem',
            color: '#fff',
            textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          Transform the future of ecommerce with{' '}
          {isMobile ? <br /> : null}
          AI-powered intelligence.
        </h1>

        {!isMobile && (
          <p
            style={{
              fontSize: '1.3rem',
              color: '#eee',
              marginBottom: '2rem',
            }}
          >
            Smart. Adaptable. Unstoppable. Optimize your business with your team of Chamas.
          </p>
        )}

        <button
          onClick={() => router.push('/sign-up')}
          style={{
            padding: isMobile ? '0.7rem 1.6rem' : '0.9rem 2rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
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
