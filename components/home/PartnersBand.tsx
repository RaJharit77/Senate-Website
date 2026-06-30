"use client";

import { CYAN } from "@/utils/colors";
import { partners } from "@/utils/partners";
import { motion } from "framer-motion";
import Image from "next/image";

const loopedPartners = [...partners, ...partners];

export function PartnersBand() {
    return (
        <div
            className="py-12 px-4 sm:px-6 overflow-hidden backdrop-blur-sm relative"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-30" style={{
                    background: `radial-gradient(circle at 20% 50%, rgba(91,200,222,0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(91,200,222,0.1) 0%, transparent 50%)`,
                    animation: "rotateGlow 20s linear infinite",
                }} />
                <div className="absolute inset-0 opacity-20" style={{
                    background: `conic-gradient(from 0deg, transparent, rgba(91,200,222,0.1), transparent, rgba(91,200,222,0.1), transparent)`,
                    animation: "spinGlow 30s linear infinite",
                }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <p
                    className="text-center mb-8 text-lg font-bold uppercase tracking-widest"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: CYAN,
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    Partenaires & Organisations
                </p>
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        style={{ width: "max-content" }}
                    >
                        {loopedPartners.map((p, index) => (
                            <a
                                key={`${p.abbr}-${index}`}
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl border transition-all hover:shadow-md shrink-0 relative card-shine"
                                style={{
                                    borderColor: "rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                    backdropFilter: "blur(4px)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(91,200,222,0.2)`;
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                                }}
                            >
                                <span className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                                    <span className="absolute inset-0 -translate-x-full animate-shine" style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                                        width: "60%",
                                        transform: "skewX(-20deg)",
                                    }} />
                                </span>
                                <div className="relative h-20 w-auto min-w-[80px]">
                                    <Image
                                        src={p.logo}
                                        alt={p.name}
                                        fill
                                        className="object-contain relative z-10"
                                        sizes="(max-width: 768px) 80px, 100px"
                                    />
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes rotateGlow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes spinGlow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(200%) skewX(-20deg); }
                }
                .animate-shine {
                    animation: shine 4s ease-in-out infinite;
                }
                .card-shine {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}