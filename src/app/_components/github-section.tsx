"use client";

import { useEffect, useState } from "react";
import { GitCommit, Users, BookOpen, ExternalLink, Activity } from "lucide-react";
import { GithubIcon } from "./brand-icons";
import { FadeIn, StaggerContainer, StaggerItem } from "./scroll-animation";

type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
    action?: string;
  };
  created_at: string;
};

export function GithubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [resUser, resEvents] = await Promise.all([
          fetch("https://api.github.com/users/Bagasprbw"),
          fetch("https://api.github.com/users/Bagasprbw/events?per_page=6"),
        ]);

        if (resUser.ok) {
          const userData = await resUser.json();
          setUser(userData);
        }

        if (resEvents.ok) {
          const eventsData = await resEvents.json();
          setEvents(eventsData);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const formatEventMessage = (evt: GitHubEvent) => {
    if (evt.type === "PushEvent" && evt.payload.commits?.length) {
      return evt.payload.commits[0].message;
    }
    if (evt.type === "CreateEvent") {
      return `Created repository ${evt.repo.name.split("/")[1] || evt.repo.name}`;
    }
    if (evt.type === "WatchEvent") {
      return `Starred ${evt.repo.name}`;
    }
    return `Activity on ${evt.repo.name.split("/")[1] || evt.repo.name}`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section id="github" className="py-28 relative overflow-hidden landing-bg">

      {/* ── 3D METALLIC SPHERES BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sphere-3d" style={{ width: 210, height: 210, top: "15%", right: "-40px", animationDelay: "1s" }} />
        <div className="sphere-3d-alt" style={{ width: 130, height: 130, bottom: "10%", left: "-30px", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <GithubIcon size={14} className="mr-1" /> GitHub Live Feed
            </span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily:"var(--font-heading)" }}>
              GitHub Activity &amp; Contributions
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Real-time sync with @Bagasprbw on GitHub.
            </p>
          </div>
        </FadeIn>

        {/* ── STATS & PROFILE HEADER BENTO ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">

          {/* User profile card */}
          <FadeIn direction="right" className="lg:col-span-4 flex">
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between w-full relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none"/>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={user?.avatar_url || "https://avatars.githubusercontent.com/u/119209112?v=4"}
                    alt="Bagas Prabowo"
                    className="w-16 h-16 rounded-2xl border-2 border-white/20 object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0b0c0e]" title="Active on GitHub" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug" style={{ fontFamily:"var(--font-heading)" }}>
                    {user?.name || "Bagas Prabowo"}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">@{user?.login || "Bagasprbw"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-card rounded-2xl p-3.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                    <BookOpen size={13}/> Repos
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily:"var(--font-heading)" }}>
                    {loading ? "..." : user?.public_repos || 33}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-3.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Users size={13}/> Followers
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily:"var(--font-heading)" }}>
                    {loading ? "..." : user?.followers || 23}
                  </p>
                </div>
              </div>

              <a
                href={user?.html_url || "https://github.com/Bagasprbw"}
                target="_blank"
                rel="noreferrer"
                className="btn-sky w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm"
              >
                <GithubIcon size={16}/> View GitHub Profile <ExternalLink size={14}/>
              </a>
            </div>
          </FadeIn>

          {/* Contribution Heatmap Graph Card */}
          <FadeIn direction="left" className="lg:col-span-8 flex">
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between w-full relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none"/>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-emerald-400" />
                  <h3 className="font-bold text-white text-base" style={{ fontFamily:"var(--font-heading)" }}>
                    Contributions Calendar
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">1-Year Activity</span>
              </div>

              {/* GitHub Contribution Graph Image — native green like github.com */}
              <div className="w-full flex items-center justify-center overflow-x-auto custom-scrollbar p-3 my-auto bg-black/40 rounded-2xl border border-white/10">
                <img
                  src="https://ghchart.rshah.org/216e39/Bagasprbw"
                  alt="GitHub Contribution Calendar for Bagasprbw"
                  className="w-full min-w-[600px] opacity-90 hover:opacity-100 transition-opacity rounded"
                  onError={(e) => {
                    // Fallback: activity graph with green theme
                    (e.target as HTMLImageElement).src =
                      "https://github-readme-activity-graph.vercel.app/graph?username=Bagasprbw&theme=github-compact&bg_color=0b0c0e&color=39d353&line=39d353&point=ffffff&hide_border=true";
                  }}
                />
              </div>

              <div className="flex items-center justify-between mt-4 text-[11px] text-slate-400">
                <span>Less</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-white/10"/>
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900"/>
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700"/>
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"/>
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"/>
                </div>
                <span>More</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── RECENT REPO COMMITS & ACTIVITY TIMELINE ── */}
        <FadeIn direction="up">
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none"/>

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <GitCommit size={18} className="text-cyan-400"/>
                <h3 className="font-bold text-white text-base" style={{ fontFamily:"var(--font-heading)" }}>
                  Recent Commits &amp; Activity
                </h3>
              </div>
              <span className="chip px-3 py-1 rounded-full text-[10px]">Live Data</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-slate-500 text-xs">Loading live GitHub commits...</div>
            ) : events.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">No recent public commits found.</div>
            ) : (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {events.map((evt) => (
                  <StaggerItem key={evt.id}>
                    <a
                      href={`https://github.com/${evt.repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-card p-4 rounded-2xl flex flex-col justify-between gap-3 h-full hover:border-white/40 transition-all block group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-bold text-white group-hover:text-cyan-300 transition-colors truncate" style={{ fontFamily:"var(--font-heading)" }}>
                          {evt.repo.name}
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {formatDate(evt.created_at)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {formatEventMessage(evt)}
                      </p>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                        <GitCommit size={12} className="text-slate-500" />
                        <span>{evt.type.replace("Event", "")}</span>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
