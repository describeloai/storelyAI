'use client'

import { useEffect, useState } from 'react'

// Declaración de tipo global para evitar errores de TypeScript
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, flag: boolean) => void
    }
  }
}

export default function TrustpilotWidget() {
  const [canRenderWidget, setCanRenderWidget] = useState(true)

  useEffect(() => {
    try {
      // Evita renderizar si está embebido en un iframe sin allow-scripts
      if (window.self !== window.top) {
        const frame = window.frameElement as HTMLIFrameElement | null
        if (frame?.sandbox && !frame.sandbox.contains('allow-scripts')) {
          setCanRenderWidget(false)
          return
        }
      }

      const scriptId = 'trustpilot-script'
      const existingScript = document.getElementById(scriptId)

      if (!existingScript) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
        script.async = true
        script.onload = () => {
          // Forzar inicialización tras carga del script
          if (window.Trustpilot) {
            window.Trustpilot.loadFromElement(document.body, true)
          }
        }
        document.body.appendChild(script)
      } else {
        // Si ya existe el script, aún así forzamos la carga del widget
        if (window.Trustpilot) {
          window.Trustpilot.loadFromElement(document.body, true)
        }
      }

    } catch {
      setCanRenderWidget(false)
    }
  }, [])

  if (!canRenderWidget) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
        <a
          href="https://www.trustpilot.com/review/storelyai.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: 500,
            display: 'inline-block',
          }}
        >
          ★ Trustpilot — See our reviews
        </a>
      </div>
    )
  }

  return (
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
  )
}
