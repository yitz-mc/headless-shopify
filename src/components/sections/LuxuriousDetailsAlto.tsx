'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import data from '@/content/luxurious-details-alto.json';

export function LuxuriousDetailsAlto() {
  const { backgroundColor, title, description, button1Text, button1Url, button2Text, button2Url, cards } = data;

  return (
    <section className="lux-section-wrapper py-[50px] pb-[75px] md:pb-[75px]" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Text Content */}
          <div className="lux-text-wrapper w-full md:w-[40%] flex flex-col justify-center md:pr-[66px]">
            <h2
              className="font-favorit text-[28px] md:text-[42px] leading-none font-semibold mb-0 md:mb-4"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="lux-description text-[14px] md:text-[18px] [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Buttons */}
            {button1Text && (
              <div className="buttons-wrapper flex items-center gap-[15px] mt-5">
                <Link
                  href={button1Url}
                  className="mc-btn btn-primary w-[200px] text-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors"
                >
                  {button1Text}
                </Link>
                {button2Text && (
                  <Link
                    href={button2Url}
                    className="mc-btn btn-outline-primary w-[200px] text-center py-3 px-6 rounded-full border border-[#F27662] text-[#F27662] font-medium hover:border-[#C95B48] hover:text-[#C95B48] transition-colors"
                  >
                    {button2Text}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden w-full mb-4">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2.5}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="lux-swiper pb-5"
            >
              {cards.map((card) => (
                <SwiperSlide key={card.id}>
                  <div className="lux-image bg-white p-[15px] rounded-[15px] flex flex-col gap-2">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={200}
                      height={170}
                      className="w-full h-auto object-cover rounded-[10px]"
                      unoptimized
                    />
                    <p className="text-[12px] font-medium leading-none m-0">{card.title}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="lux-image-wrapper hidden md:grid w-[52%] grid-cols-3 gap-5">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="lux-image mx-auto p-[15px] bg-white rounded-[15px]"
                style={{
                  transform: index >= 3 ? 'translateX(33.33%)' : undefined,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={200}
                  height={170}
                  className="w-full h-[170px] object-cover rounded-[10px]"
                  unoptimized
                />
                <p className="text-[18px] font-medium leading-none mt-[5px] mb-0">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
