import { getPodcasts } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import AudioPlayer from '@/components/media/AudioPlayer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';
import { EMERALD, RED, WHITE } from '@/utils/colors';
import { cleanText } from '@/utils/utility';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const posts = await getPodcasts({ slug, _embed: true }).catch(() => []);
    if (posts.length === 0) return { title: 'Podcast introuvable - Sénat de Madagascar' };

    const title = cleanText(posts[0].title.rendered);
    return {
        title: `${title} - Chaîne TV / Radio - Sénat de Madagascar`,
        description: posts[0].excerpt?.rendered?.replace(/<[^>]+>/g, '') || undefined,
    };
}

export default async function AudioDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const posts = await getPodcasts({ per_page: 100 }).catch(() => []);
    const tracks = posts
        .map((p) => extractMediaItem(p, 'audio'))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const initialTrackIndex = tracks.findIndex((t) => t.slug === slug);
    if (initialTrackIndex === -1) notFound();

    const cleanTitle = cleanText(tracks[initialTrackIndex].title);

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

                <AudioPlayer tracks={tracks} initialTrackIndex={initialTrackIndex} />
            </div>
        </div>
    );
}