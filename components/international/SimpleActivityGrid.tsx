"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

    const totalPages = useMemo(() => Math.ceil(items.length / PER_PAGE), [items.length]);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return items.slice(start, start + PER_PAGE);
    }, [items, page]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                    <ActivityCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return <p className="py-12 text-center text-white/60">Aucune activité disponible pour le moment.</p>;
    }

    return (
        <div>
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