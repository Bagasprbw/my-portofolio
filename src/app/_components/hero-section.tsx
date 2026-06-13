"use client";

import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for work
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          Hi, I'm{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Bagas Prabowo
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-blue-500 to-violet-500 rounded-full opacity-50" />
          </span>
        </h1>

        {/* Sub heading */}
        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
          Full Stack Developer
        </p>

        {/* Description */}
        <p className="max-w-xl mx-auto text-base text-muted-foreground leading-relaxed mb-10">
          I build beautiful, performant, and scalable web applications with
          modern technologies. Turning ideas into elegant digital experiences.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm font-semibold hover:bg-muted transition-all hover:scale-105"
          >
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/bagaspra16"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:bg-muted hover:scale-110 transition-all text-muted-foreground hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/bagas-prabowo"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:bg-muted hover:scale-110 transition-all text-muted-foreground hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:bagasprabowo2412@gmail.com"
            className="p-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:bg-muted hover:scale-110 transition-all text-muted-foreground hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs font-medium">Scroll down</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
