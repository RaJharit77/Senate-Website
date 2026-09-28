import { NextRequest, NextResponse } from "next/server";
import { fetchAPI } from "@/lib/api";
import type { Params } from "@/lib/wordpress";
import { MAX_RESULTS } from "@/constants/constants";
import { ScoredResult, UnifiedSearchResult, WpPostWithCategories } from "@/types/searchTypes";
import { MAX_QUERY_LENGTH, PER_SOURCE } from "@/utils/search";
import { buildExcerpt, computeScore, getStaticNavResults, normalize, SOURCES, tokenize } from "@/utils/category";
import { cleanText } from "@/utils/utility";

export const dynamic = "force-dynamic";

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
        _fields: "id,slug,date,title,excerpt,content,categories,type,parent,template",
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
                    parent: (post as WpPostWithCategories).parent,
                    template: (post as WpPostWithCategories).template,
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