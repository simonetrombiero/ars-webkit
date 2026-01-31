import React, { useState } from "react";
import { COMPONENTS } from "./components";

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, sans-serif",
    background: "#111",
    color: "#eee",
  },
  nav: {
    flex: "0 0 auto",
    padding: "0.75rem 1.5rem",
    borderBottom: "1px solid #333",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  navTitle: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#888",
    marginRight: "0.5rem",
  },
  navLinks: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  navLink: {
    padding: "0.4rem 0.75rem",
    borderRadius: "6px",
    fontSize: "0.8125rem",
    background: "transparent",
    color: "#aaa",
    border: "1px solid #333",
    cursor: "pointer",
    textDecoration: "none",
  },
  navLinkActive: {
    background: "#333",
    color: "#fff",
    borderColor: "#444",
  },
  content: {
    flex: "1 1 auto",
    minHeight: 0,
  },
};

export function App() {
  const [selectedId, setSelectedId] = useState<string>(COMPONENTS[0]?.id ?? "");

  const selected = COMPONENTS.find((c) => c.id === selectedId);
  const TestPage = selected?.TestPage;

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.navTitle}>Componenti</span>
        <div style={styles.navLinks}>
          {COMPONENTS.map((c) => (
            <button
              key={c.id}
              type="button"
              style={{
                ...styles.navLink,
                ...(c.id === selectedId ? styles.navLinkActive : {}),
              }}
              onClick={() => setSelectedId(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>
      <main style={styles.content}>
        {TestPage ? <TestPage /> : <p style={{ padding: "2rem" }}>Nessun componente selezionato.</p>}
      </main>
    </div>
  );
}
