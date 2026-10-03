"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StructuresClientProps } from "@/types/structureType";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText } from "@/utils/utility";

export default function StructuresClient({
    content,
    title,
    updatedAt,
}: StructuresClientProps) {
    const cleanTitle = cleanText(title);
    const cleanContent = content ? cleanText(content) : "";

    return (
        <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
            <CardContent className="p-6 md:p-10">
                <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h2
                        className="text-white text-2xl md:text-3xl font-bold font-poppins leading-tight"
                    >
                        {cleanTitle || "Structure administrative"}
                    </h2>
                    {updatedAt && (
                        <p className="text-white/40 text-sm mt-2 font-poppins">
                            Mis à jour le {updatedAt}
                        </p>
                    )}
                </div>

                {cleanContent ? (
                    <div
                        className="
                            wp-senate-content font-poppins prose prose-invert max-w-none
                            [&_h1]:text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                            [&_h2]:text-cyan-300 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                            [&_h3]:text-cyan-300 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
                            [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:border-l-4 [&_h3]:border-l-cyan-400 [&_h3]:pl-3
                            [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                            [&_strong]:text-white [&_strong]:font-semibold
                            [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200 [&_a]:underline
                            [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-6 [&_ul]:space-y-3
                            [&_li]:text-gray-300 [&_li]:leading-relaxed [&_li]:relative [&_li]:pl-6
                            [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0
                            [&_li]:before:top-2 [&_li]:before:w-2 [&_li]:before:h-2
                            [&_li]:before:rounded-full [&_li]:before:bg-cyan-400
                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                            [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15
                            [&_figure]:my-6 [&_figure]:p-2 [&_figure]:bg-white/5 [&_figure]:rounded-2xl
                            [&_figcaption]:text-center [&_figcaption]:text-gray-400 [&_figcaption]:text-sm
                            [&_figcaption]:italic [&_figcaption]:mt-2
                            [&_hr]:border-white/10 [&_hr]:my-8
                            [&_blockquote]:border-l-4 [&_blockquote]:border-l-cyan-400 [&_blockquote]:pl-4
                            [&_blockquote]:italic [&_blockquote]:text-gray-400"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />
                ) : (
                    <div className="py-16 text-center">
                        <p className="text-white/40 italic font-poppins">
                            Aucun contenu n&apos;est disponible pour le moment.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}