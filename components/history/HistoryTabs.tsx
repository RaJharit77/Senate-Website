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

    return (
        <div>
            {/* Onglets */}
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

            {/* Contenu animé */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                    {/* En-tête de l'onglet */}
                    <div className="mb-6">
                        <h3
                            className="text-2xl font-bold"
                            style={{
                                color: activeConfig.color,
                                fontFamily: "'Poppins', sans-serif",
                            }}
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

                    {/* Phrase contextuelle */}
                    <p
                        className="text-white/70 text-base mb-8 italic"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {activeConfig.intro}
                    </p>

                    {/* Corps du contenu WordPress */}
                    {loading ? (
                        <div className="flex items-center gap-3 text-white/50">
                            <svg
                                className="animate-spin h-5 w-5"
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
                            <span>Chargement…</span>
                        </div>
                    ) : activeContent ? (
                        <div
                            className="history-content"
                            dangerouslySetInnerHTML={{ __html: activeContent }}
                        />
                    ) : (
                        <p className="text-white/40 italic">
                            Aucun contenu disponible pour cette section.
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .history-content {
                    color: #d1d5db;
                    font-family: 'Poppins', sans-serif;
                    line-height: 1.75;
                }
                .history-content h1,.history-content h2,.history-content h3,
                .history-content h4,.history-content h5 {
                    color: #ffffff;
                    font-family: 'Poppins', sans-serif;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                }
                .history-content h2 { font-size: 1.5rem; font-weight: 700; }
                .history-content h3 { font-size: 1.25rem; font-weight: 600; }
                .history-content h4,.history-content h5 { font-size: 1rem; font-weight: 600; color: #e5e7eb; }
                .history-content strong { color: #ffffff; }
                .history-content a { color: #5bc8de; transition: color 0.2s; }
                .history-content a:hover { color: #93e1ed; }
                .history-content p { margin-bottom: 0.75rem; }
                .history-content ul { list-style: disc; padding-left: 1.5rem; }
                .history-content ol { list-style: decimal; padding-left: 1.5rem; }
                .history-content li { margin-bottom: 0.35rem; color: #d1d5db; }
                .history-content hr,.history-hr {
                    border: none;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    margin: 2.5rem 0;
                }

                /* ── Images illustratives (palais, documents, photos de groupe) ── */
                /* Grandes : pleine largeur, sans plafond de hauteur */
                .history-content figure {
                    display: flex;
                    justify-content: center;
                    margin: 2rem 0;
                }
                .history-content figure img {
                    width: 100%;
                    max-width: 900px;
                    height: auto;
                    max-height: none;
                    object-fit: contain;
                    border-radius: 0.875rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                    display: block;
                }
                .history-content p > img,.history-content > img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75rem;
                    display: block;
                    margin: 1.5rem auto;
                }

                /* ── Grilles Bootstrap recréées en flex ── */
                .history-content .row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.25rem;
                    justify-content: center;
                    align-items: center;
                    margin: 1.5rem 0;
                }
                .history-content [class*="col-md-5"],
                .history-content [class*="col-md-3"] {
                    flex: 1 1 200px; max-width: 260px; text-align: center;
                }
                .history-content [class*="col-lg-4"] {
                    flex: 1 1 180px; max-width: 240px; text-align: center;
                }
                .history-content [class*="col-lg-6"],
                .history-content [class*="col-md-6"] {
                    flex: 1 1 220px; max-width: 300px; text-align: center;
                }
                /* Colonne flèche : petite, centrée verticalement */
                .history-content [class*="col-md-2"],
                .history-content [class*="col-md-1"] {
                    flex: 0 0 auto; width: 48px;
                    display: flex; align-items: center; justify-content: center; padding: 0;
                }
                .history-content [class*="col-md-2"] img,
                .history-content [class*="col-md-1"] img {
                    width: 32px !important; height: auto !important;
                    max-height: none !important; border-radius: 0 !important;
                    box-shadow: none !important; margin: 0 !important;
                    object-fit: contain;
                    filter: invert(1) brightness(0.7);
                }
                /* Ligne pleine largeur */
                .history-content [class*="col-md-12"] {
                    flex: 1 1 100%; text-align: center;
                }

                /* ── Portraits ronds (sénateurs) ── */
                /* Taille fixe 180px, override explicite pour ne pas hériter
                   du style "grande image" des figures ci-dessus */
                .history-content .rounded-circle {
                    border-radius: 50% !important;
                    width: 180px !important; height: 180px !important;
                    max-width: 180px !important; max-height: 180px !important;
                    object-fit: cover !important;
                    display: block; margin: 0 auto 0.75rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    border: 3px solid rgba(255,255,255,0.1);
                }
                .history-content .rounded-circle + h4,
                .history-content .rounded-circle + h3 {
                    font-size: 0.9rem; font-weight: 600; color: #ffffff;
                    margin-top: 0; margin-bottom: 0.25rem;
                }
                .history-content .rounded-circle + h4 + p,
                .history-content .rounded-circle + h3 + p {
                    font-size: 0.8rem; color: rgba(255,255,255,0.55); margin: 0;
                }

                /* ── Classes Bootstrap visuelles ── */
                .history-content .bg-danger {
                    background-color: rgba(232,50,86,0.85); color: #ffffff;
                    padding: 0.5rem 1.25rem; border-radius: 0.5rem;
                    display: inline-block; margin: 1.5rem 0 0.75rem;
                    font-weight: 700; font-size: 1rem; letter-spacing: 0.02em;
                }
                .history-content .text-center { text-align: center; }
                .history-content .img-fluid { max-width: 100%; height: auto; }
                .history-content .img-thumbnail {
                    padding: 3px; background: rgba(255,255,255,0.06); border-radius: 50%;
                }

                /* ── Responsive mobile ── */
                @media (max-width: 640px) {
                    .history-content .row { gap: 1rem; }
                    .history-content [class*="col-md-5"],
                    .history-content [class*="col-lg-4"],
                    .history-content [class*="col-lg-6"],
                    .history-content [class*="col-md-6"] {
                        flex: 1 1 140px; max-width: 160px;
                    }
                    .history-content .rounded-circle {
                        width: 120px !important; height: 120px !important;
                        max-width: 120px !important; max-height: 120px !important;
                    }
                    .history-content figure img { max-width: 100%; }
                }
            ` }} />
        </div>
    );
}