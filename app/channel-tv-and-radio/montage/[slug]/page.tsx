import { getMediaBySlug, getMontages } from '@/lib/api';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getMediaBySlug(slug, 'montage');
    if (!post) return { title: 'Montage introuvable - Sénat de Madagascar' };

    const title = post.title.rendered;
    return {
        title: `${title} - Chaîne TV / Radio - Sénat de Madagascar`,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || undefined,
    };
}

export default async function MontageDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getMediaBySlug(slug, 'montage');
    if (!post) {
        notFound();
        return null;
    }

    const montage = extractMediaItem(post, 'montage');

    const otherMontages = await getMontages({ per_page: 12 }).catch(() => []);
    const suggestions = otherMontages
        .map((p) => extractMediaItem(p, 'montage'))
        .filter((item) => item.slug !== slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link
                href="/chaine-tv-radio"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition"
            >
                <MdArrowBackIos className="w-3 h-3" />
                Retour à la Chaîne TV / Radio
            </Link>

            <VideoPlayer video={montage} />

            {suggestions.length > 0 && (
                <section className="mt-12">
                    <MediaList items={suggestions} type="video" title="Autres mises en boîte" />
                </section>
            )}
        </div>
    );
}