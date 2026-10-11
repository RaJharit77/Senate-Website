import { API_BASE } from '@/lib/wordpress';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathStr = path.filter(Boolean).join('/');
    const url = new URL(`${API_BASE}/${pathStr}`);

    // Récupérer les paramètres de recherche
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
    });

    try {
        const res = await fetch(url.toString(), {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)',
                Accept: 'application/json',
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `WordPress API error: ${res.status}` },
                { status: res.status }
            );
        }

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            console.error(
                `[Proxy] Réponse non-JSON (content-type: "${contentType}") pour ${url.toString()}`
            );
            return NextResponse.json(
                { error: 'Unexpected non-JSON response from WordPress' },
                { status: 502 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Proxy] Erreur réseau:', error);
        return NextResponse.json(
            { error: 'Failed to fetch from WordPress' },
            { status: 500 }
        );
    }
}

export async function POST() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}