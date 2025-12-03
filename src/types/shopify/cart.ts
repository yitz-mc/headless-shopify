/**
 * Shopify Cart types
 */

import type { Money } from './money';

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    price: Money;
    image?: {
      url: string;
      altText: string | null;
    } | null;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
}

export interface CartUserError {
  field: string;
  message: string;
}

export interface CartCreatePayload {
  cart: Cart | null;
  userErrors: CartUserError[];
}

export interface CartLinesAddPayload {
  cart: Cart | null;
  userErrors: CartUserError[];
}
