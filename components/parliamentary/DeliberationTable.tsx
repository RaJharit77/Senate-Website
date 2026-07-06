"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

interface DeliberationTableProps {
    tableHtml: string;
    showPagination?: boolean; // true pour paginer les lignes, false pour tout afficher
}

export function DeliberationTable({ tableHtml, showPagination = true }: DeliberationTableProps) {
    const [rows, setRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const rowsPerPage = 6;

    useEffect(() => {
        if (typeof window === "undefined") return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableHtml, "text/html");
        const table = doc.querySelector("table");
        if (!table) {
            setRows([]);
            return;
        }
        const tbody = table.querySelector("tbody");
        const allRows = tbody
            ? tbody.querySelectorAll("tr")
            : table.querySelectorAll("tr:not(:first-child)");
        const rowStrings = Array.from(allRows).map((tr) => tr.outerHTML);
        setRows(rowStrings);
    }, [tableHtml]);

    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const displayedRows = useMemo(() => {
        if (!showPagination || showAll) return rows;
        const start = (currentPage - 1) * rowsPerPage;
        return rows.slice(start, start + rowsPerPage);
    }, [rows, currentPage, showAll, showPagination]);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
        if (!showAll) setCurrentPage(1);
    };

    if (totalRows === 0) {
        return <p className="text-white/50 italic">Aucune délibération trouvée.</p>;
    }

    return (
        <div className="space-y-6">
            {showPagination && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white/60">
                            {showAll
                                ? `${totalRows} lignes affichées`
                                : `Page ${currentPage} / ${totalPages} (${totalRows} lignes)`}
                        </span>
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
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrev}
                            disabled={currentPage === 1 || showAll}
                            className="border-white/20 bg-transparent text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNext}
                            disabled={currentPage === totalPages || showAll}
                            className="border-white/20 bg-transparent text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Suivant <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}

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
                            {displayedRows.map((rowHtml, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-t border-white/5 transition-colors ${idx % 2 === 0 ? "bg-white/5" : "bg-transparent"
                                        } hover:bg-white/10`}
                                    dangerouslySetInnerHTML={{ __html: rowHtml }}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}