'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import content from '@/content/as-seen-on.json';

import 'swiper/css';

export function AsSeenOn() {
  return (
    <section
      className="as-seen-on-section py-8 md:py-12"
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className="container mx-auto px-4">
        {/* Desktop - Row of logos */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <p className="text-base font-medium m-0">{content.heading}</p>
          <div className="flex items-center justify-around gap-8 flex-1 max-w-4xl opacity-50">
            {content.logos.map((logo) => (
              <div key={logo.id} className="relative h-8">
                <Image
                  src={logo.image}
                  alt={logo.alt}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile - Swiper carousel */}
        <div className="md:hidden">
          <p className="text-center text-base font-medium mb-4">{content.heading}</p>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2.5}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="as-seen-on-swiper"
          >
            {content.logos.map((logo) => (
              <SwiperSlide key={logo.id}>
                <div className="flex justify-center py-4 opacity-50">
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={100}
                    height={30}
                    className="h-[30px] w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
