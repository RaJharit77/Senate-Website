import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const slides = [
  {
    id: 1,
    category: "Santé Publique",
    date: "Avril 2026",
    title: "Campagne de dépistage gratuit du diabète au Sénat",
    excerpt:
      "Le Sénat de Madagascar organise une campagne de sensibilisation et de dépistage gratuit du diabète pour le personnel et les citoyens, renforçant son engagement envers la santé publique.",
    image:
      "https://images.unsplash.com/photo-1764974012572-37fccd3483ef?w=1400&h=700&fit=crop&auto=format",
    tag: "Initiative sociale",
  },
  {
    id: 2,
    category: "Droits des femmes",
    date: "Mars 2026",
    title: "Célébration de la Journée internationale des droits de la femme",
    excerpt:
      "Le Sénat honore les femmes sénatrices et le personnel féminin lors de la Journée internationale des droits de la femme, réaffirmant son engagement pour l'égalité.",
    image:
      "https://images.unsplash.com/photo-1780396269429-e20eaa1a1cd2?w=1400&h=700&fit=crop&auto=format",
    tag: "Égalité & Genre",
  },
  {
    id: 3,
    category: "Solidarité nationale",
    date: "Février 2026",
    title: "Don du Président du Sénat aux victimes du cyclone Gezani",
    excerpt:
      "Le Président du Sénat par intérim exprime la solidarité nationale en apportant une aide d'urgence aux populations victimes du passage dévastateur du cyclone Gezani.",
    image:
      "https://images.unsplash.com/photo-1719849748001-d11361fe520c?w=1400&h=700&fit=crop&auto=format",
    tag: "Action humanitaire",
  },
  {
    id: 4,
    category: "Diplomatie parlementaire",
    date: "Janvier 2026",
    title: "Visite de courtoisie d'une délégation de l'Union Africaine",
    excerpt:
      "Une délégation de haut rang de l'Union Africaine a été reçue au Sénat de Madagascar, renforçant les liens de coopération parlementaire sur le continent.",
    image:
      "https://images.unsplash.com/photo-1762246433096-1814033d4679?w=1400&h=700&fit=crop&auto=format",
    tag: "Relations internationales",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" style={{ height: "580px" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: animating ? 0.6 : 1 }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,10,10,0.88) 0%, rgba(26,10,10,0.55) 55%, rgba(26,10,10,0.1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-16"
        style={{ transition: "opacity 0.4s", opacity: animating ? 0 : 1 }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block px-3 py-1 text-white rounded-sm"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                background: "#8b1a1a",
              }}
            >
              {slide.tag}
            </span>
            <span
              className="flex items-center gap-1.5 text-white/60"
              style={{ fontSize: "0.78rem", fontFamily: "'Inter', sans-serif" }}
            >
              <Calendar size={12} />
              {slide.date}
            </span>
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {slide.title}
          </h1>

          <p
            className="text-white/75 mb-8"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "540px",
            }}
          >
            {slide.excerpt}
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-white border-b-2 pb-0.5 transition-colors hover:border-accent"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderColor: "#c9932a",
            }}
          >
            Lire l'article
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3">
        <button
          onClick={() => go(current - 1)}
          className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all rounded-full"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? "#c9932a" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(current + 1)}
          className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide counter */}
      <div
        className="absolute top-6 right-6 text-white/50"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
