export const navItems = [
    { label: "Accueil", path: "/" },
    {
        label: "À propos du Sénat",
        path: "/about",
        children: [
            { label: "Missions et attributions", path: "/about/missions-and-responsibilities" },
            { label: "Structures", path: "/about/structures" },
            { label: "Textes de référence", path: "/about/reference-texts" },
            { label: "Fonctionnement", path: "/about/functioning" },
        ],
    },
    { label: "Historique", path: "/historical?tab=first" },
    {
        label: "Travaux Parlementaires",
        path: "/parliamentary-proceedings",
        children: [
            { label: "Travaux législatifs", path: "/parliamentary-proceedings/legislative-proceedings" },
            //{ label: "Vos Sénateurs", path: "/parliamentary-proceedings/your-senators" },
            { label: "Calendrier Parlementaire", path: "/agenda" },
            { label: "Textes et lois", path: "/texts-and-laws" },
        ],
    },
    {
        label: "International",
        path: "/international",
        children: [
            { label: "Activités du Président", path: "/international/presidents-activities" },
            { label: "Activités des Sénateurs", path: "/international/senators-activities" },
            { label: "Groupe Interparlementaire d'amitié", path: "/international/inter-parliamentary-friendship-group" },
        ],
    },
    { label: "Espace Presse", path: "/press-area" },
    { label: "Autres", path: "/others" },
    { label: "Médias", path: "/channel-tv-and-radio" },
    { label: "Contact", path: "/contact" },
];