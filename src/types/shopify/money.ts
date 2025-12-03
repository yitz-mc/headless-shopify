/**
 * Shopify Money types
 */

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface MoneyRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}
