import { Skeleton } from "@/components/ui/skeleton";
import { InternationalPageSkeletonProps } from "@/types/internationalType";
import { EMERALD, RED, WHITE } from "@/utils/colors";

export function InternationalPageSkeleton({
    showFilters = true,
    showPagination = true,
    cardCount = 6,
}: InternationalPageSkeletonProps) {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <Skeleton className="h-10 w-3/4 max-w-xl" />
                    <Skeleton className="h-6 w-1/2 max-w-sm mt-2" />
                </div>

                {showFilters && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-20 rounded-full" />
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: cardCount }).map((_, i) => (
                        <div key={i} className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                            <Skeleton className="aspect-4/3 w-full" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>

                {showPagination && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-9 rounded-md" />
                        ))}
                        <Skeleton className="h-9 w-9 rounded-md" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i + 4} className="h-9 w-9 rounded-md" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}