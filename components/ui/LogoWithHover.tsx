"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import gsap from "gsap";

interface LogoWithHoverProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    rounded?: boolean; // pour appliquer un border-radius différent
}

export function LogoWithHover({
    src,
    alt,
    width = 80,
    height = 80,
    className = "",
    priority = false,
    quality = 100,
    rounded = false,
}: LogoWithHoverProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Motion values pour l'effet de tilt (inclinaison 3D)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
    const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

    // Gestion du déplacement de la souris pour le tilt
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;
        mouseX.set(offsetX);
        mouseY.set(offsetY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Animation GSAP : lueur et pulse au survol
    useEffect(() => {
        const el = imageRef.current;
        if (!el) return;

        const handleMouseEnter = () => {
            gsap.to(el, {
                scale: 1.08,
                duration: 0.4,
                ease: "back.out(1.7)",
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.7), 0 0 80px rgba(6, 182, 212, 0.3)",
                borderColor: "rgba(6, 182, 212, 0.9)",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut",
                boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
                borderColor: "rgba(255,255,255,0.15)",
            });
        };

        const container = containerRef.current;
        container?.addEventListener("mouseenter", handleMouseEnter);
        container?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container?.removeEventListener("mouseenter", handleMouseEnter);
            container?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const borderRadius = rounded ? "rounded-full" : "rounded-none";

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX: rotateX as MotionValue<number>,
                rotateY: rotateY as MotionValue<number>,
                transformStyle: "preserve-3d",
                display: "inline-block",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`${className} relative`}
        >
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                quality={quality}
                className={`${borderRadius} border-2 border-white/15 transition-shadow duration-300`}
                style={{ display: "block" }}
            />
        </motion.div>
    );
}