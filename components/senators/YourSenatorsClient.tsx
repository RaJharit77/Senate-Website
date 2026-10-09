"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SenatorCard from "./SenatorCard";
import CommissionAccordion from "./CommissionAccordion";
import ProvinceMap from "./ProvinceMap";
import { Props, TABS } from "@/types/senatorsType";
import { isPresident } from "@/lib/wp-senators";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export default function YourSenatorsClient({
    introHtml,
    senateurs,
    bureau,
    commissions,
    provinces,
}: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selected = useMemo(
        () => senateurs.find((s) => s.id === selectedId) ?? senateurs[0] ?? null,
        [senateurs, selectedId]
    );

    const [bureauSelectedId, setBureauSelectedId] = useState<string | null>(null);
    const selectedInBureau = useMemo(() => {
        const found = bureau.find((b) => b.id === bureauSelectedId);
        if (found) return found;

        return selected && bureau.some((b) => b.id === selected.id)
            ? selected
            : bureau[0] ?? null;
    }, [bureau, bureauSelectedId, selected]);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Vos Sénateurs", url: `${SITE_URL}/your-senators` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Vos Sénateurs — Sénat de Madagascar",
        description:
            "Liste officielle des Sénateurs de Madagascar, du Bureau permanent, des commissions et de la répartition par province.",
        url: `${SITE_URL}/your-senators`,
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", name: "Sénat de Madagascar", url: SITE_URL },
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div>
                {introHtml && (
                    <div
                        className="prose prose-invert max-w-none mb-10 text-white/80"
                        dangerouslySetInnerHTML={{ __html: introHtml }}
                    />
                )}

                <Tabs defaultValue="tab1" className="w-full">
                    <div className="mb-6">
                        <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 border-b border-white/10 w-full justify-start h-auto rounded-none">
                            {TABS.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="px-5 py-3 text-sm font-medium rounded-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 text-white/50 hover:text-white/80 transition-colors"
                                    style={{ borderColor: "transparent" }}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value="tab1" className="mt-0">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-poppins">
                                    Liste alphabétique des Sénateurs de Madagascar
                                </p>
                                <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 scrollbar-custom">
                                    {senateurs.map((s) => {
                                        const isSel = selected?.id === s.id;
                                        const pres = isPresident(s);
                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => setSelectedId(s.id)}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors font-poppins flex items-center gap-2 ${isSel
                                                    ? "bg-red-500/20 text-red-300 border border-red-400/30"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                                                    }`}
                                            >
                                                {pres && (
                                                    <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                                )}
                                                <span className="truncate">
                                                    {s.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                    {senateurs.length === 0 && (
                                        <p className="text-white/40 italic">
                                            Aucun sénateur disponible.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <AnimatePresence mode="wait">
                                    {selected && (
                                        <motion.div
                                            key={selected.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <SenatorCard senator={selected} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="tab2" className="mt-0">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-poppins">
                                    Les membres du Bureau Permanent
                                </p>
                                <div className="space-y-1">
                                    {bureau.map((s) => {
                                        const isSel = selectedInBureau?.id === s.id;
                                        const pres = isPresident(s);
                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => setBureauSelectedId(s.id)}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors font-poppins flex items-center gap-2 ${isSel
                                                    ? "bg-red-500/20 text-red-300 border border-red-400/30"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                                                    }`}
                                            >
                                                {pres && (
                                                    <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                                )}
                                                <span className="truncate">
                                                    {s.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                    {bureau.length === 0 && (
                                        <p className="text-white/40 italic">
                                            Aucun membre du bureau trouvé.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <AnimatePresence mode="wait">
                                    {selectedInBureau && (
                                        <motion.div
                                            key={selectedInBureau.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <SenatorCard senator={selectedInBureau} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="tab3" className="mt-0">
                        <CommissionAccordion commissions={commissions} />
                    </TabsContent>

                    <TabsContent value="tab5" className="mt-0">
                        <ProvinceMap provinces={provinces} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}