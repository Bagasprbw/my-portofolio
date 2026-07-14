"use client";

import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";

interface SkillIconProps {
  icon?: string | null;
  name: string;
  className?: string;
}

// Map of common skill names to their Devicon paths
const DEVICON_MAP: Record<string, string> = {
  "react": "react/react-original.svg",
  "reactjs": "react/react-original.svg",
  "react.js": "react/react-original.svg",
  "nextjs": "nextjs/nextjs-original.svg",
  "next.js": "nextjs/nextjs-original.svg",
  "next": "nextjs/nextjs-original.svg",
  "vue": "vuejs/vuejs-original.svg",
  "vuejs": "vuejs/vuejs-original.svg",
  "vue.js": "vuejs/vuejs-original.svg",
  "angular": "angularjs/angularjs-original.svg",
  "angularjs": "angularjs/angularjs-original.svg",
  "nodejs": "nodejs/nodejs-original.svg",
  "node.js": "nodejs/nodejs-original.svg",
  "node": "nodejs/nodejs-original.svg",
  "typescript": "typescript/typescript-original.svg",
  "ts": "typescript/typescript-original.svg",
  "javascript": "javascript/javascript-original.svg",
  "js": "javascript/javascript-original.svg",
  "html": "html5/html5-original.svg",
  "html5": "html5/html5-original.svg",
  "css": "css3/css3-original.svg",
  "css3": "css3/css3-original.svg",
  "tailwind": "tailwindcss/tailwindcss-original.svg",
  "tailwindcss": "tailwindcss/tailwindcss-original.svg",
  "bootstrap": "bootstrap/bootstrap-original.svg",
  "sass": "sass/sass-original.svg",
  "git": "git/git-original.svg",
  "github": "github/github-original.svg",
  "docker": "docker/docker-original.svg",
  "mysql": "mysql/mysql-original.svg",
  "postgresql": "postgresql/postgresql-original.svg",
  "postgres": "postgresql/postgresql-original.svg",
  "mongodb": "mongodb/mongodb-original.svg",
  "mongo": "mongodb/mongodb-original.svg",
  "laravel": "laravel/laravel-original.svg",
  "php": "php/php-original.svg",
  "python": "python/python-original.svg",
  "java": "java/java-original.svg",
  "go": "go/go-original.svg",
  "golang": "go/go-original.svg",
  "csharp": "csharp/csharp-original.svg",
  "c++": "cplusplus/cplusplus-original.svg",
  "c": "c/c-original.svg",
  "ruby": "ruby/ruby-original.svg",
  "rails": "rails/rails-original.svg",
  "swift": "swift/swift-original.svg",
  "kotlin": "kotlin/kotlin-original.svg",
  "flutter": "flutter/flutter-original.svg",
  "dart": "dart/dart-original.svg",
  "figma": "figma/figma-original.svg",
  "redux": "redux/redux-original.svg",
  "graphql": "graphql/graphql-plain.svg",
  "firebase": "firebase/firebase-original.svg",
  "aws": "amazonwebservices/amazonwebservices-original-wordmark.svg",
  "vercel": "vercel/vercel-original.svg",
  "prisma": "prisma/prisma-original.svg",
  "drizzle": "drizzle/drizzle-original.svg",
  "laragon": "https://laragon.org/logo.svg",
  "xampp": "https://www.svgrepo.com/show/354562/xampp.svg",
  "inertia": "https://cdn.jsdelivr.net/npm/@thesvg/icons/icons/inertia.svg",
  "inertiajs": "https://cdn.jsdelivr.net/npm/@thesvg/icons/icons/inertia.svg",
  "inertia.js": "https://cdn.jsdelivr.net/npm/@thesvg/icons/icons/inertia.svg",
};

function getDeviconUrl(skillName: string): string {
  const cleanName = skillName.toLowerCase().trim();
  
  // 1. Check direct mapping
  if (DEVICON_MAP[cleanName]) {
    if (DEVICON_MAP[cleanName].startsWith("http")) {
      return DEVICON_MAP[cleanName];
    }
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${DEVICON_MAP[cleanName]}`;
  }

  // 2. Normalize and check direct mapping again (e.g. "React Native" -> "reactnative" or "react")
  const normalized = cleanName
    .replace(/\.js$/, "")
    .replace(/js$/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  if (DEVICON_MAP[normalized]) {
    if (DEVICON_MAP[normalized].startsWith("http")) {
      return DEVICON_MAP[normalized];
    }
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${DEVICON_MAP[normalized]}`;
  }

  // 3. Dynamic guess fallback
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${normalized}/${normalized}-original.svg`;
}

// Simple check to distinguish emojis from words/URLs
function isEmoji(str: string): boolean {
  return !/[a-zA-Z0-9]/.test(str);
}

export function SkillIcon({ icon, name, className = "w-8 h-8 flex items-center justify-center shrink-0" }: SkillIconProps) {
  const trimmed = icon?.trim() || "";

  const [renderStage, setRenderStage] = useState<"custom" | "devicon" | "initial">(() => {
    const isUrl = trimmed.startsWith("http") || trimmed.startsWith("/");
    const isSvg = trimmed.startsWith("<svg");
    const isCustomEmoji = trimmed && isEmoji(trimmed) && trimmed.length <= 4;

    if (isUrl || isSvg || isCustomEmoji) {
      return "custom";
    }
    return "devicon";
  });

  useEffect(() => {
    const isUrl = trimmed.startsWith("http") || trimmed.startsWith("/");
    const isSvg = trimmed.startsWith("<svg");
    const isCustomEmoji = trimmed && isEmoji(trimmed) && trimmed.length <= 4;

    if (isUrl || isSvg || isCustomEmoji) {
      setRenderStage("custom");
    } else {
      setRenderStage("devicon");
    }
  }, [trimmed]);

  // Render stage: custom (if user provided a valid url/path)
  if (renderStage === "custom") {
    if (trimmed.startsWith("http") || trimmed.startsWith("/")) {
      return (
        <img
          src={trimmed}
          alt={name}
          className={`${className} object-contain rounded`}
          onError={() => setRenderStage("devicon")} // If user link fails, switch to devicon
        />
      );
    }

    if (trimmed.startsWith("<svg")) {
      return (
        <div 
          className={`${className} overflow-hidden [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain`}
          dangerouslySetInnerHTML={{ __html: trimmed }}
        />
      );
    }

    if (trimmed.length <= 4) {
      return (
        <div className={`${className} text-xl select-none`}>
          {trimmed}
        </div>
      );
    }
  }

  // Render stage: Devicon (from CDN based on name or custom text input)
  if (renderStage === "devicon") {
    // If user typed a plain word (like "java" or "react") in the icon field, use it. Otherwise use the skill name.
    const isWord = trimmed && !isEmoji(trimmed) && !trimmed.startsWith("http") && !trimmed.startsWith("/");
    const searchName = isWord ? trimmed : name;
    const deviconUrl = getDeviconUrl(searchName);

    return (
      <img
        src={deviconUrl}
        alt={name}
        className={`${className} object-contain rounded`}
        onError={() => setRenderStage("initial")} // If devicon also fails, show initial
      />
    );
  }

  // Final fallback stage: Initial Letter
  return (
    <div className={`${className} rounded bg-primary/10 text-primary font-bold text-sm uppercase`}>
      {name.charAt(0)}
    </div>
  );
}
