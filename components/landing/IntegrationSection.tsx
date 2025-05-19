'use client'

export default function IntegrationSection() {
  return (
    <section className="integration-section">
      <div className="container">
        {/* Área izquierda para imagen */}
        <div className="image-placeholder">
          {/* Aquí puedes insertar una imagen, SVG, animación, etc */}
        </div>

        {/* Área derecha con texto */}
        <div className="text-content">
          <h2>Integraciones poderosas</h2>
          <p>
            Conecta Storely con las plataformas que ya usas: Shopify, WooCommerce, y más. Automatiza y escala sin complicaciones.
          </p>

          <div className="integration-logos">
            <img src="/logos/shopify-white.png" alt="Shopify" />
            <img src="/logos/woocommerce-white.png" alt="WooCommerce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .integration-section {
          width: 100%;
          background-color: #000;
          padding: 4rem 2rem;
          color: #f3f4f6;
          display: flex;
          justify-content: center;
        }

        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          width: 100%;
          min-height: 600px; /* 2.5x altura original aprox */
          gap: 4rem;
        }

        .image-placeholder {
          flex: 1;
          height: 100%;
          background-color: #111;
          border-radius: 1rem;
          opacity: 0.3;
        }

        .text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .text-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .text-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #d1d5db;
        }

        .integration-logos {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .integration-logos img {
          height: 50px;
          opacity: 0.8;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .integration-logos img:hover {
          transform: scale(1.05);
          opacity: 1;
        }

        @media (max-width: 900px) {
          .container {
            flex-direction: column;
            min-height: auto;
            gap: 2rem;
          }

          .image-placeholder {
            width: 100%;
            height: 250px;
          }

          .text-content {
            text-align: center;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}
