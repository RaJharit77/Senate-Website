"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/utils/socialLinks";
import Link from "next/link";
import { Share2, X } from "lucide-react";

export function FloatingSocialBar() {
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleOpen = () => setIsOpen((prev) => !prev);
    const closeBar = () => setIsOpen(false);

    const shouldShowBar = visible && (isDesktop ? true : isOpen);

    return (
        <>
            {visible && !isDesktop && !isOpen && (
                <motion.button
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4 }}
                    onClick={toggleOpen}
                    className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
                    style={{
                        width: 48,
                        height: 48,
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.7)",
                    }}
                >
                    <Share2 size={20} />
                    <span className="sr-only">Ouvrir les réseaux sociaux</span>
                </motion.button>
            )}


            <AnimatePresence>
                {shouldShowBar && (
                    <motion.aside
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 sm:gap-3"
                    >
                        {!isDesktop && (
                            <button
                                onClick={closeBar}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg sm:h-12 sm:w-12"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.7)",
                                }}
                            >
                                <X size={18} className="sm:h-6 sm:w-6" />
                                <span className="sr-only">Fermer</span>
                            </button>
                        )}
                        {socialLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg sm:h-12 sm:w-12"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.7)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = link.color + "55";
                                    e.currentTarget.style.borderColor = link.color;
                                    e.currentTarget.style.color = link.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                                }}
                            >
                                <link.icon size={18} className="sm:h-6 sm:w-6" />
                                <span className="sr-only">{link.label}</span>
                            </Link>
                        ))}
                        <div className="mt-1 h-8 w-px bg-linear-to-b from-cyan-400/50 to-transparent sm:h-12" />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}