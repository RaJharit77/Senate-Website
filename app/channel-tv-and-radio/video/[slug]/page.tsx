import { getMediaBySlug, getAllChannelAndRadioMedia } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import VideoPlayer from '@/components/media/VideoPlayer';
import MediaList from '@/components/media/MediaList';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Une "vidéo" au sens de cette page peut venir de deux catégories WP
// distinctes (CAT_VIDEO pour YouTube, CAT_VIDEO_HOSTED pour l'hébergée) qui
// partagent le même segment d'URL /chaine-tv-radio/video/[slug]. On tente
// youtube d'abord (contenu déjà en prod), puis hosted.
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

    const title = resolved.post.title.rendered;
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

    // Suggestions : autres vidéos (YouTube + hébergées confondues), en
    // excluant la vidéo courante.
    const { youtube, hosted } = await getAllChannelAndRadioMedia({ per_page: 12 });
    const suggestions = [
        ...youtube.map((p) => extractMediaItem(p, 'youtube')),
        ...hosted.map((p) => extractMediaItem(p, 'video')),
    ]
        .filter((item) => item.slug !== slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link
                href="/channel-tv-and-radio"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition"
            >
                <MdArrowBackIos className="w-3 h-3" />
                Retour à la Chaîne TV / Radio
            </Link>

            <VideoPlayer video={video} />

            {suggestions.length > 0 && (
                <section className="mt-12">
                    <MediaList items={suggestions} type="video" title="À voir aussi" />
                </section>
            )}
        </div>
    );
}