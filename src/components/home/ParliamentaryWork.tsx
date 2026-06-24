import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FileText, Calendar, BookOpen, ArrowRight } from "lucide-react";

const CYAN = "#5bc8de";
const RED = "#cc1111";
const GREEN = "#1a5c16";
const WHITE = "#ffffff";

const infoCards = [
  {
    label: "Calendrier",
    desc: "Ordre du jour des réunions parlementaires",
    image: "https://senat.mg/wp-content/themes/senat13/images/ordre-du-jour.jpg",
    path: "/travaux-parlementaires",
    color: RED,
  },
  {
    label: "Travaux législatifs",
    desc: "Textes en cours et adoptez par le Sénat",
    image: "https://senat.mg/wp-content/themes/senat13/images/lois.jpg",
    path: "/travaux-parlementaires#legislatifs",
    color: CYAN,
  },
  {
    label: "International",
    desc: "Diplomatie Parlementaire",
    image: "https://senat.mg/wp-content/themes/senat13/images/international.jpg",
    path: "/international",
    color: CYAN,
  },
];

const tabs = [
  {
    id: "legislation",
    icon: FileText,
    label: "Travaux législatifs",
    color: CYAN,
    path: "/travaux-parlementaires#legislatifs",
    items: [
      { ref: "Loi n° 2026-012", title: "Loi portant sur l'organisation de l'administration territoriale décentralisée", status: "Adopté", date: "14 Juin 2026", statusColor: "#16a34a" },
      { ref: "Loi n° 2026-009", title: "Loi de finances rectificative pour l'exercice 2026", status: "En examen", date: "02 Juin 2026", statusColor: CYAN },
      { ref: "Loi n° 2026-007", title: "Loi portant réforme du code électoral malagasy", status: "Adopté", date: "20 Mai 2026", statusColor: "#16a34a" },
      { ref: "Loi n° 2026-004", title: "Loi relative à la protection de l'environnement marin", status: "Adopté", date: "8 Avril 2026", statusColor: "#16a34a" },
    ],
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendrier parlementaire",
    color: CYAN,
    path: "/travaux-parlementaires",
    items: [
      { ref: "Session ordinaire", title: "Ouverture de la session ordinaire de mai — Sénat de Madagascar", status: "Terminé", date: "2 Mai 2026", statusColor: "#6b5e52" },
      { ref: "Comité mixte", title: "Réunion du comité mixte paritaire Assemblée Nationale – Sénat", status: "Planifié", date: "25 Juin 2026", statusColor: CYAN },
      { ref: "Session extraordinaire", title: "Convocation d'une session extraordinaire sur le budget rectificatif", status: "Planifié", date: "15 Juillet 2026", statusColor: CYAN },
      { ref: "Audition", title: "Audition du Premier ministre sur la situation économique nationale", status: "Planifié", date: "30 Juillet 2026", statusColor: CYAN },
    ],
  },
  {
    id: "texts",
    icon: BookOpen,
    label: "Textes de référence",
    color: CYAN,
    path: "/a-propos#textes",
    items: [
      { ref: "Constitution", title: "Constitution de la IVème République de Madagascar — 2010", status: "En vigueur", date: "11 Déc. 2010", statusColor: "#16a34a" },
      { ref: "Règlement intérieur", title: "Règlement intérieur du Sénat — Édition révisée 2022", status: "En vigueur", date: "Janv. 2022", statusColor: "#16a34a" },
      { ref: "Loi organique", title: "Loi organique n° 2012-006 relative au Sénat de Madagascar", status: "En vigueur", date: "Mars 2012", statusColor: "#16a34a" },
      { ref: "Charte APF", title: "Charte de la démocratie — Assemblée Parlementaire de la Francophonie", status: "Ratifié", date: "Fév. 2018", statusColor: "#16a34a" },
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export function ParliamentaryWork() {
  const [activeTab, setActiveTab] = useState("legislation");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 bg-black/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <motion.div variants={fadeUp} className="mb-12">
          <div className="flex gap-1 mb-4" style={{ height: 3 }}>
            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
            <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
            <div className="w-4 rounded-full" style={{ backgroundColor: GREEN }} />
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: CYAN,
              marginBottom: "0.5rem",
            }}
          >
            Travaux Parlementaires
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            L'activité législative{" "}
            <em style={{ fontWeight: 400, color: RED }}>du Sénat</em>
          </h2>
        </motion.div>

        {/* Première rangée : 3 cartes de l'InfoStrip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 mb-16">
          {infoCards.map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="h-full">
              <Link
                to={item.path}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/15 hover:ring-white/30"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                  <span
                    className="absolute left-6 top-6 h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 16px ${item.color}` }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-5 px-8 py-8">
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: 10,
                        letterSpacing: "0.01em",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.55,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 text-base font-medium transition-all duration-300 group-hover:gap-3"
                    style={{ color: item.color, fontFamily: "'Inter', sans-serif" }}
                  >
                    <span>Voir plus</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className="h-1 w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: item.color }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Deuxième partie : onglets et listes (ancien ParliamentaryWork) */}
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div variants={fadeUp}>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all hover:scale-[1.02]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.84rem",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    backgroundColor: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.05)",
                    color: activeTab === tab.id ? "#000000" : "rgba(255,255,255,0.7)",
                    border: `1.5px solid ${activeTab === tab.id ? tab.color : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              to={active.path}
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full transition-all hover:opacity-80 hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: active.color,
                color: active.color === CYAN ? "#0f172a" : "#fff",
              }}
            >
              Voir tout <ArrowRight size={13} />
            </Link>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
              >
                {active.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="group flex gap-4 rounded-xl border p-5 cursor-pointer transition-all hover:shadow-md backdrop-blur-sm bg-white/5"
                    style={{
                      borderColor: `rgba(255,255,255,0.1)`,
                    }}
                    whileHover={{
                      borderColor: `${active.color}88`,
                      backgroundColor: `${active.color}15`,
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="flex-shrink-0 w-1 rounded-full self-stretch"
                      style={{ backgroundColor: active.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: active.color,
                          }}
                        >
                          {item.ref}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full"
                          style={{
                            fontSize: "0.65rem",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            color: item.statusColor,
                            backgroundColor: `${item.statusColor}25`,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          lineHeight: 1.4,
                          marginBottom: 6,
                        }}
                      >
                        {item.title}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: active.color }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}