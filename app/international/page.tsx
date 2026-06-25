import { getInternational } from "@/lib/api";
import { Globe, Users, Handshake, Building2 } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

export default async function InternationalPage() {
    const items = await getInternational({ per_page: 10 }).catch(() => []);

    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#ffffff" }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#0f1f0e" }}>Coopération Internationale</h1>
                    <p className="text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif", color: "#4a6648" }}>Le Sénat de Madagascar entretient des relations parlementaires avec les institutions d'Afrique et du monde.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <section className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}><Building2 size={28} style={{ color: GREEN }} /></div>
                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>Activités du Président</h3>
                        <ul className="space-y-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648" }}>
                            {items.filter((p: any) => p.acf?.type === "president").map((p: any) => (
                                <li key={p.id}>{new Date(p.date).toLocaleDateString("fr-FR")}</li>
                            ))}
                            {items.filter((p: any) => p.acf?.type === "president").length === 0 && <li>Aucune activité récente</li>}
                        </ul>
                    </section>

                    <section className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}><Users size={28} style={{ color: RED }} /></div>
                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: RED }}>Activités des Sénateurs</h3>
                        <ul className="space-y-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648" }}>
                            {items.filter((p: any) => p.acf?.type === "senateur").map((p: any) => (
                                <li key={p.id}>{p.title.rendered}</li>
                            ))}
                            {items.filter((p: any) => p.acf?.type === "senateur").length === 0 && <li>Aucune activité récente</li>}
                        </ul>
                    </section>

                    <section className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.06)" }}>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}><Handshake size={28} style={{ color: CYAN }} /></div>
                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: CYAN }}>Groupe Interparlementaire d'Amitié</h3>
                        <p className="text-sm" style={{ fontFamily: "'Source Serif 4', serif", color: "#4a6648" }}>Le Groupe Interparlementaire d'Amitié du Sénat de Madagascar développe et renforce les liens de coopération.</p>
                        <ul className="mt-4 space-y-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.9rem", color: "#4a6648", listStyle: "disc", paddingLeft: "1.2rem" }}>
                            {items.filter((p: any) => p.acf?.type === "groupe").map((p: any) => (
                                <li key={p.id}>{p.title.rendered}</li>
                            ))}
                            {items.filter((p: any) => p.acf?.type === "groupe").length === 0 && <li>Aucune information</li>}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}