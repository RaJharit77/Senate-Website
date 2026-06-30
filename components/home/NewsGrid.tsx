"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Globe2, Users, Heart, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import { CYAN, EMERALD, RED, WHITE } from "@/utils/colors";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K";

const iconMap: Record<string, LucideIcon> = {
  Diplomatie: Globe2,
  Modernisation: Sparkles,
  "Fête nationale": Heart,
  Solidarité: Heart,
  Jeunesse: GraduationCap,
  "Droits de la femme": Users,
};

interface Article {
  id: number;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  link?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function FeaturedCard({ article }: { article: Article }) {
  const Icon = iconMap[article.category] || Sparkles;
  const imageSrc = article.image && article.image.trim() !== "" ? article.image : PLACEHOLDER_IMAGE;
  const isValidImage = imageSrc.startsWith("http") || imageSrc.startsWith("data");

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      animate={{ y: [0, -6, 0] }}
      transition={{
        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{
        scale: 1.02,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Link href={article.link || "#"} className="block">
        <div className="relative" style={{ aspectRatio: "3/2" }}>
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={!isValidImage}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
          />

          <motion.div
            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1 }}
          >
            <Sparkles size={12} className="animate-pulse" />
            À la une
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
                style={{
                  backgroundColor: `${article.categoryColor}cc`,
                }}
              >
                <Icon size={14} />
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/60 text-sm">
                <Calendar size={14} />
                {article.date}
              </span>
            </div>
            <h3
              className="text-white mb-3 text-3xl font-bold leading-tight"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-white/70 text-base line-clamp-2 mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {article.excerpt}
            </p>
            <div
              className="inline-flex items-center gap-2 text-white border-b-2 pb-1 transition-all hover:gap-4 group-hover:border-cyan-400"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderColor: article.categoryColor,
              }}
            >
              Lire l&apos;article
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function CompactCard({ article }: { article: Article }) {
  const Icon = iconMap[article.category] || Sparkles;
  const imageSrc = article.image && article.image.trim() !== "" ? article.image : PLACEHOLDER_IMAGE;
  const isValidImage = imageSrc.startsWith("http") || imageSrc.startsWith("data");

  return (
    <motion.article
      className="group flex gap-4 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
      variants={fadeUp}
      whileHover={{ scale: 1.02, x: 4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={article.link || "#"} className="flex gap-4 w-full">
        <div className="shrink-0 rounded-xl overflow-hidden" style={{ width: 100, height: 100 }}>
          <Image
            src={imageSrc}
            alt={article.title}
            width={100}
            height={100}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={!isValidImage}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[0.6rem] font-bold uppercase tracking-wider flex items-center gap-1"
              style={{ color: article.categoryColor }}
            >
              <Icon size={12} />
              {article.category}
            </span>
            <span className="text-white/40 text-[0.6rem] flex items-center gap-1">
              <Calendar size={10} />
              {article.date}
            </span>
          </div>
          <h4
            className="text-white text-base font-semibold leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors"
            style={{
              fontFamily: "'Poppins', serif",
            }}
          >
            {article.title}
          </h4>
          <div
            className="mt-2 inline-flex items-center gap-1 text-white/50 text-xs transition-all hover:gap-2 group-hover:text-cyan-400"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Lire
            <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function NewsGrid({ articles }: { articles: Article[] }) {
  const featured = articles.find((a) => a.featured) || articles[0];
  const others = articles.filter((a) => a.id !== featured.id);

  return (
    <motion.section
      className="py-20 px-4 sm:px-6 bg-black/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-end justify-between mb-12" variants={fadeUp}>
          <div>
            <div className="flex gap-1.5 mb-3">
              <div className="h-1 rounded-full w-8" style={{ backgroundColor: WHITE }} />
              <div className="h-1 rounded-full w-8" style={{ backgroundColor: RED }} />
              <div className="h-1 rounded-full w-8" style={{ backgroundColor: EMERALD }} />
            </div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: CYAN,
                marginBottom: "0.5rem",
              }}
            >
              Actualités du Sénat
            </p>
            <h2
              className="text-white font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: 1.15,
              }}
            >
              À la une
            </h2>
          </div>
          <Link
            href="/espace-presse"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:opacity-80 hover:scale-105 hover:shadow-lg"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              backgroundColor: CYAN,
              color: "#0f172a",
              boxShadow: "0 4px 20px rgba(91,200,222,0.3)",
            }}
          >
            Toutes les actualités <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedCard article={featured} />
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 h-full">
              <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-400"></span>
                À ne pas manquer
              </h4>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-custom">
                {others.map((a) => (
                  <CompactCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div className="mt-12 flex justify-center gap-2" variants={fadeUp}>
          <div className="w-12 h-0.5 rounded-full bg-cyan-400/40" />
          <div className="w-6 h-0.5 rounded-full bg-cyan-400/20" />
          <div className="w-6 h-0.5 rounded-full bg-cyan-400/20" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 10 }}>
        <div className="flex-1" style={{ backgroundColor: WHITE }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: EMERALD }} />
      </div>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(91, 200, 222, 0.3);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(91, 200, 222, 0.5);
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(91, 200, 222, 0.3) transparent;
        }
      `}</style>
    </motion.section>
  );
}