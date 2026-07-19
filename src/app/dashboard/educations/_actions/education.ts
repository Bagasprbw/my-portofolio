"use server";

import { db } from "@/db";
import { educations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEducation(
  institution: string,
  degree: string,
  fieldOfStudy: string | undefined,
  gpa: string | undefined,
  startDate: string,
  endDate: string | undefined,
  isCurrent: boolean,
  description: string | undefined
) {
  try {
    const [newEducation] = await db
      .insert(educations)
      .values({
        institution,
        degree,
        fieldOfStudy: fieldOfStudy || null,
        gpa: gpa || null,
        startDate,
        endDate: isCurrent ? null : (endDate || null),
        isCurrent,
        description: description || null,
      })
      .returning();

    revalidatePath("/dashboard/educations");
    revalidatePath("/");
    return { success: true, data: newEducation };
  } catch (error: any) {
    console.error("Error creating education:", error);
    return { success: false, error: "Failed to create education" };
  }
}

export async function updateEducation(
  id: string,
  institution: string,
  degree: string,
  fieldOfStudy: string | undefined,
  gpa: string | undefined,
  startDate: string,
  endDate: string | undefined,
  isCurrent: boolean,
  description: string | undefined
) {
  try {
    await db
      .update(educations)
      .set({
        institution,
        degree,
        fieldOfStudy: fieldOfStudy || null,
        gpa: gpa || null,
        startDate,
        endDate: isCurrent ? null : (endDate || null),
        isCurrent,
        description: description || null,
        updatedAt: new Date(),
      })
      .where(eq(educations.id, id));

    revalidatePath("/dashboard/educations");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating education:", error);
    return { success: false, error: "Failed to update education" };
  }
}

export async function deleteEducation(id: string) {
  try {
    await db.delete(educations).where(eq(educations.id, id));
    revalidatePath("/dashboard/educations");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting education:", error);
    return { success: false, error: "Failed to delete education" };
  }
}
