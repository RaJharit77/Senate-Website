import { User } from "lucide-react";

const senators = [
  {
    name: "NDREMANJARY",
    firstName: "Hery Tahiry",
    role: "Président du Sénat par intérim",
    region: "Analamanga",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&auto=format",
    color: "#8b1a1a",
  },
  {
    name: "RAKOTONDRABE",
    firstName: "Élisée",
    role: "1er Vice-Président",
    region: "Boeny",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format",
    color: "#5a3e6b",
  },
  {
    name: "RANDRIAMAHEFA",
    firstName: "Clarisse",
    role: "2ème Vice-Présidente",
    region: "Vakinankaratra",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format",
    color: "#1a4a6b",
  },
  {
    name: "ANDRIAMANANTENA",
    firstName: "Patrick",
    role: "Questeur",
    region: "Haute Matsiatra",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    color: "#2d5a3d",
  },
];

export function SenatorsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
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
              Bureau du Sénat
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
              Dirigeants &{" "}
              <em style={{ fontWeight: 400, color: "#6b5e52" }}>
                responsables
              </em>
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-primary border-b pb-0.5 hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderColor: "#8b1a1a",
            }}
          >
            Tous les sénateurs
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {senators.map((senator) => (
            <div
              key={senator.name}
              className="group cursor-pointer"
            >
              <div
                className="relative rounded-lg overflow-hidden mb-4"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={senator.image}
                  alt={`${senator.firstName} ${senator.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to top, ${senator.color}cc 0%, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform"
                >
                  <span
                    className="text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {senator.region}
                  </span>
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#1a1410",
                  letterSpacing: "0.02em",
                }}
              >
                {senator.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "#6b5e52",
                  marginTop: 2,
                }}
              >
                {senator.firstName}
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#8b1a1a",
                }}
              >
                {senator.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
