"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { DeliberationTable } from "./DeliberationTable";

function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'");
}

interface ClientDeliberationListProps {
  posts: any[];
  initialIndex?: number;
  useRouterNavigation?: boolean; // Si true, utilise router.push pour changer l'URL
}

export function ClientDeliberationList({
  posts,
  initialIndex = 0,
  useRouterNavigation = false,
}: ClientDeliberationListProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = posts.length;
  const currentPost = posts[currentIndex];
  const cleanTitle = cleanText(currentPost.title.rendered);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (useRouterNavigation) {
        router.push(
          `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${posts[newIndex].slug}`
        );
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (useRouterNavigation) {
        router.push(
          `/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${posts[newIndex].slug}`
        );
      }
    }
  };

  return (
    <div>
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
            <DeliberationTable tableHtml={currentPost.content.rendered} showPagination={true} />
          </CardContent>
        </Card>
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="border-white/20 text-cyan-300/90 bg-transparent hover:text-cyan-400/90 hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
          </Button>
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {total}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className="border-white/20 text-cyan-300/90 hover:text-cyan-400/90 bg-transparent hover:bg-white/10 disabled:opacity-30"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}