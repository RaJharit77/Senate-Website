"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CYAN, EMERALD, GRAY, GREEN, RED, WHITE } from "@/utils/colors";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K";

interface Slide {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  color: string;
  link?: string;
}

// Fonction pour tronquer l'excerpt
function truncateExcerpt(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

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
  // Vérifier si l'URL est valide (non vide, commence par http ou data,
  // et n'est pas l'ancienne image par défaut du thème WP qui n'existe plus)
  const isValidImage =
    !!slide.image &&
    slide.image.trim() !== "" &&
    (slide.image.startsWith("http") || slide.image.startsWith("data")) &&
    !slide.image.includes("/wp-content/themes/") &&
    !slide.image.endsWith("default.jpg");
  const imageSrc = isValidImage ? slide.image : PLACEHOLDER_IMAGE;
  const truncatedExcerpt = truncateExcerpt(slide.excerpt, 120);

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
          alt={slide.title}
          fill
          className="object-cover hero-image"
          priority
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
            <span
              className="inline-flex items-center px-3 py-1 rounded-sm text-white"
              style={{
                backgroundColor: slide.color,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {slide.category}
            </span>
            <span
              className="flex items-center gap-1.5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem",
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
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          <p
            className="mb-8"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: GRAY,
              maxWidth: 560,
              textShadow: "0 1px 12px rgba(0,0,0,0.2)",
            }}
          >
            {truncatedExcerpt}
          </p>

          <Link
            href={slide.link || "#"}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded transition-all hover:gap-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: GREEN,
              color: "#ffffff",
              border: `2px solid ${GREEN}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = CYAN;
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(91,200,222,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = GREEN;
              (e.currentTarget as HTMLElement).style.borderColor = GREEN;
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            }}
          >
            Lire l&apos;article <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="absolute bottom-12 left-8 sm:left-10 flex items-center gap-4">
        <button
          onClick={() => go(current - 1)}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
        >
          <ChevronLeft size={18} />
        </button>
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
        <button
          onClick={() => go(current + 1)}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        className="absolute bottom-12 right-8"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: CYAN, fontSize: "1.1rem" }}>{String(current + 1).padStart(2, "0")}</span>
        {" / "}
        {String(slides.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
        <div className="flex-1" style={{ backgroundColor: WHITE }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: EMERALD }} />
      </div>

      <style>{`
        .hero-image {
          animation: slowZoom 8s ease-in-out forwards;
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}