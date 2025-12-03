# Gotchas & Non-Obvious Patterns

## Swiper Pagination
Don't use Swiper's built-in Pagination module for mobile dots - CSS positioning issues. Use custom React state-controlled dots instead (see `ProductGallery.tsx`).

## Afterpay Integration
- No npm package for web - must use their Shopify script
- Requires global variables before script loads
- Reference: `modular-closets-github/snippets/afterpay-snippet.liquid`

## Error Handling in Pages
Distinguish between:
- API error → show error state, keep page structure
- Data not found (null response) → call `notFound()` for 404

## Shopify Prices
Returned as strings (e.g., "540.00"). Convert to cents for Afterpay: `Math.round(parseFloat(price) * 100)`
