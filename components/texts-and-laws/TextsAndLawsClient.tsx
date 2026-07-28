"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    const [currentPage, setCurrentPage] = useState(1);

    const sortedLaws = useMemo(() => {
        return [...laws].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [laws]);

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

    return (
        <div>
            {pageContent && (
                <div className="mb-12 prose prose-lg max-w-none font-poppins text-white/80">
                    <div dangerouslySetInnerHTML={{ __html: pageContent }} />
                </div>
            )}

            {laws.length > 0 ? (
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText size={22} style={{ color: WHITE }} />
                        <h2 className="text-2xl font-semibold text-white font-poppins">
                            ADOPTÉS
                        </h2>
                        <span className="text-white/30 text-sm ml-2">
                            ({laws.length} texte{laws.length > 1 ? 's' : ''})
                        </span>
                    </div>
                    <p className="font-poppins text-white/40 text-sm mb-6 max-w-3xl">
                        Projets et propositions de lois adoptés par le Sénat.
                    </p>
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