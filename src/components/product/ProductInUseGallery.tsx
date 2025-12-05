'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { shopifyClient } from '@/lib/shopify';

interface GalleryImage {
  id: string;
  imageUrl: string;
}

interface ProductInUseGalleryProps {
  productId: string;
  title?: string;
}

const GET_GALLERY_METAOBJECTS = `
  query GetGalleryMetaobjects($cursor: String) {
    metaobjects(type: "gallery", first: 100, after: $cursor) {
      edges {
        cursor
        node {
          id
          image: field(key: "image") {
            reference {
              ... on MediaImage {
                image {
                  url
                  width
                  height
                }
              }
            }
          }
          products: field(key: "products") {
            references(first: 50) {
              edges {
                node {
                  ... on Product {
                    id
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

interface GalleryResponse {
  metaobjects: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        image?: {
          reference?: {
            image?: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
        products?: {
          references?: {
            edges: Array<{
              node: {
                id: string;
              };
            }>;
          };
        };
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
    };
  };
}

function normalizeId(gid: string): string {
  return gid.split('/').pop() || '';
}

export function ProductInUseGallery({
  productId,
  title = 'See this product in use',
}: ProductInUseGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch gallery images
  useEffect(() => {
    async function fetchGalleryImages() {
      const normalizedProductId = normalizeId(productId);
      const allImages: GalleryImage[] = [];
      let cursor: string | null = null;
      let hasNextPage = true;

      try {
        while (hasNextPage && allImages.length < 5) {
          const response: GalleryResponse = await shopifyClient.request(GET_GALLERY_METAOBJECTS, {
            cursor,
          });

          const edges = response.metaobjects.edges;

          for (const edge of edges) {
            if (allImages.length >= 5) break;

            const entry = edge.node;
            const imageUrl = entry.image?.reference?.image?.url;
            const products = entry.products?.references?.edges || [];

            if (!imageUrl) continue;

            const matchesProduct = products.some(
              (p) => normalizeId(p.node.id) === normalizedProductId,
            );

            if (matchesProduct) {
              allImages.push({
                id: entry.id,
                imageUrl,
              });
            }
          }

          hasNextPage = response.metaobjects.pageInfo.hasNextPage;
          if (hasNextPage && edges.length > 0) {
            cursor = edges[edges.length - 1].cursor;
          }
        }

        setImages(allImages);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryImages();
  }, [productId]);

  // Initialize PhotoSwipe lightbox
  useEffect(() => {
    if (images.length === 0) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-in-use-gallery',
      children: 'a.gallery-item',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.9,
      showHideAnimationType: 'zoom',
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [images]);

  const openLightbox = useCallback((index: number) => {
    if (lightboxRef.current) {
      lightboxRef.current.loadAndOpen(index);
    }
  }, []);

  // Mobile swipe handling
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    const threshold = 50;

    if (diff > threshold && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (diff < -threshold && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - e.clientX;
    const threshold = 50;

    if (Math.abs(diff) < 10) {
      // It was a click, open lightbox
      openLightbox(selectedIndex);
    } else if (diff > threshold && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (diff < -threshold && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Don't render if no images or still loading
  if (loading) {
    return null;
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className='product-in-use-gallery py-8 md:py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>{title}</h2>

        <div id='product-in-use-gallery' ref={containerRef}>
          {/* Hidden links for PhotoSwipe - single source of truth */}
          <div className='hidden'>
            {images.map((image) => (
              <a
                key={image.id}
                href={image.imageUrl}
                data-pswp-width={1200}
                data-pswp-height={1200}
                className='gallery-item'
              >
                Product in use
              </a>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className='hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {images.map((image, index) => (
              <button
                key={image.id}
                className='block aspect-square relative overflow-hidden rounded-lg cursor-zoom-in group'
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={`${image.imageUrl}&width=600`}
                  alt='Product in use'
                  fill
                  sizes='(max-width: 1024px) 50vw, 20vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </button>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className='md:hidden'>
            <div
              className='relative aspect-square overflow-hidden rounded-lg cursor-zoom-in'
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={`${images[selectedIndex].imageUrl}&width=800`}
                alt='Product in use'
                fill
                className='object-cover pointer-events-none'
                onClick={() => openLightbox(selectedIndex)}
              />
            </div>

            {/* Mobile dots */}
            {images.length > 1 && (
              <div className='flex justify-center gap-2 mt-4'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === selectedIndex ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
