"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EMERALD, RED, WHITE } from "@/utils/colors";
//import { cleanText } from "@/utils/utility";

interface StructuresClientProps {
    /** HTML déjà rendu par WordPress (post.content.rendered). */
    content: string;
    /** Titre du post WordPress (nettoyé). */
    title: string;
}

export default function StructuresClient({ content, title }: StructuresClientProps) {
    return (
        <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden">
            <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h2
                        className="text-white text-2xl md:text-3xl font-bold font-poppins"
                    >
                        {title}
                    </h2>
                </div>

                {content ? (
                    <div
                        className="wp-senate-content font-poppins prose prose-invert max-w-none
                            [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white
                            [&_p]:text-gray-300 [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200
                            [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
                            [&_li]:text-gray-300 [&_li]:mb-1
                            [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:border-2 [&_img]:border-white/15
                            [&_figure]:my-6 [&_figure]:p-2 [&_figure]:bg-white/5 [&_figure]:rounded-2xl
                            [&_figcaption]:text-center [&_figcaption]:text-gray-400 [&_figcaption]:text-sm
                            [&_figcaption]:italic [&_figcaption]:mt-2
                            [&_hr]:border-white/10 [&_hr]:my-8"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                ) : (
                    <p className="text-white/40 italic py-12 text-center">
                        Aucun contenu n&apos;est disponible pour le moment.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}