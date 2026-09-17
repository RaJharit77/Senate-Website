import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Province } from "@/types/senatorsType";

export default function ProvinceMap({ provinces }: { provinces: Province[] }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {provinces.map((province, idx) => (
                <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6">
                        <h3 className="text-white text-lg font-bold mb-4 font-poppins flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            {province.name}
                        </h3>
                        <ul className="space-y-3">
                            {province.senators.map((senator, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    {senator.image && (
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                                            <Image src={senator.image} alt={senator.name} fill className="object-cover" sizes="48px" />
                                        </div>
                                    )}
                                    <span className="text-sm text-white/80">{senator.name}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
            {provinces.length === 0 && (
                <p className="text-white/40 italic text-center py-12 col-span-full">Aucune province trouvée.</p>
            )}
        </div>
    );
}