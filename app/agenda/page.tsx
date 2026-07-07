import Link from "next/link";
import { getPostsByCategory, getPageBySlug } from "@/lib/api";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import type { WpPost } from "@/lib/types";
import { formatDate } from "@/utils/utility";
import { CYAN, EMERALD, RED, WHITE } from "@/utils/colors";

const CAT_ORDRE_JOUR = 11;

type AgendaItem = {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    excerpt?: { rendered: string } | null;
};

export default async function AgendaPage() {
    const page = await getPageBySlug("ordre-du-jour").catch(() => null);
    const pageTitle = page?.title?.rendered || "Ordre du Jour";

    const agendaItems = (await getPostsByCategory(CAT_ORDRE_JOUR, {
        per_page: 20,
        _embed: true,
    }).catch(() => [])) as AgendaItem[];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 bg-linear-to-b from-black/60 via-black/30 to-black/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <div className="flex gap-1 mb-4 justify-center md:justify-start" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {pageTitle}
                    </h1>
                    <p
                        className="text-lg mt-3 max-w-2xl mx-auto md:mx-0 text-white/70"
                        style={{ fontFamily: "'Source Serif 4', serif" }}
                    >
                        Retrouvez l&apos;ordre du jour des réunions parlementaires du Sénat.
                    </p>
                </div>

                {/* Grille des articles */}
                {agendaItems.length === 0 ? (
                    <div className="text-center py-20 text-white/50">
                        <p className="text-xl">Aucun ordre du jour disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {agendaItems.map((item: AgendaItem) => (
                            <Link
                                key={item.id}
                                href={`/agenda/${item.slug}`}
                                className="group block transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Effet de brillance au survol */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                                        {/* Icône / indicateur visuel */}
                                        <div className="shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                                            <Calendar size={20} className="text-cyan-300" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span
                                                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                                                    style={{
                                                        backgroundColor: `${CYAN}25`,
                                                        color: CYAN,
                                                        border: `1px solid ${CYAN}40`,
                                                    }}
                                                >
                                                    Ordre du jour
                                                </span>
                                                <span
                                                    className="inline-flex items-center gap-1.5 text-sm text-white/60"
                                                >
                                                    <Clock size={14} />
                                                    {formatDate(item.date)}
                                                </span>
                                            </div>

                                            <h3
                                                className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {item.title.rendered}
                                            </h3>

                                            {item.excerpt?.rendered && (
                                                <div
                                                    className="mt-3 text-white/60 text-sm line-clamp-2"
                                                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                                                />
                                            )}
                                        </div>

                                        <div className="shrink-0 text-cyan-300/50 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all duration-300">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}