'use client'

import Particles from 'react-tsparticles'
import { useCallback } from 'react'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'

export default function ChamaIntroSection() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 2rem',
        textAlign: 'center',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              outModes: { default: 'bounce' },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              repulse: { distance: 100 },
            },
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffffff, #888888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your ecommerce, powered by Chamas.
        </h2>

        <p
          style={{
            fontSize: '1.15rem',
            color: '#ccc',
            maxWidth: '720px',
            marginTop: '1.2rem',
            lineHeight: 1.75,
            fontWeight: 500,
          }}
        >
          The Chamas are your 24/7 AI team, automating content, engagement, and operations with precision, so your business grows even when you're offline.
        </p>
      </div>
    </section>
  )
}
