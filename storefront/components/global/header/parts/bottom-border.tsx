"use client";

import {cx} from "cva";
import {useEffect, useState} from "react";

export default function BottomBorder({
  DropdownOpen,
  className,
}: {
  DropdownOpen?: boolean;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Always render as not visible until mounted to prevent hydration mismatch
  const shouldShowBorder = isMounted && isVisible;

  return (
    <div
      className={cx(
        className,
        "h-[1.5px] w-screen transition-all duration-300",
        {
          "bg-accent": shouldShowBorder && !DropdownOpen,
          "bg-background": !shouldShowBorder,
          "bg-background transition-none": DropdownOpen,
        },
      )}
    />
  );
}
