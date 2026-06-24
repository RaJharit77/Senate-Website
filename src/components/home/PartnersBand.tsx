import { motion } from "framer-motion";

const CYAN = "#5bc8de";

const partners = [
    { name: "Assemblée Nationale", abbr: "AN", logo: "https://senat.mg/wp-content/themes/senat13/images/An.png" },
    { name: "Haute Cour Constitutionnelle", abbr: "HCC", logo: "https://senat.mg/wp-content/themes/senat13/images/hcc.jpg" },
    { name: "Parlement Panafricain", abbr: "PAP", logo: "https://senat.mg/wp-content/themes/senat13/images/Parlement_panafricain_embl%C3%A8me.jpg" },
    { name: "Union Inter-Parlementaire", abbr: "UIP", logo: "https://senat.mg/wp-content/themes/senat13/images/logo_ipu_en.png" },
    { name: "Assemblée Parlementaire de la Francophonie", abbr: "APF", logo: "https://senat.mg/wp-content/themes/senat13/images/Assembl%C3%A9e-parlementaire-de-la-francophonie_Vignette.jpg" },
    { name: "Friedrich Ebert Stiftung", abbr: "FES", logo: "https://senat.mg/wp-content/themes/senat13/images/Logo_Friedrich_Ebert_Stiftung.svg_.png" },
];

const loopedPartners = [...partners, ...partners, ...partners];

export function PartnersBand() {
    return (
        <div
            className="py-12 px-4 sm:px-6 overflow-hidden backdrop-blur-sm relative"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            {/* Rayons lumineux animés en fond */}
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
                    className="text-center mb-8"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: CYAN,
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    Partenaires & Organisations
                </p>
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: ["0%", "-33.33%"],
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        style={{ width: "max-content" }}
                    >
                        {loopedPartners.map((p, index) => (
                            <a
                                key={`${p.abbr}-${index}`}
                                href="#"
                                className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-all hover:shadow-md flex-shrink-0 relative card-shine"
                                style={{
                                    borderColor: "rgba(255,255,255,0.06)",
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                    backdropFilter: "blur(4px)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(91,200,222,0.2)`;
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                                }}
                            >
                                {/* Reflet mobile (shine) */}
                                <span className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                                    <span className="absolute inset-0 -translate-x-full animate-shine" style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                                        width: "60%",
                                        transform: "skewX(-20deg)",
                                    }} />
                                </span>
                                <img
                                    src={p.logo}
                                    alt={p.name}
                                    className="h-10 w-auto object-contain relative z-10"
                                />
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