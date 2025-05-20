'use client'

export default function NewHero() {
  return (
    <section
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#f3f4f6',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <div style={{ maxWidth: '900px', marginTop: '3rem' }}>
        <h1
          style={{
            fontSize: '3.8rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            background: 'linear-gradient(to right, #ffffff, #888888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Transform your ecommerce with Artificial Intelligence.
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1.5rem', color: '#ccc' }}>
          Optimize your business with our team of Chamas.
        </p>
      </div>

      {/* Espacio para el video .webm animado */}
      <div style={{ marginTop: '3rem', width: '100%', maxWidth: '900px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
        >
          <source src="/your-video-path/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
