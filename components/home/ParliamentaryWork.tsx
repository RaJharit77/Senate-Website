"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FileText, Calendar, BookOpen, ArrowRight, Globe } from "lucide-react";
import { CYAN, EMERALD, GREEN, RED, SKY_BLUE, WHITE } from "@/utils/colors";
import { getPostsByCategory, getInternational } from "@/lib/api";
import { CAT_ORDRE_JOUR, CAT_LOIS } from "@/constants/constants";
import { formatDate } from "@/utils/utility";
import type { WpPost } from "@/lib/types";

const iconMap = {
  FileText,
  Calendar,
  BookOpen,
  Globe,
};

interface WorkItem {
  ref: string;
  title: string;
  status: string;
  date: string;
  statusColor: string;
}

interface TabData {
  id: string;
  iconName: keyof typeof iconMap;
  label: string;
  color: string;
  path: string;
  items: WorkItem[];
}

function getAcfString(item: WpPost, key: string, fallback: string): string {
  const acf = item.acf as Record<string, unknown> | undefined;
  const value = acf?.[key];
  return typeof value === "string" ? value : fallback;
}

const infoCards = [
  {
    label: "Calendrier",
    desc: "Ordre du jour des réunions parlementaires",
    image: "https://senat.mg/wp-content/themes/senat13/images/ordre-du-jour.jpg",
    path: "/agenda",
    color: CYAN,
  },
  {
    label: "Textes et Lois",
    desc: "Textes en cours et adoptés par le sénat",
    image: "https://senat.mg/wp-content/themes/senat13/images/lois.jpg",
    path: "/parliamentary-proceedings/legislative-proceedings",
    color: CYAN,
  },
  {
    label: "International",
    desc: "Diplomatie et activités parlementaire du sénat",
    image: "https://senat.mg/wp-content/themes/senat13/images/international.jpg",
    path: "/international",
    color: CYAN,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export function ParliamentaryWork() {
  const [tabsData, setTabsData] = useState<TabData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("agenda");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Agenda (Ordre du jour)
        const agendaItems = (await getPostsByCategory(CAT_ORDRE_JOUR, {
          per_page: 4,
          _embed: true,
        })) as WpPost[];

        // 2. Travaux législatifs (Lois)
        const loisItems = (await getPostsByCategory(CAT_LOIS, {
          per_page: 4,
          _embed: true,
        })) as WpPost[];

        // 3. International
        const internationalItems = (await getInternational({
          per_page: 4,
          _embed: true,
        })) as WpPost[];

        const tabs: TabData[] = [
          {
            id: "agenda",
            iconName: "Calendar",
            label: "Ordre du jour",
            color: SKY_BLUE,
            path: "/agenda",
            items: agendaItems.map((item) => ({
              ref: getAcfString(item, "reference", "Séance"),
              title: item.title?.rendered || "Sans titre",
              status: getAcfString(item, "statut", "À venir"),
              date: formatDate(item.date),
              statusColor:
                getAcfString(item, "statut", "") === "Terminé" ? RED : SKY_BLUE,
            })),
          },
          {
            id: "legislation",
            iconName: "FileText",
            label: "Travaux législatifs",
            color: SKY_BLUE,
            path: "/parliamentary-proceedings",
            items: loisItems.map((item) => ({
              ref: getAcfString(item, "reference", item.title?.rendered || "Réf. inconnue"),
              title: item.title?.rendered || "Sans titre",
              status: getAcfString(item, "statut", "En cours"),
              date: formatDate(item.date),
              statusColor:
                getAcfString(item, "statut", "") === "Adopté" ? RED : GREEN,
            })),
          },
          {
            id: "international",
            iconName: "Globe",
            label: "International",
            color: SKY_BLUE,
            path: "/international",
            items: internationalItems.map((item) => ({
              ref: getAcfString(item, "type", "Activité"),
              title: item.title?.rendered || "Sans titre",
              status: getAcfString(item, "statut", "En cours"),
              date: formatDate(item.date),
              statusColor:
                getAcfString(item, "statut", "") === "Terminé" ? RED : GREEN,
            })),
          },
        ];

        setTabsData(tabs);
        setActiveTab(tabs[0]?.id || "agenda");
      } catch (err) {
        console.error("[ParliamentaryWork] Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="py-16 text-center text-white/70"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Chargement des travaux parlementaires...
      </div>
    );
  }

  const active = tabsData.find((t) => t.id === activeTab)!;

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 bg-black/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <div className="flex gap-1 mb-4" style={{ height: 3 }}>
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
            Travaux Parlementaires
          </p>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            L&apos;activité législative{" "}
            <em style={{ fontWeight: 700, color: WHITE }}>du Sénat</em>
          </h2>
        </motion.div>

        {/* Cartes d'information (statiques) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 mb-16">
          {infoCards.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link href={item.path} className="block">
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ backgroundColor: GREEN }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="w-full space-y-1">
                      <p
                        className="text-sm font-bold uppercase tracking-wider"
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                        {item.desc}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-red-500">
                        <span className="text-sm font-medium">Découvrir</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: GREEN }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Onglets et listes dynamiques */}
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div variants={fadeUp}>
            <div className="flex flex-col gap-2">
              {tabsData.map((tab) => {
                const TabIcon = iconMap[tab.iconName] || FileText;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all hover:scale-[1.02]"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.84rem",
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      backgroundColor:
                        activeTab === tab.id ? tab.color : "rgba(255,255,255,0.05)",
                      color: activeTab === tab.id ? "#000000" : "rgba(255,255,255,0.7)",
                      border: `1.5px solid ${activeTab === tab.id ? tab.color : "rgba(255,255,255,0.15)"
                        }`,
                    }}
                  >
                    <TabIcon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Link
              href={active.path}
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full transition-all hover:opacity-80 hover:scale-105"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: active.color,
                color: active.color === CYAN ? "#0f172a" : "#fff",
              }}
            >
              Voir tout <ArrowRight size={13} />
            </Link>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
              >
                {active.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="group flex gap-4 rounded-xl border p-5 cursor-pointer transition-all hover:shadow-md backdrop-blur-sm bg-white/5"
                    style={{
                      borderColor: `rgba(255,255,255,0.1)`,
                    }}
                    whileHover={{
                      borderColor: `${active.color}88`,
                      backgroundColor: `${active.color}15`,
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="shrink-0 w-1 rounded-full self-stretch"
                      style={{ backgroundColor: active.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: active.color,
                          }}
                        >
                          {item.ref}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-white text-xs font-semibold"
                          style={{
                            backgroundColor: item.statusColor,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          lineHeight: 1.4,
                          marginBottom: 6,
                        }}
                      >
                        {item.title}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: active.color }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
              <div className="flex-1" style={{ backgroundColor: WHITE }} />
              <div className="flex-1" style={{ backgroundColor: RED }} />
              <div className="flex-1" style={{ backgroundColor: EMERALD }} />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}