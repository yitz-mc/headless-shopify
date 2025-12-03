'use client';

import { useSyncExternalStore } from 'react';

/**
 * Hook to detect if a media query matches
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    // Default to false on server (mobile-first approach)
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Convenience hooks for common breakpoints
export function useIsMobile(): boolean {
  const isNotMobile = useMediaQuery('(min-width: 640px)');
  return !isNotMobile;
}

export function useIsTablet(): boolean {
  const isMinTablet = useMediaQuery('(min-width: 640px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isMinTablet && !isDesktop;
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
