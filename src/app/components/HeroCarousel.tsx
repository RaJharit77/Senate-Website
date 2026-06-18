import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const slides = [
  {
    id: 1,
    category: "Santé Publique",
    date: "Avril 2026",
    title: "Campagne de dépistage gratuit du diabète au Sénat",
    excerpt:
      "Le Sénat de Madagascar organise une campagne de sensibilisation et de dépistage gratuit du diabète pour le personnel et les citoyens.",
    image:
      "https://images.unsplash.com/photo-1764974012572-37fccd3483ef?w=1400&h=800&fit=crop&auto=format",
    color: RED,
  },
  {
    id: 2,
    category: "Droits de la Femme",
    date: "Mars 2026",
    title: "Célébration de la Journée internationale des droits de la femme",
    excerpt:
      "Le Sénat honore les femmes sénatrices et le personnel féminin lors de la Journée internationale des droits de la femme.",
    image:
      "https://images.unsplash.com/photo-1780396269429-e20eaa1a1cd2?w=1400&h=800&fit=crop&auto=format",
    color: GREEN,
  },
  {
    id: 3,
    category: "Solidarité nationale",
    date: "Février 2026",
    title: "Don aux victimes du cyclone Gezani — Solidarité sénatoriale",
    excerpt:
      "Le Président du Sénat par intérim exprime la solidarité nationale en apportant une aide d'urgence aux populations sinistrées.",
    image:
      "https://images.unsplash.com/photo-1719849748001-d11361fe520c?w=1400&h=800&fit=crop&auto=format",
    color: CYAN,
  },
  {
    id: 4,
    category: "Diplomatie Parlementaire",
    date: "Janvier 2026",
    title: "Visite de courtoisie de la délégation de l'Union Africaine",
    excerpt:
      "Une délégation de l'Union Africaine a été reçue au Sénat, renforçant les liens de coopération parlementaire continentale.",
    image:
      "https://images.unsplash.com/photo-1762246433096-1814033d4679?w=1400&h=800&fit=crop&auto=format",
    color: GREEN,
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const go = (idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((idx + slides.length) % slides.length);
      setTransitioning(false);
    }, 350);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" style={{ height: "clamp(480px, 60vh, 640px)" }}>
      {/* Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: transitioning ? 0.5 : 1 }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay — deep green on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,31,14,0.92) 0%, rgba(15,31,14,0.7) 45%, rgba(15,31,14,0.15) 100%)",
          }}
        />
      </div>

      {/* Left accent stripe — logo colors */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col" style={{ width: 5 }}>
        <div className="flex-1" style={{ backgroundColor: GREEN }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: CYAN }} />
      </div>

      {/* Content */}
      <div
        className="relative h-full max-w-7xl mx-auto px-8 sm:px-10 flex flex-col justify-center"
        style={{
          transition: "opacity 0.4s",
          opacity: transitioning ? 0 : 1,
        }}
      >
        <div className="max-w-xl">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-sm text-white"
              style={{
                backgroundColor: slide.color,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <Calendar size={12} />
              {slide.date}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.22,
              letterSpacing: "-0.01em",
            }}
          >
            {slide.title}
          </h1>

          {/* Excerpt */}
          <p
            className="mb-8"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "1rem",
              lineHeight: 1.72,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480,
            }}
          >
            {slide.excerpt}
          </p>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded transition-all hover:gap-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: GREEN,
              color: "#ffffff",
              border: `2px solid ${GREEN}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = CYAN;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = GREEN;
              (e.currentTarget as HTMLElement).style.borderColor = GREEN;
            }}
          >
            Lire l'article <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-8 sm:left-10 flex items-center gap-4">
        <button
          onClick={() => go(current - 1)}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
        >
          <ChevronLeft size={16} />
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
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide number */}
      <div
        className="absolute bottom-8 right-8"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: CYAN, fontSize: "1rem" }}>{String(current + 1).padStart(2, "0")}</span>
        {" "}/{" "}
        {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
