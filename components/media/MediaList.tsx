'use client';

import Image from 'next/image';
import { PlayCircle, Music2, Clapperboard } from 'lucide-react';
import { MediaListProps } from '@/types/media';

export default function MediaList({ items, type, title, className = '', onSelect }: MediaListProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Aucun {type === 'video' ? 'vidéo' : 'audio'} disponible.
            </div>
        );
    }

    return (
        <div className={className}>
            {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                    const isMontage = item.mediaType === 'montage';
                    const HoverIcon = type === 'video' ? PlayCircle : Music2;

                    return (
                        <div
                            key={item.id}
                            className="group bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                            onClick={() => onSelect?.(item)}
                        >
                            <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                                {item.thumbnail ? (
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <HoverIcon size={48} className="text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <HoverIcon size={48} className="text-white drop-shadow-lg" />
                                </div>
                                {isMontage && (
                                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-purple-600/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        <Clapperboard size={12} />
                                        Mise en boîte
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h4 className="font-semibold line-clamp-1">{item.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {item.excerpt || ''}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(item.date).toLocaleDateString('fr-FR')}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}