import { MediaType } from "@/types/media";
import { Clapperboard, Music2, PlayCircle } from "lucide-react";
import dynamic from 'next/dynamic';

export function mediaIcon(type: MediaType) {
    if (type === "audio") return Music2;
    if (type === "montage") return Clapperboard;
    return PlayCircle;
}

export const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export interface LivePlayerProps {
    streamUrl: string;
    sourceType?: 'url' | 'facebook' | 'youtube';
    title?: string;
    kind?: 'tv' | 'radio';
    className?: string;
}

/**
 * Convertit l'URL stockée par getLiveStatus (embed YouTube construit par
 * lib/api.ts, ou permalien Facebook brut) vers ce qu'attend react-player :
 * une URL "watch" YouTube, ou le permalien Facebook tel quel.
 */
export function toReactPlayerUrl(sourceType: 'youtube' | 'facebook', streamUrl: string): string {
    if (sourceType === 'youtube') {
        const match = streamUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        const videoId = match?.[1];
        return videoId ? `https://www.youtube.com/watch?v=${videoId}` : streamUrl;
    }
    return streamUrl;
}