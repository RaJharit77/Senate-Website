"use client";

import Link from "next/link";
import { Scale, Calendar, ChevronRight } from "lucide-react";
import { CYAN, WHITE } from "@/utils/colors";
import { formatDate } from "@/utils/utility";
import { ConstitutionalTextsProps } from "@/types/textsAndLaws";

export function ConstitutionalTexts({ republiques, showAllLink = true }: ConstitutionalTextsProps) {
    if (republiques.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Scale size={22} style={{ color: WHITE }} />
                    <h2 className="text-2xl font-semibold text-white font-poppins">
                        Textes constitutionnels
                    </h2>
                    <span className="text-white/30 text-sm ml-2">
                        ({republiques.length} texte{republiques.length > 1 ? 's' : ''})
                    </span>
                </div>
                {showAllLink && (
                    <Link
                        href="/texts-and-laws/constitutional-texts"
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                        Voir tous
                        <ChevronRight size={16} />
                    </Link>
                )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {republiques.map((item) => (
                    <Link
                        key={item.id}
                        href={`/texts-and-laws/constitutional-texts/${item.slug}`}
                        className="group border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all hover:border-cyan-400/30 hover:shadow-xl"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                <Scale size={20} style={{ color: CYAN }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors font-serif"
                                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                />
                                <div className="flex items-center gap-3 mt-2 text-white/40 text-sm">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {formatDate(item.date)}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                        En vigueur
                                    </span>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-white/20 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}