const API_BASE = process.env.WP_API_URL || "https://senat.mg/wp-json/wp/v2";

type Params = Record<string, string | number | boolean>;

async function fetchAPI<T>(endpoint: string, params: Params = {}): Promise<T> {
    const url = new URL(`${API_BASE}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });
    const res = await fetch(url.toString(), {
        headers: { "User-Agent": "Next.js" },
        next: { revalidate: 3600 }, // 1 hour
    });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return res.json();
}

// ----- Posts (default) -----
export function getPosts(params: Params = {}) {
    return fetchAPI<unknown[]>("/posts", { _embed: true, ...params });
}

export function getPostsByCategory(categoryId: number, params: Params = {}) {
    return getPosts({ categories: categoryId, ...params });
}

// ----- Custom Post Types -----
export function getActualite(params: Params = {}) {
    return fetchAPI<unknown[]>("/actualite", { _embed: true, ...params });
}

export function getAlaune(params: Params = {}) {
    return fetchAPI<unknown[]>("/alaune", { _embed: true, ...params });
}

export function getInternational(params: Params = {}) {
    return fetchAPI<unknown[]>("/international", { _embed: true, ...params });
}

export function getRepubliqueI(params: Params = {}) {
    return fetchAPI<unknown[]>("/republiquei", { _embed: true, ...params });
}
export function getRepubliqueII(params: Params = {}) {
    return fetchAPI<unknown[]>("/republiqueii", { _embed: true, ...params });
}
export function getRepubliqueIII(params: Params = {}) {
    return fetchAPI<unknown[]>("/republiqueiii", { _embed: true, ...params });
}
export function getRepubliqueIV(params: Params = {}) {
    return fetchAPI<unknown[]>("/republiqueiv", { _embed: true, ...params });
}

// ----- Pages -----
export function getPages(params: Params = {}) {
    return fetchAPI<unknown[]>("/pages", { _embed: true, ...params });
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
    return fetchAPI(`/media/${id}`);
}

export async function getPartners() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await fetchAPI<any[]>("/partenaires", { per_page: 20, _embed: true });
        return data.map((item) => ({
            name: item.title?.rendered || "Partenaire",
            abbr: item.acf?.abbreviation || "P",
            logo: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        }));
    } catch {
        // Si l'endpoint n'existe pas, retourner un tableau vide
        return [];
    }
}

export function getBureau() {
    return fetchAPI("/bureau", { _embed: true });
}