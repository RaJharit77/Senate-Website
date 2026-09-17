import { NextResponse } from "next/server";
import { getSenatorsPayload } from "@/lib/wp-senators";
import type { SenatorsApiResponse } from "@/types/senatorsType";

export async function GET() {
    try {
        const payload = await getSenatorsPayload();

        const response: SenatorsApiResponse = {
            success: true,
            data: payload,
            meta: {
                count: payload.senateurs.length,
                generatedAt: new Date().toISOString(),
            },
        };

        return NextResponse.json(response, {
            headers: {
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (err) {
        console.error("[/api/senators] Erreur :", err);
        return NextResponse.json<SenatorsApiResponse>(
            {
                success: false,
                error: "Impossible de récupérer les sénateurs depuis WordPress.",
            },
            { status: 500 }
        );
    }
}