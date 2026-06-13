"use server";

import { db } from "@/db";
import { experiences, experienceSkills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createExperience(
  company: string,
  position: string,
  employmentType: string,
  location: string | undefined,
  startDate: string,
  endDate: string | undefined,
  isCurrent: boolean,
  description: string,
  skillIds: string[] = []
) {
  try {
    const result = await db.transaction(async (tx) => {
      const [newExperience] = await tx
        .insert(experiences)
        .values({
          company,
          position,
          employmentType,
          location: location || null,
          startDate,
          endDate: isCurrent ? null : (endDate || null),
          isCurrent,
          description,
        })
        .returning();

      if (skillIds.length > 0) {
        await tx.insert(experienceSkills).values(
          skillIds.map((skillId) => ({
            experienceId: newExperience.id,
            skillId,
          }))
        );
      }

      return newExperience;
    });

    revalidatePath("/dashboard/experiences");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error creating experience:", error);
    return { success: false, error: "Failed to create experience" };
  }
}

export async function updateExperience(
  id: string,
  company: string,
  position: string,
  employmentType: string,
  location: string | undefined,
  startDate: string,
  endDate: string | undefined,
  isCurrent: boolean,
  description: string,
  skillIds: string[] = []
) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(experiences)
        .set({
          company,
          position,
          employmentType,
          location: location || null,
          startDate,
          endDate: isCurrent ? null : (endDate || null),
          isCurrent,
          description,
          updatedAt: new Date(),
        })
        .where(eq(experiences.id, id));

      // Clear existing skill relations
      await tx.delete(experienceSkills).where(eq(experienceSkills.experienceId, id));

      // Insert new skill relations
      if (skillIds.length > 0) {
        await tx.insert(experienceSkills).values(
          skillIds.map((skillId) => ({
            experienceId: id,
            skillId,
          }))
        );
      }
    });

    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return { success: false, error: "Failed to delete experience" };
  }
}
