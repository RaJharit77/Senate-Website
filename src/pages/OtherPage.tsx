import { Video, TreePine, Users, Calendar, Heart } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const otherActivities = [
    { icon: Video, title: "Visite économique à l'île de la Réunion", date: "Août 2023", color: GREEN },
    { icon: TreePine, title: "Replantation de 20 000 propagules de palétuviers à Kimony", date: "8 avril 2024", color: RED },
    { icon: Users, title: "Partage d'expériences avec les jeunes du Youth Leadership Seminar", date: "10 mars 2024", color: CYAN },
    { icon: TreePine, title: "Reboisement 2024", date: "4 mars 2024", color: GREEN },
    { icon: Heart, title: "Présentation des vœux du nouvel an au Président du Sénat", date: "7 janvier 2026", color: RED },
];

export default function OtherPage() {
    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#ffffff" }}>
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
                        Autres activités
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
                        Découvrez les initiatives et événements organisés par le Sénat.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherActivities.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white rounded-xl p-6 border transition-all hover:shadow-md"
                            style={{ borderColor: "rgba(15,31,14,0.08)" }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${item.color}22` }}
                            >
                                <item.icon size={22} style={{ color: item.color }} />
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    color: "#0f1f0e",
                                    lineHeight: 1.3,
                                    marginBottom: "0.3rem",
                                }}
                            >
                                {item.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.7rem",
                                    color: "#4a6648",
                                }}
                            >
                                {item.date}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-gray-50 rounded-2xl p-8 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.5rem" }}>
                        Publications et ressources
                    </h3>
                    <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 2, listStyle: "disc", paddingLeft: "1.2rem" }}>
                        <li>Procédure Législative — Télécharger</li>
                        <li>Sokela — Télécharger</li>
                        <li>Concours Logo Sénat Sport — 9 mai 2023</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}