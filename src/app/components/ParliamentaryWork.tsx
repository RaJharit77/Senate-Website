import { useState } from "react";
import { FileText, Calendar, BookOpen, ArrowRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const tabs = [
  {
    id: "legislation",
    icon: FileText,
    label: "Travaux législatifs",
    color: GREEN,
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
    color: RED,
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
    items: [
      { ref: "Constitution", title: "Constitution de la IVème République de Madagascar — 2010", status: "En vigueur", date: "11 Déc. 2010", statusColor: "#16a34a" },
      { ref: "Règlement intérieur", title: "Règlement intérieur du Sénat — Édition révisée 2022", status: "En vigueur", date: "Janv. 2022", statusColor: "#16a34a" },
      { ref: "Loi organique", title: "Loi organique n° 2012-006 relative au Sénat de Madagascar", status: "En vigueur", date: "Mars 2012", statusColor: "#16a34a" },
      { ref: "Charte APF", title: "Charte de la démocratie — Assemblée Parlementaire de la Francophonie", status: "Ratifié", date: "Fév. 2018", statusColor: "#16a34a" },
    ],
  },
];

export function ParliamentaryWork() {
  const [activeTab, setActiveTab] = useState("legislation");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div>
            {/* Decorator */}
            <div className="flex gap-1 mb-4" style={{ height: 3 }}>
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
              Travaux Parlementaires
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "#0f1f0e",
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              L'activité législative{" "}
              <em style={{ fontWeight: 400, color: RED }}>du Sénat</em>
            </h2>

            {/* Tabs */}
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.84rem",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    backgroundColor: activeTab === tab.id ? tab.color : "transparent",
                    color: activeTab === tab.id ? "#ffffff" : "#4a6648",
                    border: `1.5px solid ${activeTab === tab.id ? tab.color : "rgba(15,31,14,0.1)"}`,
                  }}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: active.color,
                color: active.color === CYAN ? "#0f1f0e" : "#fff",
              }}
            >
              Voir tout <ArrowRight size={13} />
            </a>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {active.items.map((item, i) => (
              <div
                key={i}
                className="group flex gap-4 bg-white rounded-xl border p-5 cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: "rgba(15,31,14,0.08)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${active.color}44`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,31,14,0.08)";
                }}
              >
                {/* Left accent */}
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
                        backgroundColor: `${item.statusColor}18`,
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
                      color: "#0f1f0e",
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
                      color: "#4a6648",
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
