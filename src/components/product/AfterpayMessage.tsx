'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface AfterpayMessageProps {
  price: string;
  currencyCode: string;
}

// Configure Afterpay globals (required by their script)
function setupAfterpayConfig(priceInCents: number, currencyCode: string) {
  const win = window as Window & typeof globalThis & Record<string, unknown>;

  // Overrides (from live site)
  win.afterpay_msg_size = 'xs';
  win.afterpay_hide_upper_limit = true;
  win.afterpay_product_integration_enabled = true;
  win.afterpay_product_selector = '.afterpay-price-container';
  win.afterpay_cart_integration_enabled = false;

  // Required fields
  win.afterpay_js_language = 'en';
  win.afterpay_js_country = 'US';
  win.afterpay_shop_currency = currencyCode;
  win.afterpay_cart_currency = currencyCode;
  win.afterpay_shop_money_format = '${{amount}}';
  win.afterpay_shop_permanent_domain = 'modular-closets.myshopify.com';
  win.afterpay_theme_name = 'Headless';
  win.afterpay_js_snippet_version = '1.2.1';

  // Product/variant data
  win.afterpay_product = {
    available: true,
    price: priceInCents,
    price_min: priceInCents,
    price_max: priceInCents,
  };
  win.afterpay_current_variant = {
    price: priceInCents,
    available: true,
  };
  win.afterpay_product_collections = '';
  win.afterpay_cart_total_price = 0;
  win.afterpay_cart_skus = '';
  win.afterpay_cart_collections = '';
}

export function AfterpayMessage({ price, currencyCode }: AfterpayMessageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceInCents = Math.round(parseFloat(price) * 100);

  // Set up globals before script loads and on price changes
  useEffect(() => {
    setupAfterpayConfig(priceInCents, currencyCode);
  }, [priceInCents, currencyCode]);

  return (
    <div className='afterpay-message mb-4'>
      {/* Load Afterpay script using Next.js Script component */}
      <Script
        id='afterpay-shopify-sdk'
        src='https://static.afterpay.com/shopify-afterpay-javascript.js'
        strategy='lazyOnload'
        onReady={() => {
          // Re-apply config when script is ready
          setupAfterpayConfig(priceInCents, currencyCode);
        }}
      />

      {/* Container where Afterpay injects its messaging */}
      <div ref={containerRef} className='afterpay-price-container'>
        <span className='money' style={{ display: 'none' }}>
          ${price}
        </span>
      </div>
    </div>
  );
}
