'use client';

import { useState } from 'react';
import { CornerDownRight } from 'lucide-react';
import { useCartStore } from '@/stores/cart';
import { shopifyClient } from '@/lib/shopify';
import { CREATE_CART, ADD_TO_CART } from '@/graphql';
import { formatPrice } from '@/lib/utils';
import { CartUpsellModal } from './CartUpsellModal';
import { AfterpayMessage } from './AfterpayMessage';
import type { Money, UpsellVariant, ProductReference } from '@/types';

interface AddToCartVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  image?: { url: string } | null;
}

interface AddToCartProps {
  variant: AddToCartVariant | null;
  product: ProductReference;
  upsellVariants?: UpsellVariant[];
}

export function AddToCart({ variant, product, upsellVariants }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const { cartId, setCartId, addItem, openCart } = useCartStore();

  // Get the first available upsell variant
  const firstUpsell = upsellVariants?.find((v) => v.availableForSale) || upsellVariants?.[0];

  const handleAddToCart = async () => {
    if (!variant || !variant.availableForSale) return;

    setIsLoading(true);

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
            lines: [{ merchandiseId: variant.id, quantity }],
          },
        });

        if (createResult.cartCreate.userErrors.length > 0) {
          console.error('Cart creation errors:', createResult.cartCreate.userErrors);
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
          lines: [{ merchandiseId: variant.id, quantity }],
        });

        if (addResult.cartLinesAdd.userErrors.length > 0) {
          console.error('Add to cart errors:', addResult.cartLinesAdd.userErrors);
          return;
        }
      }

      addItem({
        id: variant.id,
        variantId: variant.id,
        productId: product.id,
        title: product.title,
        variantTitle: variant.title,
        quantity,
        price: parseFloat(variant.price.amount),
        image: variant.image?.url,
        handle: product.handle,
      });

      // Show upsell modal if there are upsell variants, otherwise open cart
      if (firstUpsell) {
        setShowUpsellModal(true);
      } else {
        openCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !variant || !variant.availableForSale || isLoading;

  return (
    <>
      <div className="product-price-container">
        {/* Price */}
        <div className="product-form__price mb-1">
          {variant && (
            <span className="product-price--current text-xl font-medium">
              {formatPrice(variant.price.amount, variant.price.currencyCode)}
            </span>
          )}
        </div>

        {/* Afterpay messaging */}
        {variant && (
          <AfterpayMessage
            price={variant.price.amount}
            currencyCode={variant.price.currencyCode}
          />
        )}

        {/* Quantity & Add to Cart */}
        <div className="product-form__controls">
          <div className="product-form__actions flex gap-2">
            {/* Quantity Selector */}
            <div className="product-form__quantity flex items-center border border-gray-300 rounded-[10px] overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-11 flex items-center justify-center text-lg rounded-l-[10px] hover:bg-gray-200 transition-colors"
                disabled={quantity <= 1}
                type="button"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1) setQuantity(val);
                }}
                className="w-10 h-11 text-center focus:outline-none bg-transparent"
                name="quantity"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-11 flex items-center justify-center text-lg rounded-r-[10px] hover:bg-gray-200 transition-colors"
                type="button"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <div className="product-form__buttons flex-1">
              <button
                onClick={handleAddToCart}
                disabled={isDisabled}
                type="button"
                className={`
                  w-full h-11 px-6 font-medium rounded-full flex items-center justify-between
                  ${isDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#c55849] text-white hover:bg-[#b04d40]'
                  }
                `}
              >
                <span>
                  {isLoading
                    ? 'Adding...'
                    : !variant
                      ? 'Select options'
                      : !variant.availableForSale
                        ? 'Sold out'
                        : 'Add to Cart'}
                </span>
                {!isDisabled && !isLoading && (
                  <CornerDownRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell Modal */}
      <CartUpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        upsellVariant={firstUpsell || null}
        quantity={quantity}
      />
    </>
  );
}
