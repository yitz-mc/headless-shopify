import { Metadata } from 'next';
import { Gallery } from '@/components/sections';
import { getGalleryImages } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Photo Gallery | Modular Closets',
  description:
    'Browse our gallery of custom closet installations. See how Modular Closets transforms spaces with Vista and Alto closet systems.',
};

export default async function GalleryPage() {
  const { images, tags } = await getGalleryImages();

  return (
    <main>
      <Gallery
        title='Real Closets from Thousands of Happy Customers'
        subtitle='Authentic Spaces. Personalized Solutions. Endless Inspiration.'
        images={images}
        tags={tags}
      />
    </main>
  );
}
