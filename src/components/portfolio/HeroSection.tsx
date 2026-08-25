import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";
import { usePortfolioContent } from "./content";

const NAV_LINKS = ["About", "Resume", "Skills", "Projects", "Contact"];

export default function HeroSection() {
  const { content } = usePortfolioContent();
  const { title, tagline, image } = content.hero;

  return (
    <section
      className="relative flex min-h-[100svh] flex-col"
      style={{
        overflowX: "clip",
        background: "radial-gradient(60% 55% at 50% 78%, #000000 0%, #050505 45%, #0C0C0C 100%)",
      }}
    >
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-lg lg:text-[1.4rem]"
            >
              {link}
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="relative z-30 overflow-hidden px-3">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-8 w-full text-center text-[11vw] font-black uppercase leading-[1.05] tracking-tight sm:mt-6 sm:whitespace-nowrap sm:text-[9vw] md:-mt-2 lg:text-[9.4vw]">
            {title}
          </h1>
        </FadeIn>
      </div>

      {image && (
        <div className="pointer-events-none relative z-10 mx-auto -mt-2 w-[240px] sm:-mt-4 sm:w-[340px] md:w-[420px] lg:w-[480px]">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3}>
              <img
                src={image}
                alt="3D stylised portrait"
                className="pointer-events-none h-auto w-full select-none"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 62% 62% at 50% 50%, #000 55%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 62% 62% at 50% 50%, #000 55%, transparent 100%)",
                }}
                draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>
      )}


      <div className="relative z-20 mt-auto flex flex-col items-start gap-5 px-5 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[240px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            {tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
