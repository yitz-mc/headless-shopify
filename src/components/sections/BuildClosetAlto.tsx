'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import data from '@/content/build-closet-alto.json';
import { AltoProductCard } from '@/components/product';
import { resolveRoute } from '@/lib/routes';
import type { ProductCard } from '@/types';

interface BuildClosetAltoProps {
  products?: ProductCard[];
}

export function BuildClosetAlto({ products = [] }: BuildClosetAltoProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const {
    bannerBackgroundColor,
    bannerTitle,
    bannerDescription,
    bannerImage,
    linkText,
    linkRoute,
    hotspots,
  } = data;

  return (
    <section className="build-alto-section-wrapper py-[50px] md:py-[75px] pb-[30px] md:pb-[75px]">
      <div className="container mx-auto px-4">
        {/* Components Banner */}
        <div
          className="components-banner flex flex-col md:flex-row rounded-[15px] my-[50px]"
          style={{ backgroundColor: bannerBackgroundColor }}
        >
          {/* Left - Text */}
          <div className="components-banner-left p-[30px] md:p-[50px] w-[250px] md:w-[40%]">
            <p className="title text-[18px] md:text-[28px] lg:text-[36px] text-white leading-none m-0 font-medium">
              {bannerTitle}
            </p>
            <p className="description hidden md:block text-[16px] text-white w-[250px] mt-4">
              {bannerDescription}
            </p>
          </div>

          {/* Right - Image with Hotspots */}
          <div className="components-banner-right relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerImage}
              alt={bannerTitle}
              width="100%"
              height="100%"
              className="object-contain rounded-b-[15px] md:rounded-bl-none md:rounded-r-[15px]"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="components-banner-btn-pulse absolute cursor-pointer"
                style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pulsating Ring */}
                <span className="components-banner-ring block absolute w-[24px] h-[24px] -top-[12px] -left-[12px] rounded-full border-[4px] border-[#B5E1FA] animate-pulse-ring z-[5]" />
                {/* Circle Button */}
                <span
                  className={`components-banner-circle absolute w-[18px] h-[18px] -top-[9px] -left-[9px] rounded-full z-[5] transition-all ${
                    activeHotspot === hotspot.id ? 'bg-[#0074AE] opacity-80' : 'bg-white'
                  }`}
                />
                {/* Tooltip */}
                {activeHotspot === hotspot.id && (
                  <div className="absolute top-[20px] -left-[125px] md:left-[10px] rounded-[10px] p-[20px] w-[250px] bg-white z-[100] shadow-lg">
                    <span className="text-[#2773AA] font-medium text-[16px]">{hotspot.title}</span>
                    <br />
                    <span className="text-[14px]">{hotspot.description}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Carousel */}
        {products.length > 0 && (
          <div className="build-alto-collection-wrapper">
            <Swiper
              spaceBetween={30}
              slidesPerView={1.5}
              slidesPerGroup={1}
              onSwiper={setSwiper}
              breakpoints={{
                600: { slidesPerView: 2.2, slidesPerGroup: 1 },
                800: { slidesPerView: 2.4, slidesPerGroup: 1 },
                1024: { slidesPerView: 3.5, slidesPerGroup: 1 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <AltoProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-[10px] mt-3">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                className="w-[30px] h-[30px] rounded-full border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                className="w-[30px] h-[30px] rounded-full border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Link */}
      <div className="alto-kits-link-wrapper mt-[30px]">
        <Link
          href={resolveRoute(linkRoute)}
          className="flex justify-center gap-[10px] text-[20px] items-center no-underline hover:underline"
        >
          {linkText}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
