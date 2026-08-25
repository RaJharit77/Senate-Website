import { NextRequest, NextResponse } from 'next/server';
import { getLiveStatus } from '@/lib/api';

// GET /api/live            -> statut du direct TV (vidéo), comportement par défaut
// GET /api/live?kind=radio -> statut du direct radio (audio)
export async function GET(req: NextRequest) {
    const kindParam = req.nextUrl.searchParams.get('kind');
    const kind = kindParam === 'radio' ? 'radio' : 'tv';

    const status = getLiveStatus(kind);

    // no-store : le statut du direct doit toujours refléter l'état courant
    // des variables d'environnement, jamais une réponse mise en cache.
    return NextResponse.json(status, {
        headers: { 'Cache-Control': 'no-store' },
    });
}