import { db } from "@/db";
import { experiences, skills } from "@/db/schema";
import { ExperienceTable } from "./_components/experience-table";
import { AddExperienceDialog } from "./_components/add-experience-dialog";

export default async function ExperiencesPage() {
  // Fetch experiences with their associated skills
  const allExperiences = await db.query.experiences.findMany({
    with: {
      experienceSkills: {
        with: {
          skill: true,
        },
      },
    },
    orderBy: (experiences, { desc }) => [desc(experiences.startDate)],
  });

  // Fetch all available skills for tagging
  const allSkills = await db.query.skills.findMany({
    orderBy: (skills, { asc }) => [asc(skills.name)],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiences</h1>
          <p className="text-muted-foreground">
            Manage your work history, internships, and associate skills with them
          </p>
        </div>

        <AddExperienceDialog skills={allSkills} />
      </div>

      <ExperienceTable experiences={allExperiences} skills={allSkills} />
    </div>
  );
}