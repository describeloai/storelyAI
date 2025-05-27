'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const colors = [
  '#FF784F', // Naranja mandarina
  '#9B59B6', // Púrpura orquídea
  '#FF6F61', // Coral rosado
  '#1DA1F2', // Azul camaleón
  '#F6E27F', // Amarillo arena
  '#228B22', // Verde bosque
]

export default function NewCTA() {
  const router = useRouter()
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        backgroundColor: '#000',
        padding: '6rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <h2
        style={{
          fontSize: '3.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          lineHeight: 1.2,
          margin: 0,
          background: 'linear-gradient(to right, #ffffff, #888888)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          maxWidth: '700px',
        }}
      >
        Ready to grow your business?
      </h2>

      <button
        onClick={() => router.push('/dashboard')}
        style={{
          backgroundColor: colors[colorIndex],
          color: '#000',
          padding: '1rem 2.5rem',
          borderRadius: '9999px',
          border: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 1s ease, color 0.3s ease',
          boxShadow: '0 8px 20px rgba(255,255,255,0.1)',
        }}
      >
        Get started
      </button>
    </div>
  )
}