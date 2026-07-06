import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WHITE, RED, EMERALD } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPosts } from "@/lib/api";

export const dynamic = "force-dynamic";

function cleanText(text: string): string {
    if (!text) return "";
    return text
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'");
}

async function getPostBySlug(slug: string) {
    const posts = await getPosts({ slug, _embed: true });
    return posts.length > 0 ? posts[0] : null;
}

export default async function LegislativeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const date = new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const cleanTitle = cleanText(post.title.rendered);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/10 mb-6 group"
                    asChild
                >
                    <Link
                        href="/parliamentary-proceedings/legislative-proceedings"
                        className="inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Retour aux travaux législatifs
                    </Link>
                </Button>

                <Card className="bg-white/5 backdrop-blur-md rounded-3xl border-white/10 shadow-2xl overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="mb-6">
                            <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                            </div>
                            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {cleanTitle}
                            </h1>
                            <div className="flex items-center gap-3 mt-3 text-white/40 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{date}</span>
                            </div>
                        </div>

                        {imageUrl && (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
                                <Image
                                    src={imageUrl}
                                    alt={cleanTitle}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        )}

                        <div
                            className="prose prose-lg prose-invert max-w-none
                [&_p]:text-white/80
                [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                [&_figure]:flex [&_figure]:flex-col [&_figure]:items-center [&_figure]:justify-start
                [&_figure]:my-6 [&_figure]:p-2 [&_figure]:bg-white/5 [&_figure]:rounded-2xl
                [&_figure]:backdrop-blur-sm [&_figure]:border [&_figure]:border-white/10
                [&_figcaption]:text-center [&_figcaption]:text-white/50 [&_figcaption]:text-sm
                [&_figcaption]:italic [&_figcaption]:mt-2
                [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15
                [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[500px] [&_img]:object-contain
                [&_img]:transition-all [&_img]:duration-200 [&_img]:hover:scale-105
                [&_img]:hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                [&_iframe]:rounded-2xl [&_iframe]:shadow-xl [&_iframe]:border [&_iframe]:border-white/20
                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-6
                [&_video]:rounded-2xl [&_video]:shadow-xl [&_video]:border [&_video]:border-white/20
                [&_video]:w-full [&_video]:aspect-video [&_video]:my-6
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:text-white/80 [&_li]:mb-1"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}