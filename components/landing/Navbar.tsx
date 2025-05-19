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
        <Link href="/precios" className="nav-link">Precios</Link>

        {user ? (
          <>
            <button className="dashboard-button" onClick={() => router.push('/dashboard')}>
              Dashboard
            </button>
            <SignOutButton>
              <button className="nav-link">Cerrar sesión</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => router.push('/sign-in')}>Acceder</button>
            <button className="nav-link" onClick={() => router.push('/sign-up')}>Registrarse</button>
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
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.5px;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-link {
          color: #fff;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }

        .dashboard-button {
          background-color: #6a0dad; /* morado elegante */
          color: #fff;
          font-weight: 600;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .dashboard-button:hover {
          background-color: #57108a;
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
