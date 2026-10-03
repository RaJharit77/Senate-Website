import { WpPost } from "@/lib/wp-types";

export interface ConstitutionalTextsProps {
    republiques: WpPost[];
    showAllLink?: boolean;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export interface LawItem {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    link: string;
    date: string;
}

export interface TextAndLawsClientProps {
    laws: LawItem[];
    pageContent?: string;
}