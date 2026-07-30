import { Scale, Users, Globe, BookOpen, FileText } from "lucide-react";
import { CYAN, EMERALD, GREEN, RED } from "@/utils/colors";

// Données des missions
export const missionData = [
    {
        icon: Scale,
        color: EMERALD,
        bg: GREEN,
        title: "Fonction législative",
        text: "Les Sénateurs élaborent des propositions de loi pour satisfaire les besoins de leurs régions. La loi est l'expression de la volonté du peuple.",
        link: "/about/missions-and-responsibilities",
    },
    {
        icon: Users,
        color: RED,
        bg: RED,
        title: "Contrôle de l'action gouvernementale",
        text: "Le Sénat contrôle l'action du Gouvernement et évalue l'efficacité des politiques publiques.",
        link: "/about/missions-and-responsibilities",
    },
    {
        icon: Globe,
        color: CYAN,
        bg: CYAN,
        title: "Représentation des collectivités",
        text: "Le Sénat représente les Collectivités Territoriales Décentralisées. Les Sénateurs sont les élus des élus.",
        link: "/about/missions-and-responsibilities",
    },
    {
        icon: BookOpen,
        color: EMERALD,
        bg: GREEN,
        title: "Fonction consultative",
        text: "Le Sénat donne son avis sur les questions dont le Gouvernement le saisit, à l'exclusion de tout projet législatif.",
        link: "/about/missions-and-responsibilities",
    },
];

// Données du leadership
export const leadershipData = [
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
        path: "/historical#quatrieme",
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

// Données des textes de référence
export const referenceTextsData = [
    {
        title: "Dispositions constitutionnelles",
        text: "Le Sénat est prévu par l'article 80 et suivant de la Constitution de la Quatrième République.",
        link: "/about/reference-texts#dispositions",
        icon: FileText,
        color: EMERALD,
        bg: EMERALD,
    },
    {
        title: "Lois organiques",
        list: ["Ordonnance n° 2001-001 du 05 janvier 2001", "Loi Organique n° 2015-007 du 03 mars 2015"],
        link: "/about/reference-texts#lois-organiques",
        icon: FileText,
        color: RED,
        bg: RED,
    },
    {
        title: "Sources règlementaires",
        list: [
            "Arrêté n°2001-001 du 08 mai 2001 (Règlement Intérieur)",
            "Arrêté n°2001-002 du 16 mai 2001 (Organisation des Services)",
        ],
        link: "/about/reference-texts#sources-reglementaires",
        icon: FileText,
        color: CYAN,
        bg: CYAN,
    },
    {
        title: "Textes sur les services",
        text: "Arrêté n°2001-002 du 16 mai 2001 portant organisation générale des Services du Sénat.",
        link: "/about/reference-texts#textes-services",
        icon: FileText,
        color: EMERALD,
        bg: EMERALD,
    },
];