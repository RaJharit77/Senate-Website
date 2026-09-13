/** Catégorie WordPress (endpoint /categories). */
export interface WpCategory {
    id: number;
    count: number;
    name: string;
    slug: string;
    parent: number;
}

/** Article WordPress générique (post, page ou custom post type). */
export interface WpPost {
    id: number;
    date: string;
    slug: string;
    link?: string;
    featured_media?: number;
    title: {
        rendered: string;
    };
    excerpt?: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    modified?: string;
    // unknown plutôt que any : force un typage explicite à l'usage.
    acf?: Record<string, unknown>;
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
        }>;
        "wp:term"?: Array<Array<{ name: string }>>;
    };
    categories?: number[];
}