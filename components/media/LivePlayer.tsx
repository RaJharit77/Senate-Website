'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Radio, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LivePlayerProps {
    streamUrl: string;
    sourceType?: 'url' | 'facebook' | 'youtube';
    title?: string;
    kind?: 'tv' | 'radio';
    className?: string;
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

    const togglePlay = () => {
        if (!streamUrl || !mediaRef.current) return;
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
        // 'url' : flux vidéo ou audio
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
        } else {
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
        }
    };

    const isEmbed = sourceType === 'facebook' || sourceType === 'youtube';

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
                    {!isEmbed && (
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
                    <p className="text-sm text-yellow-300/90 mt-3">
                        ⚠️ Veuillez configurer l&apos;URL du live dans les variables d&apos;environnement.
                    </p>
                )}
                {hasError && (
                    <p className="text-sm text-red-300/90 mt-3">
                        ⚠️ Le flux est momentanément indisponible. Réessayez dans quelques instants.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function LivePlayer(props: LivePlayerProps) {
    return <LivePlayerContent key={`${props.kind ?? 'tv'}:${props.streamUrl}`} {...props} />;
}