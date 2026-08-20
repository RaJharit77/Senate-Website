"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X, Search, Phone, Calendar as CalendarIcon, Mail } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { COLOURS } from "@/utils/colours";
import { ALICE_BLUE, CYAN, LINK_WATER, MIDNIGHT, SILVER, WHITE } from "@/utils/colors";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/navigations/navigation";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => {
    if (path.includes("#")) {
      const basePath = path.split("#")[0];
      return pathname === basePath;
    }
    return pathname === path;
  };

  const formattedDate = dateTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const shortDate = dateTime.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateTime(date);
      setCalendarOpen(false);
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
      {/* --- BARRE CYAN RESPONSIVE --- */}
      <div style={{ backgroundColor: COLOURS.cyan }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between py-1 sm:py-2">
          <div className="flex items-center gap-2 sm:gap-5 flex-1 justify-start">
            <Link
              href="https://web.facebook.com/SenatdeMadagascar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group transition-all duration-200 rounded-full pr-0 sm:pr-3 pl-1 py-1"
              style={{
                letterSpacing: "0.03em",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)";
              }}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              >
                <FaFacebook size={12} style={{ color: COLOURS.black }} />
              </span>
              <span
                className="hidden sm:inline font-semibold"
                style={{ fontSize: "0.72rem", color: COLOURS.black }}
              >
                Sénat Madagascar
              </span>
            </Link>
            <Link
              href="https://www.youtube.com/@antenimierandoholona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group transition-all duration-200 rounded-full pr-0 sm:pr-3 pl-1 py-1"
              style={{
                letterSpacing: "0.03em",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)";
              }}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              >
                <FaYoutube size={12} style={{ color: COLOURS.black }} />
              </span>
              <span
                className="hidden sm:inline font-semibold"
                style={{ fontSize: "0.72rem", color: COLOURS.black }}
              >
                Chaîne officielle
              </span>
            </Link>
          </div>

          {/* Calendar */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-center">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-black hover:text-gray-900 hover:bg-transparent"
                  style={{ fontSize: "0.7rem", padding: "2px 8px", height: "auto" }}
                >
                  <CalendarIcon size={14} />
                  <span className="whitespace-nowrap">
                    {formattedDate} - {formattedTime}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={dateTime}
                  onSelect={handleDateSelect}
                  locale={{ code: "fr" }}
                />
              </PopoverContent>
            </Popover>

            <div className="sm:hidden flex items-center gap-1 text-black text-[0.6rem]">
              <CalendarIcon size={12} />
              <span>{shortDate}</span>
              <span className="text-black/60">{formattedTime}</span>
            </div>
          </div>

          {/* Contacts */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <Link
              href="/contact"
              className="flex items-center gap-2 group transition-all duration-200 rounded-full pr-0 sm:pr-3 pl-1 py-1"
              style={{
                letterSpacing: "0.03em",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)";
              }}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              >
                <Mail size={12} style={{ color: COLOURS.black }} />
              </span>
              <span
                className="hidden sm:inline font-semibold"
                style={{ fontSize: "0.72rem", color: COLOURS.black }}
              >
                contact@senat.mg
              </span>
            </Link>
            <Link
              href="https://wa.me/261341201036"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group transition-all duration-200 rounded-full pr-0 lg:pr-3 pl-1 py-1"
              style={{
                letterSpacing: "0.03em",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)";
              }}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              >
                <Phone size={12} style={{ color: COLOURS.black }} />
              </span>
              <span
                className="hidden lg:inline font-semibold"
                style={{ fontSize: "0.72rem", color: COLOURS.black }}
              >
                +261 34...
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- BARRE PRINCIPALE --- */}
      <div
        className="transition-colors duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.92)" : WHITE,
          borderBottom: `3px solid ${COLOURS.navBg}`,
          backdropFilter: isScrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <Image
                src="https://senat.mg/wp-content/themes/senat13/images/logo-senat.png"
                alt="Sénat de Madagascar"
                width={80}
                height={80}
                className="h-20 w-20"
                priority
              />
            </motion.div>

            <div>
              <div
                className="font-bold text-[1.9rem] leading-none tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif", color: COLOURS.cyan }}
              >
                Sénat
              </div>
              <div
                className="font-semibold text-[1.1rem] leading-tight tracking-wide"
                style={{ fontFamily: "'Poppins', sans-serif", color: COLOURS.cyan }}
              >
                de Madagascar
              </div>
              <div
                className="font-medium uppercase tracking-widest text-gray-500 truncate max-w-[100px] sm:max-w-[160px] lg:max-w-[200px] text-[0.45rem] sm:text-[0.55rem] lg:text-[0.65rem]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                République de Madagascar
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <Link href="/" className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="cursor-pointer"
              >
                <Image
                  src="https://senat.mg/wp-content/themes/senat13/images/Rpp.png"
                  alt="République de Madagascar"
                  width={120}
                  height={120}
                  className="h-auto w-auto object-contain"
                  priority
                  quality={100}
                />
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-4" ref={searchContainerRef}>
            {/* Barre de recherche desktop */}
            <div className="hidden lg:flex items-center relative shrink-0">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center relative">
                  <input
                    data-testid="search-input"
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher…"
                    className="px-5 py-2.5 pr-12 rounded-full border-2 border-cyan-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md caret-cyan-800"
                    style={{
                      fontSize: "0.85rem",
                      color: COLOURS.textInput,
                      width: "240px",
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-1.5 rounded-full hover:bg-cyan-100 transition-colors"
                    style={{ color: COLOURS.cyan }}
                  >
                    <Search size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-cyan-400 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{
                    fontSize: "0.85rem",
                    color: COLOURS.cyan,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Search size={16} />
                  <span className="font-medium">Rechercher…</span>
                </button>
              )}
            </div>

            {/* Boutons mobile */}
            <button
              className="lg:hidden p-2"
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }}
              style={{ color: COLOURS.cyan }}
            >
              <Search size={22} />
            </button>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: COLOURS.cyan }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Recherche mobile */}
        {searchOpen && (
          <div className="lg:hidden px-4 py-2 bg-white/90 backdrop-blur-sm border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                data-testid="search-input"
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher…"
                className="flex-1 px-4 py-2 rounded-full border-2 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 caret-cyan-800"
                style={{
                  borderColor: COLOURS.cyan,
                  fontSize: "0.9rem",
                  color: COLOURS.textInput,
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

      {/* Navigation principale desktop */}
      <nav
        className="hidden lg:block transition-colors duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(30,41,59,0.95)" : COLOURS.navBg,
          padding: "4px 0",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center">
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                onMouseLeave={() => hasChildren && setOpenMenu(null)}
              >
                {hasChildren ? (
                  <button
                    className="flex items-center gap-1 px-5 py-4 transition-colors relative"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: isActive(item.path) ? COLOURS.white : "rgba(255,255,255,0.8)",
                      backgroundColor: isActive(item.path) ? COLOURS.navHover : "transparent",
                      transition: "background-color 0.2s ease, color 0.2s ease",
                    }}
                  >
                    {item.label}
                    <ChevronDown size={12} className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                    {isActive(item.path) && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: COLOURS.cyan }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    data-testid="nav-about"
                    href={item.path}
                    className="flex items-center gap-1 px-5 py-4 transition-all duration-200 relative group/link"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: isActive(item.path) ? COLOURS.white : "rgba(255,255,255,0.8)",
                      backgroundColor: isActive(item.path) ? COLOURS.navHover : "transparent",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = COLOURS.white;
                        e.currentTarget.style.backgroundColor = COLOURS.navHover;
                      }
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ease-out 
                        ${isActive(item.path) ? "w-full" : "w-0 group-hover/link:w-full"}`}
                    />
                  </Link>
                )}

                {hasChildren && openMenu === item.label && (
                  <div
                    className="absolute top-full left-0 z-50 py-2 shadow-xl rounded-b-lg overflow-hidden"
                    style={{
                      minWidth: 250,
                      backgroundColor: WHITE,
                      border: `1px solid ${COLOURS.border}`,
                      borderTop: `3px solid ${COLOURS.cyan}`,
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.path}
                        className="flex items-center px-5 py-3 transition-colors"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.85rem",
                          color: CYAN,
                          borderLeft: "3px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = ALICE_BLUE;
                          (e.currentTarget as HTMLElement).style.borderLeftColor = CYAN;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t"
            style={{ backgroundColor: COLOURS.navMob, borderColor: COLOURS.border }}
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="max-h-[80vh] overflow-y-auto"
            >
              {navItems.map((item) => {
                const hasChildren = !!item.children;
                return (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    style={{ borderBottom: `1px solid ${COLOURS.border}` }}
                  >
                    {hasChildren ? (
                      <>
                        <button
                          className="w-full text-left px-5 py-4 flex items-center justify-between"
                          style={{ fontSize: "0.95rem", fontWeight: 500, color: COLOURS.white }}
                          onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            style={{ color: COLOURS.cyan }}
                            className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {openMenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ backgroundColor: MIDNIGHT }}
                              className="overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.path}
                                  className="block px-8 py-2 transition-colors"
                                  style={{ fontSize: "0.88rem", color: SILVER }}
                                  onClick={() => setMobileOpen(false)}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = COLOURS.cyan;
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = LINK_WATER;
                                  }}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        data-testid="nav-about"
                        href={item.path}
                        className="block px-5 py-4 relative group/link-mobile"
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: isActive(item.path) ? 600 : 500,
                          color: isActive(item.path) ? COLOURS.cyan : COLOURS.white,
                          transform: "scale(1)",
                          transition: "transform 0.2s ease, color 0.2s ease",
                        }}
                        onClick={() => setMobileOpen(false)}
                        onMouseEnter={(e) => {
                          if (!isActive(item.path)) {
                            e.currentTarget.style.color = COLOURS.cyan;
                          }
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.path)) {
                            e.currentTarget.style.color = COLOURS.white;
                          }
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.97)";
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ease-out 
                            ${isActive(item.path) ? "w-full" : "w-0 group-hover/link-mobile:w-full"}`}
                        />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}