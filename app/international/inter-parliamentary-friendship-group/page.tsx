import { getPostsByCategorySlug, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import type { WpPost } from "@/lib/types";
import { formatDate } from "@/utils/utility";
import type { ActivityCategory, SimpleActivityItem } from "@/types/internationalType";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { SimpleActivityGrid } from "@/components/international/SimpleActivityGrid";

export const metadata = buildMetadata({
    title: "Groupe Interparlementaire d'Amitié du Sénat",
    description: "Retrouvez les activités du Groupe Interparlementaire d'Amitié du Sénat de Madagascar : rencontres, échanges et coopération internationale.",
    path: "/international/inter-parliamentary-friendship-group",
});

export default async function InterParliamentaryFriendshipGroupPage() {
    const slugs = ["groupe-amitie", "groupe-interparlementaire-damitie"];
    let allPosts: WpPost[] = [];

    for (const slug of slugs) {
        try {
            const posts = (await getPostsByCategorySlug(slug, {
                per_page: 100,
                _embed: true,
                status: "publish",
            })) as WpPost[];
            allPosts = allPosts.concat(posts);
        } catch (err) {
            console.error(`[InterParliamentaryFriendshipGroupPage] Failed to load posts for slug ${slug}:`, err);
        }
    }

    const uniquePosts = Array.from(new Map(allPosts.map(p => [p.id, p])).values());

    const items: SimpleActivityItem[] = await Promise.all(
        uniquePosts.map(async (post) => {
            const imageUrl = await resolvePostImage(post, getMedia);
            return {
                id: post.id,
                slug: post.slug,
                title: post.title.rendered,
                date: formatDate(post.date),
                dateValue: new Date(post.date).getTime(),
                imageUrl,
                link: post.link || "",
                category: "delegation" as ActivityCategory,
            };
        })
    );

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "International", url: `${SITE_URL}/international` },
        { name: "Groupe Interparlementaire d'Amitié", url: `${SITE_URL}/international/inter-parliamentary-friendship-group` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Groupe Interparlementaire d'Amitié du Sénat",
        description: "Activités du Groupe Interparlementaire d'Amitié du Sénat de Madagascar.",
        url: `${SITE_URL}/international/inter-parliamentary-friendship-group`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
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
        </>
    );
}