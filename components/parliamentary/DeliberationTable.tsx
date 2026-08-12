"use client";

import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Search, Undo2, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DeliberationTableProps {
    tableHtml: string;
    showPagination?: boolean;
}

export function DeliberationTable({ tableHtml, showPagination = true }: DeliberationTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const rowsPerPage = 6;

    // Historique du terme de recherche précédent pour permettre l'annulation
    const previousSearchTermRef = useRef<string>("");
    const [canUndoSearch, setCanUndoSearch] = useState(false);

    // Récupération des lignes du tableau
    const allRows = useMemo(() => {
        if (typeof window === "undefined") return [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableHtml, "text/html");
        const table = doc.querySelector("table");
        if (!table) return [];
        const tbody = table.querySelector("tbody");
        const rows = tbody ? tbody.querySelectorAll("tr") : table.querySelectorAll("tr:not(:first-child)");
        return Array.from(rows).map((tr) => tr.outerHTML);
    }, [tableHtml]);

    // Filtrage des lignes selon le terme de recherche
    const filteredRows = useMemo(() => {
        if (!searchTerm.trim()) return allRows;
        const term = searchTerm.toLowerCase().trim();
        return allRows.filter((rowHtml) => {
            // On crée un élément temporaire pour extraire le texte
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = rowHtml;
            const text = tempDiv.textContent?.toLowerCase() || "";
            return text.includes(term);
        });
    }, [allRows, searchTerm]);

    const totalRows = filteredRows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const displayedRows = useMemo(() => {
        if (!showPagination || showAll) return filteredRows;
        const start = (currentPage - 1) * rowsPerPage;
        return filteredRows.slice(start, start + rowsPerPage);
    }, [filteredRows, currentPage, showAll, showPagination]);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
        if (!showAll) setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        previousSearchTermRef.current = searchTerm;
        setCanUndoSearch(searchTerm.trim() !== "");
        setSearchTerm(value);
        setCurrentPage(1);
        if (value && showAll) setShowAll(false);
    };

    // Annule la dernière modification et revient au terme de recherche précédent
    const undoSearch = () => {
        setSearchTerm(previousSearchTermRef.current);
        setCurrentPage(1);
        setCanUndoSearch(false);
    };

    const clearSearch = () => {
        previousSearchTermRef.current = searchTerm;
        setCanUndoSearch(searchTerm.trim() !== "");
        setSearchTerm("");
        setCurrentPage(1);
    };

    if (allRows.length === 0) {
        return <p className="text-white/50 italic">Aucune délibération trouvée.</p>;
    }

    return (
        <div className="space-y-6 font-poppins">
            {/* Barre de recherche et contrôles */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            type="text"
                            placeholder="Filtrer les lignes..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9 pr-8 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-cyan-400/50 focus:ring-cyan-400/20"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                                title="Effacer le filtre"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    {canUndoSearch && (
                        <button
                            onClick={undoSearch}
                            className="flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 transition whitespace-nowrap px-2 py-2"
                            title="Annuler et revenir au filtre précédent"
                        >
                            <Undo2 className="h-4 w-4" /> Annuler
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/60">
                        {filteredRows.length} ligne{filteredRows.length > 1 ? "s" : ""}
                    </span>
                    {showPagination && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleShowAll}
                            className="border-cyan-400/50 text-cyan-300 bg-transparent hover:text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
                        >
                            {showAll ? (
                                <>
                                    <EyeOff className="w-4 h-4 mr-1" /> Masquer
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4 mr-1" /> Tous afficher
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {/* Navigation de pagination */}
            {showPagination && !showAll && totalPages > 1 && (
                <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="border-white/20 bg-transparent text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="border-white/20 bg-transparent text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Suivant <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <span className="text-sm text-white/50">
                        Page {currentPage} / {totalPages}
                    </span>
                </div>
            )}

            {/* Tableau */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-white/90 min-w-[800px]">
                        <thead className="bg-white/10 backdrop-blur-sm sticky top-0 z-10">
                            <tr>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Dates
                                </th>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Heures
                                </th>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Séances
                                </th>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Activités
                                </th>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Observations
                                </th>
                                <th className="p-4 text-left font-semibold text-cyan-300 whitespace-nowrap">
                                    Délibérations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedRows.length > 0 ? (
                                displayedRows.map((rowHtml, idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-t border-white/5 transition-colors ${idx % 2 === 0
                                            ? "bg-slate-800/60 hover:bg-slate-700/70"
                                            : "bg-slate-700/40 hover:bg-slate-700/60"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: rowHtml }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-white/50 italic">
                                        Aucune ligne ne correspond à votre recherche.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}