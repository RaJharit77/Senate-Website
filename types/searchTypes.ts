import { Params } from "@/lib/wordpress";
import { WpPost } from "@/lib/wp-types";

/** Forme renvoyée au client (inchangée : app/search/page.tsx n'a rien à adapter). */
export interface UnifiedSearchResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

export type ScoredResult = UnifiedSearchResult & { score: number };

/** Route Next.js garantie pour un contenu WordPress. */
export interface ResolvedRoute {
    path: string;
    source: string;
    /**
     * true  = page de détail propre à ce contenu (dédoublonnage par chemin)
     * false = simple page de section (plusieurs contenus peuvent pointer vers
     *         elle : on dédoublonne par id pour ne pas les fusionner)
     */
    detail: boolean;
}

export type WpPostWithCategories = WpPost & {
    categories?: number[];
    type?: string;
    parent?: number;
    template?: string;
};

export interface SearchSource {
    key: string;
    load: (params: Params) => Promise<WpPost[]>;
    resolve: (post: WpPostWithCategories) => ResolvedRoute | null;
}