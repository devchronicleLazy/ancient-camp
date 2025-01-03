import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height (with some buffer for smooth transition)
      const heroSection = document.querySelector('[data-section="hero"]');
      const heroHeight = heroSection?.getBoundingClientRect().height || 0;

      // Only trigger after scrolling past hero
      const isScrolled = window.scrollY > heroHeight - 64; // 64px is navbar height

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return scrolled;
}
