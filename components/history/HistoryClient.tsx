"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    getRepubliqueI,
    getRepubliqueII,
    getRepubliqueIII,
    getRepubliqueIV,
} from "@/lib/api";
import type { WpPost } from "@/lib/wp-types";
import { splitTransitionBlock, stripLeadingH2 } from "@/lib/sanitizeWpContent";
import { RED, WHITE, EMERALD } from "@/utils/colors";
import { HistoryTabs } from "@/components/history/HistoryTabs";
import { TabId } from "@/types/tabId";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { TABS } from "@/utils/data/historical";

type RepublicId = Exclude<TabId, "transition">;
type ContentMap = Record<TabId, string>;

// Les fonctions d'API utilisent la numérotation romaine (I, II, III, IV),
// les clés internes des ordinaux anglais : cette table fait le lien.
const REPUBLIC_IDS: RepublicId[] = ["first", "second", "third", "fourth"];

const REPUBLIC_FETCHERS: Record<RepublicId, () => Promise<WpPost[]>> = {
    first: getRepubliqueI,
    second: getRepubliqueII,
    third: getRepubliqueIII,
    fourth: getRepubliqueIV,
};

const HERO_IMAGE = "https://senat.mg/wp-content/uploads/2023/05/le-senat-1.jpg";

const EMPTY_CONTENT: ContentMap = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    transition: "",
};

/**
 * Construit la ContentMap à partir des résultats de Promise.allSettled :
 * range le contenu de chaque république, et regroupe tous les blocs de
 * transition trouvés dans un seul onglet "transition".
 */
function buildContentMap(
    ids: RepublicId[],
    results: PromiseSettledResult<WpPost[]>[]
): ContentMap {
    const next: ContentMap = { ...EMPTY_CONTENT };
    const transitionParts: string[] = [];

    results.forEach((result, index) => {
        const id = ids[index];
        if (result.status === "fulfilled" && result.value[0]) {
            const rawHtml = result.value[0].content.rendered;
            const { before, transition } = splitTransitionBlock(rawHtml);
            if (transition) transitionParts.push(transition);
            next[id] = stripLeadingH2(before);
        } else if (result.status === "rejected") {
            console.error(`[HistoryPage] Erreur chargement ${id}:`, result.reason);
        }
    });

    next.transition = transitionParts
        .map((block) => stripLeadingH2(block))
        .join('<hr class="history-hr" />');

    return next;
}

export default function HistoricalClient() {
    const [contents, setContents] = useState<ContentMap>(EMPTY_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                const results = await Promise.allSettled(
                    REPUBLIC_IDS.map((id) => REPUBLIC_FETCHERS[id]())
                );
                if (!cancelled) setContents(buildContentMap(REPUBLIC_IDS, results));
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
        description: "Présentation chronologique des républiques et du Sénat à travers l'histoire de Madagascar.",
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
                        <div className="absolute inset-0 opacity-20">
                            <Image
                                src={HERO_IMAGE}
                                alt="Senate Structures"
                                fill
                                priority
                                className="object-cover"
                                sizes="100vw"
                                quality={30}
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="font-poppins text-white text-2xl font-bold text-center mb-6">
                                Le Sénat à travers les Républiques
                            </h2>

                            <div className="flex justify-center">
                                <div
                                    className="relative w-full max-w-4xl aspect-4/3 rounded-xl shadow-2xl overflow-hidden"
                                    style={{ minHeight: 300 }}
                                >
                                    <Image
                                        src={HERO_IMAGE}
                                        alt="Le Sénat de Madagascar à travers les Républiques"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 896px"
                                        quality={90}
                                        priority
                                    />
                                </div>
                            </div>

                            <p className="font-poppins text-gray-300 text-lg text-center max-w-3xl mx-auto mt-6 leading-relaxed">
                                Le Sénat a été mis en place au lendemain de la naissance de la République
                                Malagasy, le 14 octobre 1958 ; plus précisément après l&apos;adoption de
                                la Constitution du 29 avril 1959. Cependant, il a été mis en veilleuse
                                pendant près de 30 ans pour ne réapparaître qu&apos;en mai 2001. Formant
                                le Parlement avec l&apos;Assemblée Nationale, le Sénat est actuellement
                                dans la deuxième législature de la Quatrième République.
                            </p>

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