import type { TabConfig } from "@/components/history/HistoryTabs";
import { CYAN, EMERALD, RED } from "../colors";

export const TABS: TabConfig[] = [
    {
        id: "first",
        label: "Première République",
        color: EMERALD,
        textColor: "black",
        period: "1959 – 1972",
        intro: "Pendant la Première République, le Sénat constitue la Chambre Haute d'un Parlement bicaméral aux côtés de l'Assemblée Nationale.",
    },
    {
        id: "second",
        label: "Deuxième République",
        color: RED,
        textColor: "white",
        period: "1975 – 1991",
        intro: "Pendant la Deuxième République, le Sénat est supprimé au profit d'un Parlement monocaméral : l'Assemblée Nationale concentre l'essentiel du pouvoir législatif.",
    },
    {
        id: "third",
        label: "Troisième République",
        color: EMERALD,
        textColor: "black",
        period: "1992 – 2009",
        intro: "Pendant la Troisième République, le système bicaméral est réhabilité par la Constitution de 1992, mais le Sénat ne redevient effectif qu'en mai 2001.",
    },
    {
        id: "fourth",
        label: "Quatrième République",
        color: RED,
        textColor: "black",
        period: "depuis 2014",
        intro: "Pendant la Quatrième République, le Sénat reprend ses fonctions aux côtés de l'Assemblée Nationale, avec un mandat sénatorial ramené à cinq ans.",
    },
    {
        id: "transition",
        label: "Période Transitoire",
        color: CYAN,
        textColor: "black",
        period: "1972 – 1975 · 1991 – 1992 · 2009 – 2014",
        intro: "Durant les périodes transitoires, le Sénat est suspendu et remplacé par des organes consultatifs (CNPD, CRES, puis Conseil Supérieur de la Transition) le temps de la mise en place de nouvelles institutions.",
    },
];