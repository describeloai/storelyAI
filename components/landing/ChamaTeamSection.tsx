'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import styles from './ChamaCarousel.module.css'

const chamas = [
  {
    name: 'NOVA',
    role: 'Product Analyzer',
    description: 'Discovers trends, competitor prices, and tells you if your product is already being sold.',
    image: '/avatars/nova.png',
  },
  {
    name: 'LUX',
    role: 'Copywriting Assistant',
    description: 'Creates compelling descriptions and ad texts for your products, instantly.',
    image: '/avatars/lux.png',
  },
  {
    name: 'ZENO',
    role: 'Store Tracker',
    description: 'Analyzes your store’s performance and gives you smart suggestions with AI.',
    image: '/avatars/zeno.png',
  },
  {
    name: 'KAI',
    role: 'Chatbot Expert',
    description: 'Interacts with customers on your store, answering FAQs and boosting conversions.',
    image: '/avatars/kai.png',
  },
  {
    name: 'VEGA',
    role: 'Visual AI Stylist',
    description: 'Enhances product images and recommends visual improvements based on trends.',
    image: '/avatars/vega.png',
  },
  {
    name: 'ORION',
    role: 'Content Planner',
    description: 'Suggests daily ideas for social media, email campaigns and banners.',
    image: '/avatars/orion.png',
  },
]

export default function ChamaTeamSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section style={{ backgroundColor: '#0d011f', padding: '4rem 1rem', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'white', marginBottom: '2rem' }}>
      Meet your Chama team.
      </h2>

      <div className={styles.embla}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.container}>
            {chamas.map((chama, index) => (
              <div className={styles.slide} key={index}>
                <div className={styles.card}>
                  <Image src={chama.image} alt={chama.name} width={180} height={180} style={{ marginBottom: '0' }} />
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
