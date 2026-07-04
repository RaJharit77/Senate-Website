"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabConfig {
    id: string;
    label: string;
    color: string;
    period: string;
    intro: string;
}

interface HistoryTabsProps {
    tabs: TabConfig[];
    contents: Record<string, string>;
    loading?: boolean;
}

export function HistoryTabs({ tabs, contents, loading = false }: HistoryTabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

    const activeConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0];
    const activeContent = contents[activeTab] ?? "";

    // ── CONFIGURATION TAILWIND CORRIGÉE ──
    const tailwindWPStyles = `
        text-gray-300 font-poppins leading-relaxed w-full

        /* 1. LIGNE PRINCIPALE : Flexbox centré.
           L'ajout de "!items-center" est CRUCIAL ici : il garantit que la flèche et les profils 
           sont parfaitement alignés sur leur axe horizontal. */
        [&_.row]:!flex [&_.row]:!flex-wrap [&_.row]:!justify-center [&_.row]:!items-center [&_.row]:!gap-6 [&_.row]:!w-full [&_.row]:!my-8

        /* 2. COLONNES CLASSIQUES (Texte) : S'adaptent responsivement.
           ATTENTION : On exclut les profils ET les colonnes contenant des images (comme la flèche) 
           pour empêcher la flèche de prendre 100% de l'écran et de casser la ligne ! */
        [&_[class*="col-"]:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-12:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-10:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(83.33%-1.5rem)]
        md:[&_.col-md-8:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(66.66%-1.5rem)]
        md:[&_.col-md-6:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(50%-1.5rem)]

        /* =========================================================
           3. CARTES DES SÉNATEURS (Taille fixe et Forme Carrée)
           ========================================================= */
        [&_[class*="col-"]:has(.rounded-circle)]:!w-[160px] 
        sm:[&_[class*="col-"]:has(.rounded-circle)]:!w-[200px]
        md:[&_[class*="col-"]:has(.rounded-circle)]:!w-[220px]

        [&_[class*="col-"]:has(.rounded-circle)]:!aspect-square
        [&_[class*="col-"]:has(.rounded-circle)]:!bg-white/5
        [&_[class*="col-"]:has(.rounded-circle)]:!rounded-[2rem]
        [&_[class*="col-"]:has(.rounded-circle)]:!border
        [&_[class*="col-"]:has(.rounded-circle)]:!border-white/10
        [&_[class*="col-"]:has(.rounded-circle)]:!p-4
        
        [&_[class*="col-"]:has(.rounded-circle)]:!flex
        [&_[class*="col-"]:has(.rounded-circle)]:!flex-col
        [&_[class*="col-"]:has(.rounded-circle)]:!items-center
        [&_[class*="col-"]:has(.rounded-circle)]:!justify-center
        [&_[class*="col-"]:has(.rounded-circle)]:!text-center
        [&_[class*="col-"]:has(.rounded-circle)]:!overflow-hidden
        
        [&_[class*="col-"]:has(.rounded-circle)]:!transition-transform
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!scale-105
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!bg-white/10
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!z-10

        /* Image Profile */
        [&_.rounded-circle]:!rounded-full [&_.rounded-circle]:!w-16 [&_.rounded-circle]:!h-16 md:[&_.rounded-circle]:!w-20 md:[&_.rounded-circle]:!h-20 [&_.rounded-circle]:!object-cover
        [&_.rounded-circle]:!block [&_.rounded-circle]:!mx-auto [&_.rounded-circle]:!mb-2 [&_.rounded-circle]:!shrink-0 [&_.rounded-circle]:!shadow-lg [&_.rounded-circle]:!border-2 [&_.rounded-circle]:!border-white/20

        /* Typo Profile */
        [&_[class*="col-"]:has(.rounded-circle)_h2], 
        [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-sm md:[&_[class*="col-"]:has(.rounded-circle)_h3]:!text-[15px] [&_[class*="col-"]:has(.rounded-circle)_h3]:!font-bold [&_[class*="col-"]:has(.rounded-circle)_h3]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h3]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-white [&_[class*="col-"]:has(.rounded-circle)_h3]:!line-clamp-2
        
        [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-xs md:[&_[class*="col-"]:has(.rounded-circle)_h4]:!text-sm [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-cyan-400 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h4]:!line-clamp-2
        
        [&_[class*="col-"]:has(.rounded-circle)_p]:!text-[10px] md:[&_[class*="col-"]:has(.rounded-circle)_p]:!text-[11px] [&_[class*="col-"]:has(.rounded-circle)_p]:!text-white/60 [&_[class*="col-"]:has(.rounded-circle)_p]:!mb-0 [&_[class*="col-"]:has(.rounded-circle)_p]:!line-clamp-2 [&_[class*="col-"]:has(.rounded-circle)_p]:!leading-tight

        /* =========================================================
           4. FLÈCHE VERTE DE SÉPARATION (Entre les profils)
           ========================================================= */
        /* La colonne contenant l'image (flèche) prend juste la place nécessaire, sans forcer de retour à la ligne */
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!w-auto
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!flex
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!justify-center
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!items-center
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!px-2

        /* Assure que l'image standard (flèche) a un comportement sain */
        [&_img:not(.rounded-circle)]:!block [&_img:not(.rounded-circle)]:!mx-auto [&_img:not(.rounded-circle)]:!object-contain [&_img:not(.rounded-circle)]:!max-w-full [&_img:not(.rounded-circle)]:!rounded-xl
        /* ========================================================= */

        /* 5. Titres Globaux */
        [&_h1]:!text-center [&_h1]:!text-3xl [&_h1]:!font-bold [&_h1]:!text-white [&_h1]:!mb-6
        [&_h2:not([class*="col-"]_h2)]:!text-center [&_h2:not([class*="col-"]_h2)]:!text-2xl [&_h2:not([class*="col-"]_h2)]:!text-white [&_h2:not([class*="col-"]_h2)]:!mb-4
        
        /* 6. Paragraphes descriptifs */
        [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!text-justify [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!w-full [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!mb-4

        /* 7. Boutons et Badges (ex: NOUVELLE SITUATION A COMPTER DE...) */
        [&_.bg-danger]:!bg-red-500/20 [&_.bg-danger]:!text-red-300 [&_.bg-danger]:!border [&_.bg-danger]:!border-red-500/30 [&_.bg-danger]:!px-6 [&_.bg-danger]:!py-2 [&_.bg-danger]:!rounded-full [&_.bg-danger]:!block [&_.bg-danger]:!w-fit [&_.bg-danger]:!mx-auto [&_.bg-danger]:!my-6 [&_.bg-danger]:!font-bold [&_.bg-danger]:!text-sm [&_.bg-danger]:!text-center

        /* 8. Listes */
        [&_ul]:!list-disc [&_ul]:!pl-6 [&_ul]:!mb-6 [&_li]:!mb-2 [&_li]:!text-gray-300
    `;

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                            ? "text-white shadow-lg scale-105"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        style={{
                            backgroundColor:
                                activeTab === tab.id ? tab.color : "rgba(255,255,255,0.05)",
                            border:
                                activeTab === tab.id
                                    ? `2px solid ${tab.color}`
                                    : "2px solid transparent",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                >
                    <div className="mb-8 flex flex-col items-start gap-2">
                        <h3
                            className="text-3xl font-bold tracking-tight"
                            style={{
                                color: activeConfig.color,
                                fontFamily: "'Poppins', sans-serif",
                            }}
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
                        className="text-white/80 text-lg mb-10 italic leading-relaxed border-l-4 pl-4"
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            borderColor: activeConfig.color
                        }}
                    >
                        {activeConfig.intro}
                    </p>

                    {loading ? (
                        <div className="flex items-center gap-4 text-white/60 py-12 justify-center">
                            <svg
                                className="animate-spin h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                            <span className="text-lg animate-pulse">Chargement des données historiques...</span>
                        </div>
                    ) : activeContent ? (
                        <div
                            className={tailwindWPStyles}
                            dangerouslySetInnerHTML={{ __html: activeContent }}
                        />
                    ) : (
                        <p className="text-white/40 italic py-12 text-center">
                            Aucun contenu disponible pour cette section.
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}