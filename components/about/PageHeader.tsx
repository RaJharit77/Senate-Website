import Link from "next/link";
import { WHITE, RED, EMERALD } from "@/utils/colors";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumb?: { label: string; href: string }[];
    className?: string;
}

export function PageHeader({ title, subtitle, breadcrumb, className = "" }: PageHeaderProps) {
    return (
        <div className={className}>
            {breadcrumb && breadcrumb.length > 0 && (
                <div className="mb-6">
                    {breadcrumb.map((item, index) => (
                        <span key={index}>
                            {index > 0 && <span className="text-gray-300 mx-2">/</span>}
                            {index === breadcrumb.length - 1 ? (
                                <span className="text-cyan-400 text-sm font-semibold">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-cyan-400 font-semibold hover:text-white transition-colors text-sm"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex gap-1 mb-4 h-[3px]">
                <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
            </div>

            <h1 className="font-poppins font-bold text-white leading-tight text-[clamp(2rem,4vw,3rem)]">
                {title}
            </h1>
            {subtitle && (
                <p className="font-poppins text-white/50 text-lg mt-2 max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
}