"use server";

import { db } from "@/db";
import { projects, projectSkills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProject(
  title: string,
  description: string,
  thumbnail?: string,
  url?: string,
  featured: boolean = false,
  skillIds: string[] = []
) {
  try {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + Math.random().toString(36).substring(2, 6); // Add small random suffix for uniqueness

    const result = await db.transaction(async (tx) => {
      const [newProject] = await tx
        .insert(projects)
        .values({
          title,
          slug,
          description,
          thumbnail: thumbnail || null,
          url: url || null,
          featured,
        })
        .returning();

      if (skillIds.length > 0) {
        await tx.insert(projectSkills).values(
          skillIds.map((skillId) => ({
            projectId: newProject.id,
            skillId,
          }))
        );
      }

      return newProject;
    });

    revalidatePath("/dashboard/projects");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  title: string,
  description: string,
  thumbnail?: string,
  url?: string,
  featured: boolean = false,
  skillIds: string[] = []
) {
  try {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + id.substring(0, 4);

    await db.transaction(async (tx) => {
      await tx
        .update(projects)
        .set({
          title,
          slug,
          description,
          thumbnail: thumbnail || null,
          url: url || null,
          featured,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id));

      // Clear existing skill relations
      await tx.delete(projectSkills).where(eq(projectSkills.projectId, id));

      // Insert new skill relations
      if (skillIds.length > 0) {
        await tx.insert(projectSkills).values(
          skillIds.map((skillId) => ({
            projectId: id,
            skillId,
          }))
        );
      }
    });

    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
