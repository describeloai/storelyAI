'use client'

export default function IntegrationSection() {
  return (
    <section className="integration-section">
      <div className="container">
        {/* Imagen decorativa a la izquierda en desktop, abajo en móvil */}
        <div className="image-placeholder" />

        {/* Texto + grilla */}
        <div className="text-content">
          <h2 className="section-title">Powerful Integrations.</h2>
          <p>
            StorelySync connects your favorite tools — Shopify, Amazon, Notion, Gmail, and more — with AI-powered automation through a smart, chat-based interface. One conversation, endless possibilities.
          </p>

          <div className="integration-logos-grid">
            <img src="/logos/shopify-white.png" alt="Shopify" />
            <img src="/logos/woocommerce-white.png" alt="WooCommerce" />
            <img src="/logos/gmail.png" alt="Gmail" />
            <img src="/logos/meta.png" alt="Meta" />
            <img src="/logos/amazon.png" alt="Amazon" />
            <img src="/logos/notion.png" alt="Notion" />
            <img src="/logos/drive.png" alt="Google Drive" />
            <img src="/logos/instagram.png" alt="Instagram" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .integration-section {
          width: 100%;
          background-color: #000;
          padding: 6rem 2rem;
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
          min-height: 640px;
          gap: 5rem;
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

        .section-title {
          font-size: 3.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-content p {
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          color: #d1d5db;
          line-height: 1.75;
        }

        .integration-logos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          justify-items: center;
          align-items: center;
        }

        .integration-logos-grid img {
          height: 50px;
          max-width: 100%;
          opacity: 0.85;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .integration-logos-grid img:hover {
          transform: scale(1.08);
          opacity: 1;
        }

        @media (max-width: 900px) {
          .container {
            flex-direction: column-reverse;
            gap: 3rem;
          }

          .text-content {
            text-align: center;
            align-items: center;
          }

          .section-title {
            font-size: 2.3rem;
          }

          .integration-logos-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 1.5rem 1rem;
            width: 100%;
            max-width: 500px;
            margin-top: 1.5rem;
          }

          .integration-logos-grid img {
            height: 44px;
          }

          .image-placeholder {
            width: 100%;
            height: 240px;
          }
        }
      `}</style>
    </section>
  )
}
