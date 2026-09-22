import {
    CAT_AUDIO,
    CAT_AUDIO_PODCAST,
    CAT_MONTAGE,
    CAT_VIDEO,
    CAT_VIDEO_HOSTED,
    CF7_CONTAINER_POST,
    CF7_FORM_ID,
    CF7_LOCALE,
    CF7_UNIT_TAG,
    CF7_VERSION,
    LIVE_STREAM_URL,
} from "@/constants/constants";
import type { WpCategory, WpPost } from "@/lib/wp-types";
import type { LiveStatus } from "@/types/media";
import {
    ContactFormFields,
    ContactFormResult,
    WP_ROOT,
} from "@/types/contactType";
import { PresidentActivity } from "@/types/internationalType";
import { extractYoutubeId } from "./media-mapper";
import {
    LIVE_YOUTUBE_CHANNEL_ID,
    LIVE_YOUTUBE_API_KEY,
} from "@/constants/constants";
import { API_BASE, isClient, Params } from "./wordpress";

class WpApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public url?: string,
    ) {
        super(message);
        this.name = "WpApiError";
    }
}

async function fetchViaProxy<T>(
    endpoint: string,
    params: Params = {},
): Promise<T> {
    const url = new URL(`/api/proxy/${endpoint}`, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });
    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Proxy error: ${res.status}`);
    }
    return res.json();
}

export async function fetchAPI<T>(
    endpoint: string,
    params: Params = {},
    silent: boolean = false,
): Promise<T> {
    if (isClient) {
        try {
            return await fetchViaProxy<T>(endpoint, params);
        } catch (err) {
            if (!silent)
                console.error(`[fetchAPI] Proxy error for ${endpoint}:`, err);
            throw new WpApiError(`Proxy error for ${endpoint}`, undefined, endpoint);
        }
    }

    const url = new URL(`${API_BASE}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    let res: Response;
    try {
        res = await fetch(url.toString(), {
            // UA "Next.js" parfois bloqué par WP (Wordfence, CDN...) : on
            // utilise un UA navigateur pour éviter les réponses HTML silencieuses.
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
                Accept: "application/json",
            },
            next: { revalidate: 3600 }, // 1 hour
        });
    } catch (err) {
        // Erreur réseau (DNS, timeout, connexion refusée...)
        console.error(`[fetchAPI] Network error for ${url.toString()}:`, err);
        throw new WpApiError(
            `Network error while fetching ${url.toString()}`,
            undefined,
            url.toString(),
        );
    }

    if (!res.ok) {
        const bodyPreview = await res.text().catch(() => "<unreadable body>");
        if (!silent) {
            console.error(
                `[fetchAPI] HTTP ${res.status} for ${url.toString()}\nBody preview: ${bodyPreview.slice(0, 300)}`,
            );
        }
        throw new WpApiError(
            `Failed to fetch ${url.toString()}: ${res.status}`,
            res.status,
            url.toString(),
        );
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        // Blocage silencieux typique : 200 OK mais page HTML (anti-bot, maintenance...)
        const bodyPreview = await res.text().catch(() => "<unreadable body>");
        console.error(
            `[fetchAPI] Unexpected content-type "${contentType}" for ${url.toString()}\nBody preview: ${bodyPreview.slice(0, 300)}`,
        );
        throw new WpApiError(
            `Unexpected non-JSON response from ${url.toString()}`,
            res.status,
            url.toString(),
        );
    }

    try {
        return (await res.json()) as T;
    } catch (err) {
        console.error(`[fetchAPI] JSON parse error for ${url.toString()}:`, err);
        throw new WpApiError(
            `Invalid JSON from ${url.toString()}`,
            res.status,
            url.toString(),
        );
    }
}

// ----- Posts (default) -----
export function getPosts(params: Params = {}) {
    return fetchAPI<WpPost[]>("/posts", { _embed: true, ...params });
}
// ---- Posts by category ----
export function getPostsByCategory(categoryId: number, params: Params = {}) {
    return getPosts({ categories: categoryId, ...params });
}

// ----- Custom Post Types -----
export function getActualite(params: Params = {}) {
    return fetchAPI<WpPost[]>("/actualite", { _embed: true, ...params });
}

