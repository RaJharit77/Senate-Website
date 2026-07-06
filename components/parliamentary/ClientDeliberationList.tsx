"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
}

export function ClientDeliberationList({ posts }: ClientDeliberationListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = posts.length;
  const currentPost = posts[currentIndex];
  const cleanTitle = cleanText(currentPost.title.rendered);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="inline-block w-1 h-6 bg-emerald-400 rounded-full" />
          {cleanTitle}
        </h2>
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
            className="border-white/20 text-cyan-300/90  bg-transparent hover:text-cyan-400/90 hover:bg-white/10 disabled:opacity-30"
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