"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, User, ChevronRight } from "lucide-react";
import type { Province } from "@/types/senatorsType";

/* ------------------------------------------------------------------ */
/* Dimensions de la carte (viewBox)                                    */
/* ------------------------------------------------------------------ */

const MAP_W = 405;
const MAP_H = 800;

/* ------------------------------------------------------------------ */
/* Régions : coords HTML <area> + couleur + position du label          */
/* ------------------------------------------------------------------ */

interface RegionDef {
    name: string;
    coords: string;
    color: string;
    /** Position du texte au centre de la région */
    labelX: number;
    labelY: number;
}

const REGIONS: RegionDef[] = [
    {
        name: "Antsiranana",
        color: "#22c55e",
        labelX: 320,
        labelY: 115,
        coords:
            "334,24,333,28,333,29,334,30,335,30,336,29,335,31,336,32,338,34,342,35,344,39,346,42,345,43,344,43,344,46,344,50,350,52,350,59,353,59,354,57,356,58,356,60,358,64,363,70,363,76,364,82,369,92,370,98,377,120,375,124,377,129,377,141,380,145,378,153,378,158,380,168,381,169,382,171,383,174,386,183,390,188,392,193,394,198,395,201,393,208,391,214,386,226,387,228,386,230,384,232,382,235,381,238,378,238,376,236,374,233,373,229,373,225,371,216,372,212,369,205,371,201,370,199,368,198,364,198,361,194,359,189,356,189,353,188,351,185,349,181,348,179,346,179,344,180,344,181,340,178,339,175,338,167,336,162,333,157,330,154,327,152,324,148,320,139,317,137,313,136,310,137,307,139,301,137,298,137,295,137,290,132,288,131,286,130,280,131,277,130,274,126,271,123,269,121,267,122,264,125,262,129,259,128,260,126,261,124,260,122,258,120,256,118,255,114,256,109,255,106,257,104,259,102,259,102,261,103,263,101,267,105,269,112,271,116,275,117,276,116,278,115,279,111,279,109,280,102,284,101,286,100,289,101,289,96,288,95,287,93,290,95,295,96,301,94,303,92,304,89,306,86,306,79,307,75,309,70,312,66,313,62,308,49,309,46,308,44,307,43,306,44,305,42,304,41,303,40,303,38,306,38,307,41,309,42,311,41,313,39,314,34,318,31,323,28,325,23,324,21,322,19,327,18,327,15,328,13,332,17,334,20,334,24",
    },
    {
        name: "Mahajanga",
        color: "#4ade80",
        labelX: 235,
        labelY: 215,
        coords:
            "280,133,286,131,291,135,293,138,296,139,300,138,307,140,310,138,313,137,319,139,324,150,326,152,328,154,333,158,335,162,337,167,338,178,342,181,341,182,340,185,338,186,337,186,336,190,336,194,336,196,334,198,330,198,327,198,322,201,317,204,317,206,318,210,320,211,321,211,320,212,320,215,320,222,319,227,320,239,322,242,324,245,325,247,326,249,325,257,324,261,320,266,314,275,314,279,301,279,299,277,294,266,292,262,289,259,282,258,279,256,274,254,270,256,259,256,258,257,257,259,256,272,257,275,258,278,257,281,257,284,259,286,261,290,263,294,264,299,270,301,272,307,269,313,266,319,267,321,268,323,267,326,265,329,262,333,259,337,257,345,254,347,249,348,243,345,234,347,231,347,230,345,226,342,224,339,221,338,206,342,204,342,203,338,202,336,200,335,190,338,183,339,177,340,174,341,172,343,166,344,159,345,153,343,150,343,142,364,139,367,137,367,133,366,132,366,129,369,120,371,114,369,113,367,111,366,108,365,104,367,102,365,99,363,97,365,96,367,93,369,91,370,88,371,87,375,91,382,94,392,96,396,98,399,96,403,98,406,99,409,100,413,101,418,103,420,106,423,98,424,96,426,95,427,91,427,85,425,81,425,77,425,72,423,68,421,66,422,64,423,62,421,60,418,58,411,58,407,59,400,57,392,53,383,51,380,49,377,47,359,46,354,45,351,48,340,47,337,44,334,42,329,42,325,42,322,47,314,48,312,52,303,55,300,60,292,63,288,64,283,66,281,68,279,69,277,68,273,69,270,70,268,67,259,69,252,85,252,86,253,88,253,96,249,102,245,105,240,107,239,109,237,112,237,112,246,118,246,119,244,120,242,119,239,123,239,126,239,128,239,130,242,132,242,134,229,139,230,142,230,144,228,148,228,151,231,157,234,157,228,160,225,162,226,164,226,165,227,164,228,164,229,166,234,169,240,172,238,176,237,177,235,175,232,173,230,170,230,172,226,172,222,173,219,176,216,185,210,190,205,196,199,202,195,204,196,204,198,205,200,208,202,208,204,206,205,204,207,203,212,204,215,205,214,207,212,213,211,219,209,219,207,218,206,217,205,214,200,211,197,210,195,211,192,222,179,225,178,227,176,226,175,225,174,224,175,222,175,222,173,226,170,228,168,229,166,232,166,232,170,232,172,227,181,226,186,227,189,229,189,231,189,237,182,238,179,244,168,247,164,249,162,251,163,253,164,255,167,258,167,258,164,259,167,260,171,262,168,262,165,261,162,259,160,256,158,252,160,251,158,249,157,246,158,247,154,245,150,247,145,249,140,253,141,258,140,258,141,257,143,259,146,262,143,262,140,264,135,262,130,269,122,273,128,276,131,280,133",
    },
    {
        name: "Toamasina",
        color: "#22c55e",
        labelX: 315,
        labelY: 340,
        coords:
            "353,189,356,190,358,191,361,196,365,200,366,200,367,199,368,199,369,199,370,201,368,204,370,211,371,222,372,223,372,226,372,232,371,228,369,226,368,225,367,221,367,219,366,216,364,214,364,209,362,207,360,206,357,207,354,207,352,209,349,212,348,215,349,221,353,233,351,240,352,245,355,247,354,247,354,248,356,251,358,256,361,264,360,269,358,274,354,281,356,284,359,287,353,288,350,289,347,291,344,296,341,302,337,317,338,321,340,324,340,331,343,336,337,354,336,357,335,361,335,367,333,376,330,384,325,396,321,406,314,427,310,436,306,446,305,452,304,459,304,463,302,467,297,478,292,490,284,488,282,485,278,485,276,483,273,481,270,479,268,481,267,485,266,489,265,489,261,488,256,489,253,490,248,488,245,487,244,485,247,472,246,468,248,464,248,459,252,452,252,447,257,434,261,425,257,415,260,404,259,397,263,372,262,365,263,358,262,351,259,348,258,346,259,342,261,336,264,331,267,327,268,325,269,323,268,319,269,316,270,311,272,309,273,307,273,303,272,301,269,300,265,299,263,290,258,281,259,278,257,272,258,260,259,257,261,256,267,257,273,256,276,256,279,257,281,259,285,260,289,261,292,264,294,269,299,280,313,280,314,280,314,279,321,267,327,258,327,245,324,242,322,240,321,233,320,227,321,219,321,214,323,210,321,209,319,209,318,206,322,203,326,200,330,200,334,199,337,198,338,194,338,187,340,185,342,182,344,181,346,180,349,181,350,184,351,187,353,189",
    },
    {
        name: "Antananarivo",
        color: "#16a34a",
        labelX: 190,
        labelY: 410,
        coords:
            "202,337,202,341,202,343,204,344,206,344,207,343,215,341,219,339,224,339,225,343,234,349,242,346,246,348,250,349,256,348,258,349,260,351,261,354,262,358,261,365,262,373,261,380,259,391,257,397,259,404,256,414,259,426,252,442,250,446,251,451,249,454,246,459,246,462,246,464,245,466,239,468,235,469,227,468,224,468,221,468,219,469,216,472,212,473,208,475,204,477,200,479,196,480,192,479,190,481,188,479,186,478,181,480,178,478,174,478,169,478,167,477,169,473,168,470,166,468,160,468,158,466,156,463,147,461,142,459,140,457,139,456,142,447,140,442,140,437,139,433,142,423,141,421,139,420,138,420,137,421,135,421,134,416,132,412,129,410,126,408,125,407,125,405,126,395,126,393,130,388,132,384,132,381,130,367,135,367,137,369,140,368,142,365,146,358,148,350,150,345,153,345,159,346,166,344,169,344,174,343,180,341,186,340,192,339,198,337,202,337",
    },
    {
        name: "Fianarantsoa",
        color: "#7ee0a3",
        labelX: 220,
        labelY: 585,
        coords:
            "144,462,149,463,155,464,156,465,157,467,160,469,167,469,167,473,166,476,167,478,168,479,172,480,178,480,179,481,181,482,186,480,188,481,198,481,207,476,213,474,217,473,219,471,224,469,226,470,231,471,236,470,245,468,246,472,243,483,244,486,246,489,249,491,252,492,258,490,261,489,265,490,266,490,267,488,268,485,270,481,272,481,274,483,276,485,282,487,283,490,285,491,291,491,291,493,289,498,286,503,287,504,287,505,283,520,283,522,284,523,279,535,279,541,274,555,265,576,262,582,261,589,256,606,252,629,250,634,248,639,247,646,246,652,246,653,244,654,243,658,242,661,240,670,239,674,236,683,234,688,233,691,230,696,229,700,220,693,214,690,210,692,206,697,203,706,202,701,201,699,199,699,197,699,195,698,194,696,194,694,190,690,184,688,182,685,179,684,177,683,177,680,181,673,178,668,176,663,177,660,179,649,179,647,177,646,174,644,168,639,164,632,163,628,162,624,159,621,154,618,144,616,138,617,128,621,122,625,117,630,116,632,115,634,115,637,113,640,111,638,108,637,103,639,101,638,98,636,97,633,97,629,98,625,99,621,101,615,103,606,103,603,106,599,108,596,109,594,110,591,112,588,115,585,110,575,110,572,113,572,115,574,119,571,122,568,119,564,121,562,123,561,126,559,127,555,126,551,126,549,131,540,133,539,135,538,137,536,137,534,136,527,139,517,140,514,140,511,142,499,137,472,138,466,137,460,138,458,141,460,144,462",
    },
    {
        name: "Toliara",
        color: "#4ade80",
        labelX: 115,
        labelY: 600,
        coords:
            "101,365,102,367,103,369,106,367,108,366,111,368,115,370,120,372,129,370,132,381,130,386,127,390,125,393,124,405,124,408,126,409,130,411,132,416,133,420,134,422,136,422,140,421,141,423,138,432,139,437,139,442,140,448,140,451,138,455,136,460,137,466,136,472,141,499,139,507,138,513,137,520,136,524,135,527,136,534,136,536,134,537,132,537,130,539,129,542,127,545,125,549,125,554,125,556,125,558,122,560,119,562,118,564,119,566,120,568,119,570,117,571,112,571,110,571,108,572,113,585,111,588,108,591,107,596,104,599,102,604,99,616,95,628,97,634,98,637,101,639,109,639,115,640,116,637,117,633,118,630,121,627,127,623,138,619,144,617,153,619,158,621,161,625,162,628,163,632,166,638,171,643,177,647,178,648,178,649,177,659,174,663,177,668,180,673,176,680,176,682,177,684,181,687,185,690,189,691,191,693,193,695,194,697,195,700,198,701,201,701,201,704,202,707,205,703,207,698,210,693,214,691,220,694,228,700,225,706,223,712,221,720,219,724,217,728,217,734,215,737,213,741,211,743,211,745,206,747,201,749,195,753,191,756,187,757,184,756,172,756,171,756,163,759,152,763,142,767,137,772,132,775,127,777,122,779,107,779,105,777,103,776,98,774,95,770,92,766,89,766,80,763,66,762,67,759,65,757,63,755,60,754,58,752,56,751,50,749,48,746,47,742,42,732,43,728,41,724,39,722,37,721,32,717,30,715,29,713,27,709,27,705,27,670,27,669,32,669,33,666,32,665,31,665,31,659,30,658,30,656,27,652,24,649,24,645,24,642,20,637,15,632,10,625,8,616,6,606,3,594,4,592,7,591,7,587,4,587,3,583,4,581,4,578,5,576,7,575,9,574,10,572,9,570,10,565,12,562,14,560,17,561,17,558,15,554,15,550,16,542,20,539,26,539,29,538,32,537,34,533,35,529,36,525,37,521,38,518,39,514,42,509,45,507,47,504,49,501,50,496,55,489,57,487,59,484,62,476,65,472,68,469,70,465,71,461,70,457,67,455,67,451,71,441,71,438,70,434,68,430,65,424,66,423,67,423,69,423,72,424,77,426,91,428,97,427,99,425,103,425,105,424,107,423,103,418,102,414,101,410,99,406,98,403,99,399,93,384,90,379,88,375,89,372,91,371,96,369,98,368,98,365,101,365",
    },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function toSvgPoints(coords: string): string {
    const nums = coords.split(",").map((n) => n.trim()).filter(Boolean);
    const pairs: string[] = [];
    for (let i = 0; i < nums.length; i += 2) {
        pairs.push(`${nums[i]},${nums[i + 1]}`);
    }
    return pairs.join(" ");
}

function normalizeProvince(s: string): string {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function nameToSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

/* ------------------------------------------------------------------ */
/* Composant principal                                                 */
/* ------------------------------------------------------------------ */

export default function ProvinceMap({ provinces }: { provinces: Province[] }) {
    const [selected, setSelected] = useState<string | null>(null);

    // Index normalisé province.name → Province
    const provinceIndex = useMemo(() => {
        const map = new Map<string, Province>();
        for (const p of provinces) {
            map.set(normalizeProvince(p.name), p);
        }
        return map;
    }, [provinces]);

    // Sélection effective : celle de l'utilisateur, sinon la 1ère province dispo
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

                        {/* Fond sombre pour faire ressortir la carte */}
                        <rect
                            x="0"
                            y="0"
                            width={MAP_W}
                            height={MAP_H}
                            rx="20"
                            fill="url(#mapBg)"
                        />

                        {/* Provinces */}
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

                        {/* Labels */}
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

                {/* Légende */}
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

            {/* ============ COLONNE DROITE : SÉNATEURS ============ */}
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