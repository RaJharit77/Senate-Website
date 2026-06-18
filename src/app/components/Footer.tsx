import { Facebook, Youtube, Mail, MapPin, ArrowRight } from "lucide-react";

const GREEN = "#1a5c16";
const GREEN_DARK = "#0f3a0c";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const partners = [
  { name: "Assemblée Nationale", abbr: "AN", color: RED },
  { name: "Haute Cour Constitutionnelle", abbr: "HCC", color: GREEN },
  { name: "Parlement Panafricain", abbr: "PAP", color: CYAN },
  { name: "Union Inter-Parlementaire", abbr: "UIP", color: GREEN },
  { name: "Assemblée Parlementaire de la Francophonie", abbr: "APF", color: RED },
  { name: "Friedrich Ebert Stiftung", abbr: "FES", color: CYAN },
];

const footerLinks = [
  {
    title: "Institution",
    color: CYAN,
    links: ["À propos du Sénat", "Historique", "Structures", "Bureau du Sénat", "Séances plénières"],
  },
  {
    title: "Travaux",
    color: RED,
    links: ["Travaux législatifs", "Calendrier parlementaire", "Textes adoptés", "Rapports", "Journal officiel"],
  },
  {
    title: "International",
    color: CYAN,
    links: ["Relations internationales", "Groupe d'amitié", "Coopération APF", "Union Africaine", "Espace Presse"],
  },
];

export function Footer() {
  return (
    <footer>
      {/* Partners band */}
      <div
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "#ffffff", borderTop: `3px solid ${GREEN}` }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: GREEN,
            }}
          >
            Partenaires & Organisations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {partners.map((p) => (
              <a
                key={p.abbr}
                href="#"
                className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-all hover:shadow-md"
                style={{ borderColor: "rgba(15,31,14,0.08)", backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = p.color + "55";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,31,14,0.08)";
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg text-white flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: p.color,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {p.abbr}
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.76rem",
                    fontWeight: 500,
                    color: "#0f1f0e",
                    maxWidth: 150,
                    lineHeight: 1.25,
                  }}
                >
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer — deep green */}
      <div style={{ backgroundColor: GREEN_DARK }} className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo reproduction */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: `radial-gradient(ellipse at 50% 40%, #e8f8fc 10%, ${CYAN}66 100%)`,
                  border: `3px solid ${CYAN}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    color: GREEN,
                    lineHeight: 1,
                  }}
                >
                  S
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  Sénat
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: RED,
                    lineHeight: 1.2,
                  }}
                >
                  de Madagascar
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.88rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1.5rem",
                maxWidth: 320,
              }}
            >
              Le Sénat de Madagascar, chambre haute du Parlement, représente les collectivités territoriales et participe à l'élaboration des lois de la République.
            </p>

            {/* Social */}
            <div className="flex gap-2.5 mb-6">
              {[{ icon: Facebook, label: "Facebook" }, { icon: Youtube, label: "YouTube" }].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                    (e.currentTarget as HTMLElement).style.color = CYAN;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Flag strip */}
            <div className="flex rounded overflow-hidden" style={{ width: 60, height: 16 }}>
              <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
              <div style={{ flex: 1, backgroundColor: RED }} />
              <div style={{ flex: 1, backgroundColor: GREEN }} />
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: col.color,
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
                      className="flex items-center gap-1.5 transition-colors group"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.42)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)";
                      }}
                    >
                      <ArrowRight size={11} style={{ opacity: 0.4 }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:contact@senat.mg"
              className="flex items-center gap-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: "rgba(255,255,255,0.38)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = CYAN)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)")}
            >
              <Mail size={13} />
              contact@senat.mg
            </a>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: "rgba(255,255,255,0.38)" }}
            >
              <MapPin size={13} />
              BP 806 Anosikely, Antananarivo 101, Madagascar
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.22)",
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
