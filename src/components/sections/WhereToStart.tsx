'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import content from '@/content/where-to-start.json';

interface CardConfig {
  id: string;
  backgroundColor: string;
  textColor: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  buttonColor: string;
  buttonHoverColor: string;
  buttonTextColor: string;
  buttonTextHoverColor: string;
  hideMobile?: boolean;
  width?: number;
  height?: number;
}

function WhereToStartCard({ card }: { card: CardConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={card.buttonUrl}
      className="where-card flex flex-col items-center p-6 md:p-10 rounded-2xl w-full transition-shadow hover:shadow-xl"
      style={{ backgroundColor: card.backgroundColor }}
    >
      {/* Icon */}
      <div
        className="relative"
        style={{
          width: card.width ? `${card.width}px` : '160px',
          height: card.height ? `${card.height}px` : (card.width ? `${card.width}px` : '160px'),
        }}
      >
        <Image
          src={card.image}
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className="text-2xl md:text-4xl font-medium text-center mt-4 leading-none"
        style={{ color: card.textColor }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm md:text-lg text-center w-full md:w-[85%] mt-2"
        style={{ color: card.textColor }}
      >
        {card.description}
      </p>

      {/* Button */}
      <button
        className="mc-btn flex items-center px-6 py-3 rounded-full font-medium transition-colors mt-4"
        style={{
          backgroundColor: isHovered ? card.buttonHoverColor : card.buttonColor,
          color: isHovered ? card.buttonTextHoverColor : card.buttonTextColor,
          borderWidth: '2px',
          borderColor: isHovered ? card.buttonHoverColor : card.buttonColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {card.buttonText}
      </button>
    </Link>
  );
}

export function WhereToStart() {
  return (
    <div
      className="where-section-wrapper py-12 md:py-16"
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        {content.showHeading && (
          <div className="where-top-text-wrapper flex flex-col items-center pb-8 md:pb-12">
            <h2 className="text-5xl md:text-7xl lg:text-[86px] font-medium tracking-wide my-6 md:my-10 text-center leading-[0.88]">
              {content.heading}
            </h2>
            <p className="text-base md:text-lg text-center w-[90%] md:w-[65%] lg:w-[48%] m-0">
              {content.description}
            </p>
          </div>
        )}

        {/* Cards - Horizontal scroll on mobile */}
        <div className="where-card-wrapper flex overflow-x-auto md:overflow-visible gap-4 md:gap-12 lg:gap-16 md:justify-center pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {content.cards.map((card) => (
            <div key={card.id} className="flex-shrink-0 w-[85%] md:w-auto md:flex-shrink snap-center">
              <WhereToStartCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
