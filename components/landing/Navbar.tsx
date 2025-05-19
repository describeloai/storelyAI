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

      {/* Botón Hamburguesa */}
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
        aria-label="Toggle navigation"
      >
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#fff' }} />
      </button>

      {/* Navegación */}
      <nav className={`nav-items ${menuOpen ? 'open' : ''}`}>
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
      </nav>

      {/* CSS interno responsivo */}
      <style jsx>{`
        nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        nav a,
        nav button {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          nav.nav-items {
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

          nav.nav-items a,
          nav.nav-items button {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </header>
  )
}
