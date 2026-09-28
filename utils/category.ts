import { CAT_AUDIO, CAT_AUTRE, CAT_CALENDRIER, CAT_DELIBERATION, CAT_DIVERS, CAT_LOIS_ADOPTES, CAT_ORDRE_JOUR, CAT_PUBLICATION, CAT_VIDEO, SNIPPET_AFTER, SNIPPET_BEFORE } from "@/constants/constants";
import { CAT_GOUVERNEMENT, CAT_STRUCTURES, SLUG_ROUTES } from "./search";
import { ResolvedRoute, ScoredResult, SearchSource, WpPostWithCategories } from "@/types/searchTypes";
import { getActualite, getAlaune, getAllRepubliques, getAudiences, getDelegations, getInternational, getPages, getPosts } from "@/lib/api";
import type { WpPost } from "@/lib/wp-types";
import { navItems } from "@/lib/navigations/navigation";

export interface CategoryRoute {
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
export const CATEGORY_ROUTES: CategoryRoute[] = [
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
    // Pas de route dynamique sous app/about : on renvoie vers la page de section.
    { ids: [CAT_STRUCTURES], source: "Structures", path: () => "/about/structures", detail: false },
    // app/parliamentary-proceedings/written-questions/[slug]
    {
        ids: [CAT_GOUVERNEMENT],
        source: "Questions écrites",
        path: (slug) => `/parliamentary-proceedings/written-questions/${slug}`,
        detail: true,
    },
    // app/agenda/[slug]
    {
        ids: [CAT_CALENDRIER],
        source: "Calendrier parlementaire",
        path: (slug) => `/agenda/${slug}`,
        detail: true,
    },
    // app/channel-tv-and-radio/{audio,video,editing}/[slug]
    {
        ids: [CAT_AUDIO],
        source: "Médias – audio",
        path: (slug) => `/channel-tv-and-radio/audio/${slug}`,
        detail: true,
    },
    {
        ids: [CAT_VIDEO],
        source: "Médias – vidéo",
        path: (slug) => `/channel-tv-and-radio/video/${slug}`,
        detail: true,
    },
    // app/others/[slug] existe (vérifié dans l'arborescence app/).
    {
        ids: [CAT_AUTRE, CAT_DIVERS, CAT_PUBLICATION],
        source: "Autres",
        path: (slug) => `/others/${slug}`,
        detail: true,
    },
];

/** "RABEMANANJARA Jean Paul Nicolas", "RAKOTOBE RAMAROSOA Emiline" : NOM(S) en capitales puis prénom(s). */
export function looksLikePersonName(title: string): boolean {
    return /^\p{Lu}{2,}(?:[ '’-]\p{Lu}{2,})*\s+\p{Lu}\p{Ll}/u.test(title);
}

/** Résolution générique pour les pages et articles standards. */
export function resolveByContent(post: WpPostWithCategories): ResolvedRoute | null {
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

    // 5. Fiche de sénateur : page WP (sans catégorie) titrée "NOM Prénom(s)".
    //    Rendue par app/your-senators/[slug] (getSenatorBySlug lit d'abord les pages).
    //    Heuristique sur le titre ; si les fiches partagent un `parent` ou un
    //    `template` WP, remplacer par un test sur ce champ (visible avec &debug=1).
    if (post.type === "page" && looksLikePersonName(cleanText(post.title?.rendered))) {
        return { path: `/your-senators/${post.slug}`, source: "Sénateur", detail: true };
    }

    return null;
}

/** Résolution pour les types de contenu dont la route Next est fixe. */
export function fixedRoute(path: (slug: string) => string, source: string) {
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
export const SOURCES: SearchSource[] = [
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

export const NAMED_ENTITIES: Record<string, string> = {
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

export function decodeOnce(text: string): string {
    return text
        .replace(/&#(\d+);/g, (m, dec: string) => safeCodePoint(Number(dec), m))
        .replace(/&#x([0-9a-fA-F]+);/g, (m, hex: string) => safeCodePoint(parseInt(hex, 16), m))
        .replace(/&([a-zA-Z]+);/g, (m, name: string) => NAMED_ENTITIES[name] ?? m);
}

export function safeCodePoint(code: number, fallback: string): string {
    try {
        return String.fromCodePoint(code);
    } catch {
        return fallback;
    }
}

/** Deux passes : WordPress renvoie parfois des entités doublement encodées (&amp;#8217;). */
export function decodeEntities(text: string): string {
    return decodeOnce(decodeOnce(text));
}

export function cleanText(html?: string | null): string {
    if (!html) return "";
    const withoutBlocks = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");
    const withoutTags = withoutBlocks.replace(/<[^>]*>/g, " ");
    return decodeEntities(withoutTags).replace(/\s+/g, " ").trim();
}

/** Minuscules + sans accents, pour comparer "Sénat" et "senat". */
export function normalize(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function tokenize(query: string): string[] {
    return normalize(query)
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length >= 2);
}

/**
 * Extrait affiché : l'extrait WP s'il contient le terme, sinon un passage du
 * contenu autour de la première occurrence (un terme comme "HCC" est souvent
 * dans le corps du texte et pas dans l'extrait).
 */
export function buildExcerpt(post: WpPost, tokens: string[]): string {
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

export function computeScore(title: string, excerpt: string, phrase: string, tokens: string[]): number {
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
export const NAV_BY_TITLE: Map<string, string> = (() => {
    const map = new Map<string, string>();
    for (const item of navItems) {
        if (!map.has(normalize(item.label))) map.set(normalize(item.label), item.path);
        for (const child of item.children ?? []) {
            if (!map.has(normalize(child.label))) map.set(normalize(child.label), child.path);
        }
    }
    return map;
})();

export function getStaticNavResults(phrase: string, tokens: string[]): ScoredResult[] {
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