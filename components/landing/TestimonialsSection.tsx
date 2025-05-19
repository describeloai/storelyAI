'use client'

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#000', padding: '6rem 2rem', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
        Qué opinan nuestros usuarios
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
      }}>
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ color: '#00b67a', fontSize: '1.3rem', marginBottom: '0.5rem' }}>★★★★★</div>
          <p>StorelyAI me ahorra horas automatizando las descripciones. Brutal.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>– Ana P., España</p>
        </div>

        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ color: '#00b67a', fontSize: '1.3rem', marginBottom: '0.5rem' }}>★★★★★</div>
          <p>Conecté mi tienda Shopify y al día siguiente ya tenía 3 mejoras aplicadas con IA.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>– Carlos M., México</p>
        </div>
      </div>
    </section>
  )
}
