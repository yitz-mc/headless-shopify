# Gotchas & Non-Obvious Patterns

## Dev Server

The user runs `npm run dev` themselves - do NOT run it. Use `npm run build` to verify builds if needed.

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

## API Fetch Calls

Never put `fetch()` calls directly in components. Create a client API service in `src/lib/api/` for all client-side API calls. Components import and use these services.

## Routes System

**Always use the routes system for internal navigation.** Never hardcode paths.

- Routes are defined in `src/lib/routes.ts`
- Import and use: `import { routes } from '@/lib/routes'`

```tsx
// ✅ CORRECT
import { routes } from '@/lib/routes';
<Link href={routes.designQuiz}>Free Design</Link>
<Link href={routes.collections.vista}>Vista Collection</Link>
<Link href={`${routes.designQuiz}?utm_referlclick=hp_cta`}>With UTM</Link>

// ❌ WRONG - hardcoded paths
<Link href="/pages/closet-design-quiz">Free Design</Link>
```

If a route doesn't exist in the registry, add it to `src/lib/routes.ts` before using.

## Types & Interfaces

**NEVER create duplicate types.** All shared types live in `src/types/`.

### Structure

```
src/types/
├── index.ts              # Re-exports everything (import from '@/types')
├── shopify/              # Shopify API response types
│   ├── product.ts        # Product, ProductCard
│   ├── variant.ts        # Variant, UpsellVariant
│   ├── collection.ts     # Collection
│   ├── cart.ts           # Cart, CartLine
│   ├── money.ts          # Money, MoneyRange
│   ├── media.ts          # Image, SimpleImage
│   ├── metafield.ts      # Metafield, MetaobjectField, AssemblyInstruction
│   └── menu.ts           # MenuItem, Menu
└── content/              # CMS/content types
    ├── trustpilot.ts     # TrustpilotReview, TrustpilotHeading
    ├── gallery.ts        # GalleryImage
    └── faq.ts            # FAQItem, FAQCategory
```

### Rules

1. **Data types** (Product, Variant, Collection, TrustpilotReview, etc.) → `src/types/`
2. **Component props** (`ButtonProps`, `ModalProps`) → inline in component file (OK)
3. **Page-specific response wrappers** (`ProductResult`) → inline in page file (OK)
4. **Never redefine data types** - always `import type { X } from '@/types'`

### Usage

```tsx
// ✅ CORRECT
import type { Product, Collection, TrustpilotReview } from '@/types';

// ❌ WRONG - redefining shared types
interface Product { id: string; ... }
```
