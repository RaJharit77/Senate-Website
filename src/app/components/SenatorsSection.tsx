import { ArrowRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const leadership = [
  {
    name: "NDREMANJARY",
    firstName: "Hery Tahiry",
    role: "Président du Sénat par intérim",
    region: "Analamanga",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=480&fit=crop&auto=format",
    accentColor: GREEN,
  },
  {
    name: "RAKOTONDRABE",
    firstName: "Élisée",
    role: "1er Vice-Président",
    region: "Boeny",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&auto=format",
    accentColor: RED,
  },
  {
    name: "RANDRIAMAHEFA",
    firstName: "Clarisse",
    role: "2ème Vice-Présidente",
    region: "Vakinankaratra",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=480&fit=crop&auto=format",
    accentColor: CYAN,
  },
  {
    name: "ANDRIAMANANTENA",
    firstName: "Patrick",
    role: "Questeur",
    region: "Haute Matsiatra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&auto=format",
    accentColor: GREEN,
  },
];

export function SenatorsSection() {
  return (
    <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex gap-1 mb-3" style={{ height: 3 }}>
              <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
              <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
              <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
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
              Bureau du Sénat
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                fontWeight: 700,
                color: "#0f1f0e",
                lineHeight: 1.2,
              }}
            >
              Dirigeants &{" "}
              <em style={{ fontWeight: 400, color: RED }}>responsables</em>
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              backgroundColor: GREEN,
              color: "#fff",
            }}
          >
            Tous les sénateurs <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person) => (
            <div key={person.name} className="group cursor-pointer">
              {/* Photo */}
              <div
                className="relative rounded-2xl overflow-hidden mb-4"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={person.image}
                  alt={`${person.firstName} ${person.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to top, ${person.accentColor}cc 0%, transparent 55%)`,
                  }}
                />
                {/* Region badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: person.accentColor,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {person.region}
                </div>
              </div>

              {/* Color accent bar */}
              <div
                className="h-0.5 rounded-full mb-3"
                style={{ backgroundColor: person.accentColor, width: 36 }}
              />

              {/* Text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: person.accentColor,
                  marginBottom: 2,
                  textTransform: "uppercase",
                }}
              >
                {person.role}
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0f1f0e",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                }}
              >
                {person.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "#4a6648",
                  marginTop: 2,
                }}
              >
                {person.firstName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
