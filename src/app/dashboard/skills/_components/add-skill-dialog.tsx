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
import { createSkill } from "../_actions/skill";
import { Plus } from "lucide-react";

type Props = {
    categories: any[];
};

export function AddSkillDialog({
    categories,
}: Props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
    const [icon, setIcon] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !categoryId) return;

        setLoading(true);
        setError(null);
        try {
            const result = await createSkill(name, categoryId, icon || undefined);

            if (result.success) {
                setName("");
                setIcon("");
                setCategoryId(categories[0]?.id || "");
                setOpen(false);
            } else {
                setError(result.error || "Failed to create skill");
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
                    Add Skill
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Skill</DialogTitle>
                    <DialogDescription>
                        Create a new skill here. Specify its name, category, and optional icon.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Skill Name
                        </label>
                        <Input
                            placeholder="e.g. React.js"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Category
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={loading}
                        >
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Icon (Optional)
                        </label>
                        <Input
                            placeholder="Direct image URL, SVG code, or Emoji"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            disabled={loading}
                        />
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            Accepts emoji (e.g. ⚛️), raw SVG code, or a direct image URL.
                        </p>
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
                            {loading ? "Adding..." : "Add Skill"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}