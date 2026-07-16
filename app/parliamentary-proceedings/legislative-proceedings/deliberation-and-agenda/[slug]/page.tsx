import { notFound } from "next/navigation";
import { getAllRelevantPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeliberationTable } from "@/components/parliamentary/DeliberationTable";
import { cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";

export const dynamic = "force-dynamic";

export default async function DeliberationArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const allPosts = await getAllRelevantPosts().catch(() => []);
    if (!allPosts.length) notFound();

    const post = allPosts.find((p) => p.slug === slug);
    if (!post) return <NotFoundPage />

    const cleanTitle = cleanText(post.title.rendered);
    const hasTable = post.content.rendered.includes("<table");

    const currentIndex = allPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <Button
                        variant="ghost"
                        className="text-cyan-300 hover:text-cyan-200 mb-4 group hover:bg-transparent"
                        asChild
                    >
                        <Link
                            href="/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda"
                            className="inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Retour à la liste
                        </Link>
                    </Button>
                    <h1
                        className="text-white text-4xl md:text-5xl font-bold tracking-tight"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {cleanTitle}
                    </h1>
                    <p className="text-white/60 text-lg mt-2 max-w-2xl">
                        {hasTable
                            ? "Consultez le tableau complet de cette délibération."
                            : "Détails des textes et lois adoptés."}
                    </p>
                </div>

                <Card className="bg-white/5 backdrop-blur-md rounded-3xl border-white/10 shadow-2xl overflow-hidden">
                    <CardContent className="p-4 md:p-8">
                        {hasTable ? (
                            <DeliberationTable tableHtml={post.content.rendered} showPagination={true} />
                        ) : (
                            <div
                                className="prose prose-invert max-w-none text-white/80 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-cyan-300 [&_em]:text-cyan-200"
                                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                            />
                        )}
                    </CardContent>
                </Card>

                {(prevPost || nextPost) && (
                    <div className="flex items-center justify-between gap-4 mt-10">
                        {prevPost ? (
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="border-white/20 bg-transparent text-cyan-300/90 hover:text-cyan-400/90 hover:bg-white/10"
                            >
                                <Link
                                    href={`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${prevPost.slug}`}
                                    className="flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    {cleanText(prevPost.title.rendered).slice(0, 40)}…
                                </Link>
                            </Button>
                        ) : (
                            <div />
                        )}
                        <span className="text-white/40 text-sm">
                            {currentIndex + 1} / {allPosts.length}
                        </span>
                        {nextPost ? (
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="border-white/20 bg-transparent text-cyan-300/90 hover:text-cyan-400/90 hover:bg-white/10"
                            >
                                <Link
                                    href={`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${nextPost.slug}`}
                                    className="flex items-center gap-2"
                                >
                                    {cleanText(nextPost.title.rendered).slice(0, 40)}…
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        ) : (
                            <div />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}