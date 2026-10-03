"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, User, ChevronRight } from "lucide-react";
import type { Province } from "@/types/senatorsType";
import { REGIONS, MAP_H, MAP_W } from "@/utils/map";
import { nameToSlug, normalizeProvince, toSvgPoints } from "@/utils/province";

export default function ProvinceMap({ provinces }: { provinces: Province[] }) {
    const [selected, setSelected] = useState<string | null>(null);

    const provinceIndex = useMemo(() => {
        const map = new Map<string, Province>();
        for (const p of provinces) {
            map.set(normalizeProvince(p.name), p);
        }
        return map;
    }, [provinces]);

    const effectiveSelected =
        selected ?? provinces[0]?.name ?? null;

    const selectedProvince = effectiveSelected
        ? provinceIndex.get(normalizeProvince(effectiveSelected)) ?? null
        : null;

    return (
        <div className="grid md:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
            <div className="flex flex-col items-center w-full">
                <div className="w-full rounded-2xl bg-linear-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-4 shadow-2xl shadow-black/30">
                    <svg
                        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                        className="w-full h-auto"
                        role="img"
                        aria-label="Carte interactive des provinces de Madagascar"
                    >
                        <defs>
                            <filter
                                id="provinceShadow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                            >
                                <feDropShadow
                                    dx="0"
                                    dy="3"
                                    stdDeviation="5"
                                    floodColor="#000"
                                    floodOpacity="0.35"
                                />
                            </filter>
                            <linearGradient
                                id="mapBg"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#0f172a"
                                    stopOpacity="0.5"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#020617"
                                    stopOpacity="0.7"
                                />
                            </linearGradient>
                        </defs>

                        <rect
                            x="0"
                            y="0"
                            width={MAP_W}
                            height={MAP_H}
                            rx="20"
                            fill="url(#mapBg)"
                        />

                        <g filter="url(#provinceShadow)">
                            {REGIONS.map((region) => {
                                const key = normalizeProvince(region.name);
                                const matched = provinceIndex.has(key);
                                const count =
                                    provinceIndex.get(key)?.senators.length ?? 0;
                                const isSelected =
                                    effectiveSelected !== null &&
                                    normalizeProvince(effectiveSelected) ===
                                    key;

                                return (
                                    <polygon
                                        key={region.name}
                                        points={toSvgPoints(region.coords)}
                                        fill={
                                            matched
                                                ? isSelected
                                                    ? "#ef4444"
                                                    : region.color
                                                : "#475569"
                                        }
                                        fillOpacity={isSelected ? 0.95 : 0.72}
                                        stroke="#ffffff"
                                        strokeWidth={isSelected ? 1.8 : 0.7}
                                        strokeOpacity={0.7}
                                        strokeLinejoin="round"
                                        className="cursor-pointer transition-all duration-200 hover:brightness-125"
                                        onClick={() => setSelected(region.name)}
                                    >
                                        <title>
                                            {region.name}
                                            {count > 0
                                                ? ` — ${count} sénateur${count > 1 ? "s" : ""}`
                                                : " — aucun sénateur"}
                                        </title>
                                    </polygon>
                                );
                            })}
                        </g>

                        {REGIONS.map((region) => (
                            <text
                                key={`label-${region.name}`}
                                x={region.labelX}
                                y={region.labelY}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="700"
                                fill="#ffffff"
                                stroke="#000000"
                                strokeWidth="0.3"
                                paintOrder="stroke"
                                pointerEvents="none"
                                style={{
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {region.name}
                            </text>
                        ))}
                    </svg>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2 w-full">
                    {REGIONS.map((region) => {
                        const key = normalizeProvince(region.name);
                        const count =
                            provinceIndex.get(key)?.senators.length ?? 0;
                        const isSelected =
                            effectiveSelected !== null &&
                            normalizeProvince(effectiveSelected) === key;

                        return (
                            <button
                                key={region.name}
                                onClick={() => setSelected(region.name)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all ${isSelected
                                        ? "bg-red-500/20 border-red-400/60 text-red-100 shadow-md shadow-red-500/20"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: region.color }}
                                />
                                {region.name}
                                {count > 0 && (
                                    <span className="text-white/40">
                                        ({count})
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="min-w-0">
                {selectedProvince ? (
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
                        <div
                            className="h-1 w-full"
                            style={{
                                background: `linear-gradient(90deg, ${REGIONS.find(
                                    (r) =>
                                        normalizeProvince(r.name) ===
                                        normalizeProvince(
                                            selectedProvince.name
                                        )
                                )?.color ?? "#22c55e"
                                    }, transparent)`,
                            }}
                        />
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-3 mb-5">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                        <h3 className="text-white text-xl font-bold font-poppins">
                                            Province de {selectedProvince.name}
                                        </h3>
                                    </div>
                                    <p className="text-white/50 text-xs uppercase tracking-widest">
                                        {selectedProvince.senators.length} sénateur
                                        {selectedProvince.senators.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                </div>
                                <span className="text-4xl font-bold text-white/10 font-poppins">
                                    {String(
                                        selectedProvince.senators.length
                                    ).padStart(2, "0")}
                                </span>
                            </div>

                            <ul className="space-y-2">
                                {selectedProvince.senators.map((s, i) => (
                                    <li key={i}>
                                        <Link
                                            href={`/your-senators/${nameToSlug(
                                                s.name
                                            )}`}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-cyan-400/30 transition-all group"
                                        >
                                            {s.image ? (
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0 group-hover:border-cyan-400/50 transition-colors">
                                                    <Image
                                                        src={s.image}
                                                        alt={s.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center shrink-0">
                                                    <User className="w-5 h-5 text-white/30" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-white/85 group-hover:text-white flex-1 min-w-0 truncate">
                                                {s.name}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-white/5 backdrop-blur-md border border-dashed border-white/15">
                        <CardContent className="p-12 flex flex-col items-center text-center">
                            <MapPin className="w-12 h-12 text-white/20 mb-4" />
                            <p className="text-white/60 text-sm max-w-xs">
                                Cliquez sur une région de la carte ou sur un
                                bouton de la légende pour afficher les
                                sénateurs qui y sont rattachés.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}