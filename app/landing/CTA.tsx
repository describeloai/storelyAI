'use client'
import { useRouter } from 'next/navigation'

export default function NewCTA() {
  const router = useRouter()

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        onClick={() => router.push('/dashboard')}
        style={{
          backgroundColor: '#6f3ff5',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '9999px',
          border: 'none',
          fontSize: '1rem'
        }}
      >
        Go to Dashboard
      </button>
    </div>
  )
}
