"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ArticleSkeleton() {
    return (
        <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="relative w-full aspect-video bg-white/5">
                <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-5 flex flex-col flex-1 gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-24 mt-2" />
            </CardContent>
        </Card>
    );
}