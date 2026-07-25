"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-cyan-500/20 p-4 border border-cyan-500/30">
                        <FileQuestion className="h-12 w-12 text-cyan-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Page non trouvée
                </h1>
                <p className="text-white/60 text-sm mb-6">
                    La page que vous cherchez n&apos;existe pas ou a été déplacée.
                </p>
                <Button
                    asChild
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition shadow-lg shadow-cyan-500/30"
                >
                    <Link href="/">Retour à l&apos;accueil</Link>
                </Button>
                <div className="mt-6 flex gap-1 justify-center" style={{ height: 3 }}>
                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>
            </div>
        </div>
    );
}