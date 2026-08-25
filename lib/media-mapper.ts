import type { WpPost } from '@/lib/types';
import type { MediaItem, MediaType } from '@/types/media';

/**
 * Extrait un ID YouTube depuis une chaîne (URL, ID direct, ou code HTML).
 */
export function extractYoutubeId(value: unknown): string {
    if (typeof value !== 'string') return '';
    // Si c'est déjà un ID de 11 caractères
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

    // Patterns pour extraire depuis une URL
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        // Pattern pour iframe embed (src="...")
        /src=["'](?:https?:)?\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})["']/,
        // Pattern pour l'URL d'image thumbnail (img.youtube.com/vi/ID/...)
        /img\.youtube\.com\/vi\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const regex of patterns) {
        const match = value.match(regex);
        if (match) return match[1];
    }
    return '';
}

export function extractMediaItem(post: WpPost, mediaType: MediaType): MediaItem {
    const acf = (post.acf || {}) as Record<string, unknown>;
    let youtubeId = '';

    if (mediaType === 'youtube') {
        // 1. Depuis le champ ACF dédié
        youtubeId = extractYoutubeId(acf.youtube_id);
        // 2. Depuis le champ ACF media_url
        if (!youtubeId && acf.media_url) {
            youtubeId = extractYoutubeId(acf.media_url);
        }
        // 3. Depuis le contenu de l'article (post.content.rendered)
        if (!youtubeId && post.content?.rendered) {
            youtubeId = extractYoutubeId(post.content.rendered);
        }
        // 4. (Fallback) Depuis l'excerpt, au cas où
        if (!youtubeId && post.excerpt?.rendered) {
            youtubeId = extractYoutubeId(post.excerpt.rendered);
        }
    }

    const mediaUrl = typeof acf.media_url === 'string' ? acf.media_url : '';
    const duration = typeof acf.duration === 'number' ? acf.duration : undefined;
    // Thumbnail : priorité à l'image mise en avant, sinon thumbnail YouTube si ID trouvé
    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '');

    return {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
        mediaType,
        mediaUrl,
        youtubeId,
        thumbnail,
        duration,
        post,
    };
}