import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = process.env.WP_API_URL || 'https://senat.mg/wp-json/wp/v2';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathStr = path.join('/');
    const url = new URL(`${WP_API_BASE}/${pathStr}`);

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