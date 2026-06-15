"use server";

import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createSkill(
  name: string,
  categoryId: string,
  icon?: string
) {
  try {
    const result = await db
      .insert(skills)
      .values({
        name,
        categoryId,
        icon: icon || null,
      })
      .returning();

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true, data: result[0] };
  } catch (error) {
    return { success: false, error: "Failed to create skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await db
      .delete(skills)
      .where(eq(skills.id, id));

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete skill" };
  }
}

export async function updateSkill(
  id: string,
  name: string,
  categoryId: string,
  icon?: string
) {
  try {
    await db
      .update(skills)
      .set({
        name,
        categoryId,
        icon: icon || null,
      })
      .where(eq(skills.id, id));

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update skill" };
  }
}
