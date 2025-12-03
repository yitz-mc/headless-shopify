'use client';

import { useEffect } from 'react';

/**
 * Hook to lock/unlock body scroll (for modals, drawers, etc.)
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    // Save current scroll position and body style
    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // Cleanup - restore scroll
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
