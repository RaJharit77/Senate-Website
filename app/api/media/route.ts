import { NextRequest, NextResponse } from 'next/server';
import { getAllChannelAndRadioMedia } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import type { MediaItem } from '@/types/media';

// GET /api/media                -> tous les types, triés par date décroissante
// GET /api/media?type=youtube   -> uniquement les vidéos YouTube (CAT_VIDEO)
// GET /api/media?type=video     -> uniquement les vidéos hébergées
// GET /api/media?type=audio     -> uniquement les podcasts
// GET /api/media?type=montage   -> uniquement les montages ("mise en boîte")
// GET /api/media?per_page=20    -> transmis tel quel à WordPress pour chaque catégorie
//
// Remplace l'ancienne route statique qui lisait data/media.json : les
// données viennent maintenant de WordPress via lib/api.ts, mais la forme de
// réponse (MediaItem[]) reste identique pour ne rien casser côté clients
// existants de cette route.
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