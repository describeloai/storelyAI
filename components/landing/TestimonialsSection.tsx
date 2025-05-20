'use client'

import Image from 'next/image'

const reviews = [
  {
    text: 'StorelyAI saves me hours by automating product descriptions. Absolutely game-changing.',
    author: 'Ana P., España',
  },
  {
    text: 'The Chamas are like having an expert team always one step ahead — giving me ideas, fixing blind spots, and keeping my store on track without stress.',
    author: 'Carlos M., México',
  },
  {
    text: 'StorelySync saved me hours, I connected Notion and had my content automation up and running in minutes.',
    author: 'Lucía R., Argentina',
  },
  {
    text: 'I trusted the Chamas with my campaigns, and they delivered. They optimized everything behind the scenes while I focused on growing my business.',
    author: 'Marco D., Colombia',
  },
]

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
        What our users are saying.
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
        {reviews.map((review, i) => (
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
                  display: 'flex',
                  gap: '0.4rem',
                  marginBottom: '1rem',
                }}
              >
                {[...Array(5)].map((_, idx) => (
                  <Image
                    key={idx}
                    src="/trustpilot-star-full.svg"
                    alt="Star"
                    width={24}
                    height={24}
                  />
                ))}
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
