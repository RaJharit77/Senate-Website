"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrer les lois selon la recherche (titre ou extrait)
    const filteredLaws = useMemo(() => {
        if (!searchTerm.trim()) return laws;
        const term = searchTerm.toLowerCase().trim();
        return laws.filter(
            (law) =>
                law.title.toLowerCase().includes(term) ||
                law.excerpt.toLowerCase().includes(term)
        );
    }, [laws, searchTerm]);

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

    // Pagination
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

    // Réinitialiser la page quand la recherche ou le tri change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value as "recent" | "oldest");
        setCurrentPage(1);
    };

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
                                ({sortedLaws.length} texte{sortedLaws.length > 1 ? 's' : ''})
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Recherche */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher un texte..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-full sm:w-56 h-9 text-sm rounded-full"
                                />
                            </div>
                            {/* Tri */}
                            <Select value={sortOrder} onValueChange={handleSortChange}>
                                <SelectTrigger className="w-[140px] h-9 bg-white/10 border-white/20 text-white text-sm rounded-full">
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a2633] border-white/10 text-white">
                                    <SelectItem value="recent">Plus récent</SelectItem>
                                    <SelectItem value="oldest">Plus ancien</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {sortedLaws.length === 0 ? (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center text-white/40">
                            <p>Aucun texte ne correspond à votre recherche.</p>
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
                                                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGES + index + 1;
                                                return (
                                                    <tr
                                                        key={law.id}
                                                        className="group hover:bg-cyan-500/5 transition-colors"
                                                    >
                                                        <td
                                                            className="px-6 py-5 align-top font-mono text-sm border-b"
                                                            style={{ borderColor: "rgba(255,255,255,0.06)", color: CYAN }}
                                                        >
                                                            {String(globalIndex).padStart(2, "0")}
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top border-b"
                                                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                                                        >
                                                            <Link
                                                                href={`/texts-and-laws/${law.slug}`}
                                                                className="block"
                                                            >
                                                                <span
                                                                    className="font-poppins font-semibold text-[#e8e8e8] group-hover:text-cyan-400 transition-colors leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: law.title }}
                                                                />
                                                                {law.excerpt && (
                                                                    <span
                                                                        className="block font-poppins text-white/40 text-sm mt-1 line-clamp-2"
                                                                        dangerouslySetInnerHTML={{ __html: law.excerpt }}
                                                                    />
                                                                )}
                                                            </Link>
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top text-right text-white/40 text-sm whitespace-nowrap border-b"
                                                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                                                        >
                                                            {formatDate(law.date)}
                                                        </td>
                                                        <td
                                                            className="px-6 py-5 align-top text-center border-b"
                                                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
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