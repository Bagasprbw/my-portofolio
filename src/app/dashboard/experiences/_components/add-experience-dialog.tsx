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
import { Plus, Check } from "lucide-react";
import { createExperience } from "../_actions/experience";

type Skill = {
  id: string;
  name: string;
};

type Props = {
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

export function AddExperienceDialog({ skills }: Props) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState(EMPLOYMENT_TYPES[0]);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
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
      const result = await createExperience(
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
        setCompany("");
        setPosition("");
        setEmploymentType(EMPLOYMENT_TYPES[0]);
        setLocation("");
        setStartDate("");
        setEndDate("");
        setIsCurrent(false);
        setDescription("");
        setSelectedSkillIds([]);
        setOpen(false);
      } else {
        setError(result.error || "Failed to create experience");
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
        <Button className="gap-2">
          <Plus size={16} />
          Add Experience
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogDescription>
            Add a new work experience entry to your portfolio.
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
              id="isCurrent"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isCurrent" className="text-sm font-medium select-none cursor-pointer">
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
              {loading ? "Adding..." : "Add Experience"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
