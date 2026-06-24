import { Calendar, Building2, Award } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

export default function HistoryPage() {
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
                        Historique du Sénat
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
                        Découvrez l'évolution de la chambre haute du Parlement malgache depuis ses origines.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                            <Calendar size={28} style={{ color: GREEN }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: GREEN, marginBottom: "0.5rem" }}>
                            1958 — Naissance
                        </h3>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                            Le Sénat a été mis en place au lendemain de la naissance de la République Malgache, le 14 octobre 1958, après l'adoption de la Constitution.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                            <Building2 size={28} style={{ color: RED }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: RED, marginBottom: "0.5rem" }}>
                            1959 — Première installation
                        </h3>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                            Le Sénat est installé pour la première fois en 1959, avec des attributions constitutionnelles définies.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                            <Award size={28} style={{ color: CYAN }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: CYAN, marginBottom: "0.5rem" }}>
                            2010 — IVème République
                        </h3>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                            La Constitution de la IVème République réaffirme le rôle du Sénat comme chambre haute du Parlement bicaméral.
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-gray-50 rounded-2xl p-8 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "1rem" }}>
                        Le Sénat aujourd'hui
                    </h3>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1rem", color: "#4a6648", lineHeight: 1.8 }}>
                        Le Sénat de Madagascar est la chambre haute du Parlement bicaméral de la République de Madagascar.
                        Il représente les collectivités territoriales décentralisées et participe au processus législatif national.
                        Composé de sénateurs élus et nommés, il joue un rôle essentiel dans l'équilibre des pouvoirs,
                        la stabilité institutionnelle et la représentation du territoire.
                    </p>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1rem", color: "#4a6648", lineHeight: 1.8, marginTop: "0.5rem" }}>
                        En cas de vacance de la Présidence de la République, c'est le Président du Sénat qui exerce provisoirement
                        les fonctions de Chef de l'Etat, ce qui place le Président du Sénat comme deuxième personnage de l'Etat.
                    </p>
                </div>
            </div>
        </div>
    );
}