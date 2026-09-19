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
import type { WpPost } from "@/lib/wp-types";
import { 
    CAT_DELIBERATION, 
    CAT_LOIS, 
    CAT_LOIS_ADOPTES, 
    CAT_ORDRE_DU_JOUR 
} from "@/constants/constants";

export const dynamic = "force-dynamic";

interface UnifiedSearchResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

const NAMED_ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
};

function decodeEntities(text: string): string {
    return text
        .replace(/&#(\d+);/g, (_, dec: string) => String.fromCharCode(Number(dec)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;|&nbsp;/g, (m) => NAMED_ENTITIES[m] ?? m);
}

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

    // Laisser WordPress filtrer côté serveur (?search=...&orderby=relevance)
    // plutôt que de tout rapatrier puis filtrer côté Next — c'est ce qui
    // permettait déjà à l'ancien site de trouver "article HCC" correctement.
    const params = { search: query, per_page: 20, orderby: "relevance" };

    const [
        pagesRes,
        loisRes,
        ordreJourRes,
        deliberationRes,
        audiencesRes,
        delegationsRes,
        internationalRes,
        republiquesRes,
        actualiteRes,
        alauneRes,
    ] = await Promise.allSettled([
        getPages(params),
        getPostsByCategory(CAT_LOIS, params),
        getPostsByCategory(CAT_LOIS_ADOPTES, params),
        getPostsByCategory(CAT_ORDRE_DU_JOUR, params),
        getPostsByCategory(CAT_DELIBERATION, params),
        getAudiences(params),
        getDelegations(params),
        getInternational(params),
        getAllRepubliques(params),
        getActualite(params),
        getAlaune(params),
    ]);

    const results: UnifiedSearchResult[] = [];
    const seenPaths = new Set<string>();

    const addUniqueResult = (post: WpPost, path: string, source: string, idPrefix: string) => {
        if (!seenPaths.has(path)) {
            results.push(toResult(post, path, source, idPrefix));
            seenPaths.add(path);
        }
    };

    // ----- Pages WordPress -----
    // Pas de table slug→route fiable pour les pages génériques sur le nouveau
    // site (contrairement à l'ancien PAGE_SLUG_MAP) : on utilise le permalien
    // WordPress (post.link) comme lien de repli qui fonctionne toujours.
    // À remplacer par un chemin Next.js interne dès que vous confirmez la route.
    if (pagesRes.status === "fulfilled") {
        for (const page of pagesRes.value) {
            if (page.link) {
                addUniqueResult(page, page.link, "Page", "page");
            }
        }
    } else {
        console.error("[/api/search] getPages a échoué:", pagesRes.reason);
    }

    // ----- Textes et lois (catégorie 14) -----
    if (loisRes.status === "fulfilled") {
        for (const post of loisRes.value) {
            addUniqueResult(post, `/texts-and-laws/${post.slug}`, "Texte de loi", "law");
        }
    } else {
        console.error("[/api/search] Textes et lois a échoué:", loisRes.reason);
    }

    // ----- Ordre du jour (catégorie 11) -----
    if (ordreJourRes.status === "fulfilled") {
        for (const post of ordreJourRes.value) {
            addUniqueResult(post, `/agenda/${post.slug}`, "Ordre du jour", "agenda");
        }
    } else {
        console.error("[/api/search] Ordre du jour a échoué:", ordreJourRes.reason);
    }

    // ----- Délibérations (catégorie 53) -----
    if (deliberationRes.status === "fulfilled") {
        for (const post of deliberationRes.value) {
            addUniqueResult(
                post,
                `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${post.slug}`,
                "Délibération",
                "deliberation"
            );
        }
    } else {
        console.error("[/api/search] Délibérations a échoué:", deliberationRes.reason);
    }

    // ----- Activités du Président (audiences + délégations + international) -----
    const presidentSources: Array<[PromiseSettledResult<WpPost[]>, string]> = [
        [audiencesRes, "audience"],
        [delegationsRes, "delegation"],
        [internationalRes, "international"],
    ];
    for (const [res, idPrefix] of presidentSources) {
        if (res.status === "fulfilled") {
            for (const post of res.value) {
                addUniqueResult(
                    post,
                    `/international/presidents-activities/${post.slug}`,
                    "Activité du Président",
                    idPrefix
                );
            }
        } else {
            console.warn(`[/api/search] source "${idPrefix}" indisponible:`, res.reason);
        }
    }

    // ----- Historique constitutionnel (Républiques I à IV) -----
    if (republiquesRes.status === "fulfilled") {
        for (const post of republiquesRes.value) {
            addUniqueResult(post, `/historical/${post.slug}`, "Historique", "republique");
        }
    } else {
        console.error("[/api/search] getAllRepubliques a échoué:", republiquesRes.reason);
    }

    // ----- Actualités / à la une -----
    if (actualiteRes.status === "fulfilled") {
        for (const post of actualiteRes.value) {
            addUniqueResult(post, `/press-area/news/${post.slug}`, "Actualité", "actualite");
        }
    } else {
        console.error("[/api/search] getActualite a échoué:", actualiteRes.reason);
    }
    if (alauneRes.status === "fulfilled") {
        for (const post of alauneRes.value) {
            addUniqueResult(post, `/press-area/news/${post.slug}`, "À la une", "alaune");
        }
    } else {
        console.error("[/api/search] getAlaune a échoué:", alauneRes.reason);
    }

    return NextResponse.json(results);
}