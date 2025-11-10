"use client";

import { useEffect, useRef } from "react";

interface AdBoxProps {
  slot: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * AdBox component for fixed-size ad units (e.g., 300x250, 300x600)
 * Typically used in sidebars
 */
export default function AdBox({
  slot,
  width = 300,
  height = 250,
  className = "",
}: AdBoxProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    const element = adRef.current;
    if (!element || typeof window === "undefined") return;

    // Prevent duplicate initialization
    if ((element as HTMLElement & { __adsInitialized?: boolean }).__adsInitialized) return;

    // Check if container has width before pushing
    const clientWidth = element.clientWidth || element.offsetWidth || 0;
    if (clientWidth < 250) {
      // Skip if container is too small or hidden
      return;
    }

    try {
      // @ts-expect-error - adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      (element as HTMLElement & { __adsInitialized?: boolean }).__adsInitialized = true;
    } catch (error) {
      // Silently catch errors in dev with placeholder credentials
      if (process.env.NODE_ENV === "development") {
        console.debug("AdSense initialization skipped");
      } else {
        console.error("AdSense error:", error);
      }
    }
  }, []);

  return (
    <div className={`ad-box ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
      />
    </div>
  );
}
