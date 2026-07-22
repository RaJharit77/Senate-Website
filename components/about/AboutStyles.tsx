import { EMERALD, INK, RED } from "@/utils/colors";
import { type CSSProperties, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const pStyle: CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.02rem",
    lineHeight: 1.85,
    color: INK,
    marginBottom: "1.15rem",
};

export const subheadStyle: CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: RED,
    marginTop: "2rem",
    marginBottom: "1rem",
};

export const ulStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: "0 0 1.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
};

export const liStyle: CSSProperties = {
    ...pStyle,
    marginBottom: 0,
    paddingLeft: "1.4rem",
    position: "relative",
};

export function Bullet({ color }: { color: string }) {
    return (
        <span
            className="absolute left-0 top-2 rounded-full"
            style={{ width: 6, height: 6, backgroundColor: color }}
        />
    );
}

export function NamedItem({
    name,
    color = EMERALD,
    children,
}: {
    name: string;
    color?: string;
    children: ReactNode;
}) {
    return (
        <li style={liStyle}>
            <Bullet color={color} />
            <strong style={{ color: INK, fontWeight: 700 }}>{name}</strong> — {children}
        </li>
    );
}

export function Divider({ children, color = RED }: { children: string; color?: string }) {
    return (
        <div className="flex items-center gap-4" style={{ margin: "2rem 0 1.5rem" }}>
            <span className="flex-1 h-px" style={{ backgroundColor: "rgba(22,36,20,0.18)" }} />
            <span
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color,
                    whiteSpace: "nowrap",
                }}
            >
                {children}
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: "rgba(22,36,20,0.18)" }} />
        </div>
    );
}

export function DocCard({
    title,
    pillColor = RED,
    children,
}: {
    title: string;
    pillColor?: string;
    children: ReactNode;
}) {
    return (
        <Card className="border border-[rgba(22,36,20,0.08)] shadow-md rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
                <div className="px-6 sm:px-10 pt-8">
                    <div className="rounded-full py-3.5 px-6" style={{ backgroundColor: pillColor }}>
                        <h2
                            className="text-center"
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "1.35rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                letterSpacing: "0.01em",
                            }}
                        >
                            {title}
                        </h2>
                    </div>
                </div>
                <div className="px-6 sm:px-10 pb-10 pt-2">{children}</div>
            </CardContent>
        </Card>
    );
}