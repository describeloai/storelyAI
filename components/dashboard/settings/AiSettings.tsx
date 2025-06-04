"use client";

import { useEffect, useState } from "react";
import { Check, Ban, FileText } from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";
import { useUser } from "@clerk/nextjs"; // <--- ¡Importamos useUser de Clerk!

const ASSISTANTS = [
  { id: "sofia", name: "Sofía", color: "#bb86fc" },
  { id: "tariq", name: "Tariq", color: "#fbbc04" },
  { id: "ciro", name: "Ciro", color: "#4285f4" },
  { id: "thalia", name: "Thalia", color: "#ff4081" },
  { id: "echo", name: "Echo", color: "#34a853" },
  { id: "mara", name: "Mara", color: "#9c27b0" },
];

export default function AiSettings() {
  const { darkMode } = useDarkMode();
  const { user, isLoaded } = useUser(); // <--- ¡Obtenemos el usuario y el estado de carga de Clerk!

  // El userId ahora será el del usuario autenticado
  const [assistantId, setAssistantId] = useState("sofia");
  const [tone, setTone] = useState("friendly");
  const [brainItems, setBrainItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect para cargar los ajustes del asistente y los items del brain
  useEffect(() => {
    // Solo hacemos fetch si el usuario está cargado y autenticado
    if (!isLoaded || !user?.id) {
      setLoading(false);
      return; // No hay usuario, no se pueden cargar los datos
    }

    const currentUserId = user.id; // Usamos el ID del usuario actual de Clerk

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch de los ajustes del asistente (si existen)
        const settingsRes = await fetch(`/api/assistant-settings?userId=${currentUserId}&assistantId=${assistantId}`);
        const settings = await settingsRes.json();
        setTone(settings.tone || "friendly");

        // Fetch de los items del brain para las restricciones
        // Asegúrate de que /api/brain-access maneje el userId y assistantId en la URL
        const brainRes = await fetch(`/api/brain-access?userId=${currentUserId}&assistantId=${assistantId}`); // <--- ¡userId en la URL!
        const data = await brainRes.json();
        setBrainItems(data);
      } catch (err) {
        console.error("Error loading data:", err);
        setBrainItems([]); // Vaciar en caso de error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [assistantId, isLoaded, user?.id]); // <--- ¡Añadimos isLoaded y user?.id como dependencias!

  // useEffect para actualizar el tono del asistente
  useEffect(() => {
    // Solo enviamos el PATCH si los datos iniciales han cargado y el usuario está disponible
    if (!loading && isLoaded && user?.id) {
      fetch("/api/assistant-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, assistantId, tone }), // <--- ¡userId real!
      });
    }
  }, [tone, assistantId, loading, isLoaded, user?.id]); // Añadimos dependencias

  const filteredItems = brainItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentAssistant = ASSISTANTS.find((a) => a.id === assistantId);

  // Manejo de carga o no autenticación al inicio del render
  if (!isLoaded) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: darkMode ? "#fff" : "#111" }}>
        Cargando configuración de IA...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: darkMode ? "#fff" : "#111" }}>
        Por favor, inicia sesión para configurar tus asistentes de IA.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "100%",
        maxHeight: "calc(100vh - 100px)",
        color: darkMode ? "#fff" : "#111",
      }}
    >
      {/* Tone */}
      <div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Assistant tone</h3>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontWeight: 500,
          }}
        >
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="playful">Playful</option>
          <option value="direct">Direct</option>
        </select>
      </div>

      {/* Brain Access */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Brain Content Restrictions</h3>

        <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
          {ASSISTANTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAssistantId(a.id)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                background: darkMode ? "#111" : "#f3f3f3",
                border: assistantId === a.id ? `2px solid ${a.color}` : "1px solid #444",
                color: darkMode ? "#fff" : "#000",
                fontWeight: 500,
              }}
            >
              {a.name}
            </button>
          ))}
        </div>

        <input
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            background: darkMode ? "#111" : "#fff",
            border: "1px solid #333",
            borderRadius: "6px",
            color: darkMode ? "#fff" : "#111",
            marginBottom: "0.75rem",
          }}
        />

        <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.25rem" }}>
          {loading ? (
            <p style={{ textAlign: "center", color: darkMode ? "#aaa" : "#888" }}>
              Cargando items del brain...
            </p>
          ) : filteredItems.length === 0 ? (
            <p style={{ textAlign: "center", color: darkMode ? "#aaa" : "#888" }}>
              No se encontraron items del brain con estos filtros o para este asistente.
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: darkMode ? "#1e1e1e" : "#f5f5f5",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileText size={18} />
                  <span>{item.title}</span>
                </div>

                <button
                  onClick={async () => {
                    const updated = [...brainItems];
                    const index = updated.findIndex((i) => i.id === item.id);
                    updated[index].allowed = !item.allowed;
                    setBrainItems(updated);

                    // Asegúrate de que el backend /api/brain-access (PATCH) use userId real
                    await fetch("/api/brain-access", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: user.id, // <--- ¡userId real!
                        assistantId,
                        itemId: item.id,
                        allowed: updated[index].allowed,
                      }),
                    });
                  }}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: item.allowed ? "#33cc3322" : "#cc333322",
                    color: item.allowed ? "#33cc33" : "#cc3333",
                    borderRadius: "6px",
                    border: "1px solid #444",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {item.allowed ? <Check size={16} /> : <Ban size={16} />}
                  {item.allowed ? "Allow" : "Restrict"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}