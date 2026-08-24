'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Tracks 0-1 scroll progress through a tall "track" element as it passes
 * under the viewport (the sticky-scrub pattern used by the hero and case
 * study sections). Scroll/resize handling is rAF-throttled so state only
 * updates once per animation frame, no matter how many events fire.
 */
export function useScrollProgress(trackRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const next = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setProgress(next);
    };

    const onScrollOrResize = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        measure();
        tickingRef.current = false;
      });
    };

    measure();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [trackRef]);

  return progress;
}
