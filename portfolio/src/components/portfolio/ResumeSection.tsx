import FadeIn from "./FadeIn";
import { usePortfolioContent } from "./content";

export default function ResumeSection() {
  const { content } = usePortfolioContent();

  return (
    <section id="resume" className="relative px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
      <FadeIn>
        <h2
          className="hero-heading mb-14 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-24"
          style={{ fontSize: "clamp(2.6rem, 12vw, 160px)" }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {content.experience.map((item, i) => (
          <FadeIn key={`${item.company}-${i}`} delay={i * 0.1}>
            <div
              className="flex flex-col gap-2 py-8 sm:py-10"
              style={{ borderBottom: "1px solid rgba(215, 226, 234, 0.15)" }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/45 sm:text-sm">
                {item.period}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
              >
                {item.role}
              </h3>
              <span className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 sm:text-base">
                {item.company}
              </span>
              <p className="max-w-2xl text-sm leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <h2
          className="mb-14 mt-24 text-center font-black uppercase leading-none tracking-tight hero-heading sm:mb-20 md:mb-24 md:mt-32"
          style={{ fontSize: "clamp(2.6rem, 12vw, 160px)" }}
        >
          Education
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {content.education.map((item, i) => (
          <FadeIn key={`${item.institution}-${i}`} delay={i * 0.1}>
            <div
              className="flex flex-col gap-2 py-8 sm:py-10"
              style={{ borderBottom: "1px solid rgba(215, 226, 234, 0.15)" }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/45 sm:text-sm">
                {item.period}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
              >
                {item.degree}
              </h3>
              <span className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 sm:text-base">
                {item.institution}
              </span>
              <p className="max-w-2xl text-sm leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
