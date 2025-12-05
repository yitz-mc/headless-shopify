'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { SearchProduct } from '@/lib/shopify';

interface SearchProductCardProps {
  product: SearchProduct;
}

export function SearchProductCard({ product }: SearchProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.featuredImage;
  const secondaryImage = product.images?.edges?.[1]?.node;
  const hasSecondImage = !!secondaryImage;

  return (
    <Link
      href={`/products/${product.handle}`}
      className='group flex flex-col h-full border border-gray-200'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className='relative aspect-square bg-white overflow-hidden'>
        {/* Primary Image */}
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText || product.title}
            fill
            sizes='(max-width: 1024px) 50vw, 33vw'
            className={`object-contain p-4 transition-opacity duration-300 ${
              hasSecondImage && isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Secondary Image (shown on hover) */}
        {hasSecondImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.altText || product.title}
            fill
            sizes='(max-width: 1024px) 50vw, 33vw'
            className={`object-contain p-4 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Shop Now Button - appears on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-200 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          } hidden md:block`}
        >
          <div className='bg-[#E8927C] text-white px-6 py-4 rounded-full flex items-center justify-between'>
            <span className='text-sm font-medium'>Shop Now</span>
            <ArrowIcon className='w-3 h-3' />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className='p-4 flex-1 flex flex-col'>
        <h3 className='text-sm md:text-base font-medium text-gray-900 line-clamp-2'>
          {product.title}
        </h3>
        <p className='mt-auto pt-2 text-sm text-gray-600'>
          From{' '}
          {formatPrice(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode,
          )}
        </p>
      </div>
    </Link>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 12 11'
      strokeWidth={1.5}
      strokeMiterlimit={10}
    >
      <path d='M1.5 0.5V4.8955C1.50007 5.11875 1.54377 5.3398 1.62859 5.54602C1.71341 5.75224 1.8377 5.9396 1.99436 6.09738C2.15101 6.25516 2.33696 6.38029 2.54159 6.4656C2.74622 6.55092 2.96551 6.59476 3.18695 6.59461H10.5M7.59457 3.68811L10.5 6.61734L7.64076 9.5' />
    </svg>
  );
}
