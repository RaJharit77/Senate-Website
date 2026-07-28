"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
 * Génère un slug à partir d'un nom (en minuscules, sans accents, tirets)
 */
function generateSlug(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\-]/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();
}

/**
 * Ajoute des liens vers les profils des sénateurs (vers /historical/[slug])
 * et supprime les doublons de noms.
 */
function addSenatorLinks(html: string): string {
    if (!html || typeof document === "undefined") return html;

    const container = document.createElement("div");
    container.innerHTML = html;

    const columns = container.querySelectorAll('[class*="col-"]:has(.rounded-circle)');
    const seenNames = new Set<string>();

    columns.forEach((col) => {
        const titleEl = col.querySelector("h3, h4");
        if (!titleEl) return;

        const existingLink = titleEl.querySelector("a");
        if (existingLink) {
            existingLink.className = "hover:text-cyan-300 transition-colors cursor-pointer";
            return;
        }

        const name = titleEl.textContent?.trim() || "";
        if (!name) return;

        if (seenNames.has(name)) {
            col.remove();
            return;
        }
        seenNames.add(name);

        const slug = generateSlug(name);
        titleEl.innerHTML = `<a href="/historical/${slug}" class="hover:text-cyan-300 transition-colors cursor-pointer">${name}</a>`;
    });

    return container.innerHTML;
}

