"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PER_PAGE } from "@/constants/constants";
import { ActivityCard, ActivityCardSkeleton } from "./ActivityCard";
import { PaginationControls } from "./FeedControls";
import type { SimpleActivityItem } from "@/types/internationalType";

export function SimpleActivityGrid({
    items,
    isLoading = false,
}: {
    items: SimpleActivityItem[];
    isLoading?: boolean;
}) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrer par recherche
    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return items;
        const term = searchTerm.toLowerCase().trim();
        return items.filter((item) =>
            item.title.toLowerCase().includes(term)
        );
    }, [items, searchTerm]);

    const totalPages = useMemo(() => Math.ceil(filteredItems.length / PER_PAGE), [filteredItems.length]);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return filteredItems.slice(start, start + PER_PAGE);
    }, [filteredItems, page]);

    if (isLoading) {
        return (
            <div>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-48 rounded-full bg-white/10 animate-pulse" />
                        <div className="h-9 w-24 rounded-full bg-white/10 animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: PER_PAGE }).map((_, i) => (
                        <ActivityCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (filteredItems.length === 0) {
        return (
            <div className="py-12 text-center text-white/60">
                {searchTerm ? (
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
            {/* Barre de recherche + Bouton */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-full sm:w-48 md:w-56 h-9 text-sm rounded-full focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-shadow"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition"
                                aria-label="Effacer"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSearchTerm(searchTerm); // déclenche un re-render (déjà fait)
                        }}
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 h-9 px-4 rounded-full text-sm"
                    >
                        <Search className="w-4 h-4 mr-1" />
                        Rechercher
                    </Button>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
            >
                {paginatedItems.map((item) => (
                    <ActivityCard
                        key={item.id}
                        item={{
                            ...item,
                            category: item.category || "delegation",
                        }}
                        basePath="/international/inter-parliamentary-friendship-group"
                    />
                ))}
            </motion.div>

            <PaginationControls currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}