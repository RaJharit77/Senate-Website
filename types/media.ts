import { WpPost } from "@/lib/types";

export type MediaType = 'video' | 'audio' | 'youtube' | 'live' | 'montage' | 'facebook';

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

export interface LiveStatus {
    isLive: boolean;
    kind: 'tv' | 'radio';
    streamUrl: string;
    title: string;
    sourceType: 'url' | 'facebook' | 'youtube';
    startedAt?: string;
}