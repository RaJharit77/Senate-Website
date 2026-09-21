import { NextRequest, NextResponse } from "next/server";
import {
    fetchAPI,
    getPages,
    getPosts,
    getActualite,
    getAlaune,
    getAudiences,
    getDelegations,
    getInternational,
    getAllRepubliques,
} from "@/lib/api";
import type { WpPost } from "@/lib/wp-types";
import type { Params } from "@/lib/wordpress";
import { navItems } from "@/lib/navigations/navigation";
import {
    CAT_AUDIO,
    CAT_AUTRE,
    CAT_CALENDRIER,
    CAT_DELIBERATION,
    CAT_DIVERS,
    CAT_LOIS_ADOPTES,
    CAT_ORDRE_JOUR,
    CAT_PUBLICATION,
    CAT_VIDEO,
} from "@/constants/constants";

export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Forme renvoyée au client (inchangée : app/search/page.tsx n'a rien à adapter). */
interface UnifiedSearchResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

type ScoredResult = UnifiedSearchResult & { score: number };

/** Route Next.js garantie pour un contenu WordPress. */
interface ResolvedRoute {
    path: string;
    source: string;
    /**
     * true  = page de détail propre à ce contenu (dédoublonnage par chemin)
     * false = simple page de section (plusieurs contenus peuvent pointer vers
     *         elle : on dédoublonne par id pour ne pas les fusionner)
     */
    detail: boolean;
}

type WpPostWithCategories = WpPost & { categories?: number[] };

interface SearchSource {
    key: string;
    load: (params: Params) => Promise<WpPost[]>;
    resolve: (post: WpPostWithCategories) => ResolvedRoute | null;
}

/* -------------------------------------------------------------------------- */
/*  Configuration                                                              */
/* -------------------------------------------------------------------------- */

const MAX_QUERY_LENGTH = 100;
const PER_SOURCE = 15;
const MAX_RESULTS = 60;

// Catégories WP non exposées dans constants.ts.
// Attention : constants.ts nomme CAT_LOIS = 42, alors que api.ts documente
// 42 comme la catégorie "structures" : on suit api.ts.
const CAT_STRUCTURES = 42;
const CAT_GOUVERNEMENT = 7;

/**
 * Cas particuliers : un slug WP précis → une page Next précise.
 * Prioritaire sur les catégories. C'est ici qu'on ajoute une page WP
 * quand un log "[/api/search] non routé" apparaît en développement.
 */
const SLUG_ROUTES: Record<string, { path: string; source: string }> = {
    "textes-et-lois": { path: "/texts-and-laws", source: "Page" },
    "dispositions-constitutionnelles": { path: "/about/reference-texts", source: "Textes de référence" },
    "lois-organiques": { path: "/about/reference-texts", source: "Textes de référence" },
    "sources-reglementaires": { path: "/about/reference-texts", source: "Textes de référence" },
    "textes-sur-les-services": { path: "/about/reference-texts", source: "Textes de référence" },
    "vos-senateurs": { path: "/your-senators", source: "Page" },
    "la-structure-administrative-du-senat": {
        path: "/about/administrative-structures",
        source: "Structures administratives",
    },
    "questions-ecrites": {
        path: "/parliamentary-proceedings/written-questions",
        source: "Questions écrites",
    },
};

interface CategoryRoute {
    ids: number[];
    source: string;
    path: (slug: string) => string;
    detail: boolean;
}

/**
 * Catégorie WP → route Next. Le premier bloc qui correspond gagne.
 * Quand le site n'a pas de page de détail connue, on renvoie vers la page de
 * section (detail: false) plutôt que d'inventer une URL qui ferait un 404.
 */
const CATEGORY_ROUTES: CategoryRoute[] = [
    {
        ids: [CAT_LOIS_ADOPTES],
        source: "Texte de loi",
        path: (slug) => `/texts-and-laws/${slug}`,
        detail: true,
    },
    {
        ids: [CAT_ORDRE_JOUR, CAT_DELIBERATION],
        source: "Délibération / Ordre du jour",
        path: (slug) =>
            `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${slug}`,
        detail: true,
    },
    { ids: [CAT_STRUCTURES], source: "Structures", path: () => "/about/structures", detail: false },
    {
        ids: [CAT_GOUVERNEMENT],
        source: "Questions écrites",
        path: () => "/parliamentary-proceedings/written-questions",
        detail: false,
    },
    { ids: [CAT_CALENDRIER], source: "Calendrier parlementaire", path: () => "/agenda", detail: false },
    { ids: [CAT_AUDIO], source: "Médias – audio", path: () => "/channel-tv-and-radio/audio", detail: false },
    { ids: [CAT_VIDEO], source: "Médias – vidéo", path: () => "/channel-tv-and-radio", detail: false },
    // app/others/[slug] existe (vérifié dans l'arborescence app/).
    {
        ids: [CAT_AUTRE, CAT_DIVERS, CAT_PUBLICATION],
        source: "Autres",
        path: (slug) => `/others/${slug}`,
        detail: true,
    },
];

/** Résolution générique pour les pages et articles standards. */
function resolveByContent(post: WpPostWithCategories): ResolvedRoute | null {
    // 1. Slug connu
    const bySlug = SLUG_ROUTES[post.slug];
    if (bySlug) return { ...bySlug, detail: true };

    // 2. Catégorie avec page de détail (ex. textes de loi, délibérations)
    const categories = post.categories ?? [];
    const matches = CATEGORY_ROUTES.filter((rule) => rule.ids.some((id) => categories.includes(id)));
    const withDetail = matches.find((rule) => rule.detail);
    if (withDetail) {
        return { path: withDetail.path(post.slug), source: withDetail.source, detail: true };
    }

    // 3. Titre identique à un libellé du menu (ex. "Travaux législatifs")
    const navPath = NAV_BY_TITLE.get(normalize(cleanText(post.title?.rendered)));
    if (navPath) return { path: navPath, source: "Page", detail: true };

    // 4. Catégorie sans détail connu : page de section
    const section = matches[0];
    if (section) return { path: section.path(post.slug), source: section.source, detail: false };

    return null;
}

/** Résolution pour les types de contenu dont la route Next est fixe. */
function fixedRoute(path: (slug: string) => string, source: string) {
    return (post: WpPostWithCategories): ResolvedRoute => ({
        path: path(post.slug),
        source,
        detail: true,
    });
}

/**
 * Toutes les sources WordPress interrogées. Pour couvrir un nouveau type de
 * contenu (nouveau CPT, nouvelle République...) : une ligne ici.
 */
const SOURCES: SearchSource[] = [
    { key: "page", load: getPages, resolve: resolveByContent },
    // Tous les articles, toutes catégories confondues (plus de liste de
    // catégories à maintenir) : le routage se fait ensuite via CATEGORY_ROUTES.
    { key: "post", load: getPosts, resolve: resolveByContent },
    { key: "actualite", load: getActualite, resolve: fixedRoute((s) => `/press-area/news/${s}`, "Actualité") },
    { key: "alaune", load: getAlaune, resolve: fixedRoute((s) => `/press-area/news/${s}`, "À la une") },
    {
        key: "audience",
        load: getAudiences,
        resolve: fixedRoute((s) => `/international/presidents-activities/${s}`, "Activité du Président"),
    },
    {
        key: "delegation",
        load: getDelegations,
        resolve: fixedRoute((s) => `/international/presidents-activities/${s}`, "Activité du Président"),
    },
    {
        key: "international",
        load: getInternational,
        resolve: fixedRoute((s) => `/international/presidents-activities/${s}`, "Activité du Président"),
    },
    { key: "republique", load: getAllRepubliques, resolve: fixedRoute((s) => `/historical/${s}`, "Historique") },
];

/* -------------------------------------------------------------------------- */
/*  Nettoyage de texte                                                         */
/* -------------------------------------------------------------------------- */

const NAMED_ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    rsquo: "’",
    lsquo: "‘",
    rdquo: "”",
    ldquo: "“",
    laquo: "«",
    raquo: "»",
    hellip: "…",
    ndash: "–",
    mdash: "—",
};

