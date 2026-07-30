"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getAlaune, getActualite } from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Search } from "lucide-react";
import { extractFirstImageFromContent } from "@/lib/extractImage";
import ArticleCard from "@/components/press-area/ArticleCard";
import { ArticleSkeleton } from "@/components/press-area/ArticleSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ExtendedPost extends WpPost {
    isFeatured: boolean;
    imageUrl: string | null;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

export default function PressClient() {
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

    const renderSkeletons = () => {
        return Array.from({ length: perPage }).map((_, i) => <ArticleSkeleton key={i} />);
    };

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
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
                </motion.div>

                {/* Barre de recherche */}
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md"
                >
                    <Input
                        type="text"
                        placeholder="Rechercher dans toutes les actualités..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-300 focus-visible:ring-cyan-400/50"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition flex items-center gap-2">
                        <Search size={18} />
                        Rechercher
                    </Button>
                </motion.form>

                {/* Section À la une */}
                <section className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl font-bold mb-6 flex items-center gap-3"
                        style={{ color: EMERALD, fontFamily: "'Poppins', sans-serif" }}
                    >
                        <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full" />
                        À la une
                    </motion.h2>
                    {loadingFeatured ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderSkeletons()}
                        </div>
                    ) : paginatedFeatured.length === 0 ? (
                        <p className="text-gray-400">Aucun article à la une.</p>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {paginatedFeatured.map((post) => (
                                <ArticleCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    )}
                </section>

                {/* Section Toutes les actualités */}
                <section className="mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
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
                    </motion.h2>

                    {loadingRegular ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderSkeletons()}
                        </div>
                    ) : paginatedRegular.length === 0 ? (
                        <p className="text-gray-400">Aucune actualité.</p>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {paginatedRegular.map((post) => (
                                <ArticleCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    )}
                </section>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex justify-center items-center gap-2 mt-8 flex-wrap"
                    >
                        <Button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="border-white/10 bg-transparent text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:text-cyan-300"
                        >
                            Précédent
                        </Button>

                        {getPageNumbers().map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => goToPage(page)}
                                variant={page === currentPage ? "default" : "outline"}
                                className={page === currentPage
                                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                                    : 'border-white/10 bg-transparent text-gray-300 hover:bg-white/10 hover:text-cyan-300'
                                }
                                disabled={page === '...'}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="border-white/10 bg-transparent text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:text-cyan-300"
                        >
                            Suivant
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}