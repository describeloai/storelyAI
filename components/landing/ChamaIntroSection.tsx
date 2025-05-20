'use client'

export default function ChamaIntroSection() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        backgroundColor: '#0d011f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
          fontSize: '1.35rem',
          color: '#bbb',
          marginBottom: '0.5rem',
          fontWeight: 500,
        }}
      >
        Smart. Adaptable. Unstoppable.
      </p>

      <p
        style={{
          fontSize: '1.15rem',
          color: '#ccc',
          maxWidth: '720px',
          marginTop: '1.2rem',
          lineHeight: 1.75,
        }}
      >
        AI-powered modules that elevate your brand and support you 24/7 — the Chamas are here to revolutionize your online business with intelligence and precision.
      </p>
    </section>
  )
}
