'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { ProductCard } from '@/types';

interface AltoProductCardProps {
  product: ProductCard;
}

export function AltoProductCard({ product }: AltoProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images.edges[0]?.node;
  const secondaryImage = product.images.edges[1]?.node;
  const price = product.priceRange.minVariantPrice;
  const variantId = product.variants?.edges[0]?.node.id;

  // Remove "Alto " from the beginning of the title
  const displayTitle = product.title.replace(/^Alto\s+/i, '');

  // Use collection URL path like live site: /collections/{handle}/products/{productHandle}?variant={variantId}
  const productUrl = `/products/${product.handle}${variantId ? `?variant=${variantId.split('/').pop()}` : ''}`;

  return (
    <div
      className="alto-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`product-card__wrapper rounded-[15px] bg-white p-5 transition-all duration-200 ${
          isHovered ? 'shadow-[0px_10px_20px_0px_rgba(0,0,0,0.15)] border-transparent' : 'border border-[#E0E0E0]'
        }`}
      >
        {/* Image Container */}
        <Link href={productUrl} className="block">
          <div className="product-card__image-wrapper relative aspect-square bg-[#f6f6f6] rounded-[10px] overflow-hidden">
            {primaryImage ? (
              <>
                {/* Primary Image */}
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-contain p-4 transition-opacity duration-300 ${
                    isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* Secondary Image (hover) */}
                {secondaryImage && (
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.altText || product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-contain p-4 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </>
            ) : (
              /* No Image Placeholder */
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="12" x2="52" y2="52" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="mt-2 text-sm">No image</span>
              </div>
            )}
          </div>
        </Link>

        {/* Text Container */}
        <div className="product-card__text-container flex flex-col md:flex-row justify-between mt-4 gap-2">
          {/* Name */}
          <div className="product-card__name-wrapper md:flex-1 md:pr-4">
            <Link href={productUrl} className="product-card__name text-[18px] font-medium hover:underline">
              {displayTitle}
            </Link>
          </div>
          {/* Price */}
          <div className="product-card__price-container text-left md:text-right flex-shrink-0">
            <div className="text-[14px] text-[#a9a9ae] whitespace-nowrap">
              Starts at <span className="text-[#a9a9ae] md:text-inherit">{formatPrice(price.amount, price.currencyCode)}</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="product-card__shop-btn mt-5">
          <Link
            href={productUrl}
            className="btn btn-primary w-full flex items-center justify-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
