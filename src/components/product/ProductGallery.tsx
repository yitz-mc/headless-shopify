'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'swiper/css';
import 'photoswipe/style.css';

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize PhotoSwipe
  useEffect(() => {
    if (images.length === 0) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#product-gallery',
      children: 'a.pswp-item',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.95,
      showHideAnimationType: 'zoom',
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 2,
      maxZoomLevel: 4,
      tapAction: 'close',
      spacing: 0.1,
      allowPanToNext: true,
      loop: true,
      arrowPrev: true,
      arrowNext: true,
      zoom: true,
      close: true,
      counter: true,
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [images]);

  // Open lightbox at specific index
  const openLightbox = useCallback((index: number) => {
    if (lightboxRef.current) {
      lightboxRef.current.loadAndOpen(index);
    }
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  if (images.length === 0) {
    return (
      <div className='aspect-square bg-gray-100 flex items-center justify-center'>
        <span className='text-gray-400'>No image available</span>
      </div>
    );
  }

  return (
    <div className='product-media max-w-[750px] ml-auto' id='product-gallery'>
      {/* Hidden links for PhotoSwipe */}
      <div className='hidden'>
        {images.map((image, index) => (
          <a
            key={image.id}
            href={image.url}
            data-pswp-width={image.width || 1200}
            data-pswp-height={image.height || 1200}
            className='pswp-item'
            target='_blank'
            rel='noreferrer'
          >
            {image.altText || `${productTitle} ${index + 1}`}
          </a>
        ))}
      </div>

      {/* Main Image Swiper */}
      <div className='product-media__images mb-4'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          className='aspect-square bg-white rounded-lg'
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div
                className='relative w-full h-full cursor-pointer'
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.url}
                  alt={image.altText || productTitle}
                  fill
                  sizes='(max-width: 768px) 100vw, 600px'
                  className='object-contain'
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots - Mobile only */}
        {images.length > 1 && (
          <div className='flex justify-center gap-2 mt-4 md:hidden'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails - Hidden on mobile */}
      {images.length > 1 && (
        <div className='product-media__thumbnails hidden md:block'>
          <Swiper
            spaceBetween={12}
            slidesPerView='auto'
            watchSlidesProgress
            className='thumbnails-swiper'
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id} style={{ width: 'auto' }}>
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className='block'
                  aria-label={`Show image ${index + 1}`}
                >
                  <div className='relative w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-lg border border-gray-300 hover:border-gray-400 overflow-hidden transition-all'>
                    <Image
                      src={image.url}
                      alt={image.altText || `${productTitle} thumbnail ${index + 1}`}
                      fill
                      sizes='110px'
                      className='object-contain'
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <style jsx global>{`
        .thumbnails-swiper .swiper-slide {
          width: auto !important;
        }
      `}</style>
    </div>
  );
}
