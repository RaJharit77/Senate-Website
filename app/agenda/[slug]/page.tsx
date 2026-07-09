import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/api";
import { formatDate, cleanText } from "@/utils/utility";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import type { WpPost } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { CAT_ORDRE_JOUR } from "@/constants/constants";

export default async function AgendaArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const posts = (await getPostsByCategory(CAT_ORDRE_JOUR, {
        slug,
        _embed: true,
    }).catch(() => [])) as WpPost[];

    if (!posts.length) notFound();

    const post = posts[0];

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/agenda"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Retour à l&apos;agenda
                </Link>

                <div className="mb-8">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        className="text-white text-3xl md:text-4xl font-bold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {cleanText(post.title.rendered)}
                    </h1>
                    <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
                        <Calendar size={16} />
                        <span>{formatDate(post.date)}</span>
                    </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div
                            className="prose prose-invert max-w-none text-gray-300
                                [&_p]:text-gray-300 [&_p]:mb-4
                                [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                                [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                [&_li]:text-gray-300 [&_li]:mb-1
                                [&_hr]:border-white/10 [&_hr]:my-8"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}