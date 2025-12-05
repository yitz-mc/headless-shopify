'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import content from '@/content/featured-in.json';

import 'swiper/css';

export function FeaturedIn() {
  return (
    <section
      className='featured-in-section py-8 md:py-12'
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className='container mx-auto px-4'>
        {/* Desktop - Row of logos */}
        <div className='hidden md:flex items-center justify-center gap-5'>
          <p className='text-base m-0'>Featured in:</p>
          <div className='flex items-center justify-around gap-5 w-3/4'>
            {content.logos.map((logo) => (
              <div key={logo.id} className='relative h-8'>
                <Image
                  src={logo.image}
                  alt={logo.alt}
                  width={150}
                  height={32}
                  className='h-8 w-auto object-contain'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile - Swiper carousel */}
        <div className='md:hidden'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2.2}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className='featured-in-swiper'
          >
            {content.logos.map((logo) => (
              <SwiperSlide key={logo.id}>
                <div className='flex justify-center py-4'>
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={150}
                    height={30}
                    className='h-[30px] w-auto object-contain'
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
