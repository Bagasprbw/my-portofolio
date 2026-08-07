"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",       href: "#about",       id: "about"       },
  { label: "Skills",      href: "#skills",      id: "skills"      },
  { label: "Projects",    href: "#projects",    id: "projects"    },
  { label: "GitHub",      href: "#github",      id: "github"      },
  { label: "Experience",  href: "#experiences", id: "experiences" },
  { label: "Contact",     href: "#contact",     id: "contact"     },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef   = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visibleSections = new Map<string, number>();
    const observers: IntersectionObserver[] = [];
    const pickActive = () => {
      let best = "", bestRatio = 0;
      visibleSections.forEach((r, id) => { if (r > bestRatio) { bestRatio = r; best = id; } });
      if (best) setActiveSection(best);
    };
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { e.isIntersecting ? visibleSections.set(id, e.intersectionRatio) : visibleSections.delete(id); pickActive(); },
        { threshold: [0,.15,.3,.5,.75,1], rootMargin: "-80px 0px -20% 0px" }
      );
      obs.observe(el); observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    if (!activeSection || !navRef.current) { setIndicatorStyle(p => ({ ...p, opacity: 0 })); return; }
    const anchor = linkRefs.current.get(activeSection);
    const navEl  = navRef.current;
    if (!anchor || !navEl) return;
    const nR = navEl.getBoundingClientRect(), aR = anchor.getBoundingClientRect();
    setIndicatorStyle({ left: aR.left - nR.left, width: aR.width, opacity: 1 });
  }, [activeSection]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav" : "bg-transparent"}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-lg bg-white/10 border border-white/20">
            <img src="/Icon.png" alt="Logo" className="w-5.5 h-5.5 object-contain" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white hidden sm:block" style={{ fontFamily:"var(--font-heading)" }}>
            Bagas Prabowo
          </span>
        </Link>

        {/* Desktop nav */}
        <ul ref={navRef} className="hidden md:flex items-center gap-0.5 relative">
          <span aria-hidden className="absolute bottom-0 h-[2px] rounded-full pointer-events-none bg-white"
            style={{
              left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity,
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
              transition: "left .35s cubic-bezier(.4,0,.2,1),width .35s cubic-bezier(.4,0,.2,1),opacity .25s ease",
            }} />
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a ref={el => { if(el) linkRefs.current.set(link.id,el); else linkRefs.current.delete(link.id); }}
                  href={link.href}
                  className={`relative z-10 inline-flex items-center px-3.5 py-1.5 text-sm rounded-xl transition-all duration-200 font-medium ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`} style={{ fontFamily:"var(--font-heading)" }}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="btn-sky inline-flex items-center px-5 py-2 rounded-xl text-sm">Hire Me</a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu"
          className="md:hidden p-2 rounded-xl glass transition-all hover:scale-105 text-white">
          {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? "360px" : "0", opacity: mobileOpen ? 1 : 0 }}>
        <div className="px-6 py-4 space-y-1 bg-[#0b0c0e]/90 backdrop-blur-2xl border-b border-white/10">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className={`block py-2.5 px-3 text-sm font-medium rounded-xl transition-all ${
                activeSection===link.id ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`} style={{ fontFamily:"var(--font-heading)" }}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            className="btn-sky block w-full text-center px-4 py-2.5 rounded-xl text-sm mt-2">
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
