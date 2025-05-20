'use client'

import { useEffect, useState } from 'react'

export default function TrustpilotWidget() {
  const [canRenderWidget, setCanRenderWidget] = useState(true)

  useEffect(() => {
    try {
      // Detecta si está embebido y sandbox bloquea scripts
      if (window.self !== window.top) {
        const frame = window.frameElement as HTMLIFrameElement | null
        if (frame?.sandbox && !frame.sandbox.contains('allow-scripts')) {
          setCanRenderWidget(false)
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
