"use client";

import React from "react";
import { ProximityEffects } from "./ProximityEffects";

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100%",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Montserrat', system-ui, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    boxSizing: "border-box",
  },
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4rem",
    maxWidth: 1100,
    width: "100%",
  },
  left: {
    flex: "0 1 360px",
  },
  header: {
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 600,
    margin: "0 0 0.75rem",
    letterSpacing: "-0.02em",
  },
  description: {
    color: "#999",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: 0,
  },
  right: {
    flex: "1 1 480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    padding: "3rem",
  },
};

export function ProximityEffectsTestPage() {
  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <div style={styles.left}>
          <div style={styles.header}>Ars Webkit</div>
          <h1 style={styles.title}>Proximity Effects</h1>
          <p style={styles.description}>
            Elements react to the cursor by distance: scale, rotation, opacity, borders, radius—no code.
          </p>
        </div>
        <div style={styles.right}>
          <div style={styles.wrapper}>
            <ProximityEffects
              columns={5}
              rows={5}
              gap={16}
              cellSize={40}
              influenceRadius={160}
              minScale={0.18}
              maxScale={1.25}
              minRadiusPercent={50}
              maxRadiusPercent={28}
              minOpacity={0.5}
              maxOpacity={0.9}
              maxRotation={3}
              minBorder={0}
              maxBorder={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProximityEffectsTestPage;
