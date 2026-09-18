import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    User,
    Calendar,
    Vote,
    MapPin,
    Flag,
    Briefcase,
    Users,
    Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Senateur } from "@/types/senatorsType";
import { isPresident } from "@/lib/wp-senators";

export default function SenatorCard({ senator }: { senator: Senateur }) {
    const president = isPresident(senator);

    const infoRows = [
        { icon: Calendar, label: "Âge", value: senator.age },
        { icon: Vote, label: "Élu / Désigné", value: senator.eluDesigne },
        { icon: MapPin, label: "Province", value: senator.province },
        { icon: Flag, label: "Parti politique", value: senator.parti },
    ].filter((r) => r.value);

    const commissions = senator.commissions;

    // 🎨 Fond garanti par inline style (impossible à écraser par shadcn)
    const cardBackground = president
        ? "linear-gradient(180deg, rgba(245, 158, 11, 0.10) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(255, 255, 255, 0.02) 100%)"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(255, 255, 255, 0.02) 100%)";

    const cardBorder = president
        ? "1px solid rgba(245, 158, 11, 0.35)"
        : "1px solid rgba(255, 255, 255, 0.10)";

    return (
        <Card
            className="relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 border-0 shadow-xl"
            style={{
                background: cardBackground,
                border: cardBorder,
                boxShadow: president
                    ? "0 10px 40px -10px rgba(245, 158, 11, 0.15), 0 0 0 1px rgba(255,255,255,0.02) inset"
                    : "0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.02) inset",
            }}
        >
            {/* Liseré supérieur pour le Président */}
            {president && (
                <div
                    className="h-1 w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, #fbbf24, transparent)",
                    }}
                />
            )}

            <CardContent className="p-6 sm:p-7">
                {/* ═══════════ EN-TÊTE : photo + nom ═══════════ */}
                <div className="flex items-start gap-5 mb-6">
                    {/* Photo */}
                    <div className="relative shrink-0">
                        <div
                            className="absolute -inset-2 rounded-full blur-xl opacity-50"
                            style={{
                                background: president
                                    ? "rgba(245, 158, 11, 0.30)"
                                    : "rgba(239, 68, 68, 0.15)",
                            }}
                        />
                        {senator.image ? (
                            <div
                                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 shadow-lg ${
                                    president
                                        ? "border-amber-400/60 ring-2 ring-amber-400/20"
                                        : "border-white/25 ring-2 ring-white/5"
                                }`}
                            >
                                <Image
                                    src={senator.image}
                                    alt={senator.name}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                    priority
                                />
                            </div>
                        ) : (
                            <div
                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border-2 ${
                                    president
                                        ? "border-amber-400/60 ring-2 ring-amber-400/20"
                                        : "border-white/25 ring-2 ring-white/5"
                                }`}
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                }}
                            >
                                <User className="w-9 h-9 text-white/20" />
                            </div>
                        )}

                        {/* Badge couronne */}
                        {president && (
                            <div
                                className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #fbbf24, #f59e0b)",
                                    boxShadow:
                                        "0 4px 12px rgba(245, 158, 11, 0.5)",
                                }}
                            >
                                <Crown className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Nom + fonction */}
                    <div className="min-w-0 flex-1 pt-1">
                        <h3 className="text-white text-lg sm:text-xl font-bold font-poppins leading-tight mb-2">
                            {senator.name}
                        </h3>

                        {senator.fonction && (
                            <div
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium max-w-full"
                                style={{
                                    background: president
                                        ? "rgba(245, 158, 11, 0.15)"
                                        : "rgba(239, 68, 68, 0.15)",
                                    color: president ? "#fcd34d" : "#fca5a5",
                                    border: `1px solid ${
                                        president
                                            ? "rgba(245, 158, 11, 0.4)"
                                            : "rgba(239, 68, 68, 0.35)"
                                    }`,
                                }}
                            >
                                <Briefcase className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                    {senator.fonction}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ═══════════ CHIPS D'INFOS ═══════════ */}
                {infoRows.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        {infoRows.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2.5 p-2.5 rounded-xl transition-colors"
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                }}
                            >
                                <div
                                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(6, 182, 212, 0.20), rgba(6, 182, 212, 0.05))",
                                        border: "1px solid rgba(34, 211, 238, 0.20)",
                                    }}
                                >
                                    <Icon className="w-3.5 h-3.5 text-cyan-300" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-1">
                                        {label}
                                    </p>
                                    <p className="text-white text-[13px] font-semibold truncate">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ═══════════ COMMISSIONS ═══════════ */}
                {commissions.length > 0 && (
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-2.5">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            <p className="text-white/50 text-[10px] uppercase tracking-widest font-poppins font-semibold">
                                Commissions & mandats
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {commissions.map((c, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] leading-snug"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.05))",
                                        border: "1px solid rgba(34, 211, 238, 0.20)",
                                        color: "rgba(207, 250, 254, 0.9)",
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{
                                            background: "rgba(34, 211, 238, 0.8)",
                                        }}
                                    />
                                    <span>{c}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════════ CTA ═══════════ */}
                <div
                    className="flex justify-center pt-4"
                    style={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                >
                    <Link
                        href={`/your-senators/${senator.id}`}
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold font-poppins transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 hover:-translate-y-0.5"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(239, 68, 68, 0.25), rgba(239, 68, 68, 0.15))",
                            border: "1px solid rgba(248, 113, 113, 0.40)",
                            color: "#fecaca",
                        }}
                        aria-label={`Voir la fiche complète de ${senator.name}`}
                    >
                        <User className="w-3.5 h-3.5" />
                        <span>Voir la fiche complète</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}