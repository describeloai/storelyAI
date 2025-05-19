'use client'

import Image from 'next/image'

export default function ImageBannerSection() {
  return (
    <section className="image-banner-section">
      <div className="image-wrapper">
        <Image
          src="/images/banner-grande.png" // Reemplaza con tu ruta real
          alt="Banner principal"
          fill
          priority
          className="banner-image"
        />
      </div>

      <style jsx>{`
        .image-banner-section {
          width: 100%;
          position: relative;
          padding: 2rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 1600px;
          aspect-ratio: 16 / 9;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .banner-image {
          object-fit: cover;
        }
      `}</style>
    </section>
  )
}
