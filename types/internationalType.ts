import { WpPost } from "@/lib/wp-types";

// ----- Activités du Président : agrégation des 3 CPT -----
export type ActivityCategory = "audience" | "delegation" | "international";

/** Activité normalisée pour affichage (carte, liste...). */
export interface ActivityItem {
    id: number;
    slug: string;
    category: ActivityCategory;
    title: string;
    date: string;
    dateValue: number;
    imageUrl: string;
    link: string;
}

/** Variante de ActivityItem (mêmes champs, ordre différent). */
export interface SimpleActivityItem {
    id: number;
    slug: string;
    title: string;
    date: string;
    dateValue: number;
    imageUrl: string;
    link: string;
    category: ActivityCategory;
}

/** Activité brute avant normalisation : post WordPress + catégorie source. */
export interface PresidentActivity {
    id: number;
    category: ActivityCategory;
    post: WpPost;
}

export const SECTION_ORDER: ActivityCategory[] = ["audience", "delegation", "international"];

export const FILTERS: { id: "all" | ActivityCategory; label: string }[] = [
    { id: "all", label: "Toutes" },
    { id: "audience", label: "Audiences" },
    { id: "delegation", label: "Délégations" },
    { id: "international", label: "Déplacements" },
];

export interface InternationalPageSkeletonProps {
    showFilters?: boolean;
    showPagination?: boolean;
    cardCount?: number;
}
