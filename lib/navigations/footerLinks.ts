import { CYAN, RED } from "../../utils/colors";

export const footerLinks = [
    {
        title: "Institution",
        color: CYAN,
        links: [
            { label: "À propos du Sénat", path: "/about/functioning" },
            { label: "Historique du Sénat", path: "/historical" },
            { label: "Missions et attributions", path: "/about/mission-and-responsibilities" },
            { label: "Structures", path: "/about/structures" },
            { label: "Textes de référence", path: "/about/reference-texts" },
            { label: "Structures administratives", path: "/about/administrative-structures" },
        ],
    },
    {
        title: "Travaux",
        color: RED,
        links: [
            { label: "Travaux législatifs", path: "/parliamentary-proceedings/legislative-proceedings" },
            //{ label: "Vos Sénateurs", path: "/your-senators" },
            { label: "Calendrier parlementaire", path: "/parliamentary-proceedings" },
            { label: "Textes adoptés", path: "/parliamentary-proceedings" },
            { label: "Question écrites", path: "/parliamentary-proceedings/written-questions" },
        ],
    },
    {
        title: "International",
        color: CYAN,
        links: [
            { label: "Relations internationales", path: "/international" },
            { label: "Groupe d'amitié", path: "/international/inter-parliamentary-friendship-group" },
            { label: "Coopération APF", path: "/international" },
            { label: "Activités Sénatoriales", path: "/international/senators-activities" },
        ],
    },
    {
        title: "Médias",
        color: RED,
        links: [
            { label: "Espace de presse", path: "/press-area" },
            { label: "Vidéos", path: "/channel-tv-and-radio" },
            { label: "Podcasts", path: "/channel-tv-and-radio/audio" },
            { label: "Live TV", path: "/channel-tv-and-radio/tv" },
            { label: "Live Radio", path: "/channel-tv-and-radio/radio" },
            { label: "Galeries", path: "/others" },
        ],
    },
];
