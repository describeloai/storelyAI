'use client'

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#000', padding: '6rem 2rem', color: '#fff' }}>
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
        }}
      >
        Qué opinan nuestros usuarios
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {[ 
          {
            stars: '★★★★★',
            text: 'StorelyAI me ahorra horas automatizando las descripciones. Brutal.',
            author: 'Ana P., España',
          },
          {
            stars: '★★★★★',
            text: 'Conecté mi tienda Shopify y al día siguiente ya tenía 3 mejoras aplicadas con IA.',
            author: 'Carlos M., México',
          },
          {
            stars: '★★★★★',
            text: 'Gracias a StorelySync pude integrar Notion y automatizar el contenido en minutos.',
            author: 'Lucía R., Argentina',
          },
          {
            stars: '★★★★★',
            text: 'Las recomendaciones de los Chamas me ayudaron a optimizar mis campañas sin tocar nada.',
            author: 'Marco D., Colombia',
          },
        ].map((review, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#111',
              padding: '2rem',
              borderRadius: '1.2rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease',
            }}
          >
            <div>
              <div
                style={{
                  color: '#00b67a',
                  fontSize: '1.3rem',
                  marginBottom: '0.75rem',
                }}
              >
                {review.stars}
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{review.text}</p>
            </div>
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '0.9rem',
                color: '#aaa',
              }}
            >
              – {review.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
