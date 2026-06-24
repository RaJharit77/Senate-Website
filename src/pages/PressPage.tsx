import { Calendar, Newspaper, FileText, Image } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const pressReleases = [
    { date: "19 juin 2026", title: "Communiqué de presse du Sénat" },
    { date: "1 avril 2026", title: "Opération d'enregistrement biométrique au Sénat" },
    { date: "10 mars 2026", title: "Célébration de la Journée internationale des droits de la femme" },
    { date: "13 février 2026", title: "Don aux victimes du cyclone Gezani" },
    { date: "7 février 2026", title: "Levée des couleurs au Sénat" },
    { date: "30 janvier 2026", title: "Visite de courtoisie de la délégation de l'Union Africaine" },
];

export default function PressPage() {
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
                        Espace Presse
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
                        Retrouvez tous les communiqués et actualités officielles du Sénat de Madagascar.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: GREEN,
                                marginBottom: "1.5rem",
                            }}
                        >
                            <Newspaper size={22} className="inline mr-2" style={{ color: GREEN }} />
                            Communiqués de presse
                        </h2>
                        <div className="space-y-4">
                            {pressReleases.map((item) => (
                                <div
                                    key={item.date}
                                    className="bg-white rounded-xl p-4 border transition-all hover:shadow-md"
                                    style={{ borderColor: "rgba(15,31,14,0.08)" }}
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <Calendar size={14} style={{ color: CYAN }} />
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>
                                            {item.date}
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e" }}>
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: CYAN,
                                marginBottom: "1.5rem",
                            }}
                        >
                            <Image size={22} className="inline mr-2" style={{ color: CYAN }} />
                            Galerie médias
                        </h2>
                        <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", color: "#4a6648", lineHeight: 1.7 }}>
                                Accédez aux photos et vidéos officielles des événements du Sénat.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${GREEN}11` }}>
                                    <FileText size={24} style={{ color: GREEN }} />
                                </div>
                                <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${RED}11` }}>
                                    <FileText size={24} style={{ color: RED }} />
                                </div>
                                <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${CYAN}11` }}>
                                    <FileText size={24} style={{ color: CYAN }} />
                                </div>
                                <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${GREEN}11` }}>
                                    <FileText size={24} style={{ color: GREEN }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}