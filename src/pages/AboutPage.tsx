import { BookOpen, Users, Scale, Globe, Building2, FileText } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const GREEN_DARK = "#0f3a0c";

export default function AboutPage() {
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
                        À propos du Sénat
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
                        Découvrez l'histoire, la mission et l'organisation de la chambre haute du Parlement malgache.
                    </p>
                </div>

                {/* Missions section */}
                <section id="missions" className="mb-16">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: GREEN,
                            marginBottom: "1.5rem",
                        }}
                    >
                        Missions et attributions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                                <Scale size={24} style={{ color: GREEN }} />
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.5rem" }}>
                                Fonction législative
                            </h3>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                                Les Sénateurs élaborent des propositions de loi pour satisfaire les besoins de leurs régions. La loi est l'expression de la volonté du peuple.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                                <Users size={24} style={{ color: RED }} />
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.5rem" }}>
                                Contrôle de l'action gouvernementale
                            </h3>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                                Le Sénat contrôle l'action du Gouvernement et évalue l'efficacité des politiques publiques.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                                <Globe size={24} style={{ color: CYAN }} />
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.5rem" }}>
                                Représentation des collectivités
                            </h3>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                                Le Sénat représente les Collectivités Territoriales Décentralisées. Les Sénateurs sont les élus des élus.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                                <BookOpen size={24} style={{ color: GREEN }} />
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.5rem" }}>
                                Fonction consultative
                            </h3>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                                Le Sénat donne son avis sur les questions dont le Gouvernement le saisit, à l'exclusion de tout projet législatif.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Structures section */}
                <section id="structures" className="mb-16">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: RED,
                            marginBottom: "1.5rem",
                        }}
                    >
                        Structures
                    </h2>
                    <div className="bg-white rounded-xl p-8 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: GREEN, marginBottom: "0.5rem" }}>
                                    <Building2 size={18} className="inline mr-2" style={{ color: GREEN }} />
                                    Cabinet du Président
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 1.6 }}>
                                    Assiste le Président dans l'accomplissement de sa mission de Chef d'Institution. Chargé de la coordination et de la gestion des affaires politiques et des relations publiques.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: RED, marginBottom: "0.5rem" }}>
                                    <Building2 size={18} className="inline mr-2" style={{ color: RED }} />
                                    Secrétariat Général
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 1.6 }}>
                                    Dirige, coordonne et supervise les activités des Services du Sénat. Chargé du contentieux et du traitement des doléances.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: CYAN, marginBottom: "0.5rem" }}>
                                    <Building2 size={18} className="inline mr-2" style={{ color: CYAN }} />
                                    Directions rattachées
                                </h4>
                                <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 1.8, listStyle: "disc", paddingLeft: "1.2rem" }}>
                                    <li>Direction du Système d'Information et de la Communication</li>
                                    <li>Direction de la Législation et des Études</li>
                                    <li>Direction de la Décentralisation</li>
                                    <li>Direction Administrative et des Ressources Humaines</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: GREEN, marginBottom: "0.5rem" }}>
                                    <Building2 size={18} className="inline mr-2" style={{ color: GREEN }} />
                                    Autres organes
                                </h4>
                                <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", lineHeight: 1.8, listStyle: "disc", paddingLeft: "1.2rem" }}>
                                    <li>Inspection Générale du Sénat</li>
                                    <li>Personne Responsable des Marchés Publics</li>
                                    <li>Direction du Protocole</li>
                                    <li>Direction de la Sécurité</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Textes de référence section */}
                <section id="textes">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: CYAN,
                            marginBottom: "1.5rem",
                        }}
                    >
                        Textes de référence
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                                <FileText size={24} style={{ color: GREEN }} />
                            </div>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.3rem" }}>
                                Dispositions constitutionnelles
                            </h4>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "#4a6648", lineHeight: 1.6 }}>
                                Le Sénat est prévu par l'article 80 et suivant de la Constitution de la Quatrième République.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                                <FileText size={24} style={{ color: RED }} />
                            </div>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.3rem" }}>
                                Lois organiques
                            </h4>
                            <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "#4a6648", lineHeight: 1.8, listStyle: "disc", paddingLeft: "1.2rem" }}>
                                <li>Ordonnance n° 2001-001 du 05 janvier 2001</li>
                                <li>Loi Organique n° 2015-007 du 03 mars 2015</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                                <FileText size={24} style={{ color: CYAN }} />
                            </div>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.3rem" }}>
                                Sources règlementaires
                            </h4>
                            <ul style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "#4a6648", lineHeight: 1.8, listStyle: "disc", paddingLeft: "1.2rem" }}>
                                <li>Arrêté n°2001-001 du 08 mai 2001 (Règlement Intérieur)</li>
                                <li>Arrêté n°2001-002 du 16 mai 2001 (Organisation des Services)</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                                <FileText size={24} style={{ color: GREEN }} />
                            </div>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "0.3rem" }}>
                                Textes sur les services
                            </h4>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "#4a6648", lineHeight: 1.6 }}>
                                Arrêté n°2001-002 du 16 mai 2001 portant organisation générale des Services du Sénat.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}