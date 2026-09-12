"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

interface HiddenPhoneNumberProps {
    fullNumber: string;
    maskedNumber: string;
    accentColor: string;
    variant: "header" | "card";
}

export default function HiddenPhoneNumber({
    fullNumber,
    maskedNumber,
    accentColor,
    variant,
}: HiddenPhoneNumberProps) {
    const [isHovered, setIsHovered] = useState(false);

    if (variant === "header") {
        const digitsOnly = fullNumber.replace(/[^\d+]/g, "");
        return (
            <a
                href={`https://wa.me/${digitsOnly.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 group transition-all duration-200"
                style={{ letterSpacing: "0.03em" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span
                    className="flex items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                    style={{
                        width: 22,
                        height: 22,
                        backgroundColor: "rgba(255,255,255,0.35)",
                    }}
                >
                    <Phone size={12} style={{ color: "#000" }} />
                </span>
                <span
                    className="font-semibold group-hover:opacity-80 transition-opacity tabular-nums"
                    style={{ fontSize: "0.72rem", color: "#000" }}
                >
                    {isHovered ? fullNumber : maskedNumber}
                </span>
            </a>
        );
    }

    return (
        <div
            className="hidden lg:flex items-start gap-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accentColor}22` }}
            >
                <Phone size={22} style={{ color: accentColor }} />
            </div>
            <div>
                <p className="text-white/80 font-semibold text-sm">Téléphone</p>
                <p className="text-white/60 text-sm tabular-nums">
                    {isHovered ? fullNumber : maskedNumber}
                </p>
            </div>
        </div>
    );
}
