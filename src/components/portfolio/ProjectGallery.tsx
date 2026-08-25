import { useEffect, useRef, useState } from "react";
import { usePortfolioContent, type GalleryShot } from "./content";

function GalleryImage({ src, label }: GalleryShot) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-full w-full select-none items-center justify-center px-4 text-center text-xs uppercase tracking-wide text-[#D7E2EA]/30"
        style={{ aspectRatio: "16 / 9" }}
      >
        {label}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      loading="lazy"
      draggable={false}
      className="h-full w-full select-none object-cover"
      style={{ aspectRatio: "16 / 9" }}
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Scroll-linked row: the shot list is tripled back-to-back so there is
 * always slack on both sides, then translated by an offset derived from
 * how far the section has scrolled through the viewport. No timers — it
 * only moves while the user scrolls, and direction follows scroll direction.
 */
function Row({ shots, offset, reverse }: { shots: GalleryShot[]; offset: number; reverse?: boolean }) {
  const loop = [...shots, ...shots, ...shots];
  const translate = reverse ? -offset : offset;

  return (
    <div className="relative flex w-full overflow-hidden">
      <div
        className="flex w-max shrink-0 gap-3 sm:gap-6"
        style={{
          transform: `translateX(${translate}px)`,
          willChange: "transform",
        }}
      >
        {loop.map((shot, i) => (
          <figure
            key={`${shot.label}-${i}`}
            className="w-[62vw] shrink-0 overflow-hidden rounded-2xl border border-[#D7E2EA]/10 bg-[#111] sm:w-[42vw] lg:w-[30vw]"
          >
            <GalleryImage src={shot.src} label={shot.label} />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  const { content } = usePortfolioContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (content.gallery.length === 0) return null;

  // Centre the starting position so the row isn't scrolled all the way to one edge on load.
  const centered = offset - 400;

  return (
    <section ref={sectionRef} className="relative z-10 bg-[#0C0C0C] py-10 sm:py-14 md:py-16" style={{ overflowX: "clip" }}>
      <h2
        className="hero-heading mb-8 px-5 text-center font-black uppercase leading-none tracking-tight sm:mb-10 sm:px-8"
        style={{ fontSize: "clamp(2rem, 7vw, 90px)" }}
      >
        Screens
      </h2>

      <div className="flex flex-col gap-4 sm:gap-6">
        <Row shots={content.gallery} offset={centered} />
      </div>
    </section>
  );
}
