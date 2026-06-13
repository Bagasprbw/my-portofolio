import { db } from "@/db";
import { projects, skills } from "@/db/schema";
import { ProjectTable } from "./_components/project-table";
import { AddProjectDialog } from "./_components/add-project-dialog";

export default async function ProjectsPage() {
  // Fetch projects with their associated skills
  const allProjects = await db.query.projects.findMany({
    with: {
      projectSkills: {
        with: {
          skill: true,
        },
      },
    },
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  // Fetch all available skills for tagging
  const allSkills = await db.query.skills.findMany({
    orderBy: (skills, { asc }) => [asc(skills.name)],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects and associate skills with them
          </p>
        </div>

        <AddProjectDialog skills={allSkills} />
      </div>

      <ProjectTable projects={allProjects} skills={allSkills} />
    </div>
  );
}