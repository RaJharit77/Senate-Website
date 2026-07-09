import { WpPost } from "@/lib/types";

// ----- Activités du Président : agrégation des 3 CPT -----
// Sur senat.mg, "Activités du Président" agrège trois custom post types
// distincts (et non un champ ACF "type" sur un seul CPT) :
//   - "audience"     → Audiences
//   - "delegation"   → Accueil des délégations parlementaires étrangères
//   - "international"→ Déplacements à l'étranger
// Chaque CPT est interrogé indépendamment et les échecs sont neutralisés
// (Promise.allSettled) : si un endpoint n'existe pas encore côté WP
// (ex. "delegation" n'a peut-être pas été créé), on retourne simplement un

// tableau vide pour ce groupe plutôt que de casser toute la page.
export type ActivityCategory = "audience" | "delegation" | "international";

export interface PresidentActivity {
    id: number;
    category: ActivityCategory;
    post: WpPost;
}
