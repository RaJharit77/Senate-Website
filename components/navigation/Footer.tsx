"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { CYAN, EMERALD, NAV_BG, RED, WHITE } from "@/utils/colors";

const footerLinks = [
  {
    title: "Institution",
    color: CYAN,
    links: [
      { label: "À propos du Sénat", path: "/about" },
      { label: "Historique", path: "/historic" },
      { label: "Missions et attributions", path: "/about/mission-and-responsibilities"},
      { label: "Structures", path: "/about/structures" },
      { label: "Textes de référence", path: "/about/reference-texts" },
    ],
  },
  {
    title: "Travaux",
    color: RED,
    links: [
      { label: "Travaux législatifs", path: "/parliamentary-proceedings/legislative-proceedings" },
      { label: "Calendrier parlementaire", path: "/parliamentary-proceedings" },
      { label: "Textes adoptés", path: "/parliamentary-proceedings" },
    ],
  },
  {
    title: "International",
    color: CYAN,
    links: [
      { label: "Relations internationales", path: "/international" },
      { label: "Groupe d'amitié", path: "/international/inter-parliamentary-friendship-group" },
      { label: "Coopération APF", path: "/international" },
      { label: "Espace Presse", path: "/espace-presse" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div style={{ backgroundColor: NAV_BG }} className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="https://senat.mg/wp-content/uploads/2025/03/cropped-senat-192x192.png"
                alt="Sénat de Madagascar"
                width={80}
                height={80}
                className="h-20 w-auto rounded-full border border-cyan-500"
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  Sénat
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  de Madagascar
                </div>
              </div>
            </Link>

            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.88rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1.5rem",
                maxWidth: 320,
              }}
            >
              Le Sénat de Madagascar, chambre haute du Parlement, représente les collectivités territoriales et participe à l&apos;élaboration des lois de la République.
            </p>

            <div className="flex gap-2.5 mb-6">
              <a
                href="https://web.facebook.com/SenatdeMadagascar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                  (e.currentTarget as HTMLElement).style.color = CYAN;
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(91,200,222,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <FaFacebook size={15} />
              </a>
              <a
                href="https://www.youtube.com/@antenimierandoholona"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                  (e.currentTarget as HTMLElement).style.color = CYAN;
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(91,200,222,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="/contact"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = CYAN;
                  (e.currentTarget as HTMLElement).style.color = CYAN;
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(91,200,222,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Mail size={15} />
              </a>
            </div>

            <div className="flex rounded overflow-hidden" style={{ width: 60, height: 16 }}>
              <div style={{ flex: 1, backgroundColor: WHITE }} />
              <div style={{ flex: 1, backgroundColor: RED }} />
              <div style={{ flex: 1, backgroundColor: EMERALD }} />
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: col.color,
                  marginBottom: "1.25rem",
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="flex items-center gap-1.5 transition-all group"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.42)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                        (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)";
                        (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                      }}
                    >
                      <ArrowRight size={11} style={{ opacity: 0.4 }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:contact@senat.mg"
              className="flex items-center gap-2 transition-all"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.76rem",
                color: "rgba(255,255,255,0.38)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = CYAN;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Mail size={13} />
              contact@senat.mg
            </a>
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.76rem",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              <MapPin size={13} />
              BP 806 Anosikely, Antananarivo 101, Madagascar
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Sénat / DSIC — République de Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}