import { Code2, Heart, Lightbulb, Zap } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "I write readable, maintainable code following best practices and design patterns.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "I optimize for speed and efficiency, ensuring buttery smooth user experiences.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "I approach every challenge with creative thinking and analytical mindset.",
  },
  {
    icon: Heart,
    title: "Passionate",
    description: "I genuinely love what I do and constantly keep up with the latest in tech.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – text */}
          <div className="space-y-5">
            <p className="text-muted-foreground leading-relaxed text-base">
              I'm <strong className="text-foreground font-semibold">Bagas Prabowo</strong>, a Full Stack Developer based in Indonesia. I specialize in building modern web applications from concept to deployment using cutting-edge technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              My journey started with a curiosity about how websites work, which quickly grew into a passion for creating seamless digital experiences. I love bridging the gap between beautiful design and reliable backend systems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              When I'm not coding, I enjoy exploring new frameworks, contributing to open-source projects, and continuously leveling up my skills.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-muted/50 text-sm font-semibold hover:bg-muted transition-all"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right – value cards */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-5 rounded-2xl border border-border bg-card hover:bg-muted/30 hover:border-primary/30 transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
