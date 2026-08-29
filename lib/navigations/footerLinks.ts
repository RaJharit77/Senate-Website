import { CYAN, RED } from "../../utils/colors";

export const footerLinks = [
    {
        title: "Institution",
        color: CYAN,
        links: [
            { label: "À propos du Sénat", path: "/about" },
            { label: "Historique", path: "/historical" },
            { label: "Missions et attributions", path: "/about/mission-and-responsibilities" },
            { label: "Structures", path: "/about/structures" },
            { label: "Textes de référence", path: "/about/reference-texts" },
        ],
    },
    {
        title: "Travaux",
        color: RED,
        links: [
            { label: "Travaux législatifs", path: "/parliamentary-proceedings/legislative-proceedings" },
            { label: "Calendrier parlementaire", path: "/parliamentary-proceedings" },
            { label: "Textes adoptés", path: "/parliamentary-proceedings" },
        ],
    },
    {
        title: "International",
        color: CYAN,
        links: [
            { label: "Relations internationales", path: "/international" },
            { label: "Groupe d'amitié", path: "/international/inter-parliamentary-friendship-group" },
            { label: "Coopération APF", path: "/international" },
            { label: "Espace Presse", path: "/press-area" },
        ],
    },
    {
        title: "Médias",
        color: RED,
        links: [
            { label: "Vidéos", path: "/channel-tv-and-radio" },
            { label: "Podcasts", path: "/channel-tv-and-radio/audio" },
            { label: "Montages", path: "/channel-tv-and-radio/montages" },
            { label: "Espace de presse", path: "/press-area" },
            { label: "Galeries", path: "/others" },
        ],
    },
];
