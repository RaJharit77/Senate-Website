"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getAlaune, getActualite } from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Image from "next/image";
import { Calendar, Search, ImageIcon } from "lucide-react";
import Link from "next/link";
import { extractFirstImageFromContent } from "@/lib/extractImage";
import { MdArrowRightAlt } from "react-icons/md";

interface ExtendedPost extends WpPost {
    isFeatured: boolean;
    imageUrl: string | null;
}

function ArticleCard({ post }: { post: ExtendedPost }) {
    const { imageUrl, isFeatured } = post;
    const date = new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const cleanTitle = post.title.rendered.replace(/&rsquo;/g, "'").replace(/&nbsp;/g, " ");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
        >
            <div className="relative w-full aspect-video overflow-hidden bg-white/5">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={cleanTitle}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <ImageIcon size={48} strokeWidth={1} />
                    </div>
                )}
                {isFeatured && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
                        À la une
                    </span>
                )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar size={14} />
                    <span>{date}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {cleanTitle}
                </h3>
                {post.excerpt?.rendered && (
                    <p
                        className="text-gray-300 text-sm line-clamp-3 flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                )}
                <Link
                    href={`/press-area/news/${post.slug}`}
                    className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition self-start"
                >
                    Lire la suite <MdArrowRightAlt className="inline-block" />
                </Link>
            </div>
        </motion.div>
    );
}

export default function PressPage() {
    const [featuredPosts, setFeaturedPosts] = useState<ExtendedPost[]>([]);
    const [regularPosts, setRegularPosts] = useState<ExtendedPost[]>([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [loadingRegular, setLoadingRegular] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    const enrichWithImage = (post: WpPost, isFeatured: boolean): ExtendedPost => {
        let imageUrl: string | null = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

        if (!imageUrl) {
            const fromContent = extractFirstImageFromContent(post.content?.rendered);
            if (fromContent) imageUrl = fromContent;
            else {
                const fromExcerpt = extractFirstImageFromContent(post.excerpt?.rendered);
                if (fromExcerpt) imageUrl = fromExcerpt;
            }
        }

        return { ...post, isFeatured, imageUrl };
    };

    useEffect(() => {
        const loadData = async () => {
            setLoadingFeatured(true);
            setLoadingRegular(true);
            try {
                const [alaune, actualite] = await Promise.all([
                    getAlaune({ per_page: 100 }),
                    getActualite({ per_page: 100 }),
                ]);

                const featuredIds = new Set(alaune.map(p => p.id));

                const featured = alaune.map(post => enrichWithImage(post, true));
                featured.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setFeaturedPosts(featured);

                const regular = actualite
                    .filter(post => !featuredIds.has(post.id))
                    .map(post => enrichWithImage(post, false));
                regular.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setRegularPosts(regular);
            } catch (error) {
                console.error("Erreur chargement des articles:", error);
            } finally {
                setLoadingFeatured(false);
                setLoadingRegular(false);
            }
        };
        loadData();
    }, []);

    const filteredFeatured = useMemo(() => {
        if (!searchTerm.trim()) return featuredPosts;
        const term = searchTerm.trim().toLowerCase();
        return featuredPosts.filter(
            (post) =>
                post.title.rendered.toLowerCase().includes(term) ||
                post.excerpt?.rendered?.toLowerCase().includes(term) ||
                post.content.rendered.toLowerCase().includes(term)
        );
    }, [featuredPosts, searchTerm]);

    const filteredRegular = useMemo(() => {
        if (!searchTerm.trim()) return regularPosts;
        const term = searchTerm.trim().toLowerCase();
        return regularPosts.filter(
            (post) =>
                post.title.rendered.toLowerCase().includes(term) ||
                post.excerpt?.rendered?.toLowerCase().includes(term) ||
                post.content.rendered.toLowerCase().includes(term)
        );
    }, [regularPosts, searchTerm]);

    const featuredTotalPages = Math.ceil(filteredFeatured.length / perPage);
    const regularTotalPages = Math.ceil(filteredRegular.length / perPage);
    const totalPages = Math.max(featuredTotalPages, regularTotalPages);

    const paginatedFeatured = filteredFeatured.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const paginatedRegular = filteredRegular.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const getPageNumbers = (): Array<number | string> => {
        const delta = 3;
        const range: number[] = [];
        const rangeWithDots: Array<number | string> = [];
        let l: number | undefined;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l !== undefined) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const goToPage = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
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
                    <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Espace de Presse
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Retrouvez tous les communiqués et actualités officielles du Sénat.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
                    <input
                        type="text"
                        placeholder="Rechercher dans toutes les actualités..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition flex items-center gap-2"
                    >
                        <Search size={18} />
                        Rechercher
                    </button>
                </form>

                {/* Section À la une */}
                <section className="mb-16">
                    <h2
                        className="text-2xl font-bold mb-6 flex items-center gap-3"
                        style={{ color: EMERALD, fontFamily: "'Poppins', sans-serif" }}
                    >
                        <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full" />
                        À la une
                    </h2>
                    {loadingFeatured ? (
                        <div className="flex justify-center py-12">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                        </div>
                    ) : paginatedFeatured.length === 0 ? (
                        <p className="text-gray-400">Aucun article à la une.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedFeatured.map((post) => (
                                <ArticleCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-12">
                    <h2
                        className="text-2xl font-bold mb-6 flex items-center gap-3"
                        style={{ color: EMERALD, fontFamily: "'Poppins', sans-serif" }}
                    >
                        <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full" />
                        Toutes les actualités
                        {!loadingRegular && (
                            <span className="text-sm font-normal text-gray-400 ml-2">
                                ({filteredRegular.length} article{filteredRegular.length > 1 ? 's' : ''})
                            </span>
                        )}
                    </h2>

                    {loadingRegular ? (
                        <div className="flex justify-center py-12">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                        </div>
                    ) : paginatedRegular.length === 0 ? (
                        <p className="text-gray-400">Aucune actualité.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedRegular.map((post) => (
                                <ArticleCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </section>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
                        >
                            Précédent
                        </button>

                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(page)}
                                className={`px-4 py-2 rounded-xl transition ${page === currentPage
                                    ? 'bg-cyan-500 text-white'
                                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                    } ${page === '...' ? 'cursor-default' : ''}`}
                                disabled={page === '...'}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}