import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import { usePortfolioContent } from "./content";
import type { Skill } from "./data";

/** Reveals as soon as any part of the row enters the viewport (all breakpoints). */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
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

    const timeout = window.setTimeout(() => setShown(true), 2500);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return { ref, shown };
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function SkillRow({ skill }: { skill: Skill }) {
  const { ref, shown } = useInView<HTMLDivElement>();

  const reveal = (delay: number, x: number, y = 0) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translate3d(${x}px, ${y}px, 0)`,
    transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="flex items-center gap-6 py-6 sm:gap-10 sm:py-8 md:py-10">
        <span
          className="flex-shrink-0 font-black text-[#0C0C0C]"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 130px)",
            ...reveal(0, -60),
          }}
        >
          {skill.number}
        </span>
        <div className="flex flex-col gap-2 sm:gap-3">
          <h3
            className="font-medium uppercase text-[#0C0C0C]"
            style={{ fontSize: "clamp(1rem, 2.2vw, 2rem)", ...reveal(0.1, 40) }}
          >
            {skill.title}
          </h3>
          <p
            className="max-w-xl text-sm leading-relaxed text-[#0C0C0C]/70 sm:text-base"
            style={reveal(0.18, 40)}
          >
            {skill.desc}
          </p>
          <span
            className="text-xs uppercase tracking-widest text-[#0C0C0C]/45 sm:text-sm"
            style={reveal(0.26, 40)}
          >
            {skill.stack}
          </span>
        </div>
      </div>

      {/* Divider that draws itself in from the left */}
      <span
        aria-hidden
        className="block h-px w-full origin-left bg-[#0C0C0C]/15"
        style={{
          transform: shown ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 0.9s ${EASE} 0.1s`,
        }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const { content } = usePortfolioContent();

  return (
    <section
      id="skills"
      className="relative rounded-t-[32px] bg-white px-5 py-14 sm:rounded-t-[44px] sm:px-8 sm:py-16 md:rounded-t-[56px] md:px-10 md:py-20"
    >
      <FadeIn>
        <h2
          className="mb-10 text-center font-black uppercase text-[#0C0C0C] sm:mb-12 md:mb-14"
          style={{ fontSize: "clamp(2.6rem, 12vw, 160px)" }}
        >
          Skills &amp; Tech
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {content.skills.map((skill, i) => (
          <SkillRow key={`${skill.number}-${i}`} skill={skill} />
        ))}
      </div>
    </section>
  );
}
