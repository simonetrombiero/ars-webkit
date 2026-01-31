# Glass Bars

Barre verticali con effetto vetro smerigliato (glassmorphism), blur e glow colorato.

## Struttura

- **`GlassBars.tsx`** – componente con barre semitrasparenti e backdrop-filter blur
- **`GlassBarsTestPage.tsx`** – pagina di test
- **`index.ts`** – export

## Utilizzo

```tsx
import { GlassBars } from "../components/glass-bars";

<GlassBars
  barCount={18}
  barWidth={30}
  barGap={5}
  height={340}
  blurAmount={14}
  glowColor="#5b4cff"
>
  <div style={{ fontSize: "4rem", fontWeight: 700, color: "#fff" }}>
    Glass<br />Effect
  </div>
</GlassBars>
```

## Props

| Prop | Default | Descrizione |
|------|---------|-------------|
| `barCount` | 20 | Numero di barre |
| `barWidth` | 28 | Larghezza barra (px) |
| `barGap` | 6 | Gap tra le barre (px) |
| `height` | 320 | Altezza componente (px) |
| `blurAmount` | 12 | Intensità blur (px) |
| `barBackground` | rgba(255,255,255,0.08) | Colore sfondo barra |
| `barBorderColor` | rgba(255,255,255,0.12) | Colore bordo barra |
| `glowColor` | #4f46e5 | Colore del glow |
| `backgroundColor` | #050510 | Sfondo contenitore |
| `children` | – | Contenuto dietro le barre |
