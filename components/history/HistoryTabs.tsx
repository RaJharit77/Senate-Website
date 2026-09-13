"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { addSenatorLinks } from "@/lib/senatorLinks";

export interface TabConfig {
    id: string;
    label: string;
    color: string;
    textColor: string;
    period: string;
    intro: string;
}

interface HistoryTabsProps {
    tabs: TabConfig[];
    contents: Record<string, string>;
    loading?: boolean;
}

/**
 * Onglets "Républiques" de la page Historique. Affiche le contenu WordPress
 * de l'onglet actif, synchronisé avec le paramètre d'URL ?tab=.
 */
export function HistoryTabs({ tabs, contents, loading = false }: HistoryTabsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // L'URL est la source de vérité pour l'onglet actif.
    const activeTabFromQuery = searchParams.get("tab") || tabs[0]?.id || "";
    const [activeTab, setActiveTab] = useState(activeTabFromQuery);
    const [isClient, setIsClient] = useState(false);

    // Ajustement d'état pendant le rendu (pattern React) : évite un flash de
    // l'ancien onglet avant qu'un useEffect ne se déclenche.
    if (activeTabFromQuery !== activeTab) {
        setActiveTab(activeTabFromQuery);
    }

    // addSenatorLinks manipule le DOM : exécuté seulement après le montage
    // pour éviter un mismatch d'hydratation (HTML serveur ≠ premier rendu client).
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`${pathname}?tab=${tabId}`, { scroll: false });
    };

    const activeConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0];
    const rawContent = contents[activeTab] ?? "";
    const activeContent = isClient ? addSenatorLinks(rawContent) : rawContent;

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-10">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                ? "text-white shadow-lg scale-105 cursor-pointer"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 cursor-pointer"
                                }`}
                            style={{
                                backgroundColor: isActive ? tab.color : "transparent",
                                color: isActive ? (tab.textColor || "white") : "rgba(255,255,255,0.6)",
                                borderBottom: isActive ? "2px solid" : "2px solid transparent",
                                borderColor: isActive ? tab.color : "transparent",
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    suppressHydrationWarning
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                >
                    <div className="mb-8 flex flex-col items-start gap-2">
                        <h3
                            className="font-poppins text-3xl font-bold tracking-tight"
                            style={{ color: activeConfig.color }}
                        >
                            {activeConfig.label}
                        </h3>
                        <span
                            className="px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase"
                            style={{
                                backgroundColor: `${activeConfig.color}26`,
                                color: activeConfig.color,
                                border: `1px solid ${activeConfig.color}40`,
                            }}
                        >
                            {activeConfig.period}
                        </span>
                    </div>

                    <p
                        className="font-poppins text-white/80 text-lg mb-10 italic leading-relaxed border-l-4 pl-4"
                        style={{ borderColor: activeConfig.color }}
                    >
                        {activeConfig.intro}
                    </p>

                    {loading ? (
                        <div className="flex items-center gap-4 text-white/60 py-12 justify-center">
                            <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span className="text-lg animate-pulse">Chargement des données historiques...</span>
                        </div>
                    ) : activeContent ? (
                        <div className="wp-senate-content font-poppins" dangerouslySetInnerHTML={{ __html: activeContent }} />
                    ) : (
                        <p className="text-white/40 italic py-12 text-center">Aucun contenu disponible pour cette section.</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}