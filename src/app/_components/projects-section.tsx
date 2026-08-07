"use client";

import { ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

type Skill       = { id: string; name: string };
type ProjectSkill = { skill: Skill };
type Project = {
  id: string; title: string; description: string;
  thumbnail?: string | null; url?: string | null;
  featured: boolean; projectSkills: ProjectSkill[];
};
type Props = { projects: Project[] };

const GITHUB_URL = "https://github.com/Bagasprbw";

export function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d-alt" style={{ width: 220, height: 220, top: "15%", right: "-50px", animationDelay: "1s" }} />
        <div className="sphere-3d" style={{ width: 160, height: 160, bottom: "10%", left: "-40px", animationDelay: "3s" }} />
        <div className="sphere-3d" style={{ width: 80, height: 80, top: "50%", right: "20%", animationDelay: "5s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Portfolio</span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily:"var(--font-heading)" }}>
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Real-world applications I&apos;ve designed, built, and shipped.
            </p>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <p className="text-center text-slate-500">No projects yet.</p>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-7 mb-14">
            {projects.map(p => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p}/>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn direction="up">
          <div className="text-center">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"
              className="btn-sky animate-bounce-gentle inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm">
              More on GitHub <ArrowRight size={15}/>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col min-h-full group relative">
      {/* Top shimmer line */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none z-10"/>

      {/* Thumbnail */}
      <div className="relative overflow-hidden h-52 shrink-0 bg-slate-900">
        {project.thumbnail ? (
          <>
            <img src={project.thumbnail} alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"; }}/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/80 to-transparent"/>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 bg-white/10 border border-white/20">
                <ExternalLink size={22} className="text-white"/>
              </div>
              <span className="text-slate-400 text-xs font-semibold">No Preview</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full shadow-lg text-black bg-white">
              <ArrowUpRight size={13}/> View Live
            </span>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-[17px] font-bold text-white leading-snug group-hover:text-slate-200 transition-colors duration-300"
          style={{ fontFamily:"var(--font-heading)" }}>
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1 overflow-y-auto custom-scrollbar pr-1">
          {project.description}
        </p>

        {project.projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.projectSkills.slice(0, 5).map(ps => (
              <span key={ps.skill.id} className="chip px-2.5 py-0.5 rounded-lg text-[10px]">
                {ps.skill.name}
              </span>
            ))}
            {project.projectSkills.length > 5 && (
              <span className="chip px-2.5 py-0.5 rounded-lg text-[10px] text-slate-500">
                +{project.projectSkills.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
