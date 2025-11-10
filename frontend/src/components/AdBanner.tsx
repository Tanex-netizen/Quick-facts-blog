"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    const element = adRef.current;
    if (!element || typeof window === "undefined") return;

    // Prevent duplicate initialization
    if ((element as HTMLElement & { __adsInitialized?: boolean }).__adsInitialized) return;

    // Check if container has width before pushing
    const width = element.clientWidth || element.offsetWidth || 0;
    if (width < 250) {
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
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
