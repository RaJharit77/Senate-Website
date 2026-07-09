import type { WpCategory, WpPost } from "@/lib/types";

const API_BASE = process.env.WP_API_URL || "https://senat.mg/wp-json/wp/v2";

type Params = Record<string, string | number | boolean>;

class WpApiError extends Error {
    constructor(message: string, public status?: number, public url?: string) {
        super(message);
        this.name = "WpApiError";
    }
}

async function fetchAPI<T>(endpoint: string, params: Params = {}, silent: boolean = false): Promise<T> {
    const url = new URL(`${API_BASE}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    let res: Response;
    try {
        res = await fetch(url.toString(), {
            // Le User-Agent "Next.js" peut être bloqué/filtré par certains
            // hébergeurs ou plugins de sécurité WordPress (Wordfence, CDN, etc.),
            // alors qu'un UA de navigateur passe. On aligne sur ce qui fonctionne
            // en curl pour éviter les réponses vides/HTML silencieuses.
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
            url.toString()
        );
    }


    if (!res.ok) {
        const bodyPreview = await res.text().catch(() => "<unreadable body>");
        if (!silent) {
            console.error(
                `[fetchAPI] HTTP ${res.status} for ${url.toString()}\nBody preview: ${bodyPreview.slice(0, 300)}`
            );
        }
        throw new WpApiError(
            `Failed to fetch ${url.toString()}: ${res.status}`,
            res.status,
            url.toString()
        );
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        // Symptôme classique d'un blocage silencieux : on reçoit du 200 OK
        // mais avec une page HTML (challenge anti-bot, maintenance, etc.)
        const bodyPreview = await res.text().catch(() => "<unreadable body>");
        console.error(
            `[fetchAPI] Unexpected content-type "${contentType}" for ${url.toString()}\nBody preview: ${bodyPreview.slice(0, 300)}`
        );
        throw new WpApiError(
            `Unexpected non-JSON response from ${url.toString()}`,
            res.status,
            url.toString()
        );
    }

    try {
        return (await res.json()) as T;
    } catch (err) {
        console.error(`[fetchAPI] JSON parse error for ${url.toString()}:`, err);
        throw new WpApiError(
            `Invalid JSON from ${url.toString()}`,
            res.status,
            url.toString()
        );
    }
}

// ----- Posts (default) -----
export function getPosts(params: Params = {}) {
    return fetchAPI<WpPost[]>("/posts", { _embed: true, ...params });
}

export function getPostsByCategory(categoryId: number, params: Params = {}) {
    return getPosts({ categories: categoryId, ...params });
}

// ----- Custom Post Types -----
export function getActualite(params: Params = {}) {
    return fetchAPI<WpPost[]>("/actualite", { _embed: true, ...params });
}

export function getAlaune(params: Params = {}) {
    return fetchAPI<WpPost[]>("/alaune", { _embed: true, ...params });
}

export function getInternational(params: Params = {}) {
    return fetchAPI<WpPost[]>("/international", { _embed: true, ...params });
}

// CPT "audience" : visites de courtoisie, audiences accordées par le
// Président du Sénat (cf. https://senat.mg/activites-du-president/).
export function getAudiences(params: Params = {}) {
    return fetchAPI<WpPost[]>("/audience", { _embed: true, ...params });
}

// CPT "delegation" (slug supposé) : accueil de délégations parlementaires
// étrangères. L'endpoint peut ne pas exister selon l'environnement WP ;
// on neutralise l'erreur au point d'appel (cf. getPresidentActivities)
// pour ne pas casser le rendu de la page si le CPT diffère ou est vide.
export function getDelegations(params: Params = {}) {
    return fetchAPI<WpPost[]>("/delegation", { _embed: true, ...params });
}

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

// ----- Pages -----
export function getPages(params: Params = {}) {
    return fetchAPI<WpPost[]>("/pages", { _embed: true, ...params });
}

export function getPageBySlug(slug: string) {
    return getPages({ slug }).then((pages) => pages[0] || null);
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

// ----- Media (optional) -----
export function getMedia(id: number) {
    return fetchAPI(`/media/${id}`, {}, true);
}

export async function getPartners() {
    try {
        const data = await fetchAPI<Array<{
            title?: { rendered?: string };
            acf?: { abbreviation?: string };
            _embedded?: { ["wp:featuredmedia"]?: Array<{ source_url?: string }> };
        }>>("/partenaires", { per_page: 20, _embed: true });
        return data.map((item) => ({
            name: item.title?.rendered || "Partenaire",
            abbr: item.acf?.abbreviation || "P",
            logo: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        }));
    } catch (err) {
        // Si l'endpoint n'existe pas (ou erreur réseau/parsing), on logge
        // pour garder une trace, mais on retourne un tableau vide pour ne
        // pas casser le rendu de la page d'accueil.
        console.error("[getPartners] Failed to load partners:", err);
        return [];
    }
}

export function getBureau() {
    return fetchAPI("/bureau", { _embed: true });
}

// ----- Contact Form 7 -----
// Le endpoint CF7 n'utilise pas fetchAPI() car il ne tape pas vers
// API_BASE (/wp-json/wp/v2) mais vers /wp-json/contact-form-7/v1, et il
// attend du multipart/form-data (pas de JSON en entrée). On le garde donc
// séparé, mais toujours dans ce fichier "api" pour centraliser tous les
// appels réseau côté WordPress.

const WP_ROOT = (process.env.WP_API_URL || "https://senat.mg/wp-json/wp/v2").replace(
    /\/wp-json\/wp\/v2\/?$/,
    ""
);

// Identifiants imposés par le shortcode CF7 généré dans WordPress.
// Ils sont stables pour un formulaire donné et n'ont pas besoin d'être
// dynamiques côté client.
const CF7_FORM_ID = 263;
const CF7_VERSION = "5.9.5";
const CF7_LOCALE = "fr_FR";
const CF7_UNIT_TAG = "wpcf7-f263-p149-o1";
const CF7_CONTAINER_POST = 149;

export interface ContactFormFields {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactFormResult {
    status: "mail_sent" | "validation_failed" | "spam" | "aborted" | "mail_failed" | string;
    message: string;
    invalidFields?: Record<string, string>;
}

export async function submitContactForm(
    fields: ContactFormFields
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
        throw new WpApiError("Network error while submitting contact form", undefined, url);
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
        throw new WpApiError("Invalid JSON from contact form endpoint", res.status, url);
    }

    const invalidFields = data.invalid_fields?.reduce<Record<string, string>>((acc, f) => {
        acc[f.field] = f.message;
        return acc;
    }, {});

    return {
        status: data.status || "mail_failed",
        message: data.message || "Une erreur est survenue.",
        invalidFields,
    };
}

// Récupérer une catégorie par son slug
export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
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

// Récupérer les posts d'une catégorie identifiée par son slug
// (plus robuste qu'un ID en dur : l'ID d'une catégorie peut changer
// d'un environnement WordPress à l'autre, le slug est stable).
export async function getPostsByCategorySlug(slug: string, params: Params = {}) {
    const category = await getCategoryBySlug(slug);
    if (!category) {
        console.warn(`[getPostsByCategorySlug] "${slug}" → catégorie introuvable, retour []`);
        return [];
    }
    console.log(`[getPostsByCategorySlug] "${slug}" → category id=${category.id}, count=${category.count}`);
    const posts = await getPostsByCategory(category.id, params);
    console.log(`[getPostsByCategorySlug] "${slug}" (id=${category.id}) → ${posts.length} posts trouvés`);
    return posts;
}

// Récupère les articles du custom post type "international" pour une
// catégorie donnée (alternative à getPostsByCategorySlug si le contenu
// est stocké dans le CPT "international" plutôt que dans les posts standards).
export async function getInternationalByCategorySlug(slug: string, params: Params = {}) {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];
    return fetchAPI<WpPost[]>(`/international`, {
        categories: category.id,
        _embed: true,
        ...params,
    });
}

// ----- Républiques (textes constitutionnels) -----
// Agrège les 4 post-types "republiquei" à "republiqueiv" en une seule liste,
// triée du plus récent au plus ancien. Utile pour la page "Textes et Lois"
// qui doit présenter l'historique constitutionnel.
export async function getAllRepubliques(params: Params = {}) {
    const results = await Promise.allSettled([
        getRepubliqueI(params),
        getRepubliqueII(params),
        getRepubliqueIII(params),
        getRepubliqueIV(params),
    ]);

    results.forEach((r, i) => {
        if (r.status === "rejected") {
            console.error(`[getAllRepubliques] republique${i + 1} failed:`, r.reason);
        }
    });

    return results
        .filter((r): r is PromiseFulfilledResult<WpPost[]> => r.status === "fulfilled")
        .flatMap((r) => r.value)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getInternationalByType(type: string, params: Params = {}) {
    const items = await getInternational({ per_page: 50, _embed: true, ...params });
    return items.filter((item) => (item.acf as Record<string, unknown>)?.type === type);
}

// ----- Activités du Président : agrégation des 3 CPT -----
// Sur senat.mg, "Activités du Président" agrège trois custom post types
// distincts (et non un champ ACF "type" sur un seul CPT) :
//   - "audience"     → Audiences
//   - "delegation"   → Accueil des délégations parlementaires étrangères
//   - "international"→ Déplacements à l'étranger
// Chaque CPT est interrogé indépendamment et les échecs sont neutralisés
// (Promise.allSettled) : si un endpoint n'existe pas encore côté WP
// (ex. "delegation" n'a peut-être pas été créé), on retourne simplement un
// tableau vide pour ce groupe plutôt que de casser toute la page.
export type ActivityCategory = "audience" | "delegation" | "international";

export interface PresidentActivity {
    id: number;
    category: ActivityCategory;
    post: WpPost;
}

export async function getPresidentActivities(): Promise<PresidentActivity[]> {
    const [audiences, delegations, deplacements] = await Promise.allSettled([
        getAudiences({ per_page: 100 }),
        getDelegations({ per_page: 100 }),
        getInternational({ per_page: 100 }),
    ]);

    const items: PresidentActivity[] = [];

    if (audiences.status === "fulfilled") {
        items.push(...audiences.value.map((post) => ({ id: post.id, category: "audience" as const, post })));
    } else {
        console.error("[getPresidentActivities] CPT 'audience' failed:", audiences.reason);
    }

    if (delegations.status === "fulfilled") {
        items.push(...delegations.value.map((post) => ({ id: post.id, category: "delegation" as const, post })));
    } else {
        console.warn(
            "[getPresidentActivities] CPT 'delegation' indisponible (endpoint absent ou vide) :",
            delegations.reason
        );
    }

    if (deplacements.status === "fulfilled") {
        items.push(...deplacements.value.map((post) => ({ id: post.id, category: "international" as const, post })));
    } else {
        console.error("[getPresidentActivities] CPT 'international' failed:", deplacements.reason);
    }

    return items.sort((a, b) => new Date(b.post.date).getTime() - new Date(a.post.date).getTime());
}


// Actus
export async function getActualitesWithPagination(page: number = 1, perPage: number = 6): Promise<{
    items: WpPost[];
    total: number;
    totalPages: number;
}> {
    const url = new URL(`${API_BASE}/actualite`);
    url.searchParams.set('per_page', String(perPage));
    url.searchParams.set('page', String(page));
    url.searchParams.set('_embed', 'true');

    const res = await fetch(url.toString(), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)',
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch actualites: ${res.status}`);
    }

    const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
    const items = await res.json();

    return { items, total, totalPages };
}

