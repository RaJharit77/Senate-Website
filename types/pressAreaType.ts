
import type { WpPost } from "@/lib/wp-types";

export interface ExtendedPost extends WpPost {
    isFeatured: boolean;
    imageUrl: string | null;
}