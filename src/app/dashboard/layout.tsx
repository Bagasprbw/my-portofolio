import Link from "next/link";
import { ReactNode } from "react";
import {
    LayoutDashboard,
    FolderGit2,
    BriefcaseBusiness,
    Code2,
    GraduationCap,
} from "lucide-react";

import { getServerSession } from "next-auth";

import { LogoutButton } from "@/components/logout-button";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession();

    return (
        <div className="flex min-h-screen">
            <aside className="flex w-64 flex-col border-r bg-muted/30">
                <div className="border-b p-6">
                    <h2 className="text-xl font-bold">
                        My Portfolio
                    </h2>
                </div>

                <nav className="flex-1 space-y-2 p-4">
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

                    <Link
                        href="/dashboard/educations"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                    >
                        <GraduationCap size={18} />
                        Education
                    </Link>
                </nav>

                <div className="border-t p-4">
                    <LogoutButton />
                </div>
            </aside>

            <main className="flex-1">
                <header className="flex h-16 items-center justify-between border-b px-6">
                    <h1 className="font-semibold">
                        Admin Dashboard
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-medium">
                                {session?.user?.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {session?.user?.email}
                            </p>
                        </div>

                        <Avatar>
                            <AvatarImage
                                src={session?.user?.image ?? ""}
                                alt={session?.user?.name ?? ""}
                            />

                            <AvatarFallback>
                                {session?.user?.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}