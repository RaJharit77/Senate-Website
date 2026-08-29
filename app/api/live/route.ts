import { NextRequest, NextResponse } from 'next/server';
import { getLiveStatus } from '@/lib/api';

// GET /api/live            -> statut du direct TV (YouTube détecté, sinon Facebook manuel)
// GET /api/live?kind=radio -> statut du direct radio (flux audio brut)
export async function GET(req: NextRequest) {
    const kindParam = req.nextUrl.searchParams.get('kind');
    const kind = kindParam === 'radio' ? 'radio' : 'tv';

    // getLiveStatus('tv') interroge la YouTube Data API (voir lib/api.ts) :
    // await est désormais nécessaire, une simple assignation renverrait une
    // Promise non résolue à NextResponse.json.
    const status = await getLiveStatus(kind);

    // no-store : le statut du direct doit toujours refléter l'état courant,
    // jamais une réponse mise en cache au niveau de cette route. Le cache
    // qui compte réellement (pour respecter le quota YouTube) est celui du
    // fetch interne à checkYoutubeLive, pas celui-ci.
    return NextResponse.json(status, {
        headers: { 'Cache-Control': 'no-store' },
    });
}