import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";
import { usePortfolioContent } from "./content";

export default function ProjectsSection() {
  const { content } = usePortfolioContent();
  const projects = content.projects;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
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
