// app/components/CardStyles.ts

export const cardStyle = {
    borderRadius: "1rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(6px)",
    minHeight: "200px",
  };
  
  export const cardBodyStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    gap: "1.5rem",
    padding: "1.5rem",
    color: "white",
  };
  
  export const titleStyle = {
    fontWeight: "bold" as const,
    fontSize: "1.2rem",
    color: "white",
  };
  
  export const descriptionStyle = {
    fontSize: "0.95rem",
    color: "rgba(255, 255, 255, 0.8)",
  };
  