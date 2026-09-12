/**
 * Extrait la première URL d'image d'un contenu HTML WordPress (content.rendered
 * ou excerpt.rendered). Fallback quand `featured_media` est absent ou à 0.
 */
export function extractFirstImageFromContent(html: string | undefined | null): string {
    if (!html) return "";

    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch?.[1]) {
        return imgMatch[1];
    }

    return "";
}

/**
 * Résout l'image d'un post WordPress, par ordre de priorité :
 * _embedded > featured_media (getMedia) > content.rendered > excerpt.rendered > "".
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

    // 2. featured_media (si > 0 ; getMedia(0) échoue ou renvoie n'importe quoi)
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