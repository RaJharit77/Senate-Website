import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

const partners = [
  { name: "Assemblée Nationale", abbr: "AN" },
  { name: "Haute Cour Constitutionnelle", abbr: "HCC" },
  { name: "Parlement Panafricain", abbr: "PAP" },
  { name: "Union Inter-Parlementaire", abbr: "UIP" },
  { name: "Assemblée Parlementaire de la Francophonie", abbr: "APF" },
  { name: "Friedrich Ebert Stiftung", abbr: "FES" },
];

const footerLinks = [
  {
    title: "Institution",
    links: ["À propos du Sénat", "Historique", "Structures", "Bureau du Sénat", "Séances plénières"],
  },
  {
    title: "Travaux",
    links: ["Travaux législatifs", "Calendrier parlementaire", "Textes adoptés", "Rapports", "Journal officiel"],
  },
  {
    title: "Relations",
    links: ["International", "Groupe d'amitié", "Coopération APF", "Union Africaine", "Espace Presse"],
  },
];

export function Footer() {
  return (
    <footer>
      {/* Partners */}
      <div className="py-12 px-4 sm:px-6 border-t" style={{ backgroundColor: "#f8f7f4", borderColor: "rgba(26,20,16,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6b5e52",
            }}
          >
            Partenaires & Organisations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {partners.map((partner) => (
              <a
                key={partner.abbr}
                href="#"
                className="flex items-center gap-2.5 px-5 py-3 bg-white rounded-lg border transition-shadow hover:shadow-md"
                style={{ borderColor: "rgba(26,20,16,0.08)" }}
              >
                <div
                  className="flex items-center justify-center rounded text-white"
                  style={{
                    width: 32,
                    height: 32,
                    background: "linear-gradient(135deg, #8b1a1a, #c9932a)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                  }}
                >
                  {partner.abbr}
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#1a1410",
                    maxWidth: 140,
                    lineHeight: 1.2,
                  }}
                >
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ backgroundColor: "#1a0d0d" }} className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center rounded-full text-white"
                style={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #8b1a1a 60%, #c9932a)",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                S
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#ffffff",
                    lineHeight: 1.1,
                  }}
                >
                  Sénat
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                  }}
                >
                  République de Madagascar
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1.5rem",
                maxWidth: 340,
              }}
            >
              Le Sénat de Madagascar, chambre haute du Parlement, représente
              les collectivités territoriales et participe à l'élaboration des
              lois de la République.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c9932a",
                  marginBottom: "1.25rem",
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors hover:text-white"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div
          className="max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:contact@senat.mg"
              className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}
            >
              <Mail size={13} />
              contact@senat.mg
            </a>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}
            >
              <MapPin size={13} />
              BP 806 Anosikely, Antananarivo 101
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Sénat / DSIC — République de Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}
