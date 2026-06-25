"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { search } from "@/lib/api";
import Link from "next/link";

interface SearchResult {
    id: number;
    title: string;
    url: string;
    type: string;
    subtype: string;
    excerpt: string;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        let startLoadingTimer: ReturnType<typeof setTimeout> | null = null;
        let resetTimer: ReturnType<typeof setTimeout> | null = null;

        if (query.trim()) {
            startLoadingTimer = setTimeout(() => {
                if (active) {
                    setLoading(true);
                }
            }, 0);

            search(query)
                .then((data: unknown) => {
                    if (!active) return;
                    const items = Array.isArray(data) ? data : [];
                    setResults(items as SearchResult[]);
                })
                .catch(() => {
                    if (!active) return;
                    setResults([]);
                })
                .finally(() => {
                    if (!active) return;
                    setLoading(false);
                });
        } else {
            resetTimer = setTimeout(() => {
                if (!active) return;
                setResults([]);
                setLoading(false);
            }, 0);
        }

        return () => {
            active = false;
            if (startLoadingTimer) {
                clearTimeout(startLoadingTimer);
            }
            if (resetTimer) {
                clearTimeout(resetTimer);
            }
        };
    }, [query]);

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-4">Résultats de recherche</h1>
                <p className="text-gray-300 text-lg">
                    Vous avez recherché : <span className="text-cyan-400 font-semibold">&quot;{query}&quot;</span>
                </p>

                {loading ? (
                    <p className="text-gray-400 mt-8">Recherche en cours...</p>
                ) : (
                    <div className="mt-8 space-y-4">
                        {results.length === 0 ? (
                            <p className="text-gray-400">Aucun résultat trouvé.</p>
                        ) : (
                            results.map((item) => (
                                <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                    <Link href={item.url} className="text-cyan-400 text-xl font-semibold hover:underline">
                                        {item.title || "Sans titre"}
                                    </Link>
                                    {item.excerpt && (
                                        <p className="text-white/60 text-sm mt-1">{item.excerpt}</p>
                                    )}
                                    <p className="text-white/40 text-xs mt-2">
                                        {item.subtype || item.type || "Article"}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}