export async function getPostBySlug(slug: string, type: "alaune" | "actualite" = "alaune") {
    const data = await fetchAPI<WpPost[]>(`/${type}`, { slug, _embed: true });
    return data[0] || null;
}

export async function getPostBySlugNoCache(slug: string): Promise<WpPost | null> {
    console.log('[getPostBySlugNoCache] slug reçu :', slug);

    const endpoints = ['alaune', 'actualite'];
    for (const type of endpoints) {
        try {
            const url = new URL(`${API_BASE}/${type}`);
            url.searchParams.set('slug', slug);
            url.searchParams.set('_embed', 'true');
            console.log(`[getPostBySlugNoCache] requête ${type} :`, url.toString());

            const res = await fetch(url.toString(), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)',
                    Accept: 'application/json',
                },
                cache: 'no-store',
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

export function getCategoriesByParent(parentId: number, params: Params = {}) {
    return fetchAPI<WpCategory[]>("/categories", { parent: parentId, ...params });
}

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

    allPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return allPosts;
}

/**
 *  Récupère tous les articles pertinents pour les pages "Délibérations et ordres du jour"
    (catégories 11, 53 et 14), triés du plus ancien au plus récent.
*/
export async function getDeliberationPosts(params: Params = {}) {
    const categories = [11, 53, 14];
    const results = await Promise.allSettled(
        categories.map(cat =>
            getPostsByCategory(cat, { per_page: 100, _embed: true, ...params }).catch(() => [])
        )
    );

    const allPosts = results
        .filter((r): r is PromiseFulfilledResult<WpPost[]> => r.status === 'fulfilled')
        .flatMap(r => r.value);

    const unique = allPosts.filter(
        (post, index, self) => index === self.findIndex(p => p.id === post.id)
    );

    unique.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return unique;
}