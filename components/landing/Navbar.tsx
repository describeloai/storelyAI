"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";
import AuthAwareButton from "@/components/landing/AuthAwareButton";
import FeatherIcon from "@/components/landing/FeatherIcon";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTrigger = window.innerHeight * 0.6;
      setIsScrolled(window.scrollY > scrollTrigger);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = isScrolled ? 1.08 : 1.02;
  const logoSize = isScrolled ? 80 : 70;
  const fontSize = isScrolled ? "1.90rem" : "1.73rem";

  return (
    <motion.nav
      role="navigation"
      aria-label="Menú principal"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: isScrolled ? "1.4rem 3rem" : "1.2rem 2.5rem",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        transform: `scale(${scale})`,
        transition: "all 0.35s ease",
        boxSizing: "border-box",
      }}
    >
      {/* Logo + Texto + Link Precios */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <FeatherIcon size={logoSize} />
        <span
          className="storely-chameleon"
          style={{
            fontSize,
            fontWeight: 700,
          }}
        >
          Storely
        </span>
        <div className="nav-desktop">
          <Link
            href="#precios"
            style={{
              color: "white",
              fontWeight: 500,
              fontSize: isScrolled ? "1rem" : "0.95rem",
              marginLeft: "2rem",
              textDecoration: "none",
              transition: "all 0.4s ease",
            }}
          >
            Precios
          </Link>
        </div>
      </div>

      {/* Icono menú móvil */}
      <div className="nav-mobile" style={{ display: "none" }}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.75rem",
            cursor: "pointer",
          }}
          aria-label="Menú"
        >
          ☰
        </button>
      </div>

      {/* Acciones (desktop) */}
      <div className="nav-actions" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {!isSignedIn ? (
          <>
            <AuthAwareButton action="login">
              {(handleClick) => (
                <span
                  onClick={handleClick}
                  style={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: isScrolled ? "1rem" : "0.95rem",
                    cursor: "pointer",
                    transform: isScrolled ? "scale(1.07)" : "scale(1)",
                    transition: "all 0.4s ease",
                  }}
                >
                  Acceder
                </span>
              )}
            </AuthAwareButton>

            <AuthAwareButton action="signup">
              {(handleClick) => (
                <motion.button
                  onClick={handleClick}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: "white",
                    color: "#7b2ff7",
                    borderRadius: "999px",
                    padding: isScrolled ? "0.75rem 1.75rem" : "0.65rem 1.6rem",
                    fontWeight: 600,
                    fontSize: isScrolled ? "1rem" : "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transform: isScrolled ? "scale(1.07)" : "scale(1)",
                    transition: "all 0.4s ease",
                  }}
                >
                  Empezar ahora
                </motion.button>
              )}
            </AuthAwareButton>
          </>
        ) : (
          <>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: isScrolled ? "1rem" : "0.95rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "white",
                  color: "#7b2ff7",
                  borderRadius: "999px",
                  padding: "0.7rem 1.5rem",
                  fontWeight: 600,
                  fontSize: isScrolled ? "1rem" : "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              >
                Dashboard
              </motion.button>
            </Link>
          </>
        )}
      </div>

      {/* Menú desplegable para móviles */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "0 0 0 1rem",
          }}
        >
          <Link
            href="#precios"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Precios
          </Link>

          {!isSignedIn ? (
            <>
              <AuthAwareButton action="login">
                {(handleClick) => (
                  <span
                    onClick={() => {
                      handleClick();
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      color: "white",
                      fontWeight: 500,
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Acceder
                  </span>
                )}
              </AuthAwareButton>

              <AuthAwareButton action="signup">
                {(handleClick) => (
                  <motion.button
                    onClick={() => {
                      handleClick();
                      setIsMobileMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      backgroundColor: "white",
                      color: "#7b2ff7",
                      borderRadius: "999px",
                      padding: "0.6rem 1.4rem",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ¡Empezar Gratis!
                  </motion.button>
                )}
              </AuthAwareButton>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  signOut({ redirectUrl: "/" });
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
              <Link
                href="/dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
          .nav-mobile {
            display: block !important;
          }
          .nav-actions {
            display: none !important;
          }
        }

        .storely-chameleon {
          background: linear-gradient(
            270deg,
            #ff7eb9,
            #7afcff,
            #feff9c,
            #ffffff,
            #7b2ff7
          );
          background-size: 1000% 1000%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: chameleonShift 10s ease infinite;
        }

        @keyframes chameleonShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.nav>
  );
}
