'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import heroContent from '@/content/hero.json';
import { resolveRoute } from '@/lib/routes';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (heroContent.code?.value) {
      await navigator.clipboard.writeText(heroContent.code.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const primaryHref = heroContent.buttons.primary.route
    ? resolveRoute(heroContent.buttons.primary.route)
    : '/';
  const secondaryHref = heroContent.buttons.secondary.route
    ? resolveRoute(heroContent.buttons.secondary.route)
    : '/';

  return (
    <section
      className='flex flex-col-reverse md:flex-row'
      style={{ backgroundColor: heroContent.backgroundColor }}
    >
      {/* Image - 60% on desktop, full width on mobile */}
      <div className='w-full md:w-[60%]'>
        <Image
          src={heroContent.image}
          alt='Custom closet'
          width={1200}
          height={800}
          className='w-full h-auto'
          priority
        />
      </div>

      {/* Text Content - 40% on desktop */}
      <div
        className='w-full md:w-[40%] flex items-center justify-center py-8 md:py-0 px-4 md:px-8'
        style={{ color: heroContent.textColor }}
      >
        <div className='flex flex-col items-center text-center gap-2'>
          {/* Heading Info (optional) */}
          {heroContent.headingInfo && <p className='text-sm'>{heroContent.headingInfo}</p>}

          {/* Main Heading - CYBER MONDAY */}
          <h2
            className={`text-5xl md:text-6xl lg:text-[82px] font-bold leading-none uppercase max-w-[300px] md:max-w-[400px] ${
              heroContent.outlineHeading ? 'outline-text' : ''
            }`}
            style={
              heroContent.outlineHeading
                ? {
                    WebkitTextStroke: `1px ${heroContent.textColor}`,
                    color: 'transparent',
                  }
                : undefined
            }
          >
            {heroContent.heading}
          </h2>

          {/* Subheading - "The custom closet..." */}
          <p className='text-base md:text-xl max-w-[230px]'>{heroContent.subheading}</p>

          {/* Sale Text - 20% OFF */}
          <p className='text-6xl md:text-7xl lg:text-[100px] font-bold leading-none uppercase'>
            {heroContent.saleText}
          </p>

          {/* Discount Code */}
          {heroContent.code && (
            <button
              onClick={handleCopyCode}
              className='relative text-sm opacity-70 hover:opacity-100 cursor-pointer transition-opacity mb-4'
            >
              {heroContent.code.text}
              {copied && (
                <span className='absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded whitespace-nowrap'>
                  Code copied!
                </span>
              )}
            </button>
          )}

          {/* Buttons - Stacked */}
          <div className='flex flex-col gap-2.5 w-[200px]'>
            <Link
              href={primaryHref}
              className='bg-[#E8927C] hover:bg-[#C95B48] text-white px-6 py-2 rounded-full text-center border border-[#E8927C] hover:border-[#C95B48] transition-colors'
            >
              {heroContent.buttons.primary.text}
            </Link>
            <Link
              href={secondaryHref}
              className='hidden md:block bg-white text-[#E8927C] hover:text-[#C95B48] px-6 py-2 rounded-full text-center border border-[#E8927C] hover:border-[#C95B48] transition-colors'
            >
              {heroContent.buttons.secondary.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
