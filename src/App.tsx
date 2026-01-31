import React, { useState, useRef, useEffect } from "react";
import { COMPONENTS } from "./components";

const styles: Record<string, React.CSSProperties> = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Montserrat', system-ui, sans-serif",
    background: "#111",
    color: "#eee",
    overflow: "hidden",
    border: "10px solid #fff",
    boxSizing: "border-box",
  },
  boxWrapper: {
    position: "fixed",
    top: "1.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.25rem 0",
    padding: "0.5rem 0.75rem",
    background: "#fff",
    border: "1px solid #fff",
    borderRadius: 0,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    minWidth: 140,
    maxWidth: 140,
    overflow: "hidden",
    transition: "max-width 0.25s ease, padding 0.25s ease",
  },
  boxExpanded: {
    maxWidth: 320,
    padding: "0.5rem 0.75rem",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    gap: "0.125rem 0",
  },
  boxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    flexShrink: 0,
    color: "#000",
    fontSize: "0.9375rem",
    fontWeight: 400,
  },
  boxArrow: {
    fontSize: "0.6rem",
    opacity: 0.9,
  },
  boxItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.4rem 0.6rem",
    border: "none",
    background: "transparent",
    color: "#000",
    fontSize: "0.8125rem",
    cursor: "pointer",
    borderRadius: 0,
    textAlign: "left",
    flexShrink: 0,
  },
  boxItemHover: {
    background: "rgba(0,0,0,0.06)",
    color: "#000",
  },
  boxItemArrow: {
    fontSize: "0.7rem",
    opacity: 0.8,
  },
  boxList: {
    paddingTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.125rem 0",
  },
  content: {
    flex: "1 1 auto",
    minHeight: 0,
    overflow: "hidden",
  },
};

export function App() {
  const [selectedId, setSelectedId] = useState<string>(COMPONENTS[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  const selected = COMPONENTS.find((c) => c.id === selectedId);
  const TestPage = selected?.TestPage;

  return (
    <div style={styles.app}>
      <div
        style={styles.boxWrapper}
        onMouseEnter={() => mountedRef.current && setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setHoveredId(null);
        }}
      >
        <div
          style={{
            ...styles.box,
            ...(expanded ? styles.boxExpanded : {}),
          }}
        >
          <span style={styles.boxLabel}>
            Components
            <span style={styles.boxArrow}>▼</span>
          </span>
          {expanded && (
            <div style={styles.boxList}>
              {COMPONENTS.map((c) => (
              <button
                key={c.id}
                type="button"
                style={{
                  ...styles.boxItem,
                  ...(c.id === selectedId || c.id === hoveredId
                    ? styles.boxItemHover
                    : {}),
                }}
                onClick={() => setSelectedId(c.id)}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span style={styles.boxItemArrow} aria-hidden>
                  ↗
                </span>
                {c.name}
              </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <main style={styles.content}>
        {TestPage ? (
          <TestPage />
        ) : (
          <p style={{ padding: "2rem" }}>Nessun componente selezionato.</p>
        )}
      </main>
    </div>
  );
}
