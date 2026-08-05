"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowRight, Tag } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { EMERALD, NAV_BG, RED, WHITE } from "@/utils/colors";
import { footerLinks } from "@/lib/navigations/footerLinks";
import { useEffect, useState, useRef } from "react";
import { release } from "@/lib/api";

export function Footer() {
  const [releaseTag, setReleaseTag] = useState<string | null>(null);
  const [releaseUrl, setReleaseUrl] = useState<string | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const data = await release();
        setReleaseTag(data.tag_name);
        setReleaseUrl(data.html_url);
      } catch (error) {
        console.error("Erreur lors de la récupération de la version :", error);
      }
    };
    fetchRelease();
  }, []);

  // Animation GSAP : flottement doux et rotation lente sur le logo
  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(logoRef.current, {
        rotation: 2.5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <footer style={{ backgroundColor: NAV_BG }}>
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Colonne gauche : logo et description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div ref={logoRef} className="inline-block">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  className="shrink-0"
                >
                  <Image
                    src="https://senat.mg/wp-content/uploads/2025/03/cropped-senat-192x192.png"
                    alt="Sénat de Madagascar"
                    width={80}
                    height={80}
                    priority
                    className="h-20 w-20 rounded-full border border-cyan-500"
                  />
                </motion.div>
                <div>
                  <div className="font-poppins font-bold text-2xl leading-none text-white">
                    Sénat
                  </div>
                  <div className="font-poppins font-semibold text-base leading-tight text-white">
                    de Madagascar
                  </div>
                </div>
              </Link>
            </div>

            <p className="font-poppins text-sm leading-relaxed text-white/50 max-w-xs mb-6">
              Le Sénat de Madagascar, chambre haute du Parlement, représente les collectivités territoriales et participe à l&apos;élaboration des lois de la République.
            </p>

            <div className="flex gap-2.5 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Link
                  href="https://web.facebook.com/SenatdeMadagascar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <FaFacebook size={15} />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Link
                  href="https://www.youtube.com/@antenimierandoholona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <FaYoutube size={15} />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Link
                  href="/contact"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <Mail size={15} />
                </Link>
              </motion.div>
            </div>

            <div className="flex rounded overflow-hidden w-15 h-4">
              <div className="flex-1" style={{ backgroundColor: WHITE }} />
              <div className="flex-1" style={{ backgroundColor: RED }} />
              <div className="flex-1" style={{ backgroundColor: EMERALD }} />
            </div>
          </motion.div>

          {/* Colonnes de liens avec animation stagger */}
          {footerLinks.map((col, index) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
            >
              <h4
                className="font-poppins text-[0.68rem] font-bold uppercase tracking-widest mb-5"
                style={{ color: col.color }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="font-poppins text-sm text-white/40 flex items-center gap-1.5 transition-all duration-300 hover:text-white hover:translate-x-1"
                    >
                      <ArrowRight size={11} className="opacity-40" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bas de page */}
        <motion.div
          className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:contact@senat.mg"
              className="font-poppins text-[0.76rem] text-white/40 flex items-center gap-2 transition-all duration-300 hover:text-cyan-400 hover:-translate-y-0.5"
            >
              <Mail size={13} />
              contact@senat.mg
            </a>
            <div className="font-poppins text-[0.76rem] text-white/40 flex items-center gap-2">
              <MapPin size={13} />
              BP 806 Anosikely, Antananarivo 101, Madagascar
            </div>
          </div>
          <p className="font-poppins text-[0.7rem] text-white/40 tracking-wider">
            © 2026 Sénat / DSIC — République de Madagascar
          </p>
          {releaseTag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={releaseUrl || process.env.GITHUB_LINK_RELEASE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/40 hover:text-cyan-400 text-xs transition-colors"
              >
                <Tag className="w-3 h-3" />
                <span>Version {releaseTag}</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}