"use client";

import { useState } from "react";
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
import { Trash2, Link2, Code, Smile } from "lucide-react";
import { deleteSkill } from "../_actions/skill";
import { SkillIcon } from "./skill-icon";
import { EditSkillDialog } from "./edit-skill-dialog";

type Category = {
  id: string;
  name: string;
};

type Skill = {
  id: string;
  name: string;
  icon?: string | null;
  category: Category;
  createdAt: Date;
};

type Props = {
  skills: Skill[];
  categories: Category[];
};

export function SkillTable({ skills, categories }: Props) {
  const handleDelete = async (id: string) => {
    await deleteSkill(id);
  };

  if (skills.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-card shadow-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Code className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">No skills yet</h3>
        <p className="text-sm max-w-xs mx-auto mb-4">
          Create some skills to show off your tech stack and display them in your portfolio.
        </p>
      </div>
    );
  }

  const getIconSourceInfo = (icon?: string | null) => {
    if (!icon) return { label: "No icon", type: "none", iconComponent: null };
    const trimmed = icon.trim();
    if (trimmed.startsWith("<svg")) {
      return {
        label: "Inline SVG",
        type: "svg",
        iconComponent: <Code size={13} className="text-blue-500" />,
      };
    }
    if (trimmed.startsWith("http") || trimmed.startsWith("/")) {
      let hostname = "Image Link";
      try {
        if (trimmed.startsWith("http")) {
          hostname = new URL(trimmed).hostname;
        }
      } catch (e) {}
      return {
        label: hostname,
        type: "url",
        iconComponent: <Link2 size={13} className="text-emerald-500" />,
      };
    }
    return {
      label: trimmed.length <= 4 ? `Emoji (${trimmed})` : "Text",
      type: "text",
      iconComponent: <Smile size={13} className="text-amber-500" />,
    };
  };

  return (
    <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-4 text-left font-medium text-muted-foreground w-[80px]">
                Icon
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Name
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Category
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground max-w-[200px]">
                Source
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground w-[120px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {skills.map((skill) => {
              const sourceInfo = getIconSourceInfo(skill.icon);
              return (
                <tr
                  key={skill.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <SkillIcon 
                      icon={skill.icon} 
                      name={skill.name} 
                      className="w-10 h-10 rounded-lg border bg-background flex items-center justify-center shadow-2xs"
                    />
                  </td>

                  <td className="p-4 font-semibold text-foreground">
                    {skill.name}
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {skill.category.name}
                    </span>
                  </td>

                  <td className="p-4 max-w-[200px]">
                    {skill.icon ? (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground" title={skill.icon}>
                        {sourceInfo.iconComponent}
                        <span className="truncate max-w-[150px] font-mono">
                          {sourceInfo.label}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-end items-center">
                      <EditSkillDialog skill={skill} categories={categories} />

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
                            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{skill.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-2 justify-end pt-4 border-t">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(skill.id)}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}