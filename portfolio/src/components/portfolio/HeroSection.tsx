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
      className="relative flex h-screen flex-col"
      style={{
        overflowX: "clip",
        background: "radial-gradient(60% 55% at 50% 78%, #000000 0%, #050505 45%, #0C0C0C 100%)",
      }}
    >
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20">
        <div className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link}
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[8.6vw] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-3 md:text-[9vw] lg:text-[9.4vw]">
            {title}
          </h1>
        </FadeIn>
      </div>

      {image && (
        <div className="absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[340px] sm:translate-y-0 md:w-[420px] lg:w-[480px]">
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

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[280px]"
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