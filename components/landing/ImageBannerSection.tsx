'use client'

import Image from 'next/image'

export default function ImageBannerSection() {
  return (
    <section className="image-banner-section">
      <div className="image-floating-wrapper">
        <Image
          src="/images/banner-grande.png" // Asegúrate de que exista esta imagen
          alt="Banner principal"
          fill
          priority
          className="banner-image"
        />
      </div>

      <style jsx>{`
        .image-banner-section {
          width: 100%;
          background-color: #000;
          padding: 6rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-floating-wrapper {
          position: relative;
          width: 100%;
          max-width: 1400px;
          aspect-ratio: 16 / 9;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(255, 255, 255, 0.05);
          transform: translateY(-2rem);
        }

        .banner-image {
          object-fit: cover;
        }
      `}</style>
    </section>
  )
}
