"use client";

import React from "react";

export interface GlassBarsProps {
  className?: string;
  /** Numero di barre */
  barCount?: number;
  /** Larghezza di ogni barra (px) */
  barWidth?: number;
  /** Gap tra le barre (px) */
  barGap?: number;
  /** Altezza del componente (px) */
  height?: number;
  /** Altezza area barre in percentuale (0-1). Es. 0.5 = barre nella metà inferiore */
  barsHeightPercent?: number;
  /** Intensità del blur (px) */
  blurAmount?: number;
  /** Colore di sfondo delle barre */
  barBackground?: string;
  /** Colore bordo delle barre */
  barBorderColor?: string;
  /** Colore del glow primario */
  glowColor?: string;
  /** Colore sfondo */
  backgroundColor?: string;
  /** Contenuto da mostrare dietro le barre (es. testo) */
  children?: React.ReactNode;
}

export function GlassBars({
  className = "",
  barCount = 20,
  barWidth = 28,
  barGap = 0,
  height = 320,
  barsHeightPercent = 0.5,
  blurAmount = 12,
  barBackground = "rgba(255,255,255,0.08)",
  barBorderColor = "rgba(180,190,220,0.05)",
  glowColor = "#4f46e5",
  backgroundColor = "#050510",
  children,
}: GlassBarsProps) {
  const totalWidth = barCount * barWidth + (barCount - 1) * barGap;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: totalWidth,
        height,
        background: backgroundColor,
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      {/* Glow superiore */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: 180,
          background: `radial-gradient(ellipse at center, ${glowColor}88 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Glow inferiore */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: 220,
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Contenuto dietro le barre */}
      {children && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            zIndex: 0,
          }}
        >
          {children}
        </div>
      )}

      {/* Barre di vetro */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${barsHeightPercent * 100}%`,
          display: "flex",
          justifyContent: "center",
          gap: barGap,
          zIndex: 1,
        }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const wave = (Math.sin(i * 0.22) + 1) / 2;
          const pos = 0.38 + wave * 0.18;
          const band = 0.22;
          const gradient = `linear-gradient(180deg, rgba(30,27,75,0.52) 0%, rgba(49,46,129,0.48) ${Math.max(0, (pos - band) * 100)}%, rgba(99,102,241,0.38) ${pos * 100}%, rgba(165,180,252,0.28) ${Math.min(100, (pos + band) * 100)}%, rgba(199,210,254,0.22) 100%)`;
          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height: "100%",
                background: gradient,
                backdropFilter: `blur(${blurAmount}px)`,
                WebkitBackdropFilter: `blur(${blurAmount}px)`,
                borderRadius: 0,
                border: `1px solid ${barBorderColor}`,
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GlassBars;
