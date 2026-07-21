"use client";

import { BookOpen, Users, Scale, Globe, Building2, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { CYAN, EMERALD, GRAY, GREEN, RED, WHITE } from "@/utils/colors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leadership = [
  {
    name: "NDREMANJARY",
    firstName: "Jean André",
    role: "Président du Sénat par intérim",
    description: "Le Président",
    image: "https://senat.mg/wp-content/themes/senat13/images/NDREMANJARY.png",
    accentColor: CYAN,
    path: "/",
    isPresident: true,
  },
  {
    name: "Tous les Membres",
    firstName: "Les sénateurs durant la deuxième législature du quatrième République",
    role: "Les Membres du bureau",
    description: "Les Membres",
    image: "https://senat.mg/wp-content/themes/senat13/images/membres.jpg",
    accentColor: RED,
    path: "/about/structures",
    isPresident: false,
  },
  {
    name: "Histoire & Missions",
    firstName: "Connaître le Sénat à travers les Républiques",
    role: "Découvrez l'institution",
    description: "Histoire du Sénat",
    image: "https://senat.mg/wp-content/themes/senat13/images/historique.jpg",
    accentColor: EMERALD,
    path: "/historical",
    isPresident: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
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
          <div className="flex gap-1 mb-4" style={{ height: 3 }}>
            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
          </div>
          <h1
            className="text-white font-bold leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            À propos du Sénat
          </h1>
          <p
            className="mt-2 max-w-[600px] text-white/50"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.1rem",
            }}
          >
            Découvrez l&apos;histoire, la mission et l&apos;organisation de la chambre haute du Parlement malgache.
          </p>
        </div>

        <section id="missions" className="mb-16">
          <h2
            className="mb-6 font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              color: CYAN,
            }}
          >
            Missions et attributions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Scale,
                color: EMERALD,
                bg: GREEN,
                title: "Fonction législative",
                desc: "Les Sénateurs élaborent des propositions de loi pour satisfaire les besoins de leurs régions. La loi est l'expression de la volonté du peuple.",
              },
              {
                icon: Users,
                color: RED,
                bg: RED,
                title: "Contrôle de l'action gouvernementale",
                desc: "Le Sénat contrôle l'action du Gouvernement et évalue l'efficacité des politiques publiques.",
              },
              {
                icon: Globe,
                color: CYAN,
                bg: CYAN,
                title: "Représentation des collectivités",
                desc: "Le Sénat représente les Collectivités Territoriales Décentralisées. Les Sénateurs sont les élus des élus.",
              },
              {
                icon: BookOpen,
                color: EMERALD,
                bg: GREEN,
                title: "Fonction consultative",
                desc: "Le Sénat donne son avis sur les questions dont le Gouvernement le saisit, à l'exclusion de tout projet législatif.",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="bg-white/10 backdrop-blur-sm border-white/10 shadow-sm"
              >
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.bg}22` }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <h3
                    className="text-white font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Structures */}
        <section id="structures" className="mb-16">
          <h2
            className="mb-6 font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              color: CYAN,
            }}
          >
            Structures
          </h2>
          <Card className="bg-white/10 backdrop-blur-sm border-white/10 shadow-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      color: EMERALD,
                    }}
                  >
                    <Building2 size={18} style={{ color: EMERALD }} />
                    Cabinet du Président
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    Assiste le Président dans l&apos;accomplissement de sa mission de Chef d&apos;Institution. Chargé de la coordination et de la gestion des affaires politiques et des relations publiques.
                  </p>
                </div>
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      color: RED,
                    }}
                  >
                    <Building2 size={18} style={{ color: RED }} />
                    Secrétariat Général
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    Dirige, coordonne et supervise les activités des Services du Sénat. Chargé du contentieux et du traitement des doléances.
                  </p>
                </div>
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      color: CYAN,
                    }}
                  >
                    <Building2 size={18} style={{ color: CYAN }} />
                    Directions rattachées
                  </h4>
                  <ul
                    className="list-disc pl-5 text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    <li>Direction du Système d&apos;Information et de la Communication</li>
                    <li>Direction de la Législation et des Études</li>
                    <li>Direction de la Décentralisation</li>
                    <li>Direction Administrative et des Ressources Humaines</li>
                  </ul>
                </div>
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      color: EMERALD,
                    }}
                  >
                    <Building2 size={18} style={{ color: EMERALD }} />
                    Autres organes
                  </h4>
                  <ul
                    className="list-disc pl-5 text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    <li>Inspection Générale du Sénat</li>
                    <li>Personne Responsable des Marchés Publics</li>
                    <li>Direction du Protocole</li>
                    <li>Direction de la Sécurité</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Textes de référence */}
        <section id="textes" className="mb-16">
          <h2
            className="mb-6 font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              color: CYAN,
            }}
          >
            Textes de référence
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                color: EMERALD,
                bg: EMERALD,
                title: "Dispositions constitutionnelles",
                content: "Le Sénat est prévu par l'article 80 et suivant de la Constitution de la Quatrième République.",
              },
              {
                icon: FileText,
                color: RED,
                bg: RED,
                title: "Lois organiques",
                content: (
                  <ul className="list-disc pl-5 text-sm leading-relaxed" style={{ color: GRAY }}>
                    <li>Ordonnance n° 2001-001 du 05 janvier 2001</li>
                    <li>Loi Organique n° 2015-007 du 03 mars 2015</li>
                  </ul>
                ),
              },
              {
                icon: FileText,
                color: CYAN,
                bg: CYAN,
                title: "Sources règlementaires",
                content: (
                  <ul className="list-disc pl-5 text-sm leading-relaxed" style={{ color: GRAY }}>
                    <li>Arrêté n°2001-001 du 08 mai 2001 (Règlement Intérieur)</li>
                    <li>Arrêté n°2001-002 du 16 mai 2001 (Organisation des Services)</li>
                  </ul>
                ),
              },
              {
                icon: FileText,
                color: EMERALD,
                bg: EMERALD,
                title: "Textes sur les services",
                content: "Arrêté n°2001-002 du 16 mai 2001 portant organisation générale des Services du Sénat.",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="bg-white/10 backdrop-blur-sm border-white/10 shadow-sm"
              >
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.bg}22` }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <h4
                    className="text-white font-bold mb-1"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: GRAY,
                    }}
                  >
                    {item.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bureau du Sénat (leadership) */}
        <section id="bureau" className="mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex gap-1 mb-3" style={{ height: 3 }}>
                  <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                  <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                  <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: CYAN,
                  }}
                >
                  Le Sénat de Madagascar
                </p>
                <h2
                  className="text-white font-bold leading-tight"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                  }}
                >
                  Dirigeants & <em style={{ fontWeight: 700, color: WHITE }}>Histoires</em>
                </h2>
              </div>
              <Button
                asChild
                className="hidden sm:inline-flex items-center gap-2 rounded-full hover:opacity-80 hover:scale-105 transition-all"
                style={{
                  backgroundColor: CYAN,
                  color: "#0f172a",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                <Link href="/about/structures">Voir les structures</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map((person) => {
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
                          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: person.accentColor,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.62rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            color: "#fff",
                            border: "none",
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

                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          color: person.accentColor,
                        }}
                      >
                        {person.role}
                      </p>
                      <h3
                        className="text-white font-bold leading-tight"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        {person.name}
                      </h3>
                      <p
                        className="text-sm mt-0.5"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          color: GRAY,
                        }}
                      >
                        {person.firstName}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Bandeau coloré en bas (comme dans les autres sections) */}
        <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
          <div className="flex-1" style={{ backgroundColor: WHITE }} />
          <div className="flex-1" style={{ backgroundColor: RED }} />
          <div className="flex-1" style={{ backgroundColor: EMERALD }} />
        </div>
      </div>
    </div>
  );
}