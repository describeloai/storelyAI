'use client'

export default function ChamaFeatureSection() {
  return (
    <section
      style={{
        backgroundColor: '#0d011f',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradiente flotante hacia el negro */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, rgba(13,1,31,0) 0%, #000 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 🧠 Título principal */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '3.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          lineHeight: 1.2,
          marginBottom: '4rem',
          background: 'linear-gradient(to right, #ffffff, #888888)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 2,
          position: 'relative',
        }}
      >
        One AI. Infinite capabilities.
      </h2>

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
          position: 'relative',
          zIndex: 2,
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
            One Chama. Infinite Possibilities.
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ccc' }}>
            Each Storely module is more than smart, it’s designed to understand your business, automate complete workflows, and improve with every interaction. From analyzing your catalog to generating content and insights, the Chamas think, act, and evolve. The more you share, the better they perform.
          </p>
        </div>
      </div>

      {/* 🔻 GRID DE 6 CARDS DEBAJO */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '4rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {[
          {
            title: 'Smart Integrations',
            desc: 'Connect Storely with your favorite platforms in seconds.',
            img: '/placeholders/card1.png',
          },
          {
            title: 'Automated Workflows',
            desc: 'Trigger actions and insights without lifting a finger.',
            img: '/placeholders/card2.png',
          },
          {
            title: 'Data-Driven Copy',
            desc: 'Generate product texts based on real analytics.',
            img: '/placeholders/card3.png',
          },
          {
            title: 'Customer Insights',
            desc: 'Understand behavior and improve decision making.',
            img: '/placeholders/card4.png',
          },
          {
            title: 'Visual Optimization',
            desc: 'Let AI pick the best images and layouts for your brand.',
            img: '/placeholders/card5.png',
          },
          {
            title: '24/7 Assistance',
            desc: 'Chamas work while you sleep, ensuring full coverage.',
            img: '/placeholders/card6.png',
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#1e1833',
              borderRadius: '1.5rem',
              height: '480px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div style={{ padding: '1.5rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'white' }}>{card.title}</h4>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#ccc' }}>{card.desc}</p>
            </div>
            <div
              style={{
                flex: 1,
                backgroundImage: `url('${card.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderBottomLeftRadius: '1.5rem',
                borderBottomRightRadius: '1.5rem',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
