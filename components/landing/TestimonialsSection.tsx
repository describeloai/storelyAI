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
    <section className="testimonials-section">
      <h2 className="testimonials-title">What our users are saying.</h2>

      <div className="testimonials-grid">
        {reviews.map((review, i) => (
          <div className="testimonial-card" key={i}>
            <div className="stars">
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
            <p className="review-text">{review.text}</p>
            <p className="review-author">– {review.author}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .testimonials-section {
          background: #000;
          padding: 6rem 2rem;
          color: #fff;
        }

        .testimonials-title {
          text-align: center;
          font-size: 3.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.2;
          margin-bottom: 4rem;
          background: linear-gradient(to right, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .testimonial-card {
          background-color: #111;
          padding: 2rem;
          border-radius: 1.2rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stars {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .review-text {
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .review-author {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #aaa;
        }

        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
