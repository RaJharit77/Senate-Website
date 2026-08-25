'use client';

import { MediaItem } from '@/types/media';

interface VideoPlayerProps {
    video: MediaItem;
    className?: string;
}

export default function VideoPlayer({ video, className = '' }: VideoPlayerProps) {
    const renderVideo = () => {
        if (video.mediaType === 'youtube' && video.youtubeId) {
            return (
                <div className="relative w-full aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-lg"
                        title={video.title}
                    />
                </div>
            );
        }

        // 'video' (hébergée) et 'montage' (rediffusion/montage édité)
        // utilisent le même lecteur <video> HTML5 natif.
        if (video.mediaUrl) {
            return (
                <video
                    controls
                    autoPlay
                    className="w-full rounded-lg"
                    poster={video.thumbnail}
                >
                    <source src={video.mediaUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                </video>
            );
        }

        return (
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-500">Aucune vidéo disponible pour ce média.</p>
            </div>
        );
    };

    return (
        <div className={`bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden ${className}`}>
            {renderVideo()}
            <div className="p-4">
                {video.mediaType === 'montage' && (
                    <span className="inline-block text-xs font-medium text-purple-500 uppercase tracking-wide mb-1">
                        Mise en boîte
                    </span>
                )}
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{video.excerpt}</p>
            </div>
        </div>
    );
}