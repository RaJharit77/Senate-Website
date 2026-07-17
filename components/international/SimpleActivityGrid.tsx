"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, easeInOut } from "framer-motion";
import { PER_PAGE } from "@/constants/constants";
import type { ActivityCategory } from "@/types/internationalType";

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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeInOut },
    },
};

function ActivityCard({ item }: { item: SimpleActivityItem }) {
    const href = `/international/inter-parliamentary-friendship-group/${item.slug}`;

    return (
        <motion.div variants={cardVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
            <Link
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-transparent border border-gray-600 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-transparent">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt="activity grid"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                            priority
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
                            Groupe d&apos;amitié
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
        </motion.div>
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
            <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {paginatedItems.map((item) => (
                    <ActivityCard key={item.id} item={item} />
                ))}
            </motion.div>
            <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}