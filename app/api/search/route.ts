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
import { navItems } from "@/lib/navigations/navigation";

export const dynamic = "force-dynamic";

interface UnifiedSearchResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

const PAGE_SLUG_MAP: Record<string, string> = {
    "textes-et-lois": "/texts-and-laws",
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

/** 
 * Recherche dans les menus statiques du site 
 */
function getStaticNavResults(query: string): UnifiedSearchResult[] {
    const normalizedQuery = query.toLowerCase();
    const flatNav: { label: string; path: string }[] = [];

    // Aplatir le menu (parents + enfants)
    for (const item of navItems) {
        flatNav.push({ label: item.label, path: item.path });
        if (item.children) {
            for (const child of item.children) {
                flatNav.push({ label: child.label, path: child.path });
            }
        }
    }

    // Filtrer et formatter pour correspondre à UnifiedSearchResult
    return flatNav
        .filter(item => item.label.toLowerCase().includes(normalizedQuery))
        .map(item => ({
            id: `nav-${item.path.replace(/\//g, "-")}`,
            title: item.label,
            excerpt: `Page de navigation : ${item.label}`,
            date: null,
            path: item.path,
            source: "Navigation du site",
        }));
}

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q")?.trim() || "";
    if (!query) {
        return NextResponse.json([]);
    }

    // Récupérer les résultats du menu de navigation
    const staticResults = getStaticNavResults(query);

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

    // Initialiser les résultats avec ceux de la navigation statique
    const results: UnifiedSearchResult[] = [...staticResults];

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