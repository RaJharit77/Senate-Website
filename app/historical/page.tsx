"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    getRepubliqueI,
    getRepubliqueII,
    getRepubliqueIII,
    getRepubliqueIV,
} from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { splitTransitionBlock, stripLeadingH2 } from "@/lib/sanitizeWpContent";
import { RED, WHITE, EMERALD, CYAN } from "@/utils/colors";
import { HistoryTabs } from "@/components/history/HistoryTabs";
import type { TabConfig } from "@/components/history/HistoryTabs";
import { TabId } from "@/types/TabId";

const TABS: TabConfig[] = [
    {
        id: "premiere",
        label: "Première République",
        color: EMERALD,
        period: "1959 – 1972",
        intro: "Pendant la Première République, le Sénat constitue la Chambre Haute d'un Parlement bicaméral aux côtés de l'Assemblée Nationale.",
    },
    {
        id: "deuxieme",
        label: "Deuxième République",
        color: RED,
        period: "1975 – 1991",
        intro: "Pendant la Deuxième République, le Sénat est supprimé au profit d'un Parlement monocaméral : l'Assemblée Nationale concentre l'essentiel du pouvoir législatif.",
    },
    {
        id: "troisieme",
        label: "Troisième République",
        color: RED,
        period: "1992 – 2009",
        intro: "Pendant la Troisième République, le système bicaméral est réhabilité par la Constitution de 1992, mais le Sénat ne redevient effectif qu'en mai 2001.",
    },
    {
        id: "quatrieme",
        label: "Quatrième République",
        color: EMERALD,
        period: "depuis 2014",
        intro: "Pendant la Quatrième République, le Sénat reprend ses fonctions aux côtés de l'Assemblée Nationale, avec un mandat sénatorial ramené à cinq ans.",
    },
    {
        id: "transition",
        label: "Période Transitoire",
        color: CYAN,
        period: "1972–1975 · 1991–1992 · 2009–2014",
        intro: "Durant les périodes transitoires, le Sénat est suspendu et remplacé par des organes consultatifs (CNPD, CRES, puis Conseil Supérieur de la Transition) le temps de la mise en place de nouvelles institutions.",
    },
];

const REPUBLIC_FETCHERS: Record<Exclude<TabId, "transition">, () => Promise<WpPost[]>> = {
    premiere: getRepubliqueI,
    deuxieme: getRepubliqueII,
    troisieme: getRepubliqueIII,
    quatrieme: getRepubliqueIV,
};

const HERO_IMAGE = "https://senat.mg/wp-content/uploads/2023/05/le-senat-1.jpg";

type ContentMap = Record<TabId, string>;
const EMPTY_CONTENT: ContentMap = {
    premiere: "",
    deuxieme: "",
    troisieme: "",
    quatrieme: "",
    transition: "",
};

export default function HistoryPage() {
    const [contents, setContents] = useState<ContentMap>(EMPTY_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ids: Exclude<TabId, "transition">[] = [
                    "premiere", "deuxieme", "troisieme", "quatrieme",
                ];
                const results = await Promise.allSettled(
                    ids.map((id) => REPUBLIC_FETCHERS[id]())
                );

                const next: ContentMap = { ...EMPTY_CONTENT };
                const transitionParts: string[] = [];

                results.forEach((result, index) => {
                    const id = ids[index];
                    if (result.status === "fulfilled" && result.value[0]) {
                        const rawHtml = result.value[0].content.rendered;
                        const { before, transition } = splitTransitionBlock(rawHtml);
                        if (transition) transitionParts.push(transition);
                        next[id] = stripLeadingH2(before);
                    } else if (result.status === "rejected") {
                        console.error(`[HistoryPage] Erreur chargement ${id}:`, result.reason);
                    }
                });

                // Regroupe les blocs transitoires des différents CPT dans un
                // seul onglet dédié, séparés par une ligne de séparation.
                next.transition = transitionParts
                    .map((block) => stripLeadingH2(block))
                    .join('<hr class="history-hr" />');

                setContents(next);
            } catch (error) {
                console.error("[HistoryPage] Erreur chargement:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">

                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-white text-4xl font-bold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Histoire du Sénat de Madagascar
                    </h1>
                </div>

                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={HERO_IMAGE}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="100vw"
                            quality={30}
                        />
                    </div>

                    <div className="relative z-10">
                        <h2
                            className="text-white text-2xl font-bold text-center mb-6"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Le Sénat à travers les Républiques
                        </h2>

                        <div className="flex justify-center">
                            <div
                                className="relative w-full max-w-4xl aspect-4/3 rounded-xl shadow-2xl overflow-hidden"
                                style={{ minHeight: 300 }}
                            >
                                <Image
                                    src={HERO_IMAGE}
                                    alt="Le Sénat de Madagascar à travers les Républiques"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 896px"
                                    quality={90}
                                    priority
                                />
                            </div>
                        </div>

                        <p
                            className="text-gray-300 text-lg text-center max-w-3xl mx-auto mt-6 leading-relaxed"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Le Sénat a été mis en place au lendemain de la naissance de la République
                            Malgache, le 14 octobre 1958 ; plus précisément après l&apos;adoption de
                            la Constitution du 29 avril 1959. Cependant, il a été mis en veilleuse
                            pendant près de 30 ans pour ne réapparaître qu&apos;en mai 2001. Formant
                            le Parlement avec l&apos;Assemblée Nationale, le Sénat est actuellement
                            dans la deuxième législature de la Quatrième République.
                        </p>

                        <div className="flex justify-center mt-8">
                            <Link
                                href="/historical/history"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors shadow-lg hover:shadow-cyan-500/30"
                            >
                                Découvrir l&apos;histoire complète
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <HistoryTabs tabs={TABS} contents={contents} loading={loading} />
            </div>
        </div>
    );
}