"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Link2, ExternalLink, Star, Briefcase } from "lucide-react";
import { deleteProject } from "../_actions/project";
import { EditProjectDialog } from "./edit-project-dialog";

type Skill = {
  id: string;
  name: string;
};

type ProjectSkill = {
  skill: Skill;
};

type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  url?: string | null;
  featured: boolean;
  projectSkills: ProjectSkill[];
  createdAt: Date;
};

type Props = {
  projects: Project[];
  skills: Skill[];
};

export function ProjectTable({ projects, skills }: Props) {
  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-card shadow-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Briefcase className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">No projects yet</h3>
        <p className="text-sm max-w-xs mx-auto mb-4">
          Add some projects to showcase your experience and highlight them in your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-4 text-left font-medium text-muted-foreground w-[100px]">
                Preview
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Project Info
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Skills Used
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground w-[120px]">
                Status
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground w-[150px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-16 h-10 object-cover rounded-md border bg-muted shadow-2xs"
                      onError={(e) => {
                        // If thumbnail URL fails to load, clear it or show fallback
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=60";
                      }}
                    />
                  ) : (
                    <div className="w-16 h-10 rounded-md border bg-muted flex items-center justify-center text-muted-foreground text-xs font-semibold">
                      No Image
                    </div>
                  )}
                </td>

                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground leading-none">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px]">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink size={10} />
                        View Live/Source
                      </a>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-[250px]">
                    {project.projectSkills && project.projectSkills.length > 0 ? (
                      project.projectSkills.map((ps) => (
                        <span
                          key={ps.skill.id}
                          className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-muted"
                        >
                          {ps.skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  {project.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400">
                      <Star size={10} className="fill-amber-500 stroke-amber-500" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Standard</span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-end items-center">
                    <EditProjectDialog project={project} skills={skills} />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.title}"?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end pt-4 border-t">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(project.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
