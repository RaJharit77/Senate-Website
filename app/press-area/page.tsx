"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getAlaune, getActualite } from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Image from "next/image";
import { Calendar, Search } from "lucide-react";
import Link from "next/link";

interface ExtendedPost extends WpPost {
    isFeatured: boolean;
}

function ArticleCard({ post }: { post: ExtendedPost }) {
    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const date = new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl transition-shadow ${
                post.isFeatured ? "md:col-span-2" : ""
            }`}
        >
            {imageUrl && (
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {post.isFeatured && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            À la une
                        </span>
                    )}
                </div>
            )}
            <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar size={14} />
                    <span>{date}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {post.title.rendered}
                </h3>
                {post.excerpt?.rendered && (
                    <p
                        className="text-gray-300 text-sm line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                )}
                <Link
                    href={`/press-area/news/${post.slug}`}
                    className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition"
                >
                    Lire la suite →
                </Link>
            </div>
        </motion.div>
    );
}

export default function PressPage() {
    const [allPosts, setAllPosts] = useState<ExtendedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            try {
                const [alaune, actualite] = await Promise.all([
                    getAlaune({ per_page: 100 }),
                    getActualite({ per_page: 100 }),
                ]);
                const featuredIds = new Set(alaune.map(p => p.id));
                const combined: ExtendedPost[] = [...alaune, ...actualite].map(post => ({
                    ...post,
                    isFeatured: featuredIds.has(post.id)
                }));
                combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAllPosts(combined);
            } catch (error) {
                console.error("Erreur chargement des articles:", error);
                setAllPosts([]);
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    // Filtrage par recherche
    const filteredPosts = useMemo(() => {
        if (!searchTerm.trim()) return allPosts;
        const term = searchTerm.trim().toLowerCase();
        return allPosts.filter(
            (post) =>
                post.title.rendered.toLowerCase().includes(term) ||
                post.excerpt?.rendered?.toLowerCase().includes(term) ||
                post.content.rendered.toLowerCase().includes(term)
        );
    }, [allPosts, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / perPage);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // reset page on new search
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-white text-4xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Espace Presse
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Retrouvez tous les communiqués et actualités officielles du Sénat.
                    </p>
                </div>

                {/* Barre de recherche */}
                <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher dans toutes les actualités..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition flex items-center gap-2"
                    >
                        <Search size={18} />
                        Rechercher
                    </button>
                </form>

                {/* Liste des articles */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <p className="text-gray-400">Aucun article ne correspond à votre recherche.</p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPosts.map((post) => (
                                <ArticleCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-10">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
                                >
                                    Précédent
                                </button>
                                <span className="text-white text-sm">
                                    Page {currentPage} sur {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
                                >
                                    Suivant
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}