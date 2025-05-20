'use client'

import TrustpilotWidget from '@/components/landing/TrustpilotWidget'


export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #eaeaea',
        padding: '4rem 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem',
      }}
    >
      {/* Legal Section */}
      <div style={{ flex: '1 1 200px', minWidth: 180 }}>
        <h4 style={headingStyle}>Legal</h4>
        <ul style={listStyle}>
          <li><a href="/privacy-policy" style={linkStyle}>Privacy Policy</a></li>
          <li><a href="/terms" style={linkStyle}>Terms and Conditions</a></li>
          <li><a href="/refund-policy" style={linkStyle}>Refund Policy</a></li>
          <li><a href="/money-back" style={linkStyle}>Money-Back Guarantee</a></li>
          <li><a href="/legal" style={linkStyle}>Other Policies</a></li>
        </ul>
      </div>

      {/* Trustpilot Widget */}
      <div style={{ flex: '1 1 300px', minWidth: 240 }}>
        <TrustpilotWidget />
      </div>

      {/* Copyright */}
      <div style={{ flex: '1 1 100%', textAlign: 'center', marginTop: '3rem' }}>
        <p style={copyright}>
          © {new Date().getFullYear()} StorelyAI. All rights reserved.
        </p>
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

const copyright = {
  fontSize: '0.9rem',
  color: '#888',
}
