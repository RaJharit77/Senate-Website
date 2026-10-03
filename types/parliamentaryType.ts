import type { WpPost } from "@/lib/wp-types";

export interface CategorySectionProps {
    title: string;
    posts: WpPost[];
    slug?: string;
    isDeliberation?: boolean;
}

export interface ClientDeliberationListProps {
    posts: Array<{
        title: { rendered: string };
        content: { rendered: string };
        slug: string;
    }>;
    initialIndex?: number;
    useRouterNavigation?: boolean;
}

export interface DeliberationTableProps {
    tableHtml: string;
    showPagination?: boolean;
}

export interface TableState {
    rows: string[];
    isLoading: boolean;
}