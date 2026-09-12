"use client";

import { useState, useEffect, useMemo } from "react";
import {
    getPosts,
    getAlaune,
    getActualite,
    getPresidentActivities,
    getPostsByCategorySlug,
} from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Calendar, Search, Download, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { WpPost } from "@/lib/wp-types";
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
import {
    CAT_DIVERS,
    CAT_PUBLICATION,
    CAT_VIDEO,
    perPage,
} from "@/constants/constants";

// Slugs des catégories pour les activités des Sénateurs
const SENATOR_CATEGORY_SLUGS = [
    "audience_sen",
    "deplacement_sen",
    "delegation_sen",
];

export default function OthersClient() {
    const [allPosts, setAllPosts] = useState<WpPost[]>([]);
    const [galleryPosts, setGalleryPosts] = useState<WpPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<CategoryType>("tous");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // 1. Posts standards (exclure les vidéos)
                const posts = await getPosts({ per_page: 100, _embed: true });
                const postsMap = new Map<number, WpPost>();
                posts.forEach((post) => {
                    if (
                        !postsMap.has(post.id) &&
                        !post.categories?.includes(CAT_VIDEO)
                    ) {
                        postsMap.set(post.id, post);
                    }
                });
                const uniquePosts = Array.from(postsMap.values());
                uniquePosts.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setAllPosts(uniquePosts);

                // 2. Récupération des autres sources pour la galerie (exclure les vidéos)
                const [alaune, actualite, presidentActivities, senatorResults] =
                    await Promise.all([
                        getAlaune({ per_page: 100, _embed: true }).catch(() => []),
                        getActualite({ per_page: 100, _embed: true }).catch(() => []),
                        getPresidentActivities().catch(() => []),
                        Promise.all(
                            SENATOR_CATEGORY_SLUGS.map((slug) =>
                                getPostsByCategorySlug(slug, {
                                    per_page: 100,
                                    _embed: true,
                                }).catch(() => [])
                            )
                        ),
                    ]);

                // Extraire les posts des activités du Président
                const presidentPosts = presidentActivities.map((act) => act.post);

                // Extraire les posts des activités des Sénateurs (aplatir le tableau)
                const senatorPosts = senatorResults.flat();

                // Fusionner toutes les sources (exclure les vidéos)
                const allGallerySources = [
                    ...uniquePosts,
                    ...alaune.filter((p) => !p.categories?.includes(CAT_VIDEO)),
                    ...actualite.filter((p) => !p.categories?.includes(CAT_VIDEO)),
                    ...presidentPosts.filter((p) => !p.categories?.includes(CAT_VIDEO)),
                    ...senatorPosts.filter((p) => !p.categories?.includes(CAT_VIDEO)),
                ];

                // Dédoublonner par id et garder uniquement ceux qui ont une image mise en avant
                const galleryMap = new Map<number, WpPost>();
                allGallerySources.forEach((post) => {
                    if (
                        !galleryMap.has(post.id) &&
                        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                    ) {
                        galleryMap.set(post.id, post);
                    }
                });

                const sortedGallery = Array.from(galleryMap.values()).sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setGalleryPosts(sortedGallery);
            } catch (error) {
                console.error("Erreur chargement des articles:", error);
                setAllPosts([]);
                setGalleryPosts([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filtrer par catégorie pour les posts standards
    const filteredByCategory = useMemo(() => {
        if (filter === "tous") return allPosts;

        if (filter === "autres") {
            // Exclure les articles avec image, les vidéos déjà exclues, et les catégories Divers/Publication
            return allPosts.filter(
                (post) =>
                    !post.categories?.includes(CAT_DIVERS) &&
                    !post.categories?.includes(CAT_PUBLICATION) &&
                    !post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
            );
        }

        if (filter === "galeries") {
            return galleryPosts;
        }

        const categoryIdMap: Record<
            Exclude<CategoryType, "tous" | "autres" | "galeries">,
            number
        > = {
            divers: CAT_DIVERS,
            publication: CAT_PUBLICATION,
        };
        const targetId =
            categoryIdMap[filter as Exclude<CategoryType, "tous" | "autres" | "galeries">];
        return allPosts.filter((post) => post.categories?.includes(targetId));
    }, [allPosts, galleryPosts, filter]);

    // Recherche textuelle
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

    // Fonction pour déterminer le label du badge
    const getCategoryLabel = (post: WpPost): string => {
        if (post.categories?.includes(CAT_DIVERS)) return "Divers";
        if (post.categories?.includes(CAT_PUBLICATION)) return "Publication";
        if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) return "Galerie";
        return "Autre";
    };

    // Fonction pour générer les numéros de page avec ellipsis (max 7 affichés)
    const getPaginationItems = (current: number, total: number) => {
        const items: (number | string)[] = [];
        if (total <= 7) {
            for (let i = 1; i <= total; i++) items.push(i);
            return items;
        }
        // Toujours afficher la première page
        items.push(1);
        // Calculer la plage autour de la page courante
        let start = Math.max(2, current - 2);
        let end = Math.min(total - 1, current + 2);
        // Ajuster pour avoir au moins 5 pages affichées (hors 1 et total)
        if (end - start < 4) {
            if (start === 2) end = Math.min(total - 1, start + 4);
            else if (end === total - 1) start = Math.max(2, end - 4);
        }
        if (start > 2) items.push("...");
        for (let i = start; i <= end; i++) items.push(i);
        if (end < total - 1) items.push("...");
        // Toujours afficher la dernière page
        if (total > 1) items.push(total);
        return items;
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
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Autres activités
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Découvrez les actualités diverses, les publications, les galeries
                        photos et les autres activités du Sénat.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex gap-2">
                        {(
                            [
                                "tous",
                                "divers",
                                "publication",
                                "galeries",
                                "autres",
                            ] as const
                        ).map((cat) => (
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
                                {cat === "tous"
                                    ? "Tous"
                                    : cat === "divers"
                                        ? "Divers"
                                        : cat === "publication"
                                            ? "Publications"
                                            : cat === "galeries"
                                                ? "Galeries"
                                                : "Autres"}
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
                        <Button
                            type="submit"
                            variant="default"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                        >
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
                                const featuredImage =
                                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
                                const youtubeThumb = getYouTubeThumbnail(
                                    post.content.rendered
                                );
                                const imageUrl = featuredImage || youtubeThumb || null;
                                const date = new Date(post.date).toLocaleDateString(
                                    "fr-FR",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                );
                                const cleanTitle = cleanText(post.title.rendered);

                                const categoryLabel = getCategoryLabel(post);
                                const isVideo = categoryLabel === "Vidéo"; // ne sera jamais vrai ici

                                const downloadLink =
                                    (post.acf as Record<string, unknown>)?.file ||
                                    (post.acf as Record<string, unknown>)?.download_link ||
                                    null;

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
                                                <span className="text-gray-500 text-sm">
                                                    Image non disponible
                                                </span>
                                            </div>
                                        )}
                                        <CardContent className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-cyan-500/20 text-cyan-300 border-none"
                                                >
                                                    {categoryLabel}
                                                </Badge>
                                                <Calendar className="w-4 h-4" />
                                                <span>{date}</span>
                                            </div>
                                            <h3
                                                className="text-white text-xl font-bold mb-2 line-clamp-2"
                                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                            >
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
                                                    Lire la suite{" "}
                                                    <MdArrowRightAlt className="inline-block" />
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
                                            text="Précédent"
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400 bg-transparent"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                                            }
                                        />
                                    </PaginationItem>

                                    {getPaginationItems(currentPage, totalPages).map((item, index) =>
                                        item === "..." ? (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <span className="px-2 text-white/40">…</span>
                                            </PaginationItem>
                                        ) : (
                                            <PaginationItem key={item}>
                                                <PaginationLink
                                                    isActive={item === currentPage}
                                                    onClick={() => handlePageChange(item as number)}
                                                    className={`cursor-pointer ${item === currentPage
                                                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border-transparent hover:bg-cyan-600"
                                                            : "text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20"
                                                        }`}
                                                >
                                                    {item}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            text="Suivant"
                                            className={
                                                currentPage === totalPages
                                                    ? "pointer-events-none opacity-50 text-gray-400 border-gray-400 bg-transparent"
                                                    : "cursor-pointer text-gray-300 hover:text-white border border-gray-400 hover:border-cyan-400 hover:bg-cyan-500/20 bg-transparent"
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