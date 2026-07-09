import { getPostsByCategorySlug, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import { ActivitiesFeed, type ActivityItem } from "@/components/international/ActivitiesFeed";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import type { WpPost } from "@/lib/types";
import { formatDate } from "@/utils/utility";

const CATEGORY_MAP: Record<string, "audience" | "delegation" | "international"> = {
    "audience_sen": "audience",
    "deplacement_sen": "international",
    "delegation_sen": "delegation"
};

export default async function SenatorsActivitiesPage() {
    const slugs = Object.keys(CATEGORY_MAP);
    const results = await Promise.allSettled(
        slugs.map((slug) => getPostsByCategorySlug(slug, { per_page: 100, _embed: true }))
    );

    const items: ActivityItem[] = [];

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "fulfilled") {
            const slug = slugs[i];
            const category = CATEGORY_MAP[slug];
            const posts = result.value as WpPost[];

            const postsWithImages = await Promise.all(
                posts.map(async (post) => ({
                    post,
                    imageUrl: await resolvePostImage(post, getMedia),
                }))
            );

            for (const { post, imageUrl } of postsWithImages) {
                items.push({
                    id: post.id,
                    slug: post.slug,                
                    category,
                    title: post.title.rendered,
                    date: formatDate(post.date),
                    dateValue: new Date(post.date).getTime(),
                    imageUrl,
                    link: post.link || "",
                });
            }
        }
    }

    items.sort((a, b) => b.dateValue - a.dateValue);

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Activités des Sénateurs
                    </h1>
                    <p className="text-lg mt-2 max-w-2xl text-white/50" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Audiences, accueil de délégations et déplacements à l&apos;étranger des Sénateurs.
                    </p>
                </div>
                <ActivitiesFeed items={items} />
            </div>
        </div>
    );
}