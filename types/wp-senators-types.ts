export interface WPPage {
    id: number;
    slug: string;
    link: string;
    modified?: string;
    date?: string;
    title: { rendered: string };
    content: { rendered: string };
    categories?: number[];
}