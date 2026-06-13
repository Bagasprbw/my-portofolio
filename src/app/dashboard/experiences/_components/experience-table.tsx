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
import { Trash2, Calendar, MapPin, Briefcase } from "lucide-react";
import { deleteExperience } from "../_actions/experience";
import { EditExperienceDialog } from "./edit-experience-dialog";

type Skill = {
  id: string;
  name: string;
};

type ExperienceSkill = {
  skill: Skill;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  experienceSkills: ExperienceSkill[];
  createdAt: Date;
};

type Props = {
  experiences: Experience[];
  skills: Skill[];
};

export function ExperienceTable({ experiences, skills }: Props) {
  const handleDelete = async (id: string) => {
    await deleteExperience(id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (experiences.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-card shadow-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Briefcase className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">No experiences yet</h3>
        <p className="text-sm max-w-xs mx-auto mb-4">
          Add your work history, internships, or freelancing experience to show in your portfolio.
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
              <th className="p-4 text-left font-medium text-muted-foreground">
                Role & Company
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground w-[180px]">
                Period
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Skills Used
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground w-[150px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {experiences.map((exp) => (
              <tr
                key={exp.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="space-y-1.5">
                    <div>
                      <p className="font-semibold text-foreground leading-none">
                        {exp.position}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground mt-1">
                        {exp.company} •{" "}
                        <span className="text-xs bg-muted border rounded px-1.5 py-0.5 font-normal text-muted-foreground">
                          {exp.employmentType}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-0.5">
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="shrink-0" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      <p className="line-clamp-2 max-w-[400px] text-muted-foreground text-xs leading-relaxed font-sans mt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 vertical-align-top">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar size={13} className="shrink-0 text-primary" />
                    <span>
                      {formatDate(exp.startDate)} –{" "}
                      {exp.isCurrent ? (
                        <span className="text-primary font-semibold">Present</span>
                      ) : exp.endDate ? (
                        formatDate(exp.endDate)
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-[250px]">
                    {exp.experienceSkills && exp.experienceSkills.length > 0 ? (
                      exp.experienceSkills.map((es) => (
                        <span
                          key={es.skill.id}
                          className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-muted"
                        >
                          {es.skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-end items-center">
                    <EditExperienceDialog experience={exp} skills={skills} />

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
                          <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this experience at "{exp.company}"?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end pt-4 border-t">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(exp.id)}
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