function decodeOnce(text: string): string {
    return text
        .replace(/&#(\d+);/g, (m, dec: string) => safeCodePoint(Number(dec), m))
        .replace(/&#x([0-9a-fA-F]+);/g, (m, hex: string) => safeCodePoint(parseInt(hex, 16), m))
        .replace(/&([a-zA-Z]+);/g, (m, name: string) => NAMED_ENTITIES[name] ?? m);
}

function safeCodePoint(code: number, fallback: string): string {
    try {
        return String.fromCodePoint(code);
    } catch {
        return fallback;
    }
}

/** Deux passes : WordPress renvoie parfois des entités doublement encodées (&amp;#8217;). */
function decodeEntities(text: string): string {
    return decodeOnce(decodeOnce(text));
}

function cleanText(html?: string | null): string {
    if (!html) return "";
    const withoutBlocks = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");
    const withoutTags = withoutBlocks.replace(/<[^>]*>/g, " ");
    return decodeEntities(withoutTags).replace(/\s+/g, " ").trim();
}

/** Minuscules + sans accents, pour comparer "Sénat" et "senat". */
function normalize(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function tokenize(query: string): string[] {
    return normalize(query)
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length >= 2);
}

/* -------------------------------------------------------------------------- */
/*  Extrait & score de pertinence                                              */
/* -------------------------------------------------------------------------- */

const SNIPPET_BEFORE = 100;
const SNIPPET_AFTER = 160;

/**
 * Extrait affiché : l'extrait WP s'il contient le terme, sinon un passage du
 * contenu autour de la première occurrence (un terme comme "HCC" est souvent
 * dans le corps du texte et pas dans l'extrait).
 */
function buildExcerpt(post: WpPost, tokens: string[]): string {
    const excerpt = cleanText(post.excerpt?.rendered);
    if (tokens.length === 0) return excerpt;

    const excerptNorm = normalize(excerpt);
    if (tokens.some((t) => excerptNorm.includes(t))) return excerpt;

    const content = cleanText((post as { content?: { rendered?: string } }).content?.rendered);
    const contentNorm = normalize(content);
    // Sécurité : la normalisation doit conserver les longueurs pour que les index restent valides.
    if (content && contentNorm.length === content.length) {
        const positions = tokens.map((t) => contentNorm.indexOf(t)).filter((i) => i >= 0);
        if (positions.length > 0) {
            const hit = Math.min(...positions);
            const start = Math.max(0, hit - SNIPPET_BEFORE);
            const end = Math.min(content.length, hit + SNIPPET_AFTER);
            const slice = content.slice(start, end).trim();
            return `${start > 0 ? "… " : ""}${slice}${end < content.length ? " …" : ""}`;
        }
    }
    return excerpt || content.slice(0, 200);
}

function computeScore(title: string, excerpt: string, phrase: string, tokens: string[]): number {
    const t = normalize(title);
    const e = normalize(excerpt);
    let score = t.includes(phrase) ? 10 : 0;
    for (const tok of tokens) {
        if (t.includes(tok)) score += 3;
        if (e.includes(tok)) score += 1;
    }
    return score;
}

/* -------------------------------------------------------------------------- */
/*  Navigation statique                                                        */
/* -------------------------------------------------------------------------- */

/** libellé de menu normalisé → chemin (sert à router les pages dont le titre = un item du menu). */
const NAV_BY_TITLE: Map<string, string> = (() => {
    const map = new Map<string, string>();
    for (const item of navItems) {
        if (!map.has(normalize(item.label))) map.set(normalize(item.label), item.path);
        for (const child of item.children ?? []) {
            if (!map.has(normalize(child.label))) map.set(normalize(child.label), child.path);
        }
    }
    return map;
})();

function getStaticNavResults(phrase: string, tokens: string[]): ScoredResult[] {
    const flat: { label: string; path: string; parent?: string }[] = [];
    for (const item of navItems) {
        flat.push({ label: item.label, path: item.path });
        if (item.children) {
            for (const child of item.children) {
                flat.push({ label: child.label, path: child.path, parent: item.label });
            }
        }
    }

    return flat
        .filter((item) => {
            const label = normalize(item.label);
            return tokens.length > 0 ? tokens.every((t) => label.includes(t)) : label.includes(phrase);
        })
        .map((item) => ({
            id: `nav-${item.path.replace(/[^a-z0-9]+/gi, "-")}`,
            title: item.label,
            excerpt: item.parent ? `${item.parent} › ${item.label}` : `Page de navigation : ${item.label}`,
            date: null,
            path: item.path,
            source: "Navigation du site",
            // Un libellé de menu qui correspond est un très bon résultat.
            score: computeScore(item.label, "", phrase, tokens) + 5,
        }));
}

/* -------------------------------------------------------------------------- */
/*  Handler                                                                    */
/* -------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {
    const query = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, MAX_QUERY_LENGTH);
    if (!query) return NextResponse.json([]);

    const phrase = normalize(query);
    const tokens = tokenize(query);

    const params: Params = {
        search: query,
        per_page: PER_SOURCE,
        orderby: "relevance",
        // Pas besoin de l'embed, et on limite le payload aux champs utilisés.
        _embed: false,
        _fields: "id,slug,date,title,excerpt,content,categories,type",
    };

    const settled = await Promise.allSettled(SOURCES.map((s) => s.load(params)));

    const results: ScoredResult[] = getStaticNavResults(phrase, tokens);
    const seen = new Set<string>(results.map((r) => `path:${r.path}`));
    const unrouted: string[] = [];
    const unroutedDetails: Record<string, unknown>[] = [];
    const sourceStats: Record<string, number | string> = {};
    let failures = 0;

    settled.forEach((res, i) => {
        const source = SOURCES[i];
        if (res.status === "rejected") {
            failures++;
            sourceStats[source.key] = "erreur";
            console.warn(`[/api/search] source "${source.key}" indisponible:`, res.reason);
            return;
        }

        sourceStats[source.key] = res.value.length;
        for (const post of res.value) {
            const route = source.resolve(post as WpPostWithCategories);
            if (!route) {
                unrouted.push(`${source.key}:${post.slug}`);
                unroutedDetails.push({
                    source: source.key,
                    id: post.id,
                    slug: post.slug,
                    title: cleanText(post.title?.rendered),
                    type: (post as { type?: string }).type,
                    categories: (post as WpPostWithCategories).categories,
                });
                continue;
            }

            const dedupeKey = route.detail ? `path:${route.path}` : `id:${source.key}-${post.id}`;
            if (seen.has(dedupeKey)) continue;
            seen.add(dedupeKey);

            const title = cleanText(post.title?.rendered) || "Sans titre";
            const excerpt = buildExcerpt(post, tokens);
            results.push({
                id: `${source.key}-${post.id}`,
                title,
                excerpt,
                date: post.date ?? null,
                path: route.path,
                source: route.source,
                score: computeScore(title, excerpt, phrase, tokens),
            });
        }
    });

    if (unrouted.length > 0 && process.env.NODE_ENV !== "production") {
        console.warn(
            `[/api/search] ${unrouted.length} résultat(s) WP non routé(s), ignoré(s). ` +
            `Ajouter un slug dans SLUG_ROUTES ou une catégorie dans CATEGORY_ROUTES :`,
            unrouted,
        );
    }

    // Si tout WordPress est injoignable, on le dit au client au lieu de renvoyer "0 résultat".
    if (failures === SOURCES.length && results.length === 0) {
        return NextResponse.json({ error: "Recherche indisponible" }, { status: 502 });
    }

    results.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const da = a.date ? Date.parse(a.date) : 0;
        const db = b.date ? Date.parse(b.date) : 0;
        return db - da;
    });

    const payload: UnifiedSearchResult[] = results
        .slice(0, MAX_RESULTS)
        .map((r) => ({
            id: r.id,
            title: r.title,
            excerpt: r.excerpt,
            date: r.date,
            path: r.path,
            source: r.source,
        }));

    // Diagnostic (hors production) : /api/search?q=...&debug=1
    if (process.env.NODE_ENV !== "production" && request.nextUrl.searchParams.get("debug") === "1") {
        type WpHit = { id: number; title: string; url: string; type: string; subtype: string };
        // /wp/v2/search interroge TOUS les types de contenu, comme le ?s= de l'ancien site.
        const hits = await fetchAPI<WpHit[]>(
            "/search",
            { search: query, per_page: 50, subtype: "any" },
            true,
        ).catch((err: unknown) => String(err));

        const returnedIds = new Set(results.map((r) => r.id));
        const keyOf = (subtype: string) => (subtype.startsWith("republique") ? "republique" : subtype);

        return NextResponse.json({
            query,
            tokens,
            sourceStats,
            unrouted: unroutedDetails,
            wpSearch: Array.isArray(hits)
                ? hits.map((h) => ({
                    id: h.id,
                    title: cleanText(h.title),
                    subtype: h.subtype,
                    url: h.url,
                    inResults: returnedIds.has(`${keyOf(h.subtype)}-${h.id}`),
                }))
                : hits,
            results: payload,
        });
    }

    return NextResponse.json(payload);
}