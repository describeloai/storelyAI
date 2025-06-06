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
        display: 'flex',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        minHeight: '100vh', // Take full viewport height for better centering
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 4rem)', // Responsive padding
        textAlign: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false }, // Keep as false since it's within a section
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
        aria-hidden="true" // Decorative element, hide from screen readers
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px', // Limit content width for readability
          width: '100%', // Ensure it takes full width up to max-width
          boxSizing: 'border-box', // Include padding in element's total width and height
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)', // Responsive font size
            fontWeight: 800,
            letterSpacing: '-0.03em', // Slightly tighter letter spacing
            lineHeight: 1.1, // Tighter line height for large text
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffffff, #aaaaaa)', // Slightly softer gradient for text
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Subtle text shadow for depth
          }}
        >
          Your ecommerce, powered by Chamas.
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', // Responsive font size
            color: '#c0c0c0', // Slightly brighter grey for better contrast
            maxWidth: '720px', // Maintain max-width for paragraph
            margin: '1.2rem auto 0 auto', // Center paragraph with auto margins
            lineHeight: 1.7, // Optimal line height for body text
            fontWeight: 400, // Standard font weight for readability
          }}
        >
          The Chamas are your 24/7 AI team, automating content, engagement, and
          operations with precision, so your business grows even when you're
          offline.
        </p>
      </div>
    </section>
  )
}