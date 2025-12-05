'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import contentData from '@/content/vista-alto-cards.json';
import { resolveRoute } from '@/lib/routes';

interface CardConfig {
  id: string;
  backgroundColor: string;
  title: string;
  sticker: string;
  route: string;
  buttonText: string;
  image: string;
  imageMobile: string;
  listHeading: string;
  listItems: string[];
  listIcon: string;
}

interface VistaAltoCardsProps {
  variant: 'homepage' | 'chooseCategory' | 'otherSpaces';
}

function VistaAltoCard({ card, showButton = true }: { card: CardConfig; showButton?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={resolveRoute(card.route)}
      className='vista-alto-card group block rounded-2xl p-3 md:p-5 w-full md:flex-1 transition-all duration-200'
      style={{
        backgroundColor: isHovered ? '#DAEEFC' : card.backgroundColor,
        border: isHovered ? '4px solid #2773aa' : '4px solid transparent',
        boxShadow: isHovered ? '0px 10px 20px rgba(0, 0, 0, 0.15)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Top */}
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-4 flex-col md:flex-row md:items-center'>
          <h3 className='text-xl md:text-2xl font-medium capitalize'>{card.title}</h3>
          {card.sticker && (
            <Image
              src={card.sticker}
              alt=''
              width={100}
              height={23}
              className='h-[23px] w-auto hidden md:block'
            />
          )}
        </div>
        {showButton && (
          <span
            className='px-4 py-2 rounded-full text-sm font-medium hidden md:block text-white transition-colors'
            style={{
              backgroundColor: isHovered ? '#4072A5' : '#2b87c9',
            }}
          >
            {card.buttonText}
          </span>
        )}
      </div>

      {/* Card Image */}
      <div className='vista-alto-card-image relative w-full aspect-[4/3]'>
        <Image src={card.image} alt={card.title} fill className='object-contain hidden md:block' />
        <Image src={card.imageMobile} alt={card.title} fill className='object-contain md:hidden' />
      </div>

      {/* Card List */}
      <div className='vista-alto-card-list mt-4'>
        {card.listHeading && (
          <p className='text-base md:text-lg font-medium mb-2'>{card.listHeading}</p>
        )}
        {card.listItems.length > 0 && (
          <ul className='pl-6 space-y-2'>
            {card.listItems.map((item, index) => (
              <li
                key={index}
                className='text-[#2773aa] text-base md:text-lg font-medium'
                style={{ listStyleImage: `url('${card.listIcon}')` }}
              >
                <span className='pl-2'>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

export function VistaAltoCards({ variant }: VistaAltoCardsProps) {
  const content = contentData[variant];
  const isThreeCards = content.cards.length === 3;
  const headingSize = 'headingSize' in content ? content.headingSize : 86;

  return (
    <section className={`vista-alto-section ${isThreeCards ? 'pt-0 pb-12 md:pb-16' : 'py-12 md:py-16'}`}>
      <div className='container mx-auto px-4'>
        {/* Heading */}
        {(content.heading || content.description) && (
          <div className='flex flex-col items-center pb-8 md:pb-12'>
            {content.heading && (
              <h2
                className='heading-druk font-medium tracking-wider my-6 md:my-10 text-center leading-[0.9]'
                style={{
                  fontSize: `clamp(38px, 8vw, ${headingSize}px)`,
                }}
              >
                {content.heading}
              </h2>
            )}
            {content.description && (
              <p className='text-base md:text-lg text-center w-[90%] md:w-[65%] lg:w-[40%] m-0'>
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
          {content.cards.map((card) => (
            <VistaAltoCard key={card.id} card={card} showButton={!isThreeCards} />
          ))}
        </div>

        {/* Compare Button */}
        {'compareButton' in content && content.compareButton && (
          <div className='flex justify-center mt-12'>
            <Link
              href={resolveRoute(content.compareButton.route)}
              className='px-8 py-3 rounded-full text-white font-medium transition-colors bg-[#F27662] hover:bg-[#E56A54]'
            >
              {content.compareButton.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
