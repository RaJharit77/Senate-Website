import { NextRequest, NextResponse } from "next/server";
import {
    getPages,
    getPostsByCategory,
    getActualite,
    getAlaune,
    getAudiences,
    getDelegations,
    getInternational,
    getAllRepubliques,
} from "@/lib/api";
import type { WpPost } from "@/lib/types";

/**
 * Recherche unifiée sur tout le site.
 *
 * L'ancienne implémentation (search() dans lib/api.ts) tapait directement
 * l'endpoint natif WordPress /wp-json/wp/v2/search. Ce endpoint renvoie un
 * `url` qui est le permalien WordPress ABSOLU (anciens slugs français),
 * sans indication fiable de la route Next.js correspondante — d'où les
 * clics qui redirigeaient vers l'ancien site.
 *
 * Ici, on interroge nous-mêmes chaque source de contenu connue (en
 * parallèle, filtrée par le terme recherché), et on associe à CHAQUE
 * résultat le chemin Next.js exact — puisqu'on sait, en dur, quelle route
 * consomme quelle source. Plus de déduction à partir de `subtype`/`url`.
 *
 * Sources couvertes, avec le niveau de certitude sur la route Next.js :
 *   - Pages WP                          -> table PAGE_SLUG_MAP     (sûr, mais liste à compléter)
 *   - Catégorie 14 (posts natifs)       -> /texts-and-laws/{slug}  (sûr : cf. getTextAndLawBySlug)
 *   - audience/delegation/international -> /international/presidents-activities/{slug}
 *                                                                   (sûr : cf. getPresidentActivities)
 *   - Républiques I à IV                -> /historical/{slug}      (sûr : commentaire "historique constitutionnel")
 *   - actualite/alaune                  -> /press-area/{slug}      (À VÉRIFIER, voir plus bas)
 *
 * Non couvert faute de source identifiée dans lib/api.ts : Activités des
 * Sénateurs, Groupe interparlementaire d'amitié, Bureau, Partenaires.
 * À ajouter dès que tu me dis ce qui alimente ces pages.
 */

export const dynamic = "force-dynamic";

interface UnifiedSearchResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

/**
 * Slugs WordPress connus (pages) -> route Next.js correspondante.
 * Une page non listée ici est simplement omise des résultats plutôt que
 * de deviner un lien qui n'existe peut-être pas.
 */
const PAGE_SLUG_MAP: Record<string, string> = {
    "textes-et-lois": "/texts-and-laws",
    // Ces 4 pages sont affichées à l'intérieur de /about/reference-texts
    // (cf. getReferencePages dans lib/api.ts) : pas de route dédiée.
    "dispositions-constitutionnelles": "/about/reference-texts",
    "lois-organiques": "/about/reference-texts",
    "sources-reglementaires": "/about/reference-texts",
    "textes-sur-les-services": "/about/reference-texts",
};

const NAMED_ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
};

/** Décode les entités HTML numériques et nommées les plus courantes (pas de DOM côté serveur). */
function decodeEntities(text: string): string {
    return text
        .replace(/&#(\d+);/g, (_, dec: string) => String.fromCharCode(Number(dec)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;|&nbsp;/g, (m) => NAMED_ENTITIES[m] ?? m);
}

/** Retire les balises HTML puis décode les entités restantes. */
function cleanText(html?: string | null): string {
    if (!html) return "";
    return decodeEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function toResult(post: WpPost, path: string, source: string, idPrefix: string): UnifiedSearchResult {
    return {
        id: `${idPrefix}-${post.id}`,
        title: cleanText(post.title?.rendered) || "Sans titre",
        excerpt: cleanText(post.excerpt?.rendered),
        date: post.date ?? null,
        path,
        source,
    };
}

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q")?.trim() || "";
    if (!query) {
        return NextResponse.json([]);
    }

    const params = { search: query, per_page: 20, orderby: "relevance" };

    const [
        pagesRes,
        lawsRes,
        audiencesRes,
        delegationsRes,
        internationalRes,
        republiquesRes,
        actualiteRes,
        alauneRes,
    ] = await Promise.allSettled([
        getPages(params),
        getPostsByCategory(14, params),
        getAudiences(params),
        getDelegations(params),
        getInternational(params),
        getAllRepubliques(params),
        getActualite(params),
        getAlaune(params),
    ]);

    const results: UnifiedSearchResult[] = [];

    // ----- Pages : seulement celles qu'on sait router avec certitude -----
    if (pagesRes.status === "fulfilled") {
        for (const page of pagesRes.value) {
            const path = PAGE_SLUG_MAP[page.slug];
            if (path) results.push(toResult(page, path, "Page", "page"));
        }
    } else {
        console.error("[/api/search] getPages a échoué:", pagesRes.reason);
    }

    // ----- Textes et lois (catégorie 14) -----
    if (lawsRes.status === "fulfilled") {
        for (const post of lawsRes.value) {
            results.push(toResult(post, `/texts-and-laws/${post.slug}`, "Texte de loi", "law"));
        }
    } else {
        console.error("[/api/search] getPostsByCategory(14) a échoué:", lawsRes.reason);
    }

    // ----- Activités du Président (audiences + délégations + international) -----
    // Regroupement calqué sur getPresidentActivities() dans lib/api.ts.
    const presidentSources: Array<[PromiseSettledResult<WpPost[]>, string]> = [
        [audiencesRes, "audience"],
        [delegationsRes, "delegation"],
        [internationalRes, "international"],
    ];
    for (const [res, idPrefix] of presidentSources) {
        if (res.status === "fulfilled") {
            for (const post of res.value) {
                results.push(
                    toResult(post, `/international/presidents-activities/${post.slug}`, "Activité du Président", idPrefix)
                );
            }
        } else {
            console.warn(`[/api/search] source "${idPrefix}" indisponible:`, res.reason);
        }
    }

    // ----- Historique constitutionnel (Républiques I à IV) -----
    if (republiquesRes.status === "fulfilled") {
        for (const post of republiquesRes.value) {
            results.push(toResult(post, `/historical/${post.slug}`, "Historique", "republique"));
        }
    } else {
        console.error("[/api/search] getAllRepubliques a échoué:", republiquesRes.reason);
    }

    // ----- Actualités / à la une -----
    // Hypothèse à vérifier : getPostBySlugNoCache (lib/api.ts) essaie "alaune"
    // PUIS "actualite" pour un même slug, ce qui suggère une route partagée
    // dans /press-area. Corrige le chemin ci-dessous si ce n'est pas le cas.
    if (actualiteRes.status === "fulfilled") {
        for (const post of actualiteRes.value) {
            results.push(toResult(post, `/press-area/news/${post.slug}`, "Actualité", "actualite"));
        }
    } else {
        console.error("[/api/search] getActualite a échoué:", actualiteRes.reason);
    }
    if (alauneRes.status === "fulfilled") {
        for (const post of alauneRes.value) {
            results.push(toResult(post, `/press-area/news/${post.slug}`, "À la une", "alaune"));
        }
    } else {
        console.error("[/api/search] getAlaune a échoué:", alauneRes.reason);
    }

    return NextResponse.json(results);
}