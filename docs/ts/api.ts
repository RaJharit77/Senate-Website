/*export async function getLawsExcerpts(limit: number = 4): Promise<{
    id: number;
    title: string;
    excerpt: string;
    link: string;
    date: string;
}[]> {
    try {
        const res = await fetch(
            `${API_BASE}/posts?categories=14&_embed=true&per_page=${limit}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return [];
        const posts = (await res.json()) as WpPost[];
        return posts.map((post: WpPost) => ({
            id: post.id,
            title: post.title.rendered,
            excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Aucun extrait disponible.",
            link: post.link || `/texts-and-laws/${post.slug}`,
            date: post.date,
        }));
    } catch {
        return [];
    }
}*/