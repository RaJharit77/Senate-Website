import { Globe, Users, Handshake, Building2 } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

export default function InternationalPage() {
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
                        Coopération Internationale
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
                        Le Sénat de Madagascar entretient des relations parlementaires avec les institutions d'Afrique et du monde.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Activités du Président */}
                    <section id="president" className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                            <Building2 size={28} style={{ color: GREEN }} />
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                color: GREEN,
                                marginBottom: "0.5rem",
                            }}
                        >
                            Activités du Président
                        </h3>
                        <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 2, listStyle: "disc", paddingLeft: "1.2rem" }}>
                            <li>30 janvier 2026</li>
                            <li>29 janvier 2026</li>
                            <li>23 décembre 2025</li>
                            <li>2 octobre 2025</li>
                            <li>20 septembre 2025</li>
                        </ul>
                    </section>

                    {/* Activités des Sénateurs */}
                    <section id="senateurs" className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                            <Users size={28} style={{ color: RED }} />
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                color: RED,
                                marginBottom: "0.5rem",
                            }}
                        >
                            Activités des Sénateurs
                        </h3>
                        <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 2, listStyle: "disc", paddingLeft: "1.2rem" }}>
                            <li>Participation à la 148ème Assemblée de l'UIP à Genève</li>
                            <li>Visite de courtoisie d'une délégation du Sénat en Suisse</li>
                            <li>Conférence du Conseil Parlementaire Asie-Afrique à Beyrouth</li>
                            <li>Accueil des délégations parlementaires étrangères</li>
                        </ul>
                    </section>

                    {/* Groupe Interparlementaire d'Amitié */}
                    <section id="groupe" className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                            <Handshake size={28} style={{ color: CYAN }} />
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                color: CYAN,
                                marginBottom: "0.5rem",
                            }}
                        >
                            Groupe Interparlementaire d'Amitié
                        </h3>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 1.7 }}>
                            Le Groupe Interparlementaire d'Amitié du Sénat de Madagascar développe et renforce les liens de coopération
                            avec les parlements des pays amis, notamment à travers des échanges et des visites officielles.
                        </p>
                        <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 2, listStyle: "disc", paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                            <li>Coopération avec la Francophonie</li>
                            <li>Relations avec l'Union Inter-Parlementaire</li>
                            <li>Partenariat avec le Parlement Panafricain</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}