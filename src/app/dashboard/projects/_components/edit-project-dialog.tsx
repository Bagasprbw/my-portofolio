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
import { updateProject } from "../_actions/project";

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
};

type Props = {
  project: Project;
  skills: Skill[];
};

export function EditProjectDialog({ project, skills }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [thumbnail, setThumbnail] = useState(project.thumbnail || "");
  const [url, setUrl] = useState(project.url || "");
  const [featured, setFeatured] = useState(project.featured);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(
    project.projectSkills.map((ps) => ps.skill.id)
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
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await updateProject(
        project.id,
        title,
        description,
        thumbnail || undefined,
        url || undefined,
        featured,
        selectedSkillIds
      );

      if (result.success) {
        setOpen(false);
      } else {
        setError(result.error || "Failed to update project");
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
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update project details and associate skills. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Project Title
            </label>
            <Input
              placeholder="e.g. E-Commerce Platform"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Description
            </label>
            <Textarea
              placeholder="Describe your project, technologies used, and your role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Thumbnail URL (Optional)
              </label>
              <Input
                placeholder="https://example.com/thumbnail.png"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Project Link URL (Optional)
              </label>
              <Input
                placeholder="https://github.com/... or live site"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id={`featured-${project.id}`}
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`featured-${project.id}`} className="text-sm font-medium select-none cursor-pointer">
              Mark as Featured Project
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none block mb-1">
              Skills used in this project
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
