"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { EMERALD, NAV_BG, RED, WHITE } from "@/utils/colors";
import { footerLinks } from "@/utils/footerLinks";

export function Footer() {
  return (
    <footer style={{ backgroundColor: NAV_BG }}>
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="https://senat.mg/wp-content/uploads/2025/03/cropped-senat-192x192.png"
                alt="Sénat de Madagascar"
                width={80}
                height={80}
                priority
                className="h-20 w-20 rounded-full border border-cyan-500"
              />
              <div>
                <div className="font-poppins font-bold text-2xl leading-none text-white">
                  Sénat
                </div>
                <div className="font-poppins font-semibold text-base leading-tight text-white">
                  de Madagascar
                </div>
              </div>
            </Link>

            <p className="font-poppins text-sm leading-relaxed text-white/50 max-w-xs mb-6">
              Le Sénat de Madagascar, chambre haute du Parlement, représente les collectivités territoriales et participe à l&apos;élaboration des lois de la République.
            </p>

            <div className="flex gap-2.5 mb-6">
              <Link
                href="https://web.facebook.com/SenatdeMadagascar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <FaFacebook size={15} />
              </Link>
              <Link
                href="https://www.youtube.com/@antenimierandoholona"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <FaYoutube size={15} />
              </Link>
              <Link
                href="/contact"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <Mail size={15} />
              </Link>
            </div>

            <div className="flex rounded overflow-hidden w-15 h-4">
              <div className="flex-1" style={{ backgroundColor: WHITE }} />
              <div className="flex-1" style={{ backgroundColor: RED }} />
              <div className="flex-1" style={{ backgroundColor: EMERALD }} />
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
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
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
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
        </div>
      </div>
    </footer>
  );
}