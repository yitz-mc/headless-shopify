/**
 * Application constants
 * Centralized values to avoid magic strings/numbers throughout the codebase
 */

// ============================================================================
// Brand Colors
// ============================================================================

export const colors = {
  // Primary brand colors
  primary: '#F27662',
  primaryHover: '#c55849',
  primaryDark: '#b04d40',

  // Backgrounds
  backgroundLight: '#F6F6F6',
  backgroundWhite: '#FFFFFF',

  // Text
  textPrimary: '#000000',
  textSecondary: '#666666',
  textMuted: '#999999',

  // Borders
  borderLight: '#E5E5E5',
  borderDefault: '#D1D5DB', // gray-300

  // Status
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Overlay
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
} as const;

// ============================================================================
// Layout
// ============================================================================

export const layout = {
  // Container widths
  containerMaxWidth: '1280px',
  contentMaxWidth: '1024px',

  // Header
  headerHeight: '80px',
  headerHeightMobile: '60px',
  announcementBarHeight: '40px',

  // Product page
  productDetailsWidth: '520px',
  productGalleryGap: '68px',

  // Z-index layers
  zIndex: {
    dropdown: 100,
    sticky: 200,
    modal: 1000,
    overlay: 9999,
    modalContent: 10000,
    toast: 11000,
  },
} as const;

// ============================================================================
// Animation
// ============================================================================

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ============================================================================
// API / External
// ============================================================================

export const api = {
  // Pagination defaults
  productsPerPage: 24,
  collectionsPerPage: 12,
  variantsPerProduct: 100,
  imagesPerProduct: 50,

  // Cache times (in seconds)
  revalidateTime: 60,
  staticRevalidateTime: 3600,
} as const;

// ============================================================================
// Site Metadata
// ============================================================================

export const siteConfig = {
  name: 'Modular Closets',
  tagline: 'Custom Closets. Wholesale Pricing.',
  domain: 'modularclosets.com',
  email: 'support@modularclosets.com',
  phone: '1-800-XXX-XXXX',
  social: {
    instagram: 'https://instagram.com/modularclosets',
    facebook: 'https://facebook.com/modularclosets',
    pinterest: 'https://pinterest.com/modularclosets',
    youtube: 'https://youtube.com/modularclosets',
  },
} as const;

// ============================================================================
// Feature Flags (can be moved to env vars later)
// ============================================================================

export const features = {
  enableReviews: false,
  enableWishlist: false,
  enableQuickView: false,
  enableCompare: false,
} as const;
