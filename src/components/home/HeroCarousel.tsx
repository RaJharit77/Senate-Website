import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const WHITE = "#ffffff";

const slides = [
  {
    id: 1,
    category: "Sécurité",
    date: "Juin 2026",
    title: "PASSATION DE SERVICE AU NIVEAU DE LA DIRECTION DE LA SÉCURITÉ DU SÉNAT",
    excerpt:
      "La direction de la sécurité du Sénat procède à une passation de service.",
    image: "https://senat.mg/wp-content/uploads/2026/06/725227065_1699472914726718_9129482476983804719_n-1536x1023.jpeg",
    color: RED,
  },
  {
    id: 2,
    category: "Modernisation",
    date: "Avril 2026",
    title: "Opération d'enregistrement biométrique au Sénat",
    excerpt:
      "Le Sénat accueille une opération biométrique pour les sénateurs et le personnel dans le cadre de la modernisation administrative.",
    image: "https://senat.mg/wp-content/uploads/2026/06/721517407_1710420527793357_1880340436018856516_n-1536x863.jpg",
    color: RED,
  },
  {
    id: 3,
    category: "Fête nationale",
    date: "Juin 2026",
    title: "66ème anniversaire de l'Indépendance et de l'Armée Malagasy",
    excerpt:
      "Le Sénat célèbre solennellement le 66ème anniversaire de l'Indépendance en présence des autorités civiles et militaires.",
    image: "https://senat.mg/wp-content/uploads/2026/06/712744922_1697402302428513_5325818827058260357_n-1536x1024.jpg",
    color: RED,
  },
  {
    id: 4,
    category: "Solidarité",
    date: "Février 2026",
    title: "Don du Président du Sénat par intérim aux victimes du cyclone Gezani",
    excerpt:
      "Le Président du Sénat par intérim exprime la solidarité nationale en apportant une aide d'urgence aux populations sinistrées.",
    image: "https://senat.mg/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-13-at-08.02.14.jpeg",
    color: RED,
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
    }, 300); // correspond à la durée de transition
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "85vh", minHeight: "50vw", backgroundColor: "black" }}
    >
      {/* Image avec fondu complet pendant la transition */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center hero-image"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            willChange: "transform",
          }}
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,31,14,0.92) 0%, rgba(15,31,14,0.65) 45%, rgba(15,31,14,0.15) 100%)",
          }}
        />
      </div>

      {/* Contenu texte */}
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
                fontFamily: "'Inter', sans-serif",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <Calendar size={14} />
              {slide.date}
            </span>
          </div>

          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            {slide.title}
          </h1>

          <p
            className="mb-8"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 560,
              textShadow: "0 1px 12px rgba(0,0,0,0.2)",
            }}
          >
            {slide.excerpt}
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded transition-all hover:gap-4"
            style={{
              fontFamily: "'Inter', sans-serif",
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
            Lire l'article <ArrowRight size={16} />
          </a>
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

      {/* Numéro de slide */}
      <div
        className="absolute bottom-12 right-8"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: CYAN, fontSize: "1.1rem" }}>{String(current + 1).padStart(2, "0")}</span>
        {" "}/{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* Bande du drapeau malgache en bas */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: 10 }}
      >
        <div className="flex-1" style={{ backgroundColor: WHITE }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: GREEN }} />
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