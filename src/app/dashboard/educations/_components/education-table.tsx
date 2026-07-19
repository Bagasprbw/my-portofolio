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
import { Trash2, Calendar, GraduationCap } from "lucide-react";
import { deleteEducation } from "../_actions/education";
import { EditEducationDialog } from "./edit-education-dialog";

type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  gpa?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  createdAt: Date;
};

type Props = {
  educations: Education[];
};

export function EducationTable({ educations }: Props) {
  const handleDelete = async (id: string) => {
    await deleteEducation(id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (educations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-card shadow-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <GraduationCap className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">No education yet</h3>
        <p className="text-sm max-w-xs mx-auto mb-4">
          Add your academic background, certifications, and courses to show in your portfolio.
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
                Degree & Institution
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground w-[180px]">
                Period
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground w-[100px]">
                GPA
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground w-[150px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {educations.map((edu) => (
              <tr
                key={edu.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="space-y-1.5">
                    <div>
                      <p className="font-semibold text-foreground leading-none">
                        {edu.degree}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground mt-1">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-0.5">
                      {edu.fieldOfStudy && (
                        <span>{edu.fieldOfStudy}</span>
                      )}
                      {edu.description && (
                        <p className="line-clamp-2 max-w-[400px] text-muted-foreground text-xs leading-relaxed font-sans mt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar size={13} className="shrink-0 text-primary" />
                    <span>
                      {formatDate(edu.startDate)} –{" "}
                      {edu.isCurrent ? (
                        <span className="text-primary font-semibold">Present</span>
                      ) : edu.endDate ? (
                        formatDate(edu.endDate)
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {edu.gpa || "-"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-end items-center">
                    <EditEducationDialog education={edu} />

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
                          <AlertDialogTitle>Delete Education</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this education at "{edu.institution}"?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end pt-4 border-t">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(edu.id)}
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
