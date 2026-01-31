# ars-webkit

Progetto con più componenti React, ognuno in una cartella dedicata. Ogni componente ha la propria pagina di test.

## Struttura

```
ars-webkit/
├── components/           # Cartelle dei componenti
│   ├── particle-sphere/ # Esempio: sfera di particelle interattiva
│   │   ├── ParticleSphere.tsx       # Componente
│   │   ├── ParticleSphereTestPage.tsx # Pagina di test
│   │   ├── index.ts                 # Export
│   │   └── README.md
│   └── <altro>/         # Altri componenti (stessa struttura)
├── src/
│   ├── App.tsx          # Shell con navigazione tra componenti
│   ├── components.ts    # Registro componenti (aggiungi qui i nuovi)
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Aggiungere un nuovo componente

1. Crea la cartella `components/<nome>/` (es. `components/button-group/`).
2. Dentro metti:
   - `<Nome>.tsx` – componente riutilizzabile
   - `<Nome>TestPage.tsx` – pagina di test (layout + anteprima)
   - `index.ts` – `export { Nome, NomeTestPage } from "./Nome"` (e TestPage)
   - `README.md` – opzionale
3. In `src/components.ts`: importa la TestPage e aggiungi una voce a `COMPONENTS`:
   ```ts
   import { NuovoTestPage } from "../components/nuovo";
   // in COMPONENTS:
   { id: "nuovo", name: "Nuovo", TestPage: NuovoTestPage },
   ```

Il nuovo componente apparirà nella barra di navigazione e potrai testarlo dall’app.

## Comandi

```bash
npm install   # dipendenze
npm run dev   # server di sviluppo (http://localhost:5173)
npm run build # build di produzione
npm run preview # anteprima della build
```

## Test

Avvia `npm run dev`, apri http://localhost:5173 e usa la barra in alto per passare da un componente all’altro.
