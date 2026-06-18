import { BookOpen, Users, Scale, Globe } from "lucide-react";

const stats = [
  { value: "63", label: "Sénateurs", desc: "4ème République, 2ème Législature" },
  { value: "23", label: "Régions", desc: "représentées au Sénat" },
  { value: "1994", label: "Fondation", desc: "du Sénat malagasy moderne" },
  { value: "2", label: "Chambres", desc: "du Parlement de Madagascar" },
];

const pillars = [
  {
    icon: Scale,
    title: "Missions législatives",
    desc: "Le Sénat examine et vote les lois, contrôle l'action du gouvernement et représente les collectivités territoriales décentralisées.",
  },
  {
    icon: Users,
    title: "Représentation territoriale",
    desc: "Chaque région de Madagascar est représentée au Sénat, garantissant l'équilibre entre les territoires dans le processus législatif.",
  },
  {
    icon: Globe,
    title: "Coopération internationale",
    desc: "Le Sénat entretient des relations parlementaires avec les institutions sœurs d'Afrique et du monde à travers les groupes d'amitié.",
  },
  {
    icon: BookOpen,
    title: "Tradition démocratique",
    desc: "Institution garante de la stabilité constitutionnelle, le Sénat veille au respect de la légalité et des droits fondamentaux.",
  },
];

export function AboutSection() {
  return (
    <section style={{ backgroundColor: "#1a0d0d" }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#c9932a",
                marginBottom: "1rem",
              }}
            >
              À propos du Sénat
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              La chambre haute du
              <br />
              <em style={{ color: "#c9932a", fontWeight: 400 }}>
                Parlement Malagasy
              </em>
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "1.25rem",
              }}
            >
              Le Sénat de Madagascar est la chambre haute du Parlement
              bicaméral de la République de Madagascar. Instituée par la
              Constitution de la IVème République, il représente les
              collectivités territoriales décentralisées et participe au
              processus législatif national.
            </p>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Composé de sénateurs élus et nommés, le Sénat joue un rôle
              essentiel dans l'équilibre des pouvoirs, la stabilité
              institutionnelle et la représentation de l'ensemble du territoire
              malagasy.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-16" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center text-center py-10 px-6"
              style={{ backgroundColor: "#1a0d0d" }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#c9932a",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-lg p-6 border transition-all hover:border-accent cursor-pointer"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="w-10 h-10 rounded flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(139,26,26,0.3)" }}
              >
                <pillar.icon size={18} style={{ color: "#c9932a" }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
