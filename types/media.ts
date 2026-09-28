import { WpPost } from "@/lib/wp-types";

export type MediaType = 'video' | 'audio' | 'youtube' | 'live' | 'montage';
export type ChannelFilter = "tous" | MediaType;

/** Média normalisé (vidéo, audio, direct...) pour affichage dans l'UI. */
export interface MediaItem {
    id: number;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    mediaType: MediaType;
    mediaUrl?: string;
    youtubeId?: string;
    thumbnail?: string;
    duration?: number;
    post?: WpPost;
    embedUrl?: string;
}

/** Statut d'un direct TV ou radio (cf. getLiveStatus dans api.ts). */
export interface LiveStatus {
    isLive: boolean;
    kind: 'tv' | 'radio';
    streamUrl: string;
    title: string;
    sourceType: 'url' | 'youtube';
    startedAt?: string;
}