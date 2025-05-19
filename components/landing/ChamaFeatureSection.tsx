'use client'

export default function ChamaFeatureSection() {
  return (
    <section style={{ backgroundColor: '#0d011f', padding: '5rem 2rem' }}>
      {/* 🔝 CARD PRINCIPAL */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#15102b',
          borderRadius: '2rem',
          padding: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Animación (lado izquierdo) */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <div
            style={{
              width: '100%',
              height: '320px',
              backgroundColor: '#222',
              borderRadius: '1rem',
            }}
          >
            <p style={{ color: '#666', lineHeight: '320px' }}>[ animation here ]</p>
          </div>
        </div>

        {/* Texto (lado derecho) */}
        <div style={{ flex: '1 1 500px', color: 'white' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            One Chama. Multiple outcomes.
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ccc' }}>
            Each module in the Storely team isn’t just smart — it’s built to handle entire
            workflows. From analyzing your catalog to generating optimized content or
            tracking customer insights. Storely Chamas think, act and learn. While you rest.
          </p>
        </div>
      </div>

      {/* 🔻 DOS CARDS INDEPENDIENTES DEBAJO */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '3rem auto 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: '1 1 48%',
              backgroundColor: '#1e1833',
              borderRadius: '1.5rem',
              height: '400px', // Altura más vertical
              backgroundImage: `url('/placeholders/card${i}.png')`, // Cambia por tus imágenes
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1.5rem',
              color: 'white',
              position: 'relative',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '1rem',
                borderRadius: '1rem',
                width: '100%',
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1.3rem' }}>
                {i === 1 ? 'Smart Integrations' : 'Automated Workflows'}
              </h4>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#ccc' }}>
                {i === 1
                  ? 'Connect Storely with your favorite platforms in seconds.'
                  : 'Trigger actions and insights without lifting a finger.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
