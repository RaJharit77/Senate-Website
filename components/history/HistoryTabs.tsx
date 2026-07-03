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

        /* 1. Ligne Principale : Remplacement de Flex par CSS Grid pour des espacements (gaps) parfaits. 
           Fini les marges négatives et les cartes qui se chevauchent ! */
        [&_.row]:grid [&_.row]:grid-cols-1 md:[&_.row]:grid-cols-12 [&_.row]:gap-6 [&_.row]:w-full [&_.row]:my-8 [&_.row]:items-stretch
        /* Sécurité : Tout élément direct d'une ligne sans classe "col-" prendra 100% de la largeur */
        [&_.row>*:not([class*="col-"])]:col-span-1 md:[&_.row>*:not([class*="col-"])]:col-span-12

        /* 2. Base des Colonnes : Adapté pour s'intégrer au comportement CSS Grid */
        [&_[class*="col-"]]:flex [&_[class*="col-"]]:flex-col [&_[class*="col-"]]:justify-center [&_[class*="col-"]]:items-center

        /* 3. Grille Mathématique Stricte (Mapping Grid CSS) */
        md:[&_.col-md-12]:col-span-12
        md:[&_.col-md-11]:col-span-11
        md:[&_.col-md-10]:col-span-10
        md:[&_.col-md-9]:col-span-9
        md:[&_.col-md-8]:col-span-8
        md:[&_.col-md-7]:col-span-7
        md:[&_.col-md-6]:col-span-6
        md:[&_.col-md-5]:col-span-5
        md:[&_.col-md-4]:col-span-4
        md:[&_.col-md-3]:col-span-3
        md:[&_.col-md-2]:col-span-2
        md:[&_.col-md-1]:col-span-1

        /* 4. Titres au Centre et Descriptions Horizontales (Justifiées) */
        [&_h1]:!text-center [&_h2]:!text-center [&_h3]:!text-center [&_h4]:!text-center
        [&_[class*="col-"]:not(:has(.rounded-circle))_p]:!text-justify [&_[class*="col-"]:not(:has(.rounded-circle))_p]:!w-full [&_[class*="col-"]:not(:has(.rounded-circle))_p]:!max-w-none

        /* 5. Photos & Sénateurs : Style "Carte" avec contenu centré UNIQUEMENT s'il y a un portrait */
        [&_[class*="col-"]:has(.rounded-circle)]:text-center [&_[class*="col-"]:has(.rounded-circle)_p]:!text-center
        [&_[class*="col-"]:has(.rounded-circle)]:bg-white/5 [&_[class*="col-"]:has(.rounded-circle)]:rounded-3xl [&_[class*="col-"]:has(.rounded-circle)]:p-6 [&_[class*="col-"]:has(.rounded-circle)]:border [&_[class*="col-"]:has(.rounded-circle)]:border-white/5 [&_[class*="col-"]:has(.rounded-circle)]:transition-all [&_[class*="col-"]:has(.rounded-circle)]:relative
        hover:[&_[class*="col-"]:has(.rounded-circle)]:bg-white/10 hover:[&_[class*="col-"]:has(.rounded-circle)]:border-white/10 hover:[&_[class*="col-"]:has(.rounded-circle)]:z-10

        /* 6. Images Alignées Horizontalement : Cadrage strict au centre horizontal */
        [&_[class*="col-"]:has(>img:not(.rounded-circle))]:!flex-row [&_[class*="col-"]:has(>img:not(.rounded-circle))]:!justify-center [&_[class*="col-"]:has(>img:not(.rounded-circle))]:!items-center
        [&_img:not(.rounded-circle)]:!block [&_img:not(.rounded-circle)]:!mx-auto [&_img:not(.rounded-circle)]:object-contain
        [&_[class*="col-md-1"]_img:not(.rounded-circle)]:!w-full [&_[class*="col-md-1"]_img:not(.rounded-circle)]:!max-w-[45px]
        [&_[class*="col-md-2"]_img:not(.rounded-circle)]:!w-full [&_[class*="col-md-2"]_img:not(.rounded-circle)]:!max-w-[65px]

        /* 7. Normalisation des Portraits Ronds */
        [&_.rounded-circle]:!rounded-full [&_.rounded-circle]:!w-32 [&_.rounded-circle]:!h-32 [&_.rounded-circle]:!object-cover [&_.rounded-circle]:!block [&_.rounded-circle]:!mx-auto [&_.rounded-circle]:mb-4 [&_.rounded-circle]:shadow-lg [&_.rounded-circle]:border-2 [&_.rounded-circle]:border-white/10 [&_.rounded-circle]:transition-all [&_.rounded-circle]:duration-300 hover:[&_.rounded-circle]:scale-105 hover:[&_.rounded-circle]:border-white/30
        /* Sécurité si l'image WordPress est entourée d'un lien cliquable */
        [&_a:has(.rounded-circle)]:!block [&_a:has(.rounded-circle)]:!w-full

        /* 8. Hiérarchie Typographique Globale */
        [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold
        [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-wide
        [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold
        [&_h4]:text-cyan-400 [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold
        [&_strong]:text-white [&_strong]:font-semibold
        [&_a]:text-cyan-400 hover:[&_a]:text-cyan-300 [&_a]:transition-colors [&_a]:underline [&_a]:underline-offset-4
        [&_p]:mb-4 [&_p]:leading-relaxed

        /* Style spécifique des textes sous les portraits ronds. 
           (Correction : Utilisation de :has() sur le parent pour outrepasser la limite du combinateur '~' si une balise <a> encapsule l'image) */
        [&_[class*="col-"]:has(.rounded-circle)_h2]:!mt-2 [&_[class*="col-"]:has(.rounded-circle)_h2]:!text-[15px] [&_[class*="col-"]:has(.rounded-circle)_h2]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h2]:!mx-auto
        [&_[class*="col-"]:has(.rounded-circle)_h3]:!mt-2 [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-[15px] [&_[class*="col-"]:has(.rounded-circle)_h3]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h3]:!mx-auto
        [&_[class*="col-"]:has(.rounded-circle)_h4]:!mt-1 [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-sm [&_[class*="col-"]:has(.rounded-circle)_h4]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-white/70 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mx-auto
        [&_[class*="col-"]:has(.rounded-circle)_p]:!mt-1 [&_[class*="col-"]:has(.rounded-circle)_p]:!text-sm [&_[class*="col-"]:has(.rounded-circle)_p]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_p]:!text-white/60 [&_[class*="col-"]:has(.rounded-circle)_p]:!mx-auto [&_[class*="col-"]:has(.rounded-circle)_p]:leading-tight

        /* 9. Éléments Séparateurs et Listes */
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2 [&_li]:text-gray-300 [&_li]:pl-1
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_li]:text-gray-300 [&_li]:pl-1
        [&_hr]:border-none [&_hr]:border-t [&_hr]:border-white/10 [&_hr]:my-10
        [&_.history-hr]:border-none [&_.history-hr]:border-t [&_.history-hr]:border-white/10 [&_.history-hr]:my-10

        /* 10. Média Généraux (Organigrammes complets) */
        [&_figure]:flex [&_figure]:justify-center [&_figure]:my-10 [&_figure]:w-full
        [&_figure_img]:w-full [&_figure_img]:max-w-[900px] [&_figure_img]:h-auto [&_figure_img]:object-contain [&_figure_img]:rounded-2xl [&_figure_img]:shadow-2xl [&_figure_img]:border [&_figure_img]:border-white/5
        [&_p>img]:max-w-full [&_p>img]:h-auto [&_p>img]:rounded-xl [&_p>img]:block [&_p>img]:mx-auto [&_p>img]:my-6
        
        /* 11. Badges et Boutons (Correction du chevauchement du badge rouge) */
        [&_.bg-danger]:!bg-red-500/20 [&_.bg-danger]:text-red-300 [&_.bg-danger]:border [&_.bg-danger]:border-red-500/30 [&_.bg-danger]:px-5 [&_.bg-danger]:py-2 [&_.bg-danger]:rounded-full [&_.bg-danger]:!block [&_.bg-danger]:!w-fit [&_.bg-danger]:mx-auto [&_.bg-danger]:my-6 [&_.bg-danger]:font-semibold [&_.bg-danger]:text-sm [&_.bg-danger]:tracking-wide [&_.bg-danger]:!text-center
        [&_.text-center]:!text-center [&_.text-center_p]:!text-center
    `;

    return (
        <div>
            {/* Menu de sélection des Républiques */}
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

            {/* Conteneur principal avec animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* Badge de la période historique */}
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

                    {/* Texte d'introduction contextuel */}
                    <p
                        className="text-white/80 text-lg mb-10 italic leading-relaxed border-l-4 pl-4"
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            borderColor: activeConfig.color
                        }}
                    >
                        {activeConfig.intro}
                    </p>

                    {/* Rendu dynamique du HTML WP injecté */}
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