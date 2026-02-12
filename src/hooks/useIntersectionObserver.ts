import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }

        if (freezeOnceVisible && hasBeenVisible) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(isVisible);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, freezeOnceVisible, hasBeenVisible]);

  return { ref, isIntersecting, hasBeenVisible };
}