// À la une
export function getAlaune(params: Params = {}) {
    return fetchAPI<WpPost[]>("/alaune", { _embed: true, ...params });
}

// International
export function getInternational(params: Params = {}) {
    return fetchAPI<WpPost[]>("/international", { _embed: true, ...params });
}

// CPT "audience" : audiences et visites de courtoisie du Président du Sénat.
export function getAudiences(params: Params = {}) {
    return fetchAPI<WpPost[]>("/audience", { _embed: true, ...params });
}

// CPT "delegation" (slug non confirmé) : accueil de délégations étrangères.
// Erreur neutralisée côté appelant (getPresidentActivities) si l'endpoint diffère ou est absent.
export function getDelegations(params: Params = {}) {
    return fetchAPI<WpPost[]>("/delegation", { _embed: true, ...params });
}

// Historique
export function getRepubliqueI(params: Params = {}) {
    return fetchAPI<WpPost[]>("/republiquei", { _embed: true, ...params });
}
export function getRepubliqueII(params: Params = {}) {
    return fetchAPI<WpPost[]>("/republiqueii", { _embed: true, ...params });
}
export function getRepubliqueIII(params: Params = {}) {
    return fetchAPI<WpPost[]>("/republiqueiii", { _embed: true, ...params });
}
export function getRepubliqueIV(params: Params = {}) {
    return fetchAPI<WpPost[]>("/republiqueiv", { _embed: true, ...params });
}
/*
// Pour une nouvelle république
export function getRepubliqueV(params: Params = {}) {
    return fetchAPI<WpPost[]>("/republiquev", { _embed: true, ...params });
}
**/

// ----- Républiques (textes constitutionnels) -----
// Agrège les 4 CPT "republiquei" à "iv" en une liste triée du plus récent au plus ancien.
export async function getAllRepubliques(params: Params = {}) {
    const results = await Promise.allSettled([
        getRepubliqueI(params),
        getRepubliqueII(params),
        getRepubliqueIII(params),
        getRepubliqueIV(params),
        /*getRepubliqueV(params),*/
    ]);

    results.forEach((r, i) => {
        if (r.status === "rejected") {
            console.error(`[getAllRepubliques] republique${i + 1} failed:`, r.reason);
        }
    });

    return results
        .filter(
            (r): r is PromiseFulfilledResult<WpPost[]> => r.status === "fulfilled",
        )
        .flatMap((r) => r.value)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Récupère un sénateur par son slug en priorité dans les pages WordPress,
 * puis dans les 4 CPT "republique*" si non trouvé.
 */
export async function getSenatorBySlug(slug: string): Promise<WpPost | null> {
    const page = await getPageBySlug(slug).catch(() => null);
    if (page) return page;

    const fetchers = [
        getRepubliqueI,
        getRepubliqueII,
        getRepubliqueIII,
        getRepubliqueIV,
        /*getRepubliqueV,*/
    ];
    for (const fetcher of fetchers) {
        try {
            const results = await fetcher({ slug, _embed: true });
            if (results && results.length > 0) {
                return results[0];
            }
        } catch (error) {
            console.error("Erreur pendant la récupération des sénateurs", error);
        }
    }
    return null;
}

/**
 * Récupère l'introduction de la page Historique (post "histoire-du-senat",
 * catégorie 40). Renvoie le titre, l'URL de l'image héro (extraite du
 * contenu car featured_media = 0) et le texte d'intro.
 */
export interface HistoryIntro {
    title: string;
    image: string | null;
    intro: string;
}

export async function getHistoryIntro(): Promise<HistoryIntro | null> {
    try {
        const posts = await fetchAPI<WpPost[]>("/posts", {
            slug: "histoire-du-senat",
            _embed: true,
            per_page: 1,
        });

        const post = posts[0];
        if (!post) return null;

        const html = post.content.rendered;

        // Image : première <img> du contenu (featured_media vaut 0 côté WP)
        const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
        const image =
            imgMatch?.[1] ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            null;

        // Intro : premier paragraphe textuel du contenu (hors titre/image)
        const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
        const intro = pMatch?.[1]?.replace(/<[^>]+>/g, "").trim() || "";

        return {
            title: post.title.rendered,
            image,
            intro,
        };
    } catch (err) {
        console.error("[getHistoryIntro] Erreur:", err);
        return null;
    }
}

// ----- Pages -----
export function getPages(params: Params = {}) {
    return fetchAPI<WpPost[]>("/pages", { _embed: true, ...params });
}

export function getPageBySlug(slug: string) {
    return getPages({ slug }).then((pages) => pages[0] || null);
}

export function getPageById(id: number) {
    return fetchAPI<WpPost>(`/pages/${id}`, { _embed: true });
}

// ----- Menus -----
export function getMenus() {
    return fetchAPI<unknown[]>("/menus");
}

export function getMenuItems(location: string) {
    return fetchAPI<unknown[]>(`/menu-items`, { menu: location });
}

// ----- Search -----
export function search(query: string) {
    return fetchAPI<unknown[]>("/search", { search: query });
}

/**
 * Recherche unifiée (voir app/api/search/route.ts) : agrège pages, textes et
 * lois, actualités, activités du Président, historique... et fournit un
 * chemin Next.js garanti par résultat, plutôt qu'une route déduite du WordPress.
 * Client uniquement (fetch relatif) — pas d'appel depuis un composant serveur.
 */
export async function searchSite(query: string): Promise<unknown[]> {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
        throw new Error(`Failed to search: ${res.status}`);
    }
    return res.json();
}

