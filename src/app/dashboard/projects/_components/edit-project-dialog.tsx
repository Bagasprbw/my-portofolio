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
import { Edit2, Check, X, Image as ImageIcon } from "lucide-react";
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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(project.thumbnail || null);
  const [url, setUrl] = useState(project.url || "");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    setError(null);
    try {
      let finalThumbnailUrl = project.thumbnail || "";
      if (!previewUrl) {
        finalThumbnailUrl = "";
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          throw new Error("Failed to upload thumbnail image");
        }
        const uploadData = await uploadRes.json();
        finalThumbnailUrl = uploadData.url;
      }

      const result = await updateProject(
        project.id,
        title,
        description,
        finalThumbnailUrl || undefined,
        url || undefined,
        selectedSkillIds
      );

      if (result.success) {
        setOpen(false);
      } else {
        setError(result.error || "Failed to update project");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
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
              <label className="text-sm font-medium leading-none block mb-1">
                Thumbnail Image (Optional)
              </label>
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30 aspect-video max-h-[120px] flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Thumbnail preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 shadow-sm transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-3 pb-4 text-center px-2">
                      <ImageIcon className="w-6 h-6 mb-1 text-muted-foreground" />
                      <p className="text-[11px] text-muted-foreground font-semibold">
                        Click to upload
                      </p>
                      <p className="text-[9px] text-muted-foreground/80 mt-0.5">PNG, JPG, WEBP</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="space-y-2 flex flex-col justify-between">
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
