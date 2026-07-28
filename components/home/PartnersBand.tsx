"use client";

import { CYAN } from "@/utils/colors";
import { partners } from "@/utils/data/partners";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

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
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at 20% 50%, rgba(91,200,222,0.15) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 50%, rgba(91,200,222,0.1) 0%, transparent 50%)`,
                        animation: "rotateGlow 20s linear infinite",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `conic-gradient(from 0deg, transparent, rgba(91,200,222,0.1), transparent, rgba(91,200,222,0.1), transparent)`,
                        animation: "spinGlow 30s linear infinite",
                    }}
                />
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
                        className="flex gap-4"
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
                            <Card
                                key={`${p.abbr}-${index}`}
                                className="border-none shadow-none bg-transparent p-0 shrink-0"
                            >
                                <motion.a
                                    href="#"
                                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all hover:shadow-md"
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                                        backdropFilter: "blur(4px)",
                                        border: "none",
                                        boxShadow: "none",
                                        outline: "none",
                                    }}
                                    whileHover={{
                                        scale: 1.12,
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        boxShadow: "0 12px 40px rgba(91,200,222,0.3)",
                                        transition: { duration: 0.3, ease: "easeOut" },
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                                        <span
                                            className="absolute inset-0 -translate-x-full animate-shine"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                                                width: "60%",
                                                transform: "skewX(-20deg)",
                                            }}
                                        />
                                    </span>
                                    <div className="relative h-20 w-auto min-w-[80px]">
                                        <Image
                                            src={p.logo}
                                            alt={p.name}
                                            fill
                                            priority
                                            className="object-contain relative z-10"
                                            sizes="(max-width: 768px) 80px, 100px"
                                        />
                                    </div>
                                </motion.a>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}