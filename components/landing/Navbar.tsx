'use client'

import { useState, useEffect } from 'react'
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

  // Define the vibrant blue-white color for the 'Get Started' button
  const getStartedButtonColor = '#E0FFFF'; // A light, vibrant blue-white (like Azure or LightCyan)

  // The specified mist color (now applied to the new button color)
  const getStartedButtonMist = 'rgba(255, 255, 200, 0.35)';

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
              style={{
                backgroundColor: getStartedButtonColor, // New button color
                boxShadow: `0 0 15px ${getStartedButtonMist}, inset 0 0 8px ${getStartedButtonMist}` // Mist effect
              }}
            >
              GET STARTED
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
                style={{
                  backgroundColor: getStartedButtonColor, // New button color
                  boxShadow: `0 0 15px ${getStartedButtonMist}, inset 0 0 8px ${getStartedButtonMist}`
                }}
              >
                GET STARTED
              </button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        /* Import a suitable font. For 'Montserrat', you might need to add it to your _document.js or directly in a global CSS file or via @import. */
        /* For demonstration, assuming Montserrat is available or will be imported. */
        /* @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&display=swap'); */
        /* Added 500 weight for a more discreet look */

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
          transition: color 0.2s ease; /* Changed transition to only affect color */
          display: inline-block;
        }

        .nav-link:hover {
          background-color: transparent; /* No background change on hover */
          color: #A9A9A9 !important; /* Darker gray for hover */
        }

        .get-started-button {
          color: #000; /* Text color for the button */
          font-weight: 500; /* More discreet font weight (e.g., Medium) */
          font-size: 0.95rem; /* Smaller font size for discreteness */
          padding: 0.6rem 1.2rem; /* Much smaller padding for a smaller button */
          border-radius: 10px; /* Rounded corners, slightly adjusted */
          border: none;
          font-family: 'Montserrat', sans-serif; /* Modern font, but with a lighter weight */
          letter-spacing: 0.5px; /* Reduced letter spacing for discreteness */
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          text-transform: uppercase;
        }

        /* Adding a subtle hover effect for the mist */
        .get-started-button:hover {
          box-shadow: 0 0 20px ${getStartedButtonMist}, inset 0 0 10px ${getStartedButtonMist}; /* Slightly refined mist effect on hover */
          transform: translateY(-1px); /* Slight lift on hover, smaller than before */
          filter: brightness(1.05); /* Slightly brighter on hover, less intense */
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
          transition: color 0.2s ease; /* Changed transition to only affect color */
        }

        .mobile-button:hover {
          background-color: transparent; /* No background change on hover */
          color: #A9A9A9 !important; /* Darker gray for hover */
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