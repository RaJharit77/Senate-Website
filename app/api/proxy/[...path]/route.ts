import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = process.env.WP_API_URL || 'https://senat.mg/wp-json/wp/v2';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    // filter(Boolean) élimine les segments vides. fetchViaProxy (lib/api.ts)
    // construit l'URL via `/api/proxy/${endpoint}` où endpoint commence déjà
    // par un slash (ex: "/posts") : ça produit "/api/proxy//posts". Si le
    // routeur de Next restitue ce segment vide dans `path`, sans ce filter
    // on enverrait ".../wp/v2//posts" à WordPress.
    const pathStr = path.filter(Boolean).join('/');
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

        // Certains hébergeurs WordPress renvoient un 200 OK avec une page
        // HTML (challenge anti-bot, maintenance...) au lieu du JSON attendu.
        // lib/api.ts s'en protège déjà côté serveur (fetchAPI) ; ce garde-fou
        // manquait ici pour les appels passés par ce proxy, c'est-à-dire
        // ceux déclenchés depuis les composants 'use client'.
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