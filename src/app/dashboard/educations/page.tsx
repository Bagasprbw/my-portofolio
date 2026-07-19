import { db } from "@/db";
import { EducationTable } from "./_components/education-table";
import { AddEducationDialog } from "./_components/add-education-dialog";
import { desc } from "drizzle-orm";
import { educations } from "@/db/schema";

export default async function EducationsPage() {
  const allEducations = await db.query.educations.findMany({
    orderBy: [desc(educations.startDate)],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground">
            Manage your academic background and certifications
          </p>
        </div>

        <AddEducationDialog />
      </div>

      <EducationTable educations={allEducations} />
    </div>
  );
}
