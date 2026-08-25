import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "./content";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

function Frame({
  src,
  alt,
  className,
  style,
}: {
  src: string | null;
  alt: string;
  className: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${className} flex items-center justify-center border border-dashed border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] text-center text-xs uppercase tracking-wide text-[#D7E2EA]/30`}
        style={style}
      >
        {alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="sticky mb-6 top-[var(--card-top-sm)] md:mb-0 md:top-[var(--card-top)]"
      style={
        {
          "--card-top-sm": `${index * 12 + 64}px`,
          "--card-top": `${index * 24 + 88}px`,
        } as React.CSSProperties
      }
    >

      <div className="flex w-full flex-col gap-4 overflow-hidden rounded-[28px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-5 sm:rounded-[36px] sm:p-6 md:rounded-[44px] md:p-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-6">
            <span
              className="hero-heading shrink-0 font-black leading-none"
              style={{ fontSize: "clamp(2rem, 7vw, 90px)" }}
            >
              {project.number}
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[10px] uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <span className="text-base font-medium uppercase text-[#D7E2EA] sm:text-2xl md:text-3xl">
                {project.name}
              </span>
              <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-[#D7E2EA]/50 md:block">
                {project.desc}
              </p>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            >
              View
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[40%_1fr]">
          <div className="flex flex-col gap-3 sm:gap-4">
            <Frame
              src={project.image1}
              alt={`${project.name} interface detail`}
              className="w-full rounded-2xl object-cover sm:rounded-3xl md:rounded-[32px]"
              style={{ aspectRatio: "16 / 10" }}
            />
            <Frame
              src={project.image2}
              alt={`${project.name} secondary screen`}
              className="w-full rounded-2xl object-cover sm:rounded-3xl md:rounded-[32px]"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
          <Frame
            src={project.imageMain}
            alt={`${project.name} main screen`}
            className="h-full max-h-[60vh] w-full rounded-2xl object-cover sm:rounded-3xl md:rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
