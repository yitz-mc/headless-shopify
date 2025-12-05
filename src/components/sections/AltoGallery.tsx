'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import data from '@/content/alto-gallery.json';

interface GalleryImage {
  id: string;
  url: string;
}

export function AltoGallery() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { title, backgroundColor, images } = data as {
    title: string;
    backgroundColor: string;
    images: GalleryImage[];
  };

  const openLightbox = useCallback((imageUrl: string) => {
    setLightboxImage(imageUrl);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  }, []);

  const handleSwiperInit = useCallback((swiperInstance: SwiperType) => {
    setSwiper(swiperInstance);
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage === null) return;
      if (e.key === 'Escape') closeLightbox();
    };

    if (lightboxImage !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxImage, closeLightbox]);

  return (
    <section
      className="alto-gallery py-[50px] md:py-[75px]"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        {/* Heading with Navigation Arrows */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
            className={`absolute left-0 w-[25px] h-[25px] rounded-full border border-black flex items-center justify-center transition-colors cursor-pointer ${isBeginning ? 'opacity-40' : 'hover:bg-gray-100'}`}
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>

          <h2 className="text-[28px] md:text-[44px] font-medium m-0">{title}</h2>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
            className={`absolute right-0 w-[25px] h-[25px] rounded-full border border-black flex items-center justify-center transition-colors cursor-pointer ${isEnd ? 'opacity-40' : 'hover:bg-gray-100'}`}
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Gallery Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1.5}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <button
                  className="relative w-full aspect-square rounded-[15px] overflow-hidden cursor-pointer group block"
                  onClick={() => openLightbox(image.url)}
                >
                  <Image
                    src={image.url}
                    alt="Customer closet"
                    fill
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
                    className="object-cover"
                  />
                  {/* Hover plus icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-[66px] h-[66px] rounded-full border-[3px] border-black bg-white/50 flex items-center justify-center">
                      <Plus size={32} strokeWidth={3} />
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-8 text-white hover:opacity-70 z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={40} />
          </button>
          <div className="relative max-w-[80vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage}
              alt="Customer closet"
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