export function HistoryTabs({ tabs, contents, loading = false }: HistoryTabsProps) {
    const router = useRouter();

    const getInitialTab = (): string => {
        if (typeof window === "undefined") return tabs[0]?.id ?? "";
        const hash = window.location.hash.replace("#", "");
        if (tabs.some((t) => t.id === hash)) {
            return hash;
        }
        return tabs[0]?.id ?? "";
    };

    const [activeTab, setActiveTab] = useState(getInitialTab);
    const mounted = typeof document !== "undefined";

    // Synchronisation avec le hash dans l'URL
    useEffect(() => {
        let t: ReturnType<typeof setTimeout> | null = null;
        const update = () => {
            const hash = window.location.hash.replace("#", "");
            if (!tabs.some((t) => t.id === hash)) return;
            // Avoid synchronous setState inside effect to prevent cascading renders
            // Schedule the state update asynchronously.
            const id = hash;
            if (t) clearTimeout(t);
            t = setTimeout(() => setActiveTab(id), 0);
        };

        // Run once on mount / when tabs change
        if (typeof window !== "undefined") update();
        // Listen to hash changes
        window.addEventListener("hashchange", update);
        return () => {
            if (t) clearTimeout(t);
            window.removeEventListener("hashchange", update);
        };
    }, [tabs]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        // Met à jour le hash dans l'URL sans recharger la page
        router.push(`#${tabId}`, { scroll: false });
    };

    const activeConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0];
    const rawContent = contents[activeTab] ?? "";

    const activeContent = mounted ? addSenatorLinks(rawContent) : rawContent;

    // ── CONFIGURATION TAILWIND (inchangée) ──
    const tailwindWPStyles = `
        text-gray-300 font-poppins leading-relaxed w-full

        [&_.row]:!flex [&_.row]:!flex-wrap [&_.row]:!justify-center [&_.row]:!items-center [&_.row]:!gap-12 [&_.row]:!w-full [&_.row]:!my-12

        [&_[class*="col-"]:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-12:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-10:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(83.33%-1.5rem)]
        md:[&_.col-md-8:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(66.66%-1.5rem)]
        md:[&_.col-md-6:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(50%-1.5rem)]

        [&_[class*="col-"]:has(.rounded-circle)]:!w-[160px] 
        sm:[&_[class*="col-"]:has(.rounded-circle)]:!w-[200px]
        md:[&_[class*="col-"]:has(.rounded-circle)]:!w-[220px]

        [&_[class*="col-"]:has(.rounded-circle)]:!aspect-square
        [&_[class*="col-"]:has(.rounded-circle)]:!bg-white/5
        [&_[class*="col-"]:has(.rounded-circle)]:!rounded-[2rem]
        [&_[class*="col-"]:has(.rounded-circle)]:!border
        [&_[class*="col-"]:has(.rounded-circle)]:!border-white/10
        [&_[class*="col-"]:has(.rounded-circle)]:!p-6
        
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

        [&_.rounded-circle]:!rounded-full [&_.rounded-circle]:!w-16 [&_.rounded-circle]:!h-16 md:[&_.rounded-circle]:!w-24 md:[&_.rounded-circle]:!h-24 [&_.rounded-circle]:!object-cover
        [&_.rounded-circle]:!block [&_.rounded-circle]:!mx-auto [&_.rounded-circle]:!mb-4 [&_.rounded-circle]:!shrink-0 [&_.rounded-circle]:!shadow-lg [&_.rounded-circle]:!border-2 [&_.rounded-circle]:!border-white/20

        [&_[class*="col-"]:has(.rounded-circle)_h2], 
        [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-sm md:[&_[class*="col-"]:has(.rounded-circle)_h3]:!text-[15px] [&_[class*="col-"]:has(.rounded-circle)_h3]:!font-bold [&_[class*="col-"]:has(.rounded-circle)_h3]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h3]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-white [&_[class*="col-"]:has(.rounded-circle)_h3]:!line-clamp-2
        
        [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-xs md:[&_[class*="col-"]:has(.rounded-circle)_h4]:!text-sm [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-cyan-400 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mb-2 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h4]:!line-clamp-2
        
        [&_[class*="col-"]:has(.rounded-circle)_p]:!text-[10px] md:[&_[class*="col-"]:has(.rounded-circle)_p]:!text-[11px] [&_[class*="col-"]:has(.rounded-circle)_p]:!text-white/60 [&_[class*="col-"]:has(.rounded-circle)_p]:!mb-0 [&_[class*="col-"]:has(.rounded-circle)_p]:!line-clamp-2 [&_[class*="col-"]:has(.rounded-circle)_p]:!leading-tight

        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!w-auto
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!flex
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!justify-center
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!items-center
        [&_[class*="col-"]:has(img:not(.rounded-circle))]:!px-2

        [&_img:not(.rounded-circle)]:!block [&_img:not(.rounded-circle)]:!mx-auto [&_img:not(.rounded-circle)]:!object-contain [&_img:not(.rounded-circle)]:!max-w-full [&_img:not(.rounded-circle)]:!rounded-xl

        [&_h1]:!text-center [&_h1]:!text-3xl [&_h1]:!font-bold [&_h1]:!text-white [&_h1]:!mb-6
        [&_h2:not([class*="col-"]_h2)]:!text-center [&_h2:not([class*="col-"]_h2)]:!text-2xl [&_h2:not([class*="col-"]_h2)]:!text-white [&_h2:not([class*="col-"]_h2)]:!mb-4
        
        [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!text-justify [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!w-full [&_p:not([class*="col-"]:has(.rounded-circle)_p)]:!mb-4

        [&_.bg-danger]:!bg-red-500/20 [&_.bg-danger]:!text-red-300 [&_.bg-danger]:!border [&_.bg-danger]:!border-red-500/30 [&_.bg-danger]:!px-6 [&_.bg-danger]:!py-2 [&_.bg-danger]:!rounded-full [&_.bg-danger]:!block [&_.bg-danger]:!w-fit [&_.bg-danger]:!mx-auto [&_.bg-danger]:!my-6 [&_.bg-danger]:!font-bold [&_.bg-danger]:!text-sm [&_.bg-danger]:!text-center

        [&_ul]:!list-disc [&_ul]:!pl-6 [&_ul]:!mb-6 [&_li]:!mb-2 [&_li]:!text-gray-300
    `;

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                            ? "text-white shadow-lg scale-105"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                        style={{
                            backgroundColor: activeTab === tab.id ? tab.color : "transparent",
                            color: activeTab === tab.id
                                ? (tab.textColor || "white")
                                : "rgba(255,255,255,0.6)",
                            borderBottom: activeTab === tab.id ? "2px solid" : "2px solid transparent",
                            borderColor: activeTab === tab.id ? tab.color : "transparent",
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
                            borderColor: activeConfig.color,
                        }}
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
                        <div className={tailwindWPStyles} dangerouslySetInnerHTML={{ __html: activeContent }} />
                    ) : (
                        <p className="text-white/40 italic py-12 text-center">Aucun contenu disponible pour cette section.</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}