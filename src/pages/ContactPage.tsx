import { Mail, MapPin, Phone, Clock } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

export default function ContactPage() {
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
                        Contact
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
                        N'hésitez pas à nous contacter pour toute question ou demande d'information.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact form */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "1.5rem" }}>
                            Envoyez-nous un message
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e", display: "block", marginBottom: "0.3rem" }}>
                                    Votre nom
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border px-4 py-3"
                                    style={{ borderColor: "rgba(15,31,14,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                                    placeholder="Nom complet"
                                />
                            </div>
                            <div className="mb-4">
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e", display: "block", marginBottom: "0.3rem" }}>
                                    Votre e-mail
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border px-4 py-3"
                                    style={{ borderColor: "rgba(15,31,14,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                                    placeholder="email@exemple.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e", display: "block", marginBottom: "0.3rem" }}>
                                    Objet
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border px-4 py-3"
                                    style={{ borderColor: "rgba(15,31,14,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                                    placeholder="Sujet de votre message"
                                />
                            </div>
                            <div className="mb-6">
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e", display: "block", marginBottom: "0.3rem" }}>
                                    Votre message
                                </label>
                                <textarea
                                    className="w-full rounded-lg border px-4 py-3"
                                    style={{ borderColor: "rgba(15,31,14,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", minHeight: "120px" }}
                                    placeholder="Écrivez votre message ici..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg text-white transition-all hover:opacity-80"
                                style={{ backgroundColor: GREEN, fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#0f1f0e", marginBottom: "1.5rem" }}>
                            Coordonnées
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GREEN}22` }}>
                                    <MapPin size={22} style={{ color: GREEN }} />
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e" }}>Adresse</p>
                                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648" }}>
                                        BP 806 Anosikely, Antananarivo 101, Madagascar
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${RED}22` }}>
                                    <Mail size={22} style={{ color: RED }} />
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e" }}>E-mail</p>
                                    <a href="mailto:contact@senat.mg" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: RED }}>
                                        contact@senat.mg
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${CYAN}22` }}>
                                    <Phone size={22} style={{ color: CYAN }} />
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e" }}>Téléphone</p>
                                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648" }}>
                                        +261 34 12 01 036
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GREEN}22` }}>
                                    <Clock size={22} style={{ color: GREEN }} />
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#0f1f0e" }}>Horaires</p>
                                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648" }}>
                                        Lundi - Vendredi : 8h00 - 17h00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}