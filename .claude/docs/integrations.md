# Third-Party Integrations

## Afterpay (`AfterpayMessage.tsx`)
Uses official Shopify script with Next.js `Script` component.

**Required globals** (set before script loads):
- `afterpay_js_snippet_version` = '1.2.1'
- `afterpay_product` = { price, available, price_min, price_max }
- `afterpay_current_variant` = { price (in cents), available }
- `afterpay_shop_currency`, `afterpay_cart_currency`
- `afterpay_shop_permanent_domain` = 'modular-closets.myshopify.com'
- And more... see `setupAfterpayConfig()` function

Container needs `.afterpay-price-container` class.

## PhotoSwipe (Lightbox)
Used in `ProductGallery.tsx`. Requires hidden `<a>` tags with `pswp-item` class for gallery items.

## Swiper
Used for carousels. Import only what you need from `swiper/modules`.
