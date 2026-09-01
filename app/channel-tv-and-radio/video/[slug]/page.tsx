// app/channel-tv-and-radio/video/[slug]/page.tsx

import { getMediaBySlug } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import VideoPlayer from '@/components/media/VideoPlayer';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';
import { EMERALD, RED, WHITE } from '@/utils/colors';
import { cleanText } from '@/utils/utility';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function resolveVideo(slug: string) {
    const youtubePost = await getMediaBySlug(slug, 'youtube');
    if (youtubePost) return { post: youtubePost, kind: 'youtube' as const };

    const hostedPost = await getMediaBySlug(slug, 'video');
    if (hostedPost) return { post: hostedPost, kind: 'video' as const };

    return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const resolved = await resolveVideo(slug);
    if (!resolved) return { title: 'Vidéo introuvable - Sénat de Madagascar' };

    const title = cleanText(resolved.post.title.rendered);
    return {
        title: `${title} - Chaîne TV / Radio - Sénat de Madagascar`,
        description: resolved.post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || undefined,
    };
}

export default async function VideoDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const resolved = await resolveVideo(slug);

    if (!resolved) {
        notFound();
        return null;
    }

    const video = extractMediaItem(resolved.post, resolved.kind);
    const cleanTitle = cleanText(video.title);

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-4xl mx-auto">
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

                <h1 className="text-white text-3xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {cleanTitle}
                </h1>

                <VideoPlayer video={video} className="w-full" />
            </div>
        </div>
    );
}