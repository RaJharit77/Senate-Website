"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabConfig {
    id: string;
    label: string;
    color: string;
    period: string;
    intro: string;
}

interface HistoryTabsProps {
    tabs: TabConfig[];
    contents: Record<string, string>;
}

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export function HistoryTabs({ tabs, contents }: HistoryTabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

    const activeConfig = tabs.find((t) => t.id === activeTab)!;
    const activeContent = contents[activeTab] || "";

    return (
        <div>
            {/* Onglets stylisés */}
            <div className="flex flex-wrap gap-3 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeTab === tab.id
                                ? "text-white shadow-lg scale-105"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
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

            {/* Contenu avec animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
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
                        className="text-white/70 text-base mb-6 italic"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {activeConfig.intro}
                    </p>

                    {activeContent ? (
                        <div
                            className="prose prose-lg prose-invert max-w-none
                                prose-img:max-w-full prose-img:h-auto prose-img:mx-auto prose-img:rounded-xl prose-img:shadow-lg
                                prose-p:text-white/80
                                prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-strong:text-white
                                prose-a:text-cyan-300 hover:prose-a:text-cyan-200
                                prose-ul:list-disc prose-ul:pl-6
                                prose-ol:list-decimal prose-ol:pl-6
                                prose-li:text-white/80 prose-li:mb-1
                                prose-figure:flex prose-figure:justify-center prose-figure:my-6"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: activeContent }}
                        />
                    ) : (
                        <p className="text-white/60">Aucun contenu disponible pour cette section.</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}