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
      className="block border border-gray-200 transition-shadow duration-200 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square bg-white">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4"
          />
        )}
      </div>

      {/* Text */}
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-900">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          From {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
