export interface WpPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    excerpt?: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
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