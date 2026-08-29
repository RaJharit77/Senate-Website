import { getLiveStatus } from '@/lib/api';
import LivePlayer from '@/components/media/LivePlayer';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';
import { EMERALD, RED, WHITE } from '@/utils/colors';

export const metadata: Metadata = {
    title: 'Sénat TV - Direct - Sénat de Madagascar',
    description: 'Regardez le direct de la chaîne TV du Sénat de Madagascar.',
};

export const dynamic = 'force-dynamic';

export default async function LiveTvPage() {
    // getLiveStatus('tv') interroge la YouTube Data API puis, à défaut, lit
    // LIVE_FACEBOOK_VIDEO_URL — voir lib/api.ts pour le détail de la
    // priorité. D'où l'await : ce n'est plus une simple lecture de variable
    // d'environnement synchrone.
    const liveTv = await getLiveStatus('tv');

    return (
        <div className="min-h-screen bg-black/30 backdrop-blur-sm py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/channel-tv-and-radio"
                    className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-6 transition"
                >
                    <MdArrowBackIos className="w-3 h-3" />
                    Retour à la Chaîne TV / Radio
                </Link>

                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>

                <h1 className="text-3xl font-bold text-white mb-6">Sénat TV – Direct</h1>

                <LivePlayer
                    streamUrl={liveTv.streamUrl}
                    sourceType={liveTv.sourceType}
                    title={liveTv.title}
                    kind="tv"
                    className="w-full"
                />
            </div>
        </div>
    );
}