import { count } from "drizzle-orm";

import {
    BriefcaseBusiness,
    Code2,
    FolderGit2,
    GraduationCap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { db } from "@/db";

import {
    skills,
    projects,
    experiences,
    educations,
} from "@/db/schema";

export default async function DashboardPage() {
    const [[skillsCount], [projectsCount], [experiencesCount], [educationsCount]] =
        await Promise.all([
            db.select({ count: count() }).from(skills),
            db.select({ count: count() }).from(projects),
            db.select({ count: count() }).from(experiences),
            db.select({ count: count() }).from(educations),
        ]);

    return (
        <div>
            <h2 className="mb-6 text-3xl font-bold">
                Dashboard
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Skills
                            </p>

                            <h3 className="text-3xl font-bold">
                                {skillsCount.count}
                            </h3>
                        </div>

                        <Code2 />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Projects
                            </p>

                            <h3 className="text-3xl font-bold">
                                {projectsCount.count}
                            </h3>
                        </div>

                        <FolderGit2 />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Experiences
                            </p>

                            <h3 className="text-3xl font-bold">
                                {experiencesCount.count}
                            </h3>
                        </div>

                        <BriefcaseBusiness />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Education
                            </p>

                            <h3 className="text-3xl font-bold">
                                {educationsCount.count}
                            </h3>
                        </div>

                        <GraduationCap />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}