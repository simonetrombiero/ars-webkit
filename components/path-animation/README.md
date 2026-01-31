# Path Animation

Animazione che riempie e svuota un percorso ondulato con curva **lento-veloce-lento** (ease-in-out).

## Struttura

- **`PathAnimation.tsx`** – percorso SVG ondulato con animazione fill/empty
- **`PathAnimationTestPage.tsx`** – pagina di test
- **`index.ts`** – export

## Utilizzo

```tsx
import { PathAnimation } from "../components/path-animation";

<PathAnimation
  width={440}
  height={120}
  strokeWidth={24}
  fillDuration={2000}
  emptyDuration={2000}
  pauseBetween={400}
/>
```

## Props

| Prop | Default | Descrizione |
|------|---------|-------------|
| `width` / `height` | 440 / 120 | Dimensioni (px) |
| `strokeWidth` | 24 | Spessore tratto (px) |
| `fillColor` | #fff | Colore parte riempita |
| `emptyColor` | #7c9ce0 | Colore parte vuota |
| `backgroundColor` | #1e3a8a | Sfondo |
| `fillDuration` | 2000 | Durata riempimento (ms) |
| `emptyDuration` | 2000 | Durata svuotamento (ms) |
| `pauseBetween` | 400 | Pausa tra le fasi (ms) |

La curva di animazione è **ease-in-out** (lento-veloce-lento).
