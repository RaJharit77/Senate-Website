"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { ActivityCategory, ActivityItem } from "@/types/internationalType";

const SECTION_CONFIG: Record<ActivityCategory, { label: string; color: string }> = {
    audience: { label: "Audience", color: "bg-blue-500" },
    delegation: { label: "Délégation", color: "bg-green-500" },
    international: { label: "Déplacement", color: "bg-purple-500" },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
} as const;

export function ActivityCard({ item, basePath }: { item: ActivityItem; basePath: string }) {
    const href = `${basePath}/${item.slug}`;
    const categoryInfo = SECTION_CONFIG[item.category] || { label: "Activité", color: "bg-gray-500" };

    return (
        <motion.div variants={cardVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
            <Link href={href} className="block h-full">
                <Card className="h-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-white/5">
                        {item.imageUrl ? (
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <Badge className={`${categoryInfo.color} border-none text-white`}>
                                {categoryInfo.label}
                            </Badge>
                        </div>
                    </div>
                    <CardContent className="p-4">
                        <h4
                            className="text-base font-semibold leading-snug text-white line-clamp-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <div className="flex items-center gap-1 mt-2 text-xs text-white/60">
                            <Calendar size={14} />
                            <span>{item.date}</span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export function ActivityCardSkeleton() {
    return (
        <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="aspect-4/3 w-full">
                <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </CardContent>
        </Card>
    );
}