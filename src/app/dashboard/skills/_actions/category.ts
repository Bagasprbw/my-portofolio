"use server";

import { db } from "@/db";
import { skillCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCategory(name: string) {
  try {
    const result = await db
      .insert(skillCategories)
      .values({ name })
      .returning();

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true, data: result[0] };
  } catch (error) {
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await db
      .delete(skillCategories)
      .where(eq(skillCategories.id, id));

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete category" };
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    await db
      .update(skillCategories)
      .set({ name })
      .where(eq(skillCategories.id, id));

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update category" };
  }
}
