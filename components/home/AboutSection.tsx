"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CYAN, EMERALD, RED, WHITE } from "@/utils/colors";
import { missionData, leadershipData, referenceTextsData } from "@/utils/data/aboutSection";
import { RiArrowRightLongFill } from "react-icons/ri";

const dividerBar = {
  height: 3,
  display: "flex",
  gap: "0.25rem",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export function AboutSection() {
  return (
    <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex gap-1 mb-4" style={dividerBar}>
            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
          </div>
          <h1 className="about-title">À propos du Sénat</h1>
          <p className="about-subtitle">
            Découvrez l&apos;histoire, la mission et l&apos;organisation de la chambre haute du Parlement malgache.
          </p>
        </div>

        <section id="missions" className="mb-16">
          <h2 className="section-title">Missions et attributions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {missionData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm"
                >
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.bg}22` }}
                    >
                      <Icon size={24} style={{ color: item.color }} />
                    </div>
                    <h3 className="card-title-about">{item.title}</h3>
                    <p className="card-text-about">{item.text}</p>
                    <Link
                      href={item.link}
                      className="inline-block mt-3 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                    >
                      En savoir plus <RiArrowRightLongFill className="inline-block" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="structures" className="mb-16">
          <h2 className="section-title">Structures</h2>
          <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-8">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="structure-title" style={{ color: EMERALD }}>
                    <Building2 size={18} className="inline mr-2" style={{ color: EMERALD }} />
                    Cabinet du Président
                  </h4>
                  <p className="structure-text">
                    Assiste le Président dans l&apos;accomplissement de sa mission de Chef d&apos;Institution. Chargé de la coordination et de la gestion des affaires politiques et des relations publiques.
                  </p>
                </div>
                <div>
                  <h4 className="structure-title" style={{ color: RED }}>
                    <Building2 size={18} className="inline mr-2" style={{ color: RED }} />
                    Secrétariat Général
                  </h4>
                  <p className="structure-text">
                    Dirige, coordonne et supervise les activités des Services du Sénat. Chargé du contentieux et du traitement des doléances.
                  </p>
                </div>
                <div>
                  <h4 className="structure-title" style={{ color: CYAN }}>
                    <Building2 size={18} className="inline mr-2" style={{ color: CYAN }} />
                    Directions rattachées
                  </h4>
                  <ul className="structure-list">
                    <li>Direction du Système d&apos;Information et de la Communication</li>
                    <li>Direction de la Législation et des Études</li>
                    <li>Direction de la Décentralisation</li>
                    <li>Direction Administrative et des Ressources Humaines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="structure-title" style={{ color: EMERALD }}>
                    <Building2 size={18} className="inline mr-2" style={{ color: EMERALD }} />
                    Autres organes
                  </h4>
                  <ul className="structure-list">
                    <li>Inspection Générale du Sénat</li>
                    <li>Personne Responsable des Marchés Publics</li>
                    <li>Direction du Protocole</li>
                    <li>Direction de la Sécurité</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/about/structures"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                >
                  Voir toutes les structures <RiArrowRightLongFill className="inline-block" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="textes" className="mb-16">
          <h2 className="section-title">Textes de référence</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {referenceTextsData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm"
                >
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.bg}22` }}
                    >
                      <Icon size={24} style={{ color: item.color }} />
                    </div>
                    <h4 className="ref-title">{item.title}</h4>
                    {item.text && <p className="ref-text">{item.text}</p>}
                    {item.list && (
                      <ul className="ref-list">
                        {item.list.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={item.link}
                      className="inline-block mt-3 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                    >
                      En savoir plus <RiArrowRightLongFill className="inline-block" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="bureau" className="mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex gap-1 mb-3" style={dividerBar}>
                  <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                  <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                  <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>
                <p
                  className="text-[0.7rem] font-bold uppercase tracking-widest"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: CYAN,
                    marginBottom: "0.5rem",
                  }}
                >
                  Le Sénat de Madagascar
                </p>
                <h2
                  className="font-poppins font-bold text-white leading-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                  }}
                >
                  Dirigeants & <em className="font-bold text-white">Histoires</em>
                </h2>
              </div>
              <Button
                asChild
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all hover:opacity-80 hover:scale-105"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  backgroundColor: CYAN,
                  color: "#0f172a",
                }}
              >
                <Link href="/about/structures">Voir les structures</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipData.map((person) => {
                const isPresident = person.isPresident || false;
                return (
                  <motion.div
                    key={person.name}
                    className="group cursor-pointer"
                    variants={fadeUp}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={person.path} className="block h-full">
                      <div
                        className="relative rounded-2xl overflow-hidden mb-4"
                        style={{ aspectRatio: "3/4" }}
                      >
                        <Image
                          src={person.image}
                          alt={`${person.firstName} ${person.name}`}
                          fill
                          priority
                          className="object-cover transition-transform duration-700"
                          style={{
                            transform: isPresident ? "scale(1.02)" : "scale(1)",
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {isPresident && (
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.10)",
                              mixBlendMode: "overlay",
                            }}
                          />
                        )}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(to top, ${person.accentColor}cc 0%, transparent 55%)`,
                          }}
                        />
                        <Badge
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity badge-about"
                          style={{
                            backgroundColor: person.accentColor,
                          }}
                        >
                          {person.description}
                        </Badge>
                        {isPresident && (
                          <div
                            className="absolute inset-0 transition-transform duration-700 group-hover:scale-103"
                            style={{
                              background: `linear-gradient(to top, ${person.accentColor}44 0%, transparent 60%)`,
                            }}
                          />
                        )}
                      </div>

                      <div
                        className="h-0.5 rounded-full mb-3"
                        style={{ backgroundColor: person.accentColor, width: 36 }}
                      />

                      <p className="leadership-role" style={{ color: person.accentColor }}>
                        {person.role}
                      </p>
                      <h3 className="leadership-name">{person.name}</h3>
                      <p className="leadership-firstname">{person.firstName}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
              <div className="flex-1" style={{ backgroundColor: WHITE }} />
              <div className="flex-1" style={{ backgroundColor: RED }} />
              <div className="flex-1" style={{ backgroundColor: EMERALD }} />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}