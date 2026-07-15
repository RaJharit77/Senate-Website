export interface WpCategory {
    id: number;
    count: number;
    name: string;
    slug: string;
    parent: number;
}

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
    // Use unknown instead of any to avoid unexpected any and force explicit typing when accessed
    acf?: Record<string, unknown>;
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
        }>;
        "wp:term"?: Array<Array<{ name: string }>>;
    };
    categories?: number[];
}