import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top with smooth animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
}