import { ArrowRight, Calendar, Globe2, Users, Heart, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RED = "#cc1111";
const CYAN = "#5bc8de";
const GREEN = "#1a5c16";
const WHITE = "#ffffff";

const news = [
  {
    id: 1,
    category: "Diplomatie",
    categoryColor: GREEN,
    icon: Globe2,
    date: "Juin 2026",
    title: "Le Président du Sénat par intérim au 250e anniversaire de l'indépendance des États-Unis",
    excerpt:
      "Le Président du Sénat par intérim a honoré de sa présence la messe de bénédiction de la nouvelle chapelle du Lycée Sacré-Cœur de Jésus de Tsaramasay.",
    image: "https://senat.mg/wp-content/uploads/2026/06/costume-blanc-casse.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Modernisation",
    categoryColor: CYAN,
    icon: Sparkles,
    date: "Avril 2026",
    title: "Opération d'enregistrement biométrique au Sénat",
    excerpt:
      "Le Sénat accueille une opération biométrique pour les sénateurs et le personnel dans le cadre de la modernisation administrative.",
    image: "https://senat.mg/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-01-at-8.58.20-AM1-1536x863.jpeg",
  },
  {
    id: 3,
    category: "Fête nationale",
    categoryColor: RED,
    icon: Heart,
    date: "Juin 2026",
    title: "66ème anniversaire de l'Indépendance et de l'Armée Malagasy",
    excerpt:
      "Le Sénat célèbre solennellement le 66ème anniversaire de l'Indépendance en présence des autorités civiles et militaires.",
    image: "https://senat.mg/wp-content/uploads/2026/06/712744922_1697402302428513_5325818827058260357_n-1536x1024.jpg",
  },
  {
    id: 4,
    category: "Solidarité",
    categoryColor: CYAN,
    icon: Heart,
    date: "Février 2026",
    title: "Don du Président du Sénat par intérim aux victimes du cyclone Gezani",
    excerpt:
      "Le Président du Sénat par intérim exprime la solidarité nationale en apportant une aide d'urgence aux populations sinistrées.",
    image: "https://senat.mg/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-13-at-08.02.14.jpeg",
  },
  {
    id: 5,
    category: "Jeunesse",
    categoryColor: GREEN,
    icon: GraduationCap,
    date: "Mai 2026",
    title: "Visite d'étudiants au palais du Sénat de Madagascar",
    excerpt:
      "Des lycéens et étudiants ont visité le Sénat pour découvrir les mécanismes démocratiques et le fonctionnement de la chambre haute.",
    image: "https://senat.mg/wp-content/uploads/2026/05/706583228_1690529139782496_6657266668439846852_n-1536x1023.jpg",
  },
  {
    id: 6,
    category: "Droits de la femme",
    categoryColor: RED,
    icon: Users,
    date: "Mars 2026",
    title: "Célébration de la Journée internationale des droits de la femme",
    excerpt:
      "Le Sénat honore les femmes sénatrices et le personnel féminin lors de la Journée internationale des droits de la femme.",
    image: "https://senat.mg/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-09-at-2.35.09-PM2-1536x1028.jpeg",
  },
  {
    id: 7,
    category: "Modernisation",
    categoryColor: CYAN,
    icon: Users,
    date: "Avril 2026",
    title: "Opération d'enregistrement biométrique au Sénat (suite)",
    excerpt:
      "Le Sénat accueille une opération biométrique pour les sénateurs et le personnel dans le cadre de la modernisation administrative.",
    image: "https://senat.mg/wp-content/uploads/2026/06/721517407_1710420527793357_1880340436018856516_n-1536x863.jpg",
  },
];

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

function FeaturedCard({ article }: { article: typeof news[0] }) {
  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative" style={{ aspectRatio: "3/2" }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={12} />
          À la une
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
              style={{
                backgroundColor: `${article.categoryColor}cc`,
              }}
            >
              <article.icon size={14} />
              {article.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-white/60 text-sm"
            >
              <Calendar size={14} />
              {article.date}
            </span>
          </div>
          <h3
            className="text-white mb-3 text-3xl font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {article.title}
          </h3>
          <p
            className="text-white/70 text-base line-clamp-2 mb-4"
            style={{
              fontFamily: "'Source Serif 4', serif",
            }}
          >
            {article.excerpt}
          </p>
          <Link
            to="#"
            className="inline-flex items-center gap-2 text-white border-b-2 pb-1 transition-all hover:gap-4 group-hover:border-cyan-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderColor: article.categoryColor,
            }}
          >
            Lire l'article
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({ article }: { article: typeof news[0] }) {
  return (
    <motion.article
      className="group flex gap-4 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
      variants={fadeUp}
      whileHover={{ scale: 1.02, x: 4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: 100, height: 100 }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[0.6rem] font-bold uppercase tracking-wider flex items-center gap-1"
            style={{ color: article.categoryColor }}
          >
            <article.icon size={12} />
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
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {article.title}
        </h4>
        <Link
          to="#"
          className="mt-2 inline-flex items-center gap-1 text-white/50 text-xs transition-all hover:gap-2 group-hover:text-cyan-400"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Lire
          <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export function NewsGrid() {
  const featured = news.find((a) => a.featured) || news[0];
  const others = news.filter((a) => a.id !== featured.id);

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
              <div className="h-1 rounded-full w-4" style={{ backgroundColor: RED }} />
              <div className="h-1 rounded-full w-4" style={{ backgroundColor: GREEN }} />
            </div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                fontFamily: "'Inter', sans-serif",
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
              Dernières nouvelles{" "}
              <em style={{ fontWeight: 400, color: RED }}>& événements</em>
            </h2>
          </div>
          <Link
            to="/espace-presse"
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

        {/* Grille : grande carte à gauche, sidebar à droite */}
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

        {/* Barre de séparation décorative */}
        <motion.div
          className="mt-12 flex justify-center gap-2"
          variants={fadeUp}
        >
          <div className="w-12 h-0.5 rounded-full bg-cyan-400/40" />
          <div className="w-6 h-0.5 rounded-full bg-cyan-400/20" />
          <div className="w-6 h-0.5 rounded-full bg-cyan-400/20" />
        </motion.div>
      </div>

      {/* Styles pour la barre de défilement personnalisée */}
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