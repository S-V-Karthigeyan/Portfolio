import FadeIn from "./FadeIn";
import { usePortfolioContent } from "./content";

export default function SkillsSection() {
  const { content } = usePortfolioContent();

  return (
    <section
      id="skills"
      className="relative rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(2.6rem, 12vw, 160px)" }}
        >
          Skills &amp; Tech
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {content.skills.map((skill, i) => (
          <FadeIn key={`${skill.number}-${i}`} delay={i * 0.1}>
            <div
              className="flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:py-12"
              style={{ borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="flex-shrink-0 font-black text-[#0C0C0C]"
                style={{ fontSize: "clamp(2.5rem, 10vw, 130px)" }}
              >
                {skill.number}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2rem)" }}
                >
                  {skill.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-[#0C0C0C]/70 sm:text-base">
                  {skill.desc}
                </p>
                <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/45 sm:text-sm">
                  {skill.stack}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}