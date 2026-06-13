import { Mail, Code2, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          {/* Left – CTA */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              I'm always open to interesting conversations, collaborations, and
              new opportunities. Drop me a message!
            </p>
          </div>

          {/* Right – contact */}
          <div className="space-y-4">
            <a
              href="mailto:bagasprabowo2412@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/40 hover:bg-muted/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Email me at</p>
                <p className="text-sm font-semibold text-foreground">
                  bagasprabowo2412@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://github.com/bagaspra16"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/40 hover:bg-muted/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GithubIcon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Find me on GitHub</p>
                <p className="text-sm font-semibold text-foreground">
                  github.com/bagaspra16
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/bagas-prabowo"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/40 hover:bg-muted/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <LinkedinIcon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Connect on LinkedIn</p>
                <p className="text-sm font-semibold text-foreground">
                  linkedin.com/in/bagas-prabowo
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 size={13} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">Bagas Prabowo</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {year} Bagas Prabowo. Built with Next.js & ❤️.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
