"use client";

import React, { useRef, useEffect, useState } from "react";

export interface PathAnimationProps {
  className?: string;
  /** Larghezza del componente (px) */
  width?: number;
  /** Altezza del componente (px) */
  height?: number;
  /** Spessore del tratto (px) */
  strokeWidth?: number;
  /** Colore parte riempita */
  fillColor?: string;
  /** Colore parte vuota */
  emptyColor?: string;
  /** Colore sfondo */
  backgroundColor?: string;
  /** Durata fase riempimento (ms) */
  fillDuration?: number;
  /** Durata fase svuotamento (ms) */
  emptyDuration?: number;
  /** Pausa tra le fasi (ms) */
  pauseBetween?: number;
}

export function PathAnimation({
  className = "",
  width = 320,
  height = 400,
  strokeWidth = 42,
  fillColor = "#fff",
  emptyColor = "#4f6ad8",
  backgroundColor = "transparent",
  fillDuration = 2000,
  emptyDuration = 2000,
  pauseBetween = 400,
}: PathAnimationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(100);
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLength(len);
  }, []);

  useEffect(() => {
    if (pathLength === 100) return;

    let startTime: number | null = null;
    let rafId: number;

    const totalCycle =
      fillDuration + pauseBetween + emptyDuration + pauseBetween;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % totalCycle;

      if (elapsed < fillDuration) {
        const t = easeInOut(elapsed / fillDuration);
        setOffset(pathLength * (1 - t));
      } else if (elapsed < fillDuration + pauseBetween) {
        setOffset(0);
      } else if (elapsed < fillDuration + pauseBetween + emptyDuration) {
        const t = easeInOut((elapsed - fillDuration - pauseBetween) / emptyDuration);
        setOffset(pathLength * t);
      } else {
        setOffset(pathLength);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [pathLength, fillDuration, emptyDuration, pauseBetween]);

  // Serpentina verticale: 6 segmenti verticali collegati da 5 curve a U
  const margin = strokeWidth / 2 + 6;
  const gap = (width - margin * 2) / 5;
  const r = gap / 2;
  const x1 = margin;
  const x2 = margin + gap;
  const x3 = margin + gap * 2;
  const x4 = margin + gap * 3;
  const x5 = margin + gap * 4;
  const x6 = margin + gap * 5;
  const yTop = margin + r;
  const yBot = height - margin - r;

  const d = `
    M ${x1} ${yTop}
    L ${x1} ${yBot}
    A ${r} ${r} 0 0 0 ${x2} ${yBot}
    L ${x2} ${yTop}
    A ${r} ${r} 0 0 1 ${x3} ${yTop}
    L ${x3} ${yBot}
    A ${r} ${r} 0 0 0 ${x4} ${yBot}
    L ${x4} ${yTop}
    A ${r} ${r} 0 0 1 ${x5} ${yTop}
    L ${x5} ${yBot}
    A ${r} ${r} 0 0 0 ${x6} ${yBot}
    L ${x6} ${yTop}
  `;

  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: backgroundColor,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: "hidden" }}
      >
        <defs>
          <linearGradient id="pathEmpty" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={emptyColor} />
            <stop offset="100%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
        {/* Percorso di sfondo (parte vuota) */}
        <path
          d={d}
          fill="none"
          stroke={emptyColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Percorso riempito (animato) */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength === 100 ? 100 : offset}
        />
      </svg>
    </div>
  );
}

export default PathAnimation;
