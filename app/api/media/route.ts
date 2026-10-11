import { NextRequest, NextResponse } from 'next/server';
import { getAllChannelAndRadioMedia } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import type { MediaItem } from '@/types/media';

export async function GET(req: NextRequest) {
    const typeFilter = req.nextUrl.searchParams.get('type');
    const perPageParam = req.nextUrl.searchParams.get('per_page');
    const params: Record<string, string> = perPageParam ? { per_page: perPageParam } : {};

    try {
        const { youtube, hosted, podcasts, montages } = await getAllChannelAndRadioMedia(params);

        const items: MediaItem[] = [
            ...youtube.map((p) => extractMediaItem(p, 'youtube')),
            ...hosted.map((p) => extractMediaItem(p, 'video')),
            ...podcasts.map((p) => extractMediaItem(p, 'audio')),
            ...montages.map((p) => extractMediaItem(p, 'montage')),
        ];

        const filtered = typeFilter
            ? items.filter((item) => item.mediaType === typeFilter)
            : items;

        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(filtered);
    } catch (err) {
        console.error('[GET /api/media] Erreur agrégation média:', err);
        return NextResponse.json(
            { error: 'Impossible de récupérer les médias' },
            { status: 502 }
        );
    }
}