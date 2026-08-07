import { Calendar, GraduationCap } from "lucide-react";
import { FadeIn } from "./scroll-animation";

type Education = {
  id: string; institution: string; degree: string;
  fieldOfStudy?: string | null; gpa?: string | null;
  startDate: string; endDate?: string | null;
  isCurrent: boolean; description?: string | null;
};
type Props = { educations: Education[] };

const fmtDate = (d: string) => {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "N/A";
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
};

export function EducationSection({ educations }: Props) {
  if (educations.length === 0) return null;

  return (
    <section id="education" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d-alt" style={{ width: 150, height: 150, top: "20%", right: "-30px", animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Academic Background</span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily:"var(--font-heading)" }}>
              Education
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">My formal education and academic journey.</p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"/>

          <div className="space-y-8">
            {educations.map((edu, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <FadeIn key={edu.id} direction={isLeft?"left":"right"} delay={idx*0.07}
                  className={`relative flex gap-6 sm:gap-0 ${isLeft?"sm:flex-row":"sm:flex-row-reverse"}`}>

                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                    <div className="timeline-dot"/>
                  </div>
                  <div className="hidden sm:block flex-1"/>

                  <div className={`flex-1 sm:max-w-[calc(50%-2rem)] ${isLeft?"sm:pr-8":"sm:pl-8"}`}>
                    <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-white/30"/>

                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 border border-white/20">
                          <GraduationCap size={20} className="text-white"/>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white leading-tight" style={{ fontFamily:"var(--font-heading)" }}>
                            {edu.degree}
                          </h3>
                          <p className="text-sm font-medium text-slate-400 mt-0.5">{edu.institution}</p>
                        </div>
                      </div>

                      {edu.fieldOfStudy && (
                        <p className="text-xs text-slate-400 font-medium mb-3">{edu.fieldOfStudy}</p>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
                        <Calendar size={11} className="text-slate-300"/>
                        <span>
                          {fmtDate(edu.startDate)} –{" "}
                          {edu.isCurrent
                            ? <strong className="text-white">Present</strong>
                            : edu.endDate ? fmtDate(edu.endDate) : "N/A"}
                        </span>
                      </div>

                      {edu.gpa && (
                        <p className="text-xs font-bold mb-2 text-white">
                          {edu.isCurrent ? "Current GPA" : "GPA"}: {edu.gpa}
                        </p>
                      )}

                      {edu.description && (
                        <p className="text-sm text-slate-300 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
