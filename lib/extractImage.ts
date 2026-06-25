/**
 * Extrait la première URL d'image valide trouvée dans un contenu HTML
 * (typiquement `content.rendered` ou `excerpt.rendered` d'un post WordPress).
 *
 * Utile en fallback quand le post n'a pas de `featured_media` défini
 * (ou que celui-ci vaut 0 / est absent), ce qui était la cause du
 * 404 sur `default.jpg` dans le thème WordPress.
 */
export function extractFirstImageFromContent(html: string | undefined | null): string {
    if (!html) return "";

    // 1. Cherche un <img src="...">
    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch?.[1]) {
        return imgMatch[1];
    }

    return "";
}

/**
 * Détermine l'URL d'image à utiliser pour un post WordPress, avec une
 * cascade de fallbacks :
 * 1. wp:featuredmedia déjà résolu via _embed
 * 2. featured_media résolu via un appel getMedia() (si > 0)
 * 3. Première image trouvée dans content.rendered
 * 4. Première image trouvée dans excerpt.rendered
 * 5. "" (chaîne vide -> à gérer côté composant avec un placeholder)
 */
export async function resolvePostImage(
    item: {
        _embedded?: { ["wp:featuredmedia"]?: Array<{ source_url?: string }> };
        featured_media?: number;
        content?: { rendered?: string };
        excerpt?: { rendered?: string };
    },
    getMedia: (id: number) => Promise<unknown>
): Promise<string> {
    // 1. _embedded
    const embeddedUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;

    // 2. featured_media (uniquement si > 0, sinon getMedia(0) échoue ou renvoie n'importe quoi)
    if (item.featured_media && item.featured_media > 0) {
        try {
            const media = (await getMedia(item.featured_media)) as { source_url?: string } | undefined;
            if (media?.source_url) return media.source_url;
        } catch {
            // on continue vers les fallbacks suivants
        }
    }

    // 3. Image dans le contenu
    const fromContent = extractFirstImageFromContent(item.content?.rendered);
    if (fromContent) return fromContent;

    // 4. Image dans l'extrait
    const fromExcerpt = extractFirstImageFromContent(item.excerpt?.rendered);
    if (fromExcerpt) return fromExcerpt;

    // 5. Rien trouvé
    return "";
}