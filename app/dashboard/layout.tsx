'use client';

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Pantallas menores a 768px
    };

    handleResize(); // Llamarlo al cargar

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #a78bfa, #ffffff)", // Gradiente morado a blanco
      }}
    >
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          flexGrow: 1,
          padding: "2rem",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        {/* Botón hamburguesa */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            style={{
              backgroundColor: "#9F7AEA",
              color: "white",
              border: "none",
              padding: "0.8rem 1.2rem",
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginBottom: "2rem",
              display: "inline-block",
            }}
          >
            ☰
          </button>
        )}

        {/* Contenido de la página */}
        {children}
      </div>
    </div>
  );
}
