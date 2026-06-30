import { getCustomPosts } from "@/lib/api";
import { CYAN, EMERALD, RED } from "@/utils/colors";
import { Calendar, Newspaper } from "lucide-react";

export default async function PressPage() {
    const items = await getCustomPosts("espace-presse", { per_page: 10 }).catch(() => []);

    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#0f1f0e" }}>Espace Presse</h1>
                    <p className="text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Poppins', sans-serif", color: "#4a6648" }}>Retrouvez tous les communiqués et actualités officielles du Sénat.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: EMERALD, fontFamily: "'Poppins', sans-serif" }}>
                            <Newspaper size={22} style={{ color: EMERALD }} /> Communiqués de presse
                        </h2>
                        <div className="space-y-4">
                            {items.map((item: any) => (
                                <div key={item.id} className="bg-white rounded-xl p-4 border transition-all hover:shadow-md" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                                    <div className="flex items-center gap-3 mb-1">
                                        <Calendar size={14} style={{ color: CYAN }} />
                                        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.7rem", color: "#4a6648" }}>{new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                                    </div>
                                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#0f1f0e" }}>{item.title.rendered}</p>
                                </div>
                            ))}
                            {items.length === 0 && <p className="text-gray-500">Aucun communiqué disponible.</p>}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: CYAN, fontFamily: "'Poppins', sans-serif" }}>Galerie médias</h2>
                        <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <p className="text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>Accédez aux photos et vidéos officielles des événements du Sénat.</p>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${EMERALD}11` }}>📷</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}