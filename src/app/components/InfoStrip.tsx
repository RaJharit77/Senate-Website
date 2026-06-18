import { Scale, Calendar, Globe } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const items = [
  {
    icon: Scale,
    label: "Travaux législatifs",
    desc: "Textes en cours d'examen",
    color: GREEN,
    bg: "#eef5ee",
  },
  {
    icon: Calendar,
    label: "Calendrier parlementaire",
    desc: "Prochaine session : 25 Juin 2026",
    color: RED,
    bg: "#fff0f0",
  },
  {
    icon: Globe,
    label: "Sénat International",
    desc: "Diplomatie & coopération",
    color: CYAN,
    bg: "#e8f8fc",
  },
];

export function InfoStrip() {
  return (
    <div
      className="border-b"
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(15,31,14,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ divideColor: "rgba(15,31,14,0.08)" }}>
          {items.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-4 px-6 py-5 group transition-colors"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = item.bg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    color: "#0f1f0e",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    color: "#4a6648",
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <div
                className="ml-auto w-1.5 h-6 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color, opacity: 0.3 }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
