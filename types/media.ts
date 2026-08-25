import { WpPost } from "@/lib/types";

// 'video'    : vidéo hébergée (fichier mp4 uploadé sur WP)
// 'youtube'  : vidéo YouTube (catégorie CAT_VIDEO existante)
// 'audio'    : podcast / émission audio
// 'live'     : entrée synthétique représentant le direct (pas un post WP)
// 'montage'  : "mise en boîte" — rediffusion / montage vidéo édité
export type MediaType = 'video' | 'audio' | 'youtube' | 'live' | 'montage';

export interface MediaItem {
    id: number;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    mediaType: MediaType;
    // URL de la vidéo/audio (si hébergé)
    mediaUrl?: string;
    // ID YouTube (si vidéo YouTube)
    youtubeId?: string;
    // URL de la vignette
    thumbnail?: string;
    // Durée en secondes, si connue (utile pour l'affichage playlist audio/montage)
    duration?: number;
    // Post WordPress brut (absent pour l'entrée synthétique 'live')
    post?: WpPost;
}

// Statut du direct, utilisé par /api/live et LivePlayer
export interface LiveStatus {
    isLive: boolean;
    kind: 'tv' | 'radio';
    streamUrl: string;
    title: string;
    sourceType: 'url' | 'facebook' | 'youtube';
    startedAt?: string;
}