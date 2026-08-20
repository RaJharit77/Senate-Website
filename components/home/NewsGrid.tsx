"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Globe2, Users, Heart, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import { CYAN, EMERALD, MARINA, RED, WHITE } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { cleanText } from "@/utils/utility";

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

// ─── Animations framer-motion typées ──────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// ─── Carrousel principal (articles "À la une") ────────────
function FeaturedCarousel({ articles }: { articles: Article[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const textRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const total = articles.length;
  const article = articles[current];

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  useEffect(() => {
    if (textRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        textRef.current.querySelectorAll(".animate-text"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [current]);

  if (total === 0) return null;

  const Icon = iconMap[article.category] || Sparkles;
  const imageSrc = article.image && article.image.trim() !== "" ? article.image : PLACEHOLDER_IMAGE;
  const isValidImage = imageSrc.startsWith("http") || imageSrc.startsWith("data");

  const goTo = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" ref={carouselRef}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 50 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-4/3 sm:aspect-3/2"
        >
          <Image
            src={imageSrc}
            alt={cleanText(article.title)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={!isValidImage}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
          />

          <motion.div
            className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="flex items-center gap-1.5 text-white text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider bg-red-500/90 backdrop-blur-sm border-none px-2 py-0.5 sm:px-3 sm:py-1">
              <Sparkles size={12} className="animate-pulse" />
              À la une
            </Badge>
          </motion.div>

          <div ref={textRef} className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Badge
                className="flex items-center gap-1 text-white text-[0.55rem] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm border-none px-2 py-0.5 sm:px-3 sm:py-1"
                style={{ backgroundColor: `${article.categoryColor}cc` }}
              >
                <Icon size={12} />
                {cleanText(article.category)}
              </Badge>
              <span className="flex items-center gap-1 text-white/60 text-[0.6rem] sm:text-sm">
                <Calendar size={12} />
                {article.date}
              </span>
            </div>
            <h3
              className="animate-text text-white mb-1 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {cleanText(article.title)}
            </h3>
            <p
              className="animate-text text-white/70 text-sm sm:text-base line-clamp-2 mb-2 sm:mb-4 hidden sm:block"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {cleanText(article.excerpt)}
            </p>
            <div
              className="animate-text inline-flex items-center gap-2 text-white border-b-2 pb-1 transition-all hover:gap-4 group"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderColor: article.categoryColor,
              }}
            >
              <Link href={article.link || "#"} className="flex items-center gap-2">
                Lire l&apos;article
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${i === current ? "bg-white w-4 sm:w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Aller à la slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition text-xs sm:text-base"
        aria-label="Précédent"
      >
        <IoMdArrowDropleft />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition text-xs sm:text-base"
        aria-label="Suivant"
      >
        <IoMdArrowDropright />
      </button>
    </div>
  );
}

function CompactCard({ article }: { article: Article }) {
  const Icon = iconMap[article.category] || Sparkles;
  const imageSrc = article.image && article.image.trim() !== "" ? article.image : PLACEHOLDER_IMAGE;
  const isValidImage = imageSrc.startsWith("http") || imageSrc.startsWith("data");

  return (
    <motion.article
      className="group"
      variants={fadeUp}
      whileHover={{ scale: 1.02, x: 4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 cursor-pointer transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20">
        <Link href={article.link || "#"} className="flex gap-3 sm:gap-4 w-full">
          <div className="shrink-0 rounded-lg overflow-hidden relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src={imageSrc}
              alt={cleanText(article.title)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="80px"
              unoptimized={!isValidImage}
              priority
            />
          </div>
          <CardContent className="flex flex-col justify-center min-w-0 flex-1 p-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
              <span
                className="text-[0.5rem] sm:text-[0.6rem] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: CYAN }}
              >
                <Icon size={10} />
                {cleanText(article.category)}
              </span>
              <span
                className="text-[0.5rem] sm:text-[0.6rem] flex items-center gap-1"
                style={{ color: `${CYAN}99` }}
              >
                <Calendar size={9} />
                {article.date}
              </span>
            </div>
            <h4
              className="text-white text-sm sm:text-base font-semibold leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {cleanText(article.title)}
            </h4>
            <div
              className="mt-1 sm:mt-2 inline-flex items-center gap-1 text-white/50 text-[0.6rem] sm:text-xs transition-all hover:gap-2 group-hover:text-cyan-400"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Lire
              <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.article>
  );
}

interface NewsGridProps {
  featuredArticles: Article[];
  sideArticles: Article[];
}

export function NewsGrid({ featuredArticles, sideArticles }: NewsGridProps) {
  const carouselArticles = featuredArticles.slice(0, 7);
  const sideList = sideArticles.slice(0, 10);

  return (
    <motion.section
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-black/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12" variants={fadeUp}>
          <div>
            <div className="flex gap-1.5 mb-3">
              <div className="h-1 rounded-full w-6 sm:w-8" style={{ backgroundColor: WHITE }} />
              <div className="h-1 rounded-full w-6 sm:w-8" style={{ backgroundColor: RED }} />
              <div className="h-1 rounded-full w-6 sm:w-8" style={{ backgroundColor: EMERALD }} />
            </div>
            <p
              className="text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Poppins', sans-serif", color: CYAN, marginBottom: "0.5rem" }}
            >
              Actualités du Sénat
            </p>
            <h2
              className="text-white font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                lineHeight: 1.15,
              }}
            >
              À la une
            </h2>
          </div>
          <Button
            asChild
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all hover:opacity-80 hover:scale-105 hover:shadow-lg text-[0.7rem] sm:text-[0.8rem] font-semibold tracking-wide"
            style={{
              backgroundColor: CYAN,
              color: MARINA,
              boxShadow: "0 4px 20px rgba(91,200,222,0.3)",
            }}
          >
            <Link href="/press-area">
              Toutes les actualités <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {carouselArticles.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center text-white/50">
                Aucun article à la une pour le moment.
              </div>
            ) : (
              <FeaturedCarousel articles={carouselArticles} />
            )}
          </div>

          <div className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 h-full">
              <h4 className="text-white/60 text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-400"></span>
                À ne pas manquer
              </h4>
              <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2 scrollbar-custom">
                {sideList.length === 0 ? (
                  <p className="text-white/30 text-sm">Aucune actualité récente.</p>
                ) : (
                  sideList.map((a) => <CompactCard key={a.id} article={a} />)
                )}
              </div>
            </Card>
          </div>
        </div>

        <motion.div className="mt-10 sm:mt-12 flex justify-center gap-2" variants={fadeUp}>
          <div className="w-8 sm:w-12 h-0.5 rounded-full bg-cyan-400/40" />
          <div className="w-4 sm:w-6 h-0.5 rounded-full bg-cyan-400/20" />
          <div className="w-4 sm:w-6 h-0.5 rounded-full bg-cyan-400/20" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: 6 }}>
        <div className="flex-1" style={{ backgroundColor: WHITE }} />
        <div className="flex-1" style={{ backgroundColor: RED }} />
        <div className="flex-1" style={{ backgroundColor: EMERALD }} />
      </div>
    </motion.section>
  );
}