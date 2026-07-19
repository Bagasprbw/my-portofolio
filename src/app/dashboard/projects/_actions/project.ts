"use server";

import { db } from "@/db";
import { projects, projectSkills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

async function deleteThumbnailFile(thumbnailPath?: string | null) {
  if (!thumbnailPath) return;
  // Check if it's a local upload
  if (thumbnailPath.startsWith("/uploads/")) {
    const filename = thumbnailPath.replace("/uploads/", "");
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    try {
      if (existsSync(filepath)) {
        await unlink(filepath);
      }
    } catch (err) {
      console.error("Failed to delete old thumbnail file:", err);
    }
  }
}

export async function createProject(
  title: string,
  description: string,
  thumbnail?: string,
  url?: string,
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
          featured: true,
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
    revalidatePath("/");
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
  skillIds: string[] = []
) {
  try {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + id.substring(0, 4);

    // Get current project thumbnail to check if it has changed
    const [existingProject] = await db
      .select({ thumbnail: projects.thumbnail })
      .from(projects)
      .where(eq(projects.id, id));

    const oldThumbnail = existingProject?.thumbnail;

    await db.transaction(async (tx) => {
      await tx
        .update(projects)
        .set({
          title,
          slug,
          description,
          thumbnail: thumbnail || null,
          url: url || null,
          featured: true,
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

    // If thumbnail has changed or been removed, delete the old file
    if (oldThumbnail && oldThumbnail !== (thumbnail || null)) {
      await deleteThumbnailFile(oldThumbnail);
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    // Get current project thumbnail before deleting
    const [project] = await db
      .select({ thumbnail: projects.thumbnail })
      .from(projects)
      .where(eq(projects.id, id));

    await db.delete(projects).where(eq(projects.id, id));

    if (project?.thumbnail) {
      await deleteThumbnailFile(project.thumbnail);
    }

    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
