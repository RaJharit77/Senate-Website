import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { ParliamentaryWork } from "@/components/home/ParliamentaryWork";
import { PartnersBand } from "@/components/home/PartnersBand";
import { getAlaune, getActualite, getPostsByCategory, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import type { WpPost } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

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
  } catch {
    alauneData = [];
  }

  // Récupérer les images pour chaque slide
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
        color: "#cc1111",
        link: `/actualite/${item.slug}`,
      };
    })
  );

  // ---- News (actualités) ----
  let actualiteData: WpPost[] = [];
  try {
    actualiteData = (await getActualite({ per_page: 6, _embed: true })) as WpPost[];
  } catch {
    actualiteData = [];
  }

  const articles = await Promise.all(
    actualiteData.map(async (item: WpPost, index: number) => {
      const imageUrl = await resolvePostImage(item, getMedia);

      return {
        id: item.id,
        category: getAcfString(item, "categorie", "Actualité"),
        categoryColor: index === 0 ? "#1a5c16" : "#5bc8de",
        date: formatDate(item.date),
        title: item.title?.rendered || "Sans titre",
        excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
        image: imageUrl,
        featured: index === 0,
        link: `/actualite/${item.slug}`,
      };
    })
  );

  // Parliamentary work
  const CAT_LOIS = 42;
  const CAT_CALENDRIER = 43;

  const loisData = (await getPostsByCategory(CAT_LOIS, { per_page: 4, _embed: true }).catch(() => [])) as WpPost[];
  const calendrierData = (await getPostsByCategory(CAT_CALENDRIER, { per_page: 4, _embed: true }).catch(() => [])) as WpPost[];

  const tabsData = [
    {
      id: "legislation",
      iconName: "FileText" as const,
      label: "Travaux législatifs",
      color: "#5bc8de",
      path: "/parliamentary-proceedings",
      items: loisData.map((item: WpPost) => ({
        ref: getAcfString(item, "reference", item.title?.rendered || "Réf. inconnue"),
        title: item.title?.rendered || "Sans titre",
        status: getAcfString(item, "statut", "En cours"),
        date: formatDate(item.date),
        statusColor: getAcfString(item, "statut", "") === "Adopté" ? "#16a34a" : "#5bc8de",
      })),
    },
    {
      id: "calendar",
      iconName: "Calendar" as const,
      label: "Calendrier parlementaire",
      color: "#5bc8de",
      path: "/agenda",
      items: calendrierData.map((item: WpPost) => ({
        ref: getAcfString(item, "type", "Session"),
        title: item.title?.rendered || "Sans titre",
        status: getAcfString(item, "statut", "Planifié"),
        date: formatDate(item.date),
        statusColor: getAcfString(item, "statut", "") === "Terminé" ? "#cc1111" : "#5bc8de",
      })),
    },
    {
      id: "texts",
      iconName: "BookOpen" as const,
      label: "Textes de référence",
      color: "#5bc8de",
      path: "/about/reference-texts",
      items: [],
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />
      <AboutSection />
      <NewsGrid articles={articles} />
      <ParliamentaryWork tabsData={tabsData} />
      <PartnersBand />
    </>
  );
}