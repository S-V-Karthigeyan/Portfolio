import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";
import { usePortfolioContent } from "./content";

export default function ProjectsSection() {
  const { content } = usePortfolioContent();
  const projects = content.projects;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-8 rounded-t-[32px] bg-[#0C0C0C] px-4 pb-14 pt-12 sm:rounded-t-[44px] sm:px-8 sm:pt-16 md:rounded-t-[56px] md:px-10 md:pt-20"
    >
      <FadeIn>
        <h2
          className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-16"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-6xl flex-col">
        {projects.map((project, i) => (
          <ProjectCard
            key={`${project.number}-${i}`}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