// ----- Media (optional) -----
export function getMedia(id: number) {
    return fetchAPI(`/media/${id}`, {}, true);
}

// ----- Médias (vidéos, audios) -----
export function getVideos(params: Params = {}) {
    return getPostsByCategory(CAT_VIDEO, { _embed: true, ...params });
}

export function getAudios(params: Params = {}) {
    return getPostsByCategory(CAT_AUDIO, { _embed: true, ...params });
}

/** Récupère l'URL du flux live TV (variable d'environnement). */
export function getLiveStreamUrl(): string {
    return LIVE_STREAM_URL;
}

/** Récupère tous les médias (vidéos + audios), triés du plus récent au plus ancien. */
export async function getAllMedia(params: Params = {}) {
    const [videos, audios] = await Promise.all([
        getVideos(params).catch(() => []),
        getAudios(params).catch(() => []),
    ]);
    const all = [...videos, ...audios];
    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return all;
}

// ----- Chaîne TV/Radio : contenus additionnels -----
// Complète getVideos()/getAudios() (CAT_VIDEO/CAT_AUDIO) avec les vidéos
// hébergées et montages — catégories WP à créer (cf. constants.ts). Tant que
// leur ID vaut 0, l'appel réseau est court-circuité pour éviter categories=0.
export function getVideosHosted(params: Params = {}) {
    if (!CAT_VIDEO_HOSTED) return Promise.resolve<WpPost[]>([]);
    return getPostsByCategory(CAT_VIDEO_HOSTED, { _embed: true, ...params });
}

export function getVideosHostedBySlug(params: Params = {}) {
    return getPostsByCategorySlug("video-hosted", { _embed: true, ...params });
}

// Alias intentionnel : CAT_AUDIO_PODCAST = CAT_AUDIO (35) pour l'instant.
// Permet à l'appelant d'exprimer "podcast" vs "audio" avant séparation côté WP.
export function getPodcasts(params: Params = {}) {
    if (!CAT_AUDIO_PODCAST) return getAudios(params);
    return getPostsByCategory(CAT_AUDIO_PODCAST, { _embed: true, ...params });
}

// "Mise en boîte" : rediffusions/montages édités (≠ direct, ≠ vidéo brute).
export function getMontages(params: Params = {}) {
    if (!CAT_MONTAGE) return Promise.resolve<WpPost[]>([]);
    return getPostsByCategory(CAT_MONTAGE, { _embed: true, ...params });
}

interface YoutubeLiveInfo {
    videoId: string;
    title?: string;
    startedAt?: string;
}

