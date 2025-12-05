'use client';

import Image from 'next/image';
import content from '@/content/go-modular.json';

function CheckIcon() {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 53 53'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='fill-[#ed7363]'
    >
      <path d='M46.3744 15.4584L19.8743 41.9584L7.72852 29.8125L10.8423 26.6988L19.8743 35.7088L43.2606 12.3446L46.3744 15.4584Z' />
    </svg>
  );
}

export function GoModular() {
  return (
    <section className='go-modular bg-white md:py-[50px]'>
      <div className='go-modular-wrapper container mx-auto px-4 py-16 md:py-0 bg-[#F7F5F3] md:bg-transparent'>
        {/* Heading */}
        <div className='text-center mb-6 md:mb-12'>
          <p className='text-[26px] leading-[28px] md:text-5xl md:leading-[48px] font-normal text-[#ed7363] m-0'>
            <span className='hidden md:inline'>{content.heading}</span>
            <span className='md:hidden'>{content.headingMobile}</span>
          </p>
        </div>

        {/* Body - two columns on desktop, reversed on mobile */}
        <div className='flex flex-col-reverse md:flex-row gap-4 md:gap-10 justify-center'>
          {/* Left Column - Cards and Colors */}
          <div className='flex flex-col justify-around md:items-center'>
            {/* Cards */}
            <div className='grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-0 w-full'>
              {content.cards.map((card) => (
                <div
                  key={card.id}
                  className='flex items-center md:items-start gap-2 md:gap-4 bg-white md:bg-transparent rounded-2xl p-2 md:p-4 md:m-4'
                >
                  <div className='mt-0 md:mt-1 flex-shrink-0'>
                    <CheckIcon />
                  </div>
                  <div className='text-left md:py-2 md:px-5'>
                    <div className='font-medium text-sm md:text-[17px] leading-tight md:leading-[19px]'>
                      {card.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Options */}
            <div className='flex flex-col gap-2 bg-white rounded-3xl p-4 md:p-6 max-w-[350px] mx-auto mt-4'>
              <div className='text-center'>
                <span className='text-xs md:text-sm'>Available in 3 classic colors</span>
              </div>
              <div className='flex gap-4 justify-center'>
                {content.colors.map((color) => (
                  <div key={color.id} className='text-center'>
                    <Image
                      src={color.image}
                      alt={color.name}
                      width={84}
                      height={40}
                      className='h-8 md:h-10 w-auto object-contain'
                    />
                    <div className='text-[10px] mt-1'>{color.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className='w-full md:w-[60%] mx-auto'>
            <video
              src={content.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className='w-full rounded-2xl'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
