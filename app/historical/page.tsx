"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getRepubliqueI,
    getRepubliqueII,
    getRepubliqueIII,
    getRepubliqueIV,
} from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { splitTransitionBlock, stripLeadingH2 } from "@/lib/sanitizeWpContent";
import { RED, CYAN, WHITE, EMERALD } from "@/utils/colors";
import Image from "next/image";

type TabId = "premiere" | "deuxieme" | "troisieme" | "quatrieme" | "transition";

interface TabConfig {
    id: TabId;
    label: string;
    color: string;
    period: string;
    intro: string;
}

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
    const [activeTab, setActiveTab] = useState<TabId>("premiere");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ids: Exclude<TabId, "transition">[] = ["premiere", "deuxieme", "troisieme", "quatrieme"];
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
                        console.error(`Erreur chargement ${id}:`, result.reason);
                    }
                });

                next.transition = transitionParts
                    .map((block) => stripLeadingH2(block))
                    .join('<hr class="my-8 border-white/10" />');

                setContents(next);
            } catch (error) {
                console.error("Erreur chargement historique:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const activeConfig = TABS.find((t) => t.id === activeTab)!;
    const activeContent = contents[activeTab];

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Titre principal */}
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-white text-4xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Histoire du Sénat de Madagascar
                    </h1>
                </div>

                {/* Bloc hero : image + description */}
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
                            <div className="relative w-full max-w-4xl aspect-4/3 rounded-xl shadow-2xl overflow-hidden">
                                <Image
                                    src={HERO_IMAGE}
                                    alt="Le Sénat de Madagascar"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    priority
                                />
                            </div>
                        </div>

                        <p
                            className="text-gray-300 text-lg text-center max-w-3xl mx-auto mt-6 leading-relaxed"
                            style={{ fontFamily: "'Source Serif 4', serif" }}
                        >
                            Le Sénat a été mis en place au lendemain de la naissance de la République Malgache, le 14 octobre 1958 ; plus précisément après l&apos;adoption de la Constitution du 29 avril 1959. Cependant, il a été mis en veilleuse pendant près de 30 ans pour ne réapparaître qu&apos;en mai 2001. Formant le Parlement avec l&apos;Assemblée Nationale, le Sénat est actuellement dans la deuxième législature de la Quatrième République.
                        </p>
                    </div>
                </div>

                {/* Onglets stylisés */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? "text-white shadow-lg scale-105"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                            style={{
                                backgroundColor: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.05)",
                                border: activeTab === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Contenu de l'onglet actif */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                    >
                        <div className="mb-6">
                            <h3
                                className="text-2xl font-bold"
                                style={{ color: activeConfig.color, fontFamily: "'Poppins', sans-serif" }}
                            >
                                {activeConfig.label}
                            </h3>
                            <span
                                className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
                                style={{
                                    backgroundColor: `${activeConfig.color}26`,
                                    color: activeConfig.color,
                                }}
                            >
                                {activeConfig.period}
                            </span>
                        </div>

                        <p
                            className="text-gray-300 text-base mb-6 italic"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {activeConfig.intro}
                        </p>

                        {loading ? (
                            <p className="text-gray-400">Chargement...</p>
                        ) : activeContent ? (
                            <div
                                className="prose prose-lg prose-invert max-w-none text-gray-300
                                    [&_p]:text-gray-300
                                    [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                                    [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                                    [&_figure]:flex [&_figure]:justify-center [&_figure]:my-6
                                    [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:max-h-[500px] [&_img]:object-contain
                                    [&_ul]:list-disc [&_ul]:pl-6
                                    [&_ol]:list-decimal [&_ol]:pl-6
                                    [&_li]:text-gray-300 [&_li]:mb-1"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: activeContent }}
                            />
                        ) : (
                            <p className="text-gray-400">Aucun contenu disponible pour cette section.</p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}