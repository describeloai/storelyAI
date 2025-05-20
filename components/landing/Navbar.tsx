'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

const colors = [
  '#FF784F', // Naranja mandarina
  '#9B59B6', // Púrpura orquídea
  '#FF6F61', // Coral rosado
  '#1DA1F2', // Azul camaleón
  '#F6E27F', // Amarillo arena
  '#228B22', // Verde bosque
]

export default function NewNavbar() {
  const router = useRouter()
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)

  const handleClick = (callback: () => void) => {
    setMenuOpen(false)
    callback()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

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
        <Link href="/precios" className="nav-link">Pricing</Link>

        {user ? (
          <>
            <button className="dashboard-button" onClick={() => router.push('/dashboard')}>
              Dashboard
            </button>
            <SignOutButton>
              <button className="nav-link">Log Out</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => router.push('/sign-in')}>Sign In</button>
            <button
              className="chameleon-button"
              onClick={() => router.push('/sign-up')}
              style={{ backgroundColor: colors[colorIndex] }}
            >
              Get Started
            </button>
          </>
        )}
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/precios" onClick={() => setMenuOpen(false)}>Pricing</Link>

          {user ? (
            <>
              <button onClick={() => handleClick(() => router.push('/dashboard'))}>Dashboard</button>
              <SignOutButton>
                <button onClick={() => setMenuOpen(false)}>Log Out</button>
              </SignOutButton>
            </>
          ) : (
            <>
              <button onClick={() => handleClick(() => router.push('/sign-in'))}>Sign In</button>
              <button
                onClick={() => handleClick(() => router.push('/sign-up'))}
                style={{
                  backgroundColor: colors[colorIndex],
                  color: '#000',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontWeight: '600',
                }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 2rem;
          background-color: rgba(0, 0, 0, 0.6);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .logo {
          font-size: 2.1rem;
          font-weight: 900;
          text-decoration: none;
          letter-spacing: -1px;
          background: linear-gradient(to right, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .nav-link {
          color: #f3f4f6;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          transition: opacity 0.2s;
        }

        .nav-link:hover {
          opacity: 0.8;
        }

        .dashboard-button {
          background-color: #444;
          color: #fff;
          font-weight: 600;
          border: none;
          padding: 0.6rem 1.3rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .dashboard-button:hover {
          background-color: #555;
        }

        .chameleon-button {
          color: #000;
          font-weight: 600;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 1s ease;
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
