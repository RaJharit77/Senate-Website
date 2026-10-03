import { getRepubliqueI, getRepubliqueII, getRepubliqueIII, getRepubliqueIV } from "@/lib/api";
import { splitTransitionBlock, stripLeadingH2 } from "@/lib/sanitizeWpContent";
import type { WpPost } from "@/lib/wp-types";
import { ContentMap, RepublicId } from "@/types/historyType";

// L'API utilise la numérotation romaine (I-IV), les clés internes des
// ordinaux anglais : cette table fait le lien.
export const REPUBLIC_IDS: RepublicId[] = ["first", "second", "third", "fourth"];

export const REPUBLIC_FETCHERS: Record<RepublicId, () => Promise<WpPost[]>> = {
    first: getRepubliqueI,
    second: getRepubliqueII,
    third: getRepubliqueIII,
    fourth: getRepubliqueIV,
};

export const EMPTY_CONTENT: ContentMap = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    transition: "",
};

/**
 * Construit la ContentMap depuis les résultats de Promise.allSettled, en
 * regroupant tous les blocs de transition dans un seul onglet "transition".
 */
export function buildContentMap(
    ids: RepublicId[],
    results: PromiseSettledResult<WpPost[]>[]
): ContentMap {
    const next: ContentMap = { ...EMPTY_CONTENT };
    const transitionParts: string[] = [];

    results.forEach((result, index) => {
        const id = ids[index];
        if (result.status === "fulfilled" && result.value[0]) {
            const rawHtml = result.value[0].content.rendered;
            const { before, transition } = splitTransitionBlock(rawHtml);
            if (transition) transitionParts.push(transition);
            next[id] = stripLeadingH2(before);
        } else if (result.status === "rejected") {
            console.error(`[HistoryPage] Erreur chargement ${id}:`, result.reason);
        }
    });

    next.transition = transitionParts
        .map((block) => stripLeadingH2(block))
        .join('<hr class="history-hr" />');

    return next;
}