import { Calendar, MapPin, Building2 } from "lucide-react";
import { FadeIn } from "./scroll-animation";

type Skill = {
  id: string;
  name: string;
};

type ExperienceSkill = {
  skill: Skill;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  experienceSkills: ExperienceSkill[];
};

type Props = {
  experiences: Experience[];
};

export function ExperiencesSection({ experiences }: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "N/A";
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  };

  return (
    <section id="experiences" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Work History
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Experience
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              My professional journey and the roles where I've made an impact.
            </p>
          </div>
        </FadeIn>

        {experiences.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No experience entries yet.
          </p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block" />

            <div className="space-y-8">
              {experiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <FadeIn
                    key={exp.id}
                    direction={isLeft ? "left" : "right"}
                    delay={idx * 0.1}
                    className={`relative flex gap-6 sm:gap-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-5 z-10">
                      <div className="w-4 h-4 rounded-full border-2 border-primary bg-background shadow-sm" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden sm:block flex-1" />

                    {/* Card */}
                    <div
                      className={`flex-1 sm:max-w-[calc(50%-2rem)] ${
                        isLeft ? "sm:pr-8" : "sm:pl-8"
                      }`}
                    >
                      <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-bold text-foreground leading-tight">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Building2 size={13} className="text-primary shrink-0" />
                              <span className="text-sm font-medium text-muted-foreground">
                                {exp.company}
                              </span>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">
                            {exp.employmentType}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-primary" />
                            <span>
                              {formatDate(exp.startDate)} –{" "}
                              {exp.isCurrent ? (
                                <strong className="text-primary">Present</strong>
                              ) : exp.endDate ? (
                                formatDate(exp.endDate)
                              ) : (
                                "N/A"
                              )}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={12} className="text-primary" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Skills */}
                        {exp.experienceSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {exp.experienceSkills.map((es) => (
                              <span
                                key={es.skill.id}
                                className="inline-flex items-center rounded-md bg-muted border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
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
