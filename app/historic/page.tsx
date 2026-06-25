"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRepubliqueI, getRepubliqueII, getRepubliqueIII, getRepubliqueIV } from "@/lib/api";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const WHITE = "#ffffff";

type TabId = "premiere" | "deuxieme" | "troisieme" | "quatrieme";

type Post = {
    content?: {
        rendered?: string;
    } | null;
    [key: string]: any;
};

const tabs: { id: TabId; label: string; color: string }[] = [
    { id: "premiere", label: "Première République", color: GREEN },
    { id: "deuxieme", label: "Deuxième République", color: RED },
    { id: "troisieme", label: "Troisième République", color: CYAN },
    { id: "quatrieme", label: "Quatrième République", color: GREEN },
];

const pageTransition = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState<TabId>("premiere");
    const [content, setContent] = useState<Record<TabId, Post | null>>({
        premiere: null,
        deuxieme: null,
        troisieme: null,
        quatrieme: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rep1, rep2, rep3, rep4] = await Promise.all([
                    getRepubliqueI({ per_page: 1 }),
                    getRepubliqueII({ per_page: 1 }),
                    getRepubliqueIII({ per_page: 1 }),
                    getRepubliqueIV({ per_page: 1 }),
                ]);
                setContent({
                    premiere: rep1[0] || null,
                    deuxieme: rep2[0] || null,
                    troisieme: rep3[0] || null,
                    quatrieme: rep4[0] || null,
                });
            } catch (error) {
                console.error("Erreur chargement historique", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getContent = (id: TabId) => {
        const post = content[id];
        if (!post) return <p className="text-white/60">Contenu non disponible.</p>;
        return <div dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }} className="text-white/80 prose prose-invert max-w-none" />;
    };

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: GREEN }} />
                    </div>
                    <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Historique du Sénat</h1>
                    <p className="text-white/50 text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>Découvrez l&apos;évolution de la chambre haute à travers les Républiques.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
                    <p className="text-white/80 text-lg" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        Le Sénat a été mis en place au lendemain de la naissance de la République Malgache, le 14 octobre 1958...
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 mb-10 border-b border-white/10 pb-4">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="text-sm font-medium transition-all duration-300 pb-2 px-1" style={{ color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.5)", borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : "2px solid transparent" }}>{tab.label}</button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} variants={pageTransition} initial="initial" animate="animate" exit="exit" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        {loading ? <p className="text-white/60">Chargement...</p> : getContent(activeTab)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}