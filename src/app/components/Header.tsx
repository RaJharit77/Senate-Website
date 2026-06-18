import { useState } from "react";
import { ChevronDown, Menu, X, Search, Facebook, Youtube } from "lucide-react";

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
      "Groupe interparlementaire d'amitié",
      "Coopération internationale",
    ],
  },
  { label: "Espace Presse", href: "#" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#5a0f0f" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
              style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
            >
              <Facebook size={13} />
              <span>Sénat Madagascar</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
              style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
            >
              <Youtube size={13} />
              <span>Chaîne YouTube</span>
            </a>
          </div>
          <div
            className="opacity-70"
            style={{ fontSize: "0.78rem", letterSpacing: "0.04em" }}
          >
            BP 806 Anosikely · Antananarivo 101, Madagascar
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b" style={{ borderColor: "rgba(26,20,16,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4">
            <div
              className="flex items-center justify-center rounded-full text-white"
              style={{
                width: 52,
                height: 52,
                background: "linear-gradient(135deg, #8b1a1a 60%, #c9932a)",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "#8b1a1a",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Sénat
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  color: "#6b5e52",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                République de Madagascar
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 rounded transition-colors hover:bg-secondary"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: openMenu === item.label ? "#8b1a1a" : "#1a1410",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </a>
                {item.children && openMenu === item.label && (
                  <div
                    className="absolute top-full left-0 bg-white rounded-lg shadow-lg border py-2 z-50"
                    style={{
                      minWidth: 220,
                      borderColor: "rgba(26,20,16,0.1)",
                      marginTop: 2,
                    }}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href="#"
                        className="block px-4 py-2.5 hover:bg-secondary transition-colors"
                        style={{
                          fontSize: "0.82rem",
                          color: "#1a1410",
                          borderLeft: "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "#8b1a1a";
                          (e.currentTarget as HTMLElement).style.color = "#8b1a1a";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "#1a1410";
                        }}
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-colors"
              style={{ color: "#6b5e52" }}
            >
              <Search size={16} />
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#1a1410" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t px-4 pb-4" style={{ borderColor: "rgba(26,20,16,0.1)" }}>
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full text-left py-3 flex items-center justify-between"
                  style={{ fontSize: "0.9rem", fontWeight: 500, color: "#1a1410" }}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {item.children && openMenu === item.label && (
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href="#"
                        className="block py-2"
                        style={{ fontSize: "0.83rem", color: "#6b5e52" }}
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
      </div>
    </header>
  );
}
