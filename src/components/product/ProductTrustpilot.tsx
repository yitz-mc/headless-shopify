'use client';

import { useEffect, useRef } from 'react';

interface ProductTrustpilotProps {
  productTitle: string;
  productId: string;
  variantSkus: string[];
}

// Trustpilot configuration
const TRUSTPILOT_CONFIG = {
  templateId: '60f537b5b0f1639de1fe048c', // Product Reviews MultiSource SEO
  businessUnitId: '59a03eed0000ff0005a9abd7',
  trustpilotLink: 'https://www.trustpilot.com/review/modularclosets.com',
};

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, rebuildWidget?: boolean) => void;
    };
  }
}

export function ProductTrustpilot({
  productTitle,
  productId,
  variantSkus,
}: ProductTrustpilotProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  // Build SKU string: all variant SKUs + product ID
  const skuString = [...variantSkus, productId].filter(Boolean).join(',');

  useEffect(() => {
    // Load Trustpilot script if not already loaded
    const existingScript = document.querySelector('script[src*="tp.widget.bootstrap"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = () => {
        if (widgetRef.current && window.Trustpilot) {
          window.Trustpilot.loadFromElement(widgetRef.current, true);
        }
      };
      document.head.appendChild(script);
    } else if (widgetRef.current && window.Trustpilot) {
      // Script already loaded, just initialize widget
      window.Trustpilot.loadFromElement(widgetRef.current, true);
    }
  }, [skuString]);

  return (
    <div className='trustpilot-product-reviews'>
      <div className='container mx-auto px-4'>
        <div className='trustpilot-product-reviews__content py-8 md:py-12'>
          {/* TrustBox widget - Product Reviews MultiSource SEO */}
          <div
            ref={widgetRef}
            className='trustpilot-widget'
            data-locale='en-US'
            data-template-id={TRUSTPILOT_CONFIG.templateId}
            data-businessunit-id={TRUSTPILOT_CONFIG.businessUnitId}
            data-style-height='330px'
            data-style-width='100%'
            data-theme='light'
            data-sku={skuString}
            data-name={productTitle}
            data-review-languages='en'
            data-no-reviews='hide'
          >
            <a href={TRUSTPILOT_CONFIG.trustpilotLink} target='_blank' rel='noopener noreferrer'>
              Trustpilot Reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
