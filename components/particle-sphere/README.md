# Particle Sphere

Componente React che mostra una sfera di particelle luminose interattiva: le particelle si allontanano dal cursore del mouse.

## Struttura

- **`ParticleSphere.tsx`** – componente riutilizzabile (sfera + interazione mouse)
- **`ParticleSphereTestPage.tsx`** – pagina di test con layout titolo, descrizione, pulsanti e anteprima
- **`index.ts`** – export del componente e della pagina di test

## Utilizzo

```tsx
import { ParticleSphere, ParticleSphereTestPage } from "../components/particle-sphere";

// Solo la sfera (es. in un layout custom)
<ParticleSphere
  particleCount={1200}
  particleRadius={1.2}
  sphereRadius={0.4}
  mouseInfluence={80}
  mouseRadius={120}
/>

// Pagina di test completa
<ParticleSphereTestPage />
```

## Props del componente

| Prop              | Tipo    | Default | Descrizione                          |
|-------------------|---------|---------|--------------------------------------|
| `particleCount`   | number  | 1200    | Numero di particelle sulla sfera     |
| `particleRadius`  | number  | 1.2     | Raggio di ogni particella (px)       |
| `sphereRadius`    | number  | 0.4     | Raggio della sfera (frazione del canvas) |
| `mouseInfluence`  | number  | 22      | Intensità dello spostamento (repulsione magnetica); valori bassi = movimento sottile |
| `mouseRadius`     | number  | 110     | Raggio (px) entro cui il mouse sposta le particelle |
| `rotationSpeed`   | number  | 0.15    | Velocità di rotazione della sfera     |
| `glow`            | boolean | true    | Abilita alone sulle particelle        |
| `width` / `height`| number  | auto    | Dimensioni del canvas (opzionale)    |
