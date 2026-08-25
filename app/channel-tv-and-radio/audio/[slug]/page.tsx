import { getPodcasts } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import AudioPlayer from '@/components/media/AudioPlayer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const posts = await getPodcasts({ slug, _embed: true }).catch(() => []);
    if (posts.length === 0) return { title: 'Podcast introuvable - Sénat de Madagascar' };

    const title = posts[0].title.rendered;
    return {
        title: `${title} - Chaîne TV / Radio - Sénat de Madagascar`,
        description: posts[0].excerpt?.rendered?.replace(/<[^>]+>/g, '') || undefined,
    };
}

export default async function AudioDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // On charge toute la playlist (pas juste la piste demandée) : AudioPlayer
    // affiche déjà une liste de lecture complète, ça évite un aller-retour
    // supplémentaire si le visiteur veut enchaîner sur un autre podcast.
    const posts = await getPodcasts({ per_page: 100 }).catch(() => []);
    const tracks = posts
        .map((p) => extractMediaItem(p, 'audio'))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const initialTrackIndex = tracks.findIndex((t) => t.slug === slug);
    if (initialTrackIndex === -1) notFound();

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link
                href="/chaine-tv-radio"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition"
            >
                <MdArrowBackIos className="w-3 h-3" />
                Retour à la Chaîne TV / Radio
            </Link>

            <h1 className="text-2xl font-bold mb-6">{tracks[initialTrackIndex].title}</h1>

            <AudioPlayer tracks={tracks} initialTrackIndex={initialTrackIndex} />
        </div>
    );
}