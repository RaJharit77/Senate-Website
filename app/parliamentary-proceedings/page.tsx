import { FileText, Calendar, ChevronRight } from "lucide-react";
import { getPostsByCategory } from "@/lib/api";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

// IDs des catégories (à adapter)
const CAT_LOIS = 42;
const CAT_CALENDRIER = 43;

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ParliamentaryPage() {
    const lois = await getPostsByCategory(CAT_LOIS, { per_page: 10 }).catch(() => []);
    const calendrier = await getPostsByCategory(CAT_CALENDRIER, { per_page: 10 }).catch(() => []);

    const legislativeItems = lois.map((item: any) => ({
        ref: item.acf?.reference || item.title.rendered,
        title: item.title.rendered,
        status: item.acf?.statut || "Adopté",
        date: formatDate(item.date),
        statusColor: item.acf?.statut === "Adopté" ? "#16a34a" : "#5bc8de",
    }));

    const calendarItems = calendrier.map((item: any) => ({
        ref: item.acf?.type || "Session",
        title: item.title.rendered,
        status: item.acf?.statut || "Planifié",
        date: formatDate(item.date),
        statusColor: item.acf?.statut === "Terminé" ? "#6b5e52" : "#5bc8de",
    }));

    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#0f1f0e" }}>Travaux Parlementaires</h1>
                    <p className="text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif", color: "#4a6648" }}>Suivez l'activité législative et le calendrier des sessions du Sénat.</p>
                </div>

                <section id="legislatifs" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: GREEN, fontFamily: "'Playfair Display', serif" }}>
                        <FileText size={24} style={{ color: GREEN }} /> Travaux législatifs
                    </h2>
                    <div className="grid gap-4">
                        {legislativeItems.map((item: any) => (
                            <div key={item.ref} className="flex items-center gap-4 bg-white rounded-xl border p-5 transition-all hover:shadow-md" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                                <div className="shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: GREEN }} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1">
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GREEN }}>{item.ref}</span>
                                        <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: item.statusColor, backgroundColor: `${item.statusColor}18` }}>{item.status}</span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e", lineHeight: 1.4 }}>{item.title}</h4>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>{item.date}</span>
                                </div>
                                <ChevronRight size={16} style={{ color: GREEN, opacity: 0.4 }} />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: RED, fontFamily: "'Playfair Display', serif" }}>
                        <Calendar size={24} style={{ color: RED }} /> Calendrier parlementaire
                    </h2>
                    <div className="grid gap-4">
                        {calendarItems.map((item: any) => (
                            <div key={item.ref} className="flex items-center gap-4 bg-white rounded-xl border p-5 transition-all hover:shadow-md" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                                <div className="shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: RED }} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1">
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: RED }}>{item.ref}</span>
                                        <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: item.statusColor, backgroundColor: `${item.statusColor}18` }}>{item.status}</span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e", lineHeight: 1.4 }}>{item.title}</h4>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>{item.date}</span>
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