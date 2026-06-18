import { FileText, Calendar, BookOpen, ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "legislation",
    icon: FileText,
    label: "Travaux législatifs",
    items: [
      {
        ref: "Loi n° 2026-012",
        title: "Loi portant sur l'organisation de l'administration territoriale",
        status: "Adopté",
        date: "14 Juin 2026",
      },
      {
        ref: "Loi n° 2026-009",
        title: "Loi de finances rectificative pour l'exercice 2026",
        status: "En examen",
        date: "02 Juin 2026",
      },
      {
        ref: "Loi n° 2026-007",
        title: "Loi portant réforme du code électoral malagasy",
        status: "Adopté",
        date: "20 Mai 2026",
      },
      {
        ref: "Loi n° 2026-004",
        title: "Loi relative à la protection de l'environnement marin",
        status: "Adopté",
        date: "8 Avril 2026",
      },
    ],
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendrier parlementaire",
    items: [
      {
        ref: "Session ordinaire",
        title: "Ouverture de la session ordinaire de mai — Sénat",
        status: "Terminé",
        date: "2 Mai 2026",
      },
      {
        ref: "Comité mixte",
        title: "Réunion du comité mixte paritaire Assemblée-Sénat",
        status: "Planifié",
        date: "25 Juin 2026",
      },
      {
        ref: "Session extraordinaire",
        title: "Convocation d'une session extraordinaire sur le budget",
        status: "Planifié",
        date: "15 Juillet 2026",
      },
      {
        ref: "Audition",
        title: "Audition du Premier ministre sur la situation nationale",
        status: "Planifié",
        date: "30 Juillet 2026",
      },
    ],
  },
  {
    id: "texts",
    icon: BookOpen,
    label: "Textes de référence",
    items: [
      {
        ref: "Constitution",
        title: "Constitution de la IVème République de Madagascar — 2010",
        status: "En vigueur",
        date: "11 Déc. 2010",
      },
      {
        ref: "Règlement intérieur",
        title: "Règlement intérieur du Sénat — Édition 2022",
        status: "En vigueur",
        date: "Janv. 2022",
      },
      {
        ref: "Loi organique",
        title: "Loi organique n° 2012-006 sur le Sénat",
        status: "En vigueur",
        date: "Mars 2012",
      },
      {
        ref: "Charte",
        title: "Charte de la démocratie — Union Africaine",
        status: "Ratifié",
        date: "Fév. 2018",
      },
    ],
  },
];

const statusColor: Record<string, { bg: string; text: string }> = {
  Adopté: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
  "En examen": { bg: "rgba(201,147,42,0.15)", text: "#c9932a" },
  Planifié: { bg: "rgba(59,130,246,0.12)", text: "#2563eb" },
  Terminé: { bg: "rgba(107,94,82,0.12)", text: "#6b5e52" },
  "En vigueur": { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
  Ratifié: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
};

import { useState } from "react";

export function ParliamentaryWork() {
  const [activeTab, setActiveTab] = useState("legislation");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: "#f8f7f4" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: heading + tabs */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8b1a1a",
                marginBottom: "0.75rem",
              }}
            >
              Travaux Parlementaires
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "#1a1410",
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              L'activité législative
              <br />
              <em style={{ fontWeight: 400, color: "#6b5e52" }}>du Sénat</em>
            </h2>

            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    backgroundColor:
                      activeTab === tab.id ? "#8b1a1a" : "transparent",
                    color: activeTab === tab.id ? "#ffffff" : "#6b5e52",
                    border: `1px solid ${activeTab === tab.id ? "#8b1a1a" : "rgba(26,20,16,0.1)"}`,
                  }}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 border-b pb-0.5 transition-colors hover:text-primary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#8b1a1a",
                borderColor: "#8b1a1a",
              }}
            >
              Voir tout <ArrowRight size={12} />
            </a>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3">
              {active.items.map((item, i) => (
                <div
                  key={i}
                  className="group flex gap-4 bg-white rounded-lg border p-5 transition-shadow hover:shadow-md cursor-pointer"
                  style={{ borderColor: "rgba(26,20,16,0.08)" }}
                >
                  <div
                    className="flex-shrink-0 w-1 rounded-full self-stretch"
                    style={{ backgroundColor: "#8b1a1a" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#8b1a1a",
                        }}
                      >
                        {item.ref}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5"
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          backgroundColor:
                            statusColor[item.status]?.bg ?? "rgba(0,0,0,0.06)",
                          color: statusColor[item.status]?.text ?? "#6b5e52",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h4
                      className="group-hover:text-primary transition-colors mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#1a1410",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "'Inter', sans-serif",
                        color: "#6b5e52",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <ArrowRight
                    size={15}
                    className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#8b1a1a" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
