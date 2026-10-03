"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FILTERS, type ActivityCategory } from "@/types/internationalType";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationItems } from "@/utils/international";

export function FilterButtons({
    currentFilter,
    onChange,
}: {
    currentFilter: "all" | ActivityCategory;
    onChange: (filter: "all" | ActivityCategory) => void;
}) {
    return (
        <ToggleGroup
            type="single"
            value={currentFilter}
            onValueChange={(value) => {
                if (value) onChange(value as "all" | ActivityCategory);
            }}
            className="flex flex-wrap items-center gap-2"
        >
            {FILTERS.map((filter) => (
                <ToggleGroupItem
                    key={filter.id}
                    value={filter.id}
                    variant="outline"
                    size="sm"
                    className={
                        currentFilter === filter.id
                            ? "bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500 h-8 px-3 text-xs data-[state=on]:bg-cyan-500 data-[state=on]:text-white"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-gray-200 border-white/10 h-8 px-3 text-xs"
                    }
                >
                    {filter.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
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

    const pageItems = getPaginationItems(currentPage, totalPages);

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onChange(Math.max(1, currentPage - 1))}
                        text="Précédent"
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50 text-gray-400 border-gray-400 bg-transparent"
                                : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                        }
                    />
                </PaginationItem>

                {pageItems.map((item, index) =>
                    item === "..." ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis className="text-white/40" />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                isActive={item === currentPage}
                                onClick={() => onChange(item as number)}
                                className={
                                    item === currentPage
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border-transparent hover:bg-cyan-600 h-8 px-3 text-xs"
                                        : "border-white/10 bg-transparent text-white/70 hover:bg-white/10 hover:text-white/90 h-8 px-3 text-xs hover:border-cyan-400"
                                }
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
                        text="Suivant"
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50 text-gray-400 border-gray-400 bg-transparent"
                                : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}