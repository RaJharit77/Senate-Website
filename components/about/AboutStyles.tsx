"use client";

import { EMERALD, RED } from "@/utils/colors";
import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <li className="relative font-poppins text-[1.02rem] leading-[1.85] text-[#1a1a1a] mb-0 pl-[1.4rem]">
            <Bullet color={color} />
            <strong className="font-bold text-[#1a1a1a]">{name}</strong> — {children}
        </li>
    );
}

export function Divider({ children, color = RED }: { children: string; color?: string }) {
    return (
        <div className="flex items-center gap-4 my-8">
            <span className="flex-1 h-px bg-[rgba(22,36,20,0.18)]" />
            <span
                className="font-poppins text-[0.78rem] font-bold uppercase tracking-[0.16em] whitespace-nowrap"
                style={{ color }}
            >
                {children}
            </span>
            <span className="flex-1 h-px bg-[rgba(22,36,20,0.18)]" />
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
        <Card className="border border-[rgba(22,36,20,0.08)] shadow-md rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm">
            <CardHeader className="p-0">
                <div className="px-6 sm:px-10 pt-8">
                    <div
                        className="rounded-full py-3.5 px-6 backdrop-blur-sm border border-white/20"
                        style={{
                            backgroundColor: `${pillColor}80`,
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                        }}
                    >
                        <CardTitle
                            className="text-center font-poppins text-[1.35rem] font-bold tracking-[0.01em] leading-[1.2] text-white"
                        >
                            {title}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 sm:px-10 pb-10 pt-2 prose prose-lg max-w-none font-poppins text-[#1a1a1a]">
                {children}
            </CardContent>
        </Card>
    );
}