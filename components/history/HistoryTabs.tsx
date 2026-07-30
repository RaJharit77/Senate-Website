"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

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

interface SenatorInfo {
    name: string;
    role: string;
    imgSrc: string;
}

function generateSlug(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

/**
 * Tronque un nom proprement, sans couper un mot en deux.
 * Le seuil est volontairement généreux : les cartes réservent 2 lignes
 * (min-h-[2.5em] + wrap), donc la plupart des noms à 2-3 mots n'ont pas
 * besoin d'être coupés du tout. Le bouton "Voir plus" prend le relais
 * pour les noms/fonctions qui dépassent malgré tout.
 */
function truncateName(name: string, maxLen = 34): string {
    if (name.length <= maxLen) return name;
    const sliced = name.slice(0, maxLen);
    const lastSpace = sliced.lastIndexOf(" ");
    const cut = lastSpace > 10 ? sliced.slice(0, lastSpace) : sliced;
    return cut.trim() + "…";
}

function cleanWhitespace(text: string): string {
    // Le HTML WordPress contient parfois des &nbsp; (espace insécable, \u00A0)
    // au milieu des noms ; \s en JS matche aussi \u00A0, donc ceci normalise
    // tout en simples espaces avant slug/troncature/affichage.
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Ajoute des liens internes vers /historical/[slug] sur chaque carte sénateur,
 * tronque proprement les noms trop longs, et injecte un bouton "Voir plus"
 * (avec les infos complètes en data-attributes) quand le nom ou la fonction
 * est réellement tronqué.
 *
 * IMPORTANT — pas de déduplication globale ici.
 * Le contenu WordPress de "La Quatrième République" est un récit chronologique :
 * le même sénateur (ex. BESOA Erick Lambert) réapparaît volontairement à
 * plusieurs endroits, une fois par période où il siège au Bureau Permanent.
 * Un Set global de noms déjà vus supprimait silencieusement ces réapparitions
 * légitimes (col.remove()), ce qui faisait "disparaître" des sénateurs bien
 * réels par rapport au site officiel. Si un JOUR un vrai doublon accidentel
 * apparaît dans le CMS (deux cartes strictement identiques, côte à côte, dans
 * la même .row), corrige-le côté WordPress plutôt que de le masquer ici :
 * une suppression côté client est invisible et donc impossible à diagnostiquer
 * (c'est exactement ce qui s'est passé).
 */
function addSenatorLinks(html: string): string {
    if (!html || typeof document === "undefined") return html;

    const container = document.createElement("div");
    container.innerHTML = html;

    const columns = container.querySelectorAll('[class*="col-"]:has(.rounded-circle)');
    let idx = 0;

    columns.forEach((col) => {
        const titleEl = col.querySelector("h3, h4") as HTMLElement | null;
        if (!titleEl) return;

        const existingLink = titleEl.querySelector("a");
        const rawName = existingLink?.textContent || titleEl.textContent || "";
        const fullName = cleanWhitespace(rawName);
        if (!fullName) return;

        const roleEl = Array.from(col.querySelectorAll("h4, p")).find(
            (el) => el !== titleEl && el.textContent?.trim()
        ) as HTMLElement | undefined;
        const fullRole = roleEl ? cleanWhitespace(roleEl.textContent || "") : "";

        const displayName = truncateName(fullName);
        const isTruncated = displayName !== fullName || fullRole.length > 50;
        const senatorId = `sen-${idx++}`;
        const slug = generateSlug(fullName);
        const href = `/historical/${slug}`;

        col.setAttribute("data-senator-id", senatorId);
        col.setAttribute("data-senator-name", fullName);
        col.setAttribute("data-senator-role", fullRole);
        const imgEl = col.querySelector("img") as HTMLImageElement | null;
        col.setAttribute("data-senator-img", imgEl?.src || "");

        if (existingLink) {
            existingLink.setAttribute("href", href);
            existingLink.removeAttribute("target");
            existingLink.className = "hover:text-cyan-300 transition-colors cursor-pointer";
            existingLink.setAttribute("title", fullName);
            existingLink.textContent = displayName;
        } else {
            const a = document.createElement("a");
            a.setAttribute("href", href);
            a.setAttribute("title", fullName);
            a.className = "hover:text-cyan-300 transition-colors cursor-pointer";
            a.textContent = displayName;
            titleEl.innerHTML = "";
            titleEl.appendChild(a);
        }

        if (isTruncated) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "senator-more-btn";
            btn.setAttribute("data-senator-trigger", senatorId);
            btn.textContent = "Voir plus";
            col.appendChild(btn);
        }
    });

    return container.innerHTML;
}

export function HistoryTabs({ tabs, contents, loading = false }: HistoryTabsProps) {
    const router = useRouter();

    // Premier onglet identique côté serveur ET au tout premier rendu client
    // (pas de branchement sur window/document dans le rendu lui-même).
    const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
    const [selectedSenator, setSelectedSenator] = useState<SenatorInfo | null>(null);
    // isClient ne devient vrai que dans un effect, donc après l'hydratation :
    // le rendu serveur et le tout premier rendu client restent identiques.
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    // Une fois monté, on aligne l'onglet actif sur le hash de l'URL si présent.
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (!hash || !tabs.some((t) => t.id === hash)) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(hash);
    }, [tabs]);

    useEffect(() => {
        const update = () => {
            const hash = window.location.hash.replace("#", "");
            if (!tabs.some((t) => t.id === hash)) return;
            setActiveTab(hash);
        };
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, [tabs]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`#${tabId}`, { scroll: false });
    };

    // Écoute les clics sur les boutons "Voir plus" injectés dans le HTML dangereux
    useEffect(() => {
        const handler = (e: Event) => {
            const target = (e.target as HTMLElement).closest("[data-senator-trigger]");
            if (!target) return;
            const card = target.closest("[data-senator-id]") as HTMLElement | null;
            if (!card) return;
            setSelectedSenator({
                name: card.getAttribute("data-senator-name") || "",
                role: card.getAttribute("data-senator-role") || "",
                imgSrc: card.getAttribute("data-senator-img") || "",
            });
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const activeConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0];
    const rawContent = contents[activeTab] ?? "";
    const activeContent = isClient ? addSenatorLinks(rawContent) : rawContent;

    const tailwindWPStyles = `
        text-gray-300 font-poppins leading-relaxed w-full

        [&_.row]:!flex [&_.row]:!flex-wrap [&_.row]:!justify-center [&_.row]:!items-stretch [&_.row]:!gap-12 [&_.row]:!w-full [&_.row]:!my-12

        [&_[class*="col-"]:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-12:not(:has(.rounded-circle)):not(:has(img))]:!w-full
        md:[&_.col-md-10:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(83.33%-1.5rem)]
        md:[&_.col-md-8:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(66.66%-1.5rem)]
        md:[&_.col-md-6:not(:has(.rounded-circle)):not(:has(img))]:!w-[calc(50%-1.5rem)]

        [&_[class*="col-"]:has(.rounded-circle)]:!w-[170px] 
        sm:[&_[class*="col-"]:has(.rounded-circle)]:!w-[210px]
        md:[&_[class*="col-"]:has(.rounded-circle)]:!w-[230px]

        [&_[class*="col-"]:has(.rounded-circle)]:!min-h-[220px]
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
        [&_[class*="col-"]:has(.rounded-circle)]:!relative
        
        [&_[class*="col-"]:has(.rounded-circle)]:!transition-transform
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!scale-105
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!bg-white/10
        hover:[&_[class*="col-"]:has(.rounded-circle)]:!z-10

        [&_.rounded-circle]:!rounded-full [&_.rounded-circle]:!w-16 [&_.rounded-circle]:!h-16 md:[&_.rounded-circle]:!w-24 md:[&_.rounded-circle]:!h-24 [&_.rounded-circle]:!object-cover
        [&_.rounded-circle]:!block [&_.rounded-circle]:!mx-auto [&_.rounded-circle]:!mb-4 [&_.rounded-circle]:!shrink-0 [&_.rounded-circle]:!shadow-lg [&_.rounded-circle]:!border-2 [&_.rounded-circle]:!border-white/20

        [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-sm md:[&_[class*="col-"]:has(.rounded-circle)_h3]:!text-[15px] [&_[class*="col-"]:has(.rounded-circle)_h3]:!font-bold [&_[class*="col-"]:has(.rounded-circle)_h3]:!mb-1 [&_[class*="col-"]:has(.rounded-circle)_h3]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h3]:!text-white [&_[class*="col-"]:has(.rounded-circle)_h3]:!leading-tight [&_[class*="col-"]:has(.rounded-circle)_h3]:!min-h-[2.5em] [&_[class*="col-"]:has(.rounded-circle)_h3]:!flex [&_[class*="col-"]:has(.rounded-circle)_h3]:!items-center [&_[class*="col-"]:has(.rounded-circle)_h3]:!justify-center [&_[class*="col-"]:has(.rounded-circle)_h3]:!w-full

        [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-xs md:[&_[class*="col-"]:has(.rounded-circle)_h4]:!text-sm [&_[class*="col-"]:has(.rounded-circle)_h4]:!text-cyan-400 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mb-2 [&_[class*="col-"]:has(.rounded-circle)_h4]:!mt-0 [&_[class*="col-"]:has(.rounded-circle)_h4]:!leading-tight [&_[class*="col-"]:has(.rounded-circle)_h4]:!min-h-[2.2em] [&_[class*="col-"]:has(.rounded-circle)_h4]:!flex [&_[class*="col-"]:has(.rounded-circle)_h4]:!items-center [&_[class*="col-"]:has(.rounded-circle)_h4]:!justify-center [&_[class*="col-"]:has(.rounded-circle)_h4]:!w-full

        [&_[class*="col-"]:has(.rounded-circle)_p]:!text-[10px] md:[&_[class*="col-"]:has(.rounded-circle)_p]:!text-[11px] [&_[class*="col-"]:has(.rounded-circle)_p]:!text-white/60 [&_[class*="col-"]:has(.rounded-circle)_p]:!mb-2 [&_[class*="col-"]:has(.rounded-circle)_p]:!line-clamp-3 [&_[class*="col-"]:has(.rounded-circle)_p]:!leading-tight

        [&_.senator-more-btn]:!mt-2 [&_.senator-more-btn]:!text-[10px] [&_.senator-more-btn]:!font-semibold [&_.senator-more-btn]:!text-cyan-300 [&_.senator-more-btn]:!bg-cyan-400/10 [&_.senator-more-btn]:!px-3 [&_.senator-more-btn]:!py-1 [&_.senator-more-btn]:!rounded-full [&_.senator-more-btn]:!border [&_.senator-more-btn]:!border-cyan-400/30 [&_.senator-more-btn]:hover:!bg-cyan-400/20 [&_.senator-more-btn]:!transition-colors [&_.senator-more-btn]:!cursor-pointer

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
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                ? "text-white shadow-lg scale-105"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
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
                            className="text-3xl font-bold tracking-tight"
                            style={{ color: activeConfig.color, fontFamily: "'Poppins', sans-serif" }}
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
                        style={{ fontFamily: "'Poppins', sans-serif", borderColor: activeConfig.color }}
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

            {/* Modal profil complet */}
            <AnimatePresence>
                {selectedSenator && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        onClick={() => setSelectedSenator(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0f1c1f] border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedSenator(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                aria-label="Fermer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {selectedSenator.imgSrc && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={selectedSenator.imgSrc}
                                    alt={selectedSenator.name}
                                    className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-2 border-white/20 shadow-lg"
                                />
                            )}

                            <h3
                                className="text-white text-xl font-bold text-center mb-2"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                {selectedSenator.name}
                            </h3>

                            {selectedSenator.role && (
                                <p className="text-cyan-400 text-sm text-center leading-relaxed">
                                    {selectedSenator.role}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}