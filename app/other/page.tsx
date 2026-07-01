import { getCustomPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Calendar } from "lucide-react";

export default async function OtherPage() {
    const items = await getCustomPosts("autres", { per_page: 10 }).catch(() => []);

    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#ffffff" }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: WHITE }} />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#0f1f0e" }}>Autres activités</h1>
                    <p className="text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif", color: "#4a6648" }}>Découvrez les initiatives et événements organisés par le Sénat.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item: any) => (
                        <div key={item.id} className="bg-white rounded-xl p-6 border transition-all hover:shadow-md" style={{ borderColor: "rgba(15,31,14,0.08)" }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${EMERALD}22` }}>
                                <Calendar size={22} style={{ color: EMERALD }} />
                            </div>
                            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#0f1f0e" }}>{item.title.rendered}</h3>
                            <p className="text-sm text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>{new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                            {item.excerpt && <p className="text-sm text-gray-500 mt-2" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />}
                        </div>
                    ))}
                    {items.length === 0 && <p className="text-gray-500 col-span-full">Aucune activité à afficher.</p>}
                </div>
            </div>
        </div>
    );
}