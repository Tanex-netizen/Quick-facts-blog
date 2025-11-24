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
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

  // Don't render if no valid AdSense client
  if (!adsenseClient || !adsenseClient.startsWith('ca-pub-')) {
    return null;
  }

  useEffect(() => {
    const element = adRef.current;
    if (!element || typeof window === "undefined") return;

    // Prevent duplicate initialization
    if ((element as HTMLElement & { __adsInitialized?: boolean }).__adsInitialized) return;

    // Wait for element to be visible and have width
    const checkAndInitialize = () => {
      const width = element.clientWidth || element.offsetWidth || 0;
      if (width < 250) {
        return; // Skip if container is too small or hidden
      }

      try {
        // @ts-expect-error - adsbygoogle is injected by Google
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (element as HTMLElement & { __adsInitialized?: boolean }).__adsInitialized = true;
      } catch (error) {
        console.debug("AdSense initialization skipped:", error);
      }
    };

    // Delay initialization to ensure container has proper dimensions
    const timeoutId = setTimeout(checkAndInitialize, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`ad-container min-w-[250px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: "50px" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
