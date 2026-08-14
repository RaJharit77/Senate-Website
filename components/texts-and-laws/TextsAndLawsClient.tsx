"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    FileText,
    Eye,
    ChevronLeft,
    ChevronRight,
    Search,
    Calendar,
    ArrowUp,
    ArrowDown,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CYAN, WHITE } from "@/utils/colors";
import { formatDate } from "@/utils/utility";
import { ITEMS_PER_PAGES } from "@/constants/constants";

interface LawItem {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    link: string;
    date: string;
}

interface TextAndLawsClientProps {
    laws: LawItem[];
    pageContent?: string;
}

export function TextAndLawsClient({ laws, pageContent }: TextAndLawsClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Extraire les années uniques depuis les lois
    const uniqueYears = useMemo(() => {
        const years = laws.map((law) => new Date(law.date).getFullYear().toString());
        return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a));
    }, [laws]);

    // Filtrer les lois selon la recherche, l'année et le tri
    const filteredLaws = useMemo(() => {
        let result = laws;

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(
                (law) =>
                    law.title.toLowerCase().includes(term) ||
                    law.excerpt.toLowerCase().includes(term)
            );
        }

        if (selectedYear !== "all") {
            result = result.filter(
                (law) => new Date(law.date).getFullYear().toString() === selectedYear
            );
        }

        return result;
    }, [laws, searchTerm, selectedYear]);

    // Trier les lois
    const sortedLaws = useMemo(() => {
        const sorted = [...filteredLaws];
        if (sortOrder === "recent") {
            sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
            sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        return sorted;
    }, [filteredLaws, sortOrder]);

    const totalPages = Math.ceil(sortedLaws.length / ITEMS_PER_PAGES);
    const paginatedLaws = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGES;
        return sortedLaws.slice(start, start + ITEMS_PER_PAGES);
    }, [sortedLaws, currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value as "recent" | "oldest");
        setCurrentPage(1);
    };

    const handleYearChange = (value: string) => {
        setSelectedYear(value);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedYear("all");
        setSortOrder("recent");
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm.trim() !== "" || selectedYear !== "all";

    return (
        <div>
            {pageContent && (
                <div className="mb-12 prose prose-lg max-w-none font-poppins text-white/80">
                    <div dangerouslySetInnerHTML={{ __html: pageContent }} />
                </div>
            )}

            {laws.length > 0 ? (
                <section className="mb-16">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <FileText size={22} style={{ color: WHITE }} />
                            <h2 className="text-2xl font-semibold text-white font-poppins">
                                ADOPTÉS
                            </h2>
                            <span className="text-white/30 text-sm ml-2">
                                ({sortedLaws.length} texte{sortedLaws.length > 1 ? "s" : ""})
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Recherche */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher un texte..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-full sm:w-56 h-9 text-sm rounded-full focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-shadow"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Filtre par année */}
                            <Select value={selectedYear} onValueChange={handleYearChange}>
                                <SelectTrigger className="w-[140px] h-9 bg-white/10 border-white/20 text-white text-sm rounded-full hover:bg-cyan-500/10 transition-colors focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} className="text-white/40" />
                                        <SelectValue placeholder="Année">
                                            {selectedYear !== "all" ? selectedYear : "Année"}
                                        </SelectValue>
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a2633] border-white/10 text-white">
                                    <SelectItem
                                        value="all"
                                        className="hover:bg-cyan-500/20 data-[state=checked]:bg-cyan-500/30 focus:bg-cyan-500/20 focus:text-white"
                                    >
                                        Toutes les années
                                    </SelectItem>
                                    {uniqueYears.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={year}
                                            className="hover:bg-cyan-500/20 data-[state=checked]:bg-cyan-500/30 focus:bg-cyan-500/20 focus:text-white"
                                        >
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Tri */}
                            <Select value={sortOrder} onValueChange={handleSortChange}>
                                <SelectTrigger className="w-[140px] h-9 bg-white/10 border-white/20 text-white text-sm rounded-full hover:bg-cyan-500/10 transition-colors focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400">
                                    <SelectValue placeholder="Trier" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a2633] border-white/10 text-white">
                                    <SelectItem
                                        value="recent"
                                        className="hover:bg-cyan-500/20 data-[state=checked]:bg-cyan-500/30 focus:bg-cyan-500/20 focus:text-white"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ArrowUp size={14} />
                                            Plus récent
                                        </div>
                                    </SelectItem>
                                    <SelectItem
                                        value="oldest"
                                        className="hover:bg-cyan-500/20 data-[state=checked]:bg-cyan-500/30 focus:bg-cyan-500/20 focus:text-white"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ArrowDown size={14} />
                                            Plus ancien
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Bouton Réinitialiser */}
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="text-white/40 hover:text-white hover:bg-white/10 rounded-full px-3 h-9 text-sm font-normal gap-1.5"
                                >
                                    <X size={14} />
                                    Réinitialiser
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Affichage des filtres actifs (badges) */}
                    {(searchTerm || selectedYear !== "all") && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-white/30 text-xs">Filtres actifs :</span>
                            {searchTerm && (
                                <Badge
                                    variant="secondary"
                                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 rounded-full px-3 py-0.5 text-xs flex items-center gap-1"
                                >
                                    Recherche : {searchTerm}
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="hover:text-white transition"
                                        aria-label="Retirer le filtre"
                                    >
                                        <X size={12} />
                                    </button>
                                </Badge>
                            )}
                            {selectedYear !== "all" && (
                                <Badge
                                    variant="secondary"
                                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 rounded-full px-3 py-0.5 text-xs flex items-center gap-1"
                                >
                                    Année : {selectedYear}
                                    <button
                                        onClick={() => setSelectedYear("all")}
                                        className="hover:text-white transition"
                                        aria-label="Retirer le filtre"
                                    >
                                        <X size={12} />
                                    </button>
                                </Badge>
                            )}
                        </div>
                    )}

                    {sortedLaws.length === 0 ? (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center text-white/40">
                            <p>Aucun texte ne correspond à vos critères.</p>
                            <p className="text-sm mt-2">Essayez de modifier les filtres ou la recherche.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-cyan-500/10">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 font-poppins font-semibold text-white text-sm border-b-2 w-24"
                                                    style={{ borderColor: "rgba(91, 200, 222, 0.3)" }}
                                                >
                                                    Laharana°
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 font-poppins font-semibold text-white text-sm border-b-2"
                                                    style={{ borderColor: "rgba(91, 200, 222, 0.3)" }}
                                                >
                                                    Rijantenin-dalàna
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 font-poppins font-semibold text-white text-sm border-b-2 text-right whitespace-nowrap w-36"
                                                    style={{ borderColor: "rgba(91, 200, 222, 0.3)" }}
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 font-poppins font-semibold text-white text-sm border-b-2 text-center w-20"
                                                    style={{ borderColor: "rgba(91, 200, 222, 0.3)" }}
                                                >
                                                    Voir
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedLaws.map((law, index) => {
                                                const globalIndex =
                                                    (currentPage - 1) * ITEMS_PER_PAGES + index + 1;
                                                return (
                                                    <tr
                                                        key={law.id}
                                                        className="group hover:bg-cyan-500/5 transition-colors"
                                                    >
                                                        <td
                                                            className="px-6 py-5 align-top font-mono text-sm border-b"
                                                            style={{
                                                                borderColor: "rgba(255,255,255,0.06)",
                                                                color: CYAN,
                                                            }}
                                                        >
                                                            {String(globalIndex).padStart(2, "0")}
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top border-b"
                                                            style={{
                                                                borderColor: "rgba(255,255,255,0.06)",
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/texts-and-laws/${law.slug}`}
                                                                className="block"
                                                            >
                                                                <span
                                                                    className="font-poppins font-semibold text-[#e8e8e8] group-hover:text-cyan-400 transition-colors leading-relaxed"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: law.title,
                                                                    }}
                                                                />
                                                                {law.excerpt && (
                                                                    <span
                                                                        className="block font-poppins text-white/40 text-sm mt-1 line-clamp-2"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: law.excerpt,
                                                                        }}
                                                                    />
                                                                )}
                                                            </Link>
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top text-right text-white/40 text-sm whitespace-nowrap border-b"
                                                            style={{
                                                                borderColor: "rgba(255,255,255,0.06)",
                                                            }}
                                                        >
                                                            {formatDate(law.date)}
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top text-center border-b"
                                                            style={{
                                                                borderColor: "rgba(255,255,255,0.06)",
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/texts-and-laws/${law.slug}`}
                                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400 transition-all"
                                                                aria-label="Voir le texte"
                                                            >
                                                                <Eye size={16} />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handlePrev}
                                        disabled={currentPage === 1}
                                        className="border-white/10 bg-transparent text-cyan-300 hover:bg-white/10 hover:text-cyan-400 disabled:opacity-40 inline-flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} />
                                        Précédent
                                    </Button>
                                    <span className="text-white/40 text-sm">
                                        Page {currentPage} / {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className="border-white/10 bg-transparent text-cyan-300 hover:bg-white/10 hover:text-cyan-400 disabled:opacity-40 inline-flex items-center gap-1"
                                    >
                                        Suivant
                                        <ChevronRight size={16} />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center text-white/40">
                    <p>Aucune loi ou texte n’est disponible pour le moment.</p>
                    <p className="text-sm mt-2">Veuillez revenir ultérieurement.</p>
                </div>
            )}
        </div>
    );
}