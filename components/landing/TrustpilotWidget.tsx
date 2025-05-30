'use client'

import { useEffect } from 'react'

export default function TrustpilotWidget() {
  useEffect(() => {
    const scriptId = 'trustpilot-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

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
