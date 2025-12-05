'use client';

import { useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { CustomerCloset } from '@/lib/shopify';
import { routes } from '@/lib/routes';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CustomerClosetsProps {
  closets: CustomerCloset[];
}

function ClosetCard({ closet }: { closet: CustomerCloset }) {
  return (
    <div className='customer-closet-card'>
      {/* Media */}
      <div className='relative'>
        {closet.youtubeUrl ? (
          <iframe
            className='w-full h-[250px] md:h-[300px] rounded-2xl md:rounded-[40px]'
            src={closet.youtubeUrl.replace('watch?v=', 'embed/') + '?controls=0'}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        ) : closet.media?.type === 'video' ? (
          <video
            className='w-full h-[250px] md:h-[300px] rounded-2xl md:rounded-[40px] object-cover'
            src={closet.media.url}
            poster={closet.media.previewImage}
            controls
          />
        ) : closet.media?.type === 'image' ? (
          <div className='relative h-[250px] md:h-[330px] rounded-2xl overflow-hidden'>
            <Image
              src={closet.media.url}
              alt={closet.media.altText || closet.customerName}
              fill
              className='object-cover'
            />
          </div>
        ) : null}
      </div>

      {/* Info - Desktop */}
      <div className='hidden md:block mt-4'>
        <p className='text-[#2773aa] text-lg font-medium'>{closet.customerName}</p>
        <div className='flex justify-between mt-2'>
          {closet.closetMeasurements && (
            <div className='flex-1'>
              <div className='h-px bg-[#707070] mb-1' />
              <div className='text-[11px] text-[#707070] font-bold uppercase'>Closet Size</div>
              <div className='text-sm'>{closet.closetMeasurements}</div>
            </div>
          )}
          {closet.totalCost && (
            <div className='flex-1'>
              <div className='h-px bg-[#707070] mb-1' />
              <div className='text-[11px] text-[#707070] font-bold uppercase'>Total Cost</div>
              <div className='text-sm'>{closet.totalCost}</div>
            </div>
          )}
          {closet.turnaroundTime && (
            <div className='flex-1'>
              <div className='h-px bg-[#707070] mb-1' />
              <div className='text-[11px] text-[#707070] font-bold uppercase'>Turnaround Time</div>
              <div className='text-sm'>{closet.turnaroundTime}</div>
            </div>
          )}
        </div>
      </div>

      {/* Info - Mobile */}
      <div className='md:hidden mt-4 bg-white rounded-b-2xl p-3 -mt-6 relative z-10'>
        <p className='text-[#2773aa] text-base font-medium'>{closet.customerName}</p>
        <div className='h-px bg-gray-200 my-2' />
        <div className='flex items-center gap-2 text-sm'>
          {closet.closetMeasurements && <span>{closet.closetMeasurements}</span>}
          {closet.closetMeasurements && closet.totalCost && <span>|</span>}
          {closet.totalCost && <span>{closet.totalCost}</span>}
          {closet.totalCost && closet.turnaroundTime && <span>|</span>}
          {closet.turnaroundTime && <span>{closet.turnaroundTime}</span>}
        </div>
      </div>
    </div>
  );
}

export function CustomerClosets({ closets }: CustomerClosetsProps) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  if (!closets.length) return null;

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className='customer-closets-section py-16 md:py-20 bg-white'>
      {/* Desktop Layout */}
      <div className='hidden md:block relative'>
        {/* Header - centered */}
        <h2 className='text-center text-[44px] font-medium mb-[30px]'>Real Customer Closets</h2>

        {/* Carousel container with navigation */}
        <div className='relative px-4'>
          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className={`absolute -top-[52px] left-4 z-10 w-[25px] h-[25px] rounded-full border border-black flex items-center justify-center transition-opacity ${isBeginning ? 'opacity-40 cursor-default' : 'opacity-100 hover:opacity-70 cursor-pointer'}`}
            disabled={isBeginning}
          >
            <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
              <path d='M7 2L4 5.5L7 9' stroke='black' strokeWidth='1' />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={`absolute -top-[52px] right-4 z-10 w-[25px] h-[25px] rounded-full border border-black flex items-center justify-center transition-opacity ${isEnd ? 'opacity-40 cursor-default' : 'opacity-100 hover:opacity-70 cursor-pointer'}`}
            disabled={isEnd}
          >
            <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
              <path d='M4 2L7 5.5L4 9' stroke='black' strokeWidth='1' />
            </svg>
          </button>

          {/* Desktop Swiper */}
          <Swiper
            modules={[Navigation]}
            onSwiper={setSwiperInstance}
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            slidesPerView={4}
            spaceBetween={35}
            centeredSlides
            centeredSlidesBounds
            initialSlide={Math.floor(closets.length / 2)}
            breakpoints={{
              800: { slidesPerView: 2, spaceBetween: 15 },
              1100: { slidesPerView: 3.5, spaceBetween: 20 },
              1400: { slidesPerView: 4, spaceBetween: 35 },
            }}
            className='customer-closets-swiper-desktop'
          >
            {closets.map((closet) => (
              <SwiperSlide key={closet.id}>
                <ClosetCard closet={closet} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden'>
        <h2 className='text-center text-3xl font-medium mb-4 px-4'>Real Customer Closets</h2>
        <div className='px-4'>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={15}
            centeredSlides
            className='customer-closets-swiper-mobile'
            style={{ overflow: 'visible', paddingBottom: '40px' }}
          >
            {closets.map((closet) => (
              <SwiperSlide key={closet.id}>
                <ClosetCard closet={closet} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 mt-10 px-4'>
        <Link
          href={`${routes.designQuiz}?utm_referlclick=hp_realcust_cta`}
          className='w-[180px] text-center px-5 py-2 rounded-full bg-[#ed7363] text-white border border-[#ed7363] hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          Free Closet Design
        </Link>
        <Link
          href={routes.designTool}
          className='hidden md:block w-[180px] text-center px-5 py-2 rounded-full bg-white text-[#ed7363] border border-[#ed7363] hover:text-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          3D Design Tool
        </Link>
      </div>
    </section>
  );
}
