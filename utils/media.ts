import { ChannelFilter, MediaItem } from "@/types/media";

export const FILTER_LABELS: Record<ChannelFilter, string> = {
    tous: "Tous",
    youtube: "Chaîne YouTube",
    video: "Vidéos",
    audio: "Podcasts",
    montage: "Mise en boîte",
    live: "Live",
};

export const FILTER_OPTIONS: ChannelFilter[] = ["tous", "youtube", "video", "audio", "montage"];

export function detailHref(item: MediaItem): string {
    const segment = item.mediaType === "youtube" ? "video" : item.mediaType;
    return `/channel-tv-and-radio/${segment}/${item.slug}`;
}