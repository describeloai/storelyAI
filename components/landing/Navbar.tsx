'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

const colors = ['#FF784F', '#9B59B6', '#FF6F61', '#1DA1F2', '#F6E27F', '#228B22']

export default function NewNavbar() {
  const router = useRouter()
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleClick = (callback: () => void) => {
    setMenuOpen(false)
    callback()
  }

  return (
    <header className="navbar">
      <Link href="/">
        <span className="logo">Storely</span>
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
        <Link href="/precios">
          <span className="nav-link">Pricing</span>
        </Link>

        {user ? (
          <>
            <button className="nav-link" onClick={() => router.push('/dashboard')}>
              Dashboard
            </button>
            <SignOutButton>
              <button className="nav-link">Log Out</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => router.push('/sign-in')}>
              Sign In
            </button>
            <button
              className="get-started-button"
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
          <Link href="/precios">
            <span className="mobile-button">Pricing</span>
          </Link>

          {user ? (
            <>
              <button onClick={() => handleClick(() => router.push('/dashboard'))} className="mobile-button">
                Dashboard
              </button>
              <SignOutButton>
                <button onClick={() => setMenuOpen(false)} className="mobile-button">
                  Log Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <button onClick={() => handleClick(() => router.push('/sign-in'))} className="mobile-button">
                Sign In
              </button>
              <button
                onClick={() => handleClick(() => router.push('/sign-up'))}
                className="get-started-button"
                style={{ backgroundColor: colors[colorIndex] }}
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

        .logo {
          font-size: 2.4rem;
          font-weight: 900;
          color: #fff !important;
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          text-decoration: none;
          letter-spacing: -1px;
          display: inline-block;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.6rem;
        }

        .nav-link {
          color: #fff !important;
          font-weight: 600;
          font-size: 1.1rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.7rem 1.3rem;
          border-radius: 8px;
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .get-started-button {
          color: #000;
          font-weight: 700;
          font-size: 1.1rem;
          padding: 0.7rem 1.5rem;
          border-radius: 999px;
          border: none;
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          cursor: pointer;
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
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
          z-index: 999;
          min-width: 180px;
        }

        .mobile-button {
          background: none;
          color: #fff !important;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          text-align: left;
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          transition: background 0.2s ease;
        }

        .mobile-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
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
