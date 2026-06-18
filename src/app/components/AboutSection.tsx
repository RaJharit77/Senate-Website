import { BookOpen, Users, Scale, Globe } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const GREEN_DARK = "#0f3a0c";

const stats = [
  { value: "63", label: "Sénateurs", desc: "4ème République, 2ème Législature", color: GREEN },
  { value: "23", label: "Régions", desc: "représentées au Sénat", color: RED },
  { value: "1994", label: "Fondation", desc: "du Sénat malagasy moderne", color: CYAN },
  { value: "2", label: "Chambres", desc: "du Parlement de Madagascar", color: GREEN },
];

const pillars = [
  {
    icon: Scale,
    title: "Missions législatives",
    desc: "Le Sénat examine et vote les lois, contrôle l'action du gouvernement et représente les collectivités territoriales décentralisées de Madagascar.",
    color: GREEN,
  },
  {
    icon: Users,
    title: "Représentation territoriale",
    desc: "Chaque région de Madagascar est représentée au Sénat, garantissant l'équilibre entre les territoires dans le processus législatif national.",
    color: RED,
  },
  {
    icon: Globe,
    title: "Coopération internationale",
    desc: "Le Sénat entretient des relations parlementaires avec les institutions d'Afrique et du monde à travers les groupes interparlementaires.",
    color: CYAN,
  },
  {
    icon: BookOpen,
    title: "Tradition démocratique",
    desc: "Garant de la stabilité constitutionnelle, le Sénat veille au respect de la légalité et des droits fondamentaux de tous les Malagasy.",
    color: GREEN,
  },
];

export function AboutSection() {
  return (
    <section style={{ backgroundColor: GREEN_DARK }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div>
            {/* Flag colors accent bar */}
            <div className="flex mb-6" style={{ height: 4, gap: 3, width: 80 }}>
              <div className="flex-1 rounded-full" style={{ backgroundColor: "#fff" }} />
              <div className="flex-1 rounded-full" style={{ backgroundColor: RED }} />
              <div className="flex-1 rounded-full" style={{ backgroundColor: GREEN }} />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: CYAN,
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
              <em style={{ color: CYAN, fontStyle: "italic", fontWeight: 400 }}>
                Parlement Malagasy
              </em>
            </h2>
          </div>
          <div className="space-y-4">
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "1.05rem",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.68)",
              }}
            >
              Le Sénat de Madagascar est la chambre haute du Parlement bicaméral de la République de Madagascar. Instituée par la Constitution de la IVème République, il représente les collectivités territoriales décentralisées et participe au processus législatif national.
            </p>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "1.05rem",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.68)",
              }}
            >
              Composé de sénateurs élus et nommés, il joue un rôle essentiel dans l'équilibre des pouvoirs, la stabilité institutionnelle et la représentation du territoire.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mt-2 transition-all hover:opacity-80"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor: GREEN,
                color: "#fff",
                border: `2px solid ${CYAN}33`,
              }}
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden mb-16"
          style={{ border: `1px solid rgba(255,255,255,0.06)` }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="flex flex-col items-center text-center py-10 px-6 relative"
              style={{
                backgroundColor: `rgba(255,255,255,0.03)`,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {/* Top color accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                style={{ width: 40, height: 4, backgroundColor: stat.color }}
              />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "3.2rem",
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
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
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-xl p-6 border cursor-pointer transition-all hover:border-opacity-100"
              style={{
                borderColor: `${pillar.color}33`,
                backgroundColor: `${pillar.color}0d`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${pillar.color}88`;
                (e.currentTarget as HTMLElement).style.backgroundColor = `${pillar.color}1a`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${pillar.color}33`;
                (e.currentTarget as HTMLElement).style.backgroundColor = `${pillar.color}0d`;
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${pillar.color}22` }}
              >
                <pillar.icon size={20} style={{ color: pillar.color }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
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
                  fontSize: "0.84rem",
                  lineHeight: 1.68,
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
