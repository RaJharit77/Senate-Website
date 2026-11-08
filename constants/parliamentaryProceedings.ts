export const TEXTS_INTRO = "Le vote de la loi est la première mission du Parlement. Chaque loi est examinée tour à tour par le Sénat et l’Assemblée nationale, afin de se mettre d’accord sur un texte identique.";
export const AGENDA_INTRO = "L’ordre du jour est proposé par le Bureau permanent, entériné par la Conférence des Présidents pour être enfin adopté en Séance plénière.";
export const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const NAV = [
    { href: "#procedure", label: "Procédure" },
    { href: "#textes", label: "Textes à examiner" },
    { href: "#categories", label: "Ordre du jour & lois" },
    { href: "#adoptes", label: "Textes adoptés" },
    { href: "#deliberations", label: "Délibérations" },
];