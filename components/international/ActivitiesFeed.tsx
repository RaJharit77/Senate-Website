"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const filteredBySearch = useMemo(() => {
        if (!activeSearch.trim()) return items;
        const term = activeSearch.toLowerCase().trim();
        return items.filter((item) =>
            item.title.toLowerCase().includes(term)
        );
    }, [items, activeSearch]);

    const groupedBySection = useMemo(() => {
        const groups: Record<ActivityCategory, ActivityItem[]> = {
            audience: [],
            delegation: [],
            international: [],
        };
        for (const item of filteredBySearch) {
            groups[item.category].push(item);
        }
        return groups;
    }, [filteredBySearch]);

    const relevantItems = useMemo(() => {
        if (filter === "all") return filteredBySearch;
        return groupedBySection[filter];
    }, [filter, filteredBySearch, groupedBySection]);

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

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();
        setActiveSearch(searchTerm);
        setPage(1);
    }

    function clearSearch() {
        setSearchTerm("");
        setActiveSearch("");
        setPage(1);
    }

    const hasAnyItems = filteredBySearch.length > 0;

    if (isLoading) {
        return (
            <div>
                <div className="mb-6 flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-24 h-8 rounded-full bg-white/10 animate-pulse" />
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
        return (
            <div className="py-12 text-center text-white/60">
                {activeSearch ? (
                    <>
                        <p>Aucune activité ne correspond à votre recherche.</p>
                        <p className="text-sm mt-2">Essayez d&apos;autres mots-clés.</p>
                    </>
                ) : (
                    <p>Aucune activité disponible pour le moment.</p>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mb-6">
                <FilterButtons currentFilter={filter} onChange={handleFilterChange} />

                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-48 sm:w-56 h-8 text-sm rounded-lg focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition"
                                aria-label="Effacer la recherche"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white h-8 px-4 rounded-lg flex items-center gap-1"
                    >
                        <Search size={16} />
                        <span className="hidden sm:inline">Rechercher</span>
                    </Button>
                </form>
            </div>

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