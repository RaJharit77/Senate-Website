"use client";

import { Button } from "@/components/ui/button";
import type { ActivityCategory } from "@/types/internationalType";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const FILTERS: { id: "all" | ActivityCategory; label: string }[] = [
    { id: "all", label: "Toutes" },
    { id: "audience", label: "Audiences" },
    { id: "delegation", label: "Délégations" },
    { id: "international", label: "Déplacements" },
];

export function FilterButtons({
    currentFilter,
    onChange,
}: {
    currentFilter: "all" | ActivityCategory;
    onChange: (filter: "all" | ActivityCategory) => void;
}) {
    return (
        <div className="mb-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
                <Button
                    key={f.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onChange(f.id)}
                    className={
                        currentFilter === f.id
                            ? "bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-gray-200 border-white/10"
                    }
                >
                    {f.label}
                </Button>
            ))}
        </div>
    );
}

export function PaginationControls({
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
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-white/10 bg-transparent text-white/60 hover:bg-white/10 hover:text-white/80"
            >
                <MdKeyboardDoubleArrowLeft />
            </Button>
            {pages.map((p) => (
                <Button
                    key={p}
                    variant={p === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onChange(p)}
                    className={
                        p === currentPage
                            ? "bg-cyan-500 text-white hover:bg-cyan-600"
                            : "border-white/10 bg-transparent text-white/70 hover:bg-white/10 hover:text-white/90"
                    }
                >
                    {p}
                </Button>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-white/10 bg-transparent text-white/60 hover:bg-white/10 hover:text-white/80"
            >
                <MdKeyboardDoubleArrowRight />
            </Button>
        </nav>
    );
}