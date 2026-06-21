import "../styles/fonts.css";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight, Menu, X,
  Search, Facebook, Youtube, Mail, MapPin, Phone,
  FileText, Calendar, Globe, ArrowRight, ArrowUpRight,
  Scale, Users, BookOpen, Clock,
} from "lucide-react";

/* ─────────────────────────── BRAND TOKENS ─────────────────────────── */
const G   = "#1a5c16";   // green  — "Sénat"
const GD  = "#0d3a0a";   // green dark — deep backgrounds
const GL  = "#eef6ed";   // green light — tints
const R   = "#cc1111";   // red    — "de Madagascar"
const RL  = "#fff0f0";   // red light
const C   = "#5bc8de";   // cyan   — swoosh
const CL  = "#e6f7fc";   // cyan light
const TXT = "#0d1f0c";   // near-black text
const MUT = "#4a6b48";   // muted green-grey
const BRD = "rgba(13,31,12,0.1)";

/* ─────────────────────────── IMAGE URLS ───────────────────────────── */
const TH  = "https://senat.mg/wp-content/themes/senat13/images";
const UP  = "https://senat.mg/wp-content/uploads";

const IMG = {
  logo:        `${TH}/logo-senat.png`,
  rpp:         `${TH}/Rpp.png`,
  president:   `${TH}/NDREMANJARY.png`,
  membres:     `${TH}/membres.jpg`,
  historique:  `${TH}/historique.jpg`,
  agenda:      `${TH}/ordre-du-jour.jpg`,
  lois:        `${TH}/lois.jpg`,
  intl:        `${TH}/international.jpg`,

  // Carousel — 5 real photos
  c1: `${UP}/2026/06/725227065_1699472914726718_9129482476983804719_n-1024x682.jpeg`,
  c2: `${UP}/2026/04/WhatsApp-Image-2026-04-01-at-8.58.20-AM1-1024x575.jpeg`,
  c3: `${UP}/2026/03/WhatsApp-Image-2026-03-09-at-2.35.09-PM2-1024x685.jpeg`,
  c4: `${UP}/2026/02/WhatsApp-Image-2026-02-13-at-08.02.14-1024x797.jpeg`,
  c5: `${UP}/2026/02/1.jpg`,

  // News thumbnails
  n1: `${UP}/2026/06/721152193_1710594864442590_1047064308730674347_n-1024x682.jpg`,
  n2: `${UP}/2026/06/721517407_1710420527793357_1880340436018856516_n-1024x575.jpg`,
  n3: `${UP}/2026/06/712744922_1697402302428513_5325818827058260357_n-1024x683.jpg`,
  n4: `${UP}/2026/05/706583228_1690529139782496_6657266668439846852_n-1024x682.jpg`,
  n5: `${UP}/2026/05/WhatsApp-Image-2026-05-19-at-12.21.50-934x1024.jpeg`,

  // Partner logos — all 12
  pAn:    `${TH}/An.png`,
  pPrim:  `${TH}/logo-primature-fond-transparent-vf-300x300.png`,
  pHcc:   `${TH}/hcc.jpg`,
  pPap:   `${TH}/Parlement_panafricain_embl%C3%A8me.jpg`,
  pApf:   `${TH}/Assembl%C3%A9e-parlementaire-de-la-francophonie_Vignette.jpg`,
  pCn:    `${TH}/cnlegis.png`,
  pEisa:  `${TH}/eisalogo.png`,
  pEces:  `${TH}/logo_ECES_French_New.png`,
  pFes:   `${TH}/Logo_Friedrich_Ebert_Stiftung.svg_.png`,
  pIpu:   `${TH}/logo_ipu_en.png`,
  pMua:   `${TH}/logo-mua.png`,
};

