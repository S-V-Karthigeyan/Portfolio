import FadeIn from "./FadeIn";
import ContactForm from "./ContactForm";
import { Linkedin, Github } from "lucide-react";
import { usePortfolioContent } from "./content";

export default function ContactSection() {
  const { content } = usePortfolioContent();
  const { heading, blurb, email, footer } = content.contact;

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center gap-10 bg-[#0C0C0C] px-5 py-28 sm:px-8 md:px-10 md:py-36"
    >
      <FadeIn>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          {heading}
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="max-w-md text-center text-base leading-relaxed text-[#D7E2EA]/70 sm:text-lg">
          {blurb}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <a
          href={`mailto:${email}`}
          className="hero-heading break-all text-center font-black uppercase tracking-tight"
          style={{ fontSize: "clamp(1.1rem, 4vw, 3.2rem)" }}
        >
          {email}
        </a>
      </FadeIn>

      <FadeIn delay={0.3} className="w-full flex justify-center">
        <ContactForm />
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="flex items-center gap-10 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          <a
            href="https://www.linkedin.com/in/S-V-Karthigeyan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          >
            <Linkedin size={22} strokeWidth={1.5} />
            LinkedIn
          </a>
          <a
            href="https://github.com/S-V-Karthigeyan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          >
            <Github size={22} strokeWidth={1.5} />
            GitHub
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p className="pt-14 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/40">{footer}</p>
      </FadeIn>
    </section>
  );
}
