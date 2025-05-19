'use client'

import { useEffect } from 'react'

export default function Footer() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <footer style={{ background: '#fff', padding: '3rem 2rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem', fontWeight: 500 }}>© {new Date().getFullYear()} StorelyAI</p>

      <div
        className="trustpilot-widget"
        data-locale="es-ES"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="682b2addfe7a18bd7cb2e929"
        data-style-height="52px"
        data-style-width="100%"
        data-theme="light"
      >
        <a href="https://www.trustpilot.com/review/storelyai.com" target="_blank" rel="noopener">
          Trustpilot
        </a>
      </div>
    </footer>
  )
}
