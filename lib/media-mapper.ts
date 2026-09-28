import type { WpPost } from '@/lib/wp-types';
import type { MediaItem, MediaType } from '@/types/media';

/**
 * Extrait un ID YouTube depuis une chaîne (URL, ID direct, ou code HTML).
 */
export function extractYoutubeId(value: unknown): string {
    if (typeof value !== 'string') return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        /src=["'](?:https?:)?\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})["']/,
        /img\.youtube\.com\/vi\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const regex of patterns) {
        const match = value.match(regex);
        if (match) return match[1];
    }
    return '';
}

/**
 * Extrait une URL de vidéo Facebook depuis une chaîne (lien direct, iframe, etc.)
 */
export function extractFacebookUrl(value: unknown): string {
    if (typeof value !== 'string') return '';
    // Patterns pour les URLs Facebook
    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:watch\?v=|plugins\/video\.php\?href=)([^&\s]+)/,
        /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[^\/]+\/videos\/(\d+)/,
    ];
    for (const regex of patterns) {
        const match = value.match(regex);
        if (match) {
            // Si c'est un plugin, on extrait le href
            if (value.includes('plugins/video.php?href=')) {
                const hrefMatch = value.match(/href=([^&]+)/);
                if (hrefMatch) return decodeURIComponent(hrefMatch[1]);
            }
            // Sinon on retourne l'URL complète
            return match[0];
        }
    }
    return '';
}

/**
 * Transforme un post WordPress en MediaItem.
 * Le `mediaType` passé en paramètre est utilisé comme indice, mais la fonction
 * tente de détecter automatiquement YouTube ou Facebook.
 */
export function extractMediaItem(post: WpPost, mediaType: MediaType): MediaItem {
    const acf = (post.acf || {}) as Record<string, unknown>;
    let youtubeId = '';
    let detectedType = mediaType;

    // On tente de détecter YouTube en premier (priorité)
    if (mediaType === 'youtube' || mediaType === 'video') {
        youtubeId = extractYoutubeId(acf.youtube_id);
        if (!youtubeId && acf.media_url) {
            youtubeId = extractYoutubeId(acf.media_url);
        }
        if (!youtubeId && post.content?.rendered) {
            youtubeId = extractYoutubeId(post.content.rendered);
        }
        if (youtubeId) {
            detectedType = 'youtube';
        }
    }

    const mediaUrl = typeof acf.media_url === 'string' ? acf.media_url : '';
    const duration = typeof acf.duration === 'number' ? acf.duration : undefined;

    // Thumbnail : image mise en avant, sinon miniature YouTube si disponible
    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '');

    // Construction de l'URL d'embed
    let embedUrl = '';
    if (detectedType === 'youtube' && youtubeId) {
        embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    } 

    return {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
        mediaType: detectedType,
        mediaUrl,
        youtubeId,
        thumbnail,
        duration,
        post,
        embedUrl,
    };
}