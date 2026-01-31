# Proximity Effects

Controllo stile “Proximity Effects”: gli elementi reagiscono al cursore in base alla distanza, con scale, rotazione, opacità, bordo e border-radius configurabili.

## Struttura

- **`ProximityEffects.tsx`** – griglia di celle che reagiscono alla distanza del cursore
- **`ProximityEffectsTestPage.tsx`** – pagina di test
- **`index.ts`** – export

## Utilizzo

```tsx
import { ProximityEffects } from "../components/proximity-effects";

<ProximityEffects
  columns={12}
  rows={8}
  influenceRadius={280}
  minScale={0.35}
  maxScale={1.1}
  minRadiusPercent={50}
  maxRadiusPercent={22}
/>
```

## Props principali

| Prop | Default | Descrizione |
|------|---------|-------------|
| `columns` / `rows` | 12 / 8 | Griglia |
| `gap` | 16 | Spazio tra celle (px) |
| `cellSize` | 40 | Lato cella (px) |
| `influenceRadius` | 280 | Raggio di influenza del cursore (px) |
| `minScale` / `maxScale` | 0.35 / 1.1 | Scala in base alla distanza |
| `minRadiusPercent` / `maxRadiusPercent` | 50 / 22 | Border-radius (50 = cerchio, 22 = squircle) |
| `minOpacity` / `maxOpacity` | 0.4 / 1 | Opacità |
| `maxRotation` | 8 | Rotazione massima in gradi (vicino al cursore) |
| `minBorder` / `maxBorder` | 0 / 2 | Spessore bordo |
| `fillColor` / `borderColor` / `backgroundColor` | #fff / … / #0a0a0a | Colori |
