'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import type { TrustpilotReview } from '@/types';
import 'swiper/css';
import 'swiper/css/pagination';
import content from '@/content/crazy-easy.json';

interface CrazyEasyProps {
  reviews?: TrustpilotReview[];
}

// Trustpilot star image
const STARS_IMAGE = 'https://www.modularclosets.com/cdn/shop/files/5_stars.svg';

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    return 'Today';
  } else if (diffInDays === 1) {
    return '1 day ago';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 14) {
    return '1 week ago';
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} weeks ago`;
  } else if (diffInDays < 60) {
    return '1 month ago';
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} months ago`;
  } else if (diffInDays < 730) {
    return '1 year ago';
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} years ago`;
  }
}

function ReviewCard({ review }: { review: TrustpilotReview }) {
  return (
    <div className='ce-review bg-white rounded-[15px] p-8 md:p-[35px] flex flex-col justify-between h-full'>
      <div className='flex flex-col gap-3 md:gap-3'>
        <div className='flex justify-between items-start gap-2'>
          <Image
            src={STARS_IMAGE}
            alt='5 stars'
            width={120}
            height={22}
            className='w-[120px] md:w-[120px] h-auto'
          />
          <span className='hidden md:block text-sm opacity-30 whitespace-nowrap'>
            {formatRelativeDate(review.experiencedAt)}
          </span>
        </div>
        <h3 className='font-bold text-md md:text-[26px] leading-tight line-clamp-1 mt-2 md:mt-4'>
          {review.title}
        </h3>
        <div className='text-sm md:text-base'>
          <p className='line-clamp-3'>{review.text}</p>
          <Link
            href={content.trustpilotReviewsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:opacity-70'
          >
            Read more
          </Link>
        </div>
      </div>
      <p className='font-bold opacity-40 text-sm md:text-sm mt-4 md:mt-3'>{review.displayName}</p>
    </div>
  );
}

export function CrazyEasy({ reviews = [] }: CrazyEasyProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const displayReviews = reviews
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .slice(0, 5);
  const totalSlides = displayReviews.length || 5;

  const handleSwiperInit = useCallback((swiperInstance: SwiperType) => {
    setSwiper(swiperInstance);
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
    setCurrentSlide(swiperInstance.activeIndex + 1);
  }, []);

  const handleSlideChange = useCallback((swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
    setCurrentSlide(swiperInstance.activeIndex + 1);
  }, []);

  return (
    <section className='crazy-easy bg-[#F2F1F0] py-16 md:py-[100px]'>
      <div className='container mx-auto px-8'>
        <div className='crazy-easy-top flex flex-col md:flex-row md:justify-between gap-6 md:gap-[10px]'>
          {/* Left Column - Text Content */}
          <div className='ce-text-column flex flex-col gap-6 md:gap-0 md:justify-between md:w-[45%] md:max-w-[540px]'>
            {/* Heading Section */}
            <div className='flex flex-col gap-4 md:gap-[30px]'>
              <p className='text-sm md:text-base font-bold opacity-40 tracking-[0.05em]'>
                {content.subheading}
              </p>
              <h2 className='text-[26px] md:text-[48px] leading-tight md:leading-[50px] font-medium w-full md:w-[540px] md:min-w-[65%]'>
                {content.heading}
              </h2>
            </div>

            {/* Mobile Image */}
            <div className='md:hidden'>
              <Image
                src={content.image}
                alt='Assembly'
                width={600}
                height={400}
                className='w-full rounded-[20px]'
              />
            </div>

            {/* Description Section */}
            <div className='ce-description-wrapper flex flex-col gap-[18px]'>
              {/* Mobile: percentage + description in row */}
              <div className='ce-description-row flex items-center gap-[18px] md:hidden'>
                <span className="ce-percentage font-['Druk',_Helvetica,_Arial,_sans-serif] text-[80px] leading-[90px] text-[#2773aa]">
                  {content.percentage}
                </span>
                <p className='ce-description text-base leading-snug w-[50%]'>
                  {content.description}
                </p>
              </div>
              {/* Desktop: everything stacked */}
              <span className="ce-percentage font-['Druk',_Helvetica,_Arial,_sans-serif] text-[200px] leading-[200px] text-[#2773aa] hidden md:block">
                {content.percentage}
              </span>
              <p className='ce-description text-lg w-[330px] min-w-[45%] leading-snug hidden md:block'>
                {content.description}
              </p>
              <p className='ce-subdescription text-base md:text-lg opacity-40'>
                {content.subdescription}
              </p>
            </div>
          </div>

          {/* Right Column - Image with Review Card (Desktop) */}
          <div className='hidden md:block ce-image-column relative flex-1 min-w-0'>
            <Image
              src={content.image}
              alt='Assembly'
              width={800}
              height={700}
              className='w-full h-auto rounded-[10px]'
            />

            {/* Review Card Overlay - positioned to extend past image */}
            {displayReviews.length > 0 && (
              <div className='absolute right-[-60px] bottom-[-15px] w-[70%] h-[58%]'>
                <Swiper
                  modules={[]}
                  slidesPerView={1}
                  onSwiper={handleSwiperInit}
                  onSlideChange={handleSlideChange}
                  className='h-full'
                >
                  {displayReviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <ReviewCard review={review} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Navigation - under image, left side */}
            {displayReviews.length > 0 && (
              <div className='flex items-center justify-between w-[40%] mt-6'>
                <span className='text-lg opacity-40'>
                  {currentSlide} of {totalSlides}
                </span>
                <div className='flex border-[1.5px] border-black rounded-full h-[38px] w-[62px] mr-5'>
                  <button
                    type='button'
                    onClick={() => swiper?.slidePrev()}
                    disabled={isBeginning}
                    className={`flex-1 flex items-center justify-center ${
                      isBeginning ? 'opacity-30' : 'cursor-pointer'
                    }`}
                    aria-label='Previous review'
                  >
                    <ChevronLeft size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    type='button'
                    onClick={() => swiper?.slideNext()}
                    disabled={isEnd}
                    className={`flex-1 flex items-center justify-center ${
                      isEnd ? 'opacity-30' : 'cursor-pointer'
                    }`}
                    aria-label='Next review'
                  >
                    <ChevronRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Reviews Slider */}
        {displayReviews.length > 0 && (
          <div className='md:hidden mt-8'>
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet !w-[9px] !h-[9px] !mx-1 !bg-[#DBD6D1] !opacity-100',
                bulletActiveClass: '!bg-[#9A9A9A]',
              }}
              className='ce-reviews-mobile'
            >
              {displayReviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className='px-1 pb-10'>
                    <ReviewCard review={review} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
