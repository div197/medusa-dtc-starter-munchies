import {useEffect, useState} from "react";

export function useIsInIframe() {
  const [isInIframe, setIsInIframe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsInIframe(window.self !== window.top);
  }, []);

  // Only return true if mounted to prevent hydration mismatch
  return isMounted && isInIframe;
}
