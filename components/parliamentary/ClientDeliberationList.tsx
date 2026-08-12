"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Search, Undo2, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DeliberationTable } from "./DeliberationTable";
import { cleanText } from "@/utils/utility";

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

  const handlePrev = () => {
    if (safeIndex > 0) {
      const newIndex = safeIndex - 1;
      setCurrentIndex(newIndex);
      if (useRouterNavigation && filteredPosts[newIndex]) {
        router.push(
          `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${filteredPosts[newIndex].slug}`
        );
      }
    }
  };

  const handleNext = () => {
    if (safeIndex < total - 1) {
      const newIndex = safeIndex + 1;
      setCurrentIndex(newIndex);
      if (useRouterNavigation && filteredPosts[newIndex]) {
        router.push(
          `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${filteredPosts[newIndex].slug}`
        );
      }
    }
  };

  const searchBar = (
    <div className="mb-6 font-poppins">
      <div className="flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="text"
            placeholder="Rechercher dans toutes les délibérations..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-8 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-cyan-400/50 focus:ring-cyan-400/20"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
              title="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {canUndo && (
          <button
            onClick={undoSearch}
            className="flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 transition whitespace-nowrap px-2 py-2"
            title="Annuler et revenir à la recherche précédente"
          >
            <Undo2 className="h-4 w-4" /> Annuler
          </button>
        )}
      </div>
      {searchQuery && (
        <p className="text-sm text-white/40 mt-2">
          {total} résultat{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );

  // Si aucun article ne correspond à la recherche
  if (total === 0 || !currentPost) {
    return (
      <div>
        {searchBar}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center text-white/40 border border-white/10">
          Aucune délibération ne correspond à votre recherche.
        </div>
      </div>
    );
  }

  const cleanTitle = cleanText(currentPost.title.rendered);
  const hasTable = currentPost.content.rendered.includes("<table");

  return (
    <div className="font-poppins">
      {searchBar}

      {/* Contenu de la délibération courante */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="inline-block w-1 h-6 bg-emerald-400 rounded-full" />
            {cleanTitle}
          </h2>
          <Link
            href={`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${currentPost.slug}`}
            className="text-sm text-cyan-300 hover:text-cyan-200 transition flex items-center gap-1"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
        <Card className="bg-white/5 backdrop-blur-md rounded-3xl border-white/10 shadow-2xl overflow-hidden">
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
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={safeIndex === 0}
            className="border-white/20 text-cyan-300/90 bg-transparent hover:text-cyan-400/90 hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
          </Button>
          <span className="text-white/60 text-sm">
            {safeIndex + 1} / {total}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={safeIndex === total - 1}
            className="border-white/20 text-cyan-300/90 hover:text-cyan-400/90 bg-transparent hover:bg-white/10 disabled:opacity-30"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}