/**
 * Interroge YouTube Data API v3 pour détecter un direct sur la chaîne.
 * Coût : 100 unités/appel (quota 10 000/jour) ; le cache Next (revalidate 900s)
 * plafonne à ~96 appels/jour, sous la limite. Ne lève jamais : toute erreur
 * est traitée comme "pas de direct" pour laisser getTvLiveStatus se replier sur Facebook.
 */
async function checkYoutubeLive(): Promise<YoutubeLiveInfo | null> {
    if (!LIVE_YOUTUBE_CHANNEL_ID || !LIVE_YOUTUBE_API_KEY) {
        return null;
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('channelId', LIVE_YOUTUBE_CHANNEL_ID);
    url.searchParams.set('eventType', 'live');
    url.searchParams.set('type', 'video');
    url.searchParams.set('key', LIVE_YOUTUBE_API_KEY);

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate: 900 },
        });

        if (!res.ok) {
            console.error(`[checkYoutubeLive] YouTube API a répondu ${res.status}`);
            return null;
        }

        const data = await res.json();
        const item = data.items?.[0];
        if (!item?.id?.videoId) return null;

        return {
            videoId: item.id.videoId,
            title: item.snippet?.title,
            startedAt: item.snippet?.publishTime,
        };
    } catch (err) {
        console.error('[checkYoutubeLive] Erreur réseau:', err);
        return null;
    }
}

/** Statut du direct TV : détection YouTube en priorité, repli Facebook sinon. */
async function getTvLiveStatus(): Promise<LiveStatus> {
    const youtubeLive = await checkYoutubeLive();
    if (youtubeLive) {
        return {
            isLive: true,
            kind: 'tv',
            streamUrl: `https://www.youtube.com/embed/${youtubeLive.videoId}?autoplay=1`,
            sourceType: 'youtube',
            title: youtubeLive.title || 'Sénat TV en direct',
            startedAt: youtubeLive.startedAt,
        };
    }

    return { isLive: false, kind: 'tv', streamUrl: '', sourceType: 'url', title: 'Sénat TV' };
}

/**
 * Statut du direct radio : LIVE_AUDIO_STREAM_URL prime si défini, sinon
 * reprend le statut TV en kind='radio' (LivePlayer.tsx l'affiche alors en audio seul).
 */
async function getRadioLiveStatus(): Promise<LiveStatus> {
    const tv = await getTvLiveStatus();
    if (tv.isLive) {
        return {
            ...tv,
            kind: "radio",
            title: "Aucun flux radio dédié — le direct est disponible ci-dessous",
        };
    }

    return {
        isLive: false,
        kind: "radio",
        streamUrl: "",
        sourceType: "url",
        title: "Sénat Radio en direct",
    };
}

export async function getLiveStatus(kind: "tv" | "radio"): Promise<LiveStatus> {
    return kind === "tv" ? getTvLiveStatus() : getRadioLiveStatus();
}

/**
 * Agrège toutes les sources de la page Chaîne TV/Radio, en complétant
 * CAT_VIDEO par une recherche des vidéos YouTube dans tous les posts.
 */
export async function getAllChannelAndRadioMedia(params: Params = {}) {
    const perPage = typeof params.per_page === "number" ? params.per_page : 100;

    // Récupération des catégories dédiées
    const [youtubeCat, hosted, podcasts, montages] = await Promise.all([
        getVideos(params).catch(() => []),
        getVideosHosted(params).catch(() => []),
        getPodcasts(params).catch(() => []),
        getMontages(params).catch(() => []),
    ]);

    // Récupération de tous les posts (pour détecter les vidéos YouTube manquantes)
    const allPosts = await getPosts({ per_page: perPage, _embed: true }).catch(
        () => [],
    );

    // Filtrer les posts qui contiennent une vidéo YouTube (via extractYoutubeId)
    const extraYoutubePosts = allPosts.filter((post) => {
        if (youtubeCat.some((p) => p.id === post.id)) return false; // déjà dans la catégorie
        const content = post.content?.rendered || "";
        return extractYoutubeId(content) !== "";
    });

    // Fusion + dédoublonnage par id
    const youtube = [...youtubeCat, ...extraYoutubePosts];
    const youtubeUnique = Array.from(
        new Map(youtube.map((p) => [p.id, p])).values(),
    );

    return {
        youtube: youtubeUnique,
        hosted,
        podcasts,
        montages,
    };
}

