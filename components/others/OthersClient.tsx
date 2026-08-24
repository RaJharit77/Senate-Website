"use client";

import { useState, useEffect, useMemo } from "react";
import { getPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Calendar, Search, Download, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { WpPost } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryType } from "@/types/categoryType";
import { cleanText, getYouTubeThumbnail } from "@/utils/utility";
import { MdArrowRightAlt } from "react-icons/md";
import { CAT_DIVERS, CAT_PUBLICATION, CAT_VIDEO, perPage } from "@/constants/constants";

export default function OthersClient() {
    const [allPosts, setAllPosts] = useState<WpPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<CategoryType>("tous");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const posts = await getPosts({ per_page: 100, _embed: true });
                const postsMap = new Map<number, WpPost>();
                posts.forEach((post) => {
                    if (!postsMap.has(post.id)) {
                        postsMap.set(post.id, post);
                    }
                });
                const uniquePosts = Array.from(postsMap.values());
                uniquePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAllPosts(uniquePosts);
            } catch (error) {
                console.error("Erreur chargement des articles:", error);
                setAllPosts([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredByCategory = useMemo(() => {
        if (filter === "tous") return allPosts;

        // Filtre "Autres" : tous les posts qui ne sont ni vidéo, ni divers, ni publication
        if (filter === "autres") {
            return allPosts.filter(
                (post) =>
                    !post.categories?.includes(CAT_VIDEO) &&
                    !post.categories?.includes(CAT_DIVERS) &&
                    !post.categories?.includes(CAT_PUBLICATION)
            );
        }

        // Filtres spécifiques par catégorie
        const categoryIdMap: Record<Exclude<CategoryType, "tous" | "autres">, number> = {
            video: CAT_VIDEO,
            divers: CAT_DIVERS,
            publication: CAT_PUBLICATION,
        };
        const targetId = categoryIdMap[filter as Exclude<CategoryType, "tous" | "autres">];
        return allPosts.filter((post) => post.categories?.includes(targetId));
    }, [allPosts, filter]);

    const filteredBySearch = useMemo(() => {
        if (!searchTerm.trim()) return filteredByCategory;
        const term = searchTerm.trim().toLowerCase();
        return filteredByCategory.filter(
            (post) =>
                cleanText(post.title.rendered).toLowerCase().includes(term) ||
                cleanText(post.excerpt?.rendered || "").toLowerCase().includes(term) ||
                cleanText(post.content.rendered).toLowerCase().includes(term)
        );
    }, [filteredByCategory, searchTerm]);

    const totalPages = Math.ceil(filteredBySearch.length / perPage);
    const paginatedPosts = useMemo(() => {
        return filteredBySearch.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );
    }, [filteredBySearch, currentPage]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                        Autres activités
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Découvrez les vidéos, les actualités diverses, les publications et les autres activités du Sénat.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex gap-2">
                        {(["tous", "video", "divers", "autres", "publication"] as const).map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter(cat)}
                                className={
                                    filter === cat
                                        ? "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30"
                                        : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20 hover:text-white"
                                }
                            >
                                {cat === "tous" ? "Tous" : cat === "video" ? "Vidéos" : cat === "divers" ? "Divers" : cat === "autres" ? "Autres" : "Publications"}
                            </Button>
                        ))}
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-3 ml-auto">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-56 bg-white/5 border-white/10 text-white placeholder:text-gray-300 focus:ring-cyan-400/50"
                        />
                        <Button type="submit" variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30">
                            <Search className="w-4 h-4 mr-2" />
                            Rechercher
                        </Button>
                    </form>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="bg-white/10 border-white/10">
                                <Skeleton className="w-full aspect-video" />
                                <CardContent className="p-5">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3 mt-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : paginatedPosts.length === 0 ? (
                    <p className="text-gray-400">Aucune activité ne correspond à vos critères.</p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPosts.map((post) => {
                                const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
                                const youtubeThumb = getYouTubeThumbnail(post.content.rendered);
                                const imageUrl = featuredImage || youtubeThumb || null;

                                const date = new Date(post.date).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                                const cleanTitle = cleanText(post.title.rendered);

                                let category = "Autre";
                                if (post.categories?.includes(CAT_VIDEO)) category = "Vidéo";
                                else if (post.categories?.includes(CAT_DIVERS)) category = "Divers";
                                else if (post.categories?.includes(CAT_PUBLICATION)) category = "Publication";

                                const downloadLink = (post.acf as Record<string, unknown>)?.file || (post.acf as Record<string, unknown>)?.download_link || null;
                                const isVideo = category === "Vidéo";

                                return (
                                    <Card
                                        key={post.id}
                                        className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
                                    >
                                        {imageUrl ? (
                                            <div className="relative w-full aspect-video overflow-hidden">
                                                <Image
                                                    src={imageUrl}
                                                    alt={cleanTitle}
                                                    fill
                                                    priority
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    loading="eager"
                                                />
                                                {isVideo && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full aspect-video bg-white/5 flex items-center justify-center">
                                                <span className="text-gray-500 text-sm">Image non disponible</span>
                                            </div>
                                        )}
                                        <CardContent className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                                <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-none">
                                                    {category}
                                                </Badge>
                                                <Calendar className="w-4 h-4" />
                                                <span>{date}</span>
                                            </div>
                                            <h3 className="text-white text-xl font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {cleanTitle}
                                            </h3>
                                            {post.excerpt?.rendered && (
                                                <p
                                                    className="text-gray-300 text-sm line-clamp-3 flex-1"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanText(post.excerpt.rendered),
                                                    }}
                                                />
                                            )}
                                            <div className="flex items-center gap-3 mt-4">
                                                <Link
                                                    href={`/others/${post.slug}`}
                                                    className="inline-block text-cyan-300 hover:text-cyan-200 text-sm font-medium transition"
                                                >
                                                    Lire la suite <MdArrowRightAlt className="inline-block" />
                                                </Link>
                                                {downloadLink && (
                                                    <Link
                                                        href={downloadLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200 transition"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Télécharger
                                                    </Link>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {totalPages > 1 && (
                            <Pagination className="mt-10">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                            }
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() => handlePageChange(page)}
                                                className={`cursor-pointer ${page === currentPage
                                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border-transparent hover:bg-cyan-600"
                                                    : "text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                                    }`}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}