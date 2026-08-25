import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Lightweight reveal-on-scroll wrapper.
 *
 * Uses a plain IntersectionObserver + CSS transition instead of a motion
 * component so it can never get stuck at `opacity: 0` when the tree re-renders
 * (e.g. once the saved content loads from the backend).
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as,
  className,
}: FadeInProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Safety net: never leave content hidden.
    const timeout = window.setTimeout(() => setShown(true), 2500);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translate3d(${x}px, ${y}px, 0)`,
    transition: `opacity ${duration}s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
    willChange: shown ? undefined : "opacity, transform",
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
