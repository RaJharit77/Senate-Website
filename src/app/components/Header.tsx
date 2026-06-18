import { useState } from "react";
import { ChevronDown, Menu, X, Search, Facebook, Youtube, Phone } from "lucide-react";

// Exact colors from the Sénat de Madagascar logo
const COLORS = {
  green: "#1a5c16",       // "Sénat" text color — deep forest green
  greenDark: "#123d0f",   // darker shade for hover/depth
  greenLight: "#eef5ee",  // light green tint for backgrounds
  red: "#cc1111",         // "de Madagascar" text color — vivid red
  redLight: "#fff0f0",    // light red tint
  cyan: "#5bc8de",        // oval swoosh color — sky blue/cyan
  cyanLight: "#e8f8fc",   // light cyan tint
  white: "#ffffff",
  offWhite: "#f5f9f5",
  text: "#0f1f0e",
  textMuted: "#4a6648",
  border: "rgba(15,31,14,0.1)",
};

const navItems = [
  { label: "Accueil", href: "#" },
  {
    label: "À propos du Sénat",
    href: "#",
    children: [
      "Missions et attributions",
      "Structures",
      "Textes de référence",
      "Le Règlement intérieur",
    ],
  },
  { label: "Historique", href: "#" },
  {
    label: "Travaux Parlementaires",
    href: "#",
    children: [
      "Travaux législatifs",
      "Calendrier parlementaire",
      "Textes adoptés",
    ],
  },
  {
    label: "International",
    href: "#",
    children: [
      "Activités du Président",
      "Activités des Sénateurs",
      "Groupe Interparlementaire d'amitié",
    ],
  },
  { label: "Espace Presse", href: "#" },
  { label: "Autres", href: "#" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("Accueil");

  return (
    <header style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top utility bar — cyan from the logo swoosh */}
      <div style={{ backgroundColor: COLORS.cyan }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-1.5">
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ fontSize: "0.72rem", color: COLORS.white, letterSpacing: "0.03em", fontWeight: 500 }}
            >
              <Facebook size={12} />
              <span>Sénat Madagascar</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ fontSize: "0.72rem", color: COLORS.white, letterSpacing: "0.03em", fontWeight: 500 }}
            >
              <Youtube size={12} />
              <span>Chaîne officielle</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@senat.mg"
              className="hidden sm:block transition-opacity hover:opacity-80"
              style={{ fontSize: "0.72rem", color: COLORS.white, letterSpacing: "0.03em" }}
            >
              contact@senat.mg
            </a>
            <div
              className="flex items-center gap-1"
              style={{ fontSize: "0.72rem", color: COLORS.white }}
            >
              <Phone size={11} />
              <span className="hidden sm:inline">+261 20 22 XXX XX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo band — white with green bottom border */}
      <div
        className="bg-white"
        style={{ borderBottom: `3px solid ${COLORS.green}` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4">
            {/* SVG reproduction of the logo swoosh + text */}
            <div
              className="relative flex-shrink-0"
              style={{ width: 72, height: 72 }}
            >
              {/* Cyan oval */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${COLORS.cyanLight} 30%, ${COLORS.cyan}55 100%)`,
                  border: `3px solid ${COLORS.cyan}`,
                }}
              />
              {/* Madagascar island silhouette — simplified */}
              <div
                className="absolute"
                style={{
                  top: "18%", left: "38%",
                  width: 18, height: 34,
                  backgroundColor: COLORS.cyanLight,
                  borderRadius: "40% 30% 40% 30%",
                  border: `1.5px solid ${COLORS.cyan}`,
                  transform: "rotate(-8deg)",
                  opacity: 0.9,
                }}
              />
              {/* "S" letter */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: COLORS.green,
                  lineHeight: 1,
                  paddingBottom: 4,
                  letterSpacing: "-0.02em",
                }}
              >
                S
              </div>
            </div>

            {/* Text block */}
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.7rem",
                  color: COLORS.green,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                Sénat
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: COLORS.red,
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                }}
              >
                de Madagascar
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  color: COLORS.textMuted,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                République de Madagascar
              </div>
            </div>
          </a>

          {/* Right side: search + flag colors strip */}
          <div className="flex items-center gap-4">
            <button
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:border-green-600"
              style={{
                borderColor: COLORS.border,
                fontSize: "0.78rem",
                color: COLORS.textMuted,
              }}
            >
              <Search size={14} />
              <span>Rechercher…</span>
            </button>
            {/* Madagascar flag strip */}
            <div className="hidden sm:flex items-center gap-0.5 rounded overflow-hidden" style={{ height: 28 }}>
              <div style={{ width: 10, backgroundColor: "#ffffff", borderLeft: `1px solid ${COLORS.border}`, height: "100%" }} />
              <div style={{ width: 10, backgroundColor: COLORS.red, height: "100%" }} />
              <div style={{ width: 10, backgroundColor: COLORS.green, height: "100%" }} />
            </div>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: COLORS.green }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar — dark green from logo */}
      <nav
        className="hidden lg:block"
        style={{ backgroundColor: COLORS.green }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setActiveNav(item.label)}
                className="flex items-center gap-1 px-4 py-3.5 transition-colors relative"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: activeNav === item.label ? COLORS.white : "rgba(255,255,255,0.82)",
                  backgroundColor: activeNav === item.label ? COLORS.greenDark : "transparent",
                }}
              >
                {item.label}
                {item.children && <ChevronDown size={11} className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />}
                {/* Red underline on active — matches logo red */}
                {activeNav === item.label && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: COLORS.red }}
                  />
                )}
              </button>

              {/* Dropdown */}
              {item.children && openMenu === item.label && (
                <div
                  className="absolute top-full left-0 z-50 py-2 shadow-xl rounded-b-lg overflow-hidden"
                  style={{
                    minWidth: 230,
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderTop: `3px solid ${COLORS.red}`,
                  }}
                >
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="flex items-center px-5 py-3 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: COLORS.text,
                        borderLeft: "3px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.greenLight;
                        (e.currentTarget as HTMLElement).style.borderLeftColor = COLORS.green;
                        (e.currentTarget as HTMLElement).style.color = COLORS.green;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = COLORS.text;
                      }}
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{ backgroundColor: COLORS.white, borderColor: COLORS.border }}
        >
          {navItems.map((item) => (
            <div key={item.label} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <button
                className="w-full text-left px-5 py-3.5 flex items-center justify-between"
                style={{ fontSize: "0.88rem", fontWeight: 500, color: COLORS.text }}
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={14}
                    style={{ color: COLORS.green }}
                    className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              {item.children && openMenu === item.label && (
                <div style={{ backgroundColor: COLORS.greenLight }} className="pb-2">
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block px-8 py-2"
                      style={{ fontSize: "0.82rem", color: COLORS.green }}
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
