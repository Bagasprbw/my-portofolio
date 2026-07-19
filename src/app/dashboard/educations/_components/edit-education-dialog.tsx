"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";
import { updateEducation } from "../_actions/education";

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
};

type Props = {
  education: Education;
};

export function EditEducationDialog({ education }: Props) {
  const [open, setOpen] = useState(false);
  const [institution, setInstitution] = useState(education.institution);
  const [degree, setDegree] = useState(education.degree);
  const [fieldOfStudy, setFieldOfStudy] = useState(education.fieldOfStudy || "");
  const [gpa, setGpa] = useState(education.gpa || "");
  const [startDate, setStartDate] = useState(education.startDate);
  const [endDate, setEndDate] = useState(education.endDate || "");
  const [isCurrent, setIsCurrent] = useState(education.isCurrent);
  const [description, setDescription] = useState(education.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !degree.trim() || !startDate) return;
    if (!isCurrent && !endDate) {
      setError("Please specify an end date or mark as current.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await updateEducation(
        education.id,
        institution,
        degree,
        fieldOfStudy || undefined,
        gpa || undefined,
        startDate,
        isCurrent ? undefined : endDate,
        isCurrent,
        description || undefined
      );

      if (result.success) {
        setOpen(false);
      } else {
        setError(result.error || "Failed to update education");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
          <Edit2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
          <DialogDescription>
            Update your education details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Institution
              </label>
              <Input
                placeholder="e.g. University of Indonesia"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Degree
              </label>
              <Input
                placeholder="e.g. Bachelor of Computer Science"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Field of Study (Optional)
              </label>
              <Input
                placeholder="e.g. Computer Science"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                GPA (Optional)
              </label>
              <Input
                placeholder="e.g. 3.75"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={loading || isCurrent}
                required={!isCurrent}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id={`isCurrent-${education.id}`}
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`isCurrent-${education.id}`} className="text-sm font-medium select-none cursor-pointer">
              I am currently studying here
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Detail your studies, achievements, organizations, and activities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows={4}
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
