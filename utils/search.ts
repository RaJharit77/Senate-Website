export const MAX_QUERY_LENGTH = 100;
export const PER_SOURCE = 15;
export const MAX_RESULTS = 60;

export const SLUG_ROUTES: Record<string, { path: string; source: string }> = {
    "textes-et-lois": { path: "/texts-and-laws", source: "Page" },
    "dispositions-constitutionnelles": { path: "/about/reference-texts", source: "Textes de référence" },
    "lois-organiques": { path: "/about/reference-texts", source: "Textes de référence" },
    "sources-reglementaires": { path: "/about/reference-texts", source: "Textes de référence" },
    "textes-sur-les-services": { path: "/about/reference-texts", source: "Textes de référence" },
    "vos-senateurs": { path: "/your-senators", source: "Page" },
    // Page WP "Les Sénateurs durant la deuxième Législature de la Quatrième République".
    // Onglet "fourth" : clé utilisée par HistoryClient.tsx (REPUBLIC_IDS) et
    // HistoryTabs.tsx (?tab=<clé>) pour la République IV.
    "historique-v2": { path: "/historical?tab=fourth", source: "Historique" },
    // Pages WP du menu de l'ancien site (slugs relevés sur senat.mg) → routes Next.
    "historique": { path: "/about", source: "À propos du Sénat" },
    "nature-et-missions-2": { path: "/about/missions-and-responsibilities", source: "Missions et attributions" },
    "structures": { path: "/about/structures", source: "Structures" },
    "textes-de-reference": { path: "/about/reference-texts", source: "Textes de référence" },
    //"historique-2": { path: "/historical?tab=first", source: "Historique" },
    "historique-2": { path: "/historical/history", source: "Historique" },
    "travaux-parlementaires": { path: "/parliamentary-proceedings", source: "Travaux parlementaires" },
    "travaux-legislatifs-2": {
        path: "/parliamentary-proceedings/legislative-proceedings",
        source: "Travaux législatifs",
    },
    "international": { path: "/international", source: "International" },
    "activites-du-president": { path: "/international/presidents-activities", source: "Activités du Président" },
    "activites-des-senateurs": { path: "/international/senators-activities", source: "Activités des Sénateurs" },
    "groupe-interparlementaire-damitie": {
        path: "/international/inter-parliamentary-friendship-group",
        source: "Groupe d'amitié",
    },
    "espace-presse": { path: "/press-area", source: "Espace Presse" },
    "autres": { path: "/others", source: "Autres" },
    "la-structure-administrative-du-senat": {
        path: "/about/administrative-structures",
        source: "Structures administratives",
    },
    "questions-ecrites": {
        path: "/parliamentary-proceedings/written-questions",
        source: "Questions écrites",
    },
};