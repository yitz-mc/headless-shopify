import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { ProductCard as ProductCardType } from '@/types';

interface ProductCardProps {
  product: ProductCardType;
  collectionHandle?: string;
}

export function ProductCard({ product, collectionHandle }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  const productUrl = collectionHandle
    ? `/collections/${collectionHandle}/products/${product.handle}`
    : `/products/${product.handle}`;

  return (
    <Link
      href={productUrl}
      className='flex flex-col h-full border border-gray-200 transition-shadow duration-200 hover:shadow-lg'
    >
      {/* Image */}
      <div className='relative aspect-square bg-white'>
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-contain p-4'
          />
        ) : (
          /* No Image Placeholder */
          <div className='flex flex-col items-center justify-center h-full text-gray-400'>
            <div className='relative w-16 h-16'>
              <svg viewBox='0 0 64 64' className='w-full h-full'>
                <circle cx='32' cy='32' r='28' fill='none' stroke='currentColor' strokeWidth='2' />
                <line x1='12' y1='12' x2='52' y2='52' stroke='currentColor' strokeWidth='2' />
              </svg>
            </div>
            <span className='mt-2 text-sm'>No image</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className='p-4 flex-1 flex flex-col'>
        <h3 className='text-sm md:text-base font-medium text-gray-900 line-clamp-2'>
          {product.title}
        </h3>
        <p className='mt-auto pt-1 text-sm text-gray-600'>
          From {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
