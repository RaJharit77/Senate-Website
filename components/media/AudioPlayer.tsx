'use client';

import { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { cleanText } from '@/utils/utility';
import { AudioPlayerProps } from '@/types/media';

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
        return <div className="text-center py-8 text-gray-400">Aucun podcast disponible</div>;
    }

    const cleanTitle = cleanText(currentTrack.title);
    const cleanExcerpt = cleanText(currentTrack.excerpt || '');

    return (
        <div className={`bg-white/10 backdrop-blur-sm border-white/10 rounded-xl p-6 ${className}`}>
            <audio
                ref={audioRef}
                src={currentTrack.mediaUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleNext}
                onLoadedMetadata={handleTimeUpdate}
                className="hidden"
            />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {cleanTitle}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">{cleanExcerpt || 'Podcast'}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 text-white"
                    >
                        <SkipBack size={20} />
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white shadow-lg shadow-cyan-500/30"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === tracks.length - 1}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 text-white"
                    >
                        <SkipForward size={20} />
                    </button>
                </div>

                <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs tabular-nums text-gray-300">{formatTime(currentTime)}</span>
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
                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <span className="text-xs tabular-nums text-gray-300">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded text-white">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {tracks.map((track, idx) => {
                    const trackCleanTitle = cleanText(track.title);
                    return (
                        <div
                            key={track.id}
                            className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-white/5 ${idx === currentIndex ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-300'
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
                            <span className="truncate text-sm">{trackCleanTitle}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}