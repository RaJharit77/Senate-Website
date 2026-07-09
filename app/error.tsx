"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Erreur globale :", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-red-500/20 p-4 border border-red-500/30">
                        <AlertTriangle className="h-12 w-12 text-red-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Oups ! Une erreur est survenue
                </h1>
                <p className="text-white/60 text-sm mb-6">
                    Nous rencontrons un problème technique. Veuillez réessayer ou revenir plus tard.
                </p>

                <div className="flex gap-3 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition shadow-lg shadow-cyan-500/30"
                    >
                        Réessayer
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white transition"
                    >
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </div>

                <div className="mt-6 flex gap-1 justify-center" style={{ height: 3 }}>
                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                    <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                    <div className="w-4 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>
            </div>
        </div>
    );
}