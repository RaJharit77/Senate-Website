import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WHITE, RED, EMERALD } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPageBySlug } from "@/lib/api";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export default async function HistoricalStoryPage() {
    const page = await getPageBySlug("historique-2");

    if (!page) return <NotFoundPage />

    const date = new Date(page.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const cleanTitle = page.title.rendered
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&");

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-5xl mx-auto">
                <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-white/10 mb-6"
                    asChild
                >
                    <Link href="/historical" className="inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Retour à l&apos;histoire
                    </Link>
                </Button>

                <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="mb-6">
                            <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                            </div>
                            <h1 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {cleanTitle}
                            </h1>
                            <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>Mis à jour le {date}</span>
                            </div>
                        </div>

                        <div
                            className="prose prose-lg prose-invert max-w-none text-gray-300
                                [&_p]:text-gray-300 [&_p]:mb-4
                                [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                                [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                                [&_figure]:flex [&_figure]:flex-col [&_figure]:items-center [&_figure]:justify-start
                                [&_figure]:my-6 [&_figure]:p-2 [&_figure]:bg-white/5 [&_figure]:rounded-2xl
                                [&_figure]:backdrop-blur-sm [&_figure]:border [&_figure]:border-white/10
                                [&_figcaption]:text-center [&_figcaption]:text-gray-400 [&_figcaption]:text-sm
                                [&_figcaption]:italic [&_figcaption]:mt-2
                                [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15
                                [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[500px] [&_img]:object-contain
                                [&_img]:transition-all [&_img]:duration-200 [&_img]:hover:scale-105
                                [&_img]:hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                [&_li]:text-gray-300 [&_li]:mb-1
                                [&_hr]:border-white/10 [&_hr]:my-8"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                        />

                        <div className="mt-8 flex justify-center">
                            <Button
                                asChild
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg hover:shadow-emerald-500/30"
                            >
                                <Link href="/historical">
                                    Explorer les républiques
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}