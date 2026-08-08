"use client";

import { ArrowRight, Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { FadeIn } from "./scroll-animation";

const stats = [
  { value: "7+",  label: "Months Experience" },
  { value: "7+", label: "Projects Built"   },
  { value: "8+",  label: "Tech Mastered"    },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES (BOLA-BOLA CHROMIUM) BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large sphere top-left */}
        <div className="sphere-3d" style={{ width: 280, height: 280, top: "-40px", left: "-60px", animationDelay: "0s" }} />

        {/* Medium sphere top-right (behind glass card) */}
        <div className="sphere-3d-alt" style={{ width: 220, height: 220, top: "12%", right: "12%", animationDelay: "2s" }} />

        {/* Medium-large sphere right-center */}
        <div className="sphere-3d" style={{ width: 260, height: 260, top: "50%", right: "-80px", animationDelay: "4s" }} />

        {/* Small floating sphere left-center */}
        <div className="sphere-3d-alt" style={{ width: 110, height: 110, top: "45%", left: "4%", animationDelay: "1s" }} />

        {/* Small sphere bottom-center */}
        <div className="sphere-3d" style={{ width: 90, height: 90, bottom: "12%", left: "38%", animationDelay: "3s" }} />

        {/* Tiny floating sphere bottom-right */}
        <div className="sphere-3d-alt" style={{ width: 65, height: 65, bottom: "25%", right: "30%", animationDelay: "5s" }} />

        {/* Subtle dot overlay */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* ── Content — split layout ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div className="space-y-7">
            {/* Badge */}
            <FadeIn delay={0.1}>
              <span className="section-badge">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                Available for hire
              </span>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white" style={{ fontFamily:"var(--font-heading)" }}>
                Hi, I'm <br />{" "}
                <span className="gradient-text">Bagas Prabowo</span>
              </h1>
            </FadeIn>

            {/* Sub */}
            <FadeIn delay={0.3}>
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                As &apos;a <strong className="text-white font-semibold">Full Stack Developer</strong>, I build scalable web applications and robust backend systems that solve real business problems.
              </p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="btn-sky inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm">
                  See My Work <ArrowRight size={15}/>
                </a>
                <a href="/Bagas Prabowo_CV_FullStack Developer.pdf" target="_blank" rel="noreferrer"
                  className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm">
                  <Download size={15}/> Download CV
                </a>
              </div>
            </FadeIn>

            {/* Social + divider */}
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-5 pt-2">
                <div className="h-px w-8 bg-white/20"/>
                <div className="flex gap-3">
                  {[
                    { href:"https://github.com/Bagasprbw", label:"GitHub",   icon:<GithubIcon size={18}/> },
                    { href:"https://www.linkedin.com/in/bagas-prabowo-367932340", label:"LinkedIn", icon:<LinkedinIcon size={18}/> },
                    { href:"mailto:bagasprabowo2412@gmail.com", label:"Email", icon:<Mail size={18}/> },
                  ].map(s => (
                    <a key={s.label} href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      className="glass-card p-3 rounded-xl text-slate-300 hover:text-white transition-colors" aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — dark glass panel with metallic sphere background preview */}
          <FadeIn delay={0.35} direction="left">
            <div className="relative flex flex-col gap-4">

              {/* Main glass card */}
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                {/* Inner top highlight streak */}
                <div className="absolute top-0 left-6 right-6 h-px bg-white/30"/>

                <p className="text-xs font-semibold text-slate-300 mb-5 uppercase tracking-widest" style={{ fontFamily:"var(--font-heading)" }}>
                  At a glance
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-7">
                  {stats.map(s => (
                    <div key={s.label} className="text-center">
                      <p className="stat-number">{s.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack pill row */}
                <p className="text-xs text-slate-400 mb-3 font-medium">Currently working with</p>
                <div className="flex flex-wrap gap-2">
                  {["Laravel","Vue.js","React.js","Next.js","FastAPI","Docker"].map(tech => (
                    <span key={tech} className="chip px-3 py-1 rounded-lg text-[11px]">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Small floating glass chips */}
              <div className="flex gap-3">
                <div className="glass-card flex-1 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10 text-white">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white" style={{ fontFamily:"var(--font-heading)" }}>Full Stack</p>
                    <p className="text-[10px] text-slate-400">End-to-end dev</p>
                  </div>
                </div>
                <div className="glass-card flex-1 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10 text-white">
                    <span className="text-lg">✨ </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white" style={{ fontFamily:"var(--font-heading)" }}>Clean Code</p>
                    <p className="text-[10px] text-slate-400">Maintainable apps</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="mouse-scroll"><div className="mouse-scroll-dot"/></div>
        <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Scroll</p>
      </div>
    </section>
  );
}
