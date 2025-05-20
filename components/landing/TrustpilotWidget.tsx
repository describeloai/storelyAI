'use client'

import { useEffect, useRef } from 'react'

export default function TrustpilotWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Carga dinámica del script
    const script = document.createElement('script')
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    script.async = true

    if (containerRef.current) {
      containerRef.current.innerHTML = '' // Evita duplicados
      containerRef.current.appendChild(script)
    }

    return () => {
      // Limpieza opcional
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="682b2addfe7a18bd7cb2e929"
        data-style-height="52px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://www.trustpilot.com/review/storelyai.com"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </div>
  )
}
