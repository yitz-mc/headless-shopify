'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/shopify';

interface GalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  tags: string[];
}

function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];
  if (!image) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className='absolute top-4 right-4 text-white text-4xl hover:opacity-70 z-10'
        onClick={onClose}
        aria-label='Close'
      >
        ×
      </button>

      {/* Previous button */}
      <button
        className='absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:opacity-70 z-10 px-4 py-2'
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label='Previous'
      >
        ‹
      </button>

      {/* Image container */}
      <div className='relative max-w-[90vw] max-h-[90vh]' onClick={(e) => e.stopPropagation()}>
        <Image
          src={image.full}
          alt={image.altText}
          width={image.width}
          height={image.height}
          className='max-h-[90vh] w-auto object-contain'
          priority
        />
      </div>

      {/* Next button */}
      <button
        className='absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:opacity-70 z-10 px-4 py-2'
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label='Next'
      >
        ›
      </button>

      {/* Image counter */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm'>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export function Gallery({ title, subtitle, images, tags }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on active tag
  const filteredImages = activeFilter
    ? images.filter((img) => img.tags.includes(activeFilter))
    : images;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : filteredImages.length - 1;
    });
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < filteredImages.length - 1 ? prev + 1 : 0;
    });
  }, [filteredImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  return (
    <section className='gallery-section py-8 md:py-12'>
      <div className='container mx-auto px-4'>
        {/* Title */}
        {(title || subtitle) && (
          <div className='flex flex-col items-center gap-2 pt-8 md:pt-12'>
            {title && <h1 className='text-2xl md:text-4xl font-medium text-center m-0'>{title}</h1>}
            {subtitle && (
              <p className='text-base md:text-lg text-center opacity-70 m-0 hidden md:block'>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Filters */}
        {tags.length > 0 && (
          <div className='flex justify-center gap-2 md:gap-4 mt-4 md:mt-8 flex-wrap'>
            <button
              className={`px-3 py-1 md:px-5 md:py-2 rounded-full md:rounded-[100px] text-sm md:text-base capitalize transition-colors ${
                activeFilter === '' ? 'bg-[#F27662] text-white' : 'bg-[#f2f1f0] hover:bg-[#adadac]'
              }`}
              onClick={() => setActiveFilter('')}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 md:px-5 md:py-2 rounded-full md:rounded-[100px] text-sm md:text-base capitalize transition-colors ${
                  activeFilter === tag
                    ? 'bg-[#F27662] text-white'
                    : 'bg-[#f2f1f0] hover:bg-[#adadac]'
                }`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid - Masonry Layout */}
        <div className='gallery-grid columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-5 pt-8 md:pt-12'>
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              className='gallery-item block mb-2 md:mb-4 w-full break-inside-avoid cursor-pointer border-0 bg-transparent p-0'
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.small}
                alt={image.altText}
                width={image.width}
                height={image.height}
                className='w-full h-auto rounded-[5px] transition-opacity hover:opacity-90'
                loading='lazy'
              />
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className='text-center py-12 text-gray-500'>No images found for this filter.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </section>
  );
}
