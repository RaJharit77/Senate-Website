import { BookOpen, Calendar, FileText, Globe, User, Users, UsersRound } from "lucide-react";

export interface Slide {
    id: number;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    color: string;
    link?: string;
}

export interface Article {
    id: number;
    category: string;
    categoryColor: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    featured?: boolean;
    link?: string;
}

export interface NewsGridProps {
    featuredArticles: Article[];
    sideArticles: Article[];
}

export const iconMap = {
    FileText,
    Calendar,
    BookOpen,
    Globe,
    Users,
    User,
    UsersRound,
};

export interface WorkItem {
    ref: string;
    title: string;
    status: string;
    date: string;
    statusColor: string;
    link: string;
    iconName?: keyof typeof iconMap;
}

export interface TabData {
    id: string;
    iconName: keyof typeof iconMap;
    label: string;
    color: string;
    path: string;
    items: WorkItem[];
}