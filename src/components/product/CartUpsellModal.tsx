'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, CornerDownRight } from 'lucide-react';
import { useCartStore } from '@/stores';
import { shopifyClient } from '@/lib/shopify';
import { CREATE_CART, ADD_TO_CART } from '@/graphql';

interface UpsellVariant {
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
    description?: string;
  };
}

interface CartUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  upsellVariant: UpsellVariant | null;
  quantity: number;
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function CartUpsellModal({
  isOpen,
  onClose,
  upsellVariant,
  quantity,
}: CartUpsellModalProps) {
  const { cartId, setCartId, addItem, openCart } = useCartStore();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNoThanks = useCallback(() => {
    onClose();
    openCart();
  }, [onClose, openCart]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleNoThanks();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleNoThanks]);

  const handleAddUpsell = async () => {
    if (!upsellVariant || !upsellVariant.availableForSale) {
      handleNoThanks();
      return;
    }

    try {
      let currentCartId = cartId;

      if (!currentCartId) {
        const createResult = await shopifyClient.request<{
          cartCreate: {
            cart: { id: string };
            userErrors: Array<{ field: string; message: string }>;
          };
        }>(CREATE_CART, {
          input: {
            lines: [{ merchandiseId: upsellVariant.id, quantity }],
          },
        });

        if (createResult.cartCreate.userErrors.length > 0) {
          console.error('Cart creation errors:', createResult.cartCreate.userErrors);
          handleNoThanks();
          return;
        }

        currentCartId = createResult.cartCreate.cart.id;
        setCartId(currentCartId);
      } else {
        const addResult = await shopifyClient.request<{
          cartLinesAdd: {
            cart: { id: string };
            userErrors: Array<{ field: string; message: string }>;
          };
        }>(ADD_TO_CART, {
          cartId: currentCartId,
          lines: [{ merchandiseId: upsellVariant.id, quantity: 1 }],
        });

        if (addResult.cartLinesAdd.userErrors.length > 0) {
          console.error('Add to cart errors:', addResult.cartLinesAdd.userErrors);
          handleNoThanks();
          return;
        }
      }

      addItem({
        id: upsellVariant.id,
        variantId: upsellVariant.id,
        productId: upsellVariant.product.id,
        title: upsellVariant.product.title,
        variantTitle: upsellVariant.title,
        quantity,
        price: parseFloat(upsellVariant.price.amount),
        image: upsellVariant.image?.url,
        handle: upsellVariant.product.handle,
      });

      onClose();
      openCart();
    } catch (error) {
      console.error('Error adding upsell to cart:', error);
      handleNoThanks();
    }
  };

  if (!isOpen || !upsellVariant) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[9999]"
        onClick={handleNoThanks}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] max-w-[90%] bg-white rounded-[15px] p-[30px] z-[10000]">
        {/* Close button */}
        <button
          onClick={handleNoThanks}
          className="absolute top-2.5 right-4 text-3xl cursor-pointer hover:opacity-70"
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Titles */}
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-[26px] text-[#F27662] font-normal m-0 max-[450px]:text-xl">
            Your item was added to cart!
          </h2>
          <p className="text-base m-0">
            Great choice! Make this tower even better:
          </p>
        </div>

        {/* Product */}
        <div className="flex gap-[30px] justify-center items-center my-6 max-[450px]:gap-4 max-[450px]:my-5">
          {/* Image */}
          <div className="flex-1">
            {upsellVariant.image?.url ? (
              <Image
                src={upsellVariant.image.url}
                alt={upsellVariant.image.altText || upsellVariant.product.title}
                width={200}
                height={200}
                className="float-right object-cover bg-[#F6F6F6]"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-[#F6F6F6] float-right" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-base font-medium m-0">
              {upsellVariant.product.title}
            </p>
            <p className="text-xs m-0 opacity-100 leading-normal">
              {upsellVariant.title}
            </p>
            {upsellVariant.product.description && (
              <p className="text-xs opacity-70 py-2.5 leading-[18px] m-0">
                {upsellVariant.product.description}
              </p>
            )}
            <p className="text-base font-medium m-0">
              {formatPrice(upsellVariant.price.amount, upsellVariant.price.currencyCode)}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center max-[450px]:flex-col-reverse">
          <button
            onClick={handleNoThanks}
            className="bg-white text-[#F27662] border border-[#F27662] py-2.5 px-5 rounded-full hover:border-[#c55849] hover:text-[#c55849] transition-colors max-[450px]:border-0 max-[450px]:underline max-[450px]:p-0"
          >
            No Thanks
          </button>
          <button
            onClick={handleAddUpsell}
            disabled={!upsellVariant.availableForSale}
            className="bg-[#F27662] text-white border border-[#F27662] py-2.5 px-5 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed max-[450px]:w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Add to Cart</span>
              <CornerDownRight className="w-4 h-4 max-[450px]:hidden" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
