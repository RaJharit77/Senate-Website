"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { ActivityCategory } from "@/types/internationalType";
import { PER_PAGE_ACTIVITIES_FEED } from "@/constants/constants";
import { ActivityCard, ActivityCardSkeleton } from "./ActivityCard";
import { FilterButtons, PaginationControls } from "./FeedControls";

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

const SECTION_ORDER: ActivityCategory[] = ["audience", "delegation", "international"];

export function ActivitiesFeed({
    items,
    basePath,
    showSections = true,
    isLoading = false,
}: {
    items: ActivityItem[];
    basePath: string;
    showSections?: boolean;
    isLoading?: boolean;
}) {
    const [filter, setFilter] = useState<"all" | ActivityCategory>("all");
    const [page, setPage] = useState(1);

    const groupedBySection = useMemo(() => {
        const groups: Record<ActivityCategory, ActivityItem[]> = {
            audience: [],
            delegation: [],
            international: [],
        };
        for (const item of items) {
            groups[item.category].push(item);
        }
        return groups;
    }, [items]);

    const relevantItems = useMemo(() => {
        if (filter === "all") return items;
        return groupedBySection[filter];
    }, [filter, items, groupedBySection]);

    const totalPages = useMemo(() => {
        if (filter !== "all") {
            return Math.max(1, Math.ceil(relevantItems.length / PER_PAGE_ACTIVITIES_FEED));
        }
        const maxLength = Math.max(
            groupedBySection.audience.length,
            groupedBySection.delegation.length,
            groupedBySection.international.length,
            1
        );
        return Math.ceil(maxLength / PER_PAGE_ACTIVITIES_FEED);
    }, [filter, relevantItems.length, groupedBySection]);

    function pageSliceFor(categoryItems: ActivityItem[]) {
        const start = (page - 1) * PER_PAGE_ACTIVITIES_FEED;
        return categoryItems.slice(start, start + PER_PAGE_ACTIVITIES_FEED);
    }

    function handleFilterChange(next: "all" | ActivityCategory) {
        setFilter(next);
        setPage(1);
    }

    const hasAnyItems = items.length > 0;

    if (isLoading) {
        return (
            <div>
                <div className="mb-6 flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-24 h-9 rounded-full bg-white/10 animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: PER_PAGE_ACTIVITIES_FEED }).map((_, i) => (
                        <ActivityCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!hasAnyItems) {
        return <p className="py-12 text-center text-white/60">Aucune activité disponible pour le moment.</p>;
    }

    return (
        <div>
            <FilterButtons currentFilter={filter} onChange={handleFilterChange} />

            {filter === "all" && showSections ? (
                SECTION_ORDER.map((cat) => {
                    const catItems = pageSliceFor(groupedBySection[cat]);
                    const isEmpty = groupedBySection[cat].length === 0;
                    return (
                        <div key={cat} className="mb-8">
                            <h3 className="mb-4 text-lg font-semibold text-white/80 border-b border-white/10 pb-2">
                                {cat === "audience" && "Audiences"}
                                {cat === "delegation" && "Accueil des délégations"}
                                {cat === "international" && "Déplacements à l'étranger"}
                            </h3>
                            {isEmpty ? (
                                <p className="text-sm text-white/40">Aucune activité dans cette catégorie.</p>
                            ) : (
                                <motion.div
                                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                                    }}
                                >
                                    {catItems.map((item) => (
                                        <ActivityCard key={item.id} item={item} basePath={basePath} />
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    );
                })
            ) : (
                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {pageSliceFor(relevantItems).map((item) => (
                        <ActivityCard key={item.id} item={item} basePath={basePath} />
                    ))}
                </motion.div>
            )}

            <PaginationControls currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}