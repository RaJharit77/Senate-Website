"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText, formatDate } from "@/utils/utility";
import { FileText, ArrowRight, Calendar } from "lucide-react";

interface QuestionItem {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    link: string;
}

interface QuestionsEcritesClientProps {
    content: string;
    title: string;
    questions: QuestionItem[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function QuestionsClient({
    content,
    title,
    questions,
}: QuestionsEcritesClientProps) {
    const cleanTitle = cleanText(title);
    const cleanContent = content ? cleanText(content) : "";
    const hasContent = cleanContent.trim().length > 0;

    return (
        <>
            <Card className="bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl mb-8">
                <CardContent className="p-6 md:p-10">
                    <div className="mb-6">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-400/15 text-cyan-300 shrink-0">
                                <FileText size={22} />
                            </span>
                            <div>
                                <h2 className="text-white text-2xl md:text-3xl font-bold font-poppins leading-tight">
                                    {cleanTitle || "Questions écrites"}
                                </h2>
                                <p className="text-white/50 text-sm mt-2 font-poppins max-w-2xl">
                                    Retrouvez les questions adressées au Gouvernement
                                    par les Sénateurs, conformément au Règlement
                                    Intérieur du Sénat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {hasContent && (
                        <div
                            className="wp-senate-content font-poppins prose prose-invert max-w-none
                                [&_h1]:text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                                [&_h2]:text-cyan-300 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                                [&_h3]:text-cyan-300 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
                                [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:border-l-4 [&_h3]:border-l-cyan-400 [&_h3]:pl-3
                                [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                                [&_strong]:text-white
                                [&_a]:text-cyan-300 [&_a:hover]:text-cyan-200 [&_a]:underline
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                                [&_li]:text-gray-300 [&_li]:mb-2
                                [&_hr]:border-white/10 [&_hr]:my-8"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: cleanContent }}
                        />
                    )}
                </CardContent>
            </Card>

            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-poppins text-white text-xl font-bold">
                    Questions publiées
                </h3>
                <span className="font-poppins text-white/50 text-sm">
                    {questions.length} question{questions.length > 1 ? "s" : ""}
                </span>
            </div>

            {questions.length === 0 ? (
                <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-12 text-center">
                        <FileText
                            size={40}
                            className="mx-auto text-white/20 mb-4"
                        />
                        <p className="font-poppins text-white/60 italic">
                            Aucune question écrite n&apos;est disponible pour le moment.
                        </p>
                        <p className="font-poppins text-white/40 text-sm mt-2">
                            Veuillez revenir ultérieurement.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {questions.map((q) => (
                        <motion.div key={q.id} variants={itemVariants}>
                            <Link href={q.link} className="block h-full group">
                                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                                    <CardContent className="p-5 flex flex-col h-full">
                                        <div className="flex items-center gap-2 mb-3 text-white/40 text-xs">
                                            <Badge
                                                variant="secondary"
                                                className="bg-cyan-500/15 text-cyan-300 border-none text-[0.65rem] uppercase tracking-wider"
                                            >
                                                Question écrite
                                            </Badge>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={11} />
                                                {formatDate(q.date)}
                                            </span>
                                        </div>

                                        <h4
                                            className="font-poppins text-white text-base font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors"
                                            dangerouslySetInnerHTML={{ __html: q.title }}
                                        />

                                        {q.excerpt && (
                                            <p
                                                className="font-poppins text-white/55 text-sm leading-relaxed line-clamp-3 flex-1"
                                                dangerouslySetInnerHTML={{
                                                    __html: q.excerpt,
                                                }}
                                            />
                                        )}

                                        <span className="mt-4 inline-flex items-center gap-1 text-cyan-300 text-sm font-poppins font-medium group-hover:gap-2 transition-all">
                                            Lire la question
                                            <ArrowRight
                                                size={14}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                        </span>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
}