"use client";

import { EMERALD, INK, RED } from "@/utils/colors";
import { type CSSProperties, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const contentStyles: CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    color: INK,
};

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
            <CardHeader className="p-0">
                <div className="px-6 sm:px-10 pt-8">
                    <div className="rounded-full py-3.5 px-6" style={{ backgroundColor: pillColor }}>
                        <CardTitle
                            className="text-center"
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "1.35rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                letterSpacing: "0.01em",
                                lineHeight: 1.2,
                            }}
                        >
                            {title}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 sm:px-10 pb-10 pt-2 prose prose-lg max-w-none" style={contentStyles}>
                {children}
            </CardContent>
            <style jsx>{`
                .prose h2 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: ${RED};
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    letter-spacing: -0.01em;
                }
                .prose h3 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: ${EMERALD};
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .prose p {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.02rem;
                    line-height: 1.85;
                    color: ${INK};
                    margin-bottom: 1.15rem;
                }
                /* --- Listes avec séparateurs visibles --- */
                .prose ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0 0 1.5rem 0;
                    display: flex;
                    flex-direction: column;
                }
                .prose ul li {
                    position: relative;
                    padding-left: 1.4rem;
                    padding-top: 0.8rem;
                    padding-bottom: 0.8rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.02rem;
                    line-height: 1.85;
                    color: ${INK};
                    /* Séparateur plus épais et coloré */
                    border-bottom: 2px solid rgba(91, 200, 222, 0.3);
                }
                .prose ul li:last-child {
                    border-bottom: none;
                }
                .prose ul li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 1.3rem;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background-color: ${EMERALD};
                }
                .prose ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin: 0 0 1.5rem 0;
                }
                .prose ol li {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.02rem;
                    line-height: 1.85;
                    color: ${INK};
                    padding-top: 0.6rem;
                    padding-bottom: 0.6rem;
                    border-bottom: 2px solid rgba(91, 200, 222, 0.25);
                }
                .prose ol li:last-child {
                    border-bottom: none;
                }
                .prose strong {
                    color: ${INK};
                    font-weight: 700;
                }
                .prose a {
                    color: ${EMERALD};
                    text-decoration: underline;
                    transition: color 0.2s;
                }
                .prose a:hover {
                    color: ${RED};
                }
                .prose blockquote {
                    border-left: 4px solid ${RED};
                    padding-left: 1rem;
                    font-style: italic;
                    color: ${INK};
                    opacity: 0.8;
                    margin: 1.5rem 0;
                }
                .prose hr {
                    border: 0;
                    border-top: 1px solid rgba(22,36,20,0.1);
                    margin: 2rem 0;
                }
            `}</style>
        </Card>
    );
}