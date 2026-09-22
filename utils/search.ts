
/* -------------------------------------------------------------------------- */
/*  Configuration                                                              */
/* -------------------------------------------------------------------------- */

export const MAX_QUERY_LENGTH = 100;
export const PER_SOURCE = 15;
export const MAX_RESULTS = 60;

// Catégories WP non exposées dans constants.ts.
// Attention : constants.ts nomme CAT_LOIS = 42, alors que api.ts documente
// 42 comme la catégorie "structures" : on suit api.ts.
export const CAT_STRUCTURES = 42;
export const CAT_GOUVERNEMENT = 7;

/**
 * Cas particuliers : un slug WP précis → une page Next précise.
 * Prioritaire sur les catégories. C'est ici qu'on ajoute une page WP
 * quand un log "[/api/search] non routé" apparaît en développement.
 */
export const SLUG_ROUTES: Record<string, { path: string; source: string }> = {
    "textes-et-lois": { path: "/texts-and-laws", source: "Page" },
    "dispositions-constitutionnelles": { path: "/about/reference-texts", source: "Textes de référence" },
    "lois-organiques": { path: "/about/reference-texts", source: "Textes de référence" },
    "sources-reglementaires": { path: "/about/reference-texts", source: "Textes de référence" },
    "textes-sur-les-services": { path: "/about/reference-texts", source: "Textes de référence" },
    "vos-senateurs": { path: "/your-senators", source: "Page" },
    // Page WP "Les Sénateurs durant la deuxième Législature de la Quatrième République".
    // TODO : remplacer par /historical?tab=<clé> une fois la clé d'onglet de la
    // Quatrième République connue (voir app/historical/history/page.tsx).
    "historique-v2": { path: "/historical", source: "Historique" },
    // Pages WP du menu de l'ancien site (slugs relevés sur senat.mg) → routes Next.
    "historique": { path: "/about", source: "À propos du Sénat" },
    "nature-et-missions-2": { path: "/about/missions-and-responsibilities", source: "Missions et attributions" },
    "structures": { path: "/about/structures", source: "Structures" },
    "textes-de-reference": { path: "/about/reference-texts", source: "Textes de référence" },
    "historique-2": { path: "/historical?tab=first", source: "Historique" },
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