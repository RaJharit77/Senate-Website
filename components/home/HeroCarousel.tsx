"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CYAN, EMERALD, GRAY, GREEN, RED, WHITE } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cleanText } from "@/utils/utility";
import { Slide } from "@/types/homeType";
import { PLACEHOLDER_IMAGE, truncateExcerpt } from "@/utils/home";

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const go = useCallback(
    (idx: number) => {
      if (transitioning || slides.length === 0) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((idx + slides.length) % slides.length);
        setTransitioning(false);
      }, 300);
    },
    [slides.length, transitioning]
  );

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(t);
  }, [current, go, slides.length]);

  if (!slides.length) return null;

  const slide = slides[current];
  const isValidImage =
    !!slide.image &&
    slide.image.trim() !== "" &&
    (slide.image.startsWith("http") || slide.image.startsWith("data")) &&
    !slide.image.includes("/wp-content/themes/") &&
    !slide.image.endsWith("default.jpg");
  const imageSrc = isValidImage ? slide.image : PLACEHOLDER_IMAGE;
  const truncatedExcerpt = truncateExcerpt(slide.excerpt, 120);

  const cleanTitle = cleanText(slide.title);
  const cleanExcerpt = cleanText(truncatedExcerpt);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "85vh", minHeight: "500px", backgroundColor: "black" }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <Image
          key={slide.id}
          src={imageSrc}
          alt={cleanText(slide.title)}
          fill
          className="object-cover hero-image"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={!isValidImage}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,31,14,0.92) 0%, rgba(15,31,14,0.65) 45%, rgba(15,31,14,0.15) 100%)",
          }}
        />
      </div>

      <div
        className="relative h-full max-w-7xl mx-auto px-8 sm:px-10 flex flex-col justify-center"
        style={{
          transition: "opacity 0.3s",
          opacity: transitioning ? 0 : 1,
        }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Badge
              className="px-3 py-1 rounded-sm text-white font-bold tracking-widest uppercase text-[0.7rem]"
              style={{
                backgroundColor: slide.color,
                border: "none",
              }}
            >
              {slide.category}
            </Badge>
            <span
              className="flex items-center gap-1.5 text-sm"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: GRAY,
              }}
            >
              <Calendar size={14} />
              {slide.date}
            </span>
          </div>

          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
            dangerouslySetInnerHTML={{ __html: cleanTitle }}
          />

          <p
            className="mb-8 max-w-[560px] text-base leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: GRAY,
              textShadow: "0 1px 12px rgba(0,0,0,0.2)",
            }}
          >
            {cleanExcerpt}
          </p>

          <Button
            asChild
            className="group inline-flex items-center gap-2.5 px-7 py-5 rounded-lg transition-all hover:gap-4 font-semibold uppercase tracking-wide text-[0.85rem]"
            style={{
              backgroundColor: GREEN,
              border: `2px solid ${GREEN}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = EMERALD;
              btn.style.borderColor = EMERALD;
              btn.style.boxShadow = "0 4px 30px rgba(91,200,222,0.4)";
              btn.style.color = "black";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = GREEN;
              btn.style.borderColor = GREEN;
              btn.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              btn.style.color = "white";
            }}
          >
            <Link href={slide.link || "/"} className="flex items-center gap-2.5">
              Lire l&apos;article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-12 left-8 sm:left-10 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-2 border-white/50 bg-transparent text-white/70 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all"
          onClick={() => go(current - 1)}
        >
          <ChevronLeft size={18} />
        </Button>

        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                backgroundColor: i === current ? slides[i].color : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-2 border-white/50 bg-transparent text-white/70 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all"
          onClick={() => go(current + 1)}
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      <div
        className="absolute bottom-12 right-8 text-sm font-semibold tracking-wide"
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <span style={{ color: CYAN, fontSize: "1.1rem" }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        {" / "}
        {String(slides.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
        <div className="flex-1" style={{ backgroundColor: WHITE }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: EMERALD }} />
      </div>
    </section>
  );
}