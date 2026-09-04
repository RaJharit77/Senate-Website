import Link from 'next/link';
import { getLiveStatus } from '@/lib/api';
import ChannelAndRadioClient from '@/components/media/ChannelAndRadioClient';
import { Tv, Radio, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata ({
    title: 'Chaîne TV / Radio - Sénat de Madagascar',
    description: 'Retrouvez les vidéos, podcasts, montages et le direct du Sénat de Madagascar.',
    path: "/channel-tv-and-radio",
});

export const dynamic = 'force-dynamic';

export default async function ChannelAndRadioPage() {
    const [liveTv, liveRadio] = await Promise.all([
        getLiveStatus('tv'),
        getLiveStatus('radio'),
    ]);

    return (
        <>
            <ChannelAndRadioClient />

            <div className="bg-black/30 backdrop-blur-sm py-8 px-4 sm:px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center md:text-left">
                        Directs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/channel-tv-and-radio/live/tv" className="block">
                            <Card className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-cyan-500 rounded-full">
                                            <Tv size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-xl font-bold">Sénat TV</h3>
                                            {liveTv.isLive ? (
                                                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-none gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                    En direct
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-white/10 text-gray-400 border-none">
                                                    Hors ligne
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowRight className="text-cyan-300 w-6 h-6" />
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/channel-tv-and-radio/live/radio" className="block">
                            <Card className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-purple-500 rounded-full">
                                            <Radio size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-xl font-bold">Sénat Radio</h3>
                                            {liveRadio.isLive ? (
                                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-none gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                                    En direct
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-white/10 text-gray-400 border-none">
                                                    Hors ligne
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowRight className="text-purple-300 w-6 h-6" />
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}