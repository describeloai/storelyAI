'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import styles from './ChamaCarousel.module.css'

const chamas = [
  {
    name: 'NOVA',
    role: 'Product Analyzer',
    description: 'Discovers trends, competitor prices, and tells you if your product is already being sold.',
    video: '/videos/nova.webm',
    poster: '/posters/nova.jpg',
  },
  {
    name: 'LUX',
    role: 'Copywriting Assistant',
    description: 'Creates compelling descriptions and ad texts for your products, instantly.',
    video: '/videos/lux.webm',
    poster: '/posters/lux.jpg',
  },
  {
    name: 'ZENO',
    role: 'Store Tracker',
    description: 'Analyzes your store’s performance and gives you smart suggestions with AI.',
    video: '/videos/zeno.webm',
    poster: '/posters/zeno.jpg',
  },
  {
    name: 'KAI',
    role: 'Chatbot Expert',
    description: 'Interacts with customers on your store, answering FAQs and boosting conversions.',
    video: '/videos/kai.webm',
    poster: '/posters/kai.jpg',
  },
  {
    name: 'VEGA',
    role: 'Visual AI Stylist',
    description: 'Enhances product images and recommends visual improvements based on trends.',
    video: '/avatars/vega.mp4',
    poster: '/posters/vega.jpg',
  },
  {
    name: 'ORION',
    role: 'Content Planner',
    description: 'Suggests daily ideas for social media, email campaigns and banners.',
    video: '/avatars/orion.mp4',
    poster: '/posters/orion.jpg',
  },
]

export default function ChamaTeamSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section style={{ backgroundColor: '#0d011f', padding: '6rem 1rem', position: 'relative' }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '3.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          lineHeight: 1.2,
          marginBottom: '3rem',
          background: 'linear-gradient(to right, #ffffff, #888888)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Meet your Chama team.
      </h2>

      <div className={styles.embla}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.container}>
            {chamas.map((chama, index) => (
              <div className={styles.slide} key={index}>
                <div
                  className={styles.card}
                  style={{
                    aspectRatio: '2 / 3', // Mantiene proporción vertical
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '1rem',
                  }}
                >
                  <video
                    src={chama.video}
                    poster={chama.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className={styles.textBlock}>
                  <h3>{chama.name}</h3>
                  <p className={styles.role}>{chama.role}</p>
                  <p className={styles.desc}>{chama.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.prev} onClick={scrollPrev}>‹</button>
        <button className={styles.next} onClick={scrollNext}>›</button>
      </div>
    </section>
  )
}