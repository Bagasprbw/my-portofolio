"use client";

import { ExternalLink, ArrowRight } from "lucide-react";
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

const GITHUB_URL = "https://github.com/Bagasprbw";

export function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              A collection of featured projects I've built.
            </p>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No projects yet.
          </p>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn direction="up">
          <div className="text-center">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="animate-bounce-gentle inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Explore More on GitHub
              <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-500 min-h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative overflow-hidden bg-muted h-52 shrink-0">
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-2">
                <ExternalLink size={20} className="text-muted-foreground/40" />
              </div>
              <span className="text-muted-foreground/30 text-xs font-semibold">
                No Preview
              </span>
            </div>
          </div>
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-sm transition-all duration-300"
          >
            <span className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg">
              <ExternalLink size={13} />
              View Project
            </span>
          </a>
        )}
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-6 space-y-3">
        <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <div className="text-sm text-muted-foreground leading-relaxed flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {project.description}
        </div>

        {project.projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.projectSkills.slice(0, 5).map((ps) => (
              <span
                key={ps.skill.id}
                className="inline-flex items-center rounded-full bg-primary/5 border border-primary/10 px-3 py-0.5 text-[10px] font-medium text-primary/80"
              >
                {ps.skill.name}
              </span>
            ))}
            {project.projectSkills.length > 5 && (
              <span className="inline-flex items-center rounded-full bg-muted border border-border px-3 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.projectSkills.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