/**
 * Récupère un média par slug en interrogeant uniquement sa catégorie WP
 * (pas besoin de charger les 4). Renvoie null si absent ou catégorie non créée.
 */
export async function getMediaBySlug(
    slug: string,
    kind: "youtube" | "video" | "audio" | "montage",
): Promise<WpPost | null> {
    const fetcher =
        kind === "youtube"
            ? getVideos
            : kind === "video"
                ? getVideosHosted
                : kind === "audio"
                    ? getPodcasts
                    : getMontages;

    try {
        const results = await fetcher({ slug, _embed: true });
        return results[0] || null;
    } catch (err) {
        console.error(`[getMediaBySlug] Erreur pour "${slug}" (${kind}):`, err);
        return null;
    }
}

// Partenaires
export async function getPartners() {
    try {
        const data = await fetchAPI<
            Array<{
                title?: { rendered?: string };
                acf?: { abbreviation?: string };
                _embedded?: { ["wp:featuredmedia"]?: Array<{ source_url?: string }> };
            }>
        >("/partenaires", { per_page: 20, _embed: true });
        return data.map((item) => ({
            name: item.title?.rendered || "Partenaire",
            abbr: item.acf?.abbreviation || "P",
            logo: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        }));
    } catch (err) {
        // Endpoint absent ou erreur réseau/parsing : logge et retourne [] sans casser la page.
        console.error("[getPartners] Failed to load partners:", err);
        return [];
    }
}

// Bureau
export function getBureau() {
    return fetchAPI("/bureau", { _embed: true });
}

