import { SkillIcon } from "@/app/dashboard/skills/_components/skill-icon";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

type Skill    = { id: string; name: string; icon?: string | null };
type Category = { id: string; name: string; skills: Skill[] };
type Props    = { categories: Category[] };

export function SkillsSection({ categories }: Props) {
  const allCount   = categories.reduce((n, c) => n + c.skills.length, 0);
  const filled     = categories.filter(c => c.skills.length > 0);

  return (
    <section id="skills" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d" style={{ width: 180, height: 180, top: "20%", left: "-40px", animationDelay: "2s" }} />
        <div className="sphere-3d-alt" style={{ width: 130, height: 130, bottom: "10%", right: "5%", animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Skills &amp; Tech</span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily:"var(--font-heading)" }}>
              What I Work With
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              {allCount} technologies across {filled.length} categories — always expanding.
            </p>
          </div>
        </FadeIn>

        {filled.length === 0 ? (
          <p className="text-center text-slate-500">No skills added yet.</p>
        ) : (
          <div className="space-y-12">
            {filled.map((cat, idx) => (
              <FadeIn key={cat.id} delay={idx * 0.07}>
                {/* Category row header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="chip px-3.5 py-1 rounded-xl text-xs shrink-0" style={{ fontFamily:"var(--font-heading)" }}>
                    {cat.name}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-slate-400 font-semibold tabular-nums">{cat.skills.length}</span>
                </div>

                <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {cat.skills.map(skill => (
                    <StaggerItem key={skill.id}>
                      <div className="skill-tile group flex flex-col items-center gap-2 p-3.5 rounded-2xl cursor-default h-full">
                        <SkillIcon icon={skill.icon} name={skill.name} className="w-9 h-9 flex items-center justify-center shrink-0"/>
                        <span className="text-[10px] font-semibold text-center text-slate-300 group-hover:text-white transition-colors leading-tight line-clamp-2">
                          {skill.name}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
