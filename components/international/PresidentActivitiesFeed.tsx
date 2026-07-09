"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { ActivityCategory } from "@/types/internationalType";

export interface ActivityItem {
    id: number;
    slug: string
    category: ActivityCategory;
    title: string;
    date: string;
    dateValue: number;
    imageUrl: string;
    link: string;
}

const SECTION_CONFIG: Record<ActivityCategory, { label: string; emptyLabel: string }> = {
    audience: {
        label: "Audiences",
        emptyLabel: "Aucune audience pour le moment.",
    },
    delegation: {
        label: "Accueil des Délégations Parlementaires étrangères",
        emptyLabel: "Aucune délégation accueillie pour le moment.",
    },
    international: {
        label: "Déplacements à l'étranger",
        emptyLabel: "Aucun déplacement à l'étranger pour le moment.",
    },
};

const SECTION_ORDER: ActivityCategory[] = ["audience", "delegation", "international"];

const FILTERS: { id: "all" | ActivityCategory; label: string }[] = [
    { id: "all", label: "Toutes" },
    { id: "audience", label: "Audiences" },
    { id: "delegation", label: "Délégations" },
    { id: "international", label: "Déplacements" },
];

const PER_PAGE = 6;

function ActivityCard({ item }: { item: ActivityItem }) {
    return (
        <Link
            href={`/international/presidents-activities/${item.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-transparent border border-gray-600 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-transparent">
                {item.imageUrl ? (
                    <Image
                        src={item.imageUrl}
                        alt="activity card"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-cyan-500/80 backdrop-blur-sm rounded-full">
                        {SECTION_CONFIG[item.category].label}
                    </span>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <h4
                    className="text-base font-semibold leading-snug text-gray-100 line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <div className="flex items-center gap-1 text-xs text-gray-200 mt-1">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                </div>
            </div>
        </Link>
    );
}

function SectionDivider({ label }: { label: string }) {
    return (
        <div className="my-8 flex items-center gap-4">
            <hr className="flex-1 border-t border-white/20" />
            <h2 className="whitespace-nowrap text-lg font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {label}
            </h2>
            <hr className="flex-1 border-t border-white/20" />
        </div>
    );
}

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
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page précédente"
            >
                «
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium transition ${p === currentPage
                        ? "bg-cyan-500 text-white shadow-lg"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page suivante"
            >
                »
            </button>
        </nav>
    );
}

function ActivitySection({
    category,
    pageItems,
    isEmpty,
}: {
    category: ActivityCategory;
    pageItems: ActivityItem[];
    isEmpty: boolean;
}) {
    return (
        <div>
            <SectionDivider label={SECTION_CONFIG[category].label} />
            {isEmpty ? (
                <p className="text-sm text-white/50">{SECTION_CONFIG[category].emptyLabel}</p>
            ) : pageItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pageItems.map((item) => (
                        <ActivityCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-white/50">Aucun élément de cette catégorie sur cette page.</p>
            )}
        </div>
    );
}

export function PresidentActivitiesFeed({ items }: { items: ActivityItem[] }) {
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
            return Math.max(1, Math.ceil(relevantItems.length / PER_PAGE));
        }
        const maxLength = Math.max(
            groupedBySection.audience.length,
            groupedBySection.delegation.length,
            groupedBySection.international.length,
            1
        );
        return Math.ceil(maxLength / PER_PAGE);
    }, [filter, relevantItems.length, groupedBySection]);

    function pageSliceFor(categoryItems: ActivityItem[]) {
        const start = (page - 1) * PER_PAGE;
        return categoryItems.slice(start, start + PER_PAGE);
    }

    function handleFilterChange(next: "all" | ActivityCategory) {
        setFilter(next);
        setPage(1);
    }

    const hasAnyItems = items.length > 0;

    return (
        <div>
            {/* Filtres */}
            <div className="mb-6 flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => handleFilterChange(f.id)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${filter === f.id
                            ? "bg-cyan-500 text-white shadow-lg"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {!hasAnyItems && (
                <p className="py-12 text-center text-white/60">Aucune activité disponible pour le moment.</p>
            )}

            {hasAnyItems && filter === "all" ? (
                SECTION_ORDER.map((cat) => (
                    <ActivitySection
                        key={cat}
                        category={cat}
                        pageItems={pageSliceFor(groupedBySection[cat])}
                        isEmpty={groupedBySection[cat].length === 0}
                    />
                ))
            ) : hasAnyItems ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pageSliceFor(relevantItems).map((item) => (
                        <ActivityCard key={item.id} item={item} />
                    ))}
                </div>
            ) : null}

            <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}