// ----- Contact Form 7 -----
// N'utilise pas fetchAPI() : endpoint hors API_BASE (/contact-form-7/v1) et
// multipart/form-data en entrée, pas JSON.
export async function submitContactForm(
    fields: ContactFormFields,
): Promise<ContactFormResult> {
    const url = `${WP_ROOT}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;

    const formData = new FormData();
    formData.set("_wpcf7", String(CF7_FORM_ID));
    formData.set("_wpcf7_version", CF7_VERSION);
    formData.set("_wpcf7_locale", CF7_LOCALE);
    formData.set("_wpcf7_unit_tag", CF7_UNIT_TAG);
    formData.set("_wpcf7_container_post", String(CF7_CONTAINER_POST));
    formData.set("your-name", fields.name);
    formData.set("your-email", fields.email);
    formData.set("your-subject", fields.subject);
    formData.set("your-message", fields.message);

    let res: Response;
    try {
        res = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });
    } catch (err) {
        console.error("[submitContactForm] Network error:", err);
        throw new WpApiError(
            "Network error while submitting contact form",
            undefined,
            url,
        );
    }

    let data: {
        status?: string;
        message?: string;
        invalid_fields?: Array<{ field: string; message: string }>;
    };
    try {
        data = await res.json();
    } catch (err) {
        console.error("[submitContactForm] JSON parse error:", err);
        throw new WpApiError(
            "Invalid JSON from contact form endpoint",
            res.status,
            url,
        );
    }

    const invalidFields = data.invalid_fields?.reduce<Record<string, string>>(
        (acc, f) => {
            acc[f.field] = f.message;
            return acc;
        },
        {},
    );

    return {
        status: data.status || "mail_failed",
        message: data.message || "Une erreur est survenue.",
        invalidFields,
    };
}

// Récupérer une catégorie par son slug
export async function getCategoryBySlug(
    slug: string,
): Promise<WpCategory | null> {
    const data = await fetchAPI<WpCategory[]>("/categories", { slug });
    if (!Array.isArray(data) || data.length === 0) {
        console.warn(`[getCategoryBySlug] No category found for slug "${slug}"`);
        return null;
    }
    return data[0];
}

// Récupérer une catégorie par son ID (si besoin)
export async function getCategoryById(id: number) {
    return fetchAPI<unknown>(`/categories/${id}`);
}

// Posts d'une catégorie par son slug (plus robuste qu'un ID en dur,
// qui peut varier d'un environnement WordPress à l'autre).
export async function getPostsByCategorySlug(
    slug: string,
    params: Params = {},
) {
    const category = await getCategoryBySlug(slug);
    if (!category) {
        console.warn(
            `[getPostsByCategorySlug] "${slug}" → catégorie introuvable, retour []`,
        );
        return [];
    }
    console.log(
        `[getPostsByCategorySlug] "${slug}" → category id=${category.id}, count=${category.count}`,
    );
    const posts = await getPostsByCategory(category.id, params);
    console.log(
        `[getPostsByCategorySlug] "${slug}" (id=${category.id}) → ${posts.length} posts trouvés`,
    );
    return posts;
}

// Articles du CPT "international" pour une catégorie donnée (alternative à
// getPostsByCategorySlug quand le contenu n'est pas dans les posts standards).
export async function getInternationalByCategorySlug(
    slug: string,
    params: Params = {},
) {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];
    return fetchAPI<WpPost[]>(`/international`, {
        categories: category.id,
        _embed: true,
        ...params,
    });
}

// International
export async function getInternationalByType(
    type: string,
    params: Params = {},
) {
    const items = await getInternational({
        per_page: 50,
        _embed: true,
        ...params,
    });
    return items.filter(
        (item) => (item.acf as Record<string, unknown>)?.type === type,
    );
}

export async function getPresidentActivities(): Promise<PresidentActivity[]> {
    const [audiences, delegations, deplacements] = await Promise.allSettled([
        getAudiences({ per_page: 100 }),
        getDelegations({ per_page: 100 }),
        getInternational({ per_page: 100 }),
    ]);

    const items: PresidentActivity[] = [];

    if (audiences.status === "fulfilled") {
        items.push(
            ...audiences.value.map((post) => ({
                id: post.id,
                category: "audience" as const,
                post,
            })),
        );
    } else {
        console.error(
            "[getPresidentActivities] CPT 'audience' failed:",
            audiences.reason,
        );
    }

    if (delegations.status === "fulfilled") {
        items.push(
            ...delegations.value.map((post) => ({
                id: post.id,
                category: "delegation" as const,
                post,
            })),
        );
    } else {
        console.warn(
            "[getPresidentActivities] CPT 'delegation' indisponible (endpoint absent ou vide) :",
            delegations.reason,
        );
    }

    if (deplacements.status === "fulfilled") {
        items.push(
            ...deplacements.value.map((post) => ({
                id: post.id,
                category: "international" as const,
                post,
            })),
        );
    } else {
        console.error(
            "[getPresidentActivities] CPT 'international' failed:",
            deplacements.reason,
        );
    }

    return items.sort(
        (a, b) => new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    );
}

// Actus
export async function getActualitesWithPagination(
    page: number = 1,
    perPage: number = 6,
): Promise<{
    items: WpPost[];
    total: number;
    totalPages: number;
}> {
    const url = new URL(`${API_BASE}/actualite`);
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("_embed", "true");

    const res = await fetch(url.toString(), {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch actualites: ${res.status}`);
    }

    const total = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
    const items = await res.json();

    return { items, total, totalPages };
}

export async function getPostBySlug(
    slug: string,
    type: "alaune" | "actualite" = "alaune",
) {
    const data = await fetchAPI<WpPost[]>(`/${type}`, { slug, _embed: true });
    return data[0] || null;
}

export async function getPostBySlugNoCache(
    slug: string,
): Promise<WpPost | null> {
    console.log("[getPostBySlugNoCache] slug reçu :", slug);

    const endpoints = ["alaune", "actualite"];
    for (const type of endpoints) {
        try {
            const url = new URL(`${API_BASE}/${type}`);
            url.searchParams.set("slug", slug);
            url.searchParams.set("_embed", "true");
            console.log(`[getPostBySlugNoCache] requête ${type} :`, url.toString());

            const res = await fetch(url.toString(), {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
                    Accept: "application/json",
                },
                cache: "no-store",
            });

            if (!res.ok) {
                console.log(`[getPostBySlugNoCache] ${type} status :`, res.status);
                continue;
            }

            const data = await res.json();
            console.log(`[getPostBySlugNoCache] ${type} trouvés :`, data.length);
            if (data.length > 0) {
                return data[0];
            }
        } catch (err) {
            console.error(`[getPostBySlugNoCache] Erreur sur ${type} :`, err);
        }
    }

    return null;
}

