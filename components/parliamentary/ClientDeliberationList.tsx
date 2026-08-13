"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  SearchX,
  Undo2,
  X,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DeliberationTable } from "./DeliberationTable";
import { cleanText } from "@/utils/utility";
import { EMERALD, RED, WHITE } from "@/utils/colors";

interface ClientDeliberationListProps {
  posts: Array<{
    title: { rendered: string };
    content: { rendered: string };
    slug: string;
  }>;
  initialIndex?: number;
  useRouterNavigation?: boolean;
}

export function ClientDeliberationList({
  posts,
  initialIndex = 0,
  useRouterNavigation = false,
}: ClientDeliberationListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Historique de la recherche précédente pour permettre l'annulation
  const previousSearchRef = useRef<string>("");
  const [canUndo, setCanUndo] = useState(false);

  // Filtrer les articles en fonction de la recherche
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const term = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const title = cleanText(post.title.rendered).toLowerCase();
      const content = cleanText(post.content.rendered).toLowerCase();
      return title.includes(term) || content.includes(term);
    });
  }, [posts, searchQuery]);

  const total = filteredPosts.length;

  // Réinitialiser l'index lorsque la recherche change
  const handleSearchChange = (value: string) => {
    previousSearchRef.current = searchQuery;
    setCanUndo(searchQuery.trim() !== "");
    setSearchQuery(value);
    setCurrentIndex(0);
  };

  // Annule la dernière modification et revient à la recherche précédente
  const undoSearch = () => {
    setSearchQuery(previousSearchRef.current);
    setCurrentIndex(0);
    setCanUndo(false);
  };

  const clearSearch = () => {
    previousSearchRef.current = searchQuery;
    setCanUndo(searchQuery.trim() !== "");
    setSearchQuery("");
    setCurrentIndex(0);
  };

  // Assurer que l'index reste dans les limites
  const safeIndex = Math.min(Math.max(currentIndex, 0), total - 1);
  if (currentIndex !== safeIndex) {
    setCurrentIndex(safeIndex);
  }

  const currentPost = total > 0 ? filteredPosts[safeIndex] : null;

  const goTo = (newIndex: number) => {
    setCurrentIndex(newIndex);
    if (useRouterNavigation && filteredPosts[newIndex]) {
      router.push(
        `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${filteredPosts[newIndex].slug}`
      );
    }
  };

  const handlePrev = () => {
    if (safeIndex > 0) goTo(safeIndex - 1);
  };

  const handleNext = () => {
    if (safeIndex < total - 1) goTo(safeIndex + 1);
  };

  const progress = total > 0 ? ((safeIndex + 1) / total) * 100 : 0;

  const searchPanel = (
    <div className="mb-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md sm:p-4">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type="text"
              placeholder="Rechercher dans toutes les délibérations..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentPost) {
                  e.preventDefault();
                  const slug = currentPost.slug;
                  setSearchQuery("");
                  setCanUndo(false);
                  if (useRouterNavigation) {
                    router.push(
                      `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${slug}`
                    );
                  }
                }
              }}
              className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 pr-9 text-white placeholder:text-white/35 transition-colors focus:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/25"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                aria-label="Effacer la recherche"
                title="Effacer la recherche"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {canUndo && (
            <button
              onClick={undoSearch}
              title="Revenir à la recherche précédente"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/20 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 sm:text-sm"
            >
              <Undo2 className="h-3.5 w-3.5" />
              Annuler
            </button>
          )}
        </div>
        {searchQuery && (
          <p aria-live="polite" className="mt-3 pl-1 text-sm text-white/45"><span className="font-medium tabular-nums text-cyan-300">{total}</span> résultat{total > 1 ? "s" : ""} pour « <span className="text-white/70">{searchQuery}</span> »</p>
        )}
      </div>
    </div>
  );

  // Si aucun article ne correspond à la recherche
  if (total === 0 || !currentPost) {
    return (
      <div className="font-poppins">
        {searchPanel}
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md sm:p-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <SearchX className="h-5 w-5 text-white/40" />
          </div>
          <p className="max-w-sm text-white/50">
            Aucune délibération ne correspond à votre recherche.
          </p>
          <button
            onClick={clearSearch}
            className="rounded text-sm text-cyan-300 underline underline-offset-4 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          >
            Réinitialiser la recherche
          </button>
        </div>
      </div>
    );
  }

  const cleanTitle = cleanText(currentPost.title.rendered);
  const hasTable = currentPost.content.rendered.includes("<table");

  return (
    <div className="font-poppins">
      {searchPanel}

      {/* Contenu de la délibération courante */}
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <h2 className="flex items-center gap-3 text-xl font-bold leading-snug text-white sm:text-2xl">
            <span className="inline-block h-6 w-1 shrink-0 rounded-full bg-emerald-400 sm:h-7" />
            {cleanTitle}
          </h2>
          <Link
            href={`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${currentPost.slug}`}
            onClick={() => {
              setSearchQuery("");
              setCanUndo(false);
            }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-cyan-300 transition-colors hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <Card className="overflow-hidden rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
          {/* Liseré tricolore : marque ce contenu comme un document officiel du Sénat */}
          <div className="flex h-[3px] w-full" aria-hidden="true">
            <div className="flex-1" style={{ backgroundColor: WHITE }} />
            <div className="flex-1" style={{ backgroundColor: RED }} />
            <div className="flex-1" style={{ backgroundColor: EMERALD }} />
          </div>
          <CardContent className="p-4 md:p-8">
            {hasTable ? (
              <DeliberationTable tableHtml={currentPost.content.rendered} showPagination={true} />
            ) : (
              <div
                className="prose prose-invert max-w-none text-white/80 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-cyan-300 [&_em]:text-cyan-200"
                dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation (précédent/suivant) */}
      {total > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={safeIndex === 0}
            className="group rounded-xl border-white/15 bg-transparent text-cyan-300/90 transition-colors hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-200 disabled:opacity-30"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Précédent
          </Button>

          <div className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="text-sm tabular-nums text-white/60">
              {safeIndex + 1} / {total}
            </span>
            <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={safeIndex === total - 1}
            className="group rounded-xl border-white/15 bg-transparent text-cyan-300/90 transition-colors hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-200 disabled:opacity-30"
          >
            Suivant
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      )}
    </div>
  );
}