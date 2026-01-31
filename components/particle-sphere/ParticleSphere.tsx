"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const TILT_DEG = 10;
const TILT_X = (TILT_DEG * Math.PI) / 180;
const TILT_Z = (TILT_DEG * Math.PI) / 180;
const POINTS_ON_SPHERE = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = 2 * Math.PI * i * GOLDEN_RATIO;
    return {
      x: r * Math.cos(theta),
      y,
      z: r * Math.sin(theta),
    };
  });

export interface ParticleSphereProps {
  className?: string;
  width?: number;
  height?: number;
  particleCount?: number;
  particleRadius?: number;
  sphereRadius?: number;
  /** Intensità dello spostamento (repulsione magnetica): valori bassi = movimento sottile */
  mouseInfluence?: number;
  /** Raggio (px) entro cui il mouse sposta le particelle */
  mouseRadius?: number;
  rotationSpeed?: number;
  glow?: boolean;
}

export function ParticleSphere({
  className = "",
  width,
  height,
  particleCount = 1600,
  particleRadius = 0.5,
  sphereRadius = 0.4,
  mouseInfluence = 50,
  mouseRadius = 90,
  rotationSpeed = 0,
  glow = true,
}: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: width ?? 600, h: height ?? 500 });
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const pointsRef = useRef(POINTS_ON_SPHERE(particleCount));
  const rotationRef = useRef(0);

  const updateSize = useCallback(() => {
    const el = canvasRef.current?.parentElement;
    if (width != null && height != null) return;
    if (el) {
      const rect = el.getBoundingClientRect();
      setSize((s) =>
        rect.width !== s.w || rect.height !== s.h
          ? { w: rect.width, h: rect.height }
          : s
      );
    }
  }, [width, height]);

  useEffect(() => {
    updateSize();
    const ro = new ResizeObserver(updateSize);
    const parent = canvasRef.current?.parentElement;
    if (parent) ro.observe(parent);
    return () => ro.disconnect();
  }, [updateSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
    const w = Math.round(size.w * dpr);
    const h = Math.round(size.h * dpr);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.scale(dpr, dpr);

    const cx = size.w / 2;
    const cy = size.h / 2;
    const scale = Math.min(size.w, size.h) * sphereRadius;

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, size.w, size.h);

      rotationRef.current += rotationSpeed * 0.01;
      const rotY = rotationRef.current;
      const rotX = rotationRef.current * 0.3;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const mouse = mouseRef.current;

      const cosTiltX = Math.cos(TILT_X);
      const sinTiltX = Math.sin(TILT_X);
      const cosTiltZ = Math.cos(TILT_Z);
      const sinTiltZ = Math.sin(TILT_Z);

      for (const p of pointsRef.current) {
        let x = p.x,
          y = p.y,
          z = p.z;

        // Inclinazione fissa 10° su X e Z
        let ty = y * cosTiltX - z * sinTiltX;
        let tz = y * sinTiltX + z * cosTiltX;
        y = ty;
        z = tz;
        let tx = x * cosTiltZ - y * sinTiltZ;
        ty = x * sinTiltZ + y * cosTiltZ;
        x = tx;
        y = ty;

        let ty2 = y * cosX - z * sinX;
        let tz2 = y * sinX + z * cosX;
        y = ty2;
        z = tz2;

        let tx2 = x * cosY + z * sinY;
        tz2 = -x * sinY + z * cosY;
        x = tx2;
        z = tz2;

        const sx = cx + x * scale;
        const sy = cy + y * scale;

        // Scala in base alla profondità: punti verso lo schermo più grandi
        const depthScale = 0.62 + 0.58 * ((z + 1) * 0.5);

        let dx = 0,
          dy = 0;
        if (mouse) {
          const dist = Math.hypot(mouse.x - sx, mouse.y - sy);
          if (dist < mouseRadius && dist > 0) {
            const t = dist / mouseRadius;
            const f = Math.pow(1 - t, 1.35) * mouseInfluence;
            dx = ((sx - mouse.x) / dist) * f;
            dy = ((sy - mouse.y) / dist) * f;
          }
        }

        const px = sx + dx;
        const py = sy + dy;

        const displaced = Math.hypot(dx, dy) > 2;
        const r = particleRadius * depthScale;
        if (glow && !displaced) {
          const glowRadius = r * 2;
          const g = ctx.createRadialGradient(
            px, py, 0,
            px, py, glowRadius
          );
          g.addColorStop(0, "rgba(220,220,230,0.45)");
          g.addColorStop(0.6, "rgba(200,200,210,0.1)");
          g.addColorStop(1, "rgba(200,200,210,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(210,212,220,0.82)";
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(rafId);
  }, [size, particleRadius, sphereRadius, mouseInfluence, mouseRadius, rotationSpeed, glow]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.offsetWidth;
    const scaleY = rect.height / canvas.offsetHeight;
    mouseRef.current = {
      x: (e.clientX - rect.left) / scaleX,
      y: (e.clientY - rect.top) / scaleY,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = null;
  }, []);

  const pixelW = width ?? size.w;
  const pixelH = height ?? size.h;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: pixelW,
        height: pixelH,
        display: "block",
        cursor: "pointer",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default ParticleSphere;
