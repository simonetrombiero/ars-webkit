"use client";

import React from "react";
import { GlassBars } from "./GlassBars";

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100%",
    background: "#050510",
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
    flex: "0 1 320px",
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
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  glassText: {
    paddingTop: "1.5rem",
    paddingLeft: "1.5rem",
    fontSize: "6.5rem",
    fontWeight: 600,
    color: "#fff",
    textAlign: "left" as const,
    lineHeight: 0.92,
    letterSpacing: "-0.03em",
  },
};

export function GlassBarsTestPage() {
  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <div style={styles.left}>
          <div style={styles.header}>Ars Webkit</div>
          <h1 style={styles.title}>Glass Bars</h1>
          <p style={styles.description}>
            Frosted glass bars with blur effect and glow.
          </p>
        </div>
        <div style={styles.right}>
          <GlassBars
            barCount={18}
            barWidth={30}
            barGap={0}
            height={380}
            barsHeightPercent={0.5}
            blurAmount={14}
            glowColor="#5b4cff"
          >
            <div style={styles.glassText}>
              Glass<br />Bars
            </div>
          </GlassBars>
        </div>
      </div>
    </div>
  );
}

export default GlassBarsTestPage;
