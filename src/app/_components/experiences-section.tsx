import { Calendar, MapPin, Building2 } from "lucide-react";
import { FadeIn } from "./scroll-animation";

type Skill = { id: string; name: string };
type ExperienceSkill = { skill: Skill };
type Experience = {
  id: string; company: string; position: string; employmentType: string;
  location?: string | null; startDate: string; endDate?: string | null;
  isCurrent: boolean; description: string; experienceSkills: ExperienceSkill[];
};
type Props = { experiences: Experience[] };

const fmtDate = (d: string) => {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "N/A";
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
};

export function ExperiencesSection({ experiences }: Props) {
  return (
    <section id="experiences" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d" style={{ width: 170, height: 170, top: "25%", left: "-30px", animationDelay: "2s" }} />
        <div className="sphere-3d-alt" style={{ width: 120, height: 120, bottom: "15%", right: "-20px", animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Work History</span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily:"var(--font-heading)" }}>
              Experience
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              My professional journey and roles where I&apos;ve made an impact.
            </p>
          </div>
        </FadeIn>

        {experiences.length === 0 ? (
          <p className="text-center text-slate-500">No experience entries yet.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"/>

            <div className="space-y-8">
              {experiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <FadeIn key={exp.id} direction={isLeft?"left":"right"} delay={idx*0.07}
                    className={`relative flex gap-6 sm:gap-0 ${isLeft?"sm:flex-row":"sm:flex-row-reverse"}`}>

                    {/* Dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                      <div className="timeline-dot"/>
                    </div>

                    <div className="hidden sm:block flex-1"/>

                    <div className={`flex-1 sm:max-w-[calc(50%-2rem)] ${isLeft?"sm:pr-8":"sm:pl-8"}`}>
                      <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                        {/* Top shine */}
                        <div className="absolute top-0 inset-x-0 h-px bg-white/30"/>

                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-bold text-white leading-tight" style={{ fontFamily:"var(--font-heading)" }}>
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Building2 size={13} className="text-slate-300"/>
                              <span className="text-sm font-medium text-slate-400">{exp.company}</span>
                            </div>
                          </div>
                          <span className="chip shrink-0 px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap">
                            {exp.employmentType}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={11} className="text-slate-300"/>
                            <span>
                              {fmtDate(exp.startDate)} –{" "}
                              {exp.isCurrent
                                ? <strong className="text-white">Present</strong>
                                : exp.endDate ? fmtDate(exp.endDate) : "N/A"}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={11} className="text-slate-300"/>
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed mb-4">{exp.description}</p>

                        {exp.experienceSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {exp.experienceSkills.map(es => (
                              <span key={es.skill.id} className="chip px-2.5 py-0.5 rounded-lg text-[10px]">
                                {es.skill.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
