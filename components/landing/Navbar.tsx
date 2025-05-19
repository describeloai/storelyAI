'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

export default function NewNavbar() {
  const router = useRouter()
  const { user } = useUser()

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent', // Fondo transparente
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)', // Opcional: efecto blur detrás del navbar
        WebkitBackdropFilter: 'blur(8px)', // Para compatibilidad en Safari
      }}
    >
      {/* Logo + Marca */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Storely
        </Link>
      </div>

      {/* Navegación */}
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link
          href="/precios"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Precios
        </Link>

        {user ? (
          <>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                backgroundColor: '#6f3ff5',
                color: 'white',
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Dashboard
            </button>

            <SignOutButton>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#ccc',
                  border: '1px solid #444',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                }}
              >
                Cerrar sesión
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/sign-in')}
              style={{
                backgroundColor: '#6f3ff5',
                color: 'white',
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Acceder
            </button>

            <button
              onClick={() => router.push('/sign-up')}
              style={{
                backgroundColor: 'transparent',
                color: '#ccc',
                border: '1px solid #444',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  )
}
