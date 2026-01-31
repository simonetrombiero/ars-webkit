/**
 * Registro dei componenti disponibili per i test.
 * Per aggiungere un nuovo componente: crea la cartella in components/<nome>/,
 * esporta la TestPage da components/<nome>/index.ts, e aggiungi una voce qui.
 */

import type { ComponentType } from "react";
import { ParticleSphereTestPage } from "../components/particle-sphere";
import { ProximityEffectsTestPage } from "../components/proximity-effects";

export interface ComponentEntry {
  id: string;
  name: string;
  TestPage: ComponentType;
}

export const COMPONENTS: ComponentEntry[] = [
  {
    id: "particle-sphere",
    name: "Particle Sphere",
    TestPage: ParticleSphereTestPage,
  },
  {
    id: "proximity-effects",
    name: "Proximity Effects",
    TestPage: ProximityEffectsTestPage,
  },
];
