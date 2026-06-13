import { SkillIcon } from "@/app/dashboard/skills/_components/skill-icon";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

type Skill = {
  id: string;
  name: string;
  icon?: string | null;
};

type Category = {
  id: string;
  name: string;
  skills: Skill[];
};

type Props = {
  categories: Category[];
};

export function SkillsSection({ categories }: Props) {
  const allSkillsCount = categories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );

  const filledCategories = categories.filter((c) => c.skills.length > 0);

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Skills & Technologies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              What I Work With
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              {allSkillsCount} technologies across {filledCategories.length}{" "}
              categories — constantly growing.
            </p>
          </div>
        </FadeIn>

        {filledCategories.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No skills added yet.
          </p>
        ) : (
          <div className="space-y-10">
            {filledCategories.map((category, idx) => (
              <FadeIn key={category.id} delay={idx * 0.1}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {category.skills.length}
                  </span>
                </div>

                {/* Skills grid */}
                <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.id}>
                      <div
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-muted/50 hover:shadow-md hover:-translate-y-1 transition-all cursor-default h-full"
                      >
                        <SkillIcon
                          icon={skill.icon}
                          name={skill.name}
                          className="w-9 h-9 flex items-center justify-center shrink-0"
                        />
                        <span className="text-[10px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight line-clamp-2">
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
