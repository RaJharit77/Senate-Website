export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumb?: { label: string; href: string }[];
    className?: string;
}