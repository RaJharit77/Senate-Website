"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Inbox, Search, SearchX, Undo2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeliberationTableProps, TableState } from "@/types/parliamentaryType";

export function DeliberationTable({ tableHtml, showPagination = true }: DeliberationTableProps) {
    const [tableState, setTableState] = useState<TableState>({ rows: [], isLoading: true });
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const rowsPerPage = 6;

    const previousSearchTermRef = useRef<string>("");
    const [canUndoSearch, setCanUndoSearch] = useState(false);
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (hasInitializedRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(tableHtml, "text/html");
        const table = doc.querySelector("table");
        let rowList: string[] = [];
        if (table) {
            const tbody = table.querySelector("tbody");
            const rowsEl = tbody ? tbody.querySelectorAll("tr") : table.querySelectorAll("tr:not(:first-child)");
            rowList = Array.from(rowsEl).map((tr) => tr.outerHTML);
        }
        setTableState({ rows: rowList, isLoading: false });
        hasInitializedRef.current = true;
    }, [tableHtml]);

    const { rows, isLoading } = tableState;

    const filteredRows = useMemo(() => {
        if (!searchTerm.trim()) return rows;
        const term = searchTerm.toLowerCase().trim();
        return rows.filter((rowHtml) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = rowHtml;
            const text = tempDiv.textContent?.toLowerCase() || "";
            return text.includes(term);
        });
    }, [rows, searchTerm]);

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-white/60">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Chargement du tableau...</span>
                </div>
            </div>
        );
    }

    if (rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Inbox className="h-4 w-4 text-white/40" />
                </div>
                <p className="italic text-white/50">Aucune délibération trouvée.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 font-poppins">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-[220px] flex-1 items-center gap-2">
                    <div className="relative min-w-0 flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                            type="text"
                            placeholder="Filtrer les lignes..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="h-10 rounded-xl border-white/10 bg-white/5 pl-9 pr-8 text-sm text-white placeholder:text-white/35 transition-colors focus:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/20"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                aria-label="Effacer le filtre"
                                title="Effacer le filtre"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                    {canUndoSearch && (
                        <button
                            onClick={undoSearch}
                            title="Revenir au filtre précédent"
                            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-2 text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/20 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                        >
                            <Undo2 className="h-3.5 w-3.5" />
                            Annuler
                        </button>
                    )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tabular-nums text-white/55">
                        {totalRows} ligne{totalRows > 1 ? "s" : ""}
                    </span>
                    {showPagination && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleShowAll}
                            aria-pressed={showAll}
                            className={`rounded-xl transition-colors ${showAll
                                ? "border-cyan-400/60 bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/25 hover:text-white"
                                : "border-cyan-400/30 bg-transparent text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200"
                                }`}
                        >
                            {showAll ? (
                                <>
                                    <EyeOff className="w-4 h-4 mr-1.5" /> Afficher par page
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4 mr-1.5" /> Tout afficher
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {showPagination && !showAll && totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="Page précédente"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="rounded-xl border-white/20 bg-transparent text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="Page suivante" 
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="rounded-xl border-white/20 bg-transparent text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            Suivant <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <span className="text-xs tabular-nums text-white/50">
                            Page {currentPage} / {totalPages}
                        </span>
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-[width] duration-300"
                                style={{ width: `${(currentPage / totalPages) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-sm text-white/90 [&_td]:align-top [&_td]:leading-relaxed">
                        <thead className="sticky top-0 z-10 bg-white/10 backdrop-blur-sm">
                            <tr>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
                                    Dates
                                </th>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
                                    Heures
                                </th>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
                                    Séances
                                </th>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
                                    Activités
                                </th>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
                                    Observations
                                </th>
                                <th className="whitespace-nowrap border-b border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90">
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
                                            ? "bg-white/[0.02] hover:bg-white/[0.07]"
                                            : "bg-white/[0.05] hover:bg-white/[0.09]"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: rowHtml }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                                <SearchX className="h-4 w-4 text-white/40" />
                                            </div>
                                            <p className="italic text-white/50">Aucune ligne ne correspond à votre recherche.</p>
                                            <button
                                                onClick={clearSearch}
                                                className="rounded text-xs text-cyan-300 underline underline-offset-4 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                                            >
                                                Réinitialiser le filtre
                                            </button>
                                        </div>
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