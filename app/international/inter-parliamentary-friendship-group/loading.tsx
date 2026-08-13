import { InternationalPageSkeleton } from "@/components/international/InternationalPageSkeleton";

export default function Loading() {
    return <InternationalPageSkeleton showFilters showPagination cardCount={6} />;
}