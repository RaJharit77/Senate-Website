import { getPostsByCategorySlug, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import { SimpleActivityGrid } from "@/components/international/SimpleActivityGrid";
import type { SimpleActivityItem } from "@/components/international/SimpleActivityGrid";
import type { ActivityCategory } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import type { WpPost } from "@/lib/types";
import { formatDate } from "@/utils/utility";

export default async function InterParliamentaryFriendshipGroupPage() {
    let raw: WpPost[] = [];
    try {
        raw = (await getPostsByCategorySlug("groupe-amitie", {
            per_page: 100,
            _embed: true,
            status: "publish",
        })) as WpPost[];
    } catch (err) {
        console.error("[InterParliamentaryFriendshipGroupPage] Failed to load activities:", err);
        raw = [];
    }

    const items: SimpleActivityItem[] = await Promise.all(
        raw.map(async (post) => {
            const imageUrl = await resolvePostImage(post, getMedia);
            return {
                id: post.id,
                title: post.title.rendered,
                date: formatDate(post.date),
                dateValue: new Date(post.date).getTime(),
                imageUrl,
                link: post.link || "",
                category: "delegation" as ActivityCategory,
            };
        })
    );

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-4xl font-bold text-white"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Groupe Interparlementaire d&apos;Amitié
                    </h1>
                    <p
                        className="text-lg mt-2 max-w-2xl text-white/50"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Retrouvez ici les activités du Groupe Interparlementaire d&apos;Amitié du Sénat.
                    </p>
                </div>

                <SimpleActivityGrid items={items} />
            </div>
        </div>
    );
}