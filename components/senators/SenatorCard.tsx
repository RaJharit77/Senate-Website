// components/senators/SenatorCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RED } from "@/utils/colors";
import { Senateur } from "@/types/senatorsType";

export default function SenatorCard({ senator }: { senator: Senateur }) {
    return (
        <Link
            href={`/your-senators/${senator.id}`}
            className="block group focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg"
            aria-label={`Voir la fiche complète de ${senator.name}`}
        >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-red-500/40 group-hover:shadow-2xl group-hover:shadow-red-500/10 group-hover:-translate-y-0.5">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                        {senator.image ? (
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-4 group-hover:border-red-500/50 transition-colors">
                                <Image
                                    src={senator.image}
                                    alt={senator.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="192px"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-48 h-48 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center mb-4">
                                <User className="w-20 h-20 text-white/20" />
                            </div>
                        )}

                        <h3 className="text-white text-xl font-bold mb-1 font-poppins">
                            {senator.name}
                        </h3>

                        {senator.fonction && (
                            <Badge
                                className="mb-3 text-xs"
                                style={{
                                    backgroundColor: `${RED}33`,
                                    color: "#fca5a5",
                                    border: `1px solid ${RED}66`,
                                }}
                            >
                                {senator.fonction}
                            </Badge>
                        )}

                        <div className="space-y-1.5 text-sm text-white/70 mt-2 w-full">
                            {senator.age && (
                                <p>
                                    <span className="text-white/40">Âge : </span>
                                    {senator.age}
                                </p>
                            )}
                            {senator.eluDesigne && (
                                <p>
                                    <span className="text-white/40">Élu/Désigné : </span>
                                    {senator.eluDesigne}
                                </p>
                            )}
                            {senator.province && (
                                <p>
                                    <span className="text-white/40">Province : </span>
                                    {senator.province}
                                </p>
                            )}
                            {senator.parti && (
                                <p>
                                    <span className="text-white/40">Parti : </span>
                                    {senator.parti}
                                </p>
                            )}
                            {senator.commissions.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                        Commissions
                                    </p>
                                    <ul className="text-left text-xs text-white/70 space-y-0.5">
                                        {senator.commissions.slice(0, 3).map((c, i) => (
                                            <li key={i}>• {c}</li>
                                        ))}
                                        {senator.commissions.length > 3 && (
                                            <li className="text-white/40 italic">
                                                + {senator.commissions.length - 3} autres
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 w-full">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors">
                                Voir la fiche complète
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}