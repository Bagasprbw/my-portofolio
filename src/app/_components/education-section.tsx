import { Calendar, GraduationCap } from "lucide-react";
import { FadeIn } from "./scroll-animation";

type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  gpa?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
};

type Props = {
  educations: Education[];
};

export function EducationSection({ educations }: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "N/A";
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  };

  if (educations.length === 0) return null;

  return (
    <section id="education" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Academic Background
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Education
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              My formal education and academic journey.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8">
            {educations.map((edu, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <FadeIn
                  key={edu.id}
                  direction={isLeft ? "left" : "right"}
                  delay={idx * 0.1}
                  className={`relative flex gap-6 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-5 z-10">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-background shadow-sm" />
                  </div>

                  <div className="hidden sm:block flex-1" />

                  <div
                    className={`flex-1 sm:max-w-[calc(50%-2rem)] ${
                      isLeft ? "sm:pr-8" : "sm:pl-8"
                    }`}
                  >
                    <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap size={20} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-foreground leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-sm font-medium text-muted-foreground mt-0.5">
                            {edu.institution}
                          </p>
                        </div>
                      </div>

                      {edu.fieldOfStudy && (
                        <p className="text-xs text-muted-foreground font-medium mb-3">
                          {edu.fieldOfStudy}
                        </p>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-3">
                        <Calendar size={12} className="text-primary shrink-0" />
                        <span>
                          {formatDate(edu.startDate)} –{" "}
                          {edu.isCurrent ? (
                            <strong className="text-primary">Present</strong>
                          ) : edu.endDate ? (
                            formatDate(edu.endDate)
                          ) : (
                            "N/A"
                          )}
                        </span>
                      </div>

                      {edu.gpa && (
                        <p className="text-xs font-semibold text-primary mb-2">
                          {edu.isCurrent ? "Current GPA" : "GPA"}: {edu.gpa}
                        </p>
                      )}

                      {edu.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
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