/* ═══════════════════════════════════════════════════════════════════
   TOP BAR
═══════════════════════════════════════════════════════════════════ */
function TopBar() {
  return (
    <div style={{ backgroundColor: G, fontFamily: "'Inter',sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: 34 }}>
        <div className="flex items-center gap-5">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            style={{ fontSize: "0.72rem", fontWeight: 500 }}>
            <Facebook size={12} /><span className="hidden sm:inline">Sénat Madagascar</span>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            style={{ fontSize: "0.72rem", fontWeight: 500 }}>
            <Youtube size={12} /><span className="hidden sm:inline">Chaîne YouTube</span>
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:contact@senat.mg"
            className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "0.7rem" }}>
            <Mail size={11} />contact@senat.mg
          </a>
          <div className="flex items-center gap-1.5 text-white/70" style={{ fontSize: "0.7rem" }}>
            <Phone size={11} /><span className="hidden md:inline">BP 806 Anosikely, Antananarivo 101</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HEADER / NAV
═══════════════════════════════════════════════════════════════════ */
const NAV = [
  { label: "Accueil", href: "#" },
  { label: "À propos du Sénat", href: "#", sub: ["Missions et attributions", "Structures", "Textes de référence"] },
  { label: "Historique", href: "#" },
  { label: "Travaux Parlementaires", href: "#", sub: ["Travaux législatifs", "Calendrier parlementaire", "Textes adoptés"] },
  { label: "International", href: "#", sub: ["Activités du Président", "Activités des Sénateurs", "Groupe Interparlementaire d'amitié"] },
  { label: "Espace Presse", href: "#" },
  { label: "Autres", href: "#" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="sticky top-0 z-50" style={{ fontFamily: "'Inter',sans-serif" }}>
      {/* Logo band */}
      <div
        className="bg-white transition-shadow"
        style={{
          borderBottom: `3px solid ${G}`,
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: 72 }}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0">
            <img src={IMG.logo} alt="Sénat de Madagascar" style={{ height: 60, width: "auto", objectFit: "contain" }} />
            <div className="hidden sm:block leading-tight">
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.45rem", color: G, lineHeight: 1 }}>Sénat</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: "0.9rem", color: R }}>de Madagascar</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: MUT, textTransform: "uppercase", fontWeight: 500, marginTop: 1 }}>
                République de Madagascar
              </div>
            </div>
          </a>

          {/* RPP logo (Présidence) */}
          <div className="hidden lg:flex items-center">
            <img src={IMG.rpp} alt="Présidence de la République" style={{ height: 52, width: "auto", objectFit: "contain", opacity: 0.9 }} />
          </div>

          {/* Search + flag + mobile */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors hover:border-green-600"
              style={{ borderColor: BRD, color: MUT, fontSize: "0.78rem" }}>
              <Search size={13} />Rechercher
            </button>
            {/* Madagascar flag */}
            <div className="hidden sm:flex overflow-hidden rounded" style={{ width: 28, height: 20 }}>
              <div style={{ width: "33.3%", backgroundColor: "#fff", borderLeft: `1px solid ${BRD}` }} />
              <div style={{ width: "33.3%", backgroundColor: R }} />
              <div style={{ width: "33.3%", backgroundColor: G }} />
            </div>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(v => !v)} style={{ color: G }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="hidden lg:block" style={{ backgroundColor: GD }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-stretch">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              <a href={item.href}
                className="flex items-center gap-1 px-3.5 py-3.5 text-white/80 hover:text-white hover:bg-black/20 transition-colors relative"
                style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.01em" }}>
                {item.label}
                {item.sub && <ChevronDown size={11} className={`transition-transform ${dropdown === item.label ? "rotate-180" : ""}`} />}
                {item.label === "Accueil" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: C }} />
                )}
              </a>
              {item.sub && dropdown === item.label && (
                <div className="absolute top-full left-0 z-50 py-1.5 min-w-[220px] shadow-xl"
                  style={{ backgroundColor: "#fff", borderTop: `3px solid ${R}`, border: `1px solid ${BRD}`, borderTopColor: R }}>
                  {item.sub.map(s => (
                    <a key={s} href="#"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-green-50"
                      style={{ color: TXT, fontSize: "0.82rem" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeft = `3px solid ${G}`; (e.currentTarget as HTMLElement).style.paddingLeft = "13px"; (e.currentTarget as HTMLElement).style.color = G; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeft = "none"; (e.currentTarget as HTMLElement).style.paddingLeft = "16px"; (e.currentTarget as HTMLElement).style.color = TXT; }}>
                      {s}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b shadow-lg" style={{ borderColor: BRD }}>
          {NAV.map(item => (
            <div key={item.label} style={{ borderBottom: `1px solid ${BRD}` }}>
              <button className="w-full text-left px-5 py-3.5 flex items-center justify-between"
                style={{ fontSize: "0.88rem", fontWeight: 500, color: TXT }}
                onClick={() => setMobileExpand(mobileExpand === item.label ? null : item.label)}>
                {item.label}
                {item.sub && <ChevronDown size={14} style={{ color: G }} className={`transition-transform ${mobileExpand === item.label ? "rotate-180" : ""}`} />}
              </button>
              {item.sub && mobileExpand === item.label && (
                <div style={{ backgroundColor: GL }} className="pb-1">
                  {item.sub.map(s => (
                    <a key={s} href="#" className="block px-8 py-2" style={{ fontSize: "0.82rem", color: G }}>{s}</a>
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

/* ═══════════════════════════════════════════════════════════════════
   HERO CAROUSEL — 5 real photos
═══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  { img: IMG.c1, tag: "Sécurité", tagColor: G,  title: "PASSATION DE SERVICE AU NIVEAU DE LA DIRECTION DE LA SÉCURITÉ DU SÉNAT", date: "Juin 2026",    excerpt: "Cérémonie officielle de passation de service au sein de la Direction de la Sécurité du Sénat de Madagascar." },
  { img: IMG.c2, tag: "Santé",    tagColor: R,  title: "CAMPAGNE DE DÉPISTAGE GRATUIT DU DIABÈTE AU SÉNAT",                                            date: "Avril 2026",  excerpt: "Le Sénat organise une campagne de sensibilisation et de dépistage gratuit du diabète pour le personnel et les citoyens." },
  { img: IMG.c3, tag: "Société",  tagColor: C,  title: "CÉLÉBRATION DE LA JOURNÉE INTERNATIONALE DES DROITS DE LA FEMME",                              date: "Mars 2026",   excerpt: "Le Sénat honore les femmes sénatrices et le personnel féminin, réaffirmant son engagement pour l'égalité." },
  { img: IMG.c4, tag: "Solidarité", tagColor: G, title: "DON DU PRÉSIDENT DU SÉNAT AUX VICTIMES DU CYCLONE GEZANI",                                   date: "Février 2026", excerpt: "Le Président du Sénat par intérim exprime la solidarité nationale envers les populations sinistrées." },
  { img: IMG.c5, tag: "Solidarité", tagColor: R, title: "REMISE DE DONS AUX VICTIMES DU CYCLONE FYTIA",                                               date: "Février 2026", excerpt: "Le Sénat a organisé une collecte et remis des dons aux populations sinistrées par le cyclone Fytia." },
];

function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setCur((idx + SLIDES.length) % SLIDES.length); setFading(false); }, 320);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(cur + 1), 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [cur]);

  const s = SLIDES[cur];

  return (
    <section className="relative overflow-hidden select-none" style={{ height: "clamp(460px,58vh,620px)" }}>
      {/* Full-bleed photo */}
      <img key={cur} src={s.img} alt={s.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: fading ? 0.4 : 1 }} />
      {/* Dark gradient — left-heavy */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(105deg,rgba(8,25,8,.92) 0%,rgba(8,25,8,.65) 45%,rgba(8,25,8,.12) 100%)" }} />
      {/* Left color stripe (logo colors) */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col" style={{ width: 5 }}>
        <div className="flex-1" style={{ backgroundColor: G }} />
        <div className="flex-1" style={{ backgroundColor: R }} />
        <div className="flex-1" style={{ backgroundColor: C }} />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-8 sm:px-10 flex flex-col justify-center"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.35s" }}>
        <div style={{ maxWidth: 560 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-white rounded-sm" style={{ backgroundColor: s.tagColor, fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.tag}</span>
            <span className="flex items-center gap-1.5 text-white/50" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem" }}>
              <Clock size={11} />{s.date}
            </span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 700, lineHeight: 1.22, letterSpacing: "-0.01em" }}>{s.title}</h1>
          <p className="mb-8" style={{ fontFamily: "'Source Serif 4',serif", fontSize: "1rem", lineHeight: 1.72, color: "rgba(255,255,255,.68)", maxWidth: 480 }}>{s.excerpt}</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded text-white font-semibold transition-all hover:gap-3"
            style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", backgroundColor: G, border: `2px solid ${G}` }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = C; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = G; (e.currentTarget as HTMLElement).style.borderColor = G; }}>
            Lire la suite <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-8 sm:left-10 flex items-center gap-3">
        <button onClick={() => go(cur - 1)} className="w-9 h-9 rounded-full border flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors" style={{ borderColor: "rgba(255,255,255,.25)" }}>
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5 items-center">
          {SLIDES.map((sl, i) => (
            <button key={i} onClick={() => go(i)} className="rounded-full transition-all"
              style={{ width: i === cur ? 26 : 8, height: 8, backgroundColor: i === cur ? sl.tagColor : "rgba(255,255,255,.3)" }} />
          ))}
        </div>
        <button onClick={() => go(cur + 1)} className="w-9 h-9 rounded-full border flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors" style={{ borderColor: "rgba(255,255,255,.25)" }}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="absolute bottom-6 right-8" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em" }}>
        <span style={{ color: C, fontSize: "1rem" }}>{String(cur + 1).padStart(2, "0")}</span> / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   QUICK LINKS STRIP
═══════════════════════════════════════════════════════════════════ */
function QuickLinks() {
  const items = [
    { icon: FileText, label: "Travaux législatifs",       sub: "Textes en cours et adoptés",     color: G,  bg: GL },
    { icon: Calendar, label: "Calendrier parlementaire",  sub: "Agenda des sessions du Sénat",   color: R,  bg: RL },
    { icon: Globe,    label: "Diplomatie parlementaire",  sub: "Relations internationales",       color: C,  bg: CL },
  ];
  return (
    <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${BRD}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {items.map(it => (
            <a key={it.label} href="#"
              className="flex items-center gap-4 px-5 py-4 transition-colors"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = it.bg}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: it.bg }}>
                <it.icon size={18} style={{ color: it.color }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.84rem", fontWeight: 600, color: TXT }}>{it.label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: MUT }}>{it.sub}</p>
              </div>
              <ArrowUpRight size={14} className="ml-auto flex-shrink-0" style={{ color: it.color, opacity: 0.6 }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NEWS SECTION — real thumbnails + real titles
═══════════════════════════════════════════════════════════════════ */
const NEWS = [
  { img: IMG.n1, cat: "Sécurité",    catC: G, date: "Juin 2026",   title: "PASSATION DE SERVICE AU NIVEAU DE LA DIRECTION DE LA SÉCURITÉ DU SÉNAT", excerpt: "Cérémonie officielle de passation de service au sein de la Direction de la Sécurité du Sénat." },
  { img: IMG.n2, cat: "Administration", catC: C, date: "Juin 2026", title: "OPÉRATION D'ENREGISTREMENT BIOMÉTRIQUE AU SÉNAT",                          excerpt: "Le Sénat accueille une opération biométrique dans le cadre de la modernisation administrative de l'État." },
  { img: IMG.n3, cat: "Fête nationale", catC: R, date: "26 Juin 2026", title: "CÉLÉBRATION DU 66ème ANNIVERSAIRE DE L'INDÉPENDANCE ET DE L'ARMÉE MALAGASY", excerpt: "Le Sénat célèbre solennellement le 66ème anniversaire de l'Indépendance nationale." },
  { img: IMG.n4, cat: "Jeunesse",    catC: G, date: "Mai 2026",    title: "DES JEUNES ÉTUDIANTS À LA DÉCOUVERTE DU SÉNAT",                              excerpt: "Des lycéens et étudiants ont visité le Sénat pour découvrir le fonctionnement de la chambre haute." },
  { img: IMG.n5, cat: "Régions",     catC: C, date: "Mai 2026",    title: "FARAFANGANA : LE PRÉSIDENT DU SÉNAT AUX 30 ANS DE LA « SEJAFA »",           excerpt: "Le Président du Sénat par intérim représente l'institution au 30ème anniversaire du SEJAFA." },
];

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <div className="mb-3">
      <div className="flex gap-1 mb-3" style={{ height: 3 }}>
        <div className="w-8 rounded-full" style={{ backgroundColor: G }} />
        <div className="w-4 rounded-full" style={{ backgroundColor: R }} />
        <div className="w-4 rounded-full" style={{ backgroundColor: C }} />
      </div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color }}>{children}</p>
    </div>
  );
}

function NewsSection() {
  const main = NEWS[0];
  const rest = NEWS.slice(1);
  return (
    <section style={{ backgroundColor: "#f5f9f5" }} className="py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel color={G}>Actualités du Sénat</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: TXT, lineHeight: 1.2 }}>
              Dernières nouvelles <em style={{ fontWeight: 400, color: R }}>&amp; événements</em>
            </h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 600, backgroundColor: G }}>
            Toutes les actualités <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured large card */}
          <a href="#" className="group lg:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer block" style={{ minHeight: 420 }}>
            <img src={main.img} alt={main.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(8,25,8,.96) 0%,rgba(8,25,8,.45) 55%,transparent 100%)" }} />
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: main.catC }} />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 text-white rounded-sm" style={{ backgroundColor: main.catC, fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{main.cat}</span>
                <span className="text-white/45" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem" }}>{main.date}</span>
              </div>
              <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 }}>{main.title}</h3>
              <p className="mb-4" style={{ fontFamily: "'Source Serif 4',serif", fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(255,255,255,.6)" }}>{main.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-white border-b pb-0.5 transition-all group-hover:gap-3"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderColor: main.catC }}>
                Lire la suite <ArrowRight size={11} />
              </span>
            </div>
          </a>

          {/* Side column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((n, i) => (
              <a key={i} href="#"
                className="group flex gap-4 bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: BRD }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = n.catC + "55"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BRD}>
                <div className="flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ width: 80, height: 80 }}>
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: n.catC, marginBottom: 3 }}>{n.cat}</span>
                  <h4 className="group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.86rem", fontWeight: 600, lineHeight: 1.35, color: TXT }}>{n.title}</h4>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: MUT, marginTop: 4 }}>{n.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT SECTION — real president photo, members, history
═══════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const cards = [
    { img: IMG.president,  color: G, tag: "Le Président par intérim",         title: "NDREMANJARY",                                          sub: "Président du Sénat par intérim — 4ème République" },
    { img: IMG.membres,    color: R, tag: "Les Sénateurs",                     title: "2ème Législature de la 4ème République",               sub: "63 sénateurs représentant les 23 régions de Madagascar" },
    { img: IMG.historique, color: C, tag: "Historique",                        title: "Le Sénat à travers les Républiques",                   sub: "De la 1ère à la 4ème République malagasy" },
  ];
  const stats = [
    { n: "63", l: "Sénateurs",  d: "4ème République",          c: G },
    { n: "23", l: "Régions",    d: "représentées",             c: R },
    { n: "1994", l: "Fondation", d: "du Sénat moderne",        c: C },
    { n: "2",  l: "Chambres",   d: "du Parlement",             c: G },
  ];
  const pillars = [
    { icon: Scale,    t: "Missions législatives",    d: "Le Sénat examine et vote les lois, contrôle l'action du gouvernement et représente les collectivités territoriales décentralisées.", c: G },
    { icon: Users,    t: "Représentation territoriale", d: "Chaque région de Madagascar est représentée, garantissant l'équilibre entre les territoires dans le processus législatif.", c: R },
    { icon: Globe,    t: "Coopération internationale", d: "Le Sénat entretient des relations avec les institutions d'Afrique et du monde à travers les groupes interparlementaires.", c: C },
    { icon: BookOpen, t: "Tradition démocratique",   d: "Garant de la stabilité constitutionnelle, le Sénat veille au respect de la légalité et des droits fondamentaux.", c: G },
  ];

  return (
    <section style={{ backgroundColor: GD }} className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="grid lg:grid-cols-2 gap-12 mb-14">
          <div>
            <div className="flex gap-1 mb-5" style={{ height: 4 }}>
              <div className="w-8 rounded-full bg-white/80" />
              <div className="w-4 rounded-full" style={{ backgroundColor: R }} />
              <div className="w-4 rounded-full" style={{ backgroundColor: G }} />
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C, marginBottom: "0.9rem" }}>À propos du Sénat</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
              La chambre haute du<br />
              <em style={{ color: C, fontWeight: 400 }}>Parlement Malagasy</em>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: "1.02rem", lineHeight: 1.78, color: "rgba(255,255,255,.65)" }}>
              Le Sénat de Madagascar est la chambre haute du Parlement bicaméral de la République. Instituée par la Constitution de la IVème République, il représente les collectivités territoriales décentralisées et participe au processus législatif national.
            </p>
            <a href="#" className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-80" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 600, backgroundColor: G }}>
              En savoir plus <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* 3 real photo cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {cards.map(card => (
            <a key={card.tag} href="#" className="group relative rounded-2xl overflow-hidden cursor-pointer block" style={{ aspectRatio: "4/3" }}>
              <div className="absolute inset-0" style={{ backgroundColor: card.color + "33" }} />
              <img src={card.img} alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={e => (e.currentTarget as HTMLImageElement).style.opacity = "0"} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top,rgba(8,25,8,.96) 0%,rgba(8,25,8,.3) 60%,transparent 100%)` }} />
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: card.color }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: card.color, marginBottom: 5 }}>{card.tag}</p>
                <h3 className="text-white" style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.98rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 3 }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,.5)" }}>{card.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden mb-14" style={{ border: "1px solid rgba(255,255,255,.06)" }}>
          {stats.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-center text-center py-10 px-6"
              style={{ backgroundColor: "rgba(255,255,255,.03)", borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full" style={{ width: 36, height: 4, backgroundColor: s.c }} />
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 700, color: s.c, lineHeight: 1, marginBottom: "0.4rem" }}>{s.n}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#fff", marginBottom: "0.2rem" }}>{s.l}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,.38)" }}>{s.d}</span>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map(p => (
            <div key={p.t} className="rounded-xl p-6 border cursor-pointer transition-all"
              style={{ borderColor: p.c + "33", backgroundColor: p.c + "0d" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.c + "80"; (e.currentTarget as HTMLElement).style.backgroundColor = p.c + "1a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = p.c + "33"; (e.currentTarget as HTMLElement).style.backgroundColor = p.c + "0d"; }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: p.c + "22" }}>
                <p.icon size={20} style={{ color: p.c }} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.93rem", fontWeight: 700, color: "#fff", marginBottom: "0.7rem", lineHeight: 1.3 }}>{p.t}</h3>
              <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: "0.83rem", lineHeight: 1.65, color: "rgba(255,255,255,.48)" }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PARLIAMENTARY WORK — real images for each tab
═══════════════════════════════════════════════════════════════════ */
function ParliamentaryWork() {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      icon: FileText, label: "Travaux législatifs", color: G, img: IMG.lois,
      items: [
        { ref: "Loi n° 2026-012", title: "Loi portant sur l'organisation de l'administration territoriale", status: "Adopté",    sColor: "#16a34a", date: "14 Juin 2026" },
        { ref: "Loi n° 2026-009", title: "Loi de finances rectificative pour l'exercice 2026",              status: "En examen", sColor: C,         date: "02 Juin 2026" },
        { ref: "Loi n° 2026-007", title: "Loi portant réforme du code électoral malagasy",                  status: "Adopté",    sColor: "#16a34a", date: "20 Mai 2026" },
        { ref: "Loi n° 2026-004", title: "Loi relative à la protection de l'environnement marin",           status: "Adopté",    sColor: "#16a34a", date: "8 Avril 2026" },
      ],
    },
    {
      icon: Calendar, label: "Calendrier parlementaire", color: R, img: IMG.agenda,
      items: [
        { ref: "Session ordinaire",     title: "Ouverture de la session ordinaire de mai — Sénat de Madagascar",         status: "Terminé", sColor: MUT, date: "2 Mai 2026" },
        { ref: "Comité mixte",          title: "Réunion du comité mixte paritaire Assemblée Nationale – Sénat",          status: "Planifié", sColor: C,  date: "25 Juin 2026" },
        { ref: "Session extraordinaire", title: "Session extraordinaire sur le budget rectificatif",                     status: "Planifié", sColor: C,  date: "15 Juil. 2026" },
        { ref: "Audition",              title: "Audition du Premier ministre sur la situation économique nationale",      status: "Planifié", sColor: C,  date: "30 Juil. 2026" },
      ],
    },
    {
      icon: Globe, label: "Diplomatie parlementaire", color: C, img: IMG.intl,
      items: [
        { ref: "Union Africaine",   title: "Visite de courtoisie d'une délégation de l'Union Africaine au Sénat",         status: "Terminé", sColor: "#16a34a", date: "Janv. 2026" },
        { ref: "APF",               title: "Participation à l'Assemblée Parlementaire de la Francophonie",                status: "Planifié", sColor: C,        date: "Sept. 2026" },
        { ref: "UIP",               title: "Réunion du Groupe Interparlementaire d'amitié — Union Inter-Parlementaire",   status: "Planifié", sColor: C,        date: "Oct. 2026" },
        { ref: "EISA",              title: "Séminaire régional EISA sur la gouvernance démocratique à Madagascar",        status: "Planifié", sColor: C,        date: "Nov. 2026" },
      ],
    },
  ];
  const active = tabs[tab];

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left */}
          <div>
            <SectionLabel color={G}>Travaux Parlementaires</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 700, color: TXT, lineHeight: 1.2, marginBottom: "2rem" }}>
              L'activité législative <em style={{ fontWeight: 400, color: R }}>du Sénat</em>
            </h2>
            <div className="flex flex-col gap-2.5 mb-8">
              {tabs.map((t, i) => (
                <button key={t.label} onClick={() => setTab(i)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", fontWeight: tab === i ? 600 : 400, backgroundColor: tab === i ? t.color : "transparent", color: tab === i ? "#fff" : MUT, border: `1.5px solid ${tab === i ? t.color : BRD}` }}>
                  <t.icon size={15} />{t.label}
                </button>
              ))}
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-80"
              style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 600, backgroundColor: active.color, color: active.color === C ? TXT : "#fff" }}>
              Voir tout <ArrowRight size={13} />
            </a>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {/* Real image banner */}
            <div className="relative rounded-xl overflow-hidden mb-1" style={{ height: 130 }}>
              <img src={active.img} alt={active.label} className="w-full h-full object-cover"
                onError={e => (e.currentTarget as HTMLImageElement).style.display = "none"} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right,${active.color}cc,${active.color}44 60%,transparent)` }} />
              <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: active.color }} />
              <div className="absolute inset-0 flex items-center px-6">
                <h3 className="text-white" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700 }}>{active.label}</h3>
              </div>
            </div>
            {active.items.map((item, i) => (
              <div key={i} className="group flex gap-4 bg-white rounded-xl border p-5 cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: BRD }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = active.color + "44"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BRD}>
                <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: active.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: active.color }}>{item.ref}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontFamily: "'Inter',sans-serif", fontWeight: 600, color: item.sColor, backgroundColor: item.sColor + "18" }}>{item.status}</span>
                  </div>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.93rem", fontWeight: 600, color: TXT, lineHeight: 1.4, marginBottom: 4 }}>{item.title}</h4>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", color: MUT }}>{item.date}</span>
                </div>
                <ArrowRight size={13} className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: active.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PARTNERS — all 12 real logos
═══════════════════════════════════════════════════════════════════ */
const PARTNERS = [
  { logo: IMG.pAn,   name: "Assemblée Nationale Madagascar",              color: R },
  { logo: IMG.pPrim, name: "Présidence / Primature",                      color: G },
  { logo: IMG.pHcc,  name: "Haute Cour Constitutionnelle",                color: C },
  { logo: IMG.pPap,  name: "Parlement Panafricain",                       color: G },
  { logo: IMG.pApf,  name: "Assemblée Parlementaire de la Francophonie",  color: R },
  { logo: IMG.pCn,   name: "CN Législatif",                               color: C },
  { logo: IMG.pEisa, name: "EISA",                                        color: G },
  { logo: IMG.pEces, name: "ECES",                                        color: R },
  { logo: IMG.pFes,  name: "Friedrich Ebert Stiftung",                    color: C },
  { logo: IMG.pIpu,  name: "Union Inter-Parlementaire",                   color: G },
  { logo: IMG.pMua,  name: "MUA",                                         color: R },
];

function PartnersSection() {
  return (
    <section style={{ backgroundColor: "#f5f9f5", borderTop: `3px solid ${G}` }} className="py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center mb-8" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: G }}>
          Partenaires &amp; Organisations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {PARTNERS.map(p => (
            <a key={p.name} href="#"
              className="flex items-center justify-center bg-white rounded-xl border transition-all hover:shadow-md"
              style={{ borderColor: BRD, width: 110, height: 64, padding: "8px 14px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.color + "55"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${p.color}22`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BRD; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              title={p.name}>
              <img src={p.logo} alt={p.name} style={{ maxWidth: 80, maxHeight: 44, objectFit: "contain" }}
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const span = document.createElement("span");
                  span.textContent = p.name.slice(0, 4).toUpperCase();
                  span.style.cssText = `font-family:'Inter',sans-serif;font-size:0.58rem;font-weight:700;color:${p.color};letter-spacing:0.06em;`;
                  el.parentNode?.appendChild(span);
                }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
const FOOTER_COLS = [
  { title: "Institution", color: C, links: ["À propos du Sénat", "Historique", "Structures", "Bureau du Sénat", "Séances plénières"] },
  { title: "Travaux",     color: R, links: ["Travaux législatifs", "Calendrier parlementaire", "Textes adoptés", "Rapports", "Journal officiel"] },
  { title: "International", color: C, links: ["Relations internationales", "Groupe d'amitié", "Coopération APF", "Union Africaine", "Espace Presse"] },
];

function Footer() {
  return (
    <footer>
      <div style={{ backgroundColor: GD }} className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={IMG.logo} alt="Sénat de Madagascar" style={{ height: 64, width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", lineHeight: 1 }}>Sénat</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: "0.82rem", color: R }}>de Madagascar</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: "0.86rem", lineHeight: 1.75, color: "rgba(255,255,255,.48)", maxWidth: 320, marginBottom: "1.5rem" }}>
              Le Sénat de Madagascar, chambre haute du Parlement, représente les collectivités territoriales et participe à l'élaboration des lois de la République.
            </p>
            {/* Social */}
            <div className="flex gap-2.5 mb-6">
              {[{ Icon: Facebook, label: "Facebook" }, { Icon: Youtube, label: "YouTube" }].map(({ Icon, label }) => (
                <a key={label} href="#" className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                  style={{ borderColor: "rgba(255,255,255,.16)", color: "rgba(255,255,255,.45)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C; (e.currentTarget as HTMLElement).style.color = C; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.16)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.45)"; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
            {/* Madagascar flag */}
            <div className="flex rounded overflow-hidden" style={{ width: 54, height: 14 }}>
              <div style={{ flex: 1, backgroundColor: "#fff" }} />
              <div style={{ flex: 1, backgroundColor: R }} />
              <div style={{ flex: 1, backgroundColor: G }} />
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: col.color, marginBottom: "1.25rem" }}>{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(lnk => (
                  <li key={lnk}>
                    <a href="#" className="flex items-center gap-1.5 transition-colors"
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,.4)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"}>
                      <ArrowRight size={10} style={{ opacity: 0.4 }} />{lnk}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,.07)" }}>
          <div className="flex flex-wrap gap-6">
            <a href="mailto:contact@senat.mg" className="flex items-center gap-2 transition-colors"
              style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.74rem", color: "rgba(255,255,255,.35)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.35)"}>
              <Mail size={12} />contact@senat.mg
            </a>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.74rem", color: "rgba(255,255,255,.35)" }}>
              <MapPin size={12} />BP 806 Anosikely, Antananarivo 101 — Madagascar
            </div>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,.2)", letterSpacing: "0.04em" }}>
            © 2023 Sénat / DSIC — République de Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter',sans-serif" }}>
      <TopBar />
      <Header />
      <main>
        <HeroCarousel />
        <QuickLinks />
        <NewsSection />
        <AboutSection />
        <ParliamentaryWork />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
