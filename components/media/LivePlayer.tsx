'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Radio, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface LivePlayerProps {
    streamUrl: string;
    sourceType?: 'url' | 'facebook' | 'youtube';
    title?: string;
    kind?: 'tv' | 'radio';
    className?: string;
}

/**
 * Convertit l'URL stockée par getLiveStatus (embed YouTube construit par
 * lib/api.ts, ou permalien Facebook brut) vers ce qu'attend react-player :
 * une URL "watch" YouTube, ou le permalien Facebook tel quel.
 */
function toReactPlayerUrl(sourceType: 'youtube' | 'facebook', streamUrl: string): string {
    if (sourceType === 'youtube') {
        const match = streamUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        const videoId = match?.[1];
        return videoId ? `https://www.youtube.com/watch?v=${videoId}` : streamUrl;
    }
    return streamUrl;
}

function LivePlayerContent({
    streamUrl,
    sourceType = 'url',
    title = 'En direct',
    kind = 'tv',
    className = '',
}: LivePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

    // Radio sans flux audio dédié : getRadioLiveStatus (lib/api.ts) renvoie
    // alors le statut du direct TV tel quel, sous kind='radio'. Dans ce cas
    // précis, on veut le son sans l'image : react-player masqué (voir plus
    // bas), pas l'iframe visible utilisée pour la TV.
    const isRadioMirroringTv = kind === 'radio' && (sourceType === 'youtube' || sourceType === 'facebook');

    // Chrome natif visible (contrôles YouTube/Facebook) uniquement pour
    // l'iframe TV pleine taille — jamais pour le cas radio masqué ci-dessus,
    // où il n'y a plus aucun contrôle visible du tout.
    const hasVisibleNativeControls = kind === 'tv' && (sourceType === 'youtube' || sourceType === 'facebook');

    const togglePlay = () => {
        if (!streamUrl) return;

        // react-player (radio masqué) : contrôle déclaratif via l'état, pas
        // de ref DOM à appeler directement.
        if (isRadioMirroringTv) {
            setIsPlaying((prev) => !prev);
            return;
        }

        // <video>/<audio> brut (sourceType 'url') : contrôle impératif classique.
        if (!mediaRef.current) return;
        if (isPlaying) {
            mediaRef.current.pause();
            setIsPlaying(false);
        } else {
            mediaRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                    console.error('[LivePlayer] Lecture impossible:', err);
                    setHasError(true);
                });
        }
    };

    const Icon = kind === 'tv' ? Tv : Radio;

    const renderPlayer = () => {
        if (!streamUrl) {
            return (
                <div className="mt-4 text-center text-gray-400">
                    <p className="text-lg">Aucun flux disponible pour le moment.</p>
                    <p className="text-sm">Revenez plus tard pour suivre le direct.</p>
                </div>
            );
        }

        if (isRadioMirroringTv) {
            return (
                <div className="mt-4">
                    <div style={{ width: 1, height: 1, overflow: 'hidden' }}>
                        <ReactPlayer
                            src={toReactPlayerUrl(sourceType as 'youtube' | 'facebook', streamUrl)}
                            playing={isPlaying}
                            muted={false}
                            controls={false}
                            width="1px"
                            height="1px"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onError={() => setHasError(true)}
                        />
                    </div>
                    {isPlaying ? (
                        <p className="text-sm text-cyan-300 flex items-center gap-2 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Lecture audio en cours…
                        </p>
                    ) : (
                        <p className="text-sm text-gray-400 mt-2">
                            Appuyez sur le bouton ci-dessus pour écouter le direct.
                        </p>
                    )}
                </div>
            );
        }

        if (sourceType === 'facebook') {
            return (
                <div className="mt-4 aspect-video">
                    <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(streamUrl)}&show_text=0&width=560`}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Facebook Live"
                    />
                </div>
            );
        }

        if (sourceType === 'youtube') {
            return (
                <div className="mt-4 aspect-video">
                    <iframe
                        src={streamUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; encrypted-media"
                        title="YouTube Live"
                    />
                </div>
            );
        }

        if (kind === 'tv') {
            return (
                <video
                    ref={mediaRef as React.RefObject<HTMLVideoElement>}
                    src={streamUrl}
                    className={`w-full rounded-lg mt-4 ${isPlaying ? 'block' : 'hidden'}`}
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={() => setHasError(true)}
                />
            );
        }

        return (
            <audio
                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                src={streamUrl}
                className="hidden"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
            />
        );
    };

    return (
        <Card className={`bg-white/10 backdrop-blur-sm border-white/10 overflow-hidden hover:shadow-2xl transition-shadow ${className}`}>
            <CardContent className="p-5">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500 rounded-full shrink-0">
                        <Icon size={28} className={`text-white ${streamUrl ? 'animate-pulse' : ''}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        {streamUrl ? (
                            <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-none gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                En direct
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="text-xs bg-white/10 text-gray-400 border-none">
                                Hors ligne
                            </Badge>
                        )}
                        <h3 className="text-white text-xl font-bold mt-1 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {title}
                        </h3>
                    </div>
                    {!hasVisibleNativeControls && streamUrl && (
                        <button
                            onClick={togglePlay}
                            disabled={!streamUrl}
                            aria-label={isPlaying ? 'Mettre en pause' : 'Lancer le direct'}
                            className="p-4 rounded-full transition-colors shrink-0 bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 disabled:opacity-40 disabled:shadow-none disabled:bg-white/10 disabled:cursor-not-allowed"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                    )}
                </div>

                {renderPlayer()}

                {!streamUrl && (
                    <div className="mt-3 text-sm text-yellow-300/90">
                        <p>⚠️ Le direct n&apos;est pas encore disponible.</p>
                        <p className="text-xs text-gray-400">Si le problème persiste, contactez l&apos;équipe technique.</p>
                    </div>
                )}
                {hasError && (
                    <div className="mt-3 text-sm text-red-300/90">
                        <p>⚠️ Une erreur est survenue lors de la lecture du flux.</p>
                        <p className="text-xs text-gray-400">Veuillez réessayer dans quelques instants.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function LivePlayer(props: LivePlayerProps) {
    return <LivePlayerContent key={`${props.kind ?? 'tv'}:${props.streamUrl}`} {...props} />;
}