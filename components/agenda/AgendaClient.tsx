"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, X, Calendar } from "lucide-react";
import { formatDate, cleanText } from "@/utils/utility";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import type { WpPost } from "@/lib/wp-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEMS_PER_PAGE } from "@/constants/constants";

export function AgendaClient({ items, pageTitle }: { items: WpPost[]; pageTitle: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrage
    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return items;
        const term = searchTerm.trim().toLowerCase();
        return items.filter(
            (item) =>
                cleanText(item.title.rendered).toLowerCase().includes(term) ||
                (item.excerpt?.rendered ? cleanText(item.excerpt.rendered).toLowerCase().includes(term) : false)
        );
    }, [items, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPage = (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages));
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };
    const clearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
    };

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {pageTitle}
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Retrouvez l&apos;ordre du jour des réunions parlementaires du Sénat.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex gap-3 ml-auto">
                        <Input
                            type="text"
                            placeholder="Rechercher un ordre du jour..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-56 bg-white/5 border-white/10 text-white placeholder:text-cyan-300 focus:ring-cyan-400/50"
                        />
                        <Button type="submit" variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30">
                            <Search className="w-4 h-4 mr-2" />
                            Rechercher
                        </Button>
                    </form>
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSearch}
                            className="text-white/60 hover:text-white"
                        >
                            <X className="w-4 h-4 mr-1" /> Effacer
                        </Button>
                    )}
                    <div className="text-gray-400 text-sm ml-auto">
                        {filteredItems.length} article{filteredItems.length > 1 ? "s" : ""}
                    </div>
                </div>

                {paginatedItems.length === 0 ? (
                    <p className="text-gray-400">Aucun ordre du jour ne correspond à votre recherche.</p>
                ) : (
                    <>
                        <div className="grid gap-5">
                            {paginatedItems.map((item) => (
                                <Card
                                    key={item.id}
                                    className="bg-white/10 backdrop-blur-sm border-white/10 hover:shadow-2xl transition-shadow overflow-hidden"
                                >
                                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 flex-wrap mb-2">
                                                <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-none">
                                                    Ordre du jour
                                                </Badge>
                                                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {formatDate(item.date)}
                                                </Badge>
                                            </div>
                                            <h2 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {cleanText(item.title.rendered)}
                                            </h2>
                                            {item.excerpt?.rendered && (
                                                <div
                                                    className="text-gray-300 text-sm line-clamp-2"
                                                    dangerouslySetInnerHTML={{ __html: cleanText(item.excerpt.rendered) }}
                                                />
                                            )}
                                        </div>
                                        <Link
                                            href={`/agenda/${item.slug}`}
                                            className="shrink-0 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition group"
                                        >
                                            <span className="text-sm font-medium">Voir</span>
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination className="mt-10">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => goToPage(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                            }
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() => goToPage(page)}
                                                className={`cursor-pointer ${page === currentPage
                                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border-transparent hover:bg-cyan-600"
                                                    : "text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                                    }`}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => goToPage(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}