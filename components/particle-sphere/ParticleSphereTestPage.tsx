"use client";

import React from "react";
import { ParticleSphere } from "./ParticleSphere";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, sans-serif",
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
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#888",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 700,
    margin: "0 0 0.75rem",
    letterSpacing: "-0.02em",
  },
  description: {
    color: "#999",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "0 0 1.5rem",
  },
  right: {
    flex: "1 1 480px",
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvasWrapper: {
    width: "100%",
    maxWidth: 520,
    aspectRatio: "4/3",
    maxHeight: 420,
  },
};

export function ParticleSphereTestPage() {
  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <div style={styles.left}>
          <div style={styles.header}>Ars Webkit</div>
          <h1 style={styles.title}>Particle Sphere</h1>
          <p style={styles.description}>
            An interactive particle sphere.
          </p>
        </div>
        <div style={styles.right}>
          <div style={styles.canvasWrapper}>
            <ParticleSphere
              particleCount={1600}
              particleRadius={0.5}
              sphereRadius={0.42}
              mouseInfluence={50}
              mouseRadius={90}
              rotationSpeed={0}
              glow
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticleSphereTestPage;
