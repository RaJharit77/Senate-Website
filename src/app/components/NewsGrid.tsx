import { ArrowRight, Calendar } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const news = [
  {
    id: 1,
    category: "Éducation",
    categoryColor: GREEN,
    date: "12 Juin 2026",
    title: "Bénédiction de la chapelle du Lycée Sacré-Cœur de Tsaramasay",
    excerpt:
      "Une délégation sénatoriale a participé à la cérémonie de bénédiction de la chapelle rénovée, symbole du soutien du Sénat à l'éducation nationale.",
    image: "https://images.unsplash.com/photo-1577127340773-95e40d0d4b0a?w=700&h=440&fit=crop&auto=format",
  },
  {
    id: 2,
    category: "Administration",
    categoryColor: CYAN,
    date: "5 Juin 2026",
    title: "Opération d'enregistrement biométrique au Sénat",
    excerpt:
      "Le Sénat accueille une opération biométrique pour les sénateurs et le personnel dans le cadre de la modernisation administrative.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=700&h=440&fit=crop&auto=format",
  },
  {
    id: 3,
    category: "Fête nationale",
    categoryColor: RED,
    date: "26 Juin 2026",
    title: "66ème anniversaire de l'Indépendance et de l'Armée Malagasy",
    excerpt:
      "Le Sénat célèbre solennellement le 66ème anniversaire de l'Indépendance en présence des autorités civiles et militaires.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=440&fit=crop&auto=format",
  },
  {
    id: 4,
    category: "Jeunesse",
    categoryColor: GREEN,
    date: "20 Mai 2026",
    title: "Visite d'étudiants au palais du Sénat de Madagascar",
    excerpt:
      "Des lycéens et étudiants ont visité le Sénat pour découvrir les mécanismes démocratiques et le fonctionnement de la chambre haute.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=440&fit=crop&auto=format",
  },
  {
    id: 5,
    category: "Régions",
    categoryColor: CYAN,
    date: "10 Mai 2026",
    title: "Le Président du Sénat représente l'institution à Farafangana",
    excerpt:
      "Le Président du Sénat par intérim représente l'institution lors du 30ème anniversaire du SEJAFA à Farafangana.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=440&fit=crop&auto=format",
  },
  {
    id: 6,
    category: "Solidarité",
    categoryColor: RED,
    date: "28 Avril 2026",
    title: "Don aux victimes du cyclone Fytia dans le Sud",
    excerpt:
      "Le Sénat organise une collecte et remet des dons aux populations sinistrées par le cyclone Fytia.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&h=440&fit=crop&auto=format",
  },
];

function BigCard({ article }: { article: typeof news[0] }) {
  return (
    <article className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ aspectRatio: "4/3" }}>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
      />
      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,25,10,0.93) 0%, rgba(10,25,10,0.4) 55%, transparent 100%)",
        }}
      />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-sm text-white"
            style={{
              backgroundColor: article.categoryColor,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.category}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}
          >
            <Calendar size={11} />
            {article.date}
          </span>
        </div>
        <h3
          className="text-white mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {article.title}
        </h3>
        <p
          className="mb-4 hidden sm:block"
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {article.excerpt}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-white border-b pb-0.5 transition-all hover:gap-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderColor: article.categoryColor,
          }}
        >
          Lire la suite <ArrowRight size={11} />
        </a>
      </div>
    </article>
  );
}

function SmallCard({ article }: { article: typeof news[0] }) {
  return (
    <article
      className="group flex gap-4 bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md"
      style={{ borderColor: "rgba(15,31,14,0.08)" }}
    >
      <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 88, height: 88 }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span
          className="mb-1"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: article.categoryColor,
          }}
        >
          {article.category}
        </span>
        <h4
          className="mb-1 transition-colors group-hover:text-primary"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#0f1f0e",
          }}
        >
          {article.title}
        </h4>
        <span
          className="flex items-center gap-1"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#4a6648" }}
        >
          <Calendar size={10} />
          {article.date}
        </span>
      </div>
    </article>
  );
}

export function NewsGrid() {
  return (
    <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {/* Three-color decorator line — logo colors */}
            <div className="flex gap-1 mb-3">
              <div className="h-1 rounded-full w-8" style={{ backgroundColor: GREEN }} />
              <div className="h-1 rounded-full w-4" style={{ backgroundColor: RED }} />
              <div className="h-1 rounded-full w-4" style={{ backgroundColor: CYAN }} />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GREEN,
                marginBottom: "0.5rem",
              }}
            >
              Actualités du Sénat
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "#0f1f0e",
                lineHeight: 1.2,
              }}
            >
              Dernières nouvelles{" "}
              <em style={{ fontWeight: 400, color: RED }}>& événements</em>
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              backgroundColor: GREEN,
              color: "#fff",
            }}
          >
            Toutes les actualités <ArrowRight size={13} />
          </a>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Two big cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {news.slice(0, 2).map((a) => <BigCard key={a.id} article={a} />)}
          </div>

          {/* Four small cards */}
          <div className="flex flex-col gap-4">
            {news.slice(2, 6).map((a) => <SmallCard key={a.id} article={a} />)}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {news.slice(0, 3).map((a) => (
            <article
              key={a.id + "b"}
              className="group bg-white rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-md flex flex-col"
              style={{ borderColor: "rgba(15,31,14,0.08)" }}
            >
              <div className="overflow-hidden" style={{ height: 160 }}>
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div
                  className="w-full h-0.5 mb-3 rounded-full"
                  style={{ backgroundColor: a.categoryColor, opacity: 0.6 }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.63rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: a.categoryColor,
                    marginBottom: 6,
                  }}
                >
                  {a.category}
                </span>
                <h4
                  className="group-hover:text-primary transition-colors flex-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "#0f1f0e",
                  }}
                >
                  {a.title}
                </h4>
                <div
                  className="flex items-center justify-between mt-3 pt-3 border-t"
                  style={{ borderColor: "rgba(15,31,14,0.08)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      color: "#4a6648",
                    }}
                  >
                    {a.date}
                  </span>
                  <ArrowRight size={13} style={{ color: a.categoryColor }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
