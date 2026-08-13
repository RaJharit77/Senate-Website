import { getPresidentActivities, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { formatDate } from "@/utils/utility";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { ActivityItem } from "@/types/internationalType";
import { PresidentActivitiesFeed } from "@/components/international/PresidentActivitiesFeed";
import { delay } from "@/lib/delay";

export const metadata = buildMetadata({
    title: "Activités du Président du Sénat",
    description: "Audiences, accueil de délégations parlementaires étrangères et déplacements à l'étranger du Président du Sénat de Madagascar.",
    path: "/international/presidents-activities",
});

export default async function PresidentsActivitiesPage() {
    await delay(500);

    const activities = await getPresidentActivities().catch(() => []);

    const items: ActivityItem[] = await Promise.all(
        activities.map(async ({ id, category, post }) => {
            const imageUrl = await resolvePostImage(post, getMedia);
            return {
                id,
                slug: post.slug,
                category,
                title: post.title?.rendered || "Sans titre",
                date: formatDate(post.date),
                dateValue: new Date(post.date).getTime(),
                imageUrl,
                link: post.link || "#",
            };
        })
    );

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "International", url: `${SITE_URL}/international` },
        { name: "Activités du Président", url: `${SITE_URL}/international/presidents-activities` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Activités du Président du Sénat",
        description: "Audiences, accueil de délégations et déplacements du Président du Sénat.",
        url: `${SITE_URL}/international/presidents-activities`,
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
                        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Activités du Président
                        </h1>
                        <p className="text-lg mt-2 max-w-2xl text-gray-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Audiences, accueil de délégations parlementaires étrangères et déplacements à l&apos;étranger du Président du Sénat.
                        </p>
                    </div>
                    <PresidentActivitiesFeed items={items} basePath="/international/presidents-activities" />
                </div>
            </div>
        </>
    );
}