// Catégories par parent
export function getCategoriesByParent(parentId: number, params: Params = {}) {
    return fetchAPI<WpCategory[]>("/categories", { parent: parentId, ...params });
}

// Articles pertinents
export async function getAllRelevantPosts() {
    const [ordreJourPosts, deliberationPosts, loisAdoptees] = await Promise.all([
        getPostsByCategory(11, { per_page: 100, _embed: true }).catch(() => []),
        getPostsByCategory(53, { per_page: 1, _embed: true }).catch(() => []),
        getPostsByCategory(14, { per_page: 100, _embed: true }).catch(() => []),
    ]);

    const allPosts = [...ordreJourPosts, ...loisAdoptees];
    const deliberationSlug = "deliberation";
    const hasDeliberation = allPosts.some((p) => p.slug === deliberationSlug);
    if (deliberationPosts.length > 0 && !hasDeliberation) {
        allPosts.push(deliberationPosts[0]);
    }

    allPosts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return allPosts;
}

/**
 * Articles des pages "Délibérations et ordres du jour" (catégories 11, 53,
 * 14), triés du plus ancien au plus récent.
 */
export async function getDeliberationPosts(params: Params = {}) {
    const categories = [11, 53, 14];
    const results = await Promise.allSettled(
        categories.map((cat) =>
            getPostsByCategory(cat, { per_page: 100, _embed: true, ...params }).catch(
                () => [],
            ),
        ),
    );

    const allPosts = results
        .filter(
            (r): r is PromiseFulfilledResult<WpPost[]> => r.status === "fulfilled",
        )
        .flatMap((r) => r.value);

    const unique = allPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id),
    );

    unique.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return unique;
}

/**
 * Récupère les posts d'une catégorie avec pagination.
 * Retourne les posts, le total d'articles et le nombre total de pages.
 */
