import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { ParliamentaryWork } from "@/components/home/ParliamentaryWork";
import { PartnersBand } from "@/components/home/PartnersBand";
import { getAlaune, getActualite, getMedia } from "@/lib/api";
import { resolvePostImage } from "@/lib/extractImage";
import type { WpPost } from "@/lib/wp-types";
import { formatDate } from "@/utils/utility";
import { GREENS, REDS } from "@/utils/colors";
import JsonLd from '@/components/JsonLd';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: 'Accueil – Sénat de Madagascar',
  description: 'Site officiel du Sénat de Madagascar. Retrouvez les actualités, les travaux parlementaires, l\'histoire et les institutions de la République.',
  path: '/',
});

// ─── Helper ───
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
        link: `/press-area/news/${item.slug}`,
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
        link:  `/press-area/news/${item.slug}`,
        index,
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
        link: `/press-area/news/${item.slug}`,
      };
    })
  );

  // ---- Données structurées (JSON‑LD) ----
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Accueil', url: SITE_URL },
  ]);

  // Liste des sections principales pour l'ItemList
  const sections = [
    { name: 'À propos du Sénat', url: `${SITE_URL}/about` },
    { name: 'Missions et attributions', url: `${SITE_URL}/about/missions-and-responsibilities` },
    { name: 'Structures', url: `${SITE_URL}/about/structures` },
    { name: 'Textes de référence', url: `${SITE_URL}/about/reference-texts` },
    { name: 'Message du Président', url: `${SITE_URL}/about/president-message` },
    { name: 'Historique', url: `${SITE_URL}/historical` },
    { name: 'Travaux Parlementaires', url: `${SITE_URL}/parliamentary-proceedings` },
    { name: 'Travaux Parlementaires', url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings` },
    { name: 'Travaux législatifs', url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings` },
    { name: 'Délibérations et ordres du jour', url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda` },
    { name: 'Agenda', url: `${SITE_URL}/agenda` },
    { name: 'International', url: `${SITE_URL}/international` },
    { name: 'Activités du Président', url: `${SITE_URL}/international/presidents-activities` },
    { name: 'Activités des Sénateurs', url: `${SITE_URL}/international/senators-activities` },
    { name: 'Groupe Interparlementaire d\'amitié', url: `${SITE_URL}/international/inter-parliamentary-friendship-group` },
    { name: 'Espace Presse', url: `${SITE_URL}/press-area` },
    { name: 'Textes et Lois', url: `${SITE_URL}/texts-and-laws` },
    { name: 'Contact', url: `${SITE_URL}/contact` },
    { name: 'Plan du site', url: `${SITE_URL}/sitemap` },
    { name: 'Autres', url: `${SITE_URL}/others` },
  ];

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Accueil – Sénat de Madagascar',
    description: 'Site officiel du Sénat de Madagascar. Retrouvez les actualités, les travaux parlementaires, l\'histoire et les institutions de la République.',
    url: SITE_URL,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Sénat de Madagascar',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sections.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPageJsonLd} />
      <HeroCarousel slides={slides} />
      <NewsGrid featuredArticles={featuredArticles} sideArticles={sideArticles} />
      <AboutSection />
      <ParliamentaryWork />
      <PartnersBand />
    </>
  );
}
