import { FileText, Calendar, BookOpen, ChevronRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const legislativeItems = [
    { ref: "Loi n° 2026-012", title: "Loi portant sur l'organisation de l'administration territoriale décentralisée", status: "Adopté", date: "14 Juin 2026", statusColor: "#16a34a" },
    { ref: "Loi n° 2026-009", title: "Loi de finances rectificative pour l'exercice 2026", status: "En examen", date: "02 Juin 2026", statusColor: CYAN },
    { ref: "Loi n° 2026-007", title: "Loi portant réforme du code électoral malagasy", status: "Adopté", date: "20 Mai 2026", statusColor: "#16a34a" },
    { ref: "Loi n° 2026-004", title: "Loi relative à la protection de l'environnement marin", status: "Adopté", date: "8 Avril 2026", statusColor: "#16a34a" },
];

const calendarItems = [
    { ref: "Session ordinaire", title: "Ouverture de la session ordinaire de mai — Sénat de Madagascar", status: "Terminé", date: "2 Mai 2026", statusColor: "#6b5e52" },
    { ref: "Comité mixte", title: "Réunion du comité mixte paritaire Assemblée Nationale – Sénat", status: "Planifié", date: "25 Juin 2026", statusColor: CYAN },
    { ref: "Session extraordinaire", title: "Convocation d'une session extraordinaire sur le budget rectificatif", status: "Planifié", date: "15 Juillet 2026", statusColor: CYAN },
];

export default function ParliamentaryPage() {
    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#0f1f0e",
                            lineHeight: 1.2,
                        }}
                    >
                        Travaux Parlementaires
                    </h1>
                    <p
                        style={{
                            fontFamily: "'Source Serif 4', serif",
                            fontSize: "1.1rem",
                            color: "#4a6648",
                            marginTop: "0.5rem",
                            maxWidth: "600px",
                        }}
                    >
                        Suivez l'activité législative et le calendrier des sessions du Sénat.
                    </p>
                </div>

                {/* Travaux législatifs */}
                <section id="legislatifs" className="mb-12">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: GREEN,
                            marginBottom: "1.5rem",
                        }}
                    >
                        <FileText size={24} className="inline mr-3" style={{ color: GREEN }} />
                        Travaux législatifs
                    </h2>
                    <div className="grid gap-4">
                        {legislativeItems.map((item) => (
                            <div
                                key={item.ref}
                                className="flex items-center gap-4 bg-white rounded-xl border p-5 transition-all hover:shadow-md"
                                style={{ borderColor: "rgba(15,31,14,0.08)" }}
                            >
                                <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: GREEN }} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1">
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GREEN }}>
                                            {item.ref}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: item.statusColor, backgroundColor: `${item.statusColor}18` }}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e", lineHeight: 1.4 }}>
                                        {item.title}
                                    </h4>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>
                                        {item.date}
                                    </span>
                                </div>
                                <ChevronRight size={16} style={{ color: GREEN, opacity: 0.4 }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Calendrier parlementaire */}
                <section>
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: RED,
                            marginBottom: "1.5rem",
                        }}
                    >
                        <Calendar size={24} className="inline mr-3" style={{ color: RED }} />
                        Calendrier parlementaire
                    </h2>
                    <div className="grid gap-4">
                        {calendarItems.map((item) => (
                            <div
                                key={item.ref}
                                className="flex items-center gap-4 bg-white rounded-xl border p-5 transition-all hover:shadow-md"
                                style={{ borderColor: "rgba(15,31,14,0.08)" }}
                            >
                                <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: RED }} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1">
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: RED }}>
                                            {item.ref}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: item.statusColor, backgroundColor: `${item.statusColor}18` }}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e", lineHeight: 1.4 }}>
                                        {item.title}
                                    </h4>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>
                                        {item.date}
                                    </span>
                                </div>
                                <ChevronRight size={16} style={{ color: RED, opacity: 0.4 }} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}