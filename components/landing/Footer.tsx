'use client'

import CustomTrustpilotWidget from '@/components/common/CustomTrustpilotWidget'
import TrustpilotWidget from '@/components/landing/TrustpilotWidget'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #eaeaea',
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      {/* Content Grid */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Legal + Trustpilot Section (izquierda) */}
        <div style={{ flex: '1 1 360px', minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={headingStyle}>Legal</h4>
          <ul style={listStyle}>
            <li><a href="/privacy-policy" style={linkStyle}>Privacy Policy</a></li>
            <li><a href="/terms" style={linkStyle}>Terms and Conditions</a></li>
            <li><a href="/refund-policy" style={linkStyle}>Refund Policy</a></li>
            <li><a href="/money-back" style={linkStyle}>Money-Back Guarantee</a></li>
            <li><a href="/legal" style={linkStyle}>Other Policies</a></li>
          </ul>

          {/* Widgets */}
          <div style={{ marginTop: '2rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CustomTrustpilotWidget />
            <TrustpilotWidget />
          </div>
        </div>

        {/* Espacio derecho libre o para expansión futura */}
        <div style={{ flex: '1 1 300px', minWidth: 240 }} />
      </div>

      {/* Copyright */}
      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
        © {new Date().getFullYear()} StorelyAI. All rights reserved.
      </div>
    </footer>
  )
}

const headingStyle = {
  marginBottom: '1rem',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#111',
}

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  lineHeight: '2',
}

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '0.95rem',
  transition: 'color 0.3s ease',
}
