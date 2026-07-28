"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export function TextAndLawsPagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const router = useRouter();

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        router.push(`${basePath}?page=${page}`);
    };

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex flex-wrap items-center justify-center gap-1.5 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-white/10 text-white/60 hover:bg-white/10"
            >
                «
            </Button>
            {pages.map((p) => (
                <Button
                    key={p}
                    variant={p === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(p)}
                    className={
                        p === currentPage
                            ? "bg-cyan-500 text-white hover:bg-cyan-600"
                            : "border-white/10 text-white/70 hover:bg-white/10"
                    }
                >
                    {p}
                </Button>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-white/10 text-white/60 hover:bg-white/10"
            >
                »
            </Button>
        </nav>
    );
}