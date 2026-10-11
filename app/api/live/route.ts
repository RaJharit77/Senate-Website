import { NextRequest, NextResponse } from 'next/server';
import { getLiveStatus } from '@/lib/api';

export async function GET(req: NextRequest) {
    const kindParam = req.nextUrl.searchParams.get('kind');
    const kind = kindParam === 'radio' ? 'radio' : 'tv';

    const status = await getLiveStatus(kind);

    return NextResponse.json(status, {
        headers: { 'Cache-Control': 'no-store' },
    });
}