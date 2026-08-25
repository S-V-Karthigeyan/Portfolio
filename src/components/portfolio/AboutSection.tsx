import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import { usePortfolioContent } from "./content";

export default function AboutSection() {
  const { content } = usePortfolioContent();
  const { heading, text } = content.about;

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            {heading}
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-10 sm:gap-12 md:gap-14">
          <AnimatedText
            text={text}
            className="max-w-[620px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
