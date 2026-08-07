import { Mail, ArrowUp, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { FadeIn } from "./scroll-animation";

const contacts = [
  { href:"mailto:bagasprabowo2412@gmail.com", label:"Email me at", value:"bagasprabowo2412@gmail.com",
    icon:<Mail size={18}/>, external:false },
  { href:"https://github.com/Bagasprbw", label:"Find me on GitHub", value:"github.com/Bagasprbw",
    icon:<GithubIcon size={18}/>, external:true },
  { href:"https://www.linkedin.com/in/bagas-prabowo-367932340", label:"Connect on LinkedIn", value:"linkedin.com/in/bagas-prabowo",
    icon:<LinkedinIcon size={18}/>, external:true },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative overflow-hidden landing-bg border-t border-white/10">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d" style={{ width: 220, height: 220, bottom: "-60px", left: "-40px", animationDelay: "0s" }} />
        <div className="sphere-3d-alt" style={{ width: 140, height: 140, top: "10%", right: "5%", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* CTA headline + contact grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">

          {/* Left */}
          <FadeIn direction="right">
            <span className="section-badge mb-5 inline-flex">Contact</span>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily:"var(--font-heading)" }}>
              Let&apos;s build something{" "}
              <span className="gradient-text">extraordinary</span>{" "}together
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-7">
              I&apos;m open to interesting conversations, collaborations, and new opportunities. Let&apos;s connect!
            </p>
            <a href="mailto:bagasprabowo2412@gmail.com"
              className="btn-sky inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm">
              Send me a message <ArrowRight size={15}/>
            </a>
          </FadeIn>

          {/* Right — contact cards */}
          <FadeIn direction="left">
            <div className="space-y-4">
              {contacts.map(c => (
                <a key={c.href} href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="glass-card group flex items-center gap-4 p-4 rounded-2xl">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 bg-white/10 border border-white/20 text-white">
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-400 font-medium">{c.label}</p>
                    <p className="text-sm font-semibold text-white truncate">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/10 border border-white/20">
              <img src="/Icon.png" alt="Logo" className="w-5 h-5 object-contain"/>
            </div>
            <span className="font-bold text-sm text-white" style={{ fontFamily:"var(--font-heading)" }}>Bagas Prabowo</span>
          </div>

          <p className="text-xs text-slate-400">
            © {year} Bagas Prabowo. Built with Next.js &amp; ❤️
          </p>

          <a href="#hero" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors group" style={{ fontFamily:"var(--font-heading)" }}>
            Back to top <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform"/>
          </a>
        </div>
      </div>
    </footer>
  );
}
