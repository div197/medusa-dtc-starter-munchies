"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

    if (!favicon) return;

    const handleVisibilityChange = () => {
      const state = document.hidden ? "-inactive" : "";

      if (state) {
        favicon.setAttribute("href", "/favicon" + state + ".ico");
      } else {
        favicon.setAttribute("href", "/favicon.ico");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}