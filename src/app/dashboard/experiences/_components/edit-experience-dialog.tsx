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
import { Edit2, Check } from "lucide-react";
import { updateExperience } from "../_actions/experience";

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
};

type Props = {
  experience: Experience;
  skills: Skill[];
};

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
  "Self-employed",
];

export function EditExperienceDialog({ experience, skills }: Props) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(experience.company);
  const [position, setPosition] = useState(experience.position);
  const [employmentType, setEmploymentType] = useState(experience.employmentType);
  const [location, setLocation] = useState(experience.location || "");
  const [startDate, setStartDate] = useState(experience.startDate);
  const [endDate, setEndDate] = useState(experience.endDate || "");
  const [isCurrent, setIsCurrent] = useState(experience.isCurrent);
  const [description, setDescription] = useState(experience.description);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(
    experience.experienceSkills.map((es) => es.skill.id)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleSkill = (skillId: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !position.trim() || !startDate || !description.trim()) return;
    if (!isCurrent && !endDate) {
      setError("Please specify an end date or mark as current role.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await updateExperience(
        experience.id,
        company,
        position,
        employmentType,
        location || undefined,
        startDate,
        isCurrent ? undefined : endDate,
        isCurrent,
        description,
        selectedSkillIds
      );

      if (result.success) {
        setOpen(false);
      } else {
        setError(result.error || "Failed to update experience");
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
          <DialogTitle>Edit Experience</DialogTitle>
          <DialogDescription>
            Update experience details and associate skills. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Company Name
              </label>
              <Input
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Job Position / Role
              </label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Location (Optional)
              </label>
              <Input
                placeholder="e.g. Remote, or Jakarta, ID"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
              id={`isCurrent-${experience.id}`}
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`isCurrent-${experience.id}`} className="text-sm font-medium select-none cursor-pointer">
              I am currently working in this role
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Description
            </label>
            <Textarea
              placeholder="Detail your responsibilities, tasks completed, achievements, and technologies utilized..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none block mb-1">
              Skills used in this role
            </label>
            {skills.length === 0 ? (
              <p className="text-xs text-muted-foreground">No skills available. Please create skills first.</p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-2 border rounded-lg bg-muted/20">
                {skills.map((skill) => {
                  const selected = selectedSkillIds.includes(skill.id);
                  return (
                    <button
                      type="button"
                      key={skill.id}
                      onClick={() => handleToggleSkill(skill.id)}
                      disabled={loading}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer select-none ${
                        selected
                          ? "bg-primary border-primary text-primary-foreground shadow-xs"
                          : "bg-background border-input text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {selected && <Check size={12} />}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            )}
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
