import { getWrittenQuestions, getGouvernementPosts } from "@/lib/api";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import QuestionsEcritesClient from "@/components/questions/QuestionsClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Questions écrites – Sénat de Madagascar",
    description:
        "Questions écrites adressées au Gouvernement par les Sénateurs de Madagascar.",
    path: "/parliamentary-proceedings/written-questions",
});

interface QuestionItem {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    link: string;
}

export default async function WrittenQuestionsPage() {
    const post = await getWrittenQuestions();

    if (!post) return <NotFoundPage />;

    const cleanTitle = cleanText(post.title.rendered);

    const relatedPosts = await getGouvernementPosts({
        per_page: 30,
        orderby: "date",
        order: "desc",
    }).catch(() => []);

    const questions: QuestionItem[] = relatedPosts
        .filter((p) => p.slug !== "questions-ecrites")
        .map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title.rendered,
            excerpt:
                p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
                p.content.rendered.replace(/<[^>]+>/g, "").slice(0, 220).trim() ||
                "",
            date: p.date,
            link: `/questions-ecrites/${p.slug}`,
        }));

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Travaux parlementaires", url: `${SITE_URL}/parliamentary-proceedings` },
        { name: cleanTitle, url: `${SITE_URL}/written-questions` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: cleanTitle,
        description:
            "Questions écrites adressées au Gouvernement par les Sénateurs de Madagascar.",
        url: `${SITE_URL}/written-questions`,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins text-white text-4xl md:text-5xl font-bold leading-tight">
                            Questions écrites
                        </h1>
                        <p className="font-poppins text-white/60 text-lg mt-4 max-w-3xl leading-relaxed">
                            Les Sénateurs peuvent interroger le Gouvernement par
                            écrit sur des sujets d&apos;intérêt national ou local.
                            Retrouvez ici les questions publiées.
                        </p>
                    </header>

                    <QuestionsEcritesClient
                        content={post.content.rendered}
                        title={cleanTitle}
                        questions={questions}
                    />
                </div>
            </div>
        </>
    );
}