'use client';

import Image from 'next/image';
import { useCartStore } from '@/stores';
import { CornerDownRight } from 'lucide-react';

interface AddOnVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  image: {
    url: string;
    altText: string | null;
  } | null;
  product: {
    id: string;
    title: string;
    handle: string;
  };
}

interface ProductAddOnsProps {
  productTitle: string;
  addOns: AddOnVariant[];
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

function AddOnCard({ variant }: { variant: AddOnVariant }) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: variant.id,
      variantId: variant.id,
      productId: variant.product.id,
      title: variant.product.title,
      variantTitle: variant.title,
      quantity: 1,
      price: parseFloat(variant.price.amount),
      image: variant.image?.url,
      handle: variant.product.handle,
    });
    openCart();
  };

  return (
    <div className='upsell-products-container w-full sm:w-[30%]'>
      <div className='upsell-product flex sm:block gap-4 items-center border border-gray-200 sm:border-0 p-2.5 sm:p-0 rounded-md sm:rounded-none'>
        {/* Image */}
        <div className='upsell-product_image-wrapper w-[90px] h-[90px] sm:w-full sm:h-auto sm:aspect-square flex-shrink-0'>
          {variant.image?.url ? (
            <Image
              src={variant.image.url}
              alt={variant.image.altText || variant.product.title}
              width={200}
              height={200}
              className='w-full h-full object-cover bg-[#F6F6F6]'
            />
          ) : (
            <div className='w-full h-full bg-[#F6F6F6]' />
          )}
        </div>

        {/* Info & Button */}
        <div className='upsell-product_info-button-wrapper flex-1 sm:w-full'>
          <div className='upsell-product_info py-2.5 sm:py-2.5'>
            <p className='upsell-product_title text-sm line-clamp-1 m-0'>{variant.product.title}</p>
            <p className='upsell-product_variant_title text-[11px] opacity-70 leading-3 line-clamp-1 m-0'>
              {variant.title}
            </p>
            <p className='upsell-product_price pt-1 m-0 font-medium'>
              {formatPrice(variant.price.amount, variant.price.currencyCode)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!variant.availableForSale}
            className='upsell-product_add-to-cart-button w-fit sm:w-full py-2.5 px-5 border border-current bg-[#F27662] text-white rounded-full text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='flex items-center justify-center w-full'>
              <span className='mx-auto'>Add to Cart</span>
              <CornerDownRight className='w-3 h-3 ml-2' />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductAddOns({ productTitle, addOns }: ProductAddOnsProps) {
  if (!addOns || addOns.length === 0) {
    return null;
  }

  // Remove "Vista " prefix from title like the live site does
  const displayTitle = productTitle.replace(/^Vista\s+/i, '');

  return (
    <div className='complete-the-look-wrapper pb-5'>
      <div className='complete-the-look'>
        {/* Title */}
        <div className='title-container flex items-center mb-4 pt-5'>
          <h3 className='accordion__heading title text-xl font-semibold pl-2 m-0'>
            {displayTitle} Add-ons
          </h3>
        </div>

        {/* Products Grid */}
        <div className='complete-the-look-products flex flex-col sm:flex-row gap-4 pt-5'>
          {addOns.map((variant) => (
            <AddOnCard key={variant.id} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}
