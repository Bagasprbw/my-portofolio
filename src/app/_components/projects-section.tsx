import { ExternalLink, Star } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

type Skill = {
  id: string;
  name: string;
};

type ProjectSkill = {
  skill: Skill;
};

type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  url?: string | null;
  featured: boolean;
  projectSkills: ProjectSkill[];
};

type Props = {
  projects: Project[];
};

export function ProjectsSection({ projects }: Props) {
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              A selection of projects I've built — from concept to deployment.
            </p>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No projects added yet.
          </p>
        ) : (
          <div className="space-y-12">
            {/* Featured projects – big cards */}
            {featured.length > 0 && (
              <StaggerContainer className="grid md:grid-cols-2 gap-6">
                {featured.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} featured />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Regular projects – smaller grid */}
            {regular.length > 0 && (
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {regular.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 ${
        featured ? "" : ""
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden bg-muted ${
          featured ? "h-48" : "h-36"
        }`}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-sm font-semibold select-none">
            No Preview
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Star size={10} className="fill-white" />
            Featured
          </div>
        )}

        {/* Link overlay */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-300"
          >
            <span className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
              <ExternalLink size={12} />
              View Project
            </span>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3
          className={`font-bold text-foreground leading-tight ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Skills */}
        {project.projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.projectSkills.slice(0, 5).map((ps) => (
              <span
                key={ps.skill.id}
                className="inline-flex items-center rounded-md bg-muted border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {ps.skill.name}
              </span>
            ))}
            {project.projectSkills.length > 5 && (
              <span className="inline-flex items-center rounded-md bg-muted border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.projectSkills.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
