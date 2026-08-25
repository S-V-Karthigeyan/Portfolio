import { useEffect, useRef, useState } from "react";
import { usePortfolioContent } from "./content";

export default function MarqueeSection() {
  const { content } = usePortfolioContent();
  const { row1, row2 } = content.marquee;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (row1.length === 0 && row2.length === 0) return null;

  const loop1 = [...row1, ...row1, ...row1];
  const loop2 = [...row2, ...row2, ...row2];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] pb-8 pt-12 sm:pt-16 md:pt-20"
      style={{ overflowX: "clip" }}
    >
      <div className="flex flex-col gap-3">
        {loop1.length > 0 && (
          <div
            className="flex gap-3"
            style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}
          >
            {loop1.map((src, i) => (
              <img
                key={`row1-${i}`}
                src={src}
                alt=""
                loading="lazy"
                className="h-[190px] w-[300px] flex-shrink-0 rounded-2xl object-cover md:h-[270px] md:w-[420px]"
              />
            ))}
          </div>
        )}
        {loop2.length > 0 && (
          <div
            className="flex gap-3"
            style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}
          >
            {loop2.map((src, i) => (
              <img
                key={`row2-${i}`}
                src={src}
                alt=""
                loading="lazy"
                className="h-[190px] w-[300px] flex-shrink-0 rounded-2xl object-cover md:h-[270px] md:w-[420px]"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
