import { useEffect, useRef, useState } from "react";

export default function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [threshold]);

  return [ref, isIntersecting];
}