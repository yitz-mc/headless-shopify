'use client';

import Image from 'next/image';
import content from '@/content/pro-hero.json';

export function ProHero() {
  return (
    <section
      className="pro-hero pt-[25px] pb-0 md:pt-[70px] md:pb-[70px]"
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] items-center">
          {/* Left Column - Text and Cards (45%) */}
          <div className="w-full md:w-[45%]">
            {/* Heading - Druk font style */}
            <h1 className="heading-druk text-[50px] leading-[1.1] md:text-[90px] md:leading-[90%] md:max-w-[430px] text-center md:text-left m-0">
              {content.heading}
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-xl text-center md:text-left my-4">
              {content.subheading}
            </p>

            {/* Trustpilot Bar */}
            {content.trustpilot.show && (
              <div
                className="flex items-center justify-between gap-5 bg-white rounded-full px-6 py-2 w-fit mx-auto md:mx-0"
              >
                <p className="text-sm md:text-base m-0">{content.trustpilot.text}</p>
                <Image
                  src={content.trustpilot.starsImage}
                  alt="5 stars"
                  width={120}
                  height={22}
                  className="h-[22px] w-auto"
                />
              </div>
            )}

            {/* Icon Cards Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-[10px] mt-[30px]">
              {content.cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-[15px] bg-white rounded-[20px] p-[15px] md:p-5"
                >
                  <Image
                    src={card.icon}
                    alt={card.text}
                    width={42}
                    height={42}
                    className="w-[30px] h-[30px] md:w-[42px] md:h-[42px] object-contain flex-shrink-0"
                  />
                  <span className="text-sm md:text-base m-0">{card.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image (55%) */}
          <div className="w-full md:w-[55%] mt-5 md:mt-0">
            <Image
              src={content.image}
              alt="Walk-in closet"
              width={800}
              height={600}
              className="w-full h-auto rounded-[15px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