export async function getPostsByCategoryWithPagination(
    categoryId: number,
    page: number = 1,
    perPage: number = 10,
    params: Params = {},
): Promise<{ items: WpPost[]; total: number; totalPages: number }> {
    const url = new URL(`${API_BASE}/posts`);
    url.searchParams.set("categories", String(categoryId));
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("_embed", "true");
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    const res = await fetch(url.toString(), {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
            Accept: "application/json",
        },
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const total = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
    const items = await res.json();

    return { items, total, totalPages };
}

/** Récupère un article "PL adoptés" (catégorie 14) par son slug. */
export async function getTextAndLawBySlug(
    slug: string,
): Promise<WpPost | null> {
    try {
        const res = await fetch(
            `${API_BASE}/posts?categories=14&slug=${slug}&_embed=true&per_page=1`,
            { next: { revalidate: 3600 } },
        );
        if (res.ok) {
            const posts = await res.json();
            return posts.length > 0 ? posts[0] : null;
        }
        console.error(
            `[getTextAndLawBySlug] HTTP ${res.status} pour le slug "${slug}"`,
        );
        return null;
    } catch (err) {
        console.error(`[getTextAndLawBySlug] Erreur pour le slug "${slug}":`, err);
        return null;
    }
}

/**
 * Récupère les extraits des articles de la catégorie "PL adoptes" (ID 14)
 * pour la section "Textes de référence" de la page d'accueil.
 */
export async function getLawsExcerpts(limit: number = 4): Promise<
    {
        id: number;
        slug: string;
        title: string;
        excerpt: string;
        link: string;
        date: string;
    }[]
> {
    try {
        const res = await fetch(
            `${API_BASE}/posts?categories=14&_embed=true&per_page=${limit}`,
            { next: { revalidate: 3600 } },
        );
        if (!res.ok) return [];
        const posts = (await res.json()) as WpPost[];
        return posts.map((post: WpPost) => ({
            id: post.id,
            slug: post.slug,
            title: post.title.rendered,
            excerpt:
                post.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
                "Aucun extrait disponible.",
            link: post.link || `/texts-and-laws/${post.slug}`,
            date: post.date,
        }));
    } catch {
        return [];
    }
}

/**
 * Récupère les quatre pages de référence de la section "Textes de référence"
 * par leur slug (null pour celles non trouvées).
 */
export async function getReferencePages(): Promise<{
    dispositions: WpPost | null;
    loisOrganiques: WpPost | null;
    sourcesReglementaires: WpPost | null;
    textesServices: WpPost | null;
}> {
    const slugs = {
        dispositions: "dispositions-constitutionnelles",
        loisOrganiques: "lois-organiques",
        sourcesReglementaires: "sources-reglementaires",
        textesServices: "textes-sur-les-services",
    };

    const [dispositions, loisOrganiques, sourcesReglementaires, textesServices] =
        await Promise.all([
            getPageBySlug(slugs.dispositions).catch((err) => {
                console.error("[getReferencePages] dispositions:", err);
                return null;
            }),
            getPageBySlug(slugs.loisOrganiques).catch((err) => {
                console.error("[getReferencePages] loisOrganiques:", err);
                return null;
            }),
            getPageBySlug(slugs.sourcesReglementaires).catch((err) => {
                console.error("[getReferencePages] sourcesReglementaires:", err);
                return null;
            }),
            getPageBySlug(slugs.textesServices).catch((err) => {
                console.error("[getReferencePages] textesServices:", err);
                return null;
            }),
        ]);

    return {
        dispositions,
        loisOrganiques,
        sourcesReglementaires,
        textesServices,
    };
}

// ----- Structures administratives -----
/**
 * Récupère le post "la-structure-administrative-du-senat" (catégorie 42,
 * "structures"). Contient l'organigramme textuel : Cabinet du Président,
 * Secrétariat Général, six Directions rattachées, etc.
 */
export async function getStructureAdministrative(): Promise<WpPost | null> {
    try {
        const posts = await fetchAPI<WpPost[]>("/posts", {
            slug: "la-structure-administrative-du-senat",
            _embed: true,
            per_page: 1,
        });
        return posts[0] || null;
    } catch (err) {
        console.error("[getStructureAdministrative] Erreur:", err);
        return null;
    }
}

/**
 * Récupère tous les posts de la catégorie "structures" (ID 42), triés
 * du plus ancien au plus récent. Utile pour lister les pages liées à la
 * structure interne du Sénat (Bureau, commissions, etc.).
 */
export function getStructuresPosts(params: Params = {}) {
    return getPostsByCategory(42, { _embed: true, ...params });
}

// ----- Sénateurs -----
/** Récupère la page "Vos Sénateurs" (slug: vos-senateurs) via getPageBySlug. */
export async function getYourSenatorsPage(): Promise<WpPost | null> {
    return getPageBySlug("vos-senateurs");
}

// ----- Questions écrites -----
/**
 * Récupère le post "questions-ecrites" (catégorie 7, "gouvernement").
 * Le champ `content.rendered` est vide côté WordPress, mais on le
 * récupère quand même pour rester souple si du contenu y est ajouté
 * plus tard.
 */
export async function getWrittenQuestions(): Promise<WpPost | null> {
    try {
        const posts = await fetchAPI<WpPost[]>("/posts", {
            slug: "questions-ecrites",
            _embed: true,
            per_page: 1,
        });
        return posts[0] || null;
    } catch (err) {
        console.error("[getWrittenQuestions] Erreur:", err);
        return null;
    }
}

/**
 * Liste les posts de la catégorie "gouvernement" (ID 7) — utile pour
 * afficher les questions écrites elles-mêmes quand le post parent
 * "questions-ecrites" ne contient pas de contenu éditorial.
 */
export function getGouvernementPosts(params: Params = {}) {
    return getPostsByCategory(7, { _embed: true, ...params });
}

// Version (release GitHub)
interface ReleaseData {
    tag_name: string;
    html_url: string;
}

export async function release(): Promise<ReleaseData> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const res = await fetch("/api/release", { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    } catch {
        clearTimeout(timeout);
        return { tag_name: "v0.0.0", html_url: "#" };
    }
}
