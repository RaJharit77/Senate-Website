import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Search, Phone } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const COLORS = {
  green: "#1a5c16",
  greenDark: "#123d0f",
  greenLight: "#eef5ee",
  red: "#cc1111",
  redLight: "#fff0f0",
  cyan: "#5bc8de",
  cyanLight: "#e8f8fc",
  white: "#ffffff",
  offWhite: "#f5f9f5",
  text: "#0f172a",
  textMuted: "#64748b",
  border: "rgba(15,23,42,0.08)",
  navBg: "#1e293b",
  navHover: "#334155",
  black: "#000000",
};

const navItems = [
  { label: "Accueil", path: "/" },
  {
    label: "À propos du Sénat",
    path: "/a-propos",
    children: [
      { label: "Missions et attributions", path: "/a-propos#missions" },
      { label: "Structures", path: "/a-propos#structures" },
      { label: "Textes de référence", path: "/a-propos#textes" },
    ],
  },
  { label: "Historique", path: "/historique" },
  {
    label: "Travaux Parlementaires",
    path: "/travaux-parlementaires",
    children: [
      { label: "Travaux législatifs", path: "/travaux-parlementaires#legislatifs" },
    ],
  },
  {
    label: "International",
    path: "/international",
    children: [
      { label: "Activités du Président", path: "/international#president" },
      { label: "Activités des Sénateurs", path: "/international#senateurs" },
      { label: "Groupe Interparlementaire d'amitié", path: "/international#groupe" },
    ],
  },
  { label: "Espace Presse", path: "/espace-presse" },
  { label: "Autres", path: "/autres" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer la recherche en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Focus sur l'input quand la recherche s'ouvre
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        fontFamily: "'Inter', sans-serif",
        boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Top utility bar – cyan */}
      <div style={{ backgroundColor: COLORS.cyan }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ fontSize: "0.75rem", color: COLORS.black, letterSpacing: "0.03em", fontWeight: 500 }}
            >
              <FaFacebook size={14} />
              <span>Sénat Madagascar</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ fontSize: "0.75rem", color: COLORS.black, letterSpacing: "0.03em", fontWeight: 500 }}
            >
              <FaYoutube size={14} />
              <span>Chaîne officielle</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@senat.mg"
              className="hidden sm:block transition-opacity hover:opacity-80"
              style={{ fontSize: "0.75rem", color: COLORS.black, letterSpacing: "0.03em" }}
            >
              contact@senat.mg
            </a>
            <div
              className="flex items-center gap-1"
              style={{ fontSize: "0.75rem", color: COLORS.black }}
            >
              <Phone size={14} />
              <span className="hidden sm:inline">+261 34 12 01 036</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo band – avec fond blanc par défaut, devient semi-transparent au scroll */}
      <div
        className="transition-colors duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
          borderBottom: `3px solid ${COLORS.navBg}`,
          backdropFilter: isScrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="https://senat.mg/wp-content/themes/senat13/images/logo-senat.png"
              alt="Sénat de Madagascar"
              className="h-20 w-auto"
            />
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.9rem",
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
                  fontSize: "1.1rem",
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
                  fontSize: "0.65rem",
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
          </Link>

          <div className="hidden lg:flex items-center justify-between gap-4">
            <img src="https://senat.mg/wp-content/themes/senat13/images/Rpp.png" alt="République de Madagascar" style={{ height: 80, width: "auto", objectFit: "contain", opacity: 0.9 }} />
          </div>

          <div className="flex items-center gap-4" ref={searchContainerRef}>
            {/* Barre de recherche */}
            <div className="hidden lg:flex items-center relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher…"
                    className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    style={{
                      borderColor: COLORS.border,
                      fontSize: "0.85rem",
                      color: COLORS.text,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      width: "220px",
                    }}
                  />
                  <button
                    type="submit"
                    className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: COLORS.textMuted }}
                  >
                    <Search size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border transition-all hover:border-primary"
                  style={{
                    borderColor: COLORS.border,
                    fontSize: "0.85rem",
                    color: COLORS.textMuted,
                  }}
                >
                  <Search size={16} />
                  <span>Rechercher…</span>
                </button>
              )}
            </div>

            {/* Version mobile : bouton pour ouvrir la recherche */}
            <button
              className="lg:hidden p-2"
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }}
              style={{ color: COLORS.green }}
            >
              <Search size={22} />
            </button>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: COLORS.green }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Champ de recherche mobile (affiché en dessous du logo) */}
        {searchOpen && (
          <div className="lg:hidden px-4 py-2 bg-white/90 backdrop-blur-sm border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher…"
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                style={{
                  borderColor: COLORS.border,
                  fontSize: "0.9rem",
                  color: COLORS.text,
                  backgroundColor: "white",
                }}
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation bar – gris foncé */}
      <nav
        className="hidden lg:block transition-colors duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(30,41,59,0.95)" : COLORS.navBg,
          padding: "4px 0",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.children ? (
                <button
                  className="flex items-center gap-1 px-5 py-4 transition-colors relative"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: location.pathname === item.path ? COLORS.white : "rgba(255,255,255,0.8)",
                    backgroundColor: location.pathname === item.path ? COLORS.navHover : "transparent",
                  }}
                >
                  {item.label}
                  <ChevronDown size={12} className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                  {location.pathname === item.path && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: COLORS.cyan }}
                    />
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-5 py-4 transition-colors relative ${isActive ? "bg-slate-700" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: isActive ? COLORS.white : "rgba(255,255,255,0.8)",
                    backgroundColor: isActive ? COLORS.navHover : "transparent",
                  })}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: COLORS.cyan }}
                    />
                  )}
                </NavLink>
              )}

              {/* Dropdown */}
              {item.children && openMenu === item.label && (
                <div
                  className="absolute top-full left-0 z-50 py-2 shadow-xl rounded-b-lg overflow-hidden"
                  style={{
                    minWidth: 250,
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderTop: `3px solid ${COLORS.cyan}`,
                  }}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className="flex items-center px-5 py-3 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.85rem",
                        color: COLORS.text,
                        borderLeft: "3px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#f1f5f9";
                        (e.currentTarget as HTMLElement).style.borderLeftColor = COLORS.cyan;
                        (e.currentTarget as HTMLElement).style.color = COLORS.cyan;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = COLORS.text;
                      }}
                    >
                      {child.label}
                    </NavLink>
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
              {item.children ? (
                <>
                  <button
                    className="w-full text-left px-5 py-4 flex items-center justify-between"
                    style={{ fontSize: "0.95rem", fontWeight: 500, color: COLORS.text }}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      style={{ color: COLORS.cyan }}
                      className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {item.children && openMenu === item.label && (
                    <div style={{ backgroundColor: "#f1f5f9" }} className="pb-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.path}
                          className="block px-8 py-2"
                          style={{ fontSize: "0.88rem", color: COLORS.cyan }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className="block px-5 py-4"
                  style={({ isActive }) => ({
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? COLORS.cyan : COLORS.text,
                  })}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}