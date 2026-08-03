import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const githubApiUrl = process.env.GITHUB_API;

    if (!githubApiUrl) {
        console.error('GITHUB_API is not configured');
        return NextResponse.json(
            { error: 'GitHub API URL is not configured' },
            { status: 500 }
        );
    }

    try {
        const res = await fetch(githubApiUrl,
            {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Accept': 'application/vnd.github.v3+json',
                },
                // Revalidation ISR : 1 heure
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            console.error('GitHub API error:', res.status, await res.text());
            return NextResponse.json(
                { error: 'Failed to fetch release' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json({
            tag_name: data.tag_name,
            html_url: data.html_url,
        });
    } catch (error) {
        console.error('Error fetching release:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}