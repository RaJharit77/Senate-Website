import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    label?: string;
    fullScreen?: boolean;
}

const sizeMap = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
};

export function LoadingSpinner({
    size = "md",
    className,
    label = "Chargement...",
    fullScreen = false,
}: LoadingSpinnerProps) {
    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className={cn("animate-spin text-cyan-400", sizeMap[size], className)} />
            {label && <p className="text-sm text-white/60 animate-pulse">{label}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return spinner;
}