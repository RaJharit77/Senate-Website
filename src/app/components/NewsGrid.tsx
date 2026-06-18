import { ArrowRight, Calendar, Tag } from "lucide-react";

const news = [
  {
    id: 1,
    category: "Éducation",
    date: "12 Juin 2026",
    title: "Bénédiction de la chapelle du Lycée Sacré-Cœur de Tsaramasay",
    excerpt:
      "Une délégation sénatoriale a participé à la cérémonie de bénédiction de la chapelle rénovée du Lycée Sacré-Cœur de Jésus de Tsaramasay, symbole du soutien du Sénat à l'éducation.",
    image:
      "https://images.unsplash.com/photo-1577127340773-95e40d0d4b0a?w=600&h=380&fit=crop&auto=format",
  },
  {
    id: 2,
    category: "Administration",
    date: "5 Juin 2026",
    title: "Opération d'enregistrement biométrique au Sénat",
    excerpt:
      "Le Sénat a accueilli une opération d'enregistrement biométrique pour les sénateurs et le personnel, dans le cadre de la modernisation administrative de l'État malagasy.",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=380&fit=crop&auto=format",
  },
  {
    id: 3,
    category: "Fête nationale",
    date: "26 Juin 2026",
    title: "66ème anniversaire de l'Indépendance et de l'Armée Malagasy",
    excerpt:
      "Le Sénat de Madagascar a solennellement célébré le 66ème anniversaire de l'Indépendance nationale en présence des sénateurs, des autorités civiles et militaires.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=380&fit=crop&auto=format",
  },
  {
    id: 4,
    category: "Jeunesse",
    date: "20 Mai 2026",
    title: "Visite d'étudiants au palais du Sénat",
    excerpt:
      "Des lycéens et étudiants de la capitale ont visité le Sénat de Madagascar pour découvrir le fonctionnement de la chambre haute du Parlement et les mécanismes démocratiques.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=380&fit=crop&auto=format",
  },
  {
    id: 5,
    category: "Régions",
    date: "10 Mai 2026",
    title: "Le Président du Sénat à l'anniversaire du SEJAFA à Farafangana",
    excerpt:
      "Le Président du Sénat par intérim a représenté l'institution lors du 30ème anniversaire du SEJAFA à Farafangana, témoignant de l'ancrage territorial du Sénat.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=380&fit=crop&auto=format",
  },
  {
    id: 6,
    category: "Solidarité",
    date: "28 Avril 2026",
    title: "Don aux victimes du cyclone Fytia dans le Sud de Madagascar",
    excerpt:
      "Le Sénat a organisé une collecte et remis des dons aux populations sinistrées par le cyclone Fytia, affectant plusieurs régions du Sud de Madagascar.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=380&fit=crop&auto=format",
  },
];

function NewsCard({ article, featured = false }: { article: typeof news[0]; featured?: boolean }) {
  return (
    <article
      className="group bg-card rounded-lg overflow-hidden border transition-shadow hover:shadow-lg cursor-pointer flex flex-col"
      style={{ borderColor: "rgba(26,20,16,0.08)" }}
    >
      <div className="overflow-hidden" style={{ height: featured ? 240 : 180 }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="inline-flex items-center gap-1"
            style={{
              fontSize: "0.7rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8b1a1a",
            }}
          >
            <Tag size={10} />
            {article.category}
          </span>
          <span
            className="flex items-center gap-1 text-muted-foreground"
            style={{ fontSize: "0.72rem", fontFamily: "'Inter', sans-serif" }}
          >
            <Calendar size={10} />
            {article.date}
          </span>
        </div>
        <h3
          className="mb-2 group-hover:text-primary transition-colors"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: featured ? "1.15rem" : "1rem",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#1a1410",
          }}
        >
          {article.title}
        </h3>
        {featured && (
          <p
            className="text-muted-foreground mb-4 flex-1"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "0.88rem",
              lineHeight: 1.65,
            }}
          >
            {article.excerpt}
          </p>
        )}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 mt-auto pt-3 border-t transition-colors hover:text-primary"
          style={{
            fontSize: "0.75rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6b5e52",
            borderColor: "rgba(26,20,16,0.08)",
          }}
        >
          Lire la suite <ArrowRight size={12} />
        </a>
      </div>
    </article>
  );
}

export function NewsGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8b1a1a",
              marginBottom: "0.5rem",
            }}
          >
            Actualités
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 700,
              color: "#1a1410",
              lineHeight: 1.2,
            }}
          >
            Dernières nouvelles
            <br />
            <em style={{ fontWeight: 400, color: "#6b5e52" }}>du Sénat</em>
          </h2>
        </div>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-2 border-b pb-0.5 transition-colors hover:text-primary"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#8b1a1a",
            borderColor: "#8b1a1a",
          }}
        >
          Toutes les actualités <ArrowRight size={13} />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 2).map((article) => (
          <NewsCard key={article.id} article={article} featured />
        ))}
        <div className="flex flex-col gap-4">
          {news.slice(2, 5).map((article) => (
            <article
              key={article.id}
              className="group flex gap-4 bg-card rounded-lg border p-4 transition-shadow hover:shadow-md cursor-pointer"
              style={{ borderColor: "rgba(26,20,16,0.08)" }}
            >
              <div
                className="flex-shrink-0 rounded overflow-hidden"
                style={{ width: 80, height: 80 }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#8b1a1a",
                    marginBottom: 4,
                  }}
                >
                  {article.category}
                </span>
                <h4
                  className="group-hover:text-primary transition-colors"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "#1a1410",
                  }}
                >
                  {article.title}
                </h4>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "'Inter', sans-serif",
                    color: "#6b5e52",
                    marginTop: 4,
                  }}
                >
                  {article.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Last row */}
      <div className="mt-6">
        <NewsCard article={news[5]} />
      </div>
    </section>
  );
}
