"use client";

import React, { useRef, useState, useCallback } from "react";

export interface ProximityEffectsProps {
  className?: string;
  /** Numero di colonne */
  columns?: number;
  /** Numero di righe */
  rows?: number;
  /** Spazio tra le celle (px) */
  gap?: number;
  /** Dimensione base delle celle (px) */
  cellSize?: number;
  /** Raggio di influenza del cursore (px) */
  influenceRadius?: number;
  /** Scala minima (lontano dal cursore) */
  minScale?: number;
  /** Scala massima (vicino al cursore) */
  maxScale?: number;
  /** Border-radius minimo (0 = quadrato, 50% = cerchio) - lontano */
  minRadiusPercent?: number;
  /** Border-radius massimo - vicino (squircle) */
  maxRadiusPercent?: number;
  /** Opacità minima (lontano) */
  minOpacity?: number;
  /** Opacità massima (vicino) */
  maxOpacity?: number;
  /** Rotazione massima in gradi (vicino) */
  maxRotation?: number;
  /** Spessore bordo minimo (lontano) */
  minBorder?: number;
  /** Spessore bordo massimo (vicino) */
  maxBorder?: number;
  /** Colore di riempimento */
  fillColor?: string;
  /** Colore bordo */
  borderColor?: string;
  /** Colore sfondo contenitore */
  backgroundColor?: string;
}

export function ProximityEffects({
  className = "",
  columns = 12,
  rows = 8,
  gap = 16,
  cellSize = 40,
  influenceRadius = 280,
  minScale = 0.35,
  maxScale = 1.1,
  minRadiusPercent = 50,
  maxRadiusPercent = 22,
  minOpacity = 0.4,
  maxOpacity = 1,
  maxRotation = 8,
  minBorder = 0,
  maxBorder = 2,
  fillColor = "#fff",
  borderColor = "rgba(255,255,255,0.6)",
  backgroundColor = "#0a0a0a",
}: ProximityEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const updateMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const cells: { cx: number; cy: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      cells.push({
        cx: gap + cellSize / 2 + col * (cellSize + gap),
        cy: gap + cellSize / 2 + row * (cellSize + gap),
      });
    }
  }

  const width = columns * cellSize + (columns + 1) * gap;
  const height = rows * cellSize + (rows + 1) * gap;

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={updateMouse}
      onMouseEnter={updateMouse}
      onMouseLeave={() => setMouse(null)}
      style={{
        position: "relative",
        width,
        height,
        background: backgroundColor,
        borderRadius: 8,
        cursor: "default",
      }}
    >
      {cells.map(({ cx, cy }, i) => {
        let scale = minScale;
        let radiusPct = minRadiusPercent;
        let opacity = minOpacity;
        let rotation = 0;
        let border = minBorder;

        if (mouse) {
          const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
          const t = Math.min(1, dist / influenceRadius);
          const proximity = 1 - t;
          const ease = 1 - Math.pow(t, 1.2);

          scale = minScale + (maxScale - minScale) * ease;
          radiusPct = minRadiusPercent + (maxRadiusPercent - minRadiusPercent) * ease;
          opacity = minOpacity + (maxOpacity - minOpacity) * ease;
          rotation = maxRotation * proximity * (Math.sin(i * 0.7) * 0.5 + 0.5);
          border = minBorder + (maxBorder - minBorder) * ease;
        }

        const size = cellSize * scale;
        const radius = (size * radiusPct) / 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - size / 2,
              top: cy - size / 2,
              width: size,
              height: size,
              borderRadius: radius,
              background: fillColor,
              border: border > 0 ? `${border}px solid ${borderColor}` : "none",
              opacity,
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.12s ease-out, width 0.12s ease-out, height 0.12s ease-out, border-radius 0.12s ease-out, opacity 0.12s ease-out, border 0.12s ease-out",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default ProximityEffects;
