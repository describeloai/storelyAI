'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

export default function NewNavbar() {
  const router = useRouter()
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo */}
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

      {/* Hamburguesa solo en móvil */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        className="menu-toggle"
      >
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }}></span>
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }}></span>
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }}></span>
      </button>

      {/* Navegación */}
      <nav
        className={`nav-items ${menuOpen ? 'open' : ''}`}
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
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

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          .nav-items {
            display: ${menuOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 1rem;
            background-color: #15102b;
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            gap: 1rem;
            z-index: 999;
          }

          .nav-items a,
          .nav-items button {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </header>
  )
}
