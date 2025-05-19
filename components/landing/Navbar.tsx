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
    <header className="navbar">
      <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
        Storely
      </Link>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

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

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: transparent;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .logo {
          text-decoration: none;
          color: #fff;
          font-weight: bold;
          font-size: 1.5rem;
        }

        nav a,
        nav button,
        .mobile-menu button {
          color: #fff;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 1rem;
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .menu-toggle span {
          width: 24px;
          height: 2px;
          background-color: #fff;
          display: block;
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
