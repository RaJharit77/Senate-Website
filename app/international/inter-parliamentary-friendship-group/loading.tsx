import { InternationalPageSkeleton } from "@/components/international/InternationalPageSkeleton";

export default function Loading() {
    return <InternationalPageSkeleton showFilters={false} showPagination cardCount={6} />;
}