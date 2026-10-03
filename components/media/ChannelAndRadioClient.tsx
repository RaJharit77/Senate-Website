"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllChannelAndRadioMedia } from "@/lib/api";
import { extractMediaItem } from "@/lib/media-mapper";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Calendar, Search, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ChannelFilter, MediaItem } from "@/types/media";
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
import { cleanText } from "@/utils/utility";
import { MdArrowRightAlt } from "react-icons/md";
import { perPage } from "@/constants/constants";
import { detailHref, FILTER_LABELS, FILTER_OPTIONS } from "@/utils/media";
import { mediaIcon } from "@/lib/media";

export default function ChannelAndRadioClient() {
    const [allItems, setAllItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<ChannelFilter>("tous");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const { youtube, hosted, podcasts, montages } = await getAllChannelAndRadioMedia({
                    per_page: 100,
                });
                const items: MediaItem[] = [
                    ...youtube.map((p) => extractMediaItem(p, "youtube")),
                    ...hosted.map((p) => extractMediaItem(p, "video")),
                    ...podcasts.map((p) => extractMediaItem(p, "audio")),
                    ...montages.map((p) => extractMediaItem(p, "montage")),
                ];
                items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAllItems(items);
            } catch (error) {
                console.error("Erreur chargement des médias:", error);
                setAllItems([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredByCategory = useMemo(() => {
        if (filter === "tous") return allItems;
        return allItems.filter((item) => item.mediaType === filter);
    }, [allItems, filter]);

    const filteredBySearch = useMemo(() => {
        if (!searchTerm.trim()) return filteredByCategory;
        const term = searchTerm.trim().toLowerCase();
        return filteredByCategory.filter(
            (item) =>
                cleanText(item.title).toLowerCase().includes(term) ||
                cleanText(item.excerpt || "").toLowerCase().includes(term)
        );
    }, [filteredByCategory, searchTerm]);

    const totalPages = Math.ceil(filteredBySearch.length / perPage);
    const paginatedItems = useMemo(() => {
        return filteredBySearch.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );
    }, [filteredBySearch, currentPage]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleFilterChange = (cat: ChannelFilter) => {
        setFilter(cat);
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
                        Chaîne TV / Radio
                    </h1>
                    <p className="text-gray-300 text-lg mt-2 max-w-2xl">
                        Retrouvez les vidéos, les podcasts, les mises en boîte et le direct du Sénat de Madagascar.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {FILTER_OPTIONS.map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFilterChange(cat)}
                                className={
                                    filter === cat
                                        ? "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30"
                                        : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20 hover:text-white"
                                }
                            >
                                {FILTER_LABELS[cat]}
                            </Button>
                        ))}
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-3 ml-auto">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
                ) : paginatedItems.length === 0 ? (
                    <p className="text-gray-400">Aucun contenu ne correspond à vos critères.</p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedItems.map((item) => {
                                const date = new Date(item.date).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                                const cleanTitle = cleanText(item.title);
                                const Icon = mediaIcon(item.mediaType);
                                const isAudio = item.mediaType === "audio";

                                const imageUrl =
                                    item.thumbnail ||
                                    (item.mediaType === "youtube" && item.youtubeId
                                        ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                                        : null);

                                const categoryLabel =
                                    item.mediaType === "youtube" ? "Chaîne YouTube" :
                                        item.mediaType === "video" ? "Vidéo" :
                                            item.mediaType === "audio" ? "Podcast" :
                                                "Mise en boîte";

                                return (
                                    <Card
                                        key={`${item.mediaType}-${item.id}`}
                                        className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
                                    >
                                        {imageUrl && !isAudio ? (
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
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full aspect-video bg-white/5 flex items-center justify-center">
                                                <Icon className="w-12 h-12 text-gray-500" />
                                            </div>
                                        )}
                                        <CardContent className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                                <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-none">
                                                    {categoryLabel}
                                                </Badge>
                                                <Calendar className="w-4 h-4" />
                                                <span>{date}</span>
                                            </div>
                                            <h3 className="text-white text-xl font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {cleanTitle}
                                            </h3>
                                            {item.excerpt && (
                                                <p
                                                    className="text-gray-300 text-sm line-clamp-3 flex-1"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanText(item.excerpt),
                                                    }}
                                                />
                                            )}
                                            <div className="flex items-center gap-3 mt-4">
                                                <Link
                                                    href={detailHref(item)}
                                                    className="inline-block text-cyan-300 hover:text-cyan-200 text-sm font-medium transition"
                                                >
                                                    {isAudio ? "Écouter" : "Regarder"} <MdArrowRightAlt className="inline-block" />
                                                </Link>
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
                                            text="Précédent"
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
                                            text="Suivant"
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