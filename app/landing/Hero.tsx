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
        padding: 'clamp(3rem, 5vw, 6rem) clamp(1rem, 5vw, 3rem)', // Responsive padding for all screens
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
        poster="/posters/ciro.jpg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        // Adding aria-hidden for accessibility as the video is decorative background
        aria-hidden="true"
      >
        <source src="/blue-camaleon-hero.webm" type="video/webm" />
        <source src="/blue-camaleon-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay oscuro con un gradiente más sutil y moderno */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Using a radial gradient for a more sophisticated overlay effect, enhancing center contrast
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Contenido del Hero */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '960px', // Slightly increased max-width for better content flow on large screens
          width: '100%',
          boxSizing: 'border-box', // Ensure padding is included in the width calculation
          // Adding a subtle background blur effect to the content container for more contrast
          // backdropFilter: 'blur(3px)',
          // WebkitBackdropFilter: 'blur(3px)',
          // Padding inside the content box to prevent text from touching edges
          padding: '1.5rem',
          borderRadius: '10px', // Soften the corners if backdrop-filter is enabled
        }}
      >
        <h1
          style={{
            // Responsive font size using clamp for smooth scaling
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900, // Make the text even bolder
            letterSpacing: '-0.04em', // Tighter letter spacing for impact
            lineHeight: 1.1, // Tighter line height
            marginBottom: '1.5rem',
            color: '#fff',
            // Enhanced text shadow for more depth and pop
            textShadow: '0px 4px 10px rgba(0,0,0,0.7), 0px 0px 20px rgba(255,255,255,0.1)',
            // Potentially add a subtle text stroke for extreme contrast if desired (experimental)
            // WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            // Text transform for visual flair (optional)
            // textTransform: 'uppercase',
          }}
        >
          Transform your ecommerce with{' '}
          {isMobile ? <br /> : null}
          <span
            style={{
              // Gradient for "AI-powered intelligence" to make it stand out
              background: 'linear-gradient(45deg, #FFD700, #FFF380)', // A vibrant purple-blue gradient
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              // Adding an even stronger shadow for this specific part
              textShadow: '0px 4px 12px rgba(255, 255, 200, 0.35), 0px 0px 30px rgba(255, 252, 71, 0.4)',
            }}
          >
            AI-powered intelligence.
          </span>
        </h1>

        {/* This paragraph will now be visible on all devices, with responsive styling */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.4rem)', // Responsive font size
            color: '#e0e0e0', // Brighter white for better readability against dark overlay
            marginBottom: '2.5rem', // More space before the button
            lineHeight: 1.6, // Optimal line height for readability
            maxWidth: '700px', // Limit width for improved readability on larger screens
            margin: '0 auto 2.5rem auto', // Center the paragraph
            textShadow: '1px 1px 4px rgba(0,0,0,0.5)', // Subtle text shadow
            fontWeight: 400,
          }}
        >
          Smart. Adaptable. Unstoppable. Optimize your business with your team of Chamas.
        </p>

        <button
          onClick={() => router.push('/sign-up')}
          style={{
            padding: '1rem 2.5rem', // Increased padding for a more substantial button
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', // Responsive font size
            borderRadius: '0.75rem', // Slightly more rounded corners
            // Enhanced button background with a subtle gradient for a modern feel
            background: 'linear-gradient(45deg, #B8860B, #DAA520)', // Blue to purple gradient
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            // More pronounced and vibrant box shadow
            boxShadow: '0 8px 30px rgba(255, 255, 200, 0.35), 0 0 40px rgba(255, 255, 200, 0.35)',
            transition: 'all 0.3s ease', // Smooth transition for hover effects
            fontWeight: 600, // Bolder text for the button
            textTransform: 'uppercase', // Uppercase for call to action
            letterSpacing: '0.05em', // Slightly increased letter spacing
            outline: 'none', // Remove default outline
          }}
          // Hover effect for the button
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 200, 0.35), 0 0 50px rgba(255, 255, 200, 0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 200, 0.35), 0 0 40px rgba(255, 255, 200, 0.35)'
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  )
}