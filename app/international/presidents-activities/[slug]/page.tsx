import { getAudiences, getDelegations, getInternational } from "@/lib/api";
import { formatDate } from "@/utils/utility";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import NotFoundPage from "@/app/not-found";

export default async function PresidentActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const fetchers = [getAudiences, getDelegations, getInternational];
    let post = null;
    for (const fetcher of fetchers) {
        try {
            const result = await fetcher({ slug, _embed: true });
            if (result && result.length > 0) {
                post = result[0];
                break;
            }
        } catch {
            // continue
        }
    }

    if (!post) return <NotFoundPage />

    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const date = formatDate(post.date);

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/international/presidents-activities"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Retour aux activités du Président
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
                        {post.title.rendered}
                    </h1>
                    <div className="flex items-center gap-3 mt-3 text-white/40 text-sm">
                        <Calendar size={16} />
                        <span>{date}</span>
                    </div>
                </div>

                {imageUrl && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            className="w-full h-full object-cover"
                            fill
                            priority
                        />
                    </div>
                )}

                <div
                    className="prose prose-invert max-w-none text-white/80
                        [&_p]:text-white/80 [&_p]:mb-4
                        [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                        [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                        [&_li]:text-white/80 [&_li]:mb-1
                        [&_hr]:border-white/10 [&_hr]:my-8"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </div>
        </div>
    );
}