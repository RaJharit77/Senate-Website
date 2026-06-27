"use client";

import { useState, useMemo } from "react";
import { ActivityCard  } from "./ActivitiesFeed";
import type { ActivityCategory } from "@/lib/api";

export interface SimpleActivityItem {
    id: number;
    title: string;
    date: string;
    dateValue: number;
    imageUrl: string;
    link: string;
    category: ActivityCategory;
}

const PER_PAGE = 9;

function Pagination({
    currentPage,
    totalPages,
    onChange,
}: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
            <button
                onClick={() => onChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page précédente"
            >
                «
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium transition ${
                        p === currentPage
                            ? "bg-red-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page suivante"
            >
                »
            </button>
        </nav>
    );
}

export function SimpleActivityGrid({ items }: { items: SimpleActivityItem[] }) {
    const [page, setPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(items.length / PER_PAGE), [items.length]);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return items.slice(start, start + PER_PAGE);
    }, [items, page]);

    if (items.length === 0) {
        return <p className="py-12 text-center text-white/60">Aucune activité disponible pour le moment.</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedItems.map((item) => (
                    <ActivityCard key={item.id} item={item} />
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}