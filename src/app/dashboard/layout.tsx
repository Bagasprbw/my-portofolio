import { getServerSession } from "next-auth";

import Link from "next/link";
import { ReactNode } from "react";
import { LayoutDashboard, FolderGit2, BriefcaseBusiness, Code2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/30">
        <div className="border-b p-6">
          <h2 className="font-bold text-xl">
            My Portfolio
          </h2>
        </div>

        <nav className="space-y-2 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/skills"
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <Code2 size={18} />
            Skills
          </Link>

          <Link
            href="/dashboard/projects"
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <FolderGit2 size={18} />
            Projects
          </Link>

          <Link
            href="/dashboard/experiences"
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <BriefcaseBusiness size={18} />
            Experiences
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="font-semibold">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">
                Bagas Prabowo
              </p>

              <p className="text-xs text-muted-foreground">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              B
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}