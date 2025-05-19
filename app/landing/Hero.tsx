export default function NewHero() {
  return (
    <section
      style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#f3f4f6',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // aquí va al top
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '900px', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          Transform your ecommerce with Artificial Intelligence.
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
          Optimize your business with our team of Chamas.
        </p>
      </div>
    </section>
  )
}
