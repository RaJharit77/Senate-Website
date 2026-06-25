// src/pages/HistoryPage.tsx
import { Calendar, Building2, Award, Users, Clock, Crown } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const WHITE = "#ffffff";

export default function HistoryPage() {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: GREEN }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.2,
                        }}
                    >
                        Historique du Sénat
                    </h1>
                    <p
                        style={{
                            fontFamily: "'Source Serif 4', serif",
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.5)",
                            marginTop: "0.5rem",
                            maxWidth: "600px",
                        }}
                    >
                        Découvrez l'évolution de la chambre haute du Parlement malgache à travers les Républiques.
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
                    <p className="text-white/80 text-lg leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        Le Sénat a été mis en place au lendemain de la naissance de la République Malgache, le 14 octobre 1958,
                        plus précisément après l'adoption de la Constitution du 29 avril 1959. Cependant, il a été mis en veilleuse
                        pendant près de 30 ans pour ne réapparaître qu'en mai 2001. Formant le Parlement avec l'Assemblée Nationale,
                        le Sénat est actuellement dans la deuxième législature de la Quatrième République.
                    </p>
                </div>

                {/* Timeline des Républiques */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Première République */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all hover:scale-105">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                            <Crown size={28} style={{ color: GREEN }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: GREEN, marginBottom: "0.5rem" }}>
                            Première République
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>
                            1959 – 1972
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                            Parlement bicaméral avec 54 Sénateurs. Présidents : Gabriel RAJAONSON, Jules RAVONY, Siméon JAPHET.
                        </p>
                    </div>

                    {/* Deuxième République */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all hover:scale-105">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                            <Building2 size={28} style={{ color: RED }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: RED, marginBottom: "0.5rem" }}>
                            Deuxième République
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>
                            1975 – 1991
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                            Suppression du Sénat au profit d'un Parlement monocaméral. Constitution du 21 décembre 1975.
                        </p>
                    </div>

                    {/* Troisième République */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all hover:scale-105">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                            <Award size={28} style={{ color: CYAN }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: CYAN, marginBottom: "0.5rem" }}>
                            Troisième République
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>
                            1992 – 2009
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                            Réapparition du Sénat en 2001. Constitution de 1992 réinstaure le bicamérisme.
                        </p>
                    </div>

                    {/* Quatrième République */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all hover:scale-105">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                            <Users size={28} style={{ color: GREEN }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: GREEN, marginBottom: "0.5rem" }}>
                            Quatrième République
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>
                            2010 – Aujourd'hui
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                            Bicamérisme rétabli. Actuellement dans la deuxième législature avec 18 Sénateurs.
                        </p>
                    </div>
                </div>

                {/* Détails des législatures */}
                <div className="space-y-6">
                    {/* Première République - Détails */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: GREEN, marginBottom: "1rem" }}>
                            Première République (1959-1972)
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Législature 1959-1966
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    <strong style={{ color: GREEN }}>Président :</strong> Gabriel RAJAONSON (1959-1960)<br />
                                    <strong style={{ color: GREEN }}>Président :</strong> Jules RAVONY (1960-1963)<br />
                                    <strong style={{ color: GREEN }}>Président :</strong> Siméon JAPHET (1963-1966)
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Législature 1966-1972
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    <strong style={{ color: GREEN }}>Président :</strong> Siméon JAPHET (1966-1972)<br />
                                    Composition : 54 Sénateurs
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Période Transitoire
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    1972-1975 : Loi constitutionnelle du 7 novembre 1972, ni Assemblée Nationale ni Sénat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Deuxième République - Détails */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: RED, marginBottom: "1rem" }}>
                            Deuxième République (1975-1991)
                        </h2>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                                La Constitution de la Deuxième République, adoptée le 21 décembre 1975 par référendum et mise en vigueur le 31 décembre 1975,
                                supprime le Sénat en faveur d'un Parlement monocaméral. L'Assemblée Nationale détient l'essentiel du pouvoir législatif,
                                à côté du pouvoir de légiférer par voie d'ordonnance reconnu au Président de la République en Conseil Suprême de la Révolution (CSR).
                            </p>
                        </div>
                    </div>

                    {/* Troisième République - Détails */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: CYAN, marginBottom: "1rem" }}>
                            Troisième République (1992-2009)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Réapparition du Sénat (2001)
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    Constitution de 1992 réinstaure le Sénat. Mise en place effective le 1er mai 2001.<br />
                                    <strong style={{ color: CYAN }}>Président :</strong> RAKOTOMANANA Honoré
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Évolution (2002-2008)
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    <strong style={{ color: CYAN }}>Président :</strong> RAJEMISON Rakotomaharo (2002-2008)<br />
                                    <strong style={{ color: CYAN }}>Président :</strong> RANDRIASANDRATRINIONY Yvan (2008-2009)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Régime Transitoire */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#f59e0b", marginBottom: "1rem" }}>
                            Régime Transitoire (2009-2014)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Conseil Supérieur de la Transition (CST)
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    <strong style={{ color: "#f59e0b" }}>Président :</strong> Général Dolin RASOLOSOA (2010-2014)
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Constitution de 2010
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    Quatrième République préconise le système bicaméral. Parlement composé par l'Assemblée Nationale et le Sénat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quatrième République - Détails */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: GREEN, marginBottom: "1rem" }}>
                            Quatrième République (2010 – Aujourd'hui)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Première Législature (2016-2020)
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    63 Sénateurs (42 élus, 21 nommés)<br />
                                    <strong style={{ color: GREEN }}>Présidents :</strong> Honoré RAKOTOMANANA (2016-2017), Rivo RAKOTOVAO (2017-2021)
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                    Deuxième Législature (2021 – Aujourd'hui)
                                </h4>
                                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                    18 Sénateurs (12 élus, 6 nommés)<br />
                                    <strong style={{ color: GREEN }}>Président :</strong> Herimanana RAZAFIMAHEFA (2021-2023)<br />
                                    <strong style={{ color: GREEN }}>Président actuel :</strong> RAVALOMANANA Richard (depuis 2023)
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/5">
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: WHITE, marginBottom: "0.3rem" }}>
                                Bureau Permanent Actuel
                            </h4>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                                <strong style={{ color: GREEN }}>Président :</strong> RAVALOMANANA Richard<br />
                                <strong style={{ color: GREEN }}>Vice-Président Nord :</strong> IMBIKY Herilaza
                            </p>
                        </div>
                    </div>

                    {/* Section récapitulative */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                            Le Sénat aujourd'hui
                        </h3>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                            Le Sénat de Madagascar est la chambre haute du Parlement bicaméral de la République de Madagascar.
                            Il représente les collectivités territoriales décentralisées et participe au processus législatif national.
                            Composé de sénateurs élus et nommés, il joue un rôle essentiel dans l'équilibre des pouvoirs,
                            la stabilité institutionnelle et la représentation du territoire.
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginTop: "0.5rem" }}>
                            En cas de vacance de la Présidence de la République, c'est le Président du Sénat qui exerce provisoirement
                            les fonctions de Chef de l'Etat, ce qui place le Président du Sénat comme deuxième personnage de l'Etat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}