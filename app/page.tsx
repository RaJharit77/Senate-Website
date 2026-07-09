import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { ParliamentaryWork } from "@/components/home/ParliamentaryWork";
import { PartnersBand } from "@/components/home/PartnersBand";
import { getAlaune, getActualite, getPostsByCategory, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import type { WpPost } from "@/lib/types";
import { formatDate } from "@/utils/utility";
import { GREENS, REDS, SKY_BLUE } from "@/utils/colors";
import { CAT_CALENDRIER, CAT_LOIS } from "@/constants/constants";

function getAcfString(item: WpPost, key: string, fallback: string): string {
  const acf = item.acf as Record<string, unknown> | undefined;
  const value = acf?.[key];
  return typeof value === "string" ? value : fallback;
}

export default async function HomePage() {
  // ---- Slides (carousel) ----
  let alauneData: WpPost[] = [];
  try {
    const raw = (await getAlaune({ per_page: 10, _embed: true })) as WpPost[];
    alauneData = raw
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  } catch (err) {
    console.error("[HomePage] Failed to load alaune slides:", err);
    alauneData = [];
  }

  const slides = await Promise.all(
    alauneData.map(async (item: WpPost) => {
      const imageUrl = await resolvePostImage(item, getMedia);
      return {
        id: item.id,
        category: getAcfString(item, "categorie", "Actualité"),
        date: formatDate(item.date),
        title: item.title?.rendered || "Sans titre",
        excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
        image: imageUrl,
        color: REDS,
        link: `/actualite/${item.slug}`,
      };
    })
  );

  // ---- News (actualités et à la une) ----
  let alauneForGrid: WpPost[] = [];
  try {
    alauneForGrid = (await getAlaune({ per_page: 7, _embed: true })) as WpPost[];
  } catch (err) {
    console.error("[HomePage] Failed to load alaune for grid:", err);
    alauneForGrid = [];
  }

  const featuredArticles = await Promise.all(
    alauneForGrid.map(async (item: WpPost, index: number) => {
      const imageUrl = await resolvePostImage(item, getMedia);
      return {
        id: item.id,
        category: getAcfString(item, "categorie", "Actualité"),
        categoryColor: REDS,
        date: formatDate(item.date),
        title: item.title?.rendered || "Sans titre",
        excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
        image: imageUrl,
        featured: true,
        link: `/actualite/${item.slug}`,
        index: index, // Add the index property here
      };
    })
  );

  // ---- Articles "Actualités" pour la colonne latérale ----
  let actualiteData: WpPost[] = [];
  try {
    actualiteData = (await getActualite({ per_page: 10, _embed: true })) as WpPost[];
  } catch (err) {
    console.error("[HomePage] Failed to load actualités:", err);
    actualiteData = [];
  }

  const sideArticles = await Promise.all(
    actualiteData.map(async (item: WpPost, index: number) => {
      const imageUrl = await resolvePostImage(item, getMedia);
      return {
        id: item.id,
        category: getAcfString(item, "categorie", "Actualité"),
        categoryColor: index === 0 ? REDS : GREENS,
        date: formatDate(item.date),
        title: item.title?.rendered || "Sans titre",
        excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
        image: imageUrl,
        featured: false,
        link: `/actualite/${item.slug}`,
      };
    })
  );

  const loisData = (await getPostsByCategory(CAT_LOIS, { per_page: 4, _embed: true }).catch((err) => {
    console.error("[HomePage] Failed to load 'Travaux législatifs' (cat 42):", err);
    return [];
  })) as WpPost[];

  const calendrierData = (await getPostsByCategory(CAT_CALENDRIER, { per_page: 4, _embed: true }).catch((err) => {
    console.error("[HomePage] Failed to load 'Calendrier' (cat 43):", err);
    return [];
  })) as WpPost[];

  const tabsData = [
    {
      id: "legislation",
      iconName: "FileText" as const,
      label: "Travaux législatifs",
      color: SKY_BLUE,
      path: "/parliamentary-proceedings",
      items: loisData.map((item: WpPost) => ({
        ref: getAcfString(item, "reference", item.title?.rendered || "Réf. inconnue"),
        title: item.title?.rendered || "Sans titre",
        status: getAcfString(item, "statut", "En cours"),
        date: formatDate(item.date),
        statusColor: getAcfString(item, "statut", "") === "Adopté" ? REDS : GREENS,
      })),
    },
    {
      id: "calendar",
      iconName: "Calendar" as const,
      label: "Calendrier parlementaire",
      color: SKY_BLUE,
      path: "/agenda",
      items: calendrierData.map((item: WpPost) => ({
        ref: getAcfString(item, "type", "Session"),
        title: item.title?.rendered || "Sans titre",
        status: getAcfString(item, "statut", "Planifié"),
        date: formatDate(item.date),
        statusColor: getAcfString(item, "statut", "") === "Terminé" ? REDS : SKY_BLUE,
      })),
    },
    {
      id: "texts",
      iconName: "BookOpen" as const,
      label: "Textes de référence",
      color: SKY_BLUE,
      path: "/about/reference-texts",
      items: [],
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />
      <NewsGrid featuredArticles={featuredArticles} sideArticles={sideArticles} />
      <AboutSection />
      <ParliamentaryWork tabsData={tabsData} />
      <PartnersBand />
    </>
  );
}