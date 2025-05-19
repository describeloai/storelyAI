'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

export default function NewNavbar() {
  const router = useRouter()
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (callback: () => void) => {
    setMenuOpen(false)
    callback()
  }

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
      <Link
        href="/"
        style={{
          textDecoration: 'none',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
        onClick={() => setMenuOpen(false)}
      >
        Storely
      </Link>

      {/* Menú hamburguesa móvil */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-toggle"
        style={{
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Toggle menu"
      >
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
      </button>

      {/* Navegación visible solo en desktop */}
      <nav className="nav-desktop">
        <Link href="/precios">Precios</Link>

        {user ? (
          <>
            <button onClick={() => router.push('/dashboard')}>Dashboard</button>
            <SignOutButton>
              <button>Cerrar sesión</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <button onClick={() => router.push('/sign-in')}>Acceder</button>
            <button onClick={() => router.push('/sign-up')}>Registrarse</button>
          </>
        )}
      </nav>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/precios" onClick={() => setMenuOpen(false)}>Precios</Link>

          {user ? (
            <>
              <button onClick={() => handleClick(() => router.push('/dashboard'))}>Dashboard</button>
              <SignOutButton>
                <button onClick={() => setMenuOpen(false)}>Cerrar sesión</button>
              </SignOutButton>
            </>
          ) : (
            <>
              <button onClick={() => handleClick(() => router.push('/sign-in'))}>Acceder</button>
              <button onClick={() => handleClick(() => router.push('/sign-up'))}>Registrarse</button>
            </>
          )}
        </div>
      )}

      {/* Estilos */}
      <style jsx>{`
        nav a,
        nav button {
          color: #fff;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 1rem;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          right: 1rem;
          background-color: #15102b;
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
          z-index: 999;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          .nav-desktop {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
