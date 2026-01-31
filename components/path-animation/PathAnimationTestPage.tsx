"use client";

import React from "react";
import { PathAnimation } from "./PathAnimation";

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
    flex: "0 1 320px",
  },
  header: {
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
    margin: 0,
  },
  right: {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    padding: "1rem",
  },
};

export function PathAnimationTestPage() {
  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <div style={styles.left}>
          <div style={styles.header}>Ars Webkit</div>
          <h1 style={styles.title}>Path Animation</h1>
          <p style={styles.description}>
            Fills and empties the path with a slow-fast-slow curve.
          </p>
        </div>
        <div style={styles.right}>
          <div style={styles.wrapper}>
            <PathAnimation
              width={320}
              height={400}
              strokeWidth={42}
              fillColor="#fff"
              emptyColor="rgba(255,255,255,0.2)"
              backgroundColor="transparent"
              fillDuration={3800}
              emptyDuration={3800}
              pauseBetween={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathAnimationTestPage;
