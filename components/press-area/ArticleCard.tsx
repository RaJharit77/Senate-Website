"use client";

import { motion } from "framer-motion";
import type { WpPost } from "@/lib/types";
import Image from "next/image";
import { Calendar, ImageIcon } from "lucide-react";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

export interface ExtendedPost extends WpPost {
    isFeatured: boolean;
    imageUrl: string | null;
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function ArticleCard({ post }: { post: ExtendedPost }) {
    const { imageUrl, isFeatured } = post;
    const date = new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const cleanTitle = post.title.rendered.replace(/&rsquo;/g, "'").replace(/&nbsp;/g, " ");

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
        >
            <div className="relative w-full aspect-video overflow-hidden bg-white/5">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={cleanTitle}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <ImageIcon size={48} strokeWidth={1} />
                    </div>
                )}
                {isFeatured && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
                        À la une
                    </span>
                )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar size={14} />
                    <span>{date}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {cleanTitle}
                </h3>
                {post.excerpt?.rendered && (
                    <p
                        className="text-gray-300 text-sm line-clamp-3 flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                )}
                <Link
                    href={`/press-area/news/${post.slug}`}
                    className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition self-start"
                >
                    Lire la suite <MdArrowRightAlt className="inline-block" />
                </Link>
            </div>
        </motion.div>
    );
}
