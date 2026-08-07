import { Code2, Heart, Lightbulb, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

const values = [
  { icon: Code2,     title: "Clean Code",     desc: "Readable, maintainable code following best practices & design patterns." },
  { icon: Zap,       title: "Performance",    desc: "Optimizing for speed and efficiency — buttery smooth user experiences." },
  { icon: Lightbulb, title: "Problem Solver", desc: "Creative thinking meets analytical mindset to tackle any challenge." },
  { icon: Heart,     title: "Passionate",     desc: "Genuinely love building products and staying ahead of the tech curve." },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d-alt" style={{ width: 200, height: 200, top: "10%", right: "-40px", animationDelay: "1s" }} />
        <div className="sphere-3d" style={{ width: 140, height: 140, bottom: "15%", left: "-30px", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">About Me</span>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily:"var(--font-heading)" }}>
              Who I Am
            </h2>
          </div>
        </FadeIn>

        {/* ── 1 Single Card Left + 4 Cards Right (2x2 Grid) ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT — 1 Single Bio Card */}
          <FadeIn direction="right" className="lg:col-span-6 flex">
            <div className="glass-card rounded-3xl p-8 flex flex-col justify-between h-full w-full relative overflow-hidden">
              {/* Top shimmer line */}
              <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none"/>

              <div className="space-y-5">
                <p className="text-slate-300 leading-relaxed text-[15px]">
                  I&apos;m <strong className="text-white font-semibold">Bagas Prabowo</strong>, a Full Stack Developer with a strong focus on backend development. I build modern, scalable, and maintainable web applications using <strong className="text-white">Laravel</strong>, <strong className="text-white">Vue.js</strong>, <strong className="text-white">React.js</strong>, <strong className="text-white">Next.js</strong>, <strong className="text-white">Express.js</strong>, and <strong className="text-white">Go</strong>.
                </p>

                <p className="text-slate-300 leading-relaxed text-[15px]">
                  Beyond development, my expertise includes system analysis, requirements gathering, system architecture, and database design. I enjoy translating business requirements into scalable and maintainable software solutions while continuously improving my software engineering skills.
                </p>
              </div>

              {/* CTA Buttons at bottom */}
              <div className="flex flex-wrap gap-3 mt-8 pt-4">
                <a href="/Bagas Prabowo_CV_FullStack Developer.pdf" target="_blank" rel="noreferrer"
                  className="btn-sky inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm">
                  Download CV
                </a>
                <a href="#contact" className="btn-ghost inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm">
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — 4 Cards in 2x2 Grid */}
          <StaggerContainer className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-white/20 pointer-events-none"/>
                    <div>
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-white/10 border border-white/20 text-white">
                        <Icon size={20} />
                      </div>
                      <p className="font-bold text-base text-white mb-2" style={{ fontFamily:"var(--font-heading)" }}>
                        {v.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
