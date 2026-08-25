// components/AudioPlayer.tsx
'use client';

import { useState, useRef } from 'react';
import { MediaItem } from '@/types/media';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
    tracks: MediaItem[];
    initialTrackIndex?: number;
    className?: string;
}

export default function AudioPlayer({ tracks, initialTrackIndex = 0, className = '' }: AudioPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialTrackIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = tracks[currentIndex];

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (currentIndex < tracks.length - 1) {
            setCurrentIndex(currentIndex + 1);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                if (isPlaying) audioRef.current.play();
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                if (isPlaying) audioRef.current.play();
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
        }
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!currentTrack) {
        return <div className="text-center py-8">Aucun podcast disponible</div>;
    }

    return (
        <div className={`bg-gray-900 text-white rounded-xl p-6 ${className}`}>
            <audio
                ref={audioRef}
                src={currentTrack.mediaUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleNext}
                onLoadedMetadata={handleTimeUpdate}
                className="hidden"
            />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Info piste */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{currentTrack.title}</h4>
                    <p className="text-sm text-gray-400 truncate">{currentTrack.excerpt || 'Podcast'}</p>
                </div>

                {/* Contrôles */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30"
                    >
                        <SkipBack size={20} />
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === tracks.length - 1}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30"
                    >
                        <SkipForward size={20} />
                    </button>
                </div>

                {/* Progression */}
                <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs tabular-nums">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (audioRef.current) {
                                audioRef.current.currentTime = val;
                                setCurrentTime(val);
                            }
                        }}
                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-xs tabular-nums">{formatTime(duration)}</span>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-1">
                    <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
            </div>

            {/* Playlist */}
            <div className="mt-4 border-t border-gray-800 pt-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {tracks.map((track, idx) => (
                    <div
                        key={track.id}
                        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-white/5 ${idx === currentIndex ? 'bg-blue-600/20 text-blue-400' : ''
                            }`}
                        onClick={() => {
                            setCurrentIndex(idx);
                            if (audioRef.current) {
                                audioRef.current.currentTime = 0;
                                if (isPlaying) audioRef.current.play();
                            }
                        }}
                    >
                        <span className="text-xs text-gray-400 w-6 text-right">{idx + 1}</span>
                        <span className="truncate text-sm">{track.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}