"use client";

import { BookOpen, Users, Scale, Globe, Building2, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { CYAN, EMERALD, GRAY, GREEN, RED, WHITE } from "@/utils/colors";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        {/* En-tête */}
        <div className="mb-12">
          <div className="flex gap-1 mb-4" style={{ height: 3 }}>
            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: WHITE,
              lineHeight: 1.2,
            }}
          >
            À propos du Sénat
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.5)",
              marginTop: "0.5rem",
              maxWidth: "600px",
            }}
          >
            Découvrez l&apos;histoire, la mission et l&apos;organisation de la chambre haute du Parlement malgache.
          </p>
        </div>

        {/* Missions section */}
        <section id="missions" className="mb-16">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: CYAN,
              marginBottom: "1.5rem",
            }}
          >
            Missions et attributions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                  <Scale size={24} style={{ color: EMERALD }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Fonction législative
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    color: GRAY,
                    lineHeight: 1.7,
                  }}
                >
                  Les Sénateurs élaborent des propositions de loi pour satisfaire les besoins de leurs régions. La loi est l&apos;expression de la volonté du peuple.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                  <Users size={24} style={{ color: RED }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Contrôle de l&apos;action gouvernementale
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    color: GRAY,
                    lineHeight: 1.7,
                  }}
                >
                  Le Sénat contrôle l&apos;action du Gouvernement et évalue l&apos;efficacité des politiques publiques.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                  <Globe size={24} style={{ color: CYAN }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Représentation des collectivités
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    color: GRAY,
                    lineHeight: 1.7,
                  }}
                >
                  Le Sénat représente les Collectivités Territoriales Décentralisées. Les Sénateurs sont les élus des élus.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}22` }}>
                  <BookOpen size={24} style={{ color: EMERALD }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Fonction consultative
                </h3>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    color: GRAY,
                    lineHeight: 1.7,
                  }}
                >
                  Le Sénat donne son avis sur les questions dont le Gouvernement le saisit, à l&apos;exclusion de tout projet législatif.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Structures section */}
        <section id="structures" className="mb-16">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: CYAN,
              marginBottom: "1.5rem",
            }}
          >
            Structures
          </h2>
          <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-8">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: EMERALD,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Building2 size={18} className="inline mr-2" style={{ color: EMERALD }} />
                    Cabinet du Président
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      color: GRAY,
                      lineHeight: 1.6,
                    }}
                  >
                    Assiste le Président dans l&apos;accomplissement de sa mission de Chef d&apos;Institution. Chargé de la coordination et de la gestion des affaires politiques et des relations publiques.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: RED,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Building2 size={18} className="inline mr-2" style={{ color: RED }} />
                    Secrétariat Général
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      color: GRAY,
                      lineHeight: 1.6,
                    }}
                  >
                    Dirige, coordonne et supervise les activités des Services du Sénat. Chargé du contentieux et du traitement des doléances.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: CYAN,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Building2 size={18} className="inline mr-2" style={{ color: CYAN }} />
                    Directions rattachées
                  </h4>
                  <ul
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      color: GRAY,
                      lineHeight: 1.8,
                      listStyle: "disc",
                      paddingLeft: "1.2rem",
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
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: EMERALD,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Building2 size={18} className="inline mr-2" style={{ color: EMERALD }} />
                    Autres organes
                  </h4>
                  <ul
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      color: GRAY,
                      lineHeight: 1.8,
                      listStyle: "disc",
                      paddingLeft: "1.2rem",
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

        {/* Textes de référence section */}
        <section id="textes" className="mb-16">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: CYAN,
              marginBottom: "1.5rem",
            }}
          >
            Textes de référence
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${EMERALD}22` }}>
                  <FileText size={24} style={{ color: EMERALD }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.3rem",
                  }}
                >
                  Dispositions constitutionnelles
                </h4>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem",
                    color: GRAY,
                    lineHeight: 1.6,
                  }}
                >
                  Le Sénat est prévu par l&apos;article 80 et suivant de la Constitution de la Quatrième République.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${RED}22` }}>
                  <FileText size={24} style={{ color: RED }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.3rem",
                  }}
                >
                  Lois organiques
                </h4>
                <ul
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem",
                    color: GRAY,
                    lineHeight: 1.8,
                    listStyle: "disc",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <li>Ordonnance n° 2001-001 du 05 janvier 2001</li>
                  <li>Loi Organique n° 2015-007 du 03 mars 2015</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${CYAN}22` }}>
                  <FileText size={24} style={{ color: CYAN }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.3rem",
                  }}
                >
                  Sources règlementaires
                </h4>
                <ul
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem",
                    color: GRAY,
                    lineHeight: 1.8,
                    listStyle: "disc",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <li>Arrêté n°2001-001 du 08 mai 2001 (Règlement Intérieur)</li>
                  <li>Arrêté n°2001-002 du 16 mai 2001 (Organisation des Services)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${EMERALD}22` }}>
                  <FileText size={24} style={{ color: EMERALD }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.3rem",
                  }}
                >
                  Textes sur les services
                </h4>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem",
                    color: GRAY,
                    lineHeight: 1.6,
                  }}
                >
                  Arrêté n°2001-002 du 16 mai 2001 portant organisation générale des Services du Sénat.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bureau du Sénat */}
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
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: CYAN,
                    marginBottom: "0.5rem",
                  }}
                >
                  Le Sénat de Madagascar
                </p>
                <h2
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                    fontWeight: 700,
                    color: WHITE,
                    lineHeight: 1.2,
                  }}
                >
                  Dirigeants &{" "}
                  <em style={{ fontWeight: 700, color: WHITE }}>Histoires</em>
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
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: person.accentColor,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.62rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
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
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: person.accentColor,
                          marginBottom: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {person.role}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: WHITE,
                          letterSpacing: "0.01em",
                          lineHeight: 1.2,
                        }}
                      >
                        {person.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.78rem",
                          color: GRAY,
                          marginTop: 2,
                        }}
                      >
                        {person.firstName}
                      </p>
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