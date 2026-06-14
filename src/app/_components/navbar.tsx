"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experiences", href: "#experiences", id: "experiences" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    // Track which sections are currently visible and their ratios
    const visibleSections = new Map<string, number>();

    const pickActive = () => {
      if (visibleSections.size === 0) return;
      // Pick section with highest intersection ratio
      let best = "";
      let bestRatio = 0;
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      if (best) setActiveSection(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
          pickActive();
        },
        { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1.0], rootMargin: "-80px 0px -20% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Update sliding indicator position when activeSection changes
  useEffect(() => {
    if (!activeSection || !navRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const anchor = linkRefs.current.get(activeSection);
    const navEl = navRef.current;
    if (!anchor || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    setIndicatorStyle({
      left: anchorRect.left - navRect.left,
      width: anchorRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 size={16} className="text-primary-foreground" />
          </div>
          <span>Bagas Prabowo</span>
        </Link>

        {/* Desktop nav */}
        <ul ref={navRef} className="hidden md:flex items-center gap-1 relative">
          {/* Sliding underline indicator */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 h-0.5 rounded-full bg-primary pointer-events-none"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
              transition:
                "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.id, el);
                    else linkRefs.current.delete(link.id);
                  }}
                  href={link.href}
                  className={`relative z-10 inline-flex items-center px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — animated slide-down */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: mobileOpen ? "400px" : "0px", opacity: mobileOpen ? 1 : 0 }}
      >
        <div className="bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`relative py-2.5 px-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {/* Mobile underline */}
                <span
                  className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `scaleX(${isActive ? 1 : 0})`,
                    transformOrigin: "left",
                    transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors mt-2"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
