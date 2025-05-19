'use client'

import { useRouter } from 'next/navigation'

export default function NewCTA() {
  const router = useRouter()

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '6rem' }}>
      <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.5rem' }}>
        Ready to growth your business?
      </h2>

      <button
        onClick={() => router.push('/dashboard')}
        style={{
          backgroundColor: '#6f3ff5',
          color: 'white',
          padding: '1rem 2.5rem',
          borderRadius: '9999px',
          border: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Get started
      </button>
    </div>
  )
}
