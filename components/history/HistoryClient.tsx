"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {getHistoryIntro} from "@/lib/api";
import { RED, WHITE, EMERALD } from "@/utils/colors";
import { HistoryTabs } from "@/components/history/HistoryTabs";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { TABS } from "@/utils/data/historical";
import { cleanText } from "@/utils/utility";
import { ContentMap} from "@/types/historyType";
import { buildContentMap, EMPTY_CONTENT, REPUBLIC_FETCHERS, REPUBLIC_IDS } from "@/utils/history";

export default function HistoricalClient() {
    const [contents, setContents] = useState<ContentMap>(EMPTY_CONTENT);
    const [loading, setLoading] = useState(true);
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroIntro, setHeroIntro] = useState<string>("");

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                const [results, intro] = await Promise.all([
                    Promise.allSettled(
                        REPUBLIC_IDS.map((id) => REPUBLIC_FETCHERS[id]())
                    ),
                    getHistoryIntro(),
                ]);

                if (cancelled) return;

                setContents(buildContentMap(REPUBLIC_IDS, results));

                if (intro) {
                    setHeroImage(intro.image);
                    setHeroIntro(cleanText(intro.intro));
                }
            } catch (error) {
                console.error("[HistoryPage] Erreur chargement:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => {
            cancelled = true;
        };
    }, []);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Histoire du Sénat", url: `${SITE_URL}/historical` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Histoire du Sénat de Madagascar",
        description:
            "Présentation chronologique des républiques et du Sénat à travers l'histoire de Madagascar.",
        url: `${SITE_URL}/historical`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins text-white text-4xl font-bold">
                            Histoire du Sénat de Madagascar
                        </h1>
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12 overflow-hidden">
                        {heroImage && (
                            <div className="absolute inset-0 opacity-20">
                                <Image
                                    src={heroImage}
                                    alt="Senate Structures"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                    quality={30}
                                />
                            </div>
                        )}

                        <div className="relative z-10">
                            <h2 className="font-poppins text-white text-2xl font-bold text-center mb-6">
                                Le Sénat à travers les Républiques
                            </h2>

                            {heroImage && (
                                <div className="flex justify-center">
                                    <div
                                        className="relative w-full max-w-4xl aspect-4/3 rounded-xl shadow-2xl overflow-hidden"
                                        style={{ minHeight: 300 }}
                                    >
                                        <Image
                                            src={heroImage}
                                            alt="Le Sénat de Madagascar à travers les Républiques"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 896px"
                                            quality={90}
                                            priority
                                        />
                                    </div>
                                </div>
                            )}

                            {heroIntro && (
                                <p className="font-poppins text-gray-300 text-lg text-center max-w-3xl mx-auto mt-6 leading-relaxed">
                                    {heroIntro}
                                </p>
                            )}

                            <div className="flex justify-center mt-8">
                                <Link
                                    href="/historical/history"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors shadow-lg hover:shadow-cyan-500/30"
                                >
                                    Découvrir l&apos;histoire complète
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <HistoryTabs tabs={TABS} contents={contents} loading={loading} />
                </div>
            </div>
        </>
